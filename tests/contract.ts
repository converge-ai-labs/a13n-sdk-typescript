import {
  createClient,
  type Client,
  type components,
  sessionStream,
  type SessionStreamFrame,
  type SessionStreamSchemas,
  type ResourceResult,
  textPayload,
  text,
  json,
  url,
  asset,
  approve,
  deny,
  returned,
  failed,
  type RunOptions,
  type RunConfiguration,
  type AgentOverride,
  type MessageHistory,
} from "../src/index.js";
import { threadStream } from "../src/streams/thread-stream.js";

type Schema = components["schemas"];
// @ts-expect-error The account-specific discovery model name is retired.
type RetiredDiscoveryModel = Schema["ChatGPTModel"];
void (null as unknown as RetiredDiscoveryModel);
const sharedSkillSync: Schema["SharedSkillSync"] = { mode: "shared" };
const isolatedSkillSync: Schema["IsolatedSkillSync"] = {
  mode: "isolated",
  cache_count: 0,
};
const catchupOverride: AgentOverride = {
  lazy_environment: false,
  skill_sync: isolatedSkillSync,
};
void catchupOverride;
void sharedSkillSync;
const wrongIsolated: Schema["IsolatedSkillSync"] = {
  mode: "isolated",
  // @ts-expect-error Isolated caching does not take shared publication fields.
  overwrite: false,
};
const wrongShared: Schema["SharedSkillSync"] = {
  mode: "shared",
  // @ts-expect-error Shared publication does not take an isolated cache budget.
  cache_count: 1,
};
// @ts-expect-error Lazy environment mode is a native boolean or null override.
const wrongLazy: AgentOverride = { lazy_environment: "true" };
void wrongIsolated;
void wrongShared;
void wrongLazy;
const minimalSource: SessionStreamSchemas["MemorySource"] = {
  kind: "record",
  memory: "notes",
  status: "timeout",
};
const nullableSource: SessionStreamSchemas["MemorySource"] = {
  kind: "file",
  memory: "notes",
  status: "unchanged",
  cursor: null,
  memory_id: null,
};
void minimalSource;
void nullableSource;
const contentReference: Schema["ContentRef"] = {
  id: "content",
  size_bytes: 100,
  media_type: "application/json",
  preview: "{preview",
};
void contentReference;
const badContent: Schema["RunContent"] = {
  id: "content",
  // @ts-expect-error A saved JSON prefix uses text/plain, never an invented media type.
  media_type: "json-prefix",
  value: null,
};
void badContent;
async function catchupTypes(client: Client) {
  const analyst: ResourceResult<Schema["Agent"]> =
    await client.api.findingAgent();
  const analyses: ResourceResult<Schema["AnalysisPage"]> =
    await client.api.findingAnalyses.list();
  const analysis: ResourceResult<Schema["Analysis"]> =
    await client.api.findingAnalyses.create(
      { agent_id: null, presets: ["recovery"], max_traces: 1 },
      { idempotencyKey: "analysis" },
    );
  // @ts-expect-error Analysis submission requires an explicit native key.
  await client.api.findingAnalyses.create({ presets: ["answer"] });
  const finding: ResourceResult<Schema["Finding"]> =
    await client.api.findings.create({
      agent_id: "agent",
      agent_revision_id: "revision",
      title: "Title",
      category: "context_gap",
      explanation: "Evidence",
      suggestion: "Change",
      source_key: "key",
      evidence: [{ run_id: "run", trace_id: "1".repeat(32) }],
    });
  await client.api.findings
    .ref(finding.data.id)
    .update({ closed: false, assessment_note: null }, { ifMatch: "etag" });
  // @ts-expect-error Finding edits retain their ETag precondition.
  await client.api.findings.ref(finding.data.id).update({ closed: false });
  const content: ResourceResult<Schema["RunContent"]> = await client.api.runs
    .ref("run")
    .contents.ref(contentReference.id)
    .get();
  const authors: ResourceResult<Schema["MessageAuthors"]> =
    await client.api.sessions
      .ref("session")
      .messageAuthors.list({ query: { entry_id: ["entry"] } });
  const models: ResourceResult<Schema["ProviderModel"][]> =
    await client.api.modelProviders.ref("provider").models.get();
  void analyst;
  void analyses;
  void analysis;
  void content;
  void authors;
  void models;
  for await (const event of threadStream(
    (options) => client.api.threads.ref("thread").stream.get(options),
    new AbortController().signal,
  )) {
    if (event.frame.type === "delta") {
      const sources: SessionStreamSchemas["MemorySource"][] | null | undefined =
        event.frame.data.item?.memory_sources;
      void sources;
    }
  }
}
void catchupTypes;
const client: Client = createClient({
  baseUrl: "https://service.example.test",
  auth: { type: "bearer", token: "test" },
});
// @ts-expect-error The obsolete native resources entry has no compatibility alias.
void client.resources;
const nativeAgent = client.api.agents.ref("agt_one");
void nativeAgent.get;
// @ts-expect-error Native Agent references do not own authored workflow methods.
void nativeAgent.start;
// @ts-expect-error Authored Agent references do not own native management methods.
void client.agents.ref("agt_one").get;
const workspace = client.api;
const organization = client.api;
const message: Schema["MessagePayload"] = {
  content: [{ type: "text", text: "hello" }],
};
// @ts-expect-error Message content cannot be a plain string.
const invalidMessage: Schema["MessagePayload"] = { content: "hello" };
void invalidMessage;

