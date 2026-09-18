# @converge.ai/a13n

TypeScript SDK package for a13n Service.

## Installation

```bash
npm install @converge.ai/a13n
```

This SDK targets the Native `/api/v1` contract and notification subprotocol `a13n.service.notifications.v1`. HTTP requests and responses are generated from the Service application; every Native operation is available through the typed `http` client.

```typescript
import { createClient, data } from "@converge.ai/a13n";

const client = createClient({
  baseUrl: "https://agents.example.com",
  auth: { type: "bearer", token: process.env.A13N_API_KEY! },
});
try {
  const http = await client.workspaceHttp();
  const agent = data(
    await http.GET("/agents/{agent}", {
      params: { path: { agent: "code-reviewer" } },
    }),
  );
  console.log(agent.name);
} finally {
  client.close();
}
```

`workspaceHttp()` reads `/api/v1/auth/context` and binds the generated workspace operations to the API key’s Workspace. Callers supply only child resource references, using an ID or key for Agents. The bound client shares authentication, retries, and shutdown with the parent. Create a new binding after switching credentials to another Workspace. The full `http` surface remains available for explicit resource paths and organization or personal operations.

Browser clients use `{ type: "session" }` on the same origin as Service. Restore the CSRF token from `/api/v1/auth/csrf` (or the login response) with `setCsrfToken` before mutations. Tokens stay in memory. Callers pass `If-Match`, `Idempotency-Key`, Workspace headers, pagination cursors, and `AbortSignal` explicitly through typed operation options. Responses expose headers for ETags and request IDs. `ApiError` carries status, code, safe details, request ID, and retry guidance.

GET and HEAD retry at most twice by default, honoring bounded `Retry-After`. Mutations are never replayed automatically. Reconcile a lost command acknowledgement using the original idempotency key and the owning command contract. Omitted object fields and explicit `null` remain distinct.

Binary operations accept `Blob` or `ReadableStream<Uint8Array>` and an explicit content type. Downloads support openapi-fetch's `parseAs: "stream"`. The SDK does not buffer binary bodies; Node streaming request bodies require the runtime's `duplex: "half"` request option.

`streamRun(runId, { after, workspaceId, signal })` returns an async iterator of `{ cursor, event }`. Apply an event before requesting the next one. A `ReplayGapError` requires current Run, Items, and pending-action reconciliation. Closing an iterator or client only stops local delivery.

`notifications({ subscriptions, onNotification, onState, onError })` opens a best-effort attachment with up to three reconnects. The `gap` state requires durable Workspace event and current resource reconciliation. Close the returned handle to change subscriptions. Browser notifications use session cookies; bearer clients supply a `socketFactory` capable of attaching authorization headers. Credentials never travel in WebSocket URLs or subprotocols.

## Development

This is the independent `converge-ai-labs/a13n-sdk-typescript` repository. Use Node.js 24, npm and Make for development. Runtime support remains declared in `package.json`; neither generation nor tests require Python, Service or another SDK.

```bash
make install
make generate         # from the pinned local contract only
make check-all        # formatting, types, tests and package contents
```

`contract/source.json` records the upstream repository, full commit SHA, and original paths. The generated package-level `openapi.json` remains a supported export. The generator uses openapi-typescript and formatter versions fixed by `package-lock.json`. Do not reformat the raw contract inputs or edit generated types by hand.

See [contract provenance](contract/README.md), [SDK contract](spec/README.md) and [Contributing](CONTRIBUTING.md).

## Publishing

The package identity remains `@converge.ai/a13n`; moving its repository does not create a new npm package or transfer publisher authority. Source versions remain `0.0.0`. Release tags use `release/a13n/typescript/<version>`, with stable `X.Y.Z` or `X.Y.Z-rc.N`; versions are injected into the manifest and lockfile only in an ephemeral release checkout. RCs use the `rc` dist-tag and never advance `latest`.

The release environment is `sdk-typescript-npm`. npm trusted publishing must authorize **this** repository (`converge-ai-labs/a13n-sdk-typescript`), workflow `release-a13n-typescript.yml`, and that exact environment. Parent-repository trust does not transfer automatically. A package owner must verify/configure trust before release; copied GitHub settings and successful local packaging do not establish npm publishing access. Do not create long-lived publishing tokens as a substitute for that setup.

Actual publishing and any required npm bootstrap are separate maintainer actions, not part of repository initialization.

## License

Licensed under the Apache License 2.0.
