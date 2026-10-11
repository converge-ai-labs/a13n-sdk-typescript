import assert from "node:assert/strict";
import test from "node:test";
import { createServer } from "node:http";
import { once } from "node:events";
import {
  createClient,
  text,
  json,
  url,
  asset,
  approve,
  deny,
  returned,
  failed,
  PreviewInterruptedError,
  SubmissionUnknownError,
  ApiError,
  ProtocolError,
  WaitTimeoutError,
} from "../dist/index.js";

const baseUrl = "https://service.example.test";
const initial = {
  thread: { id: "thread" },
  entry: {
    id: "entry",
    thread_id: "thread",
    status: "assigned",
    assigned_run_id: "provisional",
  },
  run: { id: "provisional", thread_id: "thread" },
};
const entry = (status = "consumed", assigned_run_id = "exact") => ({
  id: "entry",
  thread_id: "thread",
  status,
  assigned_run_id,
});
const run = (status = "completed", output = "final", id = "exact") => ({
  id,
  thread_id: "thread",
  status,
  output,
  pending: null,
  failure: null,
});
const clientFor = (fetch, auth = { type: "bearer", token: "test" }) =>
  createClient({ baseUrl, auth, fetch });
const frame = (type, data, cursor) =>
  `${cursor ? `id: ${cursor}\n` : ""}event: ${type}\ndata: ${JSON.stringify(data)}\n\n`;
const delta = (event, sequence, fields = {}) =>
  frame(
    "delta",
    { run_id: "exact", attempt: 1, sequence, event, item: null, ...fields },
    `${sequence}-0`,
  );
const start = (messageId = "message", role = "assistant", fields = {}) => ({
  type: "TEXT_MESSAGE_START",
  messageId,
  role,
  ...fields,
});
const content = (delta, messageId = "message", fields = {}) => ({
  type: "TEXT_MESSAGE_CONTENT",
  messageId,
  delta,
  ...fields,
});
const fragment = (fields = {}) => ({
  type: "CUSTOM",
  name: "a13n.stream.fragment",
  value: { id: "opaque", index: 0, count: 2, data: '{"type":"CUSTOM",' },
  ...fields,
});

function streaming(source, postReceipt = initial) {
  let seal;
  const sealing = new Promise((resolve) => {
    seal = resolve;
  });
  let reads = 0,
    cancelled = false,
    streams = 0;
  const client = clientFor(async (request) => {
    const path = new URL(request.url).pathname;
    if (request.method === "POST")
      return Response.json(postReceipt, { status: 201 });
    if (path.endsWith("/inbox/entry")) return Response.json(entry());
    if (path.endsWith("/runs/exact")) {
      if (++reads === 1) return Response.json(run("running"));
      await sealing;
      return Response.json(run());
    }
    if (path.endsWith("/stream")) {
      streams++;
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode(source));
          },
          cancel() {
            cancelled = true;
          },
        }),
        { headers: { "Content-Type": "text/event-stream" } },
      );
    }
    throw new Error(`unexpected ${path}`);
  });
  return {
    client,
    seal,
    get cancelled() {
      return cancelled;
    },
    get streams() {
      return streams;
    },
  };
}

async function opened(fixture) {
  const interaction = await fixture.client.agents
    .ref("agent")
    .start("Hi", { idempotencyKey: "explicit" });
  interaction.result({ pollIntervalMs: 1, timeoutMs: 1000 });
  return interaction;
}

