import {
  sessionThread,
  sessionRun,
  sessionEntry,
  sessionItem,
} from "./session-fixtures.mjs";
import assert from "node:assert/strict";
import test from "node:test";
import {
  ApiError,
  createClient,
  ProtocolError,
  sessionStream,
} from "../dist/index.js";

const encode = (type, data, id = "") =>
  `${id}event: ${type}\ndata: ${JSON.stringify(data)}\n\n`;
const gap = { thread_id: "thread_one", run_id: "run_one" };
const continuation = {
  run_id: "run_one",
  position: { attempt: 1, sequence: 2 },
  next_ordinal: 3,
  fragments: { pending: { x: { count: 2, parts: ["opaque"], size: 6 } } },
  observer: {
    state: { children: { child: { children: { grandchild: {} } } } },
  },
  memory_sources: {
    message: [
      { kind: "record", memory: "notes", status: "timeout", cursor: null },
    ],
  },
};
const frames = [
  {
    type: "thread",
    data: {
      thread: sessionThread,
      current_run: sessionRun,
      last_run: null,
      entries: [sessionEntry],
    },
  },
  {
    type: "items",
    data: {
      ...gap,
      first: 1,
      items: [sessionItem],
      continuation,
      complete: false,
    },
  },
  {
    type: "delta",
    data: {
      ...gap,
      attempt: 1,
      sequence: 3,
      event: {
        type: "CUSTOM",
        name: "native",
        value: null,
        metadata: { display: false },
        subagentRunId: "child",
      },
      item: {
        id: "item_one",
        kind: "observation",
        state: "in_progress",
        ordinal: null,
        memory_sources: [],
      },
    },
  },
  { type: "gap", data: gap },
];
function fixture(text, { idle = false } = {}) {
  let cancelled = 0;
  const requests = [];
  const bytes = new TextEncoder().encode(text);
  const client = createClient({
    baseUrl: "https://service.example",
    auth: { type: "session", workspaceId: "workspace_one" },
    fetch: async (request) => {
      requests.push(request);
      return new Response(
        new ReadableStream({
          start(controller) {
            // Split UTF-8 and CR/LF boundaries as a real Fetch reader can.
            const width = bytes.length > 65536 ? 65537 : 7;
            for (let i = 0; i < bytes.length; i += width)
              controller.enqueue(bytes.slice(i, i + width));
            if (!idle) controller.close();
          },
          cancel() {
            cancelled++;
          },
        }),
        {
          headers: {
            "Content-Type": "text/event-stream",
            "X-Request-Id": "session-read",
          },
        },
      );
    },
  });
  return { client, requests, cancelled: () => cancelled };
}

test("Session decodes all four native envelopes, ignores unknown events before JSON, and leaves no cursor", async () => {
  const text =
    ": keepalive\r\n\r\nevent: future\r\ndata: not-json\r\n\r\n" +
    frames.map(({ type, data }) => encode(type, data)).join("");
  const f = fixture(text);
  try {
    const raw = await f.client.api.sessions.ref("session_one").stream.get();
    assert.equal(raw.response.headers.get("X-Request-Id"), "session-read");
    assert.deepEqual(await Array.fromAsync(sessionStream(raw)), frames);
    assert.equal(raw.closed, true);
    assert.equal(f.requests.length, 1); // EOF does not reconnect automatically.
    assert.equal(
      new URL(f.requests[0].url).pathname,
      "/api/v1/sessions/session_one/stream",
    );
    assert.equal(new URL(f.requests[0].url).search, "");
    assert.equal(f.requests[0].headers.get("Last-Event-ID"), null);
    assert.equal(f.requests[0].headers.get("X-Workspace-ID"), "workspace_one");
  } finally {
    f.client.close();
  }
});

