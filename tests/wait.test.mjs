import assert from "node:assert/strict";
import test from "node:test";
import { createClient, WaitTimeoutError } from "../dist/index.js";

function setup(fetch, auth = { type: "bearer", token: "test" }) {
  const client = createClient({ baseUrl: "https://service.test", auth, fetch });
  return { client, run: client.runs.ref("run") };
}
const timeout = (error) =>
  error instanceof WaitTimeoutError && error.timeoutMs === 10;

for (const stage of ["fetch", "body", "authentication", "retry"]) {
  test(`Run deadline covers pending ${stage}`, { timeout: 2000 }, async () => {
    let requestSignal;
    const { client, run } = setup(
      async (request) => {
        requestSignal = request.signal;
        if (stage === "fetch")
          return new Promise((_, reject) =>
            request.signal.addEventListener(
              "abort",
              () => reject(new DOMException("Wrapped abort", "AbortError")),
              { once: true },
            ),
          );
        if (stage === "retry")
          return new Response(null, {
            status: 503,
            headers: { "Retry-After": "30" },
          });
        return new Response(
          new ReadableStream({
            start(controller) {
              request.signal.addEventListener(
                "abort",
                () => controller.error(request.signal.reason),
                { once: true },
              );
            },
          }),
          { headers: { "Content-Type": "application/json" } },
        );
      },
      stage === "authentication"
        ? { type: "bearer", token: () => new Promise(() => {}) }
        : undefined,
    );
    try {
      await assert.rejects(run.wait({ timeoutMs: 10 }), timeout);
      if (stage !== "authentication") assert.equal(requestSignal.aborted, true);
    } finally {
      client.close();
    }
  });
}

test(
  "caller abort and client close cancel in-flight and sleeping waits without becoming timeouts",
  { timeout: 3000 },
  async () => {
    for (const sleeping of [false, true]) {
      for (const close of [false, true]) {
        let started;
        const dispatched = new Promise((resolve) => {
          started = resolve;
        });
        const { client, run } = setup(async (request) => {
          started();
          if (sleeping) return Response.json({ id: "run", status: "running" });
          return new Promise((_, reject) =>
            request.signal.addEventListener(
              "abort",
              () => reject(request.signal.reason),
              { once: true },
            ),
          );
        });
        const caller = new AbortController();
        const reason = new Error("Caller cancelled");
        const pending = run.wait({
          timeoutMs: 1000,
          pollIntervalMs: 500,
          signal: caller.signal,
        });
        const rejected = assert.rejects(pending, (error) =>
          close ? error.name === "AbortError" : error === reason,
        );
        await dispatched;
        if (sleeping) await new Promise((resolve) => setTimeout(resolve, 10));
        if (close) client.close();
        else caller.abort(reason);
        await rejected;
        client.close();
      }
    }
  },
);

test("wait returns waiting and terminal representations with their HTTP evidence", async () => {
  for (const status of ["waiting", "completed", "failed", "cancelled"]) {
    let calls = 0;
    const { client, run } = setup(async () => {
      calls++;
      return Response.json(
        { id: "run", status },
        { headers: { ETag: '"run:1"' } },
      );
    });
    const result = await run.wait({ timeoutMs: 100 });
    assert.equal(result.status, status);
    assert.equal(result.snapshot.response.headers.get("ETag"), '"run:1"');
    assert.equal(calls, 1);
    client.close();
  }
});

test("invalid intervals, expired deadlines and pre-aborted/closed waits dispatch nothing", async () => {
  let calls = 0;
  const { client, run } = setup(async () => {
    calls++;
    return Response.json({ status: "completed" });
  });
  for (const timeoutMs of [-1, NaN, Infinity, 2_147_483_648])
    await assert.rejects(run.wait({ timeoutMs }), RangeError);
  for (const pollIntervalMs of [0, -1, NaN, Infinity])
    await assert.rejects(
      run.wait({ timeoutMs: 10, pollIntervalMs }),
      RangeError,
    );
  await assert.rejects(run.wait({ timeoutMs: 0 }), WaitTimeoutError);
  const reason = new Error("already aborted");
  await assert.rejects(
    run.wait({ timeoutMs: 10, signal: AbortSignal.abort(reason) }),
    (error) => error === reason,
  );
  client.close();
  await assert.rejects(
    run.wait({ timeoutMs: 10, signal: new AbortController().signal }),
    { name: "AbortError" },
  );
  assert.equal(calls, 0);
});