test("public constructors preserve ordered parts, duplicates, grouped options, omissions and arbitrary JSON", async () => {
  let body;
  const client = clientFor(async (request) => {
    body = await request.json();
    return Response.json(initial, { status: 201 });
  });
  try {
    const history = [
      {
        kind: "request",
        parts: [{ part_kind: "user-prompt", content: "seed" }],
      },
    ];
    const interaction = await client.agents
      .ref("agent")
      .start(
        [
          "Hi",
          text(""),
          json({ values: [null, false, 0, {}, []] }),
          url("https://example.test/a"),
          asset("asset"),
          asset("asset"),
        ],
        {
          agentRevisionId: null,
          sessionId: null,
          messageHistory: history,
          memories: [],
          environments: [],
          mcpHeaders: {},
          options: {
            configuration: {
              allowed_hosts: [],
              extensions: { native: { empty: "", enabled: false } },
            },
            overrides: { model_settings: { native: [0, null, false] } },
            labels: {},
          },
        },
      );
    assert.match(interaction.idempotencyKey, /^[a-f0-9-]{36}$/);
    assert.equal(interaction.identity.origin, "submitted");
    assert.equal(interaction.run, null);
    assert.equal(interaction.receiptRun.id, "provisional");
    assert.deepEqual(body.payload.content, [
      text("Hi"),
      text(""),
      json({ values: [null, false, 0, {}, []] }),
      url("https://example.test/a"),
      asset("asset"),
      asset("asset"),
    ]);
    assert.equal(body.agent_revision_id, null);
    assert.equal(body.session_id, null);
    assert.deepEqual(body.message_history, history);
    assert.deepEqual(body.mcp_headers, {});
    assert.deepEqual(body.options.configuration.allowed_hosts, []);
    assert.equal("configuration" in body, false);
    await interaction.close();
  } finally {
    client.close();
  }
});

for (const output of ["", false, 0, null, [], {}, { value: [null, false] }]) {
  test(`RunOutcome preserves native output ${JSON.stringify(output)} without Items`, async () => {
    let gets = 0;
    const client = clientFor(async (request) => {
      assert.equal(new URL(request.url).pathname, "/api/v1/runs/exact");
      gets++;
      return Response.json(run("completed", output), {
        headers: { ETag: '"exact"' },
      });
    });
    try {
      const interaction = client.runs.ref("exact").observe({ timeoutMs: 1000 });
      assert.equal(interaction.receipt, undefined);
      assert.equal(interaction.entry, null);
      assert.equal(interaction.thread, null);
      assert.equal(gets, 0);
      const outcome = await interaction.result();
      assert.deepEqual(outcome.output, output);
      assert.equal(
        outcome.text,
        typeof output === "string" ? output : undefined,
      );
      assert.equal(outcome.runId, "exact");
      assert.equal(outcome.threadId, "thread");
      assert.deepEqual(outcome.pendingCalls, []);
      assert.deepEqual(outcome.pendingApprovals, []);
      assert.equal(outcome.snapshot.response.headers.get("ETag"), '"exact"');
      assert.equal(interaction.run, outcome.run);
      assert.equal(gets, 1);
      await interaction.close();
    } finally {
      client.close();
    }
  });
}

test("Entry identity recovery uses the same core, no I/O until observe, no receipt or provisional authority", async () => {
  const paths = [];
  const states = [entry("assigned", "wrong"), entry("pending", null), entry()];
  const client = clientFor(async (request) => {
    const path = new URL(request.url).pathname;
    paths.push(path);
    return Response.json(
      path.endsWith("/inbox/entry") ? states.shift() : run("waiting"),
    );
  });
  try {
    const interaction = client.threads
      .ref("thread")
      .entry("entry")
      .interaction({ pollIntervalMs: 1 });
    assert.equal(paths.length, 0);
    assert.equal(interaction.identity.origin, "recovered_entry");
    assert.equal(interaction.receipt, undefined);
    assert.equal(interaction.run, null);
    assert.equal((await interaction.result()).runId, "exact");
    assert.equal(
      paths.filter((path) => path.endsWith("/inbox/entry")).length,
      3,
    );
    assert.equal(paths.includes("/api/v1/runs/wrong"), false);
    await interaction.close();
  } finally {
    client.close();
  }
});

test("one public resume answer map partitions both native maps atomically, preserving null/empty/prototype keys", async () => {
  let posted,
    posts = 0;
  const client = clientFor(async (request) => {
    if (request.method === "POST") {
      posts++;
      posted = await request.json();
      return Response.json(run("accepted", null, "successor"), { status: 201 });
    }
    assert.equal(new URL(request.url).pathname, "/api/v1/runs/successor");
    return Response.json(run("waiting", null, "successor"));
  });
  try {
    const answers = {
      approved: approve(),
      omitted: deny(),
      nullable: deny(null),
      empty: deny(""),
      call: returned(null),
      bad: failed("failure"),
      ["__proto__"]: returned(false),
    };
    const next = await client.runs.ref("exact").resume(answers, {
      input: ["Continue", json(0)],
      idempotencyKey: "resume-key",
    });
    assert.equal(next.identity.origin, "resumed");
    assert.equal(next.identity.runId, "successor");
    assert.equal(next.idempotencyKey, "resume-key");
    assert.equal(next.entry, null);
    assert.equal(next.receipt.response.status, 201);
    assert.equal(next.run, null);
    assert.deepEqual(posted.approvals, {
      approved: approve(),
      omitted: deny(),
      nullable: deny(null),
      empty: deny(""),
    });
    assert.deepEqual(posted.calls, {
      call: returned(null),
      bad: failed("failure"),
      ["__proto__"]: returned(false),
    });
    assert.deepEqual(posted.input.content, [text("Continue"), json(0)]);
    assert.equal((await next.result()).runId, "successor");
    assert.equal(posts, 1);
    await next.close();
  } finally {
    client.close();
  }
});

