import assert from "node:assert/strict";
import { once } from "node:events";
import { createServer } from "node:http";
import test from "node:test";
import { createClient, ProtocolError } from "../dist/index.js";

const baseUrl = "https://service.example";
const workspaceId = "ws_1234567890abcdef";
const organizationId = "org_1234567890abcdef";
const json = (value, init = {}) =>
  Response.json(value, { status: init.status ?? 200, headers: init.headers });

test("management references are local and preserve workspace versus organization scope", async () => {
  const requests = [];
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "secret" },
    fetch: async (request) => {
      requests.push(request);
      if (request.method === "GET")
        return json({ items: [], next_cursor: null });
      return json({ id: "model_1234567890abcdef" });
    },
  });
  const workspace = client.workspaces.ref(workspaceId);
  const organization = client.organizations.ref(organizationId);
  const model = workspace.models.ref("model_1234567890abcdef");
  assert.equal(requests.length, 0);
  assert.ok(workspace.assets);
  assert.ok(workspace.environments);
  assert.ok(organization.environmentTemplates);

  await workspace.models.list({ limit: 10, enabled: true });
  await organization.models.list({ limit: 5 });
  await model.update({ enabled: false }, { ifMatch: '"model-v1"' });

  assert.equal(
    new URL(requests[0].url).pathname,
    `/api/v1/workspaces/${workspaceId}/models`,
  );
  assert.equal(requests[0].headers.get("X-A13N-Workspace-ID"), workspaceId);
  assert.equal(
    new URL(requests[1].url).pathname,
    `/api/v1/organizations/${organizationId}/models`,
  );
  assert.equal(requests[1].headers.get("X-A13N-Workspace-ID"), null);
  assert.equal(requests[2].headers.get("If-Match"), '"model-v1"');
  assert.equal(requests[2].headers.get("Idempotency-Key"), null);
  assert.deepEqual(await requests[2].json(), { enabled: false });
});

test("scope-specific model tests, invitations, and permissions preserve wire shapes", async () => {
  const requests = [];
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "secret" },
    fetch: async (request) => {
      requests.push(request);
      const path = new URL(request.url).pathname;
      if (path.endsWith("/permissions"))
        return path.includes("/organizations/")
          ? json({ organization_admin: true })
          : json({ actions: ["agents:read"], organization_admin: false });
      return json({});
    },
  });
  const workspace = client.workspaces.ref(workspaceId);
  const organization = client.organizations.ref(organizationId);

  await workspace.models.ref("model_1234567890abcdef").test();
  await workspace.models.ref("model_1234567890abcdef").test({});
  await organization.models.ref("model_1234567890abcdef").test(null);
  await workspace.invitations.create({
    email: "workspace@example.com",
    role: "admin",
  });
  await organization.invitations.create({
    email: "organization@example.com",
    grants: [],
  });
  assert.deepEqual((await workspace.permissions.list()).data.actions, [
    "agents:read",
  ]);
  assert.equal(
    (await organization.permissions.list()).data.organization_admin,
    true,
  );

  assert.equal(await requests[0].text(), "");
  assert.equal(await requests[1].text(), "{}");
  assert.equal(await requests[2].text(), "null");
  assert.deepEqual(await requests[3].json(), {
    email: "workspace@example.com",
    role: "admin",
  });
  assert.deepEqual(await requests[4].json(), {
    email: "organization@example.com",
    grants: [],
  });
  assert.equal(requests[3].headers.get("X-A13N-Workspace-ID"), workspaceId);
  assert.equal(requests[4].headers.get("X-A13N-Workspace-ID"), null);
});

test("management pagination snapshots filters and rejects repeated cursors", async () => {
  const urls = [];
  const filters = { limit: 2, query: "alpha" };
  const pages = [
    { items: [], next_cursor: "next" },
    { items: [], next_cursor: "next" },
  ];
  const client = createClient({
    baseUrl,
    auth: { type: "session" },
    fetch: async (request) => {
      urls.push(request.url);
      return json(pages.shift());
    },
  });
  const iterator = client.workspaces.ref(workspaceId).models.pages(filters);
  filters.query = "changed";
  assert.deepEqual((await iterator.next()).value.data.items, []);
  await assert.rejects(iterator.next(), ProtocolError);
  assert.match(urls[0], /query=alpha/);
  assert.match(urls[1], /cursor=next/);
  assert.doesNotMatch(urls[1], /changed/);
});

