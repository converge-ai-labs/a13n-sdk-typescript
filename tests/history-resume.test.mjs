import assert from "node:assert/strict";
import test from "node:test";
import { createClient } from "../dist/index.js";

const history = [
  {
    kind: "request",
    parts: [{ part_kind: "user-prompt", content: "Earlier question" }],
  },
  {
    kind: "response",
    parts: [{ part_kind: "text", content: "Earlier answer" }],
  },
  {
    kind: "response",
    parts: [
      {
        part_kind: "tool-call",
        tool_name: "lookup",
        tool_call_id: "call_one",
        args: { id: "record" },
      },
    ],
  },
  {
    kind: "request",
    parts: [
      {
        part_kind: "tool-return",
        tool_name: "lookup",
        tool_call_id: "call_one",
        content: { found: true },
      },
    ],
  },
];
const payload = {
  content: [
    { type: "text", text: "Review the attached report in this context." },
    { type: "asset", asset_id: "asset_one" },
    { type: "json", value: { source: "migration" } },
  ],
};
const thread = { id: "th_imported", message_history: history };
const entry = { id: "ent_imported", thread_id: thread.id, status: "pending" };
const submitted = { thread, entry, run: null };
const run = (id, status) => ({
  id,
  thread_id: thread.id,
  status,
  pending: null,
  output: null,
  failure: null,
});
function clientWith(fetch) {
  return createClient({
    baseUrl: "https://service.example.test",
    auth: { type: "bearer", token: "key" },
    fetch,
  });
}

test("native imported history passes through both resource and Agent start, never a follow-up", async () => {
  const requests = [];
  const client = clientWith(async (request) => {
    const path = new URL(request.url).pathname;
    if (request.method === "POST") {
      requests.push({
        path,
        key: request.headers.get("Idempotency-Key"),
        body: await request.json(),
      });
      return Response.json(submitted, { status: 201 });
    }
    if (path === "/api/v1/threads/th_imported") return Response.json(thread);
    if (path.endsWith("/inbox/ent_imported"))
      return Response.json({
        ...entry,
        status: "consumed",
        assigned_run_id: "run_imported",
      });
    if (path.endsWith("/runs/run_imported"))
      return Response.json(run("run_imported", "completed"));
    throw new Error(`Unexpected ${request.method} ${path}`);
  });
  try {
    const raw = await client.resources.threads.create(
      { agent_id: "agt_import", message_history: history, payload },
      { idempotencyKey: "raw-history" },
    );
    assert.deepEqual(raw.data.thread.message_history, history);
    const interaction = await client.agents.ref("agt_import").start(payload, {
      idempotencyKey: "semantic-history",
      message_history: history,
    });
    assert.equal((await interaction.result()).run.id, "run_imported");
    assert.deepEqual(
      (await interaction.thread.get()).data.message_history,
      history,
    );
    await client.agents
      .ref("agt_import")
      .send(thread.id, "Only the new message", {
        idempotencyKey: "follow-up",
      });
    assert.deepEqual(
      requests.map((r) => r.path),
      [
        "/api/v1/threads",
        "/api/v1/threads",
        "/api/v1/threads/th_imported/inbox",
      ],
    );
    for (const request of requests.slice(0, 2)) {
      assert.deepEqual(request.body.message_history, history);
      assert.deepEqual(request.body.payload, payload);
    }
    assert.deepEqual(requests[2].body.payload, {
      content: [{ type: "text", text: "Only the new message" }],
    });
    assert.equal(Object.hasOwn(requests[2].body, "message_history"), false);
    assert.deepEqual(
      requests.map((r) => r.key),
      ["raw-history", "semantic-history", "follow-up"],
    );
  } finally {
    client.close();
  }
});

