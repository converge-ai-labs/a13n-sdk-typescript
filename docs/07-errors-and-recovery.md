# Timeouts, errors and uncertain submissions

A timeout or connection failure is not proof that Service rejected your message. Keep one idempotency key with each **logical request**, save the body and returned IDs when available, and use the same key/body if you deliberately replay after reconciliation. A fresh key may create another message. No SDK write is automatically retried.

## Submit once and persist the receipt

The following server-side Node.js example expects `A13N_REQUEST_KEY` to have been persisted by your application **before** submission, in addition to the URL, API key and Agent ID from [setup](01-setup-and-conversations.md). Do not regenerate that key on an uncertain retry:

```js
import {
  ApiError,
  SubmissionDispositionError,
  WaitTimeoutError,
  createClient,
} from "@converge.ai/a13n";

const key = process.env.A13N_REQUEST_KEY;
if (!key)
  throw new Error("Persist A13N_REQUEST_KEY before making this request.");
const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
try {
  const agent = client.agents.ref(process.env.A13N_AGENT_ID);
  const interaction = await agent.start("Summarize the release plan.", {
    idempotencyKey: key,
  });
  console.log(
    "Accepted Thread:",
    interaction.thread.id,
    "Entry:",
    interaction.entry.id,
  );
  const result = await interaction.result({ timeoutMs: 30_000 });
  console.log("Run:", result.run.id, "status:", result.status);
  if (result.status === "completed") {
    console.log((await result.run.items()).data.items);
  } else console.log(result.pending ?? result.failure);
} catch (error) {
  if (error instanceof WaitTimeoutError) {
    console.error("Local wait expired; the remote Run may still proceed.");
  } else if (error instanceof SubmissionDispositionError) {
    console.error(
      "Entry settled without running:",
      error.entryId,
      error.status,
    );
  } else if (error instanceof ApiError) {
    console.error(
      "Service rejected request:",
      error.status,
      error.code,
      error.requestId,
    );
  } else {
    console.error("Network/cancellation outcome may be unknown:", error);
    throw error;
  }
} finally {
  client.close();
}
```

With a completed Run you get exact Run identity and committed Items. If the 30-second local deadline expires, the script reports the timeout; it does **not** interrupt execution. The default `interaction.result()` deadline is 300 seconds, with 500-ms polling. Specify `{timeoutMs,pollIntervalMs,signal}` on the **first** `result()` call if you need different limits; beginning stream iteration starts the same observer using defaults. `AbortSignal`, early iterator break, `interaction.close()` and `client.close()` stop local work only. Call `run.interrupt()` only when a remote interruption is intended.

## Recover with saved Thread and Entry IDs

Persist both `interaction.thread.id` and `interaction.entry.id` alongside the original body and idempotency key **before** awaiting `result()`. Set `A13N_THREAD_ID` and `A13N_ENTRY_ID` to those saved values and run this `recover.mjs` in another process. It waits for **consumed**, then binds only the `assigned_run_id` from that Entry; an earlier `assigned` state may roll back to pending. The function does not infer the Run from Thread history or follow a newer Run:

```js
import { createClient } from "@converge.ai/a13n";

async function recoverSubmitted(client, threadId, entryId) {
  const signal = AbortSignal.timeout(30_000);
  const entry = client.threads.ref(threadId).entry(entryId);
  while (true) {
    signal.throwIfAborted();
    const snapshot = await entry.get({ signal });
    const state = snapshot.data;
    if (state.id !== entryId || state.thread_id !== threadId)
      throw new Error("Service returned a different Entry.");
    if (state.status === "failed" || state.status === "withdrawn")
      throw new Error(`Entry ${entryId} settled as ${state.status}.`);
    if (state.status === "consumed") {
      if (!state.assigned_run_id)
        throw new Error("Consumed Entry has no incorporating Run ID.");
      const exactRun = client.runs.ref(state.assigned_run_id);
      const outcome = await exactRun.wait({ signal, timeoutMs: 30_000 });
      if (outcome.snapshot.data.thread_id !== threadId)
        throw new Error("Run belongs to a different Thread.");
      return outcome;
    }
    // An assigned Entry can revert to pending; neither is incorporation.
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

if (!process.env.A13N_THREAD_ID || !process.env.A13N_ENTRY_ID)
  throw new Error("Set the saved A13N_THREAD_ID and A13N_ENTRY_ID.");
const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
try {
  const outcome = await recoverSubmitted(
    client,
    process.env.A13N_THREAD_ID,
    process.env.A13N_ENTRY_ID,
  );
  console.log("Exact Run:", outcome.run.id, "status:", outcome.status);
  if (outcome.status === "completed")
    console.log((await outcome.run.items()).data.items);
  else console.log(outcome.pending ?? outcome.failure);
} finally {
  client.close();
}
```

The 30-second bound is local; an expiration means observe again later, not that the remote Run was cancelled. The saved Entry may also have failed or been withdrawn, in which case this function stops instead of selecting a different Run. If no IDs were ever received, replay the **original** `agent.start` or `agent.send` request with the identical body and persisted idempotency key from the submission example; its returned receipt provides the IDs to save. Do not generate a new key for uncertain dispatch. If neither key nor IDs were saved, do not guess whether a new request would duplicate work—reconcile with your application's records or Service operator first. A `SubmissionDispositionError` from `interaction.result()` carries the failed/withdrawn Entry snapshot, not a successful Run.

## Interpret errors without retrying blindly

For HTTP errors, `ApiError` exposes status, code, details, request ID and retry-after. Treat `401` as an authentication issue, `403` as missing permission or CSRF, `409` as state/idempotency conflict, `412` as an obsolete ETag, and `428` as a missing precondition; inspect the structured details rather than parsing the message. A conditional write that receives `412` should read the latest state before deciding on a new update. `ProtocolError` means a response or stream could not be interpreted. Platform Fetch failures may carry implementation-specific information; avoid logging credentials or sensitive payloads.
