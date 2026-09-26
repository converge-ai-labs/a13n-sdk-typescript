import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { ApiError, createClient } from "../dist/index.js";

// Opt-in acceptance against a disposable Service. All calls below use the
// generated resource tree except the existing semantic Run-wait convenience.
for (const name of [
  "A13N_SERVICE_URL",
  "A13N_API_TOKEN",
  "A13N_WORKSPACE",
  "A13N_ORGANIZATION",
  "A13N_AGENT",
  "A13N_MEMORY_PROVIDER",
])
  if (!process.env[name]) throw new Error(`${name} is required`);
const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
const resources = client.resources;
const workspaceId = process.env.A13N_WORKSPACE;
const ws = resources.workspaces.ref(workspaceId);
const org = resources.organizations.ref(process.env.A13N_ORGANIZATION);
const key = `generated-${randomUUID()}`;
const etag = (result) => {
  const ifMatch = result.response.headers.get("ETag");
  assert.ok(ifMatch);
  return { ifMatch };
};
try {
  assert.equal((await resources.healthz.get()).response.status, 200);
  assert.equal((await resources.readyz.get()).response.status, 200);
  assert.equal(
    (await resources.auth.configuration.get()).data.initialized,
    true,
  );
  assert.ok((await resources.users.me.get()).data.id);
  assert.ok(
    (await resources.providerTypes.ref("memory").list()).data.items.length,
  );
  // A workspace-confined fixture key can read shared providers, but cannot
  // administer its organization. Preserve that denial rather than widening it.
  try {
    assert.ok((await org.members.list()).data.items.length);
  } catch (error) {
    assert.ok(error instanceof ApiError);
    assert.equal(error.status, 403);
    assert.equal(error.code, "forbidden");
    assert.equal(error.details.verb, "admin");
  }
  assert.equal(
    (await org.memoryProviders.ref(process.env.A13N_MEMORY_PROVIDER).test())
      .data.status,
    "succeeded",
  );
  for (const collection of [
    ws.agents,
    ws.sessions,
    ws.threads,
    ws.memories,
    ws.assets,
    ws.connections,
    ws.environments,
    ws.environmentTemplates,
    ws.skills,
    ws.subscriptions,
    ws.secrets,
    org.models,
    org.modelProviders,
    org.webProviders,
    org.environmentProviders,
    org.connectorProviders,
    org.memoryProviders,
  ]) {
    const page = await collection.list({ query: { limit: 1 } });
    assert.ok(Array.isArray(page.data.items));
  }

  // Multipart bytes are not JSON, and downloaded bytes are not buffered by SDK.
  const bytes = new Uint8Array(300_000).map((_, index) => index % 251);
  const uploaded = await ws.uploads.create(
    {
      file: new File([bytes], "generated.bin", {
        type: "application/octet-stream",
      }),
    },
    { idempotencyKey: `${key}-upload` },
  );
  const asset = await ws.assets.create(
    { upload_id: uploaded.data.upload_id, name: `${key}.bin` },
    { idempotencyKey: `${key}-asset` },
  );
  const content = await ws.assets.ref(asset.data.id).content.get();
  try {
    assert.deepEqual(
      new Uint8Array(await new Response(content.body).arrayBuffer()),
      bytes,
    );
  } finally {
    await content.close();
  }

  const png = new Blob(
    [
      Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6tWQAAAAASUVORK5CYII=",
        "base64",
      ),
    ],
    { type: "image/png" },
  );
  await ws.icon.replace(png, {
    ...etag(await ws.get()),
    contentType: "image/png",
  });
  const icon = await ws.icon.get();
  try {
    assert.ok((await new Response(icon.body).arrayBuffer()).byteLength > 0);
  } finally {
    await icon.close();
  }

  const secret = await ws.secrets.create({
    key: `GENERATED_${randomUUID().replaceAll("-", "")}`,
    value: "disposable-test-value",
  });
  const secretRef = ws.secrets.ref(secret.data.id);
  const replaced = await secretRef.replace(
    { value: "replacement-test-value" },
    etag(secret),
  );
  assert.equal((await secretRef.delete(etag(replaced))).response.status, 204);

  const created = await ws.memories.create({ key, name: key });
  const memory = ws.memories.ref(created.data.id);
  const path = "generated/计划 #%.md";
  const first = await memory.files.create({ path, content: "first" });
  const file = memory.files.ref(path);
  const second = await file.replace({ content: "second" }, etag(first));
  await assert.rejects(
    file.replace({ content: "stale" }, etag(first)),
    (error) => error instanceof ApiError && error.status === 412,
  );
  const history = [];
  for await (const revision of memory.revisions.items({
    query: { path, limit: 1 },
  }))
    history.push(revision);
  const update = history.find((revision) => revision.op === "update");
  assert.equal(typeof update.seq, "number");
  assert.equal(
    (await memory.revisions.ref(update.seq).restore(etag(second))).data.file
      .content,
    "first",
  );

  const body = {
    agent_id: process.env.A13N_AGENT,
    payload: {
      content: [{ type: "text", text: "Generated resource acceptance." }],
    },
    memories: [{ name: "notes", memory_id: created.data.id, access: "read" }],
  };
  const submit = () => ws.threads.create(body, { idempotencyKey: key });
  const submitted = await submit();
  const replay = await submit();
  assert.equal(submitted.response.status, 201);
  assert.equal(replay.response.status, 200);
  assert.equal(submitted.data.entry.id, replay.data.entry.id);
  assert.ok(submitted.data.run);
  const thread = ws.threads.ref(submitted.data.thread.id);
  const rawSse = await thread.stream.get({
    signal: AbortSignal.timeout(20_000),
  });
  try {
    const reader = rawSse.body.getReader();
    try {
      assert.ok((await reader.read()).value.byteLength);
    } finally {
      reader.releaseLock();
    }
  } finally {
    await rawSse.close();
  }
  assert.equal(
    (
      await client.resources.workspaces
        .ref(workspaceId)
        .runs.ref(submitted.data.run.id)
        .wait({ timeoutMs: 60_000, pollIntervalMs: 100 })
    ).data.status,
    "completed",
  );
  assert.ok(
    (await ws.runs.ref(submitted.data.run.id).get()).data.memory_mounts.length,
  );
  assert.ok(
    Array.isArray(
      (await ws.runs.ref(submitted.data.run.id).items.get()).data.items,
    ),
  );
  await thread.memories.ref("notes").delete(etag(await thread.get()));
  await memory.delete(etag(await memory.get()));
  console.log(
    JSON.stringify({
      resource_acceptance: "passed",
      sdk: "typescript",
      generated_only_http: true,
      collection_families: 18,
      binary_bytes: bytes.length,
      png_upload: true,
      cas_numeric_restore: true,
      idempotent_replay: true,
      raw_sse_close: true,
    }),
  );
} finally {
  client.close();
}
