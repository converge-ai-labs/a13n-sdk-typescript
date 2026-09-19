# Resources and Client Lifetime

This contract owns resource identity, request scope, authentication, values and client lifetime. [Interaction](02-interaction-and-control.md) owns durable commands; [observation](03-observation-and-data-access.md) owns attachment cleanup.

## One client, two levels of access

Keep the existing public factory and interfaces:

- `createClient(options)` and the existing `ClientOptions` configuration.
- `client.http`, `await client.workspaceHttp()`, `data(...)`, and the package's generated `paths`, `operations`, `components`, and `Binary` exports.
- `client.streamRun(...)`, `client.notifications(...)`, `setCsrfToken(...)`, and synchronous `client.close()`.
- The ESM package identity `@converge.ai/a13n` and `openapi.json` export.

Add resource collections to that same client. Do not construct a second HTTP pool or perform authentication discovery in a property getter.

```typescript
const client = createClient({
  baseUrl: "https://agents.example.com",
  auth: { type: "bearer", token: apiKey },
});

const workspace = client.workspaces.ref(workspaceId);
const agent = workspace.agents.ref("code-reviewer");
const thread = workspace.threads.ref(threadId);
const run = workspace.runs.ref(runId);
```

All four bindings above are synchronous and I/O-free. `ref` is explicit; a collection is not a callable Proxy. A selector is not proof of existence or authorization. An Agent selector can be an ID or key where the route supports both; the SDK does not pretend the key is an immutable Agent ID.

`StartRunRequest.agent_id` requires an actual Agent ID. For a key-bound Agent, `start` first resolves that key through the exported Agent read, then posts the start body with the returned ID. This documented read is part of the asynchronous command, not reference construction. An ID-bound Agent can submit directly. The helper never passes a key into the ID field or silently pins the default revision observed during lookup. An explicit `agent_revision_id` or omission/null/value of `expected_default_revision_id` preserves the caller's selection and guard. If the key is renamed/reassigned between calls, callers needing stable identity bind the resolved ID; a lost acknowledgement is reconciled against the original resolved request, not automatically resubmitted after a fresh key lookup.

`workspaces.ref(id)` deliberately takes the Workspace ID for the new facade. This provides an explicit boundary for browser-session requests and restart recovery. The compatible `workspaceHttp()` remains asynchronous authentication-context discovery; it is not silently repurposed into a reference factory. No new hidden default Workspace or hidden current Thread is introduced.

The primary Run and Thread accessors live under the Workspace reference, even when their actual routes are globally addressed by resource ID. A reference carries the request's Workspace context, not a claim that a path alone authorizes the object. Root Organization, IAM, self-service and discovery collections have their actual scopes; not every resource is placed under Workspace.

## Authentication and scope

Retain the existing explicit Bearer and same-origin browser-session modes, including the Bearer token callback. Add an explicit `{ type: "public" }` mode for exported unauthenticated HTTP operations; it sends neither Authorization nor cookies and cannot open a notification attachment. Do not infer credentials from the environment, perform automatic login, or add a credential-provider plugin system.

For new resource calls:

- Workspace-bound session requests send `X-A13N-Workspace-ID` from their explicit Workspace reference, including Run reads, SSE handshakes, and reattachments. A Workspace-scoped facade does not derive the boundary from an unknown Run relationship.
- Organization-scoped calls do not acquire a Workspace header merely because another handle exists on the client.
- A handle's scope is immutable. Separately bound handles may coexist; header construction is per request, not mutation of global client state.
- A derived handle created from a receipt retains the originating explicit request scope. Reported resource ownership remains a separate fact. Inherited configuration is mutated through its owning scope, not a presumed Workspace copy.
- Browser session cookies use the existing same-origin fetch behavior. CSRF remains in memory and is installed explicitly before protected mutations. Session navigation does not bypass Origin or CSRF checks. Bearer and public requests omit cookies.
- Browser session support does not imply a Node cookie jar or cross-origin session support. A Node-specific cookie/session adapter is not part of this contract.
- The token callback remains supported but performs no automatic login/refresh on authentication failure. The application must not switch principal or Workspace semantics underneath active bound references; use a new client when changing identity. Refreshing the token for the same authority is distinct from changing that authority.

Raw `http`, legacy `streamRun`, and notifications retain their existing explicit header/options contracts. They do not acquire ambient scope from the last-created resource handle.

## References versus representations

A reference exposes its read-only selector and scope, supported commands, and local navigation. `get()` performs a read and returns a new representation. It does not fill a mutable live `status` field on the reference. A reference has no `save()`, hidden refresh, independent transport close, or awaitable behavior.

Use ordinary interfaces and structural values, not a mandatory public inheritance hierarchy. Domain names such as `Agent`, `Thread`, `Run`, and `QueuedSubmission` describe references; generated wire types remain reachable through `components["schemas"]`. Add discoverable type aliases for commonly used requests and representations without duplicating their schemas.

```typescript
interface ResourceResult<T> {
  readonly data: T;
  readonly response: Response;
}
```

JSON resource methods return `Promise<ResourceResult<T>>`. This keeps the familiar `{ data, response }` vocabulary while making successful resource data non-optional. `response.status` and `response.headers` preserve ETag, request ID and retry evidence; empty-body success uses `data: undefined`, while a declared JSON null remains null. HTTP failures reject with the existing `ApiError` family, not `{ ok: false }` values mixed into every success union.

This is an envelope, not a live resource. `readonly` does not promise recursive runtime freezing of JSON or of the standard Response object. For JSON operations the response body has already been consumed; raw bytes are not copied or promised available for rereading. Applications needing raw or streaming response control can use the low-level interface. Do not add both `.value` and `.data`, forwarded resource properties, or a second parallel response metadata model for ordinary requests.

## Naming and request fidelity

Use camelCase for SDK methods and transport options (`idempotencyKey`, `ifMatch`, `timeoutMs`, `pollIntervalMs`, `signal`). Keep generated wire bodies and responses in their actual snake_case. Do not recursively camelize server JSON.

- Management and exact command methods take the generated typed body followed by operation-specific request options.
- `agent.start(input, options)` and `thread.submit(input, options)` are the two main input conveniences. Their `options.body` is a typed omission of only the locally bound fields, not an untyped bag. Required body fields remain required.
- Text input converts to the pinned versioned `AgentInput`; callers can pass a complete `AgentInput` for multimodal or structured content. No file-path or implicit Asset upload overload is added.
- Omission, explicit null, and value remain distinct. JSON object fields with `undefined` are omitted, never translated into null. Keep `exactOptionalPropertyTypes`; do not introduce Python's UNSET sentinel in TypeScript.
- A bound field cannot be supplied a second time in the convenience body. Type declarations exclude it; runtime callers supplying conflicting reserved fields receive a local error before dispatch.
- Idempotency keys and ETags remain explicit and operation-specific. No automatic key generation, optimistic-version fetching, conflict overwrite, or mutation replay.

The core options can be expressed directly over generated wire types, without another model generator:

```typescript
type Schema = components["schemas"];
interface MutationOptions {
  idempotencyKey: string;
  signal?: AbortSignal;
}
interface StartOptions extends MutationOptions {
  body?: Omit<Schema["StartRunRequest"], "agent_id" | "input">;
}
interface SubmitOptions extends MutationOptions {
  body: Omit<Schema["ThreadRunSubmissionRequest"], "input">;
}
```

These types illustrate the two convenience operations only. Other mutations have their own exported header requirements; this is not a universal mutation-options type applied to unsupported operations. `StartOptions.body` preserves the exported `expected_default_revision_id` guard.
