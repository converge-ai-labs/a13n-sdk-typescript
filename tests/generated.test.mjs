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
    const path = `/api/v1/${suffix}`;
    const success = spec.paths[path].get.responses["200"];
    const media = Object.values(success.content);
    assert.equal(media.length, 1);
    assert.equal(media[0].schema.format, "binary");
  }
  assert.ok(spec.paths["/api/v1/threads"].post.responses["200"]);
  assert.ok(
    spec.paths["/api/v1/threads/{thread_id}/inbox"].post.responses["200"],
  );
  assert.ok(spec.paths["/api/v1/runs/{run_id}/resume"].post.responses["200"]);
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
    const result = await client.resources.agents
      .ref("agent_example")
      .update(body, { ifMatch: '"v1"' });
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
      const result = await client.resources.models
        .ref("model")
        .update(body, { ifMatch: '"v1"' });
      assert.deepEqual(result.data, body);
    }
  } finally {
    client.close();
  }
});

test("pinned native JSON, coverage, upload ID and password schemas retain Service policy", () => {
  const schemas = spec.components.schemas;
  for (const name of ["ModelConfig-Input", "ModelConfig-Output"])
    assert.deepEqual(schemas[name].properties.settings.additionalProperties, {
      $ref: "#/components/schemas/JsonValue",
    });
  assert.ok(schemas.RunItems.properties.resume_after);
  assert.equal(schemas.RunItems.required.includes("resume_after"), false);
  for (const name of ["AssetCreate", "UploadSource"])
    assert.equal(
      schemas[name].properties.upload_id.pattern,
      "^upl_[a-f0-9]{32}$",
    );
  for (const name of [
    "BootstrapInput",
    "PasswordChange",
    "PasswordResetConfirm",
  ])
    assert.equal(schemas[name].properties.password.minLength, 8);
  assert.equal(schemas.LoginInput.properties.password.minLength, 1);
  assert.equal(schemas.PasswordChange.properties.current_password.minLength, 1);
  const query = spec.paths[
    "/api/v1/threads/{thread_id}/stream"
  ].get.parameters.filter((p) => p.in === "query");
  assert.deepEqual(
    query.map((p) => p.name),
    ["run", "position"],
  );
});

test("ModelConfig settings forward arbitrary native JSON without coercion", async () => {
  const settings = {
    reasoning_effort: "high",
    parallel_tool_calls: false,
    budget: 123,
    nullable: null,
    nested: { list: [1, "two", false, null, { mode: "native" }] },
  };
  const bodies = [];
  const client = createClient({
    baseUrl: "https://service.example",
    auth: { type: "bearer", token: "key" },
    fetch: async (request) => {
      const body = await request.json();
      bodies.push(body);
      return Response.json(body);
    },
  });
  try {
    for (const fields of [{}, { settings }]) {
      const config = {
        model_name: "native-model",
        model_api: "openai.responses",
        ...fields,
      };
      assert.deepEqual(
        (
          await client.resources.models
            .ref("model_one")
            .update({ config }, { ifMatch: '"v1"' })
        ).data.config,
        config,
      );
    }
    assert.equal("settings" in bodies[0].config, false);
    assert.deepEqual(bodies[1].config.settings, settings);
  } finally {
    client.close();
  }
});

test("RunItems recovery hint preserves omission, null and confirmed Redis ID", async () => {
  const cases = [{}, { resume_after: null }, { resume_after: "1234-5" }];
  const client = createClient({
    baseUrl: "https://service.example",
    auth: { type: "bearer", token: "key" },
    fetch: async () =>
      Response.json({
        run: { id: "run_one", thread_id: "thread_one", status: "accepted" },
        items: [],
        position: "1-7",
        baseline: true,
        continuation: null,
        complete: false,
        ...cases.shift(),
      }),
  });
  try {
    for (const expected of [undefined, null, "1234-5"])
      assert.equal(
        (await client.runs.ref("run_one").items()).data.resume_after,
        expected,
      );
  } finally {
    client.close();
  }
});

test("upload IDs and passwords are passed to Service rather than locally revalidated", async () => {
  const bodies = [];
  const client = createClient({
    baseUrl: "https://service.example",
    auth: { type: "bearer", token: "key" },
    fetch: async (request) => {
      bodies.push(await request.json());
      return Response.json({});
    },
  });
  try {
    const upload_id = `upl_${"a".repeat(32)}`;
    await client.resources.assets.create({ upload_id, name: "native.bin" });
    await client.resources.assets.create({
      upload_id: "service-rejects-this",
      name: "invalid.bin",
    });
    await client.resources.auth.bootstrap({
      email: "owner@example.test",
      password: "12345678",
    });
    await client.resources.auth.bootstrap({
      email: "owner@example.test",
      password: "short",
    });
    assert.deepEqual(
      bodies.map((body) => body.upload_id ?? body.password),
      [upload_id, "service-rejects-this", "12345678", "short"],
    );
  } finally {
    client.close();
  }
});
