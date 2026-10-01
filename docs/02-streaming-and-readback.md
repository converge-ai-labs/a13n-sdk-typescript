# Stream live updates and read committed output

To show progress while an Agent runs, use the same Service URL, API key and Agent ID as in [client setup](01-setup-and-conversations.md). The interaction is both a finite async iterator and the source of its final result; you do not need a second stream.

## Preview events, then replace them with committed Items

Save this as `stream.mjs`. The raw `delta` event may contain structured data rather than plain text. When a stream gap occurs, stop trusting any preview accumulated from deltas and rebuild it from the saved Items; do not concatenate replayed deltas onto an old preview:

```js
import { randomUUID } from "node:crypto";
import { createClient } from "@converge.ai/a13n";

const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
try {
  const agent = client.agents.ref(process.env.A13N_AGENT_ID);
  const interaction = await agent.start("Explain the release plan.", {
    idempotencyKey: randomUUID(),
  });
  let previewUncertain = false;
  for await (const event of interaction) {
    if (event.frame.type === "delta" && !previewUncertain) {
      console.log("Live event (provisional):", event.frame.data.event);
    } else if (event.frame.type === "gap" || event.frame.type === "reset") {
      previewUncertain = true;
      console.log("Preview invalidated; waiting for committed readback.");
    }
  }
  const result = await interaction.result();
  console.log("Status:", result.status);
  const { data: display } = await result.run.items();
  console.log("Replace preview with committed Items:", display.items);
  if (!display.complete)
    console.log("Run is not sealed; refresh this exact Run later.");
  if (display.dropped > 0)
    console.log("Earlier display Items were dropped:", display.dropped);
  if (previewUncertain)
    console.log("Do not reuse the old event preview after reconciliation.");
} finally {
  client.close();
}
```

Run it with the same three environment variables as [conversation.mjs](01-setup-and-conversations.md). During execution you may see provisional event objects; after completion or a pause you see the result status and saved Items. If the Run finishes before stream attachment, there may be no live events at all. `result.output` is optional structured Run output, not necessarily the conversation transcript.

## Reconcile a UI after gaps or truncation

Treat stream deltas as an ephemeral preview. On `gap` or `reset`, invalidate that preview and read `result.run.items()` (or the bound Run's `items()` while it is active); replace, rather than append to, what the UI rendered from deltas. This example suppresses later deltas until final readback. For a continuously updating UI, refresh committed Items during the run and rebuild the view from each snapshot, optionally continuing live preview only after your application has reconciled a trustworthy stream cursor. The returned `complete` flag means the Run is sealed, including waiting/failed/cancelled as well as completed: when false, refresh the **same Run** later instead of claiming its Items are final. `dropped > 0` means some earlier display Items are no longer retained; the readback is authoritative for retained Items but cannot reconstruct those missing Items. Do not advertise a lossless full transcript when either condition applies.

The iterator yields frames attributed to this submitted input's incorporating Run and stops on completed/failed/cancelled/waiting even if the SSE socket is idle. Retained events can sometimes replay on attachment, but trimming, filtering and gaps prevent a lossless-history promise. Raw Thread-wide SSE is available through `client.resources.threads.ref(threadId).stream.get({query:{run,position},lastEventId,signal})`; its caller owns the binary body, framing and cursor reconciliation. The default finite iterator does not silently fetch/apply Items or suppress output using an invented display baseline.

## Open raw SSE from an applied snapshot

For an application that already applies committed Items, the native stream operation supports an explicit coverage baseline. This fragment belongs inside the client `try` block above, after you have obtained `result`; replace the `console.log` with your application's snapshot replacement before opening the stream:

```js
const { data: snapshot } = await result.run.items();
console.log("Apply committed snapshot first:", snapshot.items);
if (snapshot.position !== null) {
  const raw = await client.resources.threads
    .ref(interaction.thread.id)
    .stream.get({
      query: { run: result.run.id, position: snapshot.position },
      ...(snapshot.resume_after ? { lastEventId: snapshot.resume_after } : {}),
      signal: AbortSignal.timeout(5000),
    });
  try {
    console.log("Owned raw SSE:", raw.response.headers.get("Content-Type"));
    // Parse raw.body with your application's SSE reader, or pass it to a renderer.
  } finally {
    await raw.close();
  }
}
```

`run` and `position` must be supplied together. `position` is canonical `attempt-sequence` display coverage, not the Redis `Last-Event-ID`; `resume_after` is an optional confirmed Redis ID covered by that snapshot. Missing/expired/incompatible hints fall back to retained replay filtered by coverage and do not by themselves imply loss. Covered deltas are skipped by Service before decoding; boundaries remain visible. Without a coverage baseline, leave both query parameters out; do not manufacture a position from a cursor. Before the first checkpoint, Items may have `position: null` and no useful hint.

Typed finite `gap` events preserve `event.frame.data.position` when provided. A non-null value identifies the position a replacement snapshot must cover; omission/null means the target is unknown, not that no output was lost. Do not advance complete application coverage across the hole using subsequent deltas. On `reset`, discard superseded provisional output and read a new snapshot; coverage from the previous attempt cannot seed the next attempt. Applying that snapshot and rebuilding a raw reader are application-owned operations, not an SDK recovery facade. Even a sealed snapshot can have dropped/truncated Items.

An early loop break or `interaction.close()` cancels local observation, including a pending `result()`; do not expect another `result()` call to restart it. For final-only output, skip iteration and call `result()` directly—this opens no SSE. Neither closing nor aborting a local stream interrupts the remote Run; `result.run.interrupt()` is a separate, explicit mutation. Continue with [waiting tools](03-waiting-and-tools.md) or [timeout recovery](07-errors-and-recovery.md).

## Keep AG-UI 1.0 payloads and inline child attribution intact

A `delta` frame's Service envelope has `run_id`, `attempt` and `sequence`. Its `event` is the native AG-UI 1.0 object: standard identifiers are camelCase (`messageId`, `toolCallId`, `runId`), `RUN_STARTED` carries `protocolVersion:"1.0"`, and tool results can contain an ordered media part list instead of a text string. URL and provider-file sources remain distinct. Do not stringify those parts into a root text transcript or invent downloadable URLs for file handles.

Inline child events share their parent's Service envelope but carry `subagentRunId`. Keep that attribution with the native message/tool ID—child and root IDs can otherwise collide. `SUBAGENT_FINISHED`/`SUBAGENT_ERROR` finish a child presentation, not the root Service Run. Even `RUN_FINISHED` is observation: the finite Interaction ends using its exact authoritative Service Run read, not a payload-level terminal heuristic. The SDK preserves unknown `CUSTOM` payloads, required nulls, content metadata and media descriptors without adding an event registry or legacy-name fallback.

`a13n.input.user` and `a13n.input.steering` are authored input; `a13n.input.context`, recovery and other generated sources are system observations, not additional user messages. `a13n.input.media` descriptors retain native kind and annotations and can mark omitted binary payloads. Honor `metadata.display:false` in your presentation and preserve attribution; those annotations confer no permission to fetch a resource. Custom fragments require application-owned assembly and gap handling if interpreted; the SDK deliberately provides no reconstruction engine. Retained Items are still subject to truncation and dropped history.
