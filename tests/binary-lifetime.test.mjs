import assert from "node:assert/strict";
import { once } from "node:events";
import { createServer } from "node:http";
import test from "node:test";
import { createClient } from "../dist/index.js";

async function fixture(t) {
  const server = createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/event-stream" });
    response.flushHeaders();
    if (request.url.includes("/first/")) response.write(": keepalive\n\n");
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const client = createClient({
    baseUrl: `http://127.0.0.1:${server.address().port}`,
    auth: { type: "bearer", token: "mock" },
    maxReadRetries: 0,
  });
  t.after(() => {
    client.close();
    server.closeAllConnections();
    server.close();
  });
  return client;
}

test(
  "native Fetch raw SSE close settles after one chunk with a pending read",
  { timeout: 3000 },
  async (t) => {
    const client = await fixture(t);
    const raw = await client.resources.threads.ref("first").stream.get();
    const reader = raw.body.getReader();
    try {
      assert.equal(
        new TextDecoder().decode((await reader.read()).value),
        ": keepalive\n\n",
      );
      const pending = reader.read();
      await Promise.all([raw.close(), raw.close()]);
      assert.equal((await pending).done, true);
      assert.equal(raw.closed, true);
    } finally {
      reader.releaseLock();
      await raw.close();
    }
  },
);

test(
  "native Fetch caller timeout rejects an idle SSE read and cleanup settles",
  { timeout: 3000 },
  async (t) => {
    const client = await fixture(t);
    const raw = await client.resources.threads
      .ref("idle")
      .stream.get({ signal: AbortSignal.timeout(100) });
    const reader = raw.body.getReader();
    try {
      await assert.rejects(reader.read(), { name: "TimeoutError" });
      // Cancelling an already errored stream also rejects; this is not a stuck reader.
      await assert.rejects(reader.cancel(), { name: "TimeoutError" });
    } finally {
      reader.releaseLock();
      await raw.close();
    }
    assert.equal(raw.closed, true);
  },
);

test(
  "native Fetch raw SSE can close before consuming any body",
  { timeout: 3000 },
  async (t) => {
    const client = await fixture(t);
    const raw = await client.resources.threads.ref("idle").stream.get();
    await raw.close();
    assert.equal(raw.closed, true);
  },
);