test("asset upload streams bytes and scoped download exposes metadata and close", async () => {
  const requests = [];
  let downloadCanceled = false;
  const chunks = [new Uint8Array(1024 * 1024), new Uint8Array(1024 * 1024)];
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "secret" },
    fetch: async (request) => {
      requests.push(request);
      if (request.method === "POST") {
        const bytes = new Uint8Array(await request.arrayBuffer());
        assert.equal(bytes.byteLength, 2 * 1024 * 1024);
        return json({ id: "asset_1234567890abcdef" }, { status: 201 });
      }
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new Uint8Array([1, 2, 3]));
          },
          cancel() {
            downloadCanceled = true;
          },
        }),
        {
          headers: {
            "Content-Type": "application/octet-stream",
            ETag: '"asset-v1"',
          },
        },
      );
    },
  });
  const assets = client.workspaces.ref(workspaceId).assets;
  await assets.upload(
    new ReadableStream({
      pull(controller) {
        const chunk = chunks.shift();
        if (chunk) controller.enqueue(chunk);
        else controller.close();
      },
    }),
    {
      filename: "large.bin",
      mediaType: "application/x-large-binary",
      idempotencyKey: "asset-upload",
    },
  );
  const upload = requests[0];
  assert.equal(upload.headers.get("Idempotency-Key"), "asset-upload");
  assert.equal(
    upload.headers.get("Content-Type"),
    "application/x-large-binary",
  );
  assert.equal(upload.headers.get("X-A13N-Workspace-ID"), workspaceId);
  assert.equal(new URL(upload.url).searchParams.get("filename"), "large.bin");
  assert.equal(
    new URL(upload.url).searchParams.get("media_type"),
    "application/x-large-binary",
  );

  const binary = await assets.ref("asset_1234567890abcdef").download();
  assert.equal(binary.response.headers.get("ETag"), '"asset-v1"');
  assert.equal(binary.closed, false);
  await binary.close();
  assert.equal(binary.closed, true);
  assert.equal(downloadCanceled, true);
  await binary.close();
});

test("asset download close cancels locked native fetch readers and pipes", async (t) => {
  let served = 0;
  let closed = 0;
  const server = createServer((_request, response) => {
    served++;
    response.writeHead(200, { "Content-Type": "application/octet-stream" });
    response.write(new Uint8Array([served]));
    response.on("close", () => {
      closed++;
    });
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(async () => {
    server.closeAllConnections();
    server.close();
    await once(server, "close");
  });
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const client = createClient({
    baseUrl: `http://127.0.0.1:${address.port}`,
    auth: { type: "public" },
  });
  t.after(() => client.close());
  const asset = client.workspaces
    .ref(workspaceId)
    .assets.ref("asset_1234567890abcdef");

  const readerDownload = await asset.download();
  const reader = readerDownload.body.getReader();
  assert.deepEqual((await reader.read()).value, new Uint8Array([1]));
  const pendingRead = reader.read();
  await readerDownload.close();
  assert.equal(readerDownload.closed, true);
  assert.deepEqual(
    await Promise.race([
      pendingRead,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("locked read did not settle")), 250),
      ),
    ]),
    { done: true, value: undefined },
  );

  const pipeDownload = await asset.download();
  let resolveFirstWrite;
  const firstWrite = new Promise((resolve) => {
    resolveFirstWrite = resolve;
  });
  const piping = pipeDownload.body.pipeTo(
    new WritableStream({
      write(chunk) {
        assert.deepEqual(chunk, new Uint8Array([2]));
        resolveFirstWrite();
      },
    }),
  );
  await firstWrite;
  await pipeDownload.close();
  assert.equal(pipeDownload.closed, true);
  await Promise.race([
    piping,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("locked pipe did not settle")), 250),
    ),
  ]);

  while (closed < 2)
    await Promise.race([
      new Promise((resolve) => setTimeout(resolve, 0)),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("HTTP downloads remained open")),
          250,
        ),
      ),
    ]);
  assert.equal(served, 2);
});

