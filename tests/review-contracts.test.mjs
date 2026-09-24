import assert from "node:assert/strict";
import test from "node:test";
import { createClient } from "../dist/index.js";
const baseUrl = "https://service.example.test";

test("conditional managed Agent, Thread and inbox operations send If-Match and expose Service receipts", async () => {
  const calls = [];
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "key" },
    fetch: async (request) => {
      calls.push({
        path: new URL(request.url).pathname,
        method: request.method,
        match: request.headers.get("If-Match"),
      });
      if (
        request.url.endsWith("/inbox/order") ||
        request.url.endsWith("/archive")
      )
        return Response.json({ id: "th_one" });
      if (request.url.includes("/inbox/entry_one"))
        return Response.json({
          thread: { id: "th_one" },
          entry: { id: "entry_one" },
          run: null,
        });
      return Response.json({ id: "agent_one" });
    },
  });
  const workspace = client.workspaces.ref("ws_one");
  const agent = workspace.agents.ref("agent_one");
  await agent.archive({ ifMatch: '"v1"' });
  await agent.unarchive({ ifMatch: '"v2"' });
  await agent.revisions.create({ config: {} }, { ifMatch: '"v3"' });
  await agent.revisions.ref("rev_one").setDefault({ ifMatch: '"v4"' });
  const thread = workspace.threads.ref("th_one");
  await thread.archive({ ifMatch: '"v5"' });
  assert.equal(
    (
      await thread.inbox.order(
        { entry_ids: ["entry_one"] },
        { ifMatch: '"v6"' },
      )
    ).data.id,
    "th_one",
  );
  const entry = thread.inbox.ref("entry_one");
  assert.equal(
    (
      await entry.update(
        { payload: { content: [{ type: "text", text: "edited" }] } },
        { ifMatch: '"v7"' },
      )
    ).data.entry.id,
    "entry_one",
  );
  assert.equal((await entry.delete({ ifMatch: '"v8"' })).data.run, null);
  assert.deepEqual(
    calls.map((call) => call.match),
    Array.from({ length: 8 }, (_, i) => `"v${i + 1}"`),
  );
  assert.deepEqual(
    calls.slice(-3).map((call) => call.method),
    ["PUT", "PATCH", "DELETE"],
  );
  client.close();
});

test("management ref methods follow actual verbs and specialized response shapes", async () => {
  const calls = [];
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "key" },
    fetch: async (request) => {
      calls.push([request.method, new URL(request.url).pathname]);
      if (request.url.endsWith("/subscriptions"))
        return Response.json({ id: "sub_one", signing_secret: "once" });
      if (request.url.endsWith("/test")) return Response.json({ status: "ok" });
      return Response.json({ id: "secret_one" });
    },
  });
  const workspace = client.workspaces.ref("ws_one");
  assert.equal(
    (
      await workspace.secrets
        .ref("secret_one")
        .update({ value: "new" }, { ifMatch: '"v1"' })
    ).data.id,
    "secret_one",
  );
  assert.equal(
    (
      await workspace.subscriptions.create({
        url: "https://example.test",
        kinds: ["run.completed"],
      })
    ).data.signing_secret,
    "once",
  );
  await client.organizations
    .ref("org_one")
    .modelProviders.ref("provider_one")
    .test();
  assert.deepEqual(
    calls.map(([method]) => method),
    ["PUT", "POST", "POST"],
  );
  assert.ok(calls[2][1].endsWith("/model-providers/provider_one/test"));
  client.close();
});
