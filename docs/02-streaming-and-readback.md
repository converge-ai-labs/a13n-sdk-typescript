# Stream live updates and read committed output

To show progress while an Agent runs, use the same Service URL, API key and Agent ID as in [client setup](01-setup-and-conversations.md). The interaction is both a finite async iterator and the source of its final result; you do not need a second stream.

## Preview string chunks, then read the authoritative output

Use the same client setup and Agent ID as below. The ordinary reply needs no Items read:

```js
import { PreviewInterruptedError } from "@converge.ai/a13n";

const live = await agent.start("Explain the release plan.");
try {
  try {
    for await (const chunk of live.textStream()) process.stdout.write(chunk);
  } catch (error) {
    if (!(error instanceof PreviewInterruptedError)) throw error;
    console.error("Preview stopped:", error.message);
  }
  const result = await live.result();
  console.log(result.status, result.text ?? result.output);
} finally {
  await live.close();
}
```

Preview emits only root assistant string CONTENT matched to trustworthy START. Child `subagentRunId` and `metadata.display:false` events are excluded. A trustworthy hidden START retains suppression for its message ID until END, even when subsequent chunks omit metadata; it shares the bounded active-ID state. At most eight active root message IDs are tracked, not a transcript buffer; exhaustion interrupts rather than evicts. Gap/reset, missing/ambiguous starts, non-string content, unmatched ends and trustworthy same-Service-domain delta discontinuities raise sticky `PreviewInterruptedError`. A boundary beyond the received Service delta sequence proves missing delivery and interrupts; equal/late boundaries never regress the high-water mark or repair text. A first boundary establishes only a position coordinate, not message content. Redis cursors and embedded AG-UI sequence values are unrelated domains, not inferred text holes; filtered foreign Runs do not affect preview continuity.

Unrelated unknown CUSTOM events are ignored by preview and preserved by raw access. An unexcluded root `CUSTOM` named `a13n.stream.fragment` interrupts conservatively because its value is a slice of original CUSTOM JSON, not a text suffix. No substring parsing, fragment assembly, baseline repair or reducer is performed; this is an unsupported-framing limitation, not a claim that all fragments contain assistant text.

Interruption stops only preview: result remains available, and deliberate sequential raw access may continue while open. No concurrent raw/text consumers or multiple previews are supported. A preview break leaves local observation open; use `finally { await live.close(); }`. Joined close cancels owned transport reads even when the public iterator is paused. Final output is authoritative independently of preview completeness.

## Read native events and application-owned committed Items

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
  if ((display.items[0]?.ordinal ?? 0) > 1)
    console.log("Earlier Items exist; page them explicitly by ordinal.");
  if (previewUncertain)
    console.log("Do not reuse the old event preview after reconciliation.");
} finally {
  client.close();
}
```

Run it with the same three environment variables as [conversation.mjs](01-setup-and-conversations.md). During execution you may see provisional event objects; after completion or a pause you see the result status and saved Items. If the Run finishes before stream attachment, there may be no live events at all. `result.output` is optional structured Run output, not necessarily the conversation transcript.

## Reconcile a UI after gaps or truncation

Treat stream deltas as an ephemeral preview. On `gap` or `reset`, invalidate that preview and read the exact Run's Items; replace the displayed preview rather than appending to it. This example suppresses later deltas until final readback. `complete` means the Run is sealed, including waiting/failed/cancelled as well as completed. When false, refresh the **same Run** later. An Items read carries no stream position or cursor and cannot prove that a missing stream range is covered. The default result is a recent window, not all history; earlier Items remain available through ordinal paging and content can still be truncated. Use the native Session stream below for an application-owned snapshot-to-live display.

The iterator yields frames attributed to this submitted input's incorporating Run and stops on completed/failed/cancelled/waiting even if the SSE socket is idle. Retained events can sometimes replay on attachment, but trimming, filtering and gaps prevent a lossless-history promise. Raw Thread-wide SSE is available through `client.api.threads.ref(threadId).stream.get({query:{run,position},lastEventId,signal})`; its caller owns the binary body, framing and cursor reconciliation. The default finite iterator does not silently fetch/apply Items or suppress output using an invented display baseline.

## Page earlier display Items

Use the same native query shape on the Run handle and generated resource. `before >= 1` and `after >= 0` are mutually exclusive; `limit` defaults to 200 with a maximum of 500. These are dense 1-based **ordinals**, not Redis IDs or generic collection cursors:

```js
const { data: recent } = await result.run.items({ query: { limit: 20 } });
const first = recent.items[0]?.ordinal;
if (first !== undefined && first > 1) {
  const { data: older } = await result.run.items({
    query: { before: first, limit: 20 },
  });
  console.log("Historical page only:", older.items);
  // A historical page does not establish live stream coverage.
}
```

An unwindowed read (including a custom `limit` without `before`/`after`) includes the newest limit **plus the whole mutable tail**, so it may exceed the requested limit. Explicit `after:0` is an ordinal window. `complete:true` means the Run is sealed, not that all history was fetched. The SDK does not automatically load unlimited pages.

## Track a Thread stream explicitly

Raw Thread SSE remains available through `client.api.threads.ref(threadId).stream.get({signal})`. If your application already tracks applied stream progress, it may explicitly pass `{query:{run,position},lastEventId,signal}`. `run` and `position` belong together. The canonical `attempt-sequence` position differs from the Redis `Last-Event-ID`; neither comes from an Items read. Starting from Items, leave both query parameters out and inspect retained output, `boundary` and `gap`, or use Session snapshots.

Typed finite `gap` events preserve an optional nullable target `event.frame.data.position`. A later Items read does not prove coverage of that target. On `reset`, discard superseded provisional output and read the exact Run; previous-attempt progress cannot seed the next attempt. The finite Interaction retains its exact-Run termination and does not silently recover display state.

## Consume one native Session connection

Save this complete program as `session-stream.mjs`. Set `A13N_SESSION_ID` to an existing Session alongside the Service URL and API token. It prints native typed frames and exits after the first snapshot; replace that break with application-owned processing when following live output.

```js
import { createClient, sessionStream } from "@converge.ai/a13n";