export function pricingRuleTypes() {
  const absent: Schema["ModelPriceRule-Input"] = {
    rule_id: "default",
    prices: [],
  };
  const explicitNull: Schema["ModelPriceRule-Input"] = {
    ...absent,
    max_input_tokens: null,
    service_tier: null,
  };
  const selected: Schema["ModelPriceRule-Output"] = {
    rule_id: "default",
    prices: [{ price_key: "input_mtok", price: "1" }],
    max_input_tokens: 128_000,
    service_tier: "priority",
  };
  // @ts-expect-error Token thresholds are numeric, not strings.
  selected.max_input_tokens = "128000";
  // @ts-expect-error Service tiers are strings, not booleans.
  explicitNull.service_tier = true;
  return { absent, explicitNull, selected };
}

export async function memoryTypes() {
  const memory = workspace.memories.ref("mem_one");
  await workspace.memories.list({ query: { label: ["team:a", "scope:b"] } });
  const file: ResourceResult<Schema["MemoryFile"]> = await memory.files
    .ref("folder/note.md")
    .get();
  await memory.files
    .ref("folder/note.md")
    .replace(
      { content: "new" },
      { ifMatch: file.response.headers.get("ETag")! },
    );
  // @ts-expect-error File mutations require their ETag.
  await memory.files.ref("note.md").replace({ content: "new" });
  // @ts-expect-error Memory metadata mutations require the memory ETag.
  await memory.update({ guide: null });
  const restored: ResourceResult<Schema["MemoryFileState"]> =
    await memory.revisions.ref(1).restore();
  if (restored.data.file !== null) void restored.data.file.content;
  await memory.records.ref("r1").replace({ text: "record" });
  await memory.records.ref("r1").replace(
    { text: "record" },
    // @ts-expect-error Records have no ETags.
    { ifMatch: "etag" },
  );
  // @ts-expect-error Records have no individual GET endpoint.
  await memory.records.ref("r1").get();
  // @ts-expect-error Revisions cannot be created directly.
  await memory.revisions.create({});
  const mounts = workspace.threads.ref("thr_one").memories;
  // @ts-expect-error Mount changes require the Thread ETag.
  await mounts.create({ name: "notes", memory_id: "mem_one", access: "read" });
  await mounts.ref("notes").update({ recall: false }, { ifMatch: '"thr:2"' });
  await organization.memoryProviders.ref("prv_one").test();
  await client.api.auth.bootstrap({
    email: "owner@example.test",
    password: "test-only",
  });
}

