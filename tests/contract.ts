import {
  createClient,
  type Client,
  type components,
  type ResourceResult,
  textPayload,
} from "../src/index.js";
import { threadStream } from "../src/streams/thread-stream.js";

type Schema = components["schemas"];
const client: Client = createClient({
  baseUrl: "https://service.example.test",
  auth: { type: "bearer", token: "test" },
});
const workspace = client.resources;
const organization = client.resources;
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
  await client.resources.auth.bootstrap({
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
    await client.runs.ref(receipt.data.run.id).wait({ timeoutMs: 1000 });
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
  await client.resources.organizations.create({ name: "not-supported" });
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
  const resources = client.resources;
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
    message_history: history,
  });
  const readback: Schema["MessageHistory"] = (await started.thread.get()).data
    .message_history;
  void readback;
  await workspace.threads.create(
    { agent_id: "agent", message_history: history, payload: attachment },
    { idempotencyKey: "native-import" },
  );
  await agent.send("thread", "Next", {
    idempotencyKey: "next",
    // @ts-expect-error The imported seed belongs to NewThread, not an inbox message.
    message_history: history,
  });
  const batch: Schema["Resume"] = {
    approvals: { approval_one: { action: "approve" } },
    calls: { call_one: { status: "returned", value: { reviewed: true } } },
    input: attachment,
  };
  await client.runs
    .ref("run")
    .resume(batch, { idempotencyKey: "atomic-resume" });
  await workspace.runs
    .ref("run")
    .resume(batch, { idempotencyKey: "native-resume" });
  await client.runs.ref("run").resume(
    // @ts-expect-error Both result maps are required by the wire request.
    { input: attachment },
    { idempotencyKey: "missing-results" },
  );
  await client.runs.ref("run").resume(
    {
      approvals: {},
      calls: {},
      // @ts-expect-error Resume input uses a full message payload, not a plain string.
      input: "text",
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
    await client.runs.ref(submitted.data.run.id).wait({ timeoutMs: 1000 });
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
  const hint: string | null | undefined = display.resume_after;
  void hint;
  const raw = await client.resources.threads.ref("thread_one").stream.get({
    query: { run: "run_one", position: display.position },
    ...(display.resume_after ? { lastEventId: display.resume_after } : {}),
  });
  await raw.close();
  for await (const event of threadStream(
    (options) => client.resources.threads.ref("thread_one").stream.get(options),
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
