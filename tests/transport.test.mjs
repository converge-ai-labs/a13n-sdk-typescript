import assert from "node:assert/strict";
import test from "node:test";
import { ApiError, createClient, ProtocolError } from "../dist/index.js";
import { decodeSse } from "../dist/streams/sse.js";
import { threadStream } from "../dist/streams/thread-stream.js";
import { Transport } from "../dist/transport.js";

const baseUrl = "https://service.example";
const json = (value) => Response.json(value);
function chunks(text) {
  const bytes = new TextEncoder().encode(text);
  return new ReadableStream({
    start(controller) {
      for (const byte of bytes) controller.enqueue(new Uint8Array([byte]));
      controller.close();
    },
  });
}

test("session mutations use X-CSRF-Token; public flows need no CSRF; shutdown aborts", async () => {
  const requests = [];
  const client = createClient({
    baseUrl,
    auth: { type: "session" },
    fetch: async (request) => {
      requests.push(request);
      return json({});
    },
  });
  await assert.rejects(
    client.resources.users.me.update({ name: "A" }, { ifMatch: '"version"' }),
    /CSRF/,
  );
  client.setCsrfToken("csrf-proof");
  await client.resources.users.me.update(
    { name: "A" },
    { ifMatch: '"version"' },
  );
  assert.equal(requests[0].headers.get("X-CSRF-Token"), "csrf-proof");
  assert.equal(requests[0].headers.get("If-Match"), '"version"');
  assert.equal(requests[0].credentials, "same-origin");
  assert.deepEqual(await requests[0].json(), { name: "A" });
  client.setCsrfToken(undefined);
  await client.resources.auth.passwordReset.confirm({
    token: "proof",
    password: "updated",
  });
  await client.resources.auth.emailChange.confirm({ token: "proof" });
  await client.resources.invitations.ref("inv_test").accept({ token: "proof" });
  await client.resources.auth.bootstrap({
    email: "owner@example.test",
    password: "test-only",
  });
  assert.equal(requests.length, 5);
  for (const request of requests.slice(1))
    assert.equal(request.headers.get("X-CSRF-Token"), null);
  client.close();
  await assert.rejects(client.resources.users.me.get(), {
    name: "AbortError",
  });
});

test("credentials cannot escape through a per-call base URL", async () => {
  let calls = 0;
  const transport = new Transport({
    baseUrl,
    auth: { type: "bearer", token: "private" },
    fetch: async () => {
      calls++;
      return json({});
    },
  });
  await assert.rejects(
    transport.fetch(new Request("https://elsewhere.example/api/v1/users/me")),
    /configured Service/,
  );
  assert.equal(calls, 0);
  transport.close();
});

test("safe reads retry; mutations never replay even with idempotency keys", async () => {
  let calls = 0;
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "private" },
    fetch: async () =>
      ++calls === 1
        ? new Response(null, { status: 503, headers: { "Retry-After": "0" } })
        : json({}),
  });
  await client.resources.users.me.get();
  assert.equal(calls, 2);
  calls = 0;
  await assert.rejects(
    client.resources.threads.create(
      {
        agent_id: "agent_test",
        payload: { content: [{ type: "text", text: "hi" }] },
      },
      { idempotencyKey: "one" },
    ),
    ApiError,
  );
  assert.equal(calls, 1);
  client.close();
});

test("raw binary and multipart uploads retain their bytes and content type", async () => {
  const bytes = new Uint8Array([0, 255, 17, 3]);
  let calls = 0;
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "key" },
    fetch: async (request) => {
      calls++;
      if (calls === 1) {
        assert.deepEqual(new Uint8Array(await request.arrayBuffer()), bytes);
        assert.equal(request.headers.get("Content-Type"), "image/png");
      } else {
        assert.match(
          request.headers.get("Content-Type"),
          /^multipart\/form-data; boundary=/,
        );
        const form = await request.formData();
        assert.deepEqual(
          new Uint8Array(await form.get("file").arrayBuffer()),
          bytes,
        );
      }
      return json({});
    },
  });
  await client.resources.users.me.avatar.replace(new Blob([bytes]), {
    contentType: "image/png",
    ifMatch: '"v1"',
  });
  await client.resources.uploads.create(
    { file: new Blob([bytes]) },
    { idempotencyKey: "file-1" },
  );
  assert.equal(calls, 2);
  client.close();
});

