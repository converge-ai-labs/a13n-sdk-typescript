import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const temporaryRoot = mkdtempSync(join(tmpdir(), "a13n-sdk-package-"));
const packedDirectory = join(temporaryRoot, "packed");
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
// An explicit tarball validates a retained candidate without repacking source.
const suppliedTarball = process.argv[2] ? resolve(process.argv[2]) : undefined;

try {
  mkdirSync(packedDirectory);
  const packOutput = suppliedTarball
    ? JSON.stringify([{ filename: basename(suppliedTarball) }])
    : execFileSync(
        npm,
        ["pack", "--json", "--pack-destination", packedDirectory],
        { cwd: packageRoot, encoding: "utf8" },
      );
  const [{ filename }] = JSON.parse(packOutput);
  assert.equal(typeof filename, "string");
  const tarball = suppliedTarball ?? join(packedDirectory, filename);

  writeFileSync(
    join(temporaryRoot, "package.json"),
    JSON.stringify({ private: true, type: "module" }),
  );
  execFileSync(
    npm,
    [
      "install",
      "--ignore-scripts",
      "--no-audit",
      "--no-fund",
      "--no-package-lock",
      tarball,
    ],
    { cwd: temporaryRoot, stdio: "inherit" },
  );
  const notices = readFileSync(
    join(
      temporaryRoot,
      "node_modules/@converge.ai/a13n/THIRD_PARTY_NOTICES.txt",
    ),
    "utf8",
  );
  for (const notice of [
    "ajv",
    "ajv-formats",
    "fast-deep-equal",
    "Copyright (c) 2015-2021 Evgeny Poberezkin",
    "Copyright (c) 2020 Evgeny Poberezkin",
    "Copyright (c) 2017 Evgeny Poberezkin",
  ])
    assert.ok(
      notices.includes(notice),
      `Missing bundled runtime notice: ${notice}`,
    );

  writeFileSync(
    join(temporaryRoot, "consumer.mjs"),
    `import assert from "node:assert/strict";
import { ApiError, createClient, text, json, url, asset, approve, deny, returned, failed, PreviewInterruptedError, SubmissionUnknownError, sessionStream } from "@converge.ai/a13n";

assert.equal(typeof createClient, "function");
assert.equal(typeof ApiError, "function");
const client = createClient({
  baseUrl: "https://service.example.test",
  auth: { type: "bearer", token: "test-token" },
  fetch: async (request) => {
    const url = new URL(request.url);
    assert.equal(url.pathname, "/api/v1/runs/run_example/items");
    assert.equal(url.searchParams.get("limit"), "1");
    const historical = url.searchParams.has("before");
    if (historical) assert.equal(url.searchParams.get("before"), "3");
    return Response.json({
      run: { id: "run_example", status: "completed" },
      items: historical ? [{ ordinal: 2 }] : [{ ordinal: 3 }, { ordinal: 4 }],
      complete: true,
    });
  },
});
const baseline = (await client.runs.ref("run_example").items({ query: { limit: 1 } })).data;
assert.deepEqual(Object.keys(baseline).sort(), ["complete", "items", "run"]);
assert.equal(baseline.items.length, 2);
const history = (await client.runs.ref("run_example").items({ query: { before: 3, limit: 1 } })).data;
assert.deepEqual(Object.keys(history).sort(), ["complete", "items", "run"]);
assert.equal(history.complete, true);
assert.equal(typeof client.agents.ref("agt_example").start, "function");
assert.equal(typeof client.agents.ref("agt_example").send, "function");
assert.equal("resources" in client, false);
assert.equal(typeof client.api.agents.ref("agt_example").get, "function");
assert.equal(typeof client.api.threads.create, "function");
assert.equal(typeof client.api.organizations.ref("org_example").get, "function");
assert.equal(typeof client.api.healthz.get, "function");
assert.equal(typeof client.api.uploads.create, "function");
client.close();

let writes = 0;
let requests = 0;
const workflow = createClient({
  baseUrl: "https://service.example.test",
  auth: { type: "bearer", token: "test" },
  fetch: async (request) => {
    requests++;
    assert.equal(request.headers.get("Authorization"), "Bearer test");
    const path = new URL(request.url).pathname;
    if (path === "/api/v1/agents/agent") {
      assert.equal(request.method, "GET");
      return Response.json({ id: "agent" }, { headers: { ETag: '"agent-v1"' } });
    }
    if (request.method === "POST") {
      writes++;
      const body = await request.json();
      assert.ok(request.headers.get("Idempotency-Key"));
      if (path.endsWith("/resume")) {
        assert.deepEqual(body, { approvals: { decision: approve() }, calls: { external: returned(null) }, input: { content: [text("Continue")] } });
        return Response.json({ id: "successor", thread_id: "thread", status: "accepted" }, { status: 201 });
      }
      assert.deepEqual(body.payload.content, [text("Hi"), json(false), url("https://example.test/a"), asset("asset")]);
      return Response.json({ thread: { id: "thread" }, entry: { id: "entry", thread_id: "thread" }, run: null }, { status: 201 });
    }
    if (path.endsWith("/inbox/entry")) return Response.json({ id: "entry", thread_id: "thread", status: "consumed", assigned_run_id: "exact" });
    const id = path.endsWith("/successor") ? "successor" : "exact";
    return Response.json({ id, thread_id: "thread", status: "completed", output: "", pending: null, failure: null });
  },
});
try {
  assert.equal("resources" in workflow, false);
  const native = await workflow.api.agents.ref("agent").get();
  assert.equal(native.data.id, "agent");
  assert.equal(native.response.headers.get("ETag"), '"agent-v1"');
  const interaction = await workflow.agents.ref("agent").start(["Hi", json(false), url("https://example.test/a"), asset("asset")]);
  assert.equal(interaction.run, null);
  assert.match(interaction.idempotencyKey, /^[a-f0-9-]{36}$/);
  const outcome = await interaction.result();
  assert.equal(outcome.text, "");
  assert.equal(outcome.threadId, "thread");
  const recovered = workflow.threads.ref("thread").entry("entry").interaction();
  assert.equal(recovered.receipt, undefined);
  assert.equal((await recovered.result()).runId, "exact");
  const successor = await outcome.run.resume({ decision: approve(), external: returned(null) }, { input: "Continue" });
  assert.equal(successor.entry, null);
  assert.equal((await successor.result()).runId, "successor");
  assert.equal(writes, 2);
  assert.equal(typeof interaction.textStream, "function");
  assert.equal(typeof workflow.runs.ref("exact").observe, "function");
  assert.equal(typeof PreviewInterruptedError, "function");
  assert.equal(typeof SubmissionUnknownError, "function");
  assert.deepEqual(deny(null), { action: "deny", reason: null });
  assert.deepEqual(failed("failed"), { status: "failed", message: "failed" });
  await successor.close(); await recovered.close(); await interaction.close();
} finally { workflow.close(); }
const requestsAtClose = requests;
await assert.rejects(workflow.api.agents.ref("agent").get(), { name: "AbortError" });
await assert.rejects(workflow.agents.ref("agent").start("Closed", { idempotencyKey: "closed" }), { name: "AbortError" });
assert.equal(requests, requestsAtClose);

const catchupRequests = [];
const overrides = { lazy_environment: false, skill_sync: { mode: "isolated", cache_count: 0 } };
const selection = { agent_id: null, presets: ["recovery"], max_traces: 1 };
const diagnostic = { agent_id: "agent", agent_revision_id: "revision", title: "Recovery", category: "workflow_issue", explanation: "Evidence", suggestion: "Use one boundary", source_key: "installed", evidence: [{ run_id: "run", trace_id: "1".repeat(32) }] };
let analyses = 0;
const catchup = createClient({
  baseUrl: "https://service.example.test",
  auth: { type: "bearer", token: "test" },
  fetch: async (request) => {
    assert.equal(request.headers.get("Authorization"), "Bearer test");
    const target = new URL(request.url);
    const path = target.pathname;
    catchupRequests.push([request.method, path]);
    if (path === "/api/v1/threads") {
      assert.deepEqual(await request.json(), { agent_id: "agent", payload: { content: [text("Prepared")] }, options: { overrides } });
      return Response.json({ thread: { id: "thread" }, entry: { id: "entry", thread_id: "thread" }, run: null }, { status: 201 });
    }
    if (path === "/api/v1/finding-agent") { assert.equal(await request.text(), ""); return Response.json({ id: "analyst", preset_kind: "finding" }); }
    if (path === "/api/v1/finding-analyses") {
      if (request.method === "GET") return Response.json({ items: [], next_cursor: null });
      assert.equal(request.headers.get("Idempotency-Key"), "analysis");
      assert.deepEqual(await request.json(), selection);
      return Response.json({ id: "analysis", run_id: "analysis-run" }, { status: ++analyses === 1 ? 201 : 200 });
    }
    if (path === "/api/v1/findings") {
      if (request.method === "GET") return Response.json({ items: [{ id: "finding" }], next_cursor: null });
      assert.deepEqual(await request.json(), diagnostic);
      return Response.json({ ...diagnostic, id: "finding" }, { status: 201, headers: { ETag: '"finding-v1"' } });
    }
    if (path === "/api/v1/findings/finding") {
      if (request.method === "PATCH") { assert.equal(request.headers.get("If-Match"), '"finding-v1"'); assert.deepEqual(await request.json(), { closed: false }); }
      return Response.json({ ...diagnostic, id: "finding" });
    }
    if (path === "/api/v1/runs/run/contents/content") return Response.json({ id: "content", media_type: "text/plain", value: "{truncated JSON", truncated: true });
    if (path === "/api/v1/sessions/session/message-authors") {
      assert.deepEqual(target.searchParams.getAll("entry_id"), ["entry", "other"]);
      return Response.json({ items: [{ entry_id: "entry", principal_id: "principal", principal: null, submitted_at: "2026-10-13T00:00:00Z" }] });
    }
    if (path === "/api/v1/model-providers/provider/models") return Response.json([{ slug: "native", display_name: "Native", characteristics: null }]);
    if (path === "/api/v1/memories/memory/records") return Response.json({ items: [{ id: "record", text: "Text", score: null, updated_at: null, provenance: { created: null, last_write: { principal_id: "principal", principal_name: null, run_id: null, attempt_id: null, tool_call_id: null, confirmed_at: "2026-10-13T00:00:00Z" }, content_matches: false } }], next_cursor: null });
    throw new Error("Unexpected installed catch-up request: " + path);
  },
});
try {
  assert.equal((await catchup.api.findingAgent()).data.preset_kind, "finding");
  assert.deepEqual((await catchup.api.findingAnalyses.list()).data.items, []);
  assert.equal((await catchup.api.findingAnalyses.create(selection, { idempotencyKey: "analysis" })).response.status, 201);
  assert.equal(analyses, 1);
  assert.equal((await catchup.api.findingAnalyses.create(selection, { idempotencyKey: "analysis" })).response.status, 200);
  const created = await catchup.api.findings.create(diagnostic);
  assert.equal((await catchup.api.findings.ref("finding").get()).data.id, created.data.id);
  await catchup.api.findings.ref("finding").update({ closed: false }, { ifMatch: created.response.headers.get("ETag") });
  const pages = catchup.api.findings.pages({ query: { closed: false } });
  assert.equal((await pages.next()).value.data.items[0].id, "finding");
  assert.equal((await pages.next()).done, true);
  const saved = (await catchup.api.runs.ref("run").contents.ref("content").get()).data;
  assert.deepEqual(saved, { id: "content", media_type: "text/plain", value: "{truncated JSON", truncated: true });
  assert.equal((await catchup.api.sessions.ref("session").messageAuthors.list({ query: { entry_id: ["entry", "other"] } })).data.items[0].principal, null);
  assert.equal((await catchup.api.modelProviders.ref("provider").models.get()).data[0].characteristics, null);
  assert.equal((await catchup.api.memories.ref("memory").records.list()).data.items[0].provenance.content_matches, false);
  const prepared = await catchup.agents.ref("agent").start("Prepared", { options: { overrides } });
  await prepared.close();
  assert.equal(catchupRequests.length, 13);
} finally { catchup.close(); }
const atShutdown = catchupRequests.length;
await assert.rejects(catchup.api.findingAgent(), { name: "AbortError" });
assert.equal(catchupRequests.length, atShutdown);
`,
  );
  execFileSync(process.execPath, [join(temporaryRoot, "consumer.mjs")], {
    cwd: temporaryRoot,
    stdio: "inherit",
  });

  writeFileSync(
    join(temporaryRoot, "consumer.ts"),
    `import { sessionStream } from "@converge.ai/a13n";
import {
  createClient,
  type Client,
  type ResourceResult,
  type components,
  text, json, url, asset, approve, deny, returned, failed,
  type RunOptions, type RunConfiguration, type AgentOverride, type MessageHistory,
} from "@converge.ai/a13n";

const client: Client = createClient({
  baseUrl: "https://service.example.test",
  auth: { type: "bearer", token: "test-token" },
});
// @ts-expect-error No obsolete public resources entry or compatibility alias.
void client.resources;
const nativeAgent = client.api.agents.ref("agt_example");
void nativeAgent.get;
// @ts-expect-error Native management references do not own authored start.
void nativeAgent.start;
// @ts-expect-error Authored Agent workflow references do not own native get.
void client.agents.ref("agt_example").get;
const organization = client.api.organizations.ref("org_example");
void client.api.runs.ref("run_example").get;
void client.api.threads.pages({ query: { limit: 10 } });
void organization.get;
void client.api.modelProviders.list;
void client.api.memories.pages({ query: { label: ["a"] } });
void client.api.assets.ref("asset").content.get;
// @ts-expect-error The old account-specific discovery model is retired.
type RetiredModel = components["schemas"]["ChatGPTModel"];
void (null as unknown as RetiredModel);
const source: import("@converge.ai/a13n").SessionStreamSchemas["MemorySource"] = { kind: "record", memory: "notes", status: "timeout" };
const contentRef: components["schemas"]["ContentRef"] = { id: "content", media_type: "application/json", preview: "{}", size_bytes: 2 };
const shared: components["schemas"]["SharedSkillSync"] = { mode: "shared" };
const isolated: components["schemas"]["IsolatedSkillSync"] = { mode: "isolated", cache_count: 0 };
void source; void contentRef; void shared; void isolated;
// @ts-expect-error Mode-specific fields cannot be mixed.
const mixed: components["schemas"]["SharedSkillSync"] = { mode: "shared", cache_count: 1 };
// @ts-expect-error The native lazy-environment override is boolean or null.
const invalidLazy: AgentOverride = { lazy_environment: "true" };
void mixed; void invalidLazy;
async function catchupTypes() {
  const content: ResourceResult<components["schemas"]["RunContent"]> = await client.api.runs.ref("run").contents.ref("content").get();
  const authors: ResourceResult<components["schemas"]["MessageAuthors"]> = await client.api.sessions.ref("session").messageAuthors.list({ query: { entry_id: ["entry"] } });
  const analyst: ResourceResult<components["schemas"]["Agent"]> = await client.api.findingAgent();
  const analyses: ResourceResult<components["schemas"]["AnalysisPage"]> = await client.api.findingAnalyses.list();
  await client.api.findingAnalyses.create({ presets: ["recovery"] }, { idempotencyKey: "analysis" });
  await client.api.findings.ref("finding").update({ closed: false }, { ifMatch: "etag" });
  // @ts-expect-error Native analysis mutations require an explicit key.
  await client.api.findingAnalyses.create({ presets: ["recovery"] });
  // @ts-expect-error Finding edits require an ETag.
  await client.api.findings.ref("finding").update({ closed: false });
  // @ts-expect-error Message-author query IDs are required.
  await client.api.sessions.ref("session").messageAuthors.list();
  const interaction = await client.agents.ref("agent").start("Hi", { options: { overrides: { lazy_environment: null, skill_sync: isolated } } });
  for await (const event of interaction) if (event.frame.type === "delta") {
    const sources: import("@converge.ai/a13n").SessionStreamSchemas["MemorySource"][] | null | undefined = event.frame.data.item?.memory_sources;
    void sources;
  }
  await interaction.close();
  void content; void authors; void analyst; void analyses;
}
void catchupTypes;
// @ts-expect-error Revision selectors retain their numeric contract in the published package.
client.api.memories.ref("memory").revisions.ref("1");
async function example() {
  const agent = client.agents.ref("agt_example");
  const interaction = await agent.start("Hello", { idempotencyKey: "start-1", options: { configuration: { allowed_hosts: null, extensions: { "app.example/sdk": { enabled: false, nested: [null, {}, []] } } }, overrides: { model_settings: { extra_body: {}, extra_headers: {} } } } });
  for await (const event of interaction) {
    if (event.frame.type === "delta" && event.frame.data.item) {
      const ordinal: number | null | undefined = event.frame.data.item.ordinal;
      const group: string | null | undefined = event.frame.data.item.response_group;
      const failure: Record<string, unknown> | null | undefined = event.frame.data.item.failure;
      void ordinal; void group; void failure;
    }
    if (event.frame.type === "gap") {
      const target: string | null | undefined = event.frame.data.position;
      void target;
    }
  }
  const outcome = await interaction.result();
  void outcome.output;
  const display = (await outcome.run.items({ query: { limit: 1 } })).data;
  await outcome.run.items({ query: { before: 3, limit: 20 } });
  await client.api.runs.ref(outcome.run.id).items.get({ query: { after: 0, limit: 500 } });
  const continuation: import("@converge.ai/a13n").SessionStreamSchemas["DisplayContinuation"] = {
    run_id: "run_example", next_ordinal: 3, position: { attempt: 1, sequence: 2 },
    fragments: { pending: { fragment: { count: 2, parts: ["partial"] } } },
    observer: { state: { children: { child: { children: { grandchild: { parts: { part: { kind: "text", part_id: "message" } } } } } } } },
  };
  void continuation;
  // @ts-expect-error Items ordinal windows are not generic cursor collections.
  await outcome.run.items({ query: { cursor: "opaque" } });
  // @ts-expect-error Removed display-loss field is not part of the new contract.
  void display.dropped;
  // @ts-expect-error The Thread has a last seal, not an earlier successful head.
  void (await client.threads.ref(outcome.threadId).get()).data.head_run_id;
  // @ts-expect-error Items reads no longer supply Thread stream replay hints.
  void display.resume_after;
  // @ts-expect-error Items has no baseline marker.
  void display.baseline;
  // @ts-expect-error RunView has no display position.
  void display.run.display_position;
  // @ts-expect-error ThreadView has no imported message history readback.
  void (await client.threads.ref(outcome.threadId).get()).data.message_history;
  const response = await client.api.sessions.ref("session").stream.get();
  for await (const frame of sessionStream(response)) {
    if (frame.type === "thread") { void frame.data.thread; void frame.data.entries; }
    if (frame.type === "items") { void frame.data.continuation; void frame.data.first; }
    if (frame.type === "delta") { void frame.data.event; void frame.data.item; }
    if (frame.type === "gap") {
      void frame.data.thread_id;
      // @ts-expect-error Session gaps have no Thread coverage field.
      void frame.data.position;
    }
  }
  // @ts-expect-error Session stream cannot resume from a Thread cursor.
  await client.api.sessions.ref("session").stream.get({ lastEventId: "1-0" });
  const config: components["schemas"]["ModelConfig-Input"] = {
    model_name: "native", model_api: "openai.responses",
    settings: { reasoning_effort: "high", native: { values: [1, null, false] } },
  };
  config.characteristics = { image_input: null, video_input: { max_video_bytes: 1048576 }, url_input: { video: ["youtube"] } };
  void config;
  const provider = client.api.modelProviders.ref("provider");
  const status: ResourceResult<components["schemas"]["AuthorizationStatus"]> = await provider.authorization.get();
  const started: ResourceResult<components["schemas"]["AuthorizationStart"]> = await provider.authorize({ new_registration: false });
  await provider.authorization.callback({ attempt_id: started.data.attempt_id, callback_url: "https://service.example.test/operator/callback?code=opaque" });
  const disconnected: ResourceResult<components["schemas"]["AuthorizationDisconnect"]> = await provider.authorization.delete();
  const models: ResourceResult<components["schemas"]["ProviderModel"][]> = await provider.models.get();
  void status; void disconnected; void models;
  // @ts-expect-error Native configuration is nested in Run options, not a new SDK parameter.
  await agent.start("Wrong", { idempotencyKey: "wrong", configuration: {} });
  const followup = await agent.send(outcome.threadId, "Next", { idempotencyKey: "next-1", options: { configuration: {} } });
  await followup.close();
  const configuration: RunConfiguration = { allowed_hosts: [], extensions: { native: { zero: 0, flag: false } } };
  const overrides: AgentOverride = { instructions: null, model: null, model_settings: { custom: [null, false, 0] }, model_characteristics: null, media_understanding: null, output_spec: null, client_tools: [], connection_tools: [], plugins: [], retries: null, reviewer: null, skills: [], subagents: { removed: null }, toolsets: {} };
  const options: RunOptions = { configuration, overrides, labels: { purpose: "installed" }, max_usage: { requests: 2 } };
  const messageHistory: MessageHistory = [];
  const publicInput = await agent.start([text("Hi"), json(0), url("https://example.test/a"), asset("asset")], { options, messageHistory, sessionId: null, agentRevisionId: null, mcpHeaders: {}, environments: [], memories: [] });
  try {
    for await (const chunk of publicInput.textStream()) { const value: string = chunk; void value; }
    const result = await publicInput.result();
    const textResult: string | undefined = result.text;
    const structured: unknown = result.output;
    void textResult; void structured; void result.pendingCalls; void result.pendingApprovals;
    const successor = await result.run.resume({ accepted: approve(), rejected: deny(null), external: returned(null), failure: failed("unanswered") }, { input: "Follow-up" });
    await successor.result(); await successor.close();
    const recovered = client.threads.ref(result.threadId).entry("entry").interaction({ timeoutMs: 1000 });
    await recovered.close();
    const exact = client.runs.ref(result.runId).observe({ timeoutMs: 1000 });
    await exact.close();
    // @ts-expect-error Returned requires an explicit value.
    returned();
    // @ts-expect-error No competing authored Run.wait shape.
    result.run.wait();
    // @ts-expect-error No asserted Agent generic output type.
    client.agents.ref<{ output: true }>("agent");
  } finally { await publicInput.close(); }
}
void example;
const result: ResourceResult<{ ok: true }> = {
  data: { ok: true },
  response: new Response(),
};
void result;
client.close();
`,
  );
  const refreshRuntime = readFileSync(
    join(packageRoot, "tests/service-refresh.test.mjs"),
    "utf8",
  );
  assert.ok(refreshRuntime.includes('from "../dist/index.js"'));
  writeFileSync(
    join(temporaryRoot, "service-refresh.test.mjs"),
    refreshRuntime.replace(
      'from "../dist/index.js"',
      'from "@converge.ai/a13n"',
    ),
  );
  for (const [source, target] of [
    ["scripts/accept-refresh.mjs", "accept-refresh.mjs"],
    ["tests/refresh-caller.test.mjs", "refresh-caller.test.mjs"],
  ]) {
    const content = readFileSync(join(packageRoot, source), "utf8");
    assert.ok(content.includes('from "../dist/index.js"'));
    writeFileSync(
      join(temporaryRoot, target),
      content
        .replace('from "../dist/index.js"', 'from "@converge.ai/a13n"')
        .replace('from "../src/index.js"', 'from "@converge.ai/a13n"')
        .replace(
          'from "../scripts/accept-refresh.mjs"',
          'from "./accept-refresh.mjs"',
        ),
    );
  }
  execFileSync(
    process.execPath,
    [
      "--test",
      join(temporaryRoot, "service-refresh.test.mjs"),
      join(temporaryRoot, "refresh-caller.test.mjs"),
    ],
    { cwd: temporaryRoot, stdio: "inherit" },
  );
  // Consume the new Session API only through the installed public package.
  for (const [source, target] of [
    ["tests/session-stream.test.mjs", "session-stream.test.mjs"],
    ["tests/desktop-context.test.mjs", "desktop-context.test.mjs"],
    ["tests/desktop-context.ts", "desktop-context.ts"],
    ["tests/execution.ts", "execution.ts"],
    ["tests/execution.test.mjs", "execution.test.mjs"],
    ["tests/session-fixtures.mjs", "session-fixtures.mjs"],
    ["tests/session-caller.test.mjs", "session-caller.test.mjs"],
    ["scripts/accept-session.mjs", "accept-session.mjs"],
    ["tests/followup-caller.test.mjs", "followup-caller.test.mjs"],
    ["scripts/accept-followup.mjs", "accept-followup.mjs"],
  ]) {
    writeFileSync(
      join(temporaryRoot, target),
      readFileSync(join(packageRoot, source), "utf8")
        .replace('from "../dist/index.js"', 'from "@converge.ai/a13n"')
        .replace('from "../src/index.js"', 'from "@converge.ai/a13n"')
        .replace(
          'from "../scripts/accept-session.mjs"',
          'from "./accept-session.mjs"',
        )
        .replace(
          'from "../scripts/accept-followup.mjs"',
          'from "./accept-followup.mjs"',
        ),
    );
  }
  execFileSync(
    process.execPath,
    [
      "--disallow-code-generation-from-strings",
      "--test",
      "session-stream.test.mjs",
      "session-caller.test.mjs",
      "desktop-context.test.mjs",
      "execution.test.mjs",
      "followup-caller.test.mjs",
    ],
    { cwd: temporaryRoot, stdio: "inherit" },
  );
  const refreshTypes = readFileSync(
    join(packageRoot, "tests/service-refresh.ts"),
    "utf8",
  );
  assert.ok(refreshTypes.includes('from "../src/index.js"'));
  writeFileSync(
    join(temporaryRoot, "service-refresh.ts"),
    refreshTypes.replace('from "../src/index.js"', 'from "@converge.ai/a13n"'),
  );
  writeFileSync(
    join(temporaryRoot, "tsconfig.json"),
    JSON.stringify({
      compilerOptions: {
        exactOptionalPropertyTypes: true,
        module: "NodeNext",
        moduleResolution: "NodeNext",
        noEmit: true,
        skipLibCheck: false,
        strict: true,
        target: "ES2023",
      },
      include: [
        "consumer.ts",
        "service-refresh.ts",
        "desktop-context.ts",
        "execution.ts",
      ],
    }),
  );
  const typescriptPackage = JSON.parse(
    readFileSync(
      join(packageRoot, "node_modules/typescript/package.json"),
      "utf8",
    ),
  );
  assert.equal(typeof typescriptPackage.version, "string");
  execFileSync(
    process.execPath,
    [
      join(packageRoot, "node_modules/typescript/bin/tsc"),
      "--project",
      join(temporaryRoot, "tsconfig.json"),
    ],
    { cwd: temporaryRoot, stdio: "inherit" },
  );

  console.log(
    `Installed ${filename} in an isolated consumer; Node ESM import and TypeScript ${typescriptPackage.version} resolution passed.`,
  );
} finally {
  rmSync(temporaryRoot, { recursive: true, force: true });
}
