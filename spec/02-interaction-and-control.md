# Interaction and Durable Control

Service owns acceptance, concurrency and durable execution. This contract binds those semantics to explicit TypeScript references and Promise results. References and response evidence follow [resources and client lifetime](01-resources-and-client-lifetime.md); stream behavior follows [observation](03-observation-and-data-access.md).

The examples and interfaces below describe the public contract, not a standalone implementation. Generated request and receipt aliases refer to `components["schemas"]`; application helpers and supplied values in examples are illustrative.

```typescript
try {
  const accepted = await agent.start("Review this change", {
    idempotencyKey: startKey,
    signal: requestSignal,
    body: { environment: null },
  });
  const run = accepted.run;
  const stream = run.stream({
    signal: observationSignal,
    after: appliedCursor,
  });
  try {
    for await (const observation of stream) {
      await applyAndCheckpoint(observation);
    }
  } finally {
    await stream.close();
  }

  const sealed = await run.wait({ timeoutMs: 60_000 });
  switch (sealed.data.status) {
    case "completed":
      useOutput(sealed.data.output, sealed.data.output_text);
      break;
    case "waiting":
      presentPendingActions(sealed.data.pending);
      break;
    default:
      showRunState(sealed.data);
  }
} finally {
  client.close();
}
```

The application supplies keys, signals, applied checkpoints and output validation. The example does not infer business success from stream exhaustion. When no applied cursor exists, omit `after`; examples using `exactOptionalPropertyTypes` must not pass an explicit undefined optional value.

## Acceptance values

Use a discriminated union, not an object containing optional `run?` and `queuedSubmission?` fields:

```typescript
interface RunAccepted<Receipt> {
  readonly outcome: "run_accepted";
  readonly run: Run;
  readonly thread: Thread;
  readonly session: Session;
  readonly receipt: ResourceResult<Receipt>;
}

interface SubmissionQueued {
  readonly outcome: "queued";
  readonly queuedSubmission: QueuedSubmission;
  readonly thread: Thread;
  readonly receipt: ResourceResult<ThreadRunSubmissionReceipt>;
}

type ThreadSubmission =
  RunAccepted<ThreadRunSubmissionReceipt> | SubmissionQueued;
```

`agent.start` returns `RunAccepted<RunAcceptanceReceipt>`. `thread.submit` returns `ThreadSubmission` and keeps the complete outer receipt, including queue generation. References are constructed from validated receipt identity fields without follow-up reads. Contradictory or incomplete dispositions are `ProtocolError`, never partly successful wrappers. The wrapper does not forward `.stream()` or `.wait()`; use `.run` explicitly.

```typescript
const submission = await thread.submit("Follow up", {
  idempotencyKey: submissionKey,
  body: { expected_thread_version: observedThreadVersion },
});
if (submission.outcome === "run_accepted") {
  await observe(submission.run);
} else {
  showQueued(
    submission.queuedSubmission,
    submission.receipt.data.queue_version,
  );
}
```

## Commands and queueing

| Method                                              | Result and invariant                                                                                      |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `agent.start(input, options)`                       | Start using the bound Agent; return actual Session/Thread/Run identities. No hidden conversation state.   |
| `thread.submit(input, options)`                     | Exact accepted-or-queued disposition; explicit Thread version.                                            |
| `run.get(options?)`                                 | Fresh `ResourceResult<RunResource>`.                                                                      |
| `run.wait({ timeoutMs, pollIntervalMs?, signal? })` | Fresh sealed exact-Run result; no event-derived cache or successor following.                             |
| `run.steer(input, { idempotencyKey, signal? })`     | `ResourceResult<SteerReceipt>`; acceptance is not incorporation.                                          |
| `run.steers.ref(id).get(options?)`                  | Pending/consumed/superseded evidence under the original accepted-against Run.                             |
| `run.cancel(body, { idempotencyKey, signal? })`     | `ResourceResult<InterruptReceipt>`; body is generated `InterruptRequest` with both expected versions.     |
| `run.feedback(body, options)`                       | Exact `WaitingRunFeedbackRequest`, sealed-state digest and Thread version; new successor acceptance.      |
| `run.retry(body, options)`                          | Exact `RetryRunRequest`; a new Run, not Attempt recovery or replacement intent.                           |
| `run.continueFrom(body, options)`                   | Exact `ContinueRunRequest`; use the explicit eligible historical source.                                  |
| `run.fork(body, options)`                           | Exact `ForkRunRequest`; new child Thread and Run within the existing Session.                             |
| `thread.queuedSubmissions.ref(id).get()/wait(...)`  | Observe one entry; never consume or wait for its resulting Run to finish.                                 |
| Entry `update` / `delete`                           | Explicit mutation with the exported entry preconditions.                                                  |
| Queue `reorder` / `consume`                         | Explicit queue commands and queue-generation preconditions; consume reports actual acceptance or failure. |

Successor commands return `RunAccepted<RunAcceptanceReceipt>` and never retarget the source Run. Validate returned lineage against the command's actual contract. A Run fork is not a Session fork. Waiting-default continuation uses the Thread submission contract with explicit `waiting_resolution`, not the historical `continueFrom` route.

`run.cancel` is the resource convenience name for Service interrupt. Durable cancellation receipt is stronger than merely enqueuing a request but does not prove tool/provider process termination or rollback of external effects. Concurrent controls retain Service ordering; Promise creation order does not supply transactional ordering.

Queue waiting returns the final entry representation (`consumed` or `failed`) and its evidence, not a made-up submission wrapper. A consumed entry exposes `consumed_run_id`; disappearance is an actual not-found failure, not fabricated withdrawal or acceptance. Thread version, queue version, entry version and Run version are separate axes.

## Bounded waits

`timeoutMs` is required, finite and positive. `pollIntervalMs` defaults to 500 and, when supplied, is finite and positive. One total deadline includes all requests, bounded safe-read retries and sleeps. Polling is lazy and serial, and each read is bounded by the remaining deadline. Errors do not silently restart the total deadline.

Known sealed statuses are `completed`, `failed`, `cancelled`, and `waiting`. All return normally; callers inspect status. Unknown runtime statuses remain visible on reads and do not qualify as sealed. A wait timeout rejects with a distinct `WaitTimeoutError`; caller abort rejects with its `AbortSignal.reason`. Neither sends remote cancellation. Output/pending JSON is not cast to an application type merely by calling `wait<T>()`; output validation remains explicit application code.
