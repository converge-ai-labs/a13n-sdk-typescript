import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { ApiError, createClient } from "../dist/index.js";

const baseUrl = "https://service.example.test";
const submitted = {
  thread: { id: "thread_one" },
  entry: { id: "entry_one", thread_id: "thread_one", status: "pending" },
  run: null,
};
const configurationCases = [
  {},
  { configuration: null },
  { configuration: {} },
  { configuration: { allowed_hosts: null } },
  { configuration: { allowed_hosts: [] } },
  {
    configuration: {
      allowed_hosts: [" EXAMPLE.test. ", "regex:.*\\.example\\.test"],
      extensions: {},
    },
  },
  {
    configuration: {
      extensions: {
        "app.example/render": {
          enabled: false,
          count: 0,
          title: "",
          nested: [null, {}, [], { mode: "native" }],
        },
      },
    },
  },
];
const payload = {
  content: [
    { type: "text", text: "Inspect these native inputs." },
    { type: "url", url: "https://media.example.test/movie.mp4?part=1&part=2" },
    { type: "url", url: "https://media.example.test/image.png" },
    { type: "asset", asset_id: "ast_one" },
    { type: "json", value: { enabled: false, nested: [null, 0, ""] } },
  ],
};

// The SDK forwards authored configuration; only Service normalizes, freezes or rejects it.
test("start, send and generated message preserve omitted/null/empty/native configuration and media", async () => {
  const requests = [];
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "key" },
    fetch: async (request) => {
      requests.push({
        path: new URL(request.url).pathname,
        key: request.headers.get("Idempotency-Key"),
        body: await request.json(),
      });
      return Response.json(submitted, { status: 201 });
    },
  });
  try {
    for (const [index, fields] of configurationCases.entries()) {
      const options = {
        ...fields,
        overrides: { instructions: "Per-Run revision override" },
      };
      const invocation = { idempotencyKey: `native-${index}`, options };
      (await client.agents.ref("agent_one").start(payload, invocation)).close();
      (
        await client.agents
          .ref("agent_one")
          .send("thread_one", payload, { ...invocation, delivery: "next_run" })
      ).close();
      await client.resources.threads.create(
        { agent_id: "agent_one", payload, options },
        { idempotencyKey: invocation.idempotencyKey },
      );
      await client.resources.threads
        .ref("thread_one")
        .inbox.create(
          { agent_id: "agent_one", payload, delivery: "steer", options },
          { idempotencyKey: invocation.idempotencyKey },
        );
      const group = requests.slice(index * 4, index * 4 + 4);
      assert.equal(group.length, 4);
      for (const request of group) {
        assert.deepEqual(request.body.options, options);
        assert.deepEqual(request.body.payload, payload);
        assert.equal(
          Object.hasOwn(request.body.options, "configuration"),
          Object.hasOwn(fields, "configuration"),
        );
        assert.equal(request.key, invocation.idempotencyKey);
      }
      assert.equal(group[1].body.delivery, "next_run");
      assert.equal(group[3].body.delivery, "steer");
    }
    // Omitted options themselves do not turn into an implicit configuration snapshot.
    (
      await client.agents
        .ref("agent_one")
        .start("Plain", { idempotencyKey: "plain" })
    ).close();
    assert.equal(Object.hasOwn(requests.at(-1).body, "options"), false);
  } finally {
    client.close();
  }
});

test("immutable configuration conflicts preserve Service evidence and never retry POST", async () => {
  let calls = 0;
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "key" },
    fetch: async () => {
      calls++;
      return Response.json(
        {
          error: {
            code: "conflict",
            message: "Run configuration is immutable",
            details: { reason: "run_configuration_immutable" },
            request_id: "request_one",
          },
        },
        { status: 409 },
      );
    },
  });
  try {
    await assert.rejects(
      client.agents.ref("agent_one").send("thread_one", "Steer", {
        idempotencyKey: "conflict",
        options: { configuration: { allowed_hosts: [] } },
      }),
      (error) => {
        assert.ok(error instanceof ApiError);
        assert.equal(error.status, 409);
        assert.equal(error.details.reason, "run_configuration_immutable");
        assert.equal(error.requestId, "request_one");
        return true;
      },
    );
    assert.equal(calls, 1);
  } finally {
    client.close();
  }
});

test("generated model characteristics forward native preparation policy without media processing", async () => {
  const characteristicsCases = [
    {},
    { image_input: null },
    { image_input: {}, video_input: {}, url_input: { video: [] } },
    {
      image_input: {
        max_images: 0,
        max_image_bytes: 0,
        max_image_dimension: 0,
        support_gif: false,
        split_large_images: false,
        image_split_overlap: 0,
      },
      video_input: { max_video_bytes: 1234 },
      url_input: { video: ["youtube"] },
    },
  ];
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "key" },
    fetch: async (request) => Response.json(await request.json()),
  });
  try {
    for (const characteristics of characteristicsCases) {
      const body = {
        config: {
          characteristics,
          model_name: "native",
          model_api: "native.api",
        },
      };
      const result = await client.resources.models
        .ref("model_one")
        .update(body, { ifMatch: '"v1"' });
      assert.deepEqual(result.data, body);
    }
  } finally {
    client.close();
  }
});

