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
const workspace = resources.workspaces.ref(workspaceId);
const org = resources.organizations.ref(process.env.A13N_ORGANIZATION);
const key = `generated-${randomUUID()}`;
const stage = (name) => console.log(`[typescript resources] ${name}`);
const etag = (result) => {
  const ifMatch = result.response.headers.get("ETag");
  assert.ok(ifMatch);
  return { ifMatch };
};
try {
  stage("probes and shared providers: start");
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
    (
      await resources.memoryProviders
        .ref(process.env.A13N_MEMORY_PROVIDER)
        .test()
    ).data.status,
    "succeeded",
  );
  // These disconnected-provider boundaries perform no issuer authorization,
  // token exchange or paid Model invocation. Success flows remain mock-tested.
  stage("native Model Provider authorization boundaries: start");
  const modelTypes = (await resources.providerTypes.ref("model").list()).data
    .items;
  assert.equal(
    modelTypes.find((type) => type.type === "openai_chatgpt")?.oauth_scheme,
    "openai-chatgpt",
  );
  const disconnected = await resources.modelProviders.create({
    type: "openai_chatgpt",
    name: `${key}-oauth`,
    config: {},
  });
  const provider = resources.modelProviders.ref(disconnected.data.id);
  const status = (await provider.authorization.get()).data;
  assert.equal(status.state, "disconnected");
  assert.equal(status.pending, false);
  await assert.rejects(
    provider.authorization.callback({
      attempt_id: "not-started",
      callback_url: "https://callback.example.test/?code=unused&state=unused",
    }),
    (error) =>
      error instanceof ApiError &&
      error.status === 409 &&
      error.details.reason === "authorization_not_pending",
  );
  const cleared = (await provider.authorization.delete()).data;
  assert.equal(cleared.local_tokens_cleared, true);
  assert.equal(cleared.revocation_confirmed, null);
  // Model Providers have no DELETE operation. The disposable fixture owns
  // removal of this provider and its database, not a fabricated SDK cleanup.
  stage(
    "native Model Provider authorization boundaries: passed (no external OAuth)",
  );
  stage("probes and shared providers: passed");
  stage("collections: start");
  for (const collection of [
    resources.agents,
    resources.sessions,
    resources.threads,
    resources.memories,
    resources.assets,
    resources.connections,
    resources.environments,
    resources.environmentTemplates,
    resources.skills,
    resources.subscriptions,
    resources.models,
    resources.modelProviders,
    resources.webProviders,
    resources.environmentProviders,
    resources.connectorProviders,
    resources.memoryProviders,
  ]) {
    const page = await collection.list({ query: { limit: 1 } });
    assert.ok(Array.isArray(page.data.items));
  }

  stage("collections: passed");
  stage("multipart upload and binary download: start");
  // Multipart bytes are not JSON, and downloaded bytes are not buffered by SDK.
  const bytes = new Uint8Array(300_000).map((_, index) => index % 251);
  const uploaded = await resources.uploads.create(
    {
      file: new File([bytes], "generated.bin", {
        type: "application/octet-stream",
      }),
    },
    { idempotencyKey: `${key}-upload` },
  );
  assert.match(uploaded.data.upload_id, /^upl_[a-f0-9]{32}$/);
  const asset = await resources.assets.create(
    { upload_id: uploaded.data.upload_id, name: `${key}.bin` },
    { idempotencyKey: `${key}-asset` },
  );
  const content = await resources.assets.ref(asset.data.id).content.get();
  try {
    assert.deepEqual(
      new Uint8Array(await new Response(content.body).arrayBuffer()),
      bytes,
    );
  } finally {
    await content.close();
  }

  stage("multipart upload and binary download: passed");
  stage("workspace icon: start");
  const png = new Blob(
    [
      Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6tWQAAAAASUVORK5CYII=",
        "base64",
      ),
    ],
    { type: "image/png" },
  );
  await workspace.icon.replace(png, {
    ...etag(await workspace.get()),
    contentType: "image/png",
  });
  const icon = await workspace.icon.get();
  try {
    assert.ok((await new Response(icon.body).arrayBuffer()).byteLength > 0);
  } finally {
    await icon.close();
  }

  stage("workspace icon: passed");
  stage("memory CAS and restore: start");
  const created = await resources.memories.create({ name: key });
  const memory = resources.memories.ref(created.data.id);
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

  stage("memory CAS and restore: passed");
  stage("submission replay: start");
  const body = {
    agent_id: process.env.A13N_AGENT,
    payload: {
      content: [{ type: "text", text: "Generated resource acceptance." }],
    },
    memories: [{ name: "notes", memory_id: created.data.id, access: "read" }],
  };
  const submit = () => resources.threads.create(body, { idempotencyKey: key });
  const submitted = await submit();
  const replay = await submit();
  assert.equal(submitted.response.status, 201);
  assert.equal(replay.response.status, 200);
  assert.equal(submitted.data.entry.id, replay.data.entry.id);
  assert.ok(submitted.data.run);
  const thread = resources.threads.ref(submitted.data.thread.id);
  stage("submission replay: passed");
  stage("raw SSE: opening");
  const rawSse = await thread.stream.get({
    signal: AbortSignal.timeout(20_000),
  });
  stage("raw SSE: opened");
  try {
    const reader = rawSse.body.getReader();
    try {
      stage("raw SSE: reading first chunk");
      assert.ok((await reader.read()).value.byteLength);
      stage("raw SSE: first chunk received");
    } finally {
      reader.releaseLock();
    }
  } finally {
    stage("raw SSE: closing");
    await rawSse.close();
    stage("raw SSE: closed");
  }
  stage("exact Run wait: start");
  assert.equal(
    (
      await client.runs
        .ref(submitted.data.run.id)
        .wait({ timeoutMs: 60_000, pollIntervalMs: 100 })
    ).status,
    "completed",
  );
  stage("exact Run wait: passed");
  stage("committed Items coverage: reading");
  assert.ok(
    (await resources.runs.ref(submitted.data.run.id).get()).data.memory_mounts
      .length,
  );
  const display = (await resources.runs.ref(submitted.data.run.id).items.get())
    .data;
  assert.ok(Array.isArray(display.items));
  assert.equal(display.run.id, submitted.data.run.id);
  assert.equal(display.complete, true);
  assert.match(display.position, /^(0|[1-9]\d{0,19})-(0|[1-9]\d{0,19})$/);
  if (display.resume_after != null)
    assert.match(display.resume_after, /^\d{1,20}-\d{1,20}$/);
  // This sealed display is the explicit baseline. The Thread may no longer
  // have a current Run: a healthy response can remain idle, including with a
  // retained hint. Observe a bounded window, not an assumed boundary replay.
  for (const lastEventId of new Set([
    undefined,
    display.resume_after ?? undefined,
    "0-0",
  ])) {
    const hint =
      lastEventId === undefined
        ? "absent"
        : lastEventId === "0-0"
          ? "expired"
          : "confirmed";
    stage(`coverage (${hint} hint): opening`);
    const observation = new AbortController();
    const covered = await thread.stream.get({
      query: { run: display.run.id, position: display.position },
      ...(lastEventId ? { lastEventId } : {}),
      signal: AbortSignal.any([
        AbortSignal.timeout(20_000),
        observation.signal,
      ]),
    });
    stage(`coverage (${hint} hint): opened; observing bounded window`);
    const timer = setTimeout(() => observation.abort(), 1000);
    const reader = covered.body.getReader();
    try {
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        let chunk;
        try {
          chunk = await reader.read();
        } catch (error) {
          if (!observation.signal.aborted) throw error;
          break;
        }
        assert.equal(chunk.done, false, "coverage stream ended unexpectedly");
        buffer += decoder.decode(chunk.value, { stream: true });
        let delimiter;
        while ((delimiter = buffer.indexOf("\n\n")) >= 0) {
          const envelope = buffer.slice(0, delimiter);
          buffer = buffer.slice(delimiter + 2);
          const event = envelope
            .split("\n")
            .find((line) => line.startsWith("event: "))
            ?.slice(7);
          if (!event || event === "changed") continue;
          assert.notEqual(
            event,
            "gap",
            "missing replay hint alone must not report loss",
          );
          assert.notEqual(
            event,
            "reset",
            "same-attempt snapshot must not reset",
          );
          assert.notEqual(
            event,
            "delta",
            "sealed display already covers these deltas",
          );
          if (event === "boundary") {
            const data = JSON.parse(
              envelope
                .split("\n")
                .find((line) => line.startsWith("data: "))
                .slice(6),
            );
            assert.equal(data.run_id, display.run.id);
          }
        }
      }
    } finally {
      clearTimeout(timer);
      try {
        stage(`coverage (${hint} hint): cancelling reader`);
        await reader.cancel().catch((error) => {
          if (!observation.signal.aborted) throw error;
        });
      } finally {
        reader.releaseLock();
        stage(`coverage (${hint} hint): closing response`);
        await covered.close();
      }
      assert.equal(covered.closed, true);
      stage(`coverage (${hint} hint): closed`);
    }
  }
  stage("memory cleanup: start");
  await thread.memories.ref("notes").delete(etag(await thread.get()));
  await memory.delete(etag(await memory.get()));
  stage("memory cleanup: passed");
  console.log(
    JSON.stringify({
      resource_acceptance: "passed",
      sdk: "typescript",
      generated_only_http: true,
      collection_families: 16,
      binary_bytes: bytes.length,
      png_upload: true,
      cas_numeric_restore: true,
      idempotent_replay: true,
      raw_sse_close: true,
      snapshot_coverage_and_expired_hint: true,
    }),
  );
} finally {
  client.close();
}
