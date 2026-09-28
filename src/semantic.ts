import { ProtocolError } from "./errors.js";
import type { components } from "./schema.js";
import type { ServiceResources } from "./resources/generated.js";
import type { ResourceResult } from "./resources/base.js";
import {
  observation,
  textPayload,
  waitForRun,
  type WaitOptions,
} from "./resources/interaction.js";
import { abortable, delay } from "./transport.js";
import { threadStream, type ThreadEvent } from "./streams/thread-stream.js";

type Schema = components["schemas"];
export type MessageInput = string | Schema["MessagePayload"];
export type StartOptions = Omit<Schema["NewThread"], "agent_id" | "payload"> & {
  idempotencyKey: string;
  signal?: AbortSignal;
};
export type SendOptions = Omit<Schema["Message"], "agent_id" | "payload"> & {
  idempotencyKey: string;
  signal?: AbortSignal;
};

/** The Entry was settled without incorporation. Keep the safe IDs and original evidence. */
export class SubmissionDispositionError extends Error {
  override readonly name = "SubmissionDispositionError";
  readonly threadId: string;
  readonly entryId: string;
  readonly status: "failed" | "withdrawn";
  constructor(readonly snapshot: ResourceResult<Schema["EntryView"]>) {
    super(`Submission entry ${snapshot.data.id} was ${snapshot.data.status}.`);
    this.threadId = snapshot.data.thread_id;
    this.entryId = snapshot.data.id;
    this.status = snapshot.data.status as "failed" | "withdrawn";
  }
}

/** Immutable projection of an authoritative exact-Run read, not an inferred stream result. */
export class RunOutcome {
  constructor(
    readonly run: RunHandle,
    readonly snapshot: ResourceResult<Schema["RunView"]>,
  ) {}
  get status() {
    return this.snapshot.data.status;
  }
  get output() {
    return this.snapshot.data.output;
  }
  get pending() {
    return this.snapshot.data.pending;
  }
  get failure() {
    return this.snapshot.data.failure;
  }
}

export class RunHandle {
  constructor(
    readonly id: string,
    private readonly resources: ServiceResources,
    private readonly shutdown: AbortSignal,
    /** Original resume receipt when this handle was returned from resume(). */
    readonly receipt?: ResourceResult<Schema["RunView"]>,
  ) {}

  get(options: { signal?: AbortSignal } = {}) {
    return this.resources.runs.ref(this.id).get(options);
  }

  /** Observe only this Run; waiting/failed/cancelled are distinct from completed. */
  async wait(options: WaitOptions = {}): Promise<RunOutcome> {
    const snapshot = await waitForRun(
      async (request) => {
        const result = await this.resources.runs.ref(this.id).get(request);
        if (result.data.id !== this.id)
          throw new ProtocolError("Service returned a different Run.");
        return result;
      },
      this.shutdown,
      options,
    );
    return new RunOutcome(this, snapshot);
  }

  /** Committed Run Items; stream deltas are not a replacement for this readback. */
  items(options: { signal?: AbortSignal } = {}) {
    return this.resources.runs.ref(this.id).items.get(options);
  }

  interrupt(options: { signal?: AbortSignal } = {}) {
    return this.resources.runs.ref(this.id).interrupt(options);
  }

  /** Resume creates a distinct successor; it does not mutate this bound Run's identity. */
  async resume(
    answers: Schema["ResumeRequest"],
    options: { idempotencyKey: string; signal?: AbortSignal },
  ): Promise<RunHandle> {
    const receipt = await this.resources.runs
      .ref(this.id)
      .resume(answers, options);
    return new RunHandle(
      receipt.data.id,
      this.resources,
      this.shutdown,
      receipt,
    );
  }
}

export class ThreadHandle {
  constructor(
    readonly id: string,
    private readonly resources: ServiceResources,
  ) {}

  get(options: { signal?: AbortSignal } = {}) {
    return this.resources.threads.ref(this.id).get(options);
  }

  entry(id: string) {
    return new EntryHandle(id, this.id, this.resources);
  }
}

export class EntryHandle {
  constructor(
    readonly id: string,
    readonly threadId: string,
    private readonly resources: ServiceResources,
  ) {}

