import assert from "node:assert/strict";
import test from "node:test";
import {
  ApiError,
  createClient,
  ProtocolError,
  ReplayGapError,
  TransportError,
} from "../dist/index.js";

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

test("external abort wins over reconnect-disabled EOF from a canceled pending read", async () => {
  const controller = new AbortController();
  const reason = new Error("stop pending stream");
  const client = createClient({
    baseUrl,
    auth: { type: "session" },
    fetch: async () => response(pendingStream()),
  });
  const observation = run(client).stream({
    signal: controller.signal,
    reconnect: false,
  });
  const pending = observation.next();
  await new Promise((resolve) => setTimeout(resolve, 0));
  controller.abort(reason);
  await assert.rejects(pending, (error) => error === reason);
});

test("external abort wins over a buffered event and terminal drain", async () => {
  const bufferedController = new AbortController();
  const bufferedReason = { code: "buffered-abort" };
  const bufferedClient = createClient({
    baseUrl,
    auth: { type: "session" },
    fetch: async () => response(stream(event("1-0") + event("2-0"))),
  });
  const buffered = run(bufferedClient).stream({
    signal: bufferedController.signal,
  });
  assert.equal((await buffered.next()).value.cursor, "1-0");
  bufferedController.abort(bufferedReason);
  await assert.rejects(buffered.next(), (error) => error === bufferedReason);

  const terminalController = new AbortController();
  const terminalReason = { code: "terminal-drain-abort" };
  const terminalClient = createClient({
    baseUrl,
    auth: { type: "session" },
    fetch: async () =>
      response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(encoder.encode(event("3-0", "run.completed")));
          },
        }),
      ),
  });
  const terminal = run(terminalClient).stream({
    signal: terminalController.signal,
  });
  assert.equal((await terminal.next()).value.cursor, "3-0");
  const drain = terminal.next();
  await new Promise((resolve) => setTimeout(resolve, 0));
  terminalController.abort(terminalReason);
  await assert.rejects(drain, (error) => error === terminalReason);
});

test("Bearer token callback TypeErrors are not retried as stream transport failures", async () => {
  for (const asynchronous of [false, true]) {
    const original = new TypeError(
      asynchronous ? "async token failure" : "sync token failure",
    );
    let tokenCalls = 0;
    let fetches = 0;
    const token = asynchronous
      ? async () => {
          tokenCalls++;
          throw original;
        }
      : () => {
          tokenCalls++;
          throw original;
        };
    const client = createClient({
      baseUrl,
      auth: { type: "bearer", token },
      fetch: async () => {
        fetches++;
        return response(pendingStream());
      },
    });
    const observation = run(client).stream({ maxReconnects: 1 });
    await assert.rejects(observation.next(), (error) => error === original);
    assert.equal(tokenCalls, 1);
    assert.equal(fetches, 0);
    client.close();
  }
});

test("invalid UTF-8 is a non-retryable protocol failure", async () => {
  let requests = 0;
  const client = createClient({
    baseUrl,
    auth: { type: "session" },
    fetch: async () => {
      requests++;
      return response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new Uint8Array([0xff]));
            controller.close();
          },
        }),
      );
    },
  });
  const observation = run(client).stream({ maxReconnects: 1 });
  await assert.rejects(observation.next(), ProtocolError);
  assert.equal(requests, 1);
});

test("completion-evidence response body transport loss shares bounded recovery", async () => {
  const original = new TypeError("terminated");
  let attachments = 0;
  let evidenceReads = 0;
  const client = createClient({
    baseUrl,
    auth: { type: "session" },
    fetch: async (request) => {
      const path = new URL(request.url).pathname;
      if (path.endsWith("/stream")) {
        attachments++;
        return response(stream(""));
      }
      if (path.endsWith(`/runs/${runId}`)) {
        evidenceReads++;
        return new Response(
          new ReadableStream({
            start(controller) {
              controller.error(original);
            },
          }),
          { headers: { "Content-Type": "application/json" } },
        );
      }
      assert.fail(`Unexpected request: ${request.url}`);
    },
  });
  const observation = run(client).stream({ maxReconnects: 1 });
  await assert.rejects(observation.next(), (error) => {
    assert.ok(error instanceof TransportError);
    assert.equal(error.cause, original);
    return true;
  });
  assert.equal(attachments, 2);
  assert.equal(evidenceReads, 2);
});

test("terminal evidence failures consume one reconnect and preserve the final API error", async () => {
  const paths = [];
  const client = createClient({
    baseUrl,
    auth: { type: "session" },
    fetch: async (request) => {
      const path = new URL(request.url).pathname;
      paths.push(path);
      if (path.endsWith("/stream")) return response(stream(""));
      if (path.endsWith(`/runs/${runId}`))
        return Response.json(
          { error: { code: "temporarily_unavailable", message: "retry" } },
          { status: 503, headers: { "Retry-After": "0" } },
        );
      assert.fail(`Unexpected request: ${request.url}`);
    },
  });
  const observation = run(client).stream({ maxReconnects: 1 });
  await assert.rejects(observation.next(), (error) => {
    assert.ok(error instanceof ApiError);
    assert.equal(error.status, 503);
    assert.equal(error.code, "temporarily_unavailable");
    return true;
  });
  assert.deepEqual(paths, [
    `/api/v1/runs/${runId}/stream`,
    `/api/v1/runs/${runId}`,
    `/api/v1/runs/${runId}/stream`,
    `/api/v1/runs/${runId}`,
  ]);
});
