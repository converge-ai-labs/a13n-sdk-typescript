# @converge.ai/a13n

TypeScript SDK for a13n Service. It provides a generated Native `/api/v1` HTTP client, scoped resource references, durable Run control, resumable Run observation, typed management collections, binary transfer, and the `a13n.service.notifications.v1` notification protocol.

## Installation

```bash
npm install @converge.ai/a13n
```

The package is ESM and supports Node.js 22.14 or newer. Browser applications must run on the same origin as Service when they use session authentication.

## Client and authentication

```typescript
import { createClient } from "@converge.ai/a13n";

const client = createClient({
  baseUrl: "https://agents.example.com",
  auth: { type: "bearer", token: process.env.A13N_API_KEY! },
});
```

Authentication modes are explicit:

- `{ type: "public" }` sends no credentials.
- `{ type: "bearer", token }` accepts a token string or a synchronous/asynchronous callback. Caller abort and `client.close()` stop local waiting for an asynchronous callback and prevent a later request dispatch; they do not cancel application callback code.
- `{ type: "session" }` uses same-origin browser cookies. Restore the CSRF token from `/api/v1/auth/csrf` or the login response before protected mutations:

```typescript
const browserClient = createClient({
  baseUrl: window.location.origin,
  auth: { type: "session" },
});
browserClient.setCsrfToken(restoredCsrfToken);
```

All child references share the parent client's authentication, retry policy, and shutdown signal. `client.close()` is synchronous, final local shutdown; it does not cancel a remote Run.

## Start, observe, control, and reconcile

Resource references are local and perform no I/O until a method is called:

```typescript
const workspace = client.workspaces.ref("ws_1234567890abcdef");
const agent = workspace.agents.ref("code-reviewer"); // ID or key
```

`agent.start()` resolves an Agent key to the actual Agent ID before creating the Run. It returns validated references plus the complete acceptance receipt.

```typescript
try {
  const accepted = await agent.start("Review this change", {
    idempotencyKey: crypto.randomUUID(),
    body: { environment: null },
  });
  const run = accepted.run;

  const stream = run.stream({
    // Omit `after` when there is no completely applied cursor.
    after: lastAppliedCursor,
    maxReconnects: 5,
  });
  try {
    for await (const observation of stream) {
      await applyEvent(observation.event);
      await saveAppliedCursor(observation.cursor);
      // Requesting the next event acknowledges this cursor in memory.
    }
  } finally {
    await stream.close();
  }

  // Stream exhaustion alone is not proof of business success.
  const sealed = await run.wait({ timeoutMs: 60_000 });
  const items = await run.items.list();
  if (!items.data.complete || !items.data.finalized) {
    await reconcileIncompleteProjection(sealed.data, items.data);
  }

  switch (sealed.data.status) {
    case "completed":
      consumeOutput(sealed.data.output, sealed.data.output_text);
      break;
    case "waiting":
      await handlePendingActions(run, sealed.data.pending);
      break;
    default:
      handleTerminalState(sealed.data);
  }
} finally {
  client.close();
}
```

`run.wait({ timeoutMs, pollIntervalMs?, signal? })` is always bounded, follows only the exact Run, and returns a fresh `ResourceResult`. It does not follow successor Runs or infer state from events.

Remote controls remain on `Run`, including `steer`, `cancel`, `feedback`, `retry`, `continueFrom`, and `fork`. Commands require their generated snake_case body and an explicit idempotency key where the Service contract requires one:

```typescript
await run.steer("Focus on the authorization boundary", {
  idempotencyKey: crypto.randomUUID(),
});

await run.cancel(
  {
    expected_run_version: observedRunVersion,
    expected_thread_version: observedThreadVersion,
  },
  { idempotencyKey: crypto.randomUUID() },
);
```

Mutations are never replayed automatically. If an acknowledgement is lost, reconcile with the owning resource and the original idempotency key rather than assuming rollback.

## Accepted versus queued submissions