test("preview emits only trusted root assistant strings and ignores child/hidden/unknown custom and unrelated domains", async () => {
  const source = [
    delta(start(), 1),
    delta(content("child", "message", { subagentRunId: "child" }), 2),
    delta(fragment({ subagentRunId: "child" }), 3),
    delta(content("hidden", "message", { metadata: { display: false } }), 4),
    delta(
      { type: "CUSTOM", name: "vendor.unknown", value: { sequence: 999 } },
      5,
    ),
    delta(start("user", "user"), 6),
    delta(content("user", "user"), 7),
    delta(content("foreign"), 50, { run_id: "foreign", attempt: 9 }),
    frame("boundary", { run_id: "exact", attempt: 1, sequence: 2 }, "80-0"),
    delta(content(""), 8),
    delta(content("Root"), 9),
  ].join("");
  const fixture = streaming(source);
  const interaction = await opened(fixture);
  try {
    const preview = interaction.textStream();
    assert.equal(fixture.streams, 0, "preview is lazy");
    assert.equal((await preview.next()).value, "");
    assert.equal((await preview.next()).value, "Root");
    fixture.seal();
    assert.equal((await interaction.result()).text, "final");
    assert.equal((await preview.next()).done, true);
    assert.equal(fixture.streams, 1);
  } finally {
    fixture.seal();
    await interaction.close();
    fixture.client.close();
  }
});

for (const [name, source] of [
  [
    "gap",
    delta(start(), 1) + frame("gap", { run_id: "exact", position: "1-2" }),
  ],
  ["reset", delta(start(), 1) + frame("reset", { run_id: "exact" })],
  ["missing start", delta(content("untrusted"), 1)],
  ["root custom fragment", delta(fragment(), 1)],
  ["delta discontinuity", delta(start(), 1) + delta(content("hole"), 3)],
  [
    "attempt change",
    delta(start(), 1) + delta(content("other"), 2, { attempt: 2 }),
  ],
  ["ambiguous start", delta(start(), 1) + delta(start(), 2)],
  [
    "bounded identity exhaustion",
    Array.from({ length: 9 }, (_, i) =>
      delta(start(`message-${i}`), i + 1),
    ).join(""),
  ],
]) {
  test(`preview ${name} interruption is sticky, preserves result and permits sequential native raw`, async () => {
    const fixture = streaming(
      source +
        delta(
          { type: "CUSTOM", name: "raw.after.interruption", value: null },
          100,
        ),
    );
    const interaction = await opened(fixture);
    try {
      let interruption;
      await assert.rejects(interaction.textStream().next(), (error) => {
        interruption = error;
        return error instanceof PreviewInterruptedError;
      });
      assert.equal(fixture.cancelled, false);
      await assert.rejects(
        interaction.textStream().next(),
        (error) => error === interruption,
      );
      const raw = interaction[Symbol.asyncIterator]();
      assert.equal(
        (await raw.next()).value.frame.data.event.name,
        "raw.after.interruption",
      );
      fixture.seal();
      assert.equal((await interaction.result()).text, "final");
      assert.equal((await raw.next()).done, true);
    } finally {
      fixture.seal();
      await interaction.close();
      fixture.client.close();
    }
  });
}

