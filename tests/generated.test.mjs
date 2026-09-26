import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createClient } from "../dist/index.js";

const spec = JSON.parse(
  await readFile(new URL("../openapi.json", import.meta.url), "utf8"),
);

test("generated OpenAPI declares binary content and current submission replay", () => {
  for (const suffix of [
    "assets/{asset_id}/content",
    "skills/{skill_id}/revisions/{revision_id}/content",
    "skills/{skill_id}/revisions/{revision_id}/files/{path}",
  ]) {
    const path = `/api/v1/workspaces/{workspace_id}/${suffix}`;
    const success = spec.paths[path].get.responses["200"];
    const media = Object.values(success.content);
    assert.equal(media.length, 1);
    assert.equal(media[0].schema.format, "binary");
  }
  assert.ok(
    spec.paths["/api/v1/workspaces/{workspace_id}/threads"].post.responses[
      "200"
    ],
  );
  assert.ok(
    spec.paths["/api/v1/workspaces/{workspace_id}/threads/{thread_id}/inbox"]
      .post.responses["200"],
  );
  assert.ok(
    spec.paths["/api/v1/workspaces/{workspace_id}/runs/{run_id}/resume"].post
      .responses["200"],
  );
});

test("ordinary HTTP response headers and omitted/null patch values survive transport", async () => {
  const sent = [];
  const client = createClient({
    baseUrl: "https://service.example",
    auth: { type: "bearer", token: "key" },
    fetch: async (request) => {
      sent.push(await request.json());
      assert.equal(request.headers.get("If-Match"), '"v1"');
      return Response.json(
        {},
        { headers: { ETag: '"v2"', "X-Request-Id": "req_test" } },
      );
    },
  });
  for (const body of [{}, { name: null }, { name: "New" }]) {
    const result = await client.http.PATCH(
      "/api/v1/workspaces/{workspace_id}/agents/{agent_id}",
      {
        params: {
          path: { workspace_id: "ws_example", agent_id: "agent_example" },
          header: { "If-Match": '"v1"' },
        },
        body,
      },
    );
    assert.equal(result.response.headers.get("ETag"), '"v2"');
    assert.equal(result.response.headers.get("X-Request-Id"), "req_test");
  }
  assert.deepEqual(sent, [{}, { name: null }, { name: "New" }]);
  client.close();
});

test("model pricing selectors preserve omission, null and values through resources", async () => {
  const client = createClient({
    baseUrl: "https://service.example",
    auth: { type: "bearer", token: "key" },
    fetch: async (request) => {
      assert.equal(request.method, "PATCH");
      assert.equal(request.headers.get("If-Match"), '"v1"');
      return Response.json(await request.json());
    },
  });
  try {
    for (const selectors of [
      {},
      { max_input_tokens: null, service_tier: null },
      { max_input_tokens: 128_000, service_tier: "priority" },
    ]) {
      const rule = {
        rule_id: "default",
        prices: [{ price_key: "input_mtok", price: "1" }],
        ...selectors,
      };
      const body = {
        pricing: {
          provider: "test",
          model: "test-model",
          source: "manual",
          source_revision: "test",
          rules: [rule],
        },
      };
      const result = await client.resources.organizations
        .ref("org")
        .models.ref("model")
        .update(body, { ifMatch: '"v1"' });
      assert.deepEqual(result.data, body);
    }
  } finally {
    client.close();
  }
});
