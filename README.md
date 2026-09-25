# @converge.ai/a13n

TypeScript SDK for a13n Service: complete generated resource bindings and HTTP types, scoped interaction conveniences, Thread SSE and explicit transport authentication. ESM for Node.js 22.14+ and browser same-origin sessions.

```bash
npm install @converge.ai/a13n
```

## Client and authentication

```ts
import { createClient } from "@converge.ai/a13n";

const client = createClient({
  baseUrl: "https://agents.example.com",
  auth: { type: "bearer", token: process.env.A13N_API_KEY! },
});
```

Bearer tokens may be strings or async callbacks. In a same-origin browser use `{type:"session"}`, restore the CSRF token from the Service login/session response, then call `client.setCsrfToken(token)` before protected mutations. The SDK sends `X-CSRF-Token`; it does not use an ambient workspace header or fetch credentials on its own. `close()` aborts local work, not execution on Service.

## Start and observe

```ts
const workspace = client.workspaces.ref("ws_1234567890abcdef");
const receipt = await workspace.threads.create(
  {
    agent_id: "agent_1234567890abcdef",
    payload: { content: [{ type: "text", text: "Review this change" }] },
  },
  { idempotencyKey: crypto.randomUUID() },
);
const { thread, entry, run } = receipt.data;
// entry always exists; run is null when the submission remains queued.
if (run) {
  const current = await workspace.runs.ref(run.id).get();
  const items = await workspace.runs.ref(run.id).items();
  console.log(current.data.status, items.data.items);
}
const next = await workspace.threads.ref(thread.id).submit("Continue", {
  idempotencyKey: crypto.randomUUID(),
  body: { agent_id: "agent_1234567890abcdef" },
});
console.log(entry.id, next.data.run?.id ?? "pending");
```

The same calls work through `workspace.agents.ref(agentId).start("prompt", {idempotencyKey})`. Agent IDs are bound locally; an Agent key is not silently resolved for a submission. A creation returns HTTP 201, while replay of the same idempotent request returns 200. Preserve the key and the response; mutations are not automatically retried after unknown outcomes.

```ts
const stream = workspace.threads
  .ref(thread.id)
  .stream({ after: lastAppliedCursor });
for await (const event of stream) {
  if (event.cursor) {
    await applyOutput(event.frame);
    await saveCursor(event.cursor); // Only after applying it.
  } else {
    await reconcileThreadAndRuns(); // changed, reset or gap signal.
  }
}
```

The stream is a live observation, not a durable Run terminal signal. `run.items()` supplies committed display state; a gap requires explicit readback. An abort, iterator return or `client.close()` does not interrupt the remote Run.

## Complete resources and typed HTTP

`client.resources` is the complete, statically generated resource tree. Every pinned operation has a normal typed method; no URL strings or generic action dispatcher are needed. Literal route segments become camelCase properties, selectors use local `.ref(value)`, and leaf POST actions become named methods. Methods use `get`/`list`, `create`, `update`, `replace` and `delete` for their actual HTTP verbs. For example:

```ts
const resources = client.resources;
const ws = resources.workspaces.ref("ws_1234567890abcdef");
const org = resources.organizations.ref("org_1234567890abcdef");
await resources.healthz.get();
await org.memoryProviders.ref("prv_1234567890abcdef").test();
for await (const memory of ws.memories.items({
  query: { label: ["team:docs"] },
})) {
  console.log(memory.id);
}
const upload = await ws.uploads.create(
  { file: new Blob(["hello"], { type: "text/plain" }) },
  { idempotencyKey: crypto.randomUUID() },
);
console.log(upload.data.upload_id, upload.response.status);
const download = await ws.assets.ref("asset_1234567890abcdef").content.get();
try {
  await consumeBytes(download.body);
} finally {
  await download.close();
}
```

Generated options place typed wire filters under `query`; headers use `ifMatch`, `idempotencyKey` and `lastEventId`. Bodies keep the generated wire shape, including omission versus null. Image uploads require a `Blob` or byte stream and an explicit supported `contentType` (`image/jpeg`, `image/png` or `image/webp`); multipart uploads use `{file: Blob}`. JSON operations return `{data,response}`; binary downloads and raw SSE return an owned `{body,response,close()}` without buffering. Use `client.streamThread(...)` or the existing `thread.stream(...)` convenience for decoded SSE with cursor/reconnect semantics, rather than the one-response `resources...stream.get({lastEventId})` method.

