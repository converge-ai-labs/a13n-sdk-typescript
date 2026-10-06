import assert from "node:assert/strict";
import test from "node:test";
import {
  createClient,
  SubmissionDispositionError,
  ProtocolError,
  WaitTimeoutError,
} from "../dist/index.js";

const baseUrl = "https://service.example.test";
const initial = {
  thread: { id: "th_original" },
  entry: {
    id: "ent_one",
    thread_id: "th_original",
    status: "pending",
    assigned_run_id: null,
  },
  run: null,
};
const entry = (status, run = null) => ({
  id: "ent_one",
  thread_id: "th_original",
  status,
  assigned_run_id: run,
  failure: null,
});
const run = (id, status) => ({
  id,
  thread_id: "th_original",
  status,
  output: { content: ["committed"] },
  pending: status === "waiting" ? { items: [] } : null,
  failure: null,
});
const reply = (data, status = 200) =>
  Response.json(data, { status, headers: { ETag: '"v1"' } });

function fixture(fetch) {
  return createClient({
    baseUrl,
    auth: { type: "bearer", token: "test-key" },
    fetch,
  });
}

test("Agent start and send keep full typed request fields, explicit keys and receipt identities", async () => {
  const requests = [];
  const client = fixture(async (request) => {
    requests.push({
      path: new URL(request.url).pathname,
      method: request.method,
      key: request.headers.get("Idempotency-Key"),
      body: await request.json(),
    });
    return reply(initial, 201);
  });
  const agent = client.agents.ref("agt_one");
  assert.equal(requests.length, 0, "Agent binding is local");
  const submitted = await agent.start("Hello", {
    idempotencyKey: "start-001",
    session_id: "ses_one",
    agent_revision_id: null,
    memories: [{ name: "notes", memory_id: "mem_one", access: "read" }],
    mcp_headers: { search: { Authorization: "one" } },
    options: {
      overrides: {
        model_settings: {
          extra_body: {},
          extra_headers: { "x-test": "value" },
        },
      },
    },
  });
  assert.equal(submitted.receipt.response.status, 201);
  assert.equal(submitted.thread.id, "th_original");
  assert.equal(submitted.entry.id, "ent_one");
  assert.equal(submitted.run, null);
  const followup = await agent.send(
    "th_original",
    { content: [{ type: "text", text: "Next" }] },
    {
      idempotencyKey: "send-002",
      agent_revision_id: "rev_one",
    },
  );
  assert.equal(followup.thread.id, "th_original");
  assert.deepEqual(
    requests.map((request) => [request.method, request.path, request.key]),
    [
      ["POST", "/api/v1/threads", "start-001"],
      ["POST", "/api/v1/threads/th_original/inbox", "send-002"],
    ],
  );
  assert.equal(requests[0].body.agent_id, "agt_one");
  assert.deepEqual(requests[0].body.payload, {
    content: [{ type: "text", text: "Hello" }],
  });
  assert.deepEqual(
    requests[0].body.options.overrides.model_settings.extra_body,
    {},
  );
  assert.equal(requests[0].body.agent_revision_id, null);
  assert.equal(requests[1].body.agent_id, "agt_one");
  assert.equal(requests[1].body.agent_revision_id, "rev_one");
  assert.equal("idempotencyKey" in requests[0].body, false);
  client.close();
});

test("Submitted waits for consumed, ignoring assigned-to-pending and later Thread Run", async () => {
  const statuses = [
    entry("pending"),
    entry("assigned", "run_old"),
    entry("pending"),
    entry("consumed", "run_exact"),
  ];
  const paths = [];
  const client = fixture(async (request) => {
    const path = new URL(request.url).pathname;
    paths.push(path);
    if (request.method === "POST") return reply(initial, 201);
    if (path.endsWith("/inbox/ent_one")) return reply(statuses.shift());
    if (path.endsWith("/runs/run_exact"))
      return reply(run("run_exact", "waiting"));
    throw new Error(`unexpected read ${path}`);
  });
  const submitted = await client.agents
    .ref("agt_one")
    .start("Hello", { idempotencyKey: "start-1" });
  const outcome = await submitted.result({
    pollIntervalMs: 1,
    timeoutMs: 1000,
  });
  assert.equal(outcome.status, "waiting");
  assert.equal(outcome.run.id, "run_exact");
  assert.deepEqual(outcome.output, { content: ["committed"] });
  assert.deepEqual(outcome.pending, { items: [] });
  assert.equal(outcome.snapshot.response.headers.get("ETag"), '"v1"');
  assert.equal(
    paths.filter((path) => path.endsWith("/runs/run_old")).length,
    0,
  );
  assert.equal(paths.filter((path) => path === "/api/v1/threads").length, 1);
  assert.equal(
    paths.filter((path) => path.endsWith("/inbox/ent_one")).length,
    4,
  );
  client.close();
});

