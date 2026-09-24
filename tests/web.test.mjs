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
    client.http.POST("/api/v1/workspaces/{workspace_id}/threads", {
      params: {
        path: { workspace_id: "ws_test" },
        header: { "Idempotency-Key": "submit-1" },
      },
      body: {
        agent_id: "agent_example",
        payload: { content: [{ type: "text", text: "Hi" }] },
      },
    }),
    ApiError,
  );
  await assert.rejects(
    client.http.POST(
      "/api/v1/workspaces/{workspace_id}/threads/{thread_id}/inbox",
      {
        params: {
          path: { workspace_id: "ws_test", thread_id: "th_test" },
          header: { "Idempotency-Key": "submit-2" },
        },
        body: {
          agent_id: "agent_example",
          payload: { content: [{ type: "text", text: "Next" }] },
        },
      },
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
    await client.http.POST("/api/v1/workspaces/{workspace_id}/threads", {
      params: {
        path: { workspace_id: "ws_test" },
        header: { "Idempotency-Key": `key-${bodies.length}` },
      },
      body: {
        agent_id: "agent_example",
        payload: { content: [{ type: "text", text: "Hi" }] },
        ...(options && { options }),
      },
    });
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

test("workspace-bound HTTP selects explicit scope without credential discovery", async () => {
  const urls = [];
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "key" },
    fetch: async (request) => {
      urls.push(request.url);
      return Response.json({ items: [], next_cursor: null });
    },
  });
  const http = client.workspaceHttp("ws_test");
  await http.GET("/agents");
  await http.GET("/agents/{agent_id}", {
    params: { path: { agent_id: "agent_example" } },
  });
  assert.deepEqual(urls, [
    `${baseUrl}/api/v1/workspaces/ws_test/agents`,
    `${baseUrl}/api/v1/workspaces/ws_test/agents/agent_example`,
  ]);
  client.close();
  await assert.rejects(http.GET("/agents"), { name: "AbortError" });
});