export async function acceptedServiceTypes() {
  const submitted = await workspace.threads.create(
    { agent_id: "agent_example", payload: message },
    { idempotencyKey: "start" },
  );
  const thread = workspace.threads.ref(submitted.data.thread.id);
  const receipt: ResourceResult<Schema["Submitted"]> =
    await thread.inbox.create(
      { agent_id: "agent_example", payload: textPayload("Next") },
      { idempotencyKey: "submit" },
    );
  if (receipt.data.run !== null)
    await client.runs.ref(receipt.data.run.id).result({ timeoutMs: 1000 });
  for await (const event of threadStream(
    (options) => thread.stream.get(options),
    new AbortController().signal,
  )) {
    if (event.cursor) void event.frame;
    break;
  }
  await thread.inbox.list({ query: { status: ["pending"] } });
  await workspace.agents.ref("agent_example").revisions.list();
  await workspace.assets.list({ query: { limit: 10 } });
  await organization.models.list({ query: { limit: 10 } });
  const createdSubscription = await workspace.subscriptions.create({
    name: "alerts",
    url: "https://example.test/hook",
    kinds: ["run.completed"],
  });
  const signingSecret: string = createdSubscription.data.signing_secret;
  void signingSecret;
  await workspace.environments.create({ template_id: "template_example" });
  // @ts-expect-error Environment creation must match a managed or external target request.
  await workspace.environments.create({ arbitrary: true });
  // @ts-expect-error Assets have no PATCH operation.
  await workspace.assets.ref("asset_example").update({}, { ifMatch: '"v1"' });
  // @ts-expect-error Organizations have no collection POST operation.
  await client.api.organizations.create({ name: "not-supported" });
  await workspace.threads.list();
  // @ts-expect-error The obsolete scoped workspace business graph is not exported.
  void client.workspace;
  // @ts-expect-error There is no competing scoped raw HTTP client.
  void client.workspaceHttp;
  // @ts-expect-error Business paths are flat; no workspace path parameters exist.
  await workspace.threads.list({ params: { path: { workspace_id: "other" } } });
  await workspace.threads.create(
    // @ts-expect-error A new Thread requires the agent identity.
    { payload: message },
    { idempotencyKey: "invalid" },
  );
}

export async function fullResourceTypes() {
  const resources = client.api;
  const ws = resources;
  const provider = resources.memoryProviders.ref("provider");
  await provider.test();
  await resources.providerTypes.ref("memory").list();
  // @ts-expect-error Provider kinds are an enum, not arbitrary path strings.
  resources.providerTypes.ref("unknown");
  await ws.memories.list({ query: { label: ["a", "b"], limit: 20 } });
  // @ts-expect-error Filters retain exact wire types.
  await ws.memories.list({ query: { limit: "twenty" } });
  // @ts-expect-error Filters are generated, not a catch-all map.
  await ws.memories.list({ query: { nonexistent: true } });
  const memory = ws.memories.ref("memory");
  const revision = memory.revisions.ref(1);
  // @ts-expect-error Revision sequence selectors are numeric.
  memory.revisions.ref("1");
  const restored: ResourceResult<Schema["MemoryFileState"]> =
    await revision.restore();
  if (restored.data.file !== null) void restored.data.file.content;
  // @ts-expect-error Records have no item read endpoint.
  memory.records.ref("record").get();
  // @ts-expect-error Organizations cannot be created through this collection.
  resources.organizations.create({});
  // @ts-expect-error Required idempotency headers remain required.
  await ws.threads.create({ agent_id: "agent", payload: message });
  const submitted: ResourceResult<Schema["Submitted"]> =
    await ws.threads.create(
      { agent_id: "agent", payload: message },
      { idempotencyKey: "key" },
    );
  if (submitted.data.run !== null) void submitted.data.run.id;
  await resources.workspaces.ref("ws").icon.replace(new Blob(["png"]), {
    contentType: "image/png",
    ifMatch: '"v1"',
  });
  // @ts-expect-error Image uploads require an explicit supported media type.
  await resources.workspaces.ref("ws").icon.replace(new Blob(["png"]));
  await resources.workspaces
    .ref("ws")
    // @ts-expect-error Image bytes must not silently become JSON.
    .icon.replace("png", { contentType: "image/png", ifMatch: '"v1"' });
  await ws.uploads.create(
    { file: new Blob(["data"]) },
    { idempotencyKey: "upload" },
  );
  const content = await ws.assets.ref("asset").content.get();
  await content.close();
  await ws.threads.ref("thread").stream.get({ lastEventId: "1-0" });
  // @ts-expect-error Non-cursor collections do not invent pagination.
  ws.threads.ref("thread").memories.pages();
  await resources.healthz.get();
}