`pages({query})` and `items({query})` exist only for actual cursor collections. The complete tree preserves OpenAPI header optionality: a schema-optional `ifMatch` is not permission to omit a Service-required precondition. Follow the resource's Service semantics and retain its ETag. The existing `client.workspaces` and `client.organizations` conveniences remain source-compatible, including their stricter conditional-edit options, string-input helpers and Run waits. They are not a separate completeness boundary; use `client.resources` for all ordinary resource operations.

`client.http` remains available for direct access to all pinned OpenAPI paths. `client.workspaceHttp(workspaceId)` binds the workspace route prefix explicitly:

```ts
const http = client.workspaceHttp(workspace.id);
const result = await http.GET("/threads", { params: { query: { limit: 20 } } });
```

`workspace.threads.pages()` retains page responses and cursors; `.items()` flattens pages. Workspace management includes assets, connections, environments/templates, secrets, skills and subscriptions. Organization management includes models and model, web, environment, connector and memory providers. Specialized endpoints and file transfer are available through `client.resources` as well as typed HTTP.

## Memory

```ts
const created = await workspace.memories.create({
  key: "notes",
  name: "Notes",
});
const memory = workspace.memories.ref(created.data.id);
const file = await memory.files.create({
  path: "project/notes.md",
  content: "First note",
});
await memory.files
  .ref("project/notes.md")
  .replace(
    { content: "Updated note" },
    { ifMatch: file.response.headers.get("ETag")! },
  );
const revisions = await memory.revisions.list({ path: "project/notes.md" });
const revision = await memory.revisions.ref(revisions.data.items[0]!.seq).get();
```

`memory.files` supports paginated listing, create/get/replace/delete/move. `memory.revisions` supports paginated history, integer-sequence get/restore and `purge(path)`. File writes use file ETags; Memory metadata uses Memory ETags. `memory.records` supports paginated list/create/search and ref(id).replace/delete, without item GET, PATCH or ETag. Search sends a POST body; uncertain writes are never replayed. `thread.memories` supports list/create and ref(name).update/delete using the **Thread** ETag. New Thread/Fork bodies accept `memories`; `RunView.memory_mounts` is the frozen accepted snapshot. `organization.memoryProviders` supports list/create/get/update/test.

Both the pinned HTTP surface and `client.resources` cover **230 operations across 154 paths**, including bootstrap, health probes, specialized administration and binary transfers. Existing curated conveniences remain available; no operation requires falling back to raw HTTP. This distinguishes structural coverage from real-Service test coverage. File memory uses JSON text, not binary transfer. The SDK does not emulate routes absent from Service.

## Development

`npm ci --ignore-scripts && npm run check:all` checks types, formatting, lint, tests, package contents and installed ESM/TypeScript consumers. `npm run generate` uses only the pinned Service snapshot in `contract/`.

Against an existing disposable HTTPS Service, `node scripts/accept-installed.mjs` packs and installs the SDK in an isolated consumer, then runs low-level, managed, memory and generated-resource API acceptance. Generated-resource acceptance adds collection-family reads, multipart upload/streamed download, PNG upload, conditional edits, numeric memory restoration, 201/200 replay and raw SSE close. Supply `A13N_SERVICE_URL`, `A13N_API_TOKEN`, `A13N_WORKSPACE`, `A13N_AGENT`, `A13N_CLIENT_TOOL_AGENT`, `A13N_ORGANIZATION`, and `A13N_MEMORY_PROVIDER` (an accessible `mem0_oss` provider); use `NODE_EXTRA_CA_CERTS` to trust the fixture certificate. Memory acceptance checks file CAS/history/restore, frozen Run mounts, record CRUD/search, provider testing and health probes. The scripts never start or stop Service and do not establish external cloud-provider compatibility.

`node scripts/accept-browser.mjs` requires the `agent-browser` CLI and Chromium, the same Service URL, workspace and agent, plus explicit `A13N_BROWSER_EMAIL` and `A13N_BROWSER_PASSWORD` test credentials. It checks actual built ESM modules with same-origin session login and CSRF-protected managed submission, not Node Fetch mocks. This disposable-fixture browser check ignores certificate errors; it does not establish production TLS trust. Do not use production credentials or a production Service for these acceptance scripts.

[SDK contracts](spec/README.md) · [Contribution guide](CONTRIBUTING.md)
