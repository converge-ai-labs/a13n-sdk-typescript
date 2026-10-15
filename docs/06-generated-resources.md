# Manage resources with ETags and pages

The Agent workflow handles ordinary conversations; `client.api` exposes the complete typed Service API for administration, files, providers and specialized actions. Business collections such as `agents`, `threads`, `models` and `memories` live directly under `client.api`. `client.api.agents.ref(id)` manages a stored Agent; `client.agents.ref(id)` runs the authored workflow using the same authentication and lifetime. Replace obsolete `client.resources` access with `client.api`; no compatibility alias is provided. `workspaces.ref(id)` and `organizations.ref(id)` manage those entities specifically—they do not wrap every business request. Each call still needs suitable Service grants.

## Create an Agent

Obtain an enabled **Model key** and Agent-creation permission from your administrator or Console. An Agent is subsequently addressed by **ID**. This example creates an Agent, reads its ETag, conditionally renames it, then reads one page of Agents:

```js
import { randomUUID } from "node:crypto";
import { createClient } from "@converge.ai/a13n";

if (!process.env.A13N_MODEL_KEY)
  throw new Error("Set an enabled A13N_MODEL_KEY.");
const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
try {
  const created = await client.api.agents.create({
    name: `Reviewer ${randomUUID()}`,
    config: {
      model: process.env.A13N_MODEL_KEY,
      instructions: "Review clearly.",
    },
  });
  const agent = client.api.agents.ref(created.data.id);
  const current = await agent.get();
  const ifMatch = current.response.headers.get("ETag");
  if (!ifMatch) throw new Error("Agent read did not include an ETag.");
  const updated = await agent.update({ name: "Reviewer II" }, { ifMatch });
  console.log("Agent ID:", updated.data.id, "HTTP:", updated.response.status);

  for await (const page of client.api.agents.pages({
    query: { limit: 10 },
  })) {
    console.log(
      "Agent IDs:",
      page.data.items.map((item) => item.id),
    );
    break; // Remove this line to visit every page.
  }
} finally {
  client.close();
}
```

Run it with `A13N_SERVICE_URL`, `A13N_API_TOKEN` and `A13N_MODEL_KEY`; it creates a real Agent. A successful update returns an Agent representation and HTTP metadata; pages retain their response metadata and cursor, while `.items()` would flatten item records. Agent/Skill references use IDs, but `config.model` uses a Model **key**. Persist the Agent ID if you want to run it with [Agent.start](01-setup-and-conversations.md). Use a disposable workspace for examples that create resources.

Conditional writes need the **ETag of the object being changed**. A stale precondition raises HTTP `412`; read the current state and reconcile, rather than automatically overwriting another writer. Memory files use file ETags; Thread inbox and mount changes use the Thread ETag. File Memory revisions use integer sequence selectors, and restoring a creation can return `file: null`. See [files and Memory](04-files-and-memory.md).

JSON calls return `{data,response}` for status, headers and request IDs. Binary downloads and raw SSE calls instead own an unbuffered `{body,response,close()}`: consume or close it in `finally`. For example, `client.api.assets.ref(assetId).content.get()` returns a body you can stream without buffering the entire file. The raw Thread-wide stream at `threads.ref(threadId).stream.get({lastEventId,signal})` is lower-level than [finite Agent streaming](02-streaming-and-readback.md); the caller owns cursor application and committed readback.