for (const [label, text] of [
  ["invalid JSON", "event: gap\ndata: {\n\n"],
  ["missing identity", encode("gap", { run_id: "run_one" })],
  [
    "missing nullable item",
    encode("delta", { ...gap, attempt: 1, sequence: 2, event: {} }),
  ],
  [
    "invalid sequence",
    encode("delta", {
      ...gap,
      attempt: 1,
      sequence: 1.5,
      event: {},
      item: null,
    }),
  ],
  [
    "incomplete thread",
    encode("thread", { thread: { id: "thread_one" }, entries: [] }),
  ],
  [
    "invalid items",
    encode("items", {
      ...gap,
      first: 0.5,
      items: [],
      continuation: null,
      complete: false,
    }),
  ],
  [
    "missing continuation",
    encode("items", { ...gap, first: 1, items: [], complete: false }),
  ],
  [
    "Thread boundary",
    encode(
      "delta",
      { run_id: "run_one", attempt: 1, sequence: 1, event: {}, item: null },
      "id: 1-0\n",
    ),
  ],
  ["explicit empty SSE id", encode("gap", gap, "id:\n")],
  ["truncated EOF", "event: gap\ndata: {}"],
]) {
  test(`Session rejects ${label} and closes its owned response`, async () => {
    const f = fixture(text);
    try {
      const raw = await f.client.api.sessions.ref("session_one").stream.get();
      await assert.rejects(Array.fromAsync(sessionStream(raw)), ProtocolError);
      assert.equal(raw.closed, true);
      assert.equal(f.requests.length, 1);
    } finally {
      f.client.close();
    }
  });
}

test("Session iterator break releases an idle response", async () => {
  const f = fixture(encode("gap", gap), { idle: true });
  try {
    const raw = await f.client.api.sessions.ref("session_one").stream.get();
    for await (const frame of sessionStream(raw)) {
      assert.equal(frame.type, "gap");
      break;
    }
    assert.equal(raw.closed, true);
    assert.equal(f.cancelled(), 1);
  } finally {
    f.client.close();
  }
});

test("Session abort cancels an outstanding read and closes the response", async () => {
  const f = fixture("", { idle: true });
  const controller = new AbortController();
  try {
    const raw = await f.client.api.sessions.ref("session_one").stream.get();
    const iterator = sessionStream(raw, { signal: controller.signal });
    const pending = iterator.next();
    controller.abort(new Error("stop-local-observation"));
    await assert.rejects(pending, /stop-local-observation/);
    assert.equal(raw.closed, true);
    assert.equal(f.cancelled(), 1);
  } finally {
    f.client.close();
  }
});

test("Session native opening preserves HTTP refusals and never retries", async () => {
  let calls = 0;
  const client = createClient({
    baseUrl: "https://service.example",
    auth: { type: "bearer", token: "key" },
    fetch: async () => {
      calls++;
      return Response.json(
        { code: "permission_denied", message: "read denied" },
        { status: 403, headers: { "X-Request-Id": "refused" } },
      );
    },
  });
  try {
    await assert.rejects(
      client.api.sessions.ref("session_one").stream.get(),
      (error) =>
        error instanceof ApiError &&
        error.status === 403 &&
        error.requestId === "refused",
    );
    assert.equal(calls, 1);
  } finally {
    client.close();
  }
});

test("caller opens a fresh snapshot after EOF; no Session continuation is sent as Thread progress", async () => {
  const f = fixture(encode("items", frames[1].data));
  try {
    for (let i = 0; i < 2; i++) {
      const raw = await f.client.api.sessions.ref("session_one").stream.get();
      const read = await Array.fromAsync(sessionStream(raw));
      assert.deepEqual(read[0].data.continuation, continuation);
      assert.equal(f.requests[i].headers.get("Last-Event-ID"), null);
      assert.equal(new URL(f.requests[i].url).search, "");
    }
  } finally {
    f.client.close();
  }
});

test("pre-aborted Session decoding releases its reader and cancels the response", async () => {
  const f = fixture("", { idle: true });
  try {
    const raw = await f.client.api.sessions.ref("session_one").stream.get();
    const controller = new AbortController();
    controller.abort(new Error("already-aborted"));
    await assert.rejects(
      sessionStream(raw, { signal: controller.signal }).next(),
      /already-aborted/,
    );
    assert.equal(raw.body.locked, false);
    assert.equal(raw.closed, true);
    assert.equal(f.cancelled(), 1);
  } finally {
    f.client.close();
  }
});