`thread.submit()` returns a discriminated union. It never fabricates a Run reference for queued work and retains the complete outer receipt, including queue generation.

```typescript
const submission = await thread.submit("Follow up", {
  idempotencyKey: crypto.randomUUID(),
  body: { expected_thread_version: observedThreadVersion },
});

if (submission.outcome === "run_accepted") {
  await observe(submission.run);
} else {
  const queued = await submission.queuedSubmission.wait({
    timeoutMs: 30_000,
  });
  showQueueState(queued.data, submission.receipt.data.queue_version);
}
```

Queue reads and bounded waits do not consume entries. Reorder, consume, update, and delete remain explicit commands with their required versions and idempotency keys.

## RunStream lifetime and recovery

`run.stream()` returns a lazy, single-reader `AsyncIterableIterator`. The first `next()` opens the attachment. `return()`, early `for await...of` exit, or `close()` releases local stream work; explicit local close makes a pending `next()` finish with `done: true`. Caller abort and client shutdown reject with their exact abort reason.

The stream resumes from the last cursor acknowledged by requesting the next event. It uses a bounded reconnect budget, bounded exponential backoff, and `Retry-After`; it does not multiply reconnects with nested HTTP read retries. Malformed protocol data is not retried.

A `ReplayGapError` retains `requested_cursor`, `retained_floor`, and `high_watermark` evidence. Reconcile the current Run, retained Items, and pending actions, then open a new stream from an application-approved cursor. Run sealing, stream exhaustion, Item completeness, and Item finalization are separate facts.

The legacy `client.streamRun(runId, { after, workspaceId, signal })` raw iterator remains available for compatibility. Its EOF/retry contract is unchanged.

## Results, wire values, and low-level access

Resource reads return both the typed representation and the original response:

```typescript
const result = await workspace.models.ref("model_1234567890abcdef").get();
console.log(result.data.name);
console.log(result.response.headers.get("ETag"));
```

`ResourceResult<T>` is:

```typescript
interface ResourceResult<T> {
  readonly data: T;
  readonly response: Response;
}
```

Convenience method and option names are camelCase. Generated request and response bodies remain snake_case. Omitted fields, explicit `null`, and concrete values remain distinct. Callers supply endpoint-specific `If-Match`, idempotency keys, expected versions, cursors, and `AbortSignal` values explicitly.

Every Native operation remains available through `client.http`. `await client.workspaceHttp()` discovers the authenticated Workspace and returns a generated client whose Workspace paths and headers are bound to that credential. Create a new binding after switching credentials. Organization and personal operations stay on `client.http` or their explicit scoped resources.

GET and HEAD requests retry at most twice by default, honoring bounded `Retry-After`. `ApiError` carries Service status, code, safe details, request ID, and retry guidance. `ProtocolError` identifies invalid protocol evidence; `TransportError` does not claim a remote mutation outcome.

## Management resources and pagination

Workspace and Organization collections expose only capabilities exported by the pinned Service contract; there is no universal CRUD layer.

```typescript
const workspace = client.workspaces.ref("ws_1234567890abcdef");
const organization = client.organizations.ref("org_1234567890abcdef");

const firstPage = await workspace.models.list({ limit: 20 });
for await (const model of workspace.models.iterate({ enabled: true })) {
  console.log(model.id);
}

const model = workspace.models.ref("model_1234567890abcdef");
const current = await model.get();
await model.update(
  { enabled: false },
  { ifMatch: current.response.headers.get("ETag")! },
);

await organization.modelProviders.list();
```

`list()` returns one complete page with response evidence. `pages()` is a lazy single-reader iterator of complete `ResourceResult<Page>` values and snapshots its filters. `iterate()` explicitly flattens page items. Repeated pagination cursors fail with `ProtocolError` instead of looping.

Typed resource families include Agent revisions and lifecycle, Models and Providers, Environment configuration and actual Workspace Environments, Assets, Connections, Memory, Skills, hooks, traces, application accounts and bots, IAM, and configuration-assistant drafts. Scope remains explicit: actual Environments are Workspace-owned, while shared configuration families may also be Organization-owned. Unsupported secret, schedule, usage, direct EIP, or multi-provider MemorySelection conveniences are not fabricated.

