import assert from "node:assert/strict";
import test from "node:test";
import { createClient, ApiError } from "../dist/index.js";
const baseUrl = "https://service.example";

test("workspace submission and replay-capable commands are not retried automatically", async () => {
  let calls = 0;
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "key" },
    fetch: async () => {
      calls++;
      return Response.json(
        {
          error: {
            code: "unavailable",
            message: "Try later",
            details: {},
            request_id: "req_1",
          },
        },
        { status: 503 },
      );
    },
  });
  await assert.rejects(
    client.resources.threads.create(
      {
        agent_id: "agent_example",
        payload: { content: [{ type: "text", text: "Hi" }] },
      },
      { idempotencyKey: "submit-1" },
    ),
    ApiError,
  );
  await assert.rejects(
    client.resources.threads.ref("th_test").inbox.create(
      {
        agent_id: "agent_example",
        payload: { content: [{ type: "text", text: "Next" }] },
      },
      { idempotencyKey: "submit-2" },
    ),
    ApiError,
  );
  assert.equal(calls, 2);
  client.close();
});

test("null overrides remain explicit while omitted options are untouched", async () => {
  const bodies = [];
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "key" },
    fetch: async (request) => {
      bodies.push(await request.json());
      return Response.json({});
    },
  });
  for (const options of [
    undefined,
    { overrides: null },
    { overrides: { model: { model_id: "model_example" } } },
  ]) {
    await client.resources.threads.create(
      {
        agent_id: "agent_example",
        payload: { content: [{ type: "text", text: "Hi" }] },
        ...(options && { options }),
      },
      { idempotencyKey: `key-${bodies.length}` },
    );
  }
  assert.deepEqual(
    bodies.map((body) => body.options),
    [
      undefined,
      { overrides: null },
      { overrides: { model: { model_id: "model_example" } } },
    ],
  );
  client.close();
});

test("resource references select explicit scope without credential discovery", async () => {
  const urls = [];
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "key" },
    fetch: async (request) => {
      urls.push(request.url);
      return Response.json({ items: [], next_cursor: null });
    },
  });
  const workspace = client.resources;
  await workspace.agents.list();
  await workspace.agents.ref("agent_example").get();
  assert.deepEqual(urls, [
    `${baseUrl}/api/v1/agents`,
    `${baseUrl}/api/v1/agents/agent_example`,
  ]);
  client.close();
  await assert.rejects(workspace.agents.list(), { name: "AbortError" });
});