test("raw/text consumers cannot overlap, preview break leaves an explicit lifetime, joined close works while paused", async () => {
  const fixture = streaming(
    delta(start(), 1) +
      delta(content("first"), 2) +
      delta(content("buffered"), 3),
  );
  const interaction = await opened(fixture);
  try {
    const preview = interaction.textStream();
    assert.equal((await preview.next()).value, "first");
    await assert.rejects(interaction[Symbol.asyncIterator]().next(), TypeError);
    await assert.rejects(interaction.textStream().next(), TypeError);
    await preview.return();
    assert.equal(
      fixture.cancelled,
      false,
      "preview break does not silently close result observation",
    );
    const raw = interaction[Symbol.asyncIterator]();
    assert.equal((await raw.next()).value.frame.data.event.delta, "buffered");
    await Promise.race([
      interaction.close(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("paused close deadlocked")), 200),
      ),
    ]);
    assert.equal(fixture.cancelled, true);
    await assert.rejects(raw.next(), { name: "AbortError" });
    await assert.rejects(interaction.result(), { name: "AbortError" });
  } finally {
    fixture.seal();
    await interaction.close();
    fixture.client.close();
  }
});

test("queue, exact Run, SSE and repeated consumers share one deadline", async () => {
  let cancelled = false;
  const client = clientFor(async (request) => {
    if (request.method === "POST")
      return Response.json(initial, { status: 201 });
    if (request.url.endsWith("/inbox/entry")) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      return Response.json(entry());
    }
    if (request.url.endsWith("/runs/exact"))
      return Response.json(run("running"));
    return new Response(
      new ReadableStream({
        cancel() {
          cancelled = true;
        },
      }),
      { headers: { "Content-Type": "text/event-stream" } },
    );
  });
  try {
    const interaction = await client.agents.ref("agent").start("Hi");
    const outcome = interaction.result({ timeoutMs: 60, pollIntervalMs: 1 });
    void outcome.catch(() => undefined);
    assert.equal(interaction.result(), outcome);
    assert.throws(() => interaction.result({ timeoutMs: 1000 }), TypeError);
    await assert.rejects(interaction.textStream().next(), WaitTimeoutError);
    await assert.rejects(outcome, WaitTimeoutError);
    await interaction.close();
    assert.equal(cancelled, true);
  } finally {
    client.close();
  }
});

for (const [name, response] of [
  [
    "network",
    () => {
      throw new Error("connection lost");
    },
  ],
  [
    "primitive cause",
    () => {
      throw "native cause";
    },
  ],
  ["malformed JSON", () => new Response("not JSON", { status: 201 })],
  [
    "malformed receipt",
    () => Response.json({ accepted: true }, { status: 201 }),
  ],
  [
    "body read failure",
    () =>
      new Response(
        new ReadableStream({
          start(controller) {
            controller.error(new Error("body lost"));
          },
        }),
        { status: 201 },
      ),
  ],
]) {
  test(`attempted ${name} retains chosen key, safe operation identities and cause, without retry`, async () => {
    let posts = 0,
      sentKey;
    const client = clientFor(async (request) => {
      posts++;
      sentKey = request.headers.get("Idempotency-Key");
      return response();
    });
    try {
      await assert.rejects(
        client.agents.ref("agent").send("thread", "secret payload"),
        (error) => {
          assert.ok(error instanceof SubmissionUnknownError);
          assert.equal(error.idempotencyKey, sentKey);
          assert.equal(error.operation, "send");
          assert.deepEqual(error.identities, {
            agentId: "agent",
            threadId: "thread",
          });
          assert.notEqual(error.cause, undefined);
          assert.equal(JSON.stringify(error).includes("secret payload"), false);
          return true;
        },
      );
      assert.equal(posts, 1);
    } finally {
      client.close();
    }
  });
}

