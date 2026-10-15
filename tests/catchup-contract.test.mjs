import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createClient, ApiError, approve, returned } from "../dist/index.js";
import { threadStream } from "../dist/streams/thread-stream.js";

const fixture = (fetch) =>
  createClient({
    baseUrl: "https://service.example.test/proxy",
    auth: { type: "bearer", token: "catchup" },
    maxReadRetries: 0,
    fetch,
  });
const evidence = [
  { run_id: "run_source", trace_id: "1".repeat(32), span_ids: [] },
];
const finding = {
  agent_id: "agent",
  agent_revision_id: "revision",
  title: "Check recovery",
  category: "workflow_issue",
  severity: "warning",
  explanation: "Trace evidence",
  suggestion: "Use one recovery boundary",
  evidence,
  source_key: "test:recovery",
  limitations: "",
};

// These are transport fixtures; Service owns diagnostic validation and trace selection.
test("all new diagnostic operations retain native bodies, paging, ETags, replay statuses and shared scope", async () => {
  const seen = [];
  let analysisWrites = 0;
  const client = fixture(async (request) => {
    const url = new URL(request.url);
    const path = url.pathname;
    assert.equal(request.headers.get("Authorization"), "Bearer catchup");
    assert.equal(request.headers.get("X-Workspace-ID"), null);
    seen.push([request.method, path]);
    if (path.endsWith("/finding-agent")) {
      assert.equal(await request.text(), "");
      return Response.json(
        { id: "analyst", preset_kind: "finding" },
        { headers: { ETag: '"agent-v1"' } },
      );
    }
    if (path.endsWith("/finding-analyses") && request.method === "POST") {
      assert.deepEqual(await request.json(), {
        agent_id: null,
        presets: ["execution", "recovery"],
        max_traces: 2,
      });
      assert.equal(request.headers.get("Idempotency-Key"), "analysis-once");
      return Response.json(
        { id: "analysis", run_id: "analysis-run", selected_traces: evidence },
        { status: ++analysisWrites === 1 ? 201 : 200 },
      );
    }
    if (path.endsWith("/finding-analyses"))
      return Response.json({ items: [{ id: "analysis" }], next_cursor: null });
    if (path.endsWith("/findings") && request.method === "POST") {
      assert.deepEqual(await request.json(), finding);
      return Response.json(
        { ...finding, id: "finding" },
        { status: 201, headers: { ETag: '"finding-v1"' } },
      );
    }
    if (path.endsWith("/findings")) {
      assert.equal(url.searchParams.get("closed"), "false");
      assert.equal(url.searchParams.get("agent_id"), "agent");
      const second = url.searchParams.get("cursor") === "next";
      return Response.json(
        {
          items: [{ id: second ? "second" : "finding" }],
          next_cursor: second ? null : "next",
        },
        { headers: { ETag: second ? '"page2"' : '"page1"' } },
      );
    }
    assert.ok(path.endsWith("/findings/finding"));
    if (request.method === "PATCH") {
      assert.equal(request.headers.get("If-Match"), '"finding-v1"');
      assert.deepEqual(await request.json(), {
        assessment: "confirmed",
        assessment_note: null,
        closed: false,
      });
    }
    return Response.json(
      { ...finding, id: "finding" },
      { headers: { ETag: '"finding-v2"' } },
    );
  });
  try {
    assert.equal((await client.api.findingAgent()).data.preset_kind, "finding");
    const selection = {
      agent_id: null,
      presets: ["execution", "recovery"],
      max_traces: 2,
    };
    assert.equal(
      (
        await client.api.findingAnalyses.create(selection, {
          idempotencyKey: "analysis-once",
        })
      ).response.status,
      201,
    );
    assert.equal(analysisWrites, 1, "mutation is never automatically replayed");
    assert.equal(
      (
        await client.api.findingAnalyses.create(selection, {
          idempotencyKey: "analysis-once",
        })
      ).response.status,
      200,
    );
    assert.equal(
      (await client.api.findingAnalyses.list()).data.items[0].id,
      "analysis",
    );
    const created = await client.api.findings.create(finding);
    assert.equal(created.response.status, 201);
    assert.deepEqual(
      (await client.api.findings.ref("finding").get()).data.evidence,
      evidence,
    );
    await client.api.findings
      .ref("finding")
      .update(
        { assessment: "confirmed", assessment_note: null, closed: false },
        { ifMatch: created.response.headers.get("ETag") },
      );
    const pages = client.api.findings.pages({
      query: { agent_id: "agent", closed: false },
    });
    assert.equal(
      (await pages.next()).value.response.headers.get("ETag"),
      '"page1"',
    );
    assert.equal((await pages.next()).value.data.items[0].id, "second");
    assert.equal((await pages.next()).done, true);
    assert.equal(seen.length, 9);
  } finally {
    client.close();
  }
});

