# TypeScript SDK Contract

## Ownership

This repository owns `@converge.ai/a13n`, its generated HTTP types, transport and handwritten streaming adapters, local tests and independent release lifecycle. Service owns authorization, durable state, HTTP semantics and notification/Run wire contracts. Pinned inputs and source identity live in `contract/`; development and generation do not execute Service or depend on another SDK. Console owns a separate private client, not an implementation dependency of this package.

The npm version, Service source SHA and protocol schema versions are independent identities. Reviewed contract updates can change generated public types; neither generation nor snapshot synchronization publishes an npm release. The package retains its `openapi.json` export.

## HTTP boundary

Every ordinary Native `/api/v1` operation in the pinned OpenAPI is available through the typed HTTP client. Workspace-bound operations share parent authentication and shutdown without expanding credential authority. Bearer and same-origin browser session authentication remain explicit alternatives. Browser CSRF tokens remain in memory and must be supplied before mutations. Callers supply preconditions, idempotency keys, pagination and cancellation explicitly.

Omitted fields remain distinct from explicit null. Generated types do not imply complete runtime JSON Schema validation. Results expose response headers and typed data; errors carry status, code, safe details, request ID and retry guidance. GET/HEAD may retry within configured bounds; mutations are not automatically replayed. Loss of acknowledgement after possible dispatch does not prove rollback, so callers reconcile through Service's owning command contract.

Binary request bodies accept Blob or readable streams with explicit content type. Streaming downloads do not buffer complete bodies. Node streaming uploads require the runtime's duplex option. Client close stops local delivery and owned transport work, not durable Service execution.

## Streaming and notifications

Run streaming is an async iterator of cursor/event pairs with envelope validation. The internal resume cursor advances only when the caller requests the next event after applying the previous one. Replay gaps require current Run, Items and pending-action reconciliation; event-specific payload validation belongs to consumers. Iterator or client closure only stops local observation.

Notifications are a bounded best-effort attachment under `a13n.service.notifications.v1`, not a durable event log. Reconnect reports a gap; callers reconcile durable Workspace events and current resources. Closing a handle changes local attachment, not subscriptions or execution authority on another client. Browser sockets use session cookies; Bearer clients provide a socket factory supporting authorization headers. Credentials never travel in socket URLs or subprotocols.

## Verifiable invariants

- Every pinned HTTP operation has a generated type.
- Generation consumes pinned local inputs; generated types compile and support the tested client behavior.
- Public request types reject invalid inputs while preserving nullable presence.
- HTTP tests cover base URL prefixes, auth, CSRF, headers, retry bounds and shutdown.
- Streaming tests cover framing, cursor delivery, cancellation and replay gaps.
- Notification tests cover handshakes, envelopes, bounded reconnect and local close.