test("auth, local validation, prior cancellation and missing crypto fail before dispatch; known rejection remains ApiError", async () => {
  let fetches = 0;
  const authFailure = new Error("token unavailable");
  const client = clientFor(
    async () => {
      fetches++;
      return Response.json(initial);
    },
    {
      type: "bearer",
      token: async () => {
        throw authFailure;
      },
    },
  );
  try {
    await assert.rejects(
      client.agents.ref("agent").start("Hi"),
      (error) => error === authFailure,
    );
    const abort = new AbortController();
    const reason = new Error("before dispatch");
    abort.abort(reason);
    await assert.rejects(
      client.agents.ref("agent").start("Hi", { signal: abort.signal }),
      (error) => error === reason,
    );
    await assert.rejects(client.agents.ref("agent").send("", "Hi"), TypeError);
    const original = Object.getOwnPropertyDescriptor(globalThis, "crypto");
    try {
      Object.defineProperty(globalThis, "crypto", {
        configurable: true,
        value: undefined,
      });
      await assert.rejects(client.agents.ref("agent").start("Hi"), TypeError);
    } finally {
      Object.defineProperty(globalThis, "crypto", original);
    }
    assert.equal(fetches, 0);
  } finally {
    client.close();
  }
  const rejecting = clientFor(async () =>
    Response.json(
      {
        error: {
          code: "conflict",
          message: "Immutable configuration",
          details: { reason: "immutable" },
          request_id: "request",
        },
      },
      { status: 409 },
    ),
  );
  try {
    await assert.rejects(
      rejecting.agents.ref("agent").start("Hi"),
      (error) => error instanceof ApiError && error.requestId === "request",
    );
  } finally {
    rejecting.close();
  }
});

test("canonical rejection with a null request ID remains ApiError without replay", async () => {
  let writes = 0;
  const client = clientFor(async () => {
    writes++;
    return Response.json(
      {
        error: {
          code: "conflict",
          message: "Immutable configuration",
          details: { reason: "immutable" },
          request_id: null,
        },
      },
      { status: 409 },
    );
  });
  try {
    await assert.rejects(
      client.agents.ref("agent").start("Hi"),
      (error) =>
        error instanceof ApiError &&
        !(error instanceof SubmissionUnknownError) &&
        error.status === 409 &&
        error.code === "conflict" &&
        error.requestId === null,
    );
    assert.equal(writes, 1);
  } finally {
    client.close();
  }
});

test("caller abort after actual mutation attempt is unknown with native cancellation cause", async () => {
  const abort = new AbortController();
  const reason = new DOMException("during dispatch", "AbortError");
  const client = clientFor(async (request) => {
    abort.abort(reason);
    request.signal.throwIfAborted();
  });
  try {
    await assert.rejects(
      client.agents
        .ref("agent")
        .start("Hi", { idempotencyKey: "durable", signal: abort.signal }),
      (error) =>
        error instanceof SubmissionUnknownError &&
        error.idempotencyKey === "durable" &&
        error.cause === reason,
    );
  } finally {
    client.close();
  }
});

test("real Fetch: joined close cancels an idle SSE transport while the public iterator is paused", async () => {
  let streamClosed;
  const closed = new Promise((resolve) => {
    streamClosed = resolve;
  });
  const server = createServer((request, response) => {
    if (request.url.endsWith("/stream")) {
      request.on("close", streamClosed);
      response.writeHead(200, { "Content-Type": "text/event-stream" });
      response.write(delta(start(), 1) + delta(content("real"), 2));
      return;
    }
    response.setHeader("Content-Type", "application/json");
    response.end(
      JSON.stringify(
        request.url.endsWith("/inbox/entry") ? entry() : run("running"),
      ),
    );
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const client = createClient({
    baseUrl: `http://127.0.0.1:${server.address().port}`,
    auth: { type: "bearer", token: "test" },
  });
  const interaction = client.threads
    .ref("thread")
    .entry("entry")
    .interaction({ pollIntervalMs: 5 });
  try {
    const preview = interaction.textStream();
    assert.equal((await preview.next()).value, "real");
    await interaction.close();
    await Promise.race([
      closed,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("transport did not close")), 500),
      ),
    ]);
    await assert.rejects(preview.next(), { name: "AbortError" });
  } finally {
    await interaction.close();
    client.close();
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
});

for (const origin of ["resumed", "exact_run", "recovered_entry"]) {
  test(`${origin} uses the same finite preview reader and exact result core`, async () => {
    const fixture = streaming(
      delta(start(), 1) + delta(content("origin text"), 2),
      run("accepted"),
    );
    let interaction;
    try {
      if (origin === "resumed")
        interaction = await fixture.client.runs
          .ref("waiting")
          .resume({}, { idempotencyKey: "resume" });
      else if (origin === "exact_run")
        interaction = fixture.client.runs.ref("exact").observe();
      else
        interaction = fixture.client.threads
          .ref("thread")
          .entry("entry")
          .interaction();
      assert.equal(interaction.identity.origin, origin);
      if (origin !== "recovered_entry") assert.equal(interaction.entry, null);
      const outcome = interaction.result({
        timeoutMs: 1000,
        pollIntervalMs: 1,
      });
      const preview = interaction.textStream();
      assert.equal((await preview.next()).value, "origin text");
      fixture.seal();
      assert.equal((await outcome).runId, "exact");
      assert.equal((await preview.next()).done, true);
      assert.equal(fixture.streams, 1);
    } finally {
      fixture.seal();
      await interaction?.close();
      fixture.client.close();
    }
  });
}

