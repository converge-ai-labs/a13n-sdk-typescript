import assert from "node:assert/strict";
import test from "node:test";
import { ApiError, createClient, ProtocolError } from "../dist/index.js";
import { decodeSse, TruncatedStreamError } from "../dist/streams/sse.js";
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
    client.api.users.me.update({ name: "A" }, { ifMatch: '"version"' }),
    /CSRF/,
  );
  client.setCsrfToken("csrf-proof");
  await client.api.users.me.update({ name: "A" }, { ifMatch: '"version"' });
  assert.equal(requests[0].headers.get("X-CSRF-Token"), "csrf-proof");
  assert.equal(requests[0].headers.get("If-Match"), '"version"');
  assert.equal(requests[0].credentials, "same-origin");
  assert.deepEqual(await requests[0].json(), { name: "A" });
  client.setCsrfToken(undefined);
  await client.api.auth.passwordReset.confirm({
    token: "proof",
    password: "updated",
  });
  await client.api.auth.emailChange.confirm({ token: "proof" });
  await client.api.invitations.ref("inv_test").accept({ token: "proof" });
  await client.api.auth.bootstrap({
    email: "owner@example.test",
    password: "test-only",
  });
  assert.equal(requests.length, 5);
  for (const request of requests.slice(1))
    assert.equal(request.headers.get("X-CSRF-Token"), null);
  client.close();
  await assert.rejects(client.api.users.me.get(), {
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
  await client.api.users.me.get();
  assert.equal(calls, 2);
  calls = 0;
  await assert.rejects(
    client.api.threads.create(
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
  await client.api.users.me.avatar.replace(new Blob([bytes]), {
    contentType: "image/png",
    ifMatch: '"v1"',
  });
  await client.api.uploads.create(
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
  // A clean close mid-frame drops the partial frame and reports a retryable truncation.
  const complete = [];
  await assert.rejects(
    async () => {
      for await (const frame of decodeSse(
        chunks("id: 1-0\ndata: one\n\nid: 2-0\nevent: delta\ndata: par"),
      ))
        complete.push(frame);
    },
    (error) =>
      error instanceof TruncatedStreamError &&
      error instanceof ProtocolError &&
      error.message === "The stream ended inside an SSE frame.",
  );
  assert.deepEqual(complete, [{ id: "1-0", event: "message", data: "one" }]);
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
    (options) => client.api.threads.ref("th_one").stream.get(options),
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
      (options) => client.api.threads.ref("th").stream.get(options),
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
  await client.api.healthz.get();
  await client.api.readyz.get();
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

const encoder = new TextEncoder();
function byteChunks(...parts) {
  return new ReadableStream({
    start(controller) {
      for (const part of parts)
        controller.enqueue(
          typeof part === "string" ? encoder.encode(part) : part,
        );
      controller.close();
    },
  });
}
async function collect(body) {
  const frames = [];
  try {
    for await (const frame of decodeSse(body)) frames.push(frame);
  } catch (error) {
    return { frames, error };
  }
  return { frames };
}

test("SSE UTF-8: EOF inside a multi-byte character is a truncation that drops the partial frame", async () => {
  const emoji = encoder.encode("😀");
  for (let cut = 1; cut < emoji.length; cut++) {
    const { frames, error } = await collect(
      byteChunks(
        "id: 1-0\ndata: one\n\n",
        "id: 2-0\ndata: ",
        emoji.slice(0, cut),
      ),
    );
    assert.deepEqual(frames, [{ id: "1-0", event: "message", data: "one" }]);
    assert.ok(error instanceof TruncatedStreamError, `cut ${cut}`);
    assert.ok(error instanceof ProtocolError);
    assert.equal(error.message, "The stream ended inside a UTF-8 sequence.");
  }
});

test("SSE UTF-8: genuinely invalid bytes stay fatal ProtocolError, not truncation", async () => {
  const emoji = encoder.encode("😀");
  const cases = {
    "0xFF mid-stream": [
      encoder.encode("data: a"),
      Uint8Array.of(0xff),
      "b\n\n",
    ],
    "lone continuation byte": [
      encoder.encode("data: "),
      Uint8Array.of(0x80),
      "\n\n",
    ],
    "lone continuation byte as final chunk": [
      "id: 1-0\ndata: one\n\ndata: ",
      Uint8Array.of(0x80),
    ],
    "0xFF as final chunk": ["data: ", Uint8Array.of(0xff)],
    "invalid continuation after lead byte": [
      "data: ",
      emoji.slice(0, 2),
      Uint8Array.of(0x41),
    ],
    "overlong lead byte at EOF": ["data: ", Uint8Array.of(0xc0)],
  };
  for (const [name, parts] of Object.entries(cases)) {
    const { error } = await collect(byteChunks(...parts));
    assert.ok(error instanceof ProtocolError, name);
    assert.ok(!(error instanceof TruncatedStreamError), name);
    assert.equal(error.message, "The SSE stream contains invalid UTF-8.", name);
  }
});

test("SSE UTF-8: a complete multi-byte character at EOF is not a UTF-8 truncation", async () => {
  const emoji = encoder.encode("😀");
  // Split mid-character across chunks, then complete frame: decoded normally.
  const ok = await collect(
    byteChunks("data: ", emoji.slice(0, 2), emoji.slice(2), "\n\n"),
  );
  assert.equal(ok.error, undefined);
  assert.deepEqual(ok.frames, [{ id: "", event: "message", data: "😀" }]);
  // Complete character but no frame terminator: still the frame-level truncation.
  const open = await collect(byteChunks("data: ", emoji));
  assert.deepEqual(open.frames, []);
  assert.ok(open.error instanceof TruncatedStreamError);
  assert.equal(open.error.message, "The stream ended inside an SSE frame.");
});