export async function importedHistoryAndAtomicResumeTypes() {
  const history: Schema["MessageHistory"] = [
    {
      kind: "request",
      parts: [{ part_kind: "user-prompt", content: "Earlier" }],
    },
    { kind: "response", parts: [{ part_kind: "text", content: "Answered" }] },
  ];
  const attachment: Schema["MessagePayload"] = {
    content: [
      { type: "text", text: "Review this" },
      { type: "asset", asset_id: "asset_one" },
    ],
  };
  const agent = client.agents.ref("agent");
  const started = await agent.start(attachment, {
    idempotencyKey: "import-once",
    messageHistory: history,
  });
  const readback = (await started.thread!.get()).data;
  // @ts-expect-error Imported history remains create input, not Thread readback.
  void readback.message_history;
  await workspace.threads.create(
    { agent_id: "agent", message_history: history, payload: attachment },
    { idempotencyKey: "native-import" },
  );
  await agent.send("thread", "Next", {
    idempotencyKey: "next",
    // @ts-expect-error The imported seed belongs to NewThread, not an inbox message.
    messageHistory: history,
  });
  const batch: Schema["Resume"] = {
    approvals: { approval_one: { action: "approve" } },
    calls: { call_one: { status: "returned", value: { reviewed: true } } },
    input: attachment,
  };
  await client.runs
    .ref("run")
    .resume(
      { approval_one: approve(), call_one: returned({ reviewed: true }) },
      { idempotencyKey: "atomic-resume", input: attachment },
    );
  await workspace.runs
    .ref("run")
    .resume(batch, { idempotencyKey: "native-resume" });
  await client.runs.ref("run").resume(
    // @ts-expect-error Each answer is a decision or call result, not a payload.
    { input: attachment },
    { idempotencyKey: "missing-results" },
  );
  await client.runs.ref("run").resume(
    {
      // @ts-expect-error A public answer must be constructed or structurally valid.
      call_one: "text",
    },
    { idempotencyKey: "wrong-input" },
  );
}

export async function semanticTypes() {
  const agent = workspace.agents.ref("agent");
  const thread = workspace.threads.ref("thread");
  const match = { ifMatch: '"v1"' };
  await agent.archive(match);
  await agent.revisions.create({ config: { model: "model" } }, match);
  await thread.archive(match);
  await thread.inbox.order.replace({ entry_ids: [] }, match);
  // @ts-expect-error Conditional actions require If-Match even when OpenAPI marks it optional.
  await agent.archive();
  // @ts-expect-error Required preconditions cannot be explicitly undefined.
  await agent.archive({ ifMatch: undefined });
  // @ts-expect-error Required preconditions cannot be null.
  await agent.archive({ ifMatch: null });
  // @ts-expect-error Revision creation is conditional on the head ETag.
  await agent.revisions.create({ config: { model: "model" } });
  // @ts-expect-error Thread archive is conditional.
  await thread.archive({});
  // @ts-expect-error Inbox order edits use the Thread ETag.
  await thread.inbox.order.replace({ entry_ids: [] });
  await workspace.workspaces
    .ref("ws_example")
    // @ts-expect-error Image updates also require the resource ETag.
    .icon.replace(new Blob(), { contentType: "image/png" });
  await workspace.memories.ref("memory").revisions.ref(1).restore();
  await workspace.memories.ref("memory").revisions.ref(1).restore(match);
  const run = workspace.runs.ref("run");
  const items: ResourceResult<Schema["RunItems"]> = await run.items.get();
  // @ts-expect-error Items no longer exports stream progress.
  void items.data.position;
  // @ts-expect-error RunItems is a snapshot, not a list or invented paginator.
  run.items.list();
  // @ts-expect-error RunItems does not paginate by a cursor.
  run.items.pages();
  const submitted = await workspace.threads.create(
    {
      agent_id: "agent",
      payload: textPayload("Hello"),
      memories: [{ name: "notes", memory_id: "memory", access: "read" }],
      environments: [],
      mcp_headers: {},
      session_id: null,
      options: { overrides: null },
    },
    { idempotencyKey: "full-body" },
  );
  if (submitted.data.run)
    await client.runs.ref(submitted.data.run.id).result({ timeoutMs: 1000 });
  for await (const event of threadStream(
    (options) => thread.stream.get(options),
    new AbortController().signal,
  )) {
    if (event.frame.type === "delta") {
      void event.frame.data.event;
      // @ts-expect-error Delta is not a changed signal.
      void event.frame.data.version;
    }
    if (event.cursor !== null) {
      const cursor: string = event.cursor;
      void cursor;
      void event.frame.data.sequence;
    }
    break;
  }
}

