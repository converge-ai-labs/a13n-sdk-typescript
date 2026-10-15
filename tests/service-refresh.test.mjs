import assert from "node:assert/strict";
import test from "node:test";
import { ApiError, createClient } from "../dist/index.js";

const clientWith = (fetch) =>
  createClient({
    baseUrl: "https://service.example.test/proxy",
    auth: { type: "bearer", token: "refresh" },
    fetch,
    maxReadRetries: 0,
  });
const status = {
  pending: true,
  active_run_id: null,
  last_run_id: null,
  due_at: null,
  session_id: null,
  failure: null,
  processed_seq: 0,
  history_gap: false,
};
const policy = {
  enabled: false,
  model: null,
  cooldown_seconds: 0,
  check_interval_seconds: 10,
  trigger: { type: "change_count", count: 1 },
};
const space = {
  id: "space",
  name: "Shared notes",
  memory_id: "memory",
  organization: policy,
  guide: null,
  always_load: [],
  enabled: false,
  labels: {},
  version: 1,
};
const frozen = {
  name: "shared",
  memory_id: "memory",
  access: "write",
  recall: false,
  roots: ["global", "sessions/session"],
  space_id: "space",
};
const modelUsage = {
  model: null,
  requests: 0,
  input_tokens: 0,
  output_tokens: 0,
  cache_read_tokens: 0,
  cache_write_tokens: 0,
  cost: null,
  average_time_to_first_chunk_seconds: null,
  output_tokens_per_second: 0,
};

