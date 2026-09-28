import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { ApiError, createClient } from "../dist/index.js";

// Opt-in, existing disposable HTTPS Service with an accessible mem0_oss provider.
// The caller owns fixture lifecycle; this does not establish cloud compatibility.
for (const name of [
  "A13N_SERVICE_URL",
  "A13N_API_TOKEN",
  "A13N_AGENT",
  "A13N_MEMORY_PROVIDER",
])
  if (!process.env[name]) throw new Error(`${name} is required`);
const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
const etag = (result) => {
  const ifMatch = result.response.headers.get("ETag");
  assert.ok(ifMatch);
  return { ifMatch };
};
try {
  const resources = client.resources;
  const provider = resources.memoryProviders.ref(
    process.env.A13N_MEMORY_PROVIDER,
  );
  assert.equal((await provider.get()).data.type, "mem0_oss");
  assert.equal((await provider.test()).data.status, "succeeded");
  const providers = [];
  for await (const item of resources.memoryProviders.items())
    providers.push(item.id);
  assert.ok(providers.includes(process.env.A13N_MEMORY_PROVIDER));
  assert.equal(
    (await resources.auth.configuration.get()).data.initialized,
    true,
  );
  assert.equal((await resources.healthz.get()).response.status, 200);
  assert.equal((await resources.readyz.get()).response.status, 200);

  const key = `ts-memory-${randomUUID()}`;
  const created = await resources.memories.create({ name: key });
  const memory = resources.memories.ref(created.data.id);
  assert.equal(
    (await memory.update({ name: "SDK file memory" }, etag(created))).data.name,
    "SDK file memory",
  );
  const memories = [];
  for await (const item of resources.memories.items()) memories.push(item.id);
  assert.ok(memories.includes(created.data.id));
  const path = "projects/计划 #1%.md";
  const file = memory.files.ref(path);
  const first = await memory.files.create({ path, content: "first" });
  assert.equal((await file.get()).data.content, "first");
  await file.replace({ content: "second" }, etag(first));
  await assert.rejects(
    file.replace({ content: "stale" }, etag(first)),
    (error) => error instanceof ApiError && error.status === 412,
  );
  const revisions = [];
  for await (const item of memory.revisions.items({
    query: { path, limit: 1 },
  }))
    revisions.push(item);
  const original = revisions.find((item) => item.op === "create").seq;
  assert.equal(
    (await memory.revisions.ref(original).get()).data.content,
    "first",
  );
  const movedPath = "archive/计划.md";
  const moved = await memory.files.move(
    { source: path, destination: movedPath },
    etag(await file.get()),
  );
  assert.equal(moved.data.path, movedPath);
  const paths = [];
  for await (const item of memory.files.items({ query: { limit: 1 } }))
    paths.push(item.path);
  assert.deepEqual(paths, [movedPath]);
  await memory.files.ref(movedPath).delete(etag(moved));
  const changed = revisions.find((item) => item.op === "update").seq;
  assert.equal(
    (await memory.revisions.ref(changed).restore()).data.file.content,
    "first",
  );
  // Restore undoes a change: restoring the creation removes the current file.
  assert.equal(
    (await memory.revisions.ref(original).restore(etag(await file.get()))).data
      .file,
    null,
  );
  assert.ok((await memory.revisions.ref(changed).restore()).data.file);

  const submitted = await resources.threads.create(
    {
      agent_id: process.env.A13N_AGENT,
      payload: { content: [{ type: "text", text: "Memory SDK acceptance." }] },
      memories: [{ name: "notes", memory_id: created.data.id, access: "read" }],
    },
    { idempotencyKey: key },
  );
  assert.ok(submitted.data.run);
  const thread = resources.threads.ref(submitted.data.thread.id);
  const run = client.runs.ref(submitted.data.run.id);
  assert.equal(
    (await run.wait({ timeoutMs: 60_000, pollIntervalMs: 100 })).status,
    "completed",
  );
  const mounted = await thread.memories
    .ref("notes")
    .update({ access: "write" }, etag(await thread.get()));
  assert.equal((await run.get()).data.memory_mounts[0].access, "read");
  const removed = await thread.memories.ref("notes").delete(etag(mounted));
  const extra = await thread.memories.create(
    { name: "extra", memory_id: created.data.id, access: "read" },
    etag(removed),
  );
  assert.equal((await thread.memories.list()).data.items.length, 1);
  await thread.memories.ref("extra").delete(etag(extra));

  const recordCreated = await resources.memories.create({
    name: `${key}-records`,
    type: "mem0_oss",
    provider_id: process.env.A13N_MEMORY_PROVIDER,
  });
  const recordMemory = resources.memories.ref(recordCreated.data.id);
  const record = await recordMemory.records.create({ text: "prefers tea" });
  await recordMemory.records
    .ref(record.data.id)
    .replace({ text: "prefers coffee" });
  assert.ok(
    (
      await recordMemory.records.search({ query: "coffee", limit: 3 })
    ).data.items.some(
      (item) => item.id === record.data.id && item.text === "prefers coffee",
    ),
  );
  const records = [];
  for await (const item of recordMemory.records.items({ query: { limit: 1 } }))
    records.push(item.id);
  assert.ok(records.includes(record.data.id));
  await recordMemory.records.ref(record.data.id).delete();
  assert.equal((await recordMemory.records.list()).data.items.length, 0);
  await recordMemory.delete(etag(await recordMemory.get()));
  assert.ok(
    (await memory.revisions.delete({ query: { path: movedPath } })).data
      .purged > 0,
  );
  await memory.delete(etag(await memory.get()));
  console.log(
    JSON.stringify({
      memory_acceptance: "passed",
      sdk: "typescript",
      file_cas: true,
      numeric_revision_restore: true,
      frozen_run_mounts: true,
      record_crud_search: true,
      provider_test: "fixture",
    }),
  );
} finally {
  client.close();
}
