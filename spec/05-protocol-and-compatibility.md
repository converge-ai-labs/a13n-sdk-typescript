# Protocol and Compatibility

This contract owns package compatibility, error fidelity, protocol inputs and acceptance boundaries. The npm version, Service source SHA and wire schema versions are independent identities. A contract update or generation does not publish a package.

## Protocol ownership

Every ordinary Native `/api/v1` operation in the pinned OpenAPI remains available through the typed HTTP client. `contract/source.json` records the source repository, full commit SHA and original paths; generated bindings consume the local pinned inputs without executing Service. Review covers semantic changes as well as exported shapes. Generated types do not imply complete runtime JSON Schema validation.

The pinned API conventions, Native streaming and queue semantics govern their respective boundaries. Source locations recorded in the snapshot lead to related Service specifications; Service owns authorization, durable state and wire semantics. This SDK owns its public TypeScript API, transport adaptation and package compatibility. The package retains its `openapi.json` export.

## Existing public surfaces

| Existing surface                                        | Contract                                                                                                                                                                                  |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `createClient`, generated HTTP, `workspaceHttp`, `data` | Preserve signatures and return behavior; add resource properties.                                                                                                                         |
| `streamRun(runId, RunStreamOptions)`                    | Preserve the legacy async-generator/options and clean-EOF semantics. New resource streams use distinct `ObserveRunOptions`.                                                               |
| SSE parsing and transport                               | Share framing, envelope/error parsing and single-attempt transport internally; do not duplicate HTTP stacks. Correctness fixes are reviewed with legacy regression tests.                 |
| Notifications                                           | Preserve callbacks, subscription shape, bounded best-effort reconnection and local handle close. Do not turn notifications into Run output or apply Run replay cursors to them.           |
| Error exports                                           | Keep `ApiError`, `ProtocolError`, `ReplayGapError`, existing evidence fields and `instanceof` behavior.                                                                                   |
| Package/runtime                                         | Preserve ESM, current Node engine floor `>=22.14`, Node 24 development toolchain and existing declaration exports. Do not require `await using` or a new runtime just for cleanup syntax. |

The new resource surface can reject transport failures with an additive `TransportError` that retains a safe cause and distinguishes unconfirmed EOF from API rejection. Caller abort reasons pass through unchanged, including custom reasons; do not force them into Service errors. Local invalid input/lifecycle failures use TypeError/RangeError; `WaitTimeoutError` is distinct from caller abort. Legacy raw calls do not silently change their rejection taxonomy.

Do not swallow a programming error in an injected fetch implementation or a failing token callback as a retryable remote fault. Retry only failures the transport can identify as eligible. An HTTP error after possible mutation dispatch does not prove no effect. Reads and mutations both preserve request evidence, but only safe reads may use read retry policy. No mutation auto-replay, including after a 401 refresh attempt.

Browser support is an explicit acceptance requirement for the new resource surface: standard Fetch, Headers, Request/Response, AbortController/AbortSignal, readable streams and async iteration, with same-origin session mode. It is not a claim that current Node-only tests prove support for every browser, bundler, SSR runtime, Deno or Bun. Browser WebSocket cannot be assumed to accept Bearer authorization headers; keep the existing caller-provided socket-factory boundary. No cookies or tokens in URLs or subprotocols.

Outside this SDK contract: React hooks, an event store, a universal output reducer, client-tool auto-execution, auto-approval, multi-agent workflow abstractions, cross-Run automatic follow, provider-native clients, EIP transport, cross-origin cookie handling, Node session-cookie infrastructure, or a Service deployment/CI-environment runner.

## Verifiable invariants

| Area               | Checks                                                                                                                                                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Type contract      | Discriminant narrowing; queued branch has no Run; generated-body omission/null; reserved bound fields cannot be supplied; required preconditions remain required; invalid request and output-generic examples fail compilation.                   |
| Lifetime           | Reference factories do zero I/O; independent handles share client shutdown; concurrent commands work while one read blocks; token callback completion after shutdown cannot dispatch.                                                             |
| Scope/auth         | Workspace header on reads and every reattachment; no ambient scope mutation between concurrent handles; ownership-aware config mutations; public/Bearer/session separation; CSRF explicit.                                                        |
| Submission/control | Key-bound Agent start resolves its actual ID without changing revision guards; exact outer receipt, contradictory-disposition rejection, explicit versions/idempotency; queue wait never consumes; successors retain source identity and lineage. |
| Iterator           | Lazy open, single-reader rejection, early break/consumer exception, close during pending read/handshake/backoff, custom abort reasons, no final-checkpoint advancement on close.                                                                  |
| Recovery           | Real disconnect with exact Last-Event-ID; finite no-progress retry count without nested HTTP retries; Retry-After/backoff cancellation; terminal event then drain; resumed empty EOF evidence; malformed framing and both gap forms.              |
| Data               | Empty page with next cursor, cursor-loop detection, stable filter snapshots, Item metadata and incomplete/unavailable results, large streaming binary transfer and cancellation.                                                                  |
| Compatibility      | Existing HTTP/workspace/stream/notification tests stay valid; exports and package content retained; no new transitive runtime-schema or framework dependency.                                                                                     |
| Installed package  | `npm pack`, install outside checkout, Node ESM import and type resolution, real Service HTTP; browser import/runtime checks with session/CSRF, abort and streaming. No Service PYTHONPATH or source import.                                       |

Acceptance results identify the exact Service commit and tested runtime. Declaration-only type tests and mocked Fetch tests do not establish real browser, provider, or Service compatibility. The SDK exercises installed packages against Service over its public HTTP boundary, not by importing Service or another SDK. Contribution, generation and CI procedures belong to [CONTRIBUTING.md](../CONTRIBUTING.md).

## Notifications

Notifications remain a bounded best-effort attachment under `a13n.service.notifications.v1`, not a durable event log. Reconnect reports a gap; callers reconcile durable Workspace events and current resources. Closing a handle changes the local attachment, not subscriptions or execution authority on another client. Browser sockets use session cookies; Bearer clients provide a socket factory supporting authorization headers. Credentials never travel in socket URLs or subprotocols.