for (const [name, mutate] of [
  [
    "Thread required field",
    (data) => {
      delete data.thread.workspace_id;
    },
  ],
  [
    "Run required field",
    (data) => {
      delete data.current_run.options;
    },
  ],
  [
    "Run enum",
    (data) => {
      data.current_run.status = "made_up";
    },
  ],
  [
    "Entry required field",
    (data) => {
      delete data.entries[0].payload;
    },
  ],
  [
    "nested scalar",
    (data) => {
      data.thread.labels = [];
    },
  ],
]) {
  test(`Session schema rejects missing/invalid nested ${name} and closes`, async () => {
    const data = structuredClone(frames[0].data);
    mutate(data);
    const f = fixture(encode("thread", data), { idle: true });
    try {
      const raw = await f.client.api.sessions.ref("session_one").stream.get();
      await assert.rejects(sessionStream(raw).next(), ProtocolError);
      assert.equal(raw.closed, true);
      assert.equal(raw.body.locked, false);
      assert.equal(f.cancelled(), 1);
    } finally {
      f.client.close();
    }
  });
}

test("Session follows integer constraints exactly, preserves extras and arbitrary delta event JSON", async () => {
  const values = [
    {
      type: "delta",
      data: {
        ...gap,
        attempt: -1,
        sequence: -2,
        event: { any: [null, false, 0] },
        item: null,
        future: "kept",
      },
    },
    {
      type: "items",
      data: {
        ...gap,
        first: -1,
        items: [],
        continuation: null,
        complete: false,
        future: { nested: true },
      },
    },
  ];
  const f = fixture(
    values.map(({ type, data }) => encode(type, data)).join(""),
  );
  try {
    const raw = await f.client.api.sessions.ref("session_one").stream.get();
    assert.deepEqual(await Array.fromAsync(sessionStream(raw)), values);
  } finally {
    f.client.close();
  }
});

test("Session nested continuation minima remain enforced", async () => {
  const data = structuredClone(frames[1].data);
  data.continuation.position.sequence = -1;
  const f = fixture(encode("items", data));
  try {
    const raw = await f.client.api.sessions.ref("session_one").stream.get();
    await assert.rejects(sessionStream(raw).next(), ProtocolError);
    assert.equal(raw.closed, true);
  } finally {
    f.client.close();
  }
});

test("Session accepts a valid snapshot above the Thread 1MiB cap; caller can choose a limit", async () => {
  const snapshot = {
    ...frames[1].data,
    items: Array.from({ length: 40 }, (_, index) => ({
      ...sessionItem,
      id: `item_${index}`,
      ordinal: index + 1,
      content: { text: "x".repeat(32000) },
    })),
  };
  const text = encode("items", snapshot);
  assert.ok(text.length > 1024 * 1024);
  for (const limit of [undefined, 1024 * 1024]) {
    const f = fixture(text);
    try {
      const raw = await f.client.api.sessions.ref("session_one").stream.get();
      const iterator = sessionStream(
        raw,
        limit === undefined ? {} : { maxFrameCharacters: limit },
      );
      if (limit === undefined) {
        assert.deepEqual((await iterator.next()).value, {
          type: "items",
          data: snapshot,
        });
        await iterator.return();
      } else await assert.rejects(iterator.next(), /size limit/);
      assert.equal(raw.closed, true);
      assert.equal(raw.body.locked, false);
    } finally {
      f.client.close();
    }
  }
});

test("Session abort while paused suppresses buffered frames and releases the reader", async () => {
  const f = fixture(encode("gap", gap).repeat(2), { idle: true });
  const controller = new AbortController();
  try {
    const raw = await f.client.api.sessions.ref("session_one").stream.get();
    const iterator = sessionStream(raw, { signal: controller.signal });
    assert.equal((await iterator.next()).value.type, "gap");
    controller.abort(new Error("paused-abort"));
    await assert.rejects(iterator.next(), /paused-abort/);
    assert.equal(raw.closed, true);
    assert.equal(raw.body.locked, false);
    assert.equal(f.cancelled(), 1);
  } finally {
    f.client.close();
  }
});
