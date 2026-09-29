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
