import assert from "node:assert/strict";
import test from "node:test";
import { createClient, textPayload } from "../dist/index.js";

const baseUrl = "https://service.example.test";
const json = (body, status = 200) => Response.json(body, { status });

test("bound resource handles are local; create, replay and queued receipts retain status and nullable run", async () => {
  const requests = [];
  const submitted = {
    thread: { id: "th_one" },
    entry: { id: "entry_one" },
    run: null,
  };
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "test" },
    fetch: async (request) => {
      requests.push({
        url: request.url,
        headers: request.headers,
        body: request.method === "POST" ? await request.json() : null,
      });
      return json(submitted, requests.length === 1 ? 201 : 200);
    },
  });
  const workspace = client.resources.workspaces.ref("ws_one");
  assert.equal(requests.length, 0);
  const first = await workspace.threads.create(
    { agent_id: "agent_one", payload: textPayload("Hello") },
    { idempotencyKey: "create" },
  );
  assert.equal(first.response.status, 201);
  assert.equal(first.data.run, null);
  assert.deepEqual(requests[0].body, {
    agent_id: "agent_one",
    payload: { content: [{ type: "text", text: "Hello" }] },
  });
  assert.equal(requests[0].headers.get("Idempotency-Key"), "create");
  assert.equal(requests[0].headers.get("X-A13N-Workspace-ID"), null);
  assert.equal(requests[0].url, `${baseUrl}/api/v1/workspaces/ws_one/threads`);
  const replay = await workspace.threads
    .ref("th_one")
    .inbox.create(
      { agent_id: "agent_one", payload: textPayload("Next") },
      { idempotencyKey: "next" },
    );
  assert.equal(replay.response.status, 200);
  assert.equal(replay.data.entry.id, "entry_one");
  assert.deepEqual(requests[1].body, {
    agent_id: "agent_one",
    payload: { content: [{ type: "text", text: "Next" }] },
  });
  assert.equal(
    requests[1].url,
    `${baseUrl}/api/v1/workspaces/ws_one/threads/th_one/inbox`,
  );
  client.close();
});

test("bound pagination advances once per page and handles can be closed with for-await", async () => {
  const urls = [];
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "test" },
    fetch: async (request) => {
      urls.push(request.url);
      return json({
        items: [{ id: urls.length }],
        next_cursor: urls.length === 1 ? "next" : null,
      });
    },
  });
  const ids = [];
  for await (const item of client.resources.workspaces
    .ref("ws_one")
    .threads.items({ query: { limit: 1 } }))
    ids.push(item.id);
  assert.deepEqual(ids, [1, 2]);
  assert.ok(urls[1].endsWith("?limit=1&cursor=next"));
  client.close();
});

test("Run wait polls the selected workspace and times out without mutation", async () => {
  let calls = 0;
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "test" },
    fetch: async (request) => {
      assert.equal(
        request.url,
        `${baseUrl}/api/v1/workspaces/ws_one/runs/run_one`,
      );
      calls++;
      return json({
        status: calls === 2 ? "completed" : "running",
        id: "run_one",
      });
    },
  });
  assert.equal(
    (
      await client.resources.workspaces
        .ref("ws_one")
        .runs.ref("run_one")
        .wait({ timeoutMs: 1000, pollIntervalMs: 1 })
    ).data.status,
    "completed",
  );
  await assert.rejects(
    client.resources.workspaces
      .ref("ws_one")
      .runs.ref("run_one")
      .wait({ timeoutMs: -1 }),
    RangeError,
  );
  client.close();
});
