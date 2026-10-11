# TypeScript SDK Overview

`@converge.ai/a13n` has two layers and one wire implementation. The authored Agent-oriented layer supplies finite `Interaction` with iteration, authoritative result and Thread/receipt together. The complete generated `client.resources` layer maps each pinned schema operation to one typed HTTP call. Both use the same transport, authentication, error handling and generated route bindings; no parallel HTTP facade, workspace-scoped business tree, or client-side Agent executor exists.

```mermaid
flowchart LR
  App[Application] --> Agent[Agent interaction and exact Run handles]
  App --> Resources[Generated complete resources]
  Agent --> Resources
  Agent --> Parser[Typed Thread SSE parser]
  Parser --> Resources
  Resources --> Transport[One authenticated transport]
  Transport --> Service[Service]
  Pin[Pinned Service OpenAPI] --> Types[Generated types and bindings]
  Types --> Resources
```

The ordinary journey binds an Agent by **ID**, calls `start(input,options?)`, optionally previews `textStream()` or iterates raw output, reads `interaction.result()`, then calls `send(threadId,input,options?)` to continue. A Thread is not owned by any single Agent. Submitted interactions retain the original receipt with Thread, Entry and explicitly provisional `receiptRun`. Resume and exact-ID recovery use the same core without fabricated receipts or Entries. Its result waits for Entry **consumption**, then observes only the incorporating Run; assignment alone is not incorporation. It stops at completed, failed, cancelled or waiting without following a successor. `RunOutcome.output` and its HTTP `snapshot` are authoritative; optional string-only `text` needs no Items request. Advanced Run Items remain native display evidence; transient stream frames are not authoritative.

Business requests with API-key auth use the key's implicit workspace. Same-origin session callers select a workspace explicitly for declared workspace-scoped operations and use CSRF for protected mutations. Administration retains its explicit organization/workspace paths. Service alone owns identities, authorization, durable state, versioning and retention. Wire fields remain snake_case and preserve omission versus explicit null; authored options use camelCase. The package imports neither Service runtime nor another SDK.
