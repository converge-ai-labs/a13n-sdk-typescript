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
  if (display.baseline && display.position !== null) {
    const raw = await client.resources.threads.ref("thread_one").stream.get({
      query: { run: "run_one", position: display.position },
      ...(display.resume_after ? { lastEventId: display.resume_after } : {}),
    });
    await raw.close();
  }
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
  await client.resources.models
    .ref("model_one")
    .update({ config: model }, { ifMatch: '"v1"' });
  // @ts-expect-error Native video URL capability retains the current enum, not arbitrary SDK media types.
  model.characteristics = { url_input: { video: ["direct"] } };
  const provider = client.resources.modelProviders.ref("provider_one");
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
  const models: ResourceResult<Schema["ChatGPTModel"][]> =
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
  await client.resources.runs
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
  const state: Schema["DisplayContinuation"] = {
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
  const continuation: Schema["DisplayContinuation"] | null | undefined =
    display.continuation;
  void continuation;
  void state;
  const position: string | null | undefined = display.run.display_position;
  void position;
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
  display: Omit<Schema["RunItems"], "baseline">,
) {
  // @ts-expect-error Baseline is required, including on sealed historical windows.
  const missingBaseline: Schema["RunItems"] = display;
  void missingBaseline;
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