// This test is also copied into the isolated installed package consumer.
test("all 18 added operations use native selectors, bodies, metadata and response kinds", async () => {
  const seen = new Set();
  const requests = [];
  const client = clientWith(async (request) => {
    assert.equal(request.headers.get("Authorization"), "Bearer refresh");
    assert.equal(request.headers.get("X-Workspace-ID"), null);
    const url = new URL(request.url);
    const path = url.pathname.slice("/proxy/api/v1".length);
    const key = `${request.method} ${path}`;
    seen.add(key);
    requests.push(request);
    if (request.method === "DELETE") {
      assert.equal(request.headers.get("If-Match"), '"v1"');
      return new Response(null, { status: 204 });
    }
    if (path === "/environment-providers/provider/references")
      return Response.json({
        template_count: 0,
        templates: [],
        environment_count: 1,
        environments: [
          { id: "environment", name: "Desktop", status: "reserved" },
        ],
      });
    if (path === "/environments/environment/computer/check") {
      assert.equal(await request.text(), "");
      return Response.json({
        status: "unsupported",
        operations: [],
        observe_ready: false,
        input_ready: false,
        display_count: 0,
      });
    }
    if (path === "/memory-spaces") {
      if (request.method === "GET") {
        assert.equal(url.searchParams.get("enabled"), "false");
        assert.deepEqual(url.searchParams.getAll("label"), [
          "team:a",
          "team:b",
        ]);
        return Response.json({ items: [space], next_cursor: null });
      }
      assert.deepEqual(await request.json(), {
        name: space.name,
        guide: null,
        always_load: [],
        enabled: false,
        organization: policy,
      });
      return Response.json(space, { status: 201, headers: { ETag: '"v1"' } });
    }
    if (path === "/memory-spaces/space") {
      if (request.method === "PATCH") {
        assert.equal(request.headers.get("If-Match"), '"v1"');
        assert.deepEqual(await request.json(), {
          guide: null,
          enabled: false,
          always_load: [],
          organization: policy,
        });
      }
      return Response.json(space, { headers: { ETag: '"v1"' } });
    }
    if (path === "/memory-spaces/space/organization")
      return Response.json(status);
    if (path === "/memory-spaces/space/organizations") {
      assert.equal(await request.text(), "");
      return request.method === "POST"
        ? Response.json(status, { status: 202 })
        : Response.json({ items: [], next_cursor: null });
    }
    if (path === "/memory-spaces/space/sessions")
      return Response.json({
        items: [
          {
            id: "session",
            memory: { enabled: false, spaces: [] },
            purpose: "conversation",
          },
        ],
        next_cursor: null,
      });
    if (path === "/runs") {
      assert.equal(url.searchParams.get("status"), "completed");
      assert.equal(url.searchParams.get("principal_id"), "principal");
      return Response.json({
        items: [
          {
            id: "run",
            memory_mounts: [
              {
                name: "legacy",
                memory_id: "old",
                access: "read",
                recall: true,
              },
              frozen,
            ],
          },
        ],
        next_cursor: null,
      });
    }
    if (path === "/runs/run/agent")
      return Response.json({
        revision: { id: "revision" },
        config: {
          model: "frozen-model",
          instructions: "Accepted override",
          builtin_skills: [],
          platform_tools: {
            groups: [],
            read_permission: "deny",
            write_permission: "deny",
          },
          memory: { enabled: false, spaces: [] },
        },
      });
    if (path === "/runs/run/attempts/attempt")
      return Response.json({
        id: "attempt",
        failure: null,
        status: "completed",
      });
    if (path === "/runs/run/images/image") {
      assert.equal(request.headers.get("Accept"), "image/jpeg, image/png");
      return new Response(new Uint8Array([0, 255, 1, 128, 0]), {
        headers: {
          "Content-Type": "image/png",
          ETag: '"image"',
          "Cache-Control": "no-store",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }
    if (path === "/threads/thread/environments/desk") {
      assert.equal(request.headers.get("If-Match"), '"v1"');
      assert.deepEqual(await request.json(), {
        permission_ceiling: { operations: [] },
      });
      return Response.json({
        name: "desk",
        environment_id: "environment",
        working_directory: null,
        permission_ceiling: { operations: [] },
      });
    }
    if (path === "/usage/records/record/metrics")
      return Response.json({
        time_to_first_chunk_seconds: 0,
        request_duration_seconds: null,
        output_tokens_per_second: 0,
      });
    throw new Error(`Unexpected operation: ${key}`);
  });
  try {
    const provider = client.api.environmentProviders.ref("provider");
    assert.equal((await provider.references.get()).data.environment_count, 1);
    assert.equal((await provider.delete({ ifMatch: '"v1"' })).data, undefined);
    assert.equal(
      (await client.api.environments.ref("environment").computer.check()).data
        .status,
      "unsupported",
    );
    const spaces = client.api.memorySpaces;
    const created = await spaces.create({
      name: space.name,
      guide: null,
      enabled: false,
      always_load: [],
      organization: policy,
    });
    assert.equal(created.response.status, 201);
    const pages = spaces.pages({
      query: { enabled: false, label: ["team:a", "team:b"] },
    });
    assert.deepEqual((await pages.next()).value.data.items, [space]);
    assert.equal((await pages.next()).done, true);
    const ref = spaces.ref(created.data.id);
    assert.deepEqual((await ref.get()).data, space);
    await ref.update(
      { guide: null, enabled: false, always_load: [], organization: policy },
      { ifMatch: '"v1"' },
    );
    assert.deepEqual((await ref.organization.get()).data, status);
    assert.deepEqual((await ref.organizations.list()).data.items, []);
    const organized = await ref.organizations.create();
    assert.equal(organized.response.status, 202);
    assert.equal(organized.data.pending, true);
    assert.equal(
      (await ref.sessions.list()).data.items[0].memory.enabled,
      false,
    );
    assert.equal((await ref.delete({ ifMatch: '"v1"' })).response.status, 204);
    const listed = await client.api.runs.list({
      query: { status: "completed", principal_id: "principal" },
    });
    assert.deepEqual(listed.data.items[0].memory_mounts[1], frozen);
    const run = client.api.runs.ref("run");
    assert.equal(
      (await run.agent.get()).data.config.instructions,
      "Accepted override",
    );
    assert.equal((await run.attempts.ref("attempt").get()).data.id, "attempt");
    const image = await run.images.ref("image").get();
    try {
      assert.equal(image.response.headers.get("Content-Type"), "image/png");
      assert.equal(image.response.headers.get("ETag"), '"image"');
      assert.equal(image.response.headers.get("Cache-Control"), "no-store");
      assert.equal(
        image.response.headers.get("X-Content-Type-Options"),
        "nosniff",
      );
      assert.deepEqual(
        new Uint8Array(await new Response(image.body).arrayBuffer()),
        new Uint8Array([0, 255, 1, 128, 0]),
      );
    } finally {
      await image.close();
    }
    assert.deepEqual(
      (
        await client.api.threads
          .ref("thread")
          .environments.ref("desk")
          .update(
            { permission_ceiling: { operations: [] } },
            { ifMatch: '"v1"' },
          )
      ).data.permission_ceiling,
      { operations: [] },
    );
    assert.deepEqual(
      (await client.api.usage.records.ref("record").metrics.get()).data,
      {
        time_to_first_chunk_seconds: 0,
        request_duration_seconds: null,
        output_tokens_per_second: 0,
      },
    );
    assert.equal(seen.size, 18);
    assert.equal(
      requests.length,
      18,
      "Mutations and explicit organization action are not replayed",
    );
  } finally {
    client.close();
  }
});

for (const mediaType of ["image/png", "image/jpeg"]) {
  test(`retained ${mediaType} read closes unconsumed body without JSON conversion`, async () => {
    let cancelled = 0;
    const client = clientWith(async (request) => {
      assert.equal(
        new URL(request.url).pathname,
        "/proxy/api/v1/runs/run%2F%25/images/image%2F%E8%AA%9E",
      );
      return new Response(
        new ReadableStream({
          cancel() {
            cancelled++;
          },
        }),
        { headers: { "Content-Type": mediaType } },
      );
    });
    const image = await client.api.runs
      .ref("run/%")
      .images.ref("image/語")
      .get();
    await image.close();
    await image.close();
    assert.equal(cancelled, 1);
    client.close();
  });
}

test("retained image canonical rejection remains ApiError and computer check is not retried", async () => {
  let requests = 0;
  const client = clientWith(async () => {
    requests++;
    return Response.json(
      {
        error: {
          code: "forbidden",
          message: "Denied",
          details: { action: "environment.computer.observe" },
          request_id: "request",
        },
      },
      { status: 403 },
    );
  });
  try {
    await assert.rejects(
      client.api.runs.ref("run").images.ref("image").get(),
      (error) =>
        error instanceof ApiError &&
        error.status === 403 &&
        error.requestId === "request",
    );
    await assert.rejects(
      client.api.environments.ref("environment").computer.check(),
      { status: 403 },
    );
    assert.equal(requests, 2);
  } finally {
    client.close();
  }
});

test("authored start/send forward platform, builtin and permission options without policy injection", async () => {
  const bodies = [];
  const client = clientWith(async (request) => {
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
      {},
      { builtin_skills: null, platform_tools: null },
      {
        builtin_skills: [],
        platform_tools: {
          groups: [],
          read_permission: "deny",
          write_permission: "deny",
        },
      },
      {
        builtin_skills: ["platform-operations"],
        platform_tools: {
          groups: ["execution", "models"],
          write_permission: "ask",
        },
        toolsets: { computer: { enabled: true } },
      },
    ]) {
      const options = { overrides };
      const interaction = await client.agents.ref("agent").start("Native", {
        options,
        environments: [
          {
            name: "desk",
            environment_id: "environment",
            working_directory: null,
            permission_ceiling: {
              operations: ["environment.computer.observe"],
            },
          },
        ],
      });
      await interaction.close();
      await (
        await client.agents.ref("agent").send("thread", "Native", { options })
      ).close();
      assert.deepEqual(bodies.at(-1).options, options);
      assert.deepEqual(bodies.at(-2).options, options);
    }
  } finally {
    client.close();
  }
});

test("session Memory settings, usage metrics and case-sensitive catalog filters preserve native JSON", async () => {
  const memory = {
    enabled: false,
    spaces: [{ name: "team", space_id: "space", access: "read" }],
  };
  const client = clientWith(async (request) => {
    const url = new URL(request.url);
    if (url.pathname.endsWith("/model-catalog")) {
      assert.equal(url.searchParams.get("provider"), "openrouter");
      assert.equal(url.searchParams.get("model"), "Provider/ExactCase");
      return Response.json({ providers: [] });
    }
    if (url.pathname.endsWith("/usage"))
      return Response.json({
        models: [modelUsage],
        runs: [{ run_id: "run", thread_id: "thread", models: [modelUsage] }],
      });
    assert.deepEqual(await request.json(), { memory });
    return Response.json(
      { id: "session", memory, purpose: "conversation" },
      { status: request.method === "POST" ? 201 : 200 },
    );
  });
  try {
    assert.deepEqual(
      (await client.api.sessions.create({ memory })).data.memory,
      memory,
    );
    assert.deepEqual(
      (
        await client.api.sessions
          .ref("session")
          .update({ memory }, { ifMatch: '"v1"' })
      ).data.memory,
      memory,
    );
    const usage = (await client.api.usage.get()).data;
    assert.equal(usage.models[0].average_time_to_first_chunk_seconds, null);
    assert.equal(usage.runs[0].models[0].output_tokens_per_second, 0);
    await client.api.modelCatalog.list({
      query: { provider: "openrouter", model: "Provider/ExactCase" },
    });
  } finally {
    client.close();
  }
});