test("native resume sends complete approvals, call outcomes and attachment input atomically", async () => {
  const requests = [];
  const client = clientWith(async (request) => {
    const path = new URL(request.url).pathname;
    if (request.method === "POST") {
      requests.push({
        path,
        key: request.headers.get("Idempotency-Key"),
        body: await request.json(),
      });
      return Response.json(run("run_successor", "accepted"), { status: 201 });
    }
    if (path === "/api/v1/runs/run_successor")
      return Response.json(run("run_successor", "completed"));
    throw new Error(`Unexpected ${request.method} ${path}`);
  });
  const complete = {
    approvals: {
      approval_one: { action: "approve" },
      approval_two: { action: "deny", reason: "Not authorized" },
    },
    calls: {
      call_one: { status: "returned", value: { reviewed: true } },
      call_two: { status: "failed", message: "Source unavailable" },
    },
    input: payload,
  };
  try {
    const raw = await client.resources.runs
      .ref("run_waiting")
      .resume(complete, {
        idempotencyKey: "raw-resume",
      });
    assert.equal(raw.data.id, "run_successor");
    const successor = await client.runs.ref("run_waiting").resume(complete, {
      idempotencyKey: "semantic-resume",
    });
    assert.equal((await successor.wait()).status, "completed");
    assert.deepEqual(
      requests.map((r) => r.path),
      ["/api/v1/runs/run_waiting/resume", "/api/v1/runs/run_waiting/resume"],
    );
    assert.deepEqual(
      requests.map((r) => r.key),
      ["raw-resume", "semantic-resume"],
    );
    assert.deepEqual(
      requests.map((r) => r.body),
      [complete, complete],
    );
    assert.equal(
      requests.some((r) => r.path.endsWith("/inbox")),
      false,
    );
  } finally {
    client.close();
  }
});

for (const status of ["failed", "cancelled"]) {
  test(`normal explicit send continues latest ${status} seal without retry, resume or fork`, async () => {
    const requests = [];
    const prior = {
      ...run(`run_${status}`, status),
      failure: { code: status, message: "Stopped" },
    };
    const next = {
      ...run("run_followup", "completed"),
      parent_run_id: prior.id,
      lineage: "continue",
    };
    const sealedThread = {
      ...thread,
      current_run_id: null,
      last_run_id: prior.id,
    };
    const consumed = { ...entry, status: "consumed", assigned_run_id: next.id };
    const client = clientWith(async (request) => {
      const path = new URL(request.url).pathname;
      requests.push({ method: request.method, path });
      if (path === `/api/v1/runs/${prior.id}`) return Response.json(prior);
      if (path === `/api/v1/threads/${thread.id}`)
        return Response.json(sealedThread);
      if (
        request.method === "POST" &&
        path === `/api/v1/threads/${thread.id}/inbox`
      ) {
        assert.equal(
          request.headers.get("Idempotency-Key"),
          `continue-${status}`,
        );
        assert.deepEqual(await request.json(), {
          agent_id: "agt_import",
          payload: {
            content: [
              { type: "text", text: "Continue from the last checkpoint" },
            ],
          },
        });
        return Response.json(
          { thread: sealedThread, entry: consumed, run: next },
          { status: 201 },
        );
      }
      if (path.endsWith(`/inbox/${entry.id}`)) return Response.json(consumed);
      if (path === `/api/v1/runs/${next.id}`) return Response.json(next);
      throw new Error(`Unexpected ${request.method} ${path}`);
    });
    try {
      assert.equal((await client.runs.ref(prior.id).wait()).status, status);
      const snapshot = (await client.threads.ref(thread.id).get()).data;
      assert.equal(snapshot.last_run_id, prior.id);
      const followup = await client.agents
        .ref("agt_import")
        .send(thread.id, "Continue from the last checkpoint", {
          idempotencyKey: `continue-${status}`,
        });
      const result = await followup.result();
      assert.equal(result.run.id, next.id);
      assert.equal(result.snapshot.data.parent_run_id, prior.id);
      assert.equal(result.status, "completed");
      assert.deepEqual(
        requests.filter((request) => request.method === "POST"),
        [{ method: "POST", path: `/api/v1/threads/${thread.id}/inbox` }],
      );
    } finally {
      client.close();
    }
  });
}
