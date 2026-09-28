import assert from "node:assert/strict";
import test from "node:test";
import { createClient } from "../dist/index.js";

const baseUrl = "https://service.example.test";
test("flat business resources use the key's implicit workspace", async () => {
  const requests = [];
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "test" },
    fetch: async (request) => {
      requests.push(request);
      return Response.json(
        request.method === "GET" && !request.url.includes("/skills/skill_one")
          ? { items: [], next_cursor: null }
          : { id: "skill_one" },
      );
    },
  });
  const workspace = client.resources;
  const organization = client.resources;
  assert.equal(requests.length, 0);
  await workspace.skills.list({ query: { limit: 5 } });
  await workspace.skills.ref("skill_one").get();
  await workspace.connections.list();
  await organization.modelProviders.list();
  assert.deepEqual(
    requests.map((request) => new URL(request.url).pathname),
    [
      "/api/v1/skills",
      "/api/v1/skills/skill_one",
      "/api/v1/connections",
      "/api/v1/model-providers",
    ],
  );
  assert.equal(requests[0].headers.get("X-Workspace-ID"), null);
  client.close();
});

test("management updates propagate conditional version and preserve response metadata", async () => {
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "test" },
    fetch: async (request) => {
      assert.equal(request.headers.get("If-Match"), '"v1"');
      assert.equal(request.method, "PATCH");
      assert.equal(request.url, `${baseUrl}/api/v1/models/model_one`);
      assert.deepEqual(await request.json(), { name: "updated" });
      return Response.json({ id: "model_one" }, { headers: { ETag: '"v2"' } });
    },
  });
  const result = await client.resources.models
    .ref("model_one")
    .update({ name: "updated" }, { ifMatch: '"v1"' });
  assert.equal(result.response.headers.get("ETag"), '"v2"');
  client.close();
});
