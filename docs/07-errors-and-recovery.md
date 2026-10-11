# Timeouts, errors and uncertain submissions

A timeout or connection failure is not proof that Service rejected your message. No SDK mutation is automatically retried. High-level start/send/resume may omit a key; the SDK chooses one browser-compatible random key before dispatch and exposes it on a returned Interaction. Durable jobs instead persist their own key and identical logical body **before** sending. A fresh key can duplicate work, and a generated key is not promised recoverable from a cancelled invocation that never returned.

## Submit once and persist the receipt

This example expects `A13N_REQUEST_KEY` to have been persisted before submission, with the URL, key and Agent ID from [setup](01-setup-and-conversations.md):

```js
import {
  ApiError,
  SubmissionUnknownError,
  SubmissionDispositionError,
  WaitTimeoutError,
  createClient,
} from "@converge.ai/a13n";

const key = process.env.A13N_REQUEST_KEY;
if (!key) throw new Error("Persist A13N_REQUEST_KEY and body before dispatch.");
const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
try {
  const interaction = await client.agents
    .ref(process.env.A13N_AGENT_ID)
    .start("Summarize the release plan.", { idempotencyKey: key });
  try {
    // Persist these IDs with the original key/body before awaiting result.
    console.log("Accepted identity:", interaction.identity);
    const result = await interaction.result({ timeoutMs: 30_000 });
    console.log(result.runId, result.status, result.text ?? result.output);
  } finally {
    await interaction.close();
  }
} catch (error) {
  if (error instanceof SubmissionUnknownError) {
    console.error(
      "Reconcile before any deliberate replay:",
      error.operation,
      error.idempotencyKey,
      error.identities,
    );
    // error.cause is the original Fetch/cancellation/protocol failure, not proof of rollback.
  } else if (error instanceof WaitTimeoutError) {
    console.error(
      "Local observation expired; remote execution may still proceed.",
    );
  } else if (error instanceof SubmissionDispositionError) {
    console.error(
      "Entry settled without incorporation:",
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
    // Pre-dispatch auth/validation/cancellation retains its native error.
    throw error;
  }
} finally {
  client.close();
}
```

`SubmissionUnknownError` means a mutation was actually attempted without reliable acknowledgement, including malformed accepted JSON or receipt identity. It retains the chosen key, safe operation/known IDs and original `cause`, not the body or auth. A canonical Service rejection envelope remains `ApiError`. A bare/noncanonical gateway status (for example, HTML 504 or an unreadable error body) is unknown acknowledgement: its native ApiError status and original body read/parse cause are retained in the cause chain. Low-level resources still return ApiError. Pre-dispatch validation/auth/cancellation is **not** an unknown outcome. Recover or deliberately replay the identical key/body only after reconciling; never treat cancellation as rollback.

The default local observation limit is 300 seconds with 500-ms polling. One deadline spans Entry, exact Run and SSE/readback. Specify `{timeoutMs,pollIntervalMs,signal}` on the first result call, or when constructing Run/Entry observations; repeated result/iteration cannot restart it. Absolute caller AbortSignals include earlier mutation time. `await interaction.close()` joins local observer and reader cleanup without interrupting remote execution. A completed result remains readable; a closed pending one cannot restart. Raw iterator break closes locally; preview break/interruption leaves an explicit lifetime for `finally` cleanup.

## Recover with saved Thread and Entry IDs

Persist `interaction.identity.threadId` and `.entryId` alongside the original body/key. Set `A13N_THREAD_ID` and `A13N_ENTRY_ID`, then run this in a fresh process:

```js
import { createClient } from "@converge.ai/a13n";

if (!process.env.A13N_THREAD_ID || !process.env.A13N_ENTRY_ID)
  throw new Error("Set the saved Thread and Entry IDs.");
const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
const recovered = client.threads
  .ref(process.env.A13N_THREAD_ID)
  .entry(process.env.A13N_ENTRY_ID)
  .interaction({ timeoutMs: 30_000 });
try {
  // Construction is local: no POST, GET, fabricated receipt or invented key.
  const outcome = await recovered.result();
  console.log(
    outcome.threadId,
    outcome.runId,
    outcome.status,
    outcome.text ?? outcome.output,
  );
} finally {
  await recovered.close();
  client.close();
}
```

Recovery uses the same finite core: wait for **consumed**, bind only that Entry's exact `assigned_run_id`, then read that Run. Assignment can revert to pending; Thread history or latest pointers cannot select its outcome. A failed/withdrawn Entry raises `SubmissionDispositionError` instead of following an unrelated Run. A fresh recovery observation has a fresh explicit budget, not an extension of the old observer.

For a saved exact Run ID, use `client.runs.ref(runId).observe({timeoutMs:30_000})` for the same result/raw/preview workflow, or `client.runs.ref(runId).result({timeoutMs:30_000})` for result-only observation. The authored `Run.wait()` shape is removed. These helpers never follow successor Runs. Recovered identities have no original receipt; `interaction.run` is authoritative only after Entry consumption or a validated exact read. `receiptRun` is explicitly provisional submission evidence.

If no IDs were received, `SubmissionUnknownError.idempotencyKey` or your persisted key identifies the original logical request for deliberate reconciliation/replay. If neither key nor IDs were saved, do not guess whether another request would duplicate work—reconcile with application records or the Service operator.

## Interpret native evidence without retrying blindly

`ApiError` retains status, code, details, request ID and retry-after. A conditional write receiving `412` needs a current read and a new decision, not blind overwrite. `ProtocolError` means native response/stream interpretation failed; malformed accepted high-level submission receipts are instead wrapped as unknown acknowledgement with their original cause. `PreviewInterruptedError` stops only text projection, not a still-open result observer. Native resources retain their HTTP/error/ETag semantics. Fetch causes can contain implementation-specific diagnostics; avoid logging credentials or sensitive payloads.
