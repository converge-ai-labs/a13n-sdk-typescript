import assert from "node:assert/strict";
import test from "node:test";
import {
  createClient,
  ProtocolError,
  SubmissionDispositionError,
} from "../dist/index.js";

const baseUrl = "https://service.example.test";
const initial = {
  thread: { id: "th_one" },
  entry: { id: "ent_one", thread_id: "th_one", status: "pending" },
  run: null,
};
const entry = (status, assigned_run_id = null) => ({
  id: "ent_one",
  thread_id: "th_one",
  status,
  assigned_run_id,
});
const run = (status) => ({
  id: "run_exact",
  thread_id: "th_one",
  status,
  output: { content: ["durable"] },
  pending: null,
  failure: null,
});
const frame = (type, id, data) =>
  `${id ? `id: ${id}\n` : ""}event: ${type}\ndata: ${JSON.stringify(data)}\n\n`;
const delta = (id, run_id) =>
  frame("delta", id, {
    run_id,
    attempt: 1,
    sequence: 1,
    event: { type: "TEXT_MESSAGE_CONTENT", delta: "fragment" },
    item: null,
  });
function fixture(fetch) {
  return createClient({
    baseUrl,
    auth: { type: "bearer", token: "key" },
    fetch,
  });
}

// The returned interaction remains useful without any stream reader or background SSE socket.
test("result-only waits for exact consumed Run, without opening SSE or repeating POST", async () => {
  const paths = [];
  const entries = [
    entry("assigned", "run_other"),
    entry("pending"),
    entry("consumed", "run_exact"),
  ];
  const client = fixture(async (request) => {
    const path = new URL(request.url).pathname;
    paths.push([request.method, path]);
    if (request.method === "POST")
      return Response.json(initial, { status: 201 });
    if (path.endsWith("/inbox/ent_one")) return Response.json(entries.shift());
    if (path.endsWith("/runs/run_exact")) return Response.json(run("waiting"));
    throw new Error(`Unexpected ${path}`);
  });
  const interaction = await client.agents
    .ref("agt_one")
    .start("Hi", { idempotencyKey: "one" });
  assert.equal("wait" in interaction, false);
  const result = await interaction.result({ pollIntervalMs: 1 });
  assert.equal(result.status, "waiting");
  assert.equal(result.run.id, "run_exact");
  assert.equal(result.output.content[0], "durable");
  assert.equal(paths.filter(([method]) => method === "POST").length, 1);
  assert.equal(
    paths.some(
      ([, path]) =>
        path.endsWith("/stream") || path.endsWith("/runs/run_other"),
    ),
    false,
  );
  client.close();
});

test("finite stream filters foreign Runs, preserves exact gap, and finishes with idle SSE", async () => {
  let streamCancelled = false,
    posts = 0,
    reads = 0;
  const paths = [];
  const client = fixture(async (request) => {
    const path = new URL(request.url).pathname;
    paths.push(path);
    if (request.method === "POST") {
      posts++;
      return Response.json(initial, { status: 201 });
    }
    if (path.endsWith("/inbox/ent_one"))
      return Response.json(entry("consumed", "run_exact"));
    if (path.endsWith("/runs/run_exact")) {
      if (++reads === 1) return Response.json(run("accepted"));
      await new Promise((resolve) => setTimeout(resolve, 30));
      return Response.json(run("completed"));
    }
    if (path.endsWith("/stream")) {
      assert.equal(new URL(request.url).search, "");
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(
            new TextEncoder().encode(
              delta("1-0", "run_other") +
                frame("changed", "", { version: 2 }) +
                delta("2-0", "run_exact") +
                frame("gap", "", { run_id: "run_exact", position: "1-7" }) +
                delta("3-0", "run_other"),
            ),
          );
        },
        cancel() {
          streamCancelled = true;
        },
      });
      return new Response(stream, {
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    throw new Error(`Unexpected ${path}`);
  });
  const interaction = await client.agents
    .ref("agt_one")
    .start("Hi", { idempotencyKey: "one" });
  const events = [];
  for await (const event of interaction) events.push(event);
  assert.deepEqual(
    events.map((event) => event.frame.type),
    ["delta", "gap"],
  );
  assert.deepEqual(events[1], {
    cursor: null,
    frame: { type: "gap", data: { run_id: "run_exact", position: "1-7" } },
  });
  assert.equal(
    paths.some((path) => path.endsWith("/items")),
    false,
  );
  assert.equal((await interaction.result()).status, "completed");
  assert.equal(streamCancelled, true);
  assert.equal(posts, 1);
  assert.equal(paths.filter((path) => path.endsWith("/stream")).length, 1);
  client.close();
});