export async function streamCoverageTypes() {
  const config: Schema["ModelConfig-Input"] = {
    model_name: "native-model",
    model_api: "openai.responses",
    settings: {
      mode: "native",
      flag: false,
      budget: 4,
      nullable: null,
      nested: { values: [1, "two", null] },
    },
  };
  const output: Schema["ModelConfig-Output"] = config;
  // JsonValue follows the pinned schema's unconstrained value; settings remains a map.
  void output.settings;
  // @ts-expect-error Native model settings must be keyed settings, not a scalar.
  config.settings = "high";
  const display = (await client.runs.ref("run_one").items()).data;
  // @ts-expect-error Items reads cannot seed a Thread stream cursor.
  void display.resume_after;
  // @ts-expect-error Items no longer supplies a baseline marker.
  void display.baseline;
  const raw = await client.api.threads.ref("thread_one").stream.get({
    query: { run: "run_one", position: "1-5" },
    lastEventId: "1234-5",
  });
  await raw.close();
  for await (const event of threadStream(
    (options) => client.api.threads.ref("thread_one").stream.get(options),
    new AbortController().signal,
    { run: "run_one", position: "1-5", after: "1234-5" },
  )) {
    if (event.frame.type === "gap") {
      const target: string | null | undefined = event.frame.data.position;
      void target;
    }
    break;
  }
}

export async function nativeConfigurationAndProviderTypes() {
  const configuration: Schema["RunConfiguration-Input"] = {
    allowed_hosts: [],
    extensions: {
      "app.example/policy": {
        enabled: false,
        limit: 0,
        values: [null, {}, [], ""],
      },
    },
  };
  const output: Schema["RunConfiguration-Output"] = configuration;
  void output;
  const agent = client.agents.ref("agent_one");
  for (const options of [
    {},
    { configuration: null },
    { configuration: {} },
    { configuration },
    { configuration: { allowed_hosts: null } },
  ]) {
    const interaction = await agent.start(
      {
        content: [{ type: "url", url: "https://media.example.test/movie.mp4" }],
      },
      { idempotencyKey: "native", options },
    );
    interaction.close();
    (
      await agent.send("thread_one", "Next", {
        idempotencyKey: "native-send",
        delivery: "next_run",
        options,
      })
    ).close();
  }
  // @ts-expect-error Run configuration is nested inside native Run options, not a parallel SDK facade.
  await agent.start("No", { idempotencyKey: "wrong", configuration });
  // @ts-expect-error An empty host list is an array, never a truthy string coercion.
  configuration.allowed_hosts = "example.test";
  // @ts-expect-error Service owns known configuration keys; extensions hold consumer namespaces.
  configuration.unknown_policy = false;
  const model: Schema["ModelConfig-Input"] = {
    model_name: "native",
    model_api: "openai.responses",
    characteristics: {
      image_input: null,
      video_input: { max_video_bytes: 1048576 },
      url_input: { video: ["youtube"] },
    },
  };
  await client.api.models
    .ref("model_one")
    .update({ config: model }, { ifMatch: '"v1"' });
  // @ts-expect-error Native video URL capability retains the current enum, not arbitrary SDK media types.
  model.characteristics = { url_input: { video: ["direct"] } };
  const provider = client.api.modelProviders.ref("provider_one");
  const status: ResourceResult<Schema["AuthorizationStatus"]> =
    await provider.authorization.get();
  const started: ResourceResult<Schema["AuthorizationStart"]> =
    await provider.authorize({ new_registration: false });
  const method: "manual_callback" | "browser_callback" | undefined =
    started.data.method;
  void method;
  void status;
  await provider.authorization.callback({
    attempt_id: started.data.attempt_id,
    callback_url: "https://service.example.test/operator/callback?code=opaque",
  });
  const disconnected: ResourceResult<Schema["AuthorizationDisconnect"]> =
    await provider.authorization.delete();
  const models: ResourceResult<Schema["ProviderModel"][]> =
    await provider.models.get();
  void disconnected;
  void models;
  await provider.authorization.callback({
    attempt_id: "attempt",
    // @ts-expect-error Callback requires the full native callback URL, not an SDK-invented code field.
    code: "opaque",
  });
}