for (const saved of [
  {
    id: "value",
    media_type: "application/json",
    value: { nullable: null, ordered: [false, 0, "", {}] },
    truncated: false,
  },
  {
    id: "value",
    media_type: "text/plain",
    value: "{incomplete JSON prefix",
    truncated: true,
  },
]) {
  test(`native Run content preserves ${saved.media_type} and truncation without interpreting previews`, async () => {
    const client = fixture(async (request) => {
      assert.equal(request.method, "GET");
      assert.equal(
        new URL(request.url).pathname,
        "/proxy/api/v1/runs/run%20%2F%E9%9B%AA/contents/content%20%2F%E9%9B%AA",
      );
      return Response.json(saved, { headers: { ETag: '"content"' } });
    });
    try {
      const result = await client.api.runs
        .ref("run /雪")
        .contents.ref("content /雪")
        .get();
      assert.deepEqual(result.data, saved);
      assert.equal(result.response.headers.get("ETag"), '"content"');
    } finally {
      client.close();
    }
  });
}

test("session authors and record provenance retain nullable identity and best-effort evidence", async () => {
  const source = {
    principal_id: "principal",
    principal_name: null,
    run_id: null,
    attempt_id: null,
    tool_call_id: null,
    confirmed_at: "2026-10-13T00:00:00Z",
  };
  const record = {
    id: "record",
    text: "Current provider text",
    score: null,
    updated_at: null,
    provenance: { created: null, last_write: source, content_matches: false },
  };
  const authors = {
    items: [
      {
        entry_id: "entry",
        principal_id: "principal",
        principal: null,
        submitted_at: "2026-10-13T00:00:00Z",
      },
    ],
  };
  const client = fixture(async (request) => {
    const path = new URL(request.url).pathname;
    if (path.endsWith("/message-authors")) return Response.json(authors);
    assert.ok(path.endsWith("/memories/memory/records"));
    return Response.json({
      items: [record, { ...record, provenance: null }],
      next_cursor: null,
    });
  });
  try {
    assert.deepEqual(
      (
        await client.api.sessions
          .ref("session")
          .messageAuthors.list({ query: { entry_id: ["entry"] } })
      ).data,
      authors,
    );
    const result = await client.api.memories.ref("memory").records.list();
    assert.deepEqual(result.data.items, [
      record,
      { ...record, provenance: null },
    ]);
  } finally {
    client.close();
  }
});

for (const itemSources of [
  undefined,
  null,
  [],
  [{ kind: "record", memory: "notes", status: "timeout" }],
  [
    {
      kind: "file",
      memory: "notes",
      status: "changes",
      memory_id: null,
      cursor: null,
      files: [
        { path: "note.md", sha256: "a".repeat(64), bytes: 12, truncated: true },
      ],
      records: [],
      sources_truncated: true,
    },
  ],
]) {
  test(`Thread ItemRef preserves optional memory source evidence ${JSON.stringify(itemSources)}`, async () => {
    const item = {
      id: "message",
      kind: "text_message",
      state: "completed",
      ...(itemSources === undefined ? {} : { memory_sources: itemSources }),
    };
    const delta = {
      run_id: "run",
      attempt: 1,
      sequence: 4,
      event: { type: "TEXT_MESSAGE_END", messageId: "message" },
      item,
    };
    const client = fixture(
      async () =>
        new Response(
          `id: 8-0\nevent: delta\ndata: ${JSON.stringify(delta)}\n\n`,
          { headers: { "Content-Type": "text/event-stream" } },
        ),
    );
    const reader = threadStream(
      (options) => client.api.threads.ref("thread").stream.get(options),
      new AbortController().signal,
    );
    try {
      const value = (await reader.next()).value;
      assert.equal(value.cursor, "8-0");
      assert.deepEqual(value.frame.data.item, item);
      assert.equal(
        Object.hasOwn(value.frame.data.item, "memory_sources"),
        itemSources !== undefined,
      );
    } finally {
      await reader.return();
      client.close();
    }
  });
}