Generated request bodies retain wire names and omission-versus-null behavior. For native `options.configuration`, see the [Run configuration snapshot](01-setup-and-conversations.md#select-a-native-run-configuration-snapshot); it is separate from the [instructions override](01-setup-and-conversations.md#limit-a-configuration-change-to-one-run) and from editing a stored Agent revision. The SDK does not infer provider policy from submitted options. The [pinned OpenAPI](../openapi.json) and [SDK specification](../spec/README.md) describe the remaining specialized routes. The removed Service secret resource is not available, although provider credentials and authentication still exist.

## Keep native provider policy on Service

Model and Agent `settings`/`model_settings` retain authored JSON. Omitted cache settings stay omitted on the wire so Service can apply its defaults; explicit `cache:false` and provider-specific cache policy keys pass through unchanged. Service owns prompt-cache defaults and marker placement, and a successful request does not guarantee a cache hit.

For an E2B environment, native `{desktop:true}` enables the provider's desktop lifecycle; leaving `template` omitted lets Service select its default. Explicit templates remain authored choices. The SDK forwards configuration and calls existing Computer operations without initializing desktops or retrying uncertain native input. EIP device system information belongs to the envd protocol, not a new Service SDK operation or a client-inferred capability.

Agent memory tools track observed file versions and absence on the server. A stale dependency can produce a `read_conflict` tool result requiring reread and reconsideration. Public management file calls keep their existing target ETag preconditions; the SDK adds no observation-dependency tracker or automatic rewrite/retry.

## Model Provider authorization and account-specific discovery

The native generated provider reference exposes all five authorization/discovery operations:

```js
const provider = client.api.modelProviders.ref(providerId);
const status = await provider.authorization.get();
console.log(
  "Authorization state:",
  status.data.state,
  "pending:",
  status.data.pending,
);
// For an already authorized account, discovery is a native array, not a page.
if (status.data.state === "connected") {
  const models = await provider.models.get();
  console.log(models.data.map((model) => model.display_name));
}
```

This fragment uses the already configured client and a Model Provider ID selected by the application. `providerTypes.ref("model").list()` exposes nullable `oauth_scheme` metadata (ChatGPT providers use `openai-chatgpt`); discovery requires `run`, status requires `read`, and authorization changes require `write`. Model Provider authorization is workspace-shared state, not a personal Connection or an Agent setting.

After an explicit human decision to authorize, call `provider.authorize({new_registration:false})` and follow the returned `{attempt_id,authorization_url,expires_at,method}`. `manual_callback` asks the human to supply the **complete** callback URL; send it as `provider.authorization.callback({attempt_id,callback_url})`. `browser_callback` uses the hosted Service flow and its secure flow cookie; initiate it through an unconfined user login with workspace selection and CSRF protection, not a workspace API key. The SDK preserves Service refusals and never retries these POSTs. For browser setup see [sessions and CSRF](05-browser-sessions.md).

Do not hardcode a callback origin, loopback port, client ID or issuer endpoints in SDK code. Operator settings and provider overrides own registration/callback configuration; use the method returned by Service. The SDK does not open an OAuth browser, exchange tokens, store credentials, or complete authorization automatically. Keep callback URLs, codes, state values and secrets out of logs and documents. `new_registration:true` clears retained account binding but does not replace an explicitly configured client. An explicit `provider.authorization.delete()` disconnects and returns `local_tokens_cleared` plus nullable `revocation_confirmed`; local clearing and remote revocation are separate facts. Do not call authorize/disconnect merely to test resource navigation.

## Discover deployment-selected providers and MCP connections

Provider types are deployment-selected metadata, not an SDK-owned exhaustive list. Use `client.api.providerTypes.ref("model").list()` to discover supported model APIs and `client.api.connectorProviders.list()` for connection metadata. Model `config.model_api` remains a native string; additions such as Vercel, Cerebras, SambaNova or xAI do not require a new SDK enum or a separate provider client. Follow the returned schemas and available capabilities rather than treating these examples as the complete list.

MCP-backed tools are exposed through native Connections and Service discovery/configuration. The SDK forwards their generated configuration and frozen Thread headers; it does not create its own MCP transport, perform issuer discovery or interpret provider credentials.

## Findings and analyses

Findings retain diagnostic evidence, assessment and closure independently of Run execution. Native operations use the existing generated graph:

```js
for await (const page of client.api.findings.pages({
  query: { agent_id: agentId, closed: false },
})) {
  console.log(page.data.items);
}
const analyst = await client.api.findingAgent();
const analysis = await client.api.findingAnalyses.create(
  { agent_id: agentId, presets: ["execution"], max_traces: 10 },
  { idempotencyKey: analysisKey },
);
console.log(analyst.data.preset_kind, analysis.data.run_id);
const finding = client.api.findings.ref(findingId);
const current = await finding.get();
const ifMatch = current.response.headers.get("ETag");
if (!ifMatch) throw new Error("Finding read did not include an ETag.");
await finding.update({ assessment: "confirmed", closed: false }, { ifMatch });
```

This fragment needs a configured client, authorized Agent/Finding IDs and a persisted `analysisKey`; it creates a real analysis Run and changes the Finding. `findingAgent()` has no request body. `findingAnalyses.list()` reads analysis history; creation requires an explicit key and retains 201 creation versus 200 replay. The SDK never retries either mutation. `findings.create(body)` accepts the complete generated diagnostic shape, including trace evidence; Service owns selection, authorization and evidence validation. A Finding's ETag governs assessment updates.

## Read saved Run content and exact message authors

Display `Item.content_refs` contains previews and native content metadata. Read saved content explicitly under the owning Run's authority:

```js
const saved = await client.api.runs.ref(runId).contents.ref(contentId).get();
console.log(saved.data.media_type, saved.data.truncated, saved.data.value);
const authors = await client.api.sessions.ref(sessionId).messageAuthors.list({
  query: { entry_id: [entryId] },
});
console.log(authors.data.items);
```

Use IDs selected from authorized readback. Content is immutable; `application/json` values remain native JSON and `text/plain` values remain strings. Service retains values larger than the 32 KiB inline limit behind bounded 4 KiB previews, with a 16 MiB saved-value cap. Oversized JSON becomes a truncated `text/plain` prefix, not a complete JSON value. Follow `media_type` and `truncated`, including when explicitly loading a saved value. Neither finite observation nor `textStream()` expands references automatically.

Message-author lookup requires 1–100 Entry IDs as the repeated native `entry_id` query; it is a specialized query, not cursor pagination. Nullable principal details preserve inaccessible/deleted identity evidence. `ProviderModel` replaces the retired `ChatGPTModel`; discovery preserves `slug`, `display_name` and nullable characteristics. Use provider-type `supports_model_discovery` and Tool/Toolset descriptions from deployment metadata; the generated Toolset keys include `traces` and `findings`.

## Read executed configuration and request metrics

Use the exact Run ID to read the Agent it executes, its attempts and usage:

```js
const run = client.api.runs.ref(runId);
const executed = await run.agent.get();
console.log(executed.data.revision.id, executed.data.config.instructions);
const attempts = await run.attempts.list();
if (attempts.data.items.length) {
  const attempt = await run.attempts.ref(attempts.data.items[0].id).get();
  console.log(attempt.data.status);
}
const listed = await client.api.runs.list({ query: { thread_id: threadId } });
const usage = await client.api.usage.get({ query: { run_id: runId } });
console.log(listed.data.items, usage.data.models, usage.data.runs);
const metrics = await client.api.usage.records.ref(recordId).metrics.get();
console.log(metrics.data.time_to_first_chunk_seconds);
```

The fragment requires authorized Run, Thread and model-request record IDs. `RunAgent.revision` is pinned; `config` applies that Run's frozen override to the revision. Read it rather than the editable Agent head. Referenced Models, Connections and templates remain live dependencies. Run `options.configuration` is the separately accepted request configuration, not resolved Harness options. Metrics preserve unavailable values as null and valid zero values as zero; the SDK derives no substitute timings from SSE. Usage includes both model totals and per-Run breakdowns.

Catalog filtering is exact and the Model ID is case-sensitive:

```js
const catalog = await client.api.modelCatalog.list({
  query: { provider: "openrouter", model: "Provider/ExactCase" },
});
console.log(catalog.data.items, catalog.data.status);
```

The filters combine with AND; an empty match retains catalog status. This is a specialized collection read, with no cursor pagination. Gateway credential exchange and provider private configuration remain Service-owned.

## Opt into Computer actions and download retained images

Computer use requires the Agent's `computer` toolset, an explicit mount permission ceiling and a capable, ready provider. Omitted ceilings retain ordinary file/execution defaults and grant no Computer actions. An empty operation list grants none; operation names are exact native values. This fragment replaces a mount ceiling for future Runs using the current **Thread** ETag, then explicitly probes its Environment:

```js
await client.api.threads
  .ref(threadId)
  .environments.ref("desk")
  .update(
    { permission_ceiling: { operations: ["environment.computer.observe"] } },
    { ifMatch: threadETag },
  );
const check = await client.api.environments.ref(environmentId).computer.check();
console.log(check.data.status, check.data.operations);
```

Select authorized IDs and a current Thread ETag. The probe returns native `checked`, `unsupported` or `not_ready` results; it neither starts the Environment nor grants permission. Existing accepted Run mounts keep their frozen ceiling. Environment Provider `references.get()` reports native dependent resources; conditional provider deletion uses that Provider's ETag.

Computer screenshot events carry `a13n.tool_images` references with image ID, media type and size, including child Run attribution and an `unavailable` flag. Download a retained reference explicitly from its owning Run:

```js
const image = await client.api.runs.ref(runId).images.ref(imageId).get();
try {
  console.log(image.response.headers.get("Content-Type"));
  const bytes = new Uint8Array(await new Response(image.body).arrayBuffer());
  console.log(bytes.byteLength);
} finally {
  await image.close();
}
```

This bounded example buffers one image; stream large bodies to a destination instead. The response is an unbuffered `BinaryResult` for PNG or JPEG bytes with native metadata and ordinary `ApiError` failures. Image references are separate from Assets, saved `/contents`, and public URLs. A streamed reference can precede committed display publication and temporarily return 404. Read committed Items for durable references and handle that result explicitly; an image read failure never replays the Computer action. Client close/abort ends local download ownership without affecting remote execution.