const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
try {
  const signal = AbortSignal.timeout(5000);
  const response = await client.api.sessions
    .ref(process.env.A13N_SESSION_ID)
    .stream.get({ signal });
  try {
    console.log("Request:", response.response.headers.get("X-Request-Id"));
    for await (const frame of sessionStream(response, { signal })) {
      console.log(frame.type, frame.data);
      break; // Early return releases this response, not remote execution.
    }
  } finally {
    await response.close();
  }
} finally {
  client.close();
}
```

`SessionStreamFrame` is a discriminated union generated from the pinned Session schema; `SessionStreamSchemas` exposes its nested models, including recursive display continuation. A `thread` replaces Thread state, current/last Runs and ordered inbox entries. `items` replaces that Run's Items from ordinal `first` onward, leaving earlier Items final; `complete` marks the final display. `delta` preserves native AG-UI and ItemRef data with Thread/Run identity. `gap` marks lost output: Service holds that Run's deltas until a covering `items` frame. `schedule` carries schedule configuration/progress and `occurrence` carries an occurrence update. `app_ready` follows committed Items with App references, can repeat, and identifies readiness by `(run_id, app_id)` without a delta sequence. Provisional `a13n.mcp_apps` events alone do not establish readiness; opening committed Apps remains explicit. The SDK validates known frames against the complete pinned JSON Schema without applying or assembling their contents. Validators are generated ahead of time and need no runtime compiler or evaluation. Session snapshots may exceed the Thread parser's 1 MiB frame cap; Session has no default SDK cap. An application may opt into a positive `maxFrameCharacters` limit (UTF-16 code units), with an oversized frame ending local observation. Unknown event names are ignored; known malformed envelopes, invalid UTF-8, truncated frames and explicit SSE IDs raise `ProtocolError` and close the response.

The decoder owns **one connection** and performs no reconnect. Every new Session connection starts from a fresh snapshot, with no SSE ID, Last-Event-ID or position query. A caller implementing reconnect discards unfinished displays and replaces them with the new snapshot; a Run sealed while disconnected is read through Items. `items.continuation` is native display parsing state, never a Thread cursor or agent-resume token. Follow the pinned reconnect policy: stop on invalid frames or 4xx other than 429; otherwise wait `Retry-After` for 429/503, or full jitter below `min(30s,0.5s*2^n)` for consecutive failures, resetting the failure count after 30 seconds open. Closing/aborting only ends local observation. The finite Interaction remains the ordinary one-input/exact-Run API; Session consumption adds no automatic successor-follow or UI reducer.

An early **raw** loop break or `await interaction.close()` cancels local observation, including a pending `result()`; do not expect another `result()` call to restart it. For final-only output, skip iteration and call `result()` directly—this opens no SSE. Neither closing nor aborting a local stream interrupts the remote Run; `result.run.interrupt()` is a separate, explicit mutation. Continue with [waiting tools](03-waiting-and-tools.md) or [timeout recovery](07-errors-and-recovery.md).

## Keep AG-UI 1.0 payloads and inline child attribution intact

A `delta` frame's Service envelope has `run_id`, `attempt`, `sequence`, `event` and required nullable `item`. A non-null ItemRef retains optional nullable `ordinal`, `response_group` and arbitrary JSON-mapping `failure` diagnostics. Its `event` is the native AG-UI 1.0 object: standard identifiers are camelCase (`messageId`, `toolCallId`, `runId`), `RUN_STARTED` carries `protocolVersion:"1.0"`, and tool results can contain an ordered media part list instead of a text string. URL and provider-file sources remain distinct. Do not stringify those parts into a root text transcript or invent downloadable URLs for file handles.

Inline child events share their parent's Service envelope but carry `subagentRunId`. Keep that attribution with the native message/tool ID—child and root IDs can otherwise collide. `SUBAGENT_FINISHED`/`SUBAGENT_ERROR` finish a child presentation, not the root Service Run. Even `RUN_FINISHED` is observation: the finite Interaction ends using its exact authoritative Service Run read, not a payload-level terminal heuristic. The SDK preserves unknown `CUSTOM` payloads, required nulls, content metadata and media descriptors without adding an event registry or legacy-name fallback.

`a13n.input.user` and `a13n.input.steering` are authored input; `a13n.input.context`, recovery and other generated sources are system observations, not additional user messages. `a13n.input.media` descriptors retain native kind and annotations and can mark omitted binary payloads. Honor `metadata.display:false` in your presentation and preserve attribution; those annotations confer no permission to fetch a resource. Custom fragments require application-owned assembly and gap handling if interpreted; the SDK deliberately provides no reconstruction engine. Item content remains subject to truncation; older Items are accessible through ordinal windows.
