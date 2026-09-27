# TypeScript SDK application guide

Use `@converge.ai/a13n` to call an existing Service from Node.js or a same-origin browser. It does not execute agents in your process. Start with the [README](../README.md); this Markdown guide covers application state, transport ownership and recovery. No separate documentation site is required.

## Setup and reading map

The runtime is ESM on Node.js 22.14+ or a browser with the required Web APIs. Repository development uses Node.js 24. Install a released `@converge.ai/a13n` version appropriate to your deployment when available. For a local checkout, run `npm ci --ignore-scripts`, `npm run build`, then `npm pack`; install the resulting tarball in your application. Source version `0.0.0` is not a release or registry availability promise.

Prepare a Service base URL, credentials, an explicit workspace ID or key, and an existing Agent ID for submissions. Obtain them through Console or your administrator. Constructing `.ref(...)` does not discover resources or grant access.

| Task                                          | Read                                                                                          |
| --------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Configure authentication                      | [Client and authentication](../README.md#client-and-authentication)                           |
| Submit and observe a Thread                   | [Start and observe](../README.md#start-and-observe)                                           |
| Find methods, page results and transfer bytes | [Resources and typed HTTP](../README.md#complete-resources-and-typed-http)                    |
| Work with Memory                              | [Memory example](../README.md#memory) and [semantics below](#memory-files-records-and-mounts) |
| Handle queueing and successor Runs            | [Observation below](#queued-input-and-exact-run-observation)                                  |
| Develop or run acceptance                     | [Contributing](../CONTRIBUTING.md)                                                            |
| Check design guarantees and compatibility     | [Specification](../spec/README.md) and [contract provenance](../contract/README.md)           |

## Authentication and client ownership

`createClient({baseUrl, auth: {type: "bearer", token}})` accepts a string or async token callback. It sends no ambient browser cookies. Keep secrets in application-managed storage and never embed a privileged workspace key in a public frontend bundle.

Use `{type: "session"}` for a same-origin browser application. Restore the session's CSRF token from the Service login/session response and call `client.setCsrfToken(token)` before protected mutations. The SDK sends `X-CSRF-Token`; it does not supply an interactive login manager or infer a workspace from the session. Session authentication in Node does not create a browser cookie store for you.

Workspace API keys cannot call every organization/session-only endpoint merely because it has a generated method. Treat `403` as evidence to inspect grants, scope and CSRF rather than automatically switching credentials.

The platform Fetch implementation owns TLS trust. For a private CA in Node, configure trust through the process/platform; do not disable verification. A custom `fetch` is an explicit integration hook, not an instruction to weaken TLS.

Reuse one client for its intended lifetime, then call `client.close()`. Pass `signal` options for request/workflow cancellation. Client closure and caller abort stop local work, not durable Runs. Downloads/raw streams return owned bodies that must be closed in `finally` when not fully consumed.

## Find an operation

`client.resources` is the only ordinary resource tree. Use camelCase properties and `.ref(selector)`; there is no parallel `client.workspaces`, `client.organizations` or `workspaceHttp` facade.

| Resource                 | Example                                               |
| ------------------------ | ----------------------------------------------------- |
| Workspace                | `client.resources.workspaces.ref(workspaceId)`        |
| Organization             | `client.resources.organizations.ref(organizationId)`  |
| Thread inbox Entry       | `workspace.threads.ref(threadId).inbox.ref(entryId)`  |
| Committed Run Items      | `workspace.runs.ref(runId).items.get()`               |
| Memory file              | `workspace.memories.ref(memoryId).files.ref(path)`    |
| Memory revision          | `workspace.memories.ref(memoryId).revisions.ref(seq)` |
| Record provider accounts | `organization.memoryProviders`                        |

Use IDE completion, the [generated resource declarations](../src/resources/generated.ts), and [wire types](../src/schema.ts). The [pinned OpenAPI](../contract/openapi.json) defines exact fields. Resource methods accept complete wire bodies; `textPayload(...)` only builds content and does no I/O.

Query filters belong under `options.query`; headers use options such as `ifMatch`, `idempotencyKey` and `lastEventId`. Keep request field names in their wire form. Omitted/undefined fields are different from null, but Service decides what null means for each field. For example, an Agent description sent as null is retained, not cleared.

JSON methods return `{data, response}`. Keep `response.status` and headers such as `ETag` and `X-Request-Id` when diagnosing or reconciling changes. `list()` fetches one page; `pages()` retains page responses and `items()` flattens them. These helpers exist only for cursor collections, not committed Run Items snapshots.

Use `client.http` only when you intentionally need custom middleware/headers or low-level parsing. It shares authentication and lifetime but is not required to access a missing operation.

## Conditional edits and retry decisions

Read the object being edited and pass its current ETag. File edits take a file ETag; Thread inbox/mount edits take the Thread ETag. Conditional methods require `ifMatch`; Memory revision restoration allows omission only for an absent target.

On `412`, reconcile current state with the intended change. Do not fetch a fresh ETag and overwrite automatically. Keep one idempotency key per logical submission/fork/resume/upload, saved together with its request and receipt. A different key means a different operation.

The transport has bounded GET/HEAD retries controlled by `maxReadRetries`; it does not replay mutations. Read retry policy, stream reconnection and your application's durable recovery are different mechanisms. After an uncertain write, read back using saved identities before deciding whether to retry with the original key.

## Queued input and exact Run observation

`threads.create(...)` and `thread.inbox.create(...)` return the wire receipt in `.data`: a Thread, an Entry and a nullable Run. They do not return bound submission helpers.

1. Save the Thread and Entry identities even when `run` is null.
2. When queued, poll `workspace.threads.ref(thread.id).inbox.ref(entry.id).get({signal})` under an application-owned deadline and delay. There is no Entry `.wait()` helper in this SDK. Assignment is not consumption; inspect `status` and `assigned_run_id` before selecting a Run.
3. A consumed Entry identifies the Run to observe; failed/withdrawn Entries do not imply successful execution.
4. `workspace.runs.ref(runId).wait({timeoutMs, signal})` observes exactly that Run. Completed, waiting, failed and cancelled all end waiting; inspect the returned state.
5. Read `run.items.get()` for committed display. Resume returns a successor Run view, so bind its returned ID explicitly; waiting on the original Run never follows a successor.

`wait` covers its requests, authentication, response bodies, read retries and polling delays. For a total queue-plus-Run deadline, carry a common abort signal across both stages rather than resetting the application's budget at each call. Local timeout/abort/close is not remote interruption and does not prove rollback. Use the explicit interrupt command when that is your intention.

## Thread streaming

`thread.events({after, signal})` yields decoded observation events. The raw `thread.stream.get({lastEventId, signal})` returns one owned SSE body without decoded reconnection behavior.

Apply a delta/boundary frame and durably record its cursor with application state before advancing iteration. Changed/reset/gap are readback signals, not fabricated output or completion. Read the Thread or indicated Run Items and apply the resulting snapshot yourself. EOF does not mean a Run completed. Breaking iteration, aborting or closing the client only ends attachment; it does not stop Service execution.

## Memory files, records and mounts

- File Memory is JSON text. Pass paths directly to `.files.ref(path)` without pre-encoding. Existing-file replace/delete/move use explicit preconditions.
- Revisions are selected by integer `seq`. Restore undoes the selected revision's change, rather than copying its post-change content. Undoing creation can return `file: null`; account for that result. Use the current file ETag when it exists, omitting it only for an absent target. History purge and file deletion are different operations.
- Provider records support list/create/replace/delete/search, not item GET or file ETags. Search is a POST body; uncertain provider writes require reconciliation.
- Thread memory mounts use names and the Thread ETag. New Thread/Fork bodies can include mounts. `RunView.memory_mounts` is the accepted snapshot, not a live view of later Thread edits.
- Organization `memoryProviders` configures/tests accounts separately from file content and record operations.

## Failure handling

Catch `ApiError` for `.status`, `.code`, `.details`, `.requestId` and `.retryAfter`. Distinguish authentication (`401`), permission/CSRF (`403`), state/idempotency conflicts (`409`), stale ETags (`412`) and missing preconditions (`428`). Use structured fields rather than parsing human messages.

`ProtocolError` identifies response/stream interpretation failures. `WaitTimeoutError` is specific to the Run wait deadline. Caller abort/client close remain distinct. Fetch failures retain platform behavior rather than a universal SDK transport-error type; do not indiscriminately log their full contents because they can contain request information.

No error after dispatch guarantees that a mutation rolled back. Retain the operation's key/identities and inspect Service state before retrying.

## Compatibility and test boundaries

Read these Markdown docs at the version or commit you consume. [contract/source.json](../contract/source.json) identifies the Service snapshot; package versions are independent. Complete structural coverage does not mean every endpoint/deployment/provider has been exercised live.

Local Node tests and installed-package checks are distinct from the [opt-in HTTPS and browser acceptance](../README.md#development). The browser fixture's certificate exception is explicitly test-only, not a production configuration recommendation. No documentation update or local pack publishes a package.
