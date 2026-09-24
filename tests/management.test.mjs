import assert from "node:assert/strict";
import test from "node:test";
import { createClient } from "../dist/index.js";

const baseUrl = "https://service.example.test";
test("workspace resources and organization providers dispatch to distinct actual scopes", async () => {
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
  const workspace = client.workspaces.ref("ws_one");
  const organization = client.organizations.ref("org_one");
  assert.equal(requests.length, 0);
  await workspace.skills.list({ limit: 5 });
  await workspace.skills.ref("skill_one").get();
  await workspace.connections.list();
  await organization.modelProviders.list();
  assert.deepEqual(
    requests.map((request) => new URL(request.url).pathname),
    [
      "/api/v1/workspaces/ws_one/skills",
      "/api/v1/workspaces/ws_one/skills/skill_one",
      "/api/v1/workspaces/ws_one/connections",
      "/api/v1/organizations/org_one/model-providers",
    ],
  );
  assert.equal(requests[0].headers.get("X-A13N-Workspace-ID"), null);
  client.close();
});

test("management updates propagate conditional version and preserve response metadata", async () => {
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "test" },
    fetch: async (request) => {
      assert.equal(request.headers.get("If-Match"), '"v1"');
      assert.equal(request.method, "PATCH");
      assert.equal(
        request.url,
        `${baseUrl}/api/v1/organizations/org_one/models/model_one`,
      );
      assert.deepEqual(await request.json(), { name: "updated" });
      return Response.json({ id: "model_one" }, { headers: { ETag: '"v2"' } });
    },
  });
  const result = await client.organizations
    .ref("org_one")
    .models.ref("model_one")
    .update({ name: "updated" }, { ifMatch: '"v1"' });
  assert.equal(result.response.headers.get("ETag"), '"v2"');
  client.close();
});
