# Resource Management

This contract owns capability-specific collections, pagination and binary transfer. All resource methods use the [scope and response contracts](01-resources-and-client-lifetime.md). Exported Service operations determine available capabilities; local reference construction never grants authority.

## Collection shape

- `collection.ref(selector)` binds a supported resource locally.
- `await collection.list(filters?, options?)` reads one typed page with full response evidence.
- `collection.pages(filters?, options?)` returns a lazy single-reader iterator of complete `ResourceResult<Page>` values; construction performs no I/O.
- `collection.iterate(filters?, options?)` explicitly flattens ordinary collection values, not live reference objects. Do not add competing `.all()` or eager list-everything APIs.
- `create`, `update`, `replace`, `delete`, and named domain commands exist only where the pinned API exports them. Do not impose generic CRUD on read projections or immutable resources.

Each iterator snapshots filters and its own cursor at construction, fetches serially without prefetch, honors abort/early return, and follows an actual next cursor even on an empty page. Repeated/non-advancing cursors fail instead of looping. A page's evidence remains available; iteration does not promise database snapshot isolation.

Retained Item reads preserve the [projection evidence](03-observation-and-data-access.md#retained-items) required for reconciliation. Lifecycle `resource_seq` traversal is not opaque-cursor pagination and receives a separately typed interface.

## Management coverage

Named typed collections cover the exported Native surface; complete HTTP coverage does not depend on a handwritten convenience for every route. Coverage does not require a second generator for every resource. Add endpoint-derived types and small resource wrappers where they improve discovery; retain `client.http` for precise complete access.

| Family                                                            | Required meaning                                                                                                                                             |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Agent configuration and revisions                                 | Mutable authoring/configuration, immutable revisions, explicit default revision and preconditions; no implicit publish.                                      |
| Sessions, Threads, Runs, Attempts, pending actions and Items      | Correct relationships and read/control boundaries; Attempts expose diagnostics, not Worker authority.                                                        |
| Model/Web/Environment/Memory/Connector Providers                  | Explicit owning scope and typed supported configuration/tests; discovery is not plugin installation.                                                         |
| Environment templates/revisions and actual Environments           | Configuration, generation, readiness, retention and stop/delete are separate; run mounts retain acceptance versus Attempt application. No direct EIP client. |
| Skills and Assets                                                 | Staging versus publication; immutable revisions versus immutable Asset bytes. No fabricated Asset replacement/version API.                                   |
| Connections, authorizations, accounts and bots                    | Setup, next action, authorization completion, connection readiness and external delivery are not collapsed into a boolean success.                           |
| Memory scopes/documents/revisions/changes/records                 | Preserve exact subject/provider/storage scope and exported capabilities; do not emulate unsupported backend behavior.                                        |
| IAM, organizations/workspaces, roles, invitations and credentials | Actual scopes and authority; credential readbacks remain safe projections. Interaction Session and authentication session are distinct.                      |
| Configuration assistant                                           | Dedicated Service authoring entry and existing Session/Thread/Run; explicit draft application, no implicit Agent publication.                                |
| Lifecycle, hooks and traces                                       | Durable reads/subscriptions versus best-effort local notification and provider-backed telemetry. No synthesized total cost or execution authority.           |

Unsupported conceptual families do not acquire fake endpoints. In particular, the pinned `MemorySelection` declares a single provider; this contract does not promise an unexported multi-entry selection. Secret, schedule, or usage conveniences require actual exported operations, not merely a shared coverage-map mention.

## Transfer boundary

Reuse `Blob` / `ReadableStream<Uint8Array>` and the existing low-level streaming download path. Resource-level downloads return an explicit scoped binary result exposing response metadata, its readable body, and `close()`; body consumption is not hidden in a JSON `ResourceResult`. No mandatory buffering, base64 conversion, Node fs import or implicit path interpretation is added.

Readable-stream upload sources follow Fetch/Streams consumption and cancellation semantics; applications needing reuse supply a fresh source. Do not promise that cancelling an upload leaves a one-shot source unread and reusable. The SDK does not independently destroy caller-owned Node file handles. Node streaming uploads preserve the required duplex behavior; browser capabilities are verified separately rather than inferred from Node tests. Asset publication and subsequent Run acceptance are separate effects, and a failed submission does not roll publication back.