  get(options: { signal?: AbortSignal } = {}) {
    return this.resources.threads
      .ref(this.threadId)
      .inbox.ref(this.id)
      .get(options);
  }
}

class SubmissionObserver {
  readonly thread: ThreadHandle;
  readonly entry: EntryHandle;
  readonly run: RunHandle | null;
  constructor(
    readonly receipt: ResourceResult<Schema["Submitted"]>,
    private readonly resources: ServiceResources,
    private readonly shutdown: AbortSignal,
  ) {
    this.thread = new ThreadHandle(receipt.data.thread.id, resources);
    this.entry = this.thread.entry(receipt.data.entry.id);
    this.run = receipt.data.run
      ? new RunHandle(receipt.data.run.id, resources, shutdown)
      : null;
  }

  /** One observer owns both Entry incorporation and exact-Run termination. */
  async wait(
    options: WaitOptions = {},
    onBound?: (run: RunHandle) => void,
  ): Promise<RunOutcome> {
    const watch = observation(this.shutdown, options);
    try {
      while (true) {
        watch.signal.throwIfAborted();
        const entry = await abortable(
          this.entry.get({ signal: watch.signal }),
          watch.signal,
        );
        if (
          entry.data.id !== this.entry.id ||
          entry.data.thread_id !== this.thread.id
        )
          throw new ProtocolError(
            "Service returned a different submission entry.",
          );
        if (entry.data.status === "failed" || entry.data.status === "withdrawn")
          throw new SubmissionDispositionError(entry);
        if (entry.data.status === "consumed") {
          if (!entry.data.assigned_run_id)
            throw new ProtocolError(
              "Consumed submission has no incorporating Run ID.",
            );
          const run = new RunHandle(
            entry.data.assigned_run_id,
            this.resources,
            this.shutdown,
          );
          onBound?.(run);
          while (true) {
            watch.signal.throwIfAborted();
            const snapshot = await abortable(
              run.get({ signal: watch.signal }),
              watch.signal,
            );
            if (
              snapshot.data.id !== run.id ||
              snapshot.data.thread_id !== this.thread.id
            )
              throw new ProtocolError(
                "Service returned a different incorporating Run.",
              );
            if (
              ["completed", "waiting", "failed", "cancelled"].includes(
                snapshot.data.status,
              )
            ) {
              watch.signal.throwIfAborted();
              return new RunOutcome(run, snapshot);
            }
            await delay(watch.pollIntervalMs, watch.signal);
          }
        }
        // An assigned entry can return to pending at a seal; neither is incorporation.
        await delay(watch.pollIntervalMs, watch.signal);
      }
    } catch (error) {
      if (watch.signal.aborted) throw watch.signal.reason;
      throw error;
    } finally {
      watch.close();
    }
  }
}

/** A finite, single-submission interaction. Its result is an exact committed Run read. */
export class Interaction implements AsyncIterable<ThreadEvent> {
  readonly receipt: ResourceResult<Schema["Submitted"]>;
  readonly thread: ThreadHandle;
  readonly entry: EntryHandle;
  readonly run: RunHandle | null;
  private readonly observer: SubmissionObserver;
  private readonly observationAbort = new AbortController();
  private outcomePromise?: Promise<RunOutcome>;
  private boundPromise?: Promise<RunHandle>;
  private streamAbort?: AbortController;
  private closed = false;
  private iterated = false;

  constructor(
    receipt: ResourceResult<Schema["Submitted"]>,
    private readonly interactionResources: ServiceResources,
    private readonly shutdown: AbortSignal,
    private readonly invocationSignal?: AbortSignal,
  ) {
    this.observer = new SubmissionObserver(
      receipt,
      interactionResources,
      shutdown,
    );
    this.receipt = receipt;
    this.thread = this.observer.thread;
    this.entry = this.observer.entry;
    this.run = this.observer.run;
  }