test("asset upload abort rejects with the caller reason and is not replayed", async () => {
  const controller = new AbortController();
  const reason = { code: "upload-cancelled" };
  let dispatches = 0;
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "secret" },
    fetch: async (request) => {
      dispatches++;
      return new Promise((_, reject) => {
        request.signal.addEventListener(
          "abort",
          () => reject(request.signal.reason),
          { once: true },
        );
      });
    },
  });
  const pending = client.workspaces
    .ref(workspaceId)
    .assets.upload(new ReadableStream({ pull() {} }), {
      filename: "pending.bin",
      idempotencyKey: "pending-upload",
      signal: controller.signal,
    });
  await new Promise((resolve) => setTimeout(resolve, 0));
  controller.abort(reason);
  await assert.rejects(pending, (error) => error === reason);
  assert.equal(dispatches, 1);
});

test("domain commands preserve exact bodies, guards, and non-idempotent operations", async () => {
  const requests = [];
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "secret" },
    fetch: async (request) => {
      requests.push(request);
      if (request.method === "DELETE")
        return new Response(null, { status: 204 });
      return json({});
    },
  });
  const workspace = client.workspaces.ref(workspaceId);
  await workspace.connections
    .ref("conn_1234567890abcdef")
    .enable({ expected_version: 4 }, { idempotencyKey: "enable-connection" });
  await workspace.connectorProviders
    .ref("cp_1234567890abcdef")
    .update({ enabled: false });
  await workspace.connectorProviders
    .ref("cp_1234567890abcdef")
    .test({ expected_version: 5 }, { idempotencyKey: "test-provider" });
  await workspace.assets.ref("asset_1234567890abcdef").delete();

  assert.deepEqual(await requests[0].json(), { expected_version: 4 });
  assert.equal(requests[0].headers.get("Idempotency-Key"), "enable-connection");
  assert.equal(requests[1].headers.get("If-Match"), null);
  assert.equal(requests[1].headers.get("Idempotency-Key"), null);
  assert.deepEqual(await requests[2].json(), { expected_version: 5 });
  assert.equal(requests[2].headers.get("Idempotency-Key"), "test-provider");
  assert.equal(requests[3].headers.get("Idempotency-Key"), null);
});

test("configuration assistant keeps authoring, draft review, and explicit apply separate", async () => {
  const requests = [];
  const client = createClient({
    baseUrl,
    auth: { type: "bearer", token: "secret" },
    fetch: async (request) => {
      requests.push(request);
      return json({});
    },
  });
  const workspace = client.workspaces.ref(workspaceId);
  await workspace.configurationAssistant.readiness({
    target_agent_id: "agent_1234567890abcdef",
  });
  await workspace.configurationSessions.create(
    { target_agent_id: "agent_1234567890abcdef" },
    { idempotencyKey: "configuration-session" },
  );
  await workspace.configurationDrafts
    .ref("draft_1234567890abcdef")
    .apply(
      { expected_agent_version: 3 },
      { idempotencyKey: "apply-draft", ifMatch: '"draft-v2"' },
    );

  assert.equal(
    new URL(requests[0].url).pathname,
    `/api/v1/workspaces/${workspaceId}/configuration-assistant/readiness`,
  );
  assert.equal(
    new URL(requests[0].url).searchParams.get("target_agent_id"),
    "agent_1234567890abcdef",
  );
  assert.equal(
    requests[1].headers.get("Idempotency-Key"),
    "configuration-session",
  );
  assert.equal(requests[2].headers.get("Idempotency-Key"), "apply-draft");
  assert.equal(requests[2].headers.get("If-Match"), '"draft-v2"');
  assert.equal(
    new URL(requests[2].url).pathname,
    "/api/v1/configuration-drafts/draft_1234567890abcdef/apply",
  );
});
