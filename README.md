# @converge.ai/a13n

TypeScript SDK for a13n Service: generated `/api/v1` HTTP types, scoped resource conveniences, Thread SSE and explicit transport authentication. ESM for Node.js 22.14+ and browser same-origin sessions.

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

## Typed HTTP and resource scope

`client.http` exposes all pinned OpenAPI paths. `client.workspaceHttp(workspaceId)` binds the workspace route prefix explicitly:

```ts
const http = client.workspaceHttp(workspace.id);
const result = await http.GET("/threads", { params: { query: { limit: 20 } } });
```

`workspace.threads.pages()` retains page responses and cursors; `.items()` flattens pages. Workspace management includes assets, connections, environments/templates, secrets, skills and subscriptions. Organization management includes models and model, web, environment, connector and memory providers. For specialized endpoints and file transfer use the generated HTTP methods, including `Blob` or `{file: Blob}` uploads.

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

The pinned HTTP surface covers **230 operations across 154 paths**. The curated resource facade covers **118 operations**, including all 29 memory/provider operations and Thread SSE; the other **112** remain available through typed HTTP (including bootstrap, health probes, specialized administration and binary transfers). This distinguishes structural coverage from real-Service test coverage. File memory uses JSON text, not binary transfer. The SDK does not emulate routes absent from Service.

## Development

`npm ci --ignore-scripts && npm run check:all` checks types, formatting, lint, tests, package contents and installed ESM/TypeScript consumers. `npm run generate` uses only the pinned Service snapshot in `contract/`.

Against an existing disposable HTTPS Service, `node scripts/accept-installed.mjs` packs and installs the SDK in an isolated consumer, then runs low-level, managed and memory API acceptance. Supply `A13N_SERVICE_URL`, `A13N_API_TOKEN`, `A13N_WORKSPACE`, `A13N_AGENT`, `A13N_CLIENT_TOOL_AGENT`, `A13N_ORGANIZATION`, and `A13N_MEMORY_PROVIDER` (an accessible `mem0_oss` provider); use `NODE_EXTRA_CA_CERTS` to trust the fixture certificate. Memory acceptance checks file CAS/history/restore, frozen Run mounts, record CRUD/search, provider testing and health probes. The scripts never start or stop Service and do not establish external cloud-provider compatibility.

`node scripts/accept-browser.mjs` requires the `agent-browser` CLI and Chromium, the same Service URL, workspace and agent, plus explicit `A13N_BROWSER_EMAIL` and `A13N_BROWSER_PASSWORD` test credentials. It checks actual built ESM modules with same-origin session login and CSRF-protected managed submission, not Node Fetch mocks. This disposable-fixture browser check ignores certificate errors; it does not establish production TLS trust. Do not use production credentials or a production Service for these acceptance scripts.

[SDK contracts](spec/README.md) · [Contribution guide](CONTRIBUTING.md)
