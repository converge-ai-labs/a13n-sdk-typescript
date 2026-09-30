import assert from "node:assert/strict";
import test from "node:test";
import { createClient, ProtocolError } from "../dist/index.js";
import { threadStream } from "../dist/streams/thread-stream.js";

const gap = 'event: gap\ndata: {"run_id":"run_one"}\n\n';
test("gap-only connections exhaust reconnect budget without a cursor advance", async () => {
  let calls = 0;
  const client = createClient({
    baseUrl: "https://service.example",
    auth: { type: "bearer", token: "key" },
    fetch: async (request) => {
      calls++;
      assert.equal(request.headers.get("Last-Event-ID"), "1-0");
      return new Response(gap, {
        headers: { "Content-Type": "text/event-stream" },
      });
    },
  });
  try {
    const stream = threadStream(
      (options) =>
        client.resources.threads.ref("thread_one").stream.get(options),
      new AbortController().signal,
      { after: "1-0" },
    );
    for (let i = 0; i < 3; i++) {
      const value = (await stream.next()).value;
      assert.deepEqual(value, {
        cursor: null,
        frame: { type: "gap", data: { run_id: "run_one" } },
      });
    }
    await assert.rejects(stream.next(), ProtocolError);
    assert.equal(calls, 3);
  } finally {
    client.close();
  }
});

const frame = (type, id, data) =>
  `${id ? `id: ${id}\n` : ""}event: ${type}\ndata: ${JSON.stringify(data)}\n\n`;
const output = (type, id, sequence) =>
  frame(type, id, {
    run_id: "run_one",
    attempt: 1,
    sequence,
    ...(type === "delta"
      ? { event: { type: "TEXT_MESSAGE_CONTENT", delta: "x" }, item: null }
      : {}),
  });
function fixture(fetch) {
  const client = createClient({
    baseUrl: "https://service.example",
    auth: { type: "bearer", token: "key" },
    fetch,
  });
  return {
    client,
    open: (options) =>
      client.resources.threads.ref("thread_one").stream.get(options),
  };
}
const response = (text) =>
  new Response(text, { headers: { "Content-Type": "text/event-stream" } });

test("gap positions preserve absent, null and canonical recovery targets without cursor IDs", async () => {
  const cases = [
    {},
    { position: null },
    { position: "0-0" },
    { position: "12345678901234567890-99999999999999999999" },
  ];
  const { client, open } = fixture(async () =>
    response(
      cases
        .map((fields) => frame("gap", "", { run_id: "run_one", ...fields }))
        .join(""),
    ),
  );
  const stream = threadStream(open, new AbortController().signal);
  try {
    for (const fields of cases) {
      assert.deepEqual((await stream.next()).value, {
        cursor: null,
        frame: { type: "gap", data: { run_id: "run_one", ...fields } },
      });
    }
  } finally {
    await stream.return();
    client.close();
  }
});

test("malformed gap position and signal cursor are protocol errors", async () => {
  for (const position of [
    "01-2",
    "1-02",
    "-1-2",
    "1",
    "1-2-3",
    "100000000000000000000-0",
    12,
    {},
    true,
  ]) {
    const { client, open } = fixture(async () =>
      response(frame("gap", "", { run_id: "run_one", position })),
    );
    try {
      await assert.rejects(
        threadStream(open, new AbortController().signal).next(),
        ProtocolError,
      );
    } finally {
      client.close();
    }
  }
  const { client, open } = fixture(async () =>
    response(frame("gap", "9-0", { run_id: "run_one", position: "1-9" })),
  );
  try {
    await assert.rejects(
      threadStream(open, new AbortController().signal).next(),
      ProtocolError,
    );
  } finally {
    client.close();
  }
});

test("paired coverage query and applied-only Redis cursor survive reconnects without crossing gap/reset", async () => {
  const calls = [];
  const { client, open } = fixture(async (request) => {
    const url = new URL(request.url);
    calls.push({
      run: url.searchParams.get("run"),
      position: url.searchParams.get("position"),
      after: request.headers.get("Last-Event-ID"),
    });
    return response(
      calls.length === 1
        ? output("delta", "20-0", 6) +
            frame("gap", "", { run_id: "run_one", position: "1-9" }) +
            output("boundary", "21-0", 9) +
            frame("reset", "", { run_id: "run_one" })
        : frame("gap", "", { run_id: "run_one", position: null }),
    );
  });
  const options = { run: "run_one", position: "1-5", after: "19-0" };
  const stream = threadStream(open, new AbortController().signal, options);
  try {
    assert.equal((await stream.next()).value.cursor, "20-0");
    assert.equal(calls[0].after, "19-0");
    // Mutating caller options is not an applied snapshot or coverage advancement.
    options.position = "1-99";
    assert.equal((await stream.next()).value.frame.type, "gap");
    assert.equal((await stream.next()).value.cursor, "21-0");
    assert.equal((await stream.next()).value.frame.type, "reset");
    assert.equal((await stream.next()).value.frame.data.position, null);
    assert.deepEqual(calls, [
      { run: "run_one", position: "1-5", after: "19-0" },
      { run: "run_one", position: "1-5", after: "21-0" },
    ]);
  } finally {
    await stream.return();
    client.close();
  }
});

test("coverage reader rejects unpaired or noncanonical claims before opening HTTP", async () => {
  let calls = 0;
  const { client, open } = fixture(async () => {
    calls++;
    return response(gap);
  });
  try {
    for (const options of [
      { run: "run_one" },
      { position: "1-0" },
      { run: "run_one", position: "01-0" },
      { run: "run_one", position: "1-00" },
    ])
      await assert.rejects(
        threadStream(open, new AbortController().signal, options).next(),
        TypeError,
      );
    assert.equal(calls, 0);
  } finally {
    client.close();
  }
});

test("generated raw SSE forwards paired coverage and optional hint without SDK policy checks", async () => {
  const calls = [];
  const { client, open } = fixture(async (request) => {
    calls.push(request);
    return response(gap);
  });
  try {
    for (const options of [
      { query: { run: "run_one", position: "1-5" }, lastEventId: "19-0" },
      { query: { run: "run_one", position: "1-5" } },
      {},
    ]) {
      const raw = await open(options);
      await raw.close();
    }
    assert.deepEqual(
      calls.map((request) => [
        new URL(request.url).search,
        request.headers.get("Last-Event-ID"),
      ]),
      [
        ["?run=run_one&position=1-5", "19-0"],
        ["?run=run_one&position=1-5", null],
        ["", null],
      ],
    );
  } finally {
    client.close();
  }
});
