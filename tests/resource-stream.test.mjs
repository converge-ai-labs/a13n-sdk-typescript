import assert from "node:assert/strict";
import test from "node:test";
import { createClient, ReplayGapError, TransportError } from "../dist/index.js";

const baseUrl = "https://service.example";
const workspaceId = "ws_1234567890abcdef";
const runId = "run_1234567890abcdef";
const encoder = new TextEncoder();

function event(cursor, eventType = "agui.text_message_content", payload = {}) {
  const envelope = {
    schema_version: "1",
    event_id: `evt_${cursor.replace("-", "_")}`,
    run_id: runId,
    thread_id: "thread_1234567890abcdef",
    event_type: eventType,
    occurred_at: "2026-09-18T00:00:00Z",
    payload,
  };
  return `id: ${cursor}\nevent: ${eventType}\ndata: ${JSON.stringify(envelope)}\n\n`;
}

function stream(text) {
  return new ReadableStream({
    start(controller) {
      if (text) controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });
}

function pendingStream() {
  return new ReadableStream({
    start() {},
  });
}

function response(body, headers = {}) {
  return new Response(body, {
    headers: { "Content-Type": "text/event-stream", ...headers },
  });
}

function run(client) {
  return client.workspaces.ref(workspaceId).runs.ref(runId);
}

test("resource RunStream is lazy, single-reader, and local close resolves a pending read", async () => {
  const requests = [];
  const client = createClient({
    baseUrl,
    auth: { type: "session" },
    fetch: async (request) => {
      requests.push(request);
      return response(pendingStream(), { "X-Request-ID": "req_stream" });
    },
  });
  const observation = run(client).stream();
  assert.equal(requests.length, 0);
  assert.equal(observation.closed, false);
  assert.equal(observation.response, undefined);
  assert.equal(observation[Symbol.asyncIterator](), observation);
  const first = observation.next();
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(requests.length, 1);
  await assert.rejects(observation.next(), /one active reader/);
  await observation.close();
  assert.deepEqual(await first, { done: true, value: undefined });
  assert.equal(observation.closed, true);
  assert.equal(observation.response.status, 200);
  assert.equal(observation.response.headers.get("X-Request-ID"), "req_stream");
  assert.equal(requests[0].headers.get("X-A13N-Workspace-ID"), workspaceId);
  assert.equal(await observation.next().then((value) => value.done), true);
});

test("resource RunStream reattaches only after the yielded cursor is acknowledged", async () => {
  const requests = [];
  let call = 0;
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "secret" },
    maxReadRetries: 5,
    fetch: async (request) => {
      requests.push(request);
      call++;
      if (call === 1)
        return response(
          new ReadableStream({
            start(controller) {
              controller.enqueue(encoder.encode(event("2-0")));
            },
            pull(controller) {
              controller.error(new TypeError("disconnected"));
            },
          }),
        );
      return response(stream(event("3-0", "run.completed")));
    },
  });
  const observation = run(client).stream({ after: "1-0", maxReconnects: 1 });
  const first = await observation.next();
  assert.equal(first.value.cursor, "2-0");
  assert.equal(observation.lastReceivedCursor, "2-0");
  assert.equal(requests.length, 1);
  const second = await observation.next();
  assert.equal(second.value.cursor, "3-0");
  assert.equal(requests.length, 2);
  assert.equal(requests[0].headers.get("Last-Event-ID"), "1-0");
  assert.equal(requests[1].headers.get("Last-Event-ID"), "2-0");
  assert.equal((await observation.next()).done, true);
});

test("external abort rejects with the exact custom reason", async () => {
  const controller = new AbortController();
  const reason = { code: "stop-observing" };
  const client = createClient({
    baseUrl,
    auth: { type: "session" },
    fetch: async () => response(pendingStream()),
  });
  const observation = run(client).stream({ signal: controller.signal });
  const pending = observation.next();
  await new Promise((resolve) => setTimeout(resolve, 0));
  controller.abort(reason);
  await assert.rejects(pending, (error) => error === reason);
  assert.equal(observation.closed, true);
});

test("resource RunStream preserves exact replay-gap wire evidence", async () => {
  const client = createClient({
    baseUrl,
    auth: { type: "session" },
    fetch: async () =>
      response(
        stream(
          `event: a13n.service.replay_gap\ndata: ${JSON.stringify({
            run_id: runId,
            requested_cursor: "1-0",
            retained_floor: "5-0",
            high_watermark: "9-0",
          })}\n\n`,
        ),
      ),
  });
  const observation = run(client).stream({ after: "1-0" });
  await assert.rejects(observation.next(), (error) => {
    assert.ok(error instanceof ReplayGapError);
    assert.equal(error.runId, runId);
    assert.equal(error.requestedCursor, "1-0");
    assert.equal(error.retainedFloor, "5-0");
    assert.equal(error.highWatermark, "9-0");
    return true;
  });
});

test("empty resumed EOF requires sealed finalized projection evidence", async () => {
  const requests = [];
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "secret" },
    fetch: async (request) => {
      requests.push(request);
      const path = new URL(request.url).pathname;
      if (path.endsWith("/stream")) return response(stream(""));
      if (path.endsWith(`/runs/${runId}`))
        return Response.json({ status: "completed" });
      if (path.endsWith(`/runs/${runId}/items`))
        return Response.json({
          items: [],
          next_cursor: null,
          snapshot_version: 1,
          projection_cursor: "4-0",
          complete: true,
          finalized: true,
          incomplete_reason: null,
        });
      assert.fail(`Unexpected request: ${request.url}`);
    },
  });
  const observation = run(client).stream({ after: "4-0", maxReconnects: 1 });
  assert.equal((await observation.next()).done, true);
  assert.deepEqual(
    requests.map((request) => new URL(request.url).pathname),
    [
      `/api/v1/runs/${runId}/stream`,
      `/api/v1/runs/${runId}`,
      `/api/v1/runs/${runId}/items`,
    ],
  );
});

test("clean EOF with recovery disabled exhausts without claiming Run completion", async () => {
  let requests = 0;
  const client = createClient({
    baseUrl,
    auth: { type: "session" },
    fetch: async () => {
      requests++;
      return response(stream(""));
    },
  });
  const observation = run(client).stream({ reconnect: false });
  assert.equal((await observation.next()).done, true);
  assert.equal(requests, 1);
});

test("unconfirmed EOF exhausts its bounded reconnect budget as TransportError", async () => {
  let requests = 0;
  const client = createClient({
    baseUrl,
    auth: { type: "session" },
    fetch: async (request) => {
      requests++;
      if (request.url.endsWith("/stream")) return response(stream(""));
      if (request.url.endsWith(`/runs/${runId}`))
        return Response.json({ status: "running" });
      assert.fail(`Unexpected completion read: ${request.url}`);
    },
  });
  const observation = run(client).stream({ maxReconnects: 1 });
  await assert.rejects(observation.next(), TransportError);
  assert.equal(requests, 4);
});
