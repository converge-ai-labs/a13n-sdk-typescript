# TypeScript SDK application guide

Start with the [five-minute result-only example](../README.md#ask-your-agent). The examples below assume you have its `client` and `agent` inside the same `try` block, and that you import `randomUUID` from `node:crypto`. Copy only the sections your application needs.

- [Create an Agent](#create-an-agent)
- [Structured input and Memory](#structured-input-and-memory)
- [Streaming and committed output](#streaming-and-committed-output)
- [Waiting and resuming](#waiting-and-resuming)
- [Browser sessions](#browser-sessions)
- [Generated resources](#generated-resources)
- [Timeouts and recovery](#timeouts-and-recovery)

## Create an Agent

If you already have an Agent ID, skip this section. To create one, first ask your administrator for an enabled **Model key** and permission to create Agents:

```js
const created = await client.resources.agents.create({
  name: "Reviewer",
  config: {
    model: "your-model-key",
    instructions: "Review changes clearly and briefly.",
  },
});
const reviewer = client.agents.ref(created.data.id);
const review = await reviewer.start("Review this change.", {
  idempotencyKey: randomUUID(),
});
console.log((await review.result()).status);
```

Use a Model **key** in Agent configuration, but an Agent **ID** with `client.agents.ref`. Skills also use IDs. Creation returns `{data,response}`; save the Agent ID from `created.data.id` for later use.

## Structured input and Memory

A message can contain more than one part. For example, upload a small file and include its Asset ID alongside text:

```js
const upload = await client.resources.uploads.create(
  { file: new Blob(["The report is ready."], { type: "text/plain" }) },
  { idempotencyKey: randomUUID() },
);
const asset = await client.resources.assets.create({
  upload_id: upload.data.upload_id,
  name: "report.txt",
});
const withFile = await agent.start(
  {
    content: [
      { type: "text", text: "Summarize this report." },
      { type: "asset", asset_id: asset.data.id },
    ],
  },
  { idempotencyKey: randomUUID() },
);
console.log((await withFile.result()).status);
```

To make stored notes available to a new interaction, create a file Memory and mount it by **ID**:

```js
const memory = await client.resources.memories.create({
  name: `Project notes ${randomUUID()}`,
});
await client.resources.memories.ref(memory.data.id).files.create({
  path: "context.md",
  content: "The project uses TypeScript.",
});
const withMemory = await agent.start("Which language does this project use?", {
  idempotencyKey: randomUUID(),
  memories: [{ name: "notes", memory_id: memory.data.id, access: "read" }],
});
console.log((await withMemory.result()).status);
```

Agent defaults, per-run options, environments and MCP headers are available through typed `start`/`send` options. For example, `options: {overrides: {model_settings: {extra_body: {}, extra_headers: {}}}}` explicitly clears those inherited request maps; the SDK forwards settings rather than deriving provider policy. See the [generated request types](../src/schema.ts) for additional fields.

## Streaming and committed output

Use `for await (const event of interaction)` on a **new** interaction to receive updates, then `await interaction.result()` for its final status and output. The [copyable example](../README.md#watch-output-as-it-arrives) shows both calls on the same object. `delta` events contain protocol data, not a guaranteed plain-text transcript. If you see `gap` or `reset`, reconcile from committed Items after the interaction ends:

```js
const outcome = await interaction.result();
const committed = await outcome.run.items();
console.log(outcome.status, committed.data.items);
```

The iterator stops when its Run finishes or waits, even on an idle connection. It does not yield another Run's updates. Retained events can replay when you attach, but trimming and gaps mean this is not a complete history. Break or `interaction.close()` to **cancel local observation**; an unfinished `result()` then rejects rather than restarting. Neither action interrupts remote execution. Use `outcome.run.interrupt()` only when you intend that separate remote mutation.

## Waiting and resuming

A waiting result needs application or human action. Do not treat it as completed or assume another queued message has run. For a client-tool request, handle the requested tool locally, then explicitly supply its answer:

```js
const outcome = await interaction.result();
if (outcome.status === "waiting") {
  const call = outcome.pending?.items.find(
    (item) => item.kind === "client_tool",
  );
  if (call) {
    // Perform and authorize the requested tool action in your application first.
    const successor = await outcome.run.resume(
      {
        answers: [
          {
            tool_call_id: call.tool_call_id,
            action: "complete",
            result: { reviewed: true },
          },
        ],
      },
      { idempotencyKey: randomUUID() },
    );
    console.log((await successor.wait()).status);
  }
}
```

The example answer is only appropriate if that tool actually returned `{reviewed:true}`. A waiting human approval requires a separate decision; the SDK never approves automatically. `resume` returns a **new** Run handle, while the original result remains attached to its original Run.

## Browser sessions

Do not put a workspace API key in browser JavaScript. Use your application's same-origin Service session instead. After login, select a workspace ID and restore the CSRF token before protected writes:

```js
import { createClient } from "@converge.ai/a13n";

async function askFromBrowser({ email, password, workspaceId, agentId }) {
  const client = createClient({
    baseUrl: location.origin,
    auth: { type: "session", workspaceId },
  });
  try {
    const login = await client.resources.auth.login({ email, password });
    client.setCsrfToken(login.data.csrf_token);
    const interaction = await client.agents.ref(agentId).start("Hello", {
      idempotencyKey: crypto.randomUUID(),
    });
    return (await interaction.result()).status;
  } finally {
    client.close();
  }
}
```

Pass your login form's `email` and `password` and the selected workspace/Agent IDs to `askFromBrowser`; do not hardcode credentials. Session calls use same-origin cookies. `client.setWorkspaceId(id)` changes the selected workspace; the SDK sends `X-Workspace-ID` only to operations that declare workspace scope, and refuses a conflicting explicit scope. Public and organization-admin routes are not silently scoped. A Node.js session client does not create a browser cookie jar for you.

## Generated resources

Use `client.resources` for management operations, paging, files and specialized routes not covered by the Agent workflow. For example, update an Agent with its current ETag:

```js
const current = await client.resources.agents.ref(agent.id).get();
await client.resources.agents
  .ref(agent.id)
  .update(
    { name: "Reviewer II" },
    { ifMatch: current.response.headers.get("ETag") },
  );
```

Business collections live directly under `client.resources`; explicit `workspaces.ref(id)` and `organizations.ref(id)` manage those entities rather than nesting every business request. `list()` fetches one page, `pages()` retains page responses, and `items()` flattens cursor collections. JSON calls return `{data,response}` so you can inspect status, ETag and request IDs. Close unconsumed binary downloads and raw SSE bodies in `finally`. The low-level `threads.ref(id).stream.get({lastEventId,signal})` is a raw **Thread-wide** SSE response, not a second high-level conversation stream. All generated routes share the same authentication and transport as Agent interactions.

Memory file edits use the **file** ETag; Thread inbox and Memory mount edits use the **Thread** ETag. Memory revisions use numeric selectors and restoration can return `file:null`. Provider records support search/replace/delete but not item GET or PATCH. The retired Service secret resource does not exist; supported provider credentials and authentication still do.

## Timeouts and recovery

`interaction.result({timeoutMs, pollIntervalMs, signal})` has a default 300-second **local** deadline and 500-ms polling. Pass observation options on its **first** `result()` call; iteration starts observation with defaults if called first. A result-only call opens no SSE. `WaitTimeoutError` or caller abort stops waiting but does not roll back the submitted message; `client.close()` likewise does not interrupt execution. `SubmissionDispositionError` means this input failed or was withdrawn before incorporation. `ApiError` carries HTTP status, code, details and request ID.

Save each logical request's idempotency key, input and returned Thread/Entry IDs. If the network fails after submission, do not assume it was rejected; read Service state or replay with the **same** key and body. A new key may create a second message. An Entry can briefly be assigned to a Run and return to pending; `result()` waits for actual consumption, then observes only the incorporating Run. A waiting Run does not automatically approve queued messages. For committed display, read `outcome.run.items()`; stream frames alone do not establish success.

The [SDK specification](../spec/README.md) and [pinned OpenAPI](../openapi.json) own the detailed wire contract. Local tests and package checks do not prove compatibility with a deployed Service or external provider; the opt-in HTTPS/browser acceptance is documented in [CONTRIBUTING.md](../CONTRIBUTING.md).