export async function pagedDisplayTypes() {
  const display = (
    await client.runs.ref("run_one").items({ query: { before: 20, limit: 10 } })
  ).data;
  await client.api.runs
    .ref("run_one")
    .items.get({ query: { after: 0, limit: 500 } });
  // @ts-expect-error Ordinal windows do not accept generic cursor collection paging.
  await client.runs.ref("run_one").items({ query: { cursor: "opaque" } });
  // @ts-expect-error Ordinals are numeric, not Redis IDs.
  await client.runs.ref("run_one").items({ query: { before: "1-2" } });
  // @ts-expect-error RunItems no longer reports dropped history.
  void display.dropped;
  const thread = (await client.threads.ref("thread_one").get()).data;
  const last: string | null = thread.last_run_id;
  void last;
  // @ts-expect-error Every sealed Run continues history; no successful head remains.
  void thread.head_run_id;
  const state: SessionStreamSchemas["DisplayContinuation"] = {
    run_id: "run_one",
    next_ordinal: 20,
    position: { attempt: 2, sequence: 19 },
    arguments: {
      at: "2026-10-06T00:00:00Z",
      event: null,
      key: "tool",
      sequence: 18,
      size: 0,
      stream: { native: [null, false] },
    },
    fragments: {
      pending: { fragment: { count: 2, parts: ["partial"], size: 7 } },
    },
    observer: {
      state: {
        children: {
          child: {
            children: {
              grandchild: {
                parts: {
                  cursor: {
                    kind: "tool_call",
                    part_id: "call",
                    tool_name: null,
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  void state;
  // @ts-expect-error Continuation belongs to Session items frames.
  void display.continuation;
  // @ts-expect-error Run readback no longer carries display progress.
  void display.run.display_position;
  // @ts-expect-error A continuation's semantic cut requires a native StreamPosition.
  state.position = "2-19";
  // @ts-expect-error Item ordinal is required even on a historical page.
  const incomplete: Schema["Item"] = {
    id: "item",
    kind: "text_message",
    state: "completed",
    content: {},
    first_stream_id: "1-1",
    last_stream_id: "1-1",
    started_at: "2026-10-06T00:00:00Z",
  };
  void incomplete;
}

export function requiredPagedFields(
  display: Omit<Schema["RunItems"], "complete">,
) {
  // @ts-expect-error Sealing remains explicit even on historical windows.
  const missingComplete: Schema["RunItems"] = display;
  void missingComplete;
  const ref: import("../src/index.js").ThreadStreamFrame = {
    type: "delta",
    data: {
      run_id: "run",
      attempt: 1,
      sequence: 1,
      event: { type: "CUSTOM", subagentRunId: "child" },
      item: {
        id: "item",
        kind: "observation",
        state: "failed",
        ordinal: null,
        response_group: null,
        failure: { nested: [null, false, {}] },
      },
    },
  };
  void ref;
}

/** Ordinary consumers never import generated components to choose an uncommon workflow field. */
export async function publicWorkflowTypes() {
  const configuration: RunConfiguration = {
    allowed_hosts: [],
    extensions: { native: { values: [null, false, 0, "", {}, []] } },
  };
  const overrides: AgentOverride = {
    instructions: "Run only",
    model: null,
    model_settings: { uncommon: { value: 0 } },
    model_characteristics: null,
    media_understanding: null,
    output_spec: null,
    client_tools: [],
    connection_tools: [],
    plugins: [],
    retries: null,
    reviewer: null,
    skills: [],
    subagents: { optional_child: null },
    toolsets: {},
  };
  const options: RunOptions = {
    configuration,
    overrides,
    labels: { purpose: "test" },
    max_usage: { requests: 3 },
  };
  const messageHistory: MessageHistory = [
    { kind: "response", parts: [{ part_kind: "text", content: "seed" }] },
  ];
  const agent = client.agents.ref("agent");
  const interaction = await agent.start(
    [
      "Hi",
      text(""),
      json({ n: 0 }),
      url("https://example.test/a"),
      asset("asset"),
    ],
    {
      options,
      messageHistory,
      sessionId: null,
      agentRevisionId: null,
      memories: [],
      environments: [],
      mcpHeaders: {},
    },
  );
  const result = await interaction.result();
  const output: unknown = result.output;
  const previewText: string | undefined = result.text;
  const status: import("../src/index.js").RunStatus = result.status;
  const pending: import("../src/index.js").PendingCall[] = result.pendingCalls;
  const failure: import("../src/index.js").Failure | null = result.failure;
  void output;
  void previewText;
  void status;
  void pending;
  void failure;
  const resumed = await result.run.resume(
    {
      allowed: approve(),
      denied: deny(null),
      external: returned(null),
      failure: failed("unanswered"),
    },
    { input: ["Follow up", asset("asset")] },
  );
  const authoritative = await resumed.result();
  void authoritative.runId;
  await resumed.close();
  const recovered = client.threads
    .ref(result.threadId)
    .entry("entry")
    .interaction({ timeoutMs: 1000 });
  void recovered.receipt;
  for await (const chunk of recovered.textStream()) {
    const value: string = chunk;
    void value;
    break;
  }
  await recovered.close();
  await interaction.close();
  const exact = client.runs.ref(result.runId).observe();
  await exact.close();
  // @ts-expect-error Removed authored wait does not create a competing polling API.
  await result.run.wait();
  // @ts-expect-error No generic output assertion exists on Agent binding.
  client.agents.ref<{ promised: true }>("agent");
  // @ts-expect-error Returned requires an explicit JSON value; null is valid, omission is not.
  returned();
  // @ts-expect-error Top-level wire selector names are not a duplicate public submission shape.
  await agent.start("No", { agent_revision_id: null });
  // @ts-expect-error Grouped options cannot be flattened into an override alias.
  await agent.start("No", { overrides });
}

export async function sessionFrameTypes() {
  const native = await client.api.sessions.ref("session_one").stream.get();
  for await (const frame of sessionStream(native)) {
    if (frame.type === "thread") {
      const threadId: string = frame.data.thread.id;
      void threadId;
      void frame.data.current_run;
      void frame.data.entries;
      // @ts-expect-error Session thread data is not a delta.
      void frame.data.event;
    } else if (frame.type === "items") {
      const continuation: SessionStreamSchemas["DisplayContinuation"] | null =
        frame.data.continuation;
      void continuation;
      void frame.data.first;
      void frame.data.complete;
      // @ts-expect-error Session continuation is not a Redis cursor.
      const cursor: string = frame.data.continuation;
      void cursor;
    } else if (frame.type === "delta") {
      void frame.data.event;
      void frame.data.thread_id;
      void frame.data.item;
      // @ts-expect-error Session deltas have no SSE cursor field.
      void frame.cursor;
    } else if (frame.type === "gap") {
      const type: "gap" = frame.type;
      void type;
      void frame.data.thread_id;
      // @ts-expect-error Session gap is distinct from Thread gap.
      void frame.data.position;
    }
  }
  const gap: SessionStreamFrame = {
    type: "gap",
    data: { thread_id: "thread", run_id: "run" },
  };
  void gap;
  await client.api.sessions.ref("session_one").stream.get({
    // @ts-expect-error Session has no Last-Event-ID resume semantics.
    lastEventId: "1-0",
  });
  await client.api.sessions.ref("session_one").stream.get({
    // @ts-expect-error Session has no run/position query.
    query: { run: "run", position: "1-0" },
  });
}