test("immediate completion before attach and failed Entry never fabricate stream output", async () => {
  let streams = 0;
  const client = fixture(async (request) => {
    const path = new URL(request.url).pathname;
    if (request.method === "POST")
      return Response.json(initial, { status: 201 });
    if (path.endsWith("/inbox/ent_one"))
      return Response.json(entry("consumed", "run_exact"));
    if (path.endsWith("/runs/run_exact"))
      return Response.json(run("completed"));
    if (path.endsWith("/stream")) {
      streams++;
      return new Response(new ReadableStream(), {
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    throw new Error(`Unexpected ${path}`);
  });
  const interaction = await client.agents
    .ref("agt_one")
    .start("Hi", { idempotencyKey: "one" });
  const events = [];
  for await (const event of interaction) events.push(event);
  assert.deepEqual(events, []);
  assert.equal((await interaction.result()).status, "completed");
  assert.ok(streams <= 1);
  client.close();

  const failed = fixture(async (request) =>
    request.method === "POST"
      ? Response.json(initial, { status: 201 })
      : Response.json(entry("failed")),
  );
  const bad = await failed.agents
    .ref("agt_one")
    .start("Hi", { idempotencyKey: "two" });
  await assert.rejects(async () => {
    for await (const event of bad)
      assert.fail(`unexpected frame ${event.frame.type}`);
  }, SubmissionDispositionError);
  await assert.rejects(bad.result(), SubmissionDispositionError);
  failed.close();
});

test("close while queued and early iterator break cancel local observer but never remote execution", async () => {
  let reads = 0,
    streamCancelled = false,
    posts = 0;
  const client = fixture(async (request) => {
    const path = new URL(request.url).pathname;
    if (request.method === "POST") {
      posts++;
      return Response.json(initial, { status: 201 });
    }
    if (path.endsWith("/inbox/ent_one")) {
      reads++;
      if (posts === 1) return Response.json(entry("pending"));
      return Response.json(entry("consumed", "run_exact"));
    }
    if (path.endsWith("/runs/run_exact")) return Response.json(run("accepted"));
    if (path.endsWith("/stream"))
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(
              new TextEncoder().encode(delta("2-0", "run_exact")),
            );
          },
          cancel() {
            streamCancelled = true;
          },
        }),
        { headers: { "Content-Type": "text/event-stream" } },
      );
    throw new Error(`Unexpected ${path}`);
  });
  const queued = await client.agents
    .ref("agt_one")
    .start("Hi", { idempotencyKey: "one" });
  const pending = queued.result({ pollIntervalMs: 1 });
  queued.close();
  await assert.rejects(pending, { name: "AbortError" });
  const prior = reads;
  await new Promise((resolve) => setTimeout(resolve, 10));
  assert.equal(reads, prior);
  await assert.rejects(queued.result(), { name: "AbortError" });

  const streaming = await client.agents
    .ref("agt_one")
    .start("Hi", { idempotencyKey: "two" });
  for await (const event of streaming) {
    assert.equal(event.frame.type, "delta");
    break;
  }
  assert.equal(streamCancelled, true);
  await assert.rejects(streaming.result(), { name: "AbortError" });
  assert.equal(posts, 2);
  client.close();
});

// Frames already decoded from one chunk cannot escape after local close or a sealed result.
test("buffered frames are not delivered after close between iterator pulls", async () => {
  let cancelled = false;
  const client = fixture(async (request) => {
    const path = new URL(request.url).pathname;
    if (request.method === "POST")
      return Response.json(initial, { status: 201 });
    if (path.endsWith("/inbox/ent_one"))
      return Response.json(entry("consumed", "run_exact"));
    if (path.endsWith("/runs/run_exact")) return Response.json(run("accepted"));
    if (path.endsWith("/stream"))
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(
              new TextEncoder().encode(
                delta("1-0", "run_exact") + delta("2-0", "run_exact"),
              ),
            );
          },
          cancel() {
            cancelled = true;
          },
        }),
        { headers: { "Content-Type": "text/event-stream" } },
      );
    throw new Error(`Unexpected ${path}`);
  });
  const interaction = await client.agents
    .ref("agt_one")
    .start("Hi", { idempotencyKey: "one" });
  const iterator = interaction[Symbol.asyncIterator]();
  assert.equal((await iterator.next()).value.cursor, "1-0");
  interaction.close();
  await assert.rejects(iterator.next(), { name: "AbortError" });
  assert.equal(cancelled, true);
  await assert.rejects(interaction.result(), { name: "AbortError" });
  client.close();
});

test("terminal result while paused prevents buffered second frame and retains result", async () => {
  let release;
  const sealed = new Promise((resolve) => {
    release = resolve;
  });
  const client = fixture(async (request) => {
    const path = new URL(request.url).pathname;
    if (request.method === "POST")
      return Response.json(initial, { status: 201 });
    if (path.endsWith("/inbox/ent_one"))
      return Response.json(entry("consumed", "run_exact"));
    if (path.endsWith("/runs/run_exact")) {
      await sealed;
      return Response.json(run("completed"));
    }
    if (path.endsWith("/stream"))
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(
              new TextEncoder().encode(
                delta("1-0", "run_exact") + delta("2-0", "run_exact"),
              ),
            );
          },
        }),
        { headers: { "Content-Type": "text/event-stream" } },
      );
    throw new Error(`Unexpected ${path}`);
  });
  const interaction = await client.agents
    .ref("agt_one")
    .start("Hi", { idempotencyKey: "one" });
  const iterator = interaction[Symbol.asyncIterator]();
  assert.equal((await iterator.next()).value.cursor, "1-0");
  release();
  assert.equal((await interaction.result()).status, "completed");
  assert.equal((await iterator.next()).done, true);
  client.close();
});

test("a malformed finite stream closes observation without mutating the remote Run", async () => {
  const paths = [];
  const client = fixture(async (request) => {
    const path = new URL(request.url).pathname;
    paths.push([request.method, path]);
    if (request.method === "POST")
      return Response.json(initial, { status: 201 });
    if (path.endsWith("/inbox/ent_one"))
      return Response.json(entry("consumed", "run_exact"));
    if (path.endsWith("/runs/run_exact")) return Response.json(run("accepted"));
    if (path.endsWith("/stream"))
      return new Response("event: delta\ndata: not-json\n\n", {
        headers: { "Content-Type": "text/event-stream" },
      });
    throw new Error(`Unexpected ${path}`);
  });
  const interaction = await client.agents
    .ref("agt_one")
    .start("Hi", { idempotencyKey: "one" });
  await assert.rejects(async () => {
    for await (const event of interaction)
      assert.fail(`unexpected ${event.frame.type}`);
  }, ProtocolError);
  await assert.rejects(interaction.result(), { name: "AbortError" });
  assert.equal(paths.filter(([method]) => method === "POST").length, 1);
  client.close();
});