for (const status of ["failed", "withdrawn"]) {
  test(`settled ${status} Entry yields typed disposition, not unrelated Run success`, async () => {
    const client = fixture(async (request) =>
      request.method === "POST"
        ? reply(initial, 201)
        : reply(entry(status, "run_old")),
    );
    const submitted = await client.agents
      .ref("agt_one")
      .start("Hello", { idempotencyKey: status });
    await assert.rejects(submitted.result({ pollIntervalMs: 1 }), (error) => {
      assert.ok(error instanceof SubmissionDispositionError);
      assert.equal(error.status, status);
      assert.equal(error.entryId, "ent_one");
      assert.equal(error.snapshot.data.assigned_run_id, "run_old");
      return true;
    });
    client.close();
  });
}

test("one deadline covers Entry and Run reads; cancellation inside read preserves reason", async () => {
  let reads = 0;
  const client = fixture(async (request) => {
    if (request.method === "POST") return reply(initial, 201);
    reads++;
    if (new URL(request.url).pathname.endsWith("/inbox/ent_one")) {
      await new Promise((resolve) => setTimeout(resolve, 24));
      return reply(entry("consumed", "run_exact"));
    }
    return new Promise(() => {});
  });
  const submitted = await client.agents
    .ref("agt_one")
    .start("Hello", { idempotencyKey: "timeout" });
  await assert.rejects(
    submitted.result({ timeoutMs: 40, pollIntervalMs: 1 }),
    WaitTimeoutError,
  );
  assert.equal(reads, 2);
  const controller = new AbortController();
  const next = await client.agents
    .ref("agt_one")
    .start("Again", { idempotencyKey: "cancel" });
  const cancelled = next.result({ timeoutMs: 1000, signal: controller.signal });
  const reason = new Error("caller cancelled");
  controller.abort(reason);
  await assert.rejects(cancelled, (error) => error === reason);
  client.close();
});

test("Run resume returns distinct handle and committed Items readback, never follows successors", async () => {
  const requests = [];
  const client = fixture(async (request) => {
    requests.push([
      request.method,
      new URL(request.url).pathname,
      request.headers.get("Idempotency-Key"),
    ]);
    if (request.method === "POST")
      return reply(run("run_successor", "accepted"), 201);
    if (request.url.endsWith("/items"))
      return reply({
        run: run("run_one", "completed"),
        items: [],
        baseline: true,
        continuation: null,
        complete: true,
        position: null,
      });
    return reply(run("run_one", "completed"));
  });
  const original = client.runs.ref("run_one");
  const successor = await original.resume(
    { approvals: {}, calls: {} },
    { idempotencyKey: "resume-001" },
  );
  assert.equal(successor.id, "run_successor");
  assert.equal(original.id, "run_one");
  assert.equal(successor.receipt.response.status, 201);
  const outcome = await original.wait({ timeoutMs: 1000 });
  assert.equal(outcome.run.id, "run_one");
  assert.equal(outcome.status, "completed");
  assert.equal((await original.items()).data.run.id, "run_one");
  assert.deepEqual(requests, [
    ["POST", "/api/v1/runs/run_one/resume", "resume-001"],
    ["GET", "/api/v1/runs/run_one", null],
    ["GET", "/api/v1/runs/run_one/items", null],
  ]);
  client.close();
});

test("session sends workspace only to declared business routes and preserves admin/public isolation", async () => {
  const seen = [];
  const client = createClient({
    baseUrl,
    auth: { type: "session", workspaceId: "ws_one", csrfToken: "csrf" },
    fetch: async (request) => {
      seen.push([
        new URL(request.url).pathname,
        request.headers.get("X-Workspace-ID"),
        request.headers.get("X-CSRF-Token"),
      ]);
      return reply({ items: [], next_cursor: null });
    },
  });
  await client.resources.agents.list();
  await client.resources.organizations.list();
  await client.resources.auth.session.get();
  await client.resources.threads.create(
    { agent_id: "agt_one", payload: { content: [] } },
    { idempotencyKey: "once" },
  );
  assert.deepEqual(seen, [
    ["/api/v1/agents", "ws_one", null],
    ["/api/v1/organizations", null, null],
    ["/api/v1/auth/session", null, null],
    ["/api/v1/threads", "ws_one", "csrf"],
  ]);
  client.close();
});

test("Run wait rejects an unrelated running response on the first read", async () => {
  let reads = 0;
  const client = fixture(async () => {
    reads++;
    return reply(run("run_other", "running"));
  });
  await assert.rejects(
    client.runs.ref("run_exact").wait({ timeoutMs: 1000, pollIntervalMs: 1 }),
    ProtocolError,
  );
  assert.equal(reads, 1);
  client.close();
});

test("Interaction rejects a Run whose returned identity differs from the consumed Entry", async () => {
  const client = fixture(async (request) => {
    if (request.method === "POST") return reply(initial, 201);
    if (request.url.endsWith("/inbox/ent_one"))
      return reply(entry("consumed", "run_exact"));
    return reply(run("run_other", "running"));
  });
  const interaction = await client.agents
    .ref("agt_one")
    .start("Hi", { idempotencyKey: "once" });
  await assert.rejects(interaction.result({ timeoutMs: 1000 }), ProtocolError);
  client.close();
});