test("all five OAuth/discovery bindings preserve native bodies, scoped session and response evidence", async () => {
  const calls = [];
  const status = {
    provider_id: "provider_one",
    state: "disconnected",
    subject: null,
    client_id: null,
    email: null,
    expires_at: null,
    pending: false,
    message: null,
  };
  const start = {
    attempt_id: "attempt_one",
    authorization_url: "https://issuer.example.test/authorize?state=opaque",
    expires_at: "2026-10-01T12:00:00Z",
    method: "browser_callback",
  };
  const models = [{ slug: "native-model", display_name: "Native model" }];
  const disconnect = { local_tokens_cleared: true, revocation_confirmed: null };
  const client = createClient({
    baseUrl,
    auth: { type: "session", csrfToken: "csrf", workspaceId: "workspace_one" },
    fetch: async (request) => {
      const path = new URL(request.url).pathname;
      assert.equal(request.credentials, "same-origin");
      assert.equal(request.headers.get("X-Workspace-ID"), "workspace_one");
      assert.equal(request.headers.get("Authorization"), null);
      assert.equal(
        request.headers.get("X-CSRF-Token"),
        request.method === "GET" ? null : "csrf",
      );
      calls.push([
        request.method,
        path,
        request.method === "POST" ? await request.json() : null,
      ]);
      const body = path.endsWith("/authorize")
        ? start
        : path.endsWith("/models")
          ? models
          : request.method === "DELETE"
            ? disconnect
            : status;
      return Response.json(body, {
        headers: {
          "X-Request-ID": "request_oauth",
          "Cache-Control": "no-store",
        },
      });
    },
  });
  try {
    const provider = client.resources.modelProviders.ref("provider_one");
    assert.deepEqual((await provider.authorization.get()).data, status);
    const started = await provider.authorize({ new_registration: false });
    assert.deepEqual(started.data, start);
    assert.equal(started.response.headers.get("X-Request-ID"), "request_oauth");
    const callback = {
      attempt_id: started.data.attempt_id,
      callback_url:
        "https://service.example.test/operator-selected/callback?code=opaque&state=opaque",
    };
    assert.deepEqual(
      (await provider.authorization.callback(callback)).data,
      status,
    );
    assert.deepEqual((await provider.authorization.delete()).data, disconnect);
    assert.deepEqual((await provider.models.get()).data, models);
    assert.deepEqual(
      calls.map(([method, path]) => [method, path.split("/provider_one")[1]]),
      [
        ["GET", "/authorization"],
        ["POST", "/authorize"],
        ["POST", "/authorization/callback"],
        ["DELETE", "/authorization"],
        ["GET", "/models"],
      ],
    );
    assert.deepEqual(calls[1][2], { new_registration: false });
    assert.deepEqual(calls[2][2], callback);
  } finally {
    client.close();
  }
});

test("manual workspace-key authorization forwards returned method and hosted refusal is not retried", async () => {
  let calls = 0;
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "key" },
    fetch: async (request) => {
      calls++;
      assert.equal(request.credentials, "omit");
      assert.equal(request.headers.get("X-CSRF-Token"), null);
      assert.equal(request.headers.get("X-Workspace-ID"), null);
      if (calls === 1)
        return Response.json({
          attempt_id: "manual",
          authorization_url: "https://issuer.example.test",
          expires_at: "2026-10-01T12:00:00Z",
          method: "manual_callback",
        });
      return Response.json(
        {
          error: {
            code: "forbidden",
            message: "User login session required",
            details: {},
            request_id: "request_forbidden",
          },
        },
        { status: 403 },
      );
    },
  });
  try {
    const provider = client.resources.modelProviders.ref("provider_one");
    assert.equal((await provider.authorize({})).data.method, "manual_callback");
    await assert.rejects(
      provider.authorize({ new_registration: true }),
      (error) => error instanceof ApiError && error.status === 403,
    );
    assert.equal(calls, 2);
  } finally {
    client.close();
  }
});

test("pinned native surface exposes 233 operations and preserves media-policy defaults", async () => {
  const spec = JSON.parse(
    await readFile(new URL("../openapi.json", import.meta.url), "utf8"),
  );
  assert.equal(
    Object.values(spec.paths).flatMap((item) =>
      Object.values(item).filter((op) => op.operationId),
    ).length,
    233,
  );
  const schemas = spec.components.schemas;
  assert.equal(schemas.RunOptions?.properties?.configuration, undefined); // Input and output remain distinct.
  assert.ok(schemas["RunOptions-Input"].properties.configuration);
  assert.ok(schemas["RunOptions-Output"].properties.configuration);
  assert.equal(schemas.ImageInputPolicy.properties.max_images.minimum, 0);
  assert.equal(
    schemas.VideoInputPolicy.properties.max_video_bytes.exclusiveMinimum,
    0,
  );
  assert.deepEqual(schemas.VideoUrlType.enum, ["youtube"]);
  assert.ok(schemas.ProviderType.properties.oauth_scheme);
});