  /** Result-only usage does not open SSE. The first call fixes observation options. */
  result(options: WaitOptions = {}): Promise<RunOutcome> {
    if (this.outcomePromise) {
      if (Object.keys(options).length)
        throw new TypeError(
          "The interaction observation has already started; set options on its first result() call.",
        );
      return this.outcomePromise;
    }
    if (this.closed) return Promise.reject(this.observationAbort.signal.reason);
    let resolveBound!: (run: RunHandle) => void;
    let rejectBound!: (error: unknown) => void;
    this.boundPromise = new Promise<RunHandle>((resolve, reject) => {
      resolveBound = resolve;
      rejectBound = reject;
    });
    // Result-only callers never await the binding promise.
    void this.boundPromise.catch(() => undefined);
    const signal = AbortSignal.any([
      this.observationAbort.signal,
      ...(this.invocationSignal ? [this.invocationSignal] : []),
      ...(options.signal ? [options.signal] : []),
    ]);
    this.outcomePromise = this.observer.wait(
      { ...options, signal },
      resolveBound,
    );
    void this.outcomePromise.catch(rejectBound);
    return this.outcomePromise;
  }

  /** Stop local observation and streaming; never interrupt the remote Run. */
  close(): void {
    if (this.closed) return;
    this.closed = true;
    const reason = new DOMException("Interaction closed.", "AbortError");
    this.observationAbort.abort(reason);
    this.streamAbort?.abort(reason);
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<ThreadEvent> {
    if (this.iterated)
      throw new TypeError("An interaction may be iterated only once.");
    this.iterated = true;
    if (this.closed) return;
    const outcome = this.result();
    const run = await this.boundPromise!;
    if (this.closed) return;
    const streamAbort = new AbortController();
    this.streamAbort = streamAbort;
    // One completion reaction, independent of how many frames the consumer pulls.
    void outcome.then(
      () => streamAbort.abort(),
      () => streamAbort.abort(),
    );
    const stream = threadStream(
      (options) =>
        this.interactionResources.threads
          .ref(this.thread.id)
          .stream.get(options),
      this.shutdown,
      { signal: streamAbort.signal },
    );
    try {
      for await (const event of stream) {
        if (event.frame.type === "changed") continue;
        if (event.frame.data.run_id === run.id) yield event;
      }
    } catch (error) {
      if (!streamAbort.signal.aborted) throw error;
      await outcome;
    } finally {
      this.close();
    }
    await outcome;
  }
}

export class AgentHandle {
  constructor(
    readonly id: string,
    private readonly resources: ServiceResources,
    private readonly shutdown: AbortSignal,
  ) {}

  async start(
    input: MessageInput,
    options: StartOptions,
  ): Promise<Interaction> {
    const { idempotencyKey, signal, ...fields } = options;
    const receipt = await this.resources.threads.create(
      {
        ...fields,
        agent_id: this.id,
        payload: typeof input === "string" ? textPayload(input) : input,
      },
      { idempotencyKey, ...(signal ? { signal } : {}) },
    );
    return new Interaction(receipt, this.resources, this.shutdown, signal);
  }

  async send(
    threadId: string,
    input: MessageInput,
    options: SendOptions,
  ): Promise<Interaction> {
    const { idempotencyKey, signal, ...fields } = options;
    const receipt = await this.resources.threads.ref(threadId).inbox.create(
      {
        ...fields,
        agent_id: this.id,
        payload: typeof input === "string" ? textPayload(input) : input,
      },
      { idempotencyKey, ...(signal ? { signal } : {}) },
    );
    if (receipt.data.thread.id !== threadId)
      throw new ProtocolError("Service submitted to another Thread.");
    return new Interaction(receipt, this.resources, this.shutdown, signal);
  }
}

export class AgentCollection {
  constructor(
    private readonly resources: ServiceResources,
    private readonly shutdown: AbortSignal,
  ) {}
  ref(id: string) {
    return new AgentHandle(id, this.resources, this.shutdown);
  }
}
export class ThreadCollection {
  constructor(private readonly resources: ServiceResources) {}
  ref(id: string) {
    return new ThreadHandle(id, this.resources);
  }
}
export class RunCollection {
  constructor(
    private readonly resources: ServiceResources,
    private readonly shutdown: AbortSignal,
  ) {}
  ref(id: string) {
    return new RunHandle(id, this.resources, this.shutdown);
  }
}