Configuration assistant authoring and publication remain separate. Applying a reviewed draft is explicit and guarded:

```typescript
const draft = workspace.configurationDrafts.ref("draft_1234567890abcdef");
const review = await draft.get();
await draft.apply(
  { expected_agent_version: observedAgentVersion },
  {
    idempotencyKey: crypto.randomUUID(),
    ifMatch: review.response.headers.get("ETag")!,
  },
);
```

## Binary upload and download

Assets accept `Blob` or `ReadableStream<Uint8Array>` without mandatory buffering. Node streaming request bodies use Fetch's required `duplex: "half"` option internally.

```typescript
const uploaded = await workspace.assets.upload(file.stream(), {
  filename: file.name,
  mediaType: file.type,
  idempotencyKey: crypto.randomUUID(),
});

const download = await workspace.assets.ref(uploaded.data.id).download();
try {
  await consume(download.body);
  console.log(download.response.headers.get("Content-Type"));
} finally {
  await download.close();
}
```

`BinaryResult.close()` cancels the SDK-owned upstream reader even when the public body is locked by `getReader()` or `pipeTo()`. It affects only that download, not the shared client. Applications own reusable upload sources and external Node file handles.

## Notifications

`notifications({ subscriptions, onNotification, onState, onError })` opens a best-effort attachment with up to three reconnects. A `gap` state requires durable Workspace event and current-resource reconciliation. Close the returned handle to change subscriptions. Browser notifications use session cookies; Bearer clients supply a `socketFactory` capable of attaching authorization headers. Credentials never travel in WebSocket URLs or subprotocols.

## Runtime validation boundary

Repository unit and package tests run in Node.js. They cover mocked HTTP semantics, native loopback Fetch/Streams behavior, an actual `npm pack` installation, Node ESM import, and TypeScript declaration resolution. Those checks do **not** by themselves prove browser session cookies, browser CSRF restoration, browser streaming behavior, or compatibility with a live Service. Browser and live-Service acceptance must be run separately against an isolated environment and reported as such.

## Development

This is the independent `converge-ai-labs/a13n-sdk-typescript` repository. Use Node.js 24, npm, and Make for development. Runtime support remains declared in `package.json`; generation and ordinary tests require no Python, Service, or sibling SDK checkout.

```bash
make install
make generate             # from the pinned local contract only
make check-all            # formatting, types, tests, package contents, installed consumer
make package-acceptance   # npm pack + isolated install + ESM import + tsc
```

`contract/source.json` records the upstream repository, full commit SHA, and original paths. The generated package-level `openapi.json` remains a supported export. The generator uses openapi-typescript and formatter versions fixed by `package-lock.json`. Do not reformat raw contract inputs or edit generated types by hand.

See [contract provenance](contract/README.md), [SDK contract](spec/README.md), and [Contributing](CONTRIBUTING.md).

## Publishing

The package identity remains `@converge.ai/a13n`; moving its repository does not create a new npm package or transfer publisher authority. Source versions remain `0.0.0`. Release tags use `release/a13n/typescript/<version>`, with stable `X.Y.Z` or `X.Y.Z-rc.N`; versions are injected into the manifest and lockfile only in an ephemeral release checkout. RCs use the `rc` dist-tag and never advance `latest`.

The release environment is `sdk-typescript-npm`. npm trusted publishing must authorize **this** repository (`converge-ai-labs/a13n-sdk-typescript`), workflow `release-a13n-typescript.yml`, and that exact environment. Parent-repository trust does not transfer automatically. A package owner must verify or configure trust before release; copied GitHub settings and successful local packaging do not establish npm publishing access. Do not create long-lived publishing tokens as a substitute for that setup.

Actual publishing and any required npm bootstrap are separate maintainer actions, not part of repository initialization.

## License

Licensed under the Apache License 2.0.
