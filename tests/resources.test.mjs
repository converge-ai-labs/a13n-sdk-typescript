import assert from "node:assert/strict";
import test from "node:test";
import {
  createClient,
  ProtocolError,
  WaitTimeoutError,
} from "../dist/index.js";

const baseUrl = "https://service.example";
const json = (value, init = {}) =>
  Response.json(value, { status: init.status ?? 200, headers: init.headers });

const acceptance = (overrides = {}) => ({
  run_id: "run_1234567890abcdef",
  run_version: 1,
  session_id: "session_1234567890abcdef",
  thread_id: "thread_1234567890abcdef",
  thread_version: 1,
  status: "accepted",
  ...overrides,
});

test("Workspace references are local and key-bound Agent start resolves the actual id", async () => {
  const requests = [];
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "secret" },
    fetch: async (request) => {
      requests.push(request);
      if (request.method === "GET")
        return json({ id: "agent_1234567890abcdef", key: "reviewer" });
      return json(acceptance(), { status: 202 });
    },
  });
  const workspace = client.workspaces.ref("ws_1234567890abcdef");
  const agent = workspace.agents.ref("reviewer");
  const thread = workspace.threads.ref("thread_1234567890abcdef");
  const run = workspace.runs.ref("run_1234567890abcdef");
  assert.equal(requests.length, 0);
  assert.equal(thread.id, "thread_1234567890abcdef");
  assert.equal(run.id, "run_1234567890abcdef");

  const result = await agent.start("Review this", {
    idempotencyKey: "start-key",
    body: { environment: null },
  });
  assert.equal(result.outcome, "run_accepted");
  assert.equal(result.run.id, "run_1234567890abcdef");
  assert.equal(result.thread.id, "thread_1234567890abcdef");
  assert.equal(requests.length, 2);
  assert.equal(
    requests[0].url,
    `${baseUrl}/api/v1/workspaces/ws_1234567890abcdef/agents/reviewer`,
  );
  assert.equal(
    requests[1].url,
    `${baseUrl}/api/v1/workspaces/ws_1234567890abcdef/runs`,
  );
  assert.equal(requests[1].headers.get("Idempotency-Key"), "start-key");
  assert.equal(
    requests[1].headers.get("X-A13N-Workspace-ID"),
    "ws_1234567890abcdef",
  );
  assert.deepEqual(await requests[1].json(), {
    agent_id: "agent_1234567890abcdef",
    environment: null,
    input: {
      schema_version: "2",
      content: [{ type: "text", text: "Review this" }],
    },
  });
  assert.equal(result.receipt.response.status, 202);
});

test("ID-bound Agent start dispatches directly and rejects reserved fields before mutation", async () => {
  const requests = [];
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "secret" },
    fetch: async (request) => {
      requests.push(request);
      return json(acceptance(), { status: 202 });
    },
  });
  const agent = client.workspaces
    .ref("ws_1234567890abcdef")
    .agents.ref("agent_1234567890abcdef");
  await agent.start({ schema_version: "2" }, { idempotencyKey: "direct" });
  assert.equal(requests.length, 1);
  await assert.rejects(
    agent.start("bad", {
      idempotencyKey: "bad",
      body: { agent_id: "other" },
    }),
    /binds agent_id locally/,
  );
  assert.equal(requests.length, 1);
});

test("Thread submission preserves accepted and queued outer receipts", async () => {
  const responses = [
    {
      outcome: "run_accepted",
      queue_version: 7,
      run: acceptance(),
      queued_submission: null,
    },
    {
      outcome: "queued",
      queue_version: 8,
      run: null,
      queued_submission: {
        queued_submission_id: "queue_1234567890abcdef",
        thread_id: "thread_1234567890abcdef",
        state: "pending",
      },
    },
  ];
  const client = createClient({
    baseUrl,
    auth: { type: "session", csrfToken: "csrf" },
    fetch: async () => json(responses.shift(), { status: 202 }),
  });
  const thread = client.workspaces
    .ref("ws_1234567890abcdef")
    .threads.ref("thread_1234567890abcdef");
  const accepted = await thread.submit("one", {
    idempotencyKey: "one",
    body: { expected_thread_version: 1 },
  });
  assert.equal(accepted.outcome, "run_accepted");
  assert.equal(accepted.receipt.data.queue_version, 7);
  const queued = await thread.submit("two", {
    idempotencyKey: "two",
    body: { expected_thread_version: 2 },
  });
  assert.equal(queued.outcome, "queued");
  assert.equal(queued.receipt.data.queue_version, 8);
  assert.equal(queued.queuedSubmission.id, "queue_1234567890abcdef");
});

