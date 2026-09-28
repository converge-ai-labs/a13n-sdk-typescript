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
    console.log("Display is still incomplete; refresh this exact Run later.");
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

Treat stream deltas as an ephemeral preview. On `gap` or `reset`, invalidate that preview and read `result.run.items()` (or the bound Run's `items()` while it is active); replace, rather than append to, what the UI rendered from deltas. This example suppresses later deltas until final readback. For a continuously updating UI, refresh committed Items during the run and rebuild the view from each snapshot, optionally continuing live preview only after your application has reconciled a trustworthy stream cursor. The returned `complete` flag describes the display snapshot: when false, refresh the **same Run** later instead of claiming its Items are final. `dropped > 0` means some earlier display Items are no longer retained; the readback is authoritative for retained Items but cannot reconstruct those missing Items. Do not advertise a lossless full transcript when either condition applies.

The iterator yields frames attributed to this submitted input's incorporating Run and stops on completed/failed/cancelled/waiting even if the SSE socket is idle. Retained events can sometimes replay on attachment, but trimming, filtering and gaps prevent a lossless-history promise. Raw Thread-wide SSE is available through `client.resources.threads.ref(threadId).stream.get({lastEventId,signal})`; its caller owns the binary body and cursor reconciliation.

An early loop break or `interaction.close()` cancels local observation, including a pending `result()`; do not expect another `result()` call to restart it. For final-only output, skip iteration and call `result()` directly—this opens no SSE. Neither closing nor aborting a local stream interrupts the remote Run; `result.run.interrupt()` is a separate, explicit mutation. Continue with [waiting tools](03-waiting-and-tools.md) or [timeout recovery](07-errors-and-recovery.md).