test("new native Agent options pass through the authored start without defaults or eager SDK environment work", async () => {
  const bodies = [];
  const client = fixture(async (request) => {
    assert.equal(request.method, "POST");
    assert.equal(new URL(request.url).pathname, "/proxy/api/v1/threads");
    bodies.push(await request.json());
    return Response.json(
      {
        thread: { id: "thread" },
        entry: { id: "entry", thread_id: "thread" },
        run: null,
      },
      { status: 201 },
    );
  });
  try {
    for (const overrides of [
      {
        lazy_environment: false,
        skill_sync: { mode: "shared", overwrite: false, cleanup: true },
      },
      {
        lazy_environment: true,
        skill_sync: { mode: "isolated", cache_count: 0 },
      },
      { lazy_environment: null, skill_sync: null },
    ]) {
      const interaction = await client.agents.ref("agent").start("Hi", {
        idempotencyKey: "explicit",
        environments: [
          {
            name: "project",
            environment_id: "environment",
            working_directory: "/repo",
          },
        ],
        options: { overrides },
      });
      await interaction.close();
      assert.deepEqual(bodies.at(-1), {
        agent_id: "agent",
        payload: { content: [{ type: "text", text: "Hi" }] },
        environments: [
          {
            name: "project",
            environment_id: "environment",
            working_directory: "/repo",
          },
        ],
        options: { overrides },
      });
    }
    assert.equal(bodies.length, 3);
  } finally {
    client.close();
  }
});

test("explicit batch answers remain one request; canonical duplicate refusal stays ApiError with one dispatch", async () => {
  let writes = 0;
  const client = fixture(async (request) => {
    writes++;
    assert.deepEqual(await request.json(), {
      approvals: { approval: approve() },
      calls: { call: returned(null) },
    });
    assert.equal(request.headers.get("Idempotency-Key"), "same-body");
    return Response.json(
      {
        error: {
          code: "conflict",
          message: "Thread changed before acceptance",
          details: { reason: "submission_rejected" },
          request_id: null,
        },
      },
      { status: 409 },
    );
  });
  try {
    await assert.rejects(
      client.runs
        .ref("waiting")
        .resume(
          { approval: approve(), call: returned(null) },
          { idempotencyKey: "same-body" },
        ),
      (error) => error instanceof ApiError && error.status === 409,
    );
    assert.equal(writes, 1);
  } finally {
    client.close();
  }
});

test("target native schema additions retain open provider metadata and retired model names stay retired", async () => {
  const document = JSON.parse(
    await readFile(new URL("../openapi.json", import.meta.url), "utf8"),
  );
  const schemas = document.components.schemas;
  assert.equal(Object.keys(schemas).length, 353);
  assert.equal(schemas.ChatGPTModel, undefined);
  assert.ok(schemas.ProviderModel.properties.characteristics);
  assert.deepEqual(
    schemas["AgentConfig-Input"].properties.skill_sync.discriminator.mapping,
    {
      isolated: "#/components/schemas/IsolatedSkillSync",
      shared: "#/components/schemas/SharedSkillSync",
    },
  );
  assert.equal(
    schemas["AgentConfig-Input"].properties.lazy_environment.default,
    true,
  );
  assert.equal(schemas.SharedSkillSync.properties.overwrite.default, true);
  assert.equal(schemas.IsolatedSkillSync.properties.cache_count.default, 128);
  assert.deepEqual(schemas.ToolsetKey.enum.slice(-2), ["traces", "findings"]);
  assert.equal(
    schemas.ProviderType.properties.supports_model_discovery.default,
    false,
  );
});