test("Thread submission rejects contradictory dispositions", async () => {
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "secret" },
    fetch: async () =>
      json(
        {
          outcome: "run_accepted",
          queue_version: 1,
          run: acceptance(),
          queued_submission: {
            queued_submission_id: "queue_1234567890abcdef",
            thread_id: "thread_1234567890abcdef",
          },
        },
        { status: 202 },
      ),
  });
  const thread = client.workspaces
    .ref("ws_1234567890abcdef")
    .threads.ref("thread_1234567890abcdef");
  await assert.rejects(
    thread.submit("bad", {
      idempotencyKey: "bad",
      body: { expected_thread_version: 1 },
    }),
    ProtocolError,
  );
});

test("page iteration follows an empty page cursor and rejects cursor loops", async () => {
  const urls = [];
  const pages = [
    { items: [], next_cursor: "next" },
    { items: [{ id: "agent_1234567890abcdef" }], next_cursor: "next" },
  ];
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "secret" },
    fetch: async (request) => {
      urls.push(request.url);
      return json(pages.shift());
    },
  });
  const filters = { limit: 10, enabled: true };
  const iterator = client.workspaces
    .ref("ws_1234567890abcdef")
    .agents.pages(filters);
  assert.deepEqual(filters, { limit: 10, enabled: true });
  assert.deepEqual((await iterator.next()).value.data.items, []);
  await assert.rejects(iterator.next(), ProtocolError);
  assert.equal(urls.length, 2);
  assert.match(urls[1], /cursor=next/);
});

test("Run and queued-submission waits are bounded reads and queue wait never consumes", async () => {
  let runReads = 0;
  const paths = [];
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "secret" },
    fetch: async (request) => {
      paths.push(new URL(request.url).pathname);
      if (request.url.includes("queued-submissions")) {
        const state = paths.filter((path) =>
          path.includes("queued-submissions"),
        ).length;
        return json({ state: state === 1 ? "pending" : "consumed" });
      }
      runReads++;
      return json({ status: "running" });
    },
  });
  const workspace = client.workspaces.ref("ws_1234567890abcdef");
  await assert.rejects(
    workspace.runs
      .ref("run_1234567890abcdef")
      .wait({ timeoutMs: 20, pollIntervalMs: 5 }),
    WaitTimeoutError,
  );
  assert.ok(runReads >= 1);
  const queue = await workspace.threads
    .ref("thread_1234567890abcdef")
    .queuedSubmissions.ref("queue_1234567890abcdef")
    .wait({ timeoutMs: 100, pollIntervalMs: 1 });
  assert.equal(queue.data.state, "consumed");
  assert.ok(paths.every((path) => !path.endsWith("/consume")));
});

test("public auth sends no credentials and shutdown wins over a pending token callback", async () => {
  let publicRequest;
  const publicClient = createClient({
    baseUrl,
    auth: { type: "public" },
    fetch: async (request) => {
      publicRequest = request;
      return json({});
    },
  });
  await publicClient.http.GET("/api/v1/auth/context");
  assert.equal(publicRequest.headers.get("Authorization"), null);
  assert.equal(publicRequest.credentials, "omit");
  assert.throws(
    () =>
      publicClient.notifications({
        subscriptions: [],
        onNotification() {},
        onState() {},
        onError() {},
      }),
    /Public clients/,
  );

  let resolveToken;
  let dispatches = 0;
  const token = new Promise((resolve) => {
    resolveToken = resolve;
  });
  const bearer = createClient({
    baseUrl,
    auth: { type: "bearer", token: () => token },
    fetch: async () => {
      dispatches++;
      return json({});
    },
  });
  const pending = bearer.http.GET("/api/v1/auth/context");
  bearer.close();
  resolveToken("secret");
  await assert.rejects(pending, { name: "AbortError" });
  assert.equal(dispatches, 0);
});