test("malformed preview transport interrupts projection without poisoning authoritative result", async () => {
  const fixture = streaming("event: delta\ndata: not-json\n\n");
  const interaction = await opened(fixture);
  try {
    await assert.rejects(
      interaction.textStream().next(),
      (error) =>
        error instanceof PreviewInterruptedError &&
        error.cause instanceof ProtocolError,
    );
    fixture.seal();
    assert.equal((await interaction.result()).text, "final");
  } finally {
    fixture.seal();
    await interaction.close();
    fixture.client.close();
  }
});

for (const [name, response] of [
  ["HTML", () => new Response("<html>Gateway timeout</html>", { status: 504 })],
  ["invalid JSON", () => new Response("{bad", { status: 504 })],
  [
    "body read failure",
    () =>
      new Response(
        new ReadableStream({
          start(controller) {
            controller.error(new Error("gateway body lost"));
          },
        }),
        { status: 504 },
      ),
  ],
]) {
  test(`noncanonical 504 ${name} is unknown with key/status/cause while native ApiError remains intact`, async () => {
    let writes = 0,
      key;
    const client = clientFor(async (request) => {
      writes++;
      key = request.headers.get("Idempotency-Key");
      return response();
    });
    try {
      await assert.rejects(
        client.agents.ref("agent").start("Hi"),
        (error) =>
          error instanceof SubmissionUnknownError &&
          error.idempotencyKey === key &&
          error.cause instanceof ApiError &&
          error.cause.status === 504 &&
          error.cause.cause instanceof Error,
      );
      assert.equal(writes, 1);
      await assert.rejects(
        client.resources.threads.create(
          { agent_id: "agent", payload: { content: [] } },
          { idempotencyKey: "native" },
        ),
        (error) =>
          error instanceof ApiError &&
          error.status === 504 &&
          error.code === "http_error",
      );
      assert.equal(writes, 2);
    } finally {
      client.close();
    }
  });
}

test("a boundary ahead of received deltas interrupts only preview; late boundaries do not repair or regress", async () => {
  const fixture = streaming(
    delta(start(), 1) +
      frame("boundary", { run_id: "exact", attempt: 1, sequence: 3 }, "30-0") +
      delta({ type: "CUSTOM", name: "raw" }, 4),
  );
  const interaction = await opened(fixture);
  try {
    await assert.rejects(
      interaction.textStream().next(),
      PreviewInterruptedError,
    );
    const raw = interaction[Symbol.asyncIterator]();
    assert.equal((await raw.next()).value.frame.data.sequence, 4);
    fixture.seal();
    assert.equal((await interaction.result()).text, "final");
    assert.equal((await raw.next()).done, true);
  } finally {
    fixture.seal();
    await interaction.close();
    fixture.client.close();
  }
});

test("first boundary establishes a coordinate only, hidden START suppression persists until END", async () => {
  const source =
    frame("boundary", { run_id: "exact", attempt: 1, sequence: 5 }, "30-0") +
    [
      start("hidden", "assistant", { metadata: { display: false } }),
      content("never show", "hidden"),
      { type: "TEXT_MESSAGE_END", messageId: "hidden" },
      content("excluded unknown", "unseen", { metadata: { display: false } }),
      {
        type: "TEXT_MESSAGE_END",
        messageId: "unseen",
        metadata: { display: false },
      },
      start(),
      content("visible"),
    ]
      .map((event, index) => delta(event, index + 6))
      .join("");
  const fixture = streaming(source);
  const interaction = await opened(fixture);
  try {
    const preview = interaction.textStream();
    assert.equal((await preview.next()).value, "visible");
    fixture.seal();
    assert.equal((await interaction.result()).text, "final");
    assert.equal((await preview.next()).done, true);
  } finally {
    fixture.seal();
    await interaction.close();
    fixture.client.close();
  }
});
