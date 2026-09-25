import assert from "node:assert/strict";
import test from "node:test";
import { createClient, ProtocolError } from "../dist/index.js";

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
    const stream = client.resources.workspaces
      .ref("ws_one")
      .threads.ref("thread_one")
      .events({
        after: "1-0",
      });
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