test("SSE handles split UTF-8, CRLF, multiline data, non-ID frames and cancellation", async () => {
  const frames = [];
  for await (const frame of decodeSse(
    chunks(
      ": heartbeat\r\nid: 2-0\r\nevent: delta\r\ndata: 你好\r\ndata: world\r\n\r\nevent: changed\r\ndata: {}\r\n\r\n",
    ),
  ))
    frames.push(frame);
  assert.deepEqual(frames, [
    { id: "2-0", event: "delta", data: "你好\nworld" },
    { id: "", event: "changed", data: "{}" },
  ]);
  await assert.rejects(async () => {
    for await (const frame of decodeSse(chunks("data: partial"))) {
      assert.fail(`Unexpected incomplete frame: ${frame.data}`);
    }
  }, ProtocolError);
  let canceled = false;
  const body = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("data: one\n\n"));
    },
    cancel() {
      canceled = true;
    },
  });
  for await (const frame of decodeSse(body)) {
    assert.equal(frame.data, "one");
    break;
  }
  assert.equal(canceled, true);
});

test("Thread SSE cursor advances after consumption only for delta/boundary; gap requests readback", async () => {
  const requests = [];
  const responses = [
    `id: 2-0\nevent: delta\ndata: ${JSON.stringify({ run_id: "run_one", attempt: 1, sequence: 1, event: { type: "TEXT_MESSAGE_CONTENT", messageId: "message_one", delta: "hi" }, item: { id: "itm_one", kind: "text_message", state: "in_progress" } })}\n\nevent: gap\ndata: {"run_id":"run_one"}\n\n`,
    `id: 3-0\nevent: boundary\ndata: {"run_id":"run_one","attempt":1,"sequence":1}\n\n`,
  ];
  const client = createClient({
    baseUrl: `${baseUrl}/prefix`,
    auth: { type: "bearer", token: "key" },
    fetch: async (request) => {
      requests.push(request);
      return new Response(chunks(responses.shift() ?? ""), {
        headers: { "Content-Type": "text/event-stream" },
      });
    },
  });
  const stream = threadStream(
    (options) => client.resources.threads.ref("th_one").stream.get(options),
    new AbortController().signal,
    { after: "1-0" },
  );
  assert.deepEqual((await stream.next()).value.frame.type, "delta");
  assert.deepEqual((await stream.next()).value, {
    cursor: null,
    frame: { type: "gap", data: { run_id: "run_one" } },
  });
  assert.equal((await stream.next()).value.cursor, "3-0");
  assert.equal(
    requests[0].url,
    `${baseUrl}/prefix/api/v1/threads/th_one/stream`,
  );
  assert.equal(requests[0].headers.get("Last-Event-ID"), "1-0");
  assert.equal(requests[1].headers.get("Last-Event-ID"), "2-0");
  await stream.return();
  client.close();
});

test("Thread SSE rejects invalid ID on signals and malformed payload without guessing history", async () => {
  const client = createClient({
    baseUrl,
    auth: { type: "session", workspaceId: "ws" },
    fetch: async () =>
      new Response(
        chunks('id: 2-0\nevent: gap\ndata: {"run_id":"run_one"}\n\n'),
        { headers: { "Content-Type": "text/event-stream" } },
      ),
  });
  await assert.rejects(
    threadStream(
      (options) => client.resources.threads.ref("th").stream.get(options),
      new AbortController().signal,
    ).next(),
    ProtocolError,
  );
  client.close();
});

test("typed health probes stay within the configured origin and exact prefix", async () => {
  const requests = [];
  const client = createClient({
    baseUrl: `${baseUrl}/prefix`,
    auth: { type: "session" },
    fetch: async (request) => {
      requests.push(request);
      return json({ status: "ok" });
    },
  });
  await client.resources.healthz.get();
  await client.resources.readyz.get();
  assert.deepEqual(
    requests.map((request) => request.url),
    [`${baseUrl}/prefix/healthz`, `${baseUrl}/prefix/readyz`],
  );
  const transport = new Transport({
    baseUrl: `${baseUrl}/prefix`,
    auth: { type: "session" },
    fetch: async () => json({}),
  });
  for (const path of [
    "/healthz/extra",
    "/metrics",
    "https://elsewhere.example/healthz",
    `${baseUrl}/healthz`,
  ])
    await assert.rejects(
      transport.fetch(
        new Request(path.startsWith("/") ? `${baseUrl}/prefix${path}` : path),
      ),
      /configured Service/,
    );
  await assert.rejects(
    transport.fetch(
      new Request(`${baseUrl}/prefix/healthz`, { method: "POST" }),
    ),
    /configured Service/,
  );
  transport.close();
  assert.equal(requests.length, 2);
  client.close();
});
