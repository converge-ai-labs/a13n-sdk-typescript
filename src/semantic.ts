import {
  isServiceRejection,
  isRecord,
  PreviewInterruptedError,
  ProtocolError,
  SubmissionUnknownError,
} from "./errors.js";
import type { components } from "./schema.js";
import type {
  ServiceResources,
  RunsRunIdItemsResource,
} from "./resources/generated.js";
import type { BinaryResult, ResourceResult } from "./resources/base.js";
import { observation, type WaitOptions } from "./resources/interaction.js";
import { abortable, delay } from "./transport.js";
import { trackDispatch } from "./dispatch.js";
import { threadStream, type ThreadEvent } from "./streams/thread-stream.js";
import {
  messagePayload,
  resumePayload,
  sendFields,
  startFields,
  submissionKey,
  type MessageInput,
  type ResumeAnswers,
  type ResumeOptions,
  type SendOptions,
  type StartOptions,
  type SubmissionOptions,
} from "./workflow.js";

type Schema = components["schemas"];
export type { MessageInput, StartOptions, SendOptions } from "./workflow.js";

/** Safe local identity, not incorporation or terminal evidence. */
export interface InteractionIdentity {
  readonly origin: "submitted" | "resumed" | "recovered_entry" | "exact_run";
  readonly threadId?: string;
  readonly entryId?: string;
  readonly runId?: string;
  readonly idempotencyKey?: string;
}
type Receipt =
  ResourceResult<Schema["Submitted"]> | ResourceResult<Schema["RunView"]>;

async function mutation<T>(
  operation: "start" | "send" | "resume",
  identities: { agentId?: string; threadId?: string; runId?: string },
  options: SubmissionOptions,
  submit: (request: {
    idempotencyKey: string;
    signal: AbortSignal;
  }) => Promise<T>,
): Promise<{ value: T; key: string }> {
  const key = submissionKey(options.idempotencyKey);
  const signal = AbortSignal.any(options.signal ? [options.signal] : []);
  const dispatch = trackDispatch(signal);
  try {
    signal.throwIfAborted();
    return { value: await submit({ idempotencyKey: key, signal }), key };
  } catch (cause) {
    if (!dispatch.attempted || isServiceRejection(cause)) throw cause;
    throw new SubmissionUnknownError(
      key,
      operation,
      Object.freeze({ ...identities }),
      cause,
    );
  }
}

function submittedIdentity(
  receipt: ResourceResult<Schema["Submitted"]>,
  threadId?: string,
) {
  const value: unknown = receipt.data;
  if (
    !isRecord(value) ||
    !isRecord(value.thread) ||
    !isRecord(value.entry) ||
    typeof value.thread.id !== "string" ||
    !value.thread.id ||
    typeof value.entry.id !== "string" ||
    !value.entry.id ||
    value.entry.thread_id !== value.thread.id ||
    (threadId !== undefined && value.thread.id !== threadId) ||
    !(
      value.run === null ||
      (isRecord(value.run) &&
        typeof value.run.id === "string" &&
        value.run.id &&
        value.run.thread_id === value.thread.id)
    )
  )
    throw new ProtocolError(
      "Service returned an invalid submission receipt identity.",
    );
  return { threadId: value.thread.id, entryId: value.entry.id };
}

/** The Entry was settled without incorporation; this is not a failed Run. */
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

/** Authoritative exact-Run HTTP evidence, never reconstructed from Items or preview. */
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
  get text(): string | undefined {
    return typeof this.output === "string" ? this.output : undefined;
  }
  get pending() {
    return this.snapshot.data.pending;
  }
  get pendingApprovals() {
    return this.pending?.approvals ?? [];
  }
  get pendingCalls() {
    return this.pending?.calls ?? [];
  }
  get failure() {
    return this.snapshot.data.failure;
  }
  get threadId() {
    return this.snapshot.data.thread_id;
  }
  get runId() {
    return this.snapshot.data.id;
  }
}

export class RunHandle {
  constructor(
    readonly id: string,
    private readonly resources: ServiceResources,
    private readonly shutdown: AbortSignal,
  ) {}
  async get(
    options: { signal?: AbortSignal } = {},
  ): Promise<ResourceResult<Schema["RunView"]>> {
    const result = await this.resources.runs
      .ref(this.id)
      .get({ ...options, query: { view: "detailed" } });
    if (
      ("view" in result.data && result.data.view === "compact") ||
      "representation" in result.data
    )
      throw new ProtocolError("Expected detailed Run response");
    return { ...result, data: result.data as Schema["RunView"] };
  }
  observe(options: WaitOptions = {}): Interaction {
    return new Interaction(
      { origin: "exact_run", runId: this.id },
      this.resources,
      this.shutdown,
      undefined,
      undefined,
      options,
    );
  }
  async result(options: WaitOptions = {}): Promise<RunOutcome> {
    return this.observe(options).result();
  }
  items(options: Parameters<RunsRunIdItemsResource["get"]>[0] = {}) {
    return this.resources.runs.ref(this.id).items.get(options);
  }
  interrupt(options: { signal?: AbortSignal } = {}) {
    return this.resources.runs.ref(this.id).interrupt(options);
  }
  /** Atomic complete answer map; Service alone validates coverage. Returns the exact successor. */
  async resume(
    answers: ResumeAnswers,
    options: ResumeOptions = {},
  ): Promise<Interaction> {
    const request = resumePayload(answers, options.input);
    const { value: receipt, key } = await mutation(
      "resume",
      { runId: this.id },
      options,
      async (requestOptions) => {
        const result = await this.resources.runs
          .ref(this.id)
          .resume(request, requestOptions);
        const value: unknown = result.data;
        if (
          !isRecord(value) ||
          typeof value.id !== "string" ||
          !value.id ||
          value.id === this.id ||
          typeof value.thread_id !== "string" ||
          !value.thread_id
        )
          throw new ProtocolError(
            "Service returned an invalid successor receipt identity.",
          );
        return result;
      },
    );
    return new Interaction(
      {
        origin: "resumed",
        runId: receipt.data.id,
        threadId: receipt.data.thread_id,
        idempotencyKey: key,
      },
      this.resources,
      this.shutdown,
      options.signal,
      receipt,
    );
  }
}

export class ThreadHandle {
  constructor(
    readonly id: string,
    private readonly resources: ServiceResources,
    private readonly shutdown: AbortSignal,
  ) {}
  get(options: { signal?: AbortSignal } = {}) {
    return this.resources.threads.ref(this.id).get(options);
  }
  entry(id: string) {
    return new EntryHandle(id, this.id, this.resources, this.shutdown);
  }
}
export class EntryHandle {
  constructor(
    readonly id: string,
    readonly threadId: string,
    private readonly resources: ServiceResources,
    private readonly shutdown: AbortSignal,
  ) {}
  async get(
    options: { signal?: AbortSignal } = {},
  ): Promise<ResourceResult<Schema["EntryView"]>> {
    const result = await this.resources.threads
      .ref(this.threadId)
      .inbox.ref(this.id)
      .get({ ...options, query: { view: "detailed" } });
    if (
      ("view" in result.data && result.data.view === "compact") ||
      "representation" in result.data
    )
      throw new ProtocolError("Expected detailed Entry response");
    return { ...result, data: result.data as Schema["EntryView"] };
  }
  /** Recover only an identity, without I/O or a fabricated receipt. */
  interaction(options: WaitOptions = {}): Interaction {
    return new Interaction(
      { origin: "recovered_entry", threadId: this.threadId, entryId: this.id },
      this.resources,
      this.shutdown,
      undefined,
      undefined,
      options,
    );
  }
}

/** One finite exact-bound observation, shared by submission, resume and identity recovery. */
export class Interaction implements AsyncIterable<ThreadEvent> {
  readonly identity: InteractionIdentity;
  readonly receiptRun: RunHandle | null;
  readonly entry: EntryHandle | null;
  private threadHandle: ThreadHandle | null;
  private runHandle: RunHandle | null = null;
  private readonly localAbort = new AbortController();
  private watch?: ReturnType<typeof observation>;
  private outcomePromise?: Promise<RunOutcome>;
  private boundPromise?: Promise<RunHandle>;
  private reader?: AsyncGenerator<ThreadEvent>;
  private binary?: BinaryResult;
  private streamAbort?: AbortController;
  private readerClose?: Promise<void>;
  private closePromise?: Promise<void>;
  private closed = false;
  private settled = false;
  private consumer: "raw" | "text" | null = null;
  private rawUsed = false;
  private previewUsed = false;
  private previewFailure?: PreviewInterruptedError;

  constructor(
    identity: InteractionIdentity,
    private readonly resources: ServiceResources,
    private readonly shutdown: AbortSignal,
    private readonly invocationSignal?: AbortSignal,
    readonly receipt?: Receipt,
    private readonly initialOptions: WaitOptions = {},
  ) {
    this.identity = Object.freeze({ ...identity });
    this.threadHandle = identity.threadId
      ? new ThreadHandle(identity.threadId, resources, shutdown)
      : null;
    this.entry =
      identity.entryId && identity.threadId
        ? new EntryHandle(
            identity.entryId,
            identity.threadId,
            resources,
            shutdown,
          )
        : null;
    const provisional =
      identity.origin === "submitted" && receipt
        ? (receipt.data as Schema["Submitted"]).run
        : null;
    this.receiptRun = provisional
      ? new RunHandle(provisional.id, resources, shutdown)
      : null;
  }
  get thread() {
    return this.threadHandle;
  }
  /** Authoritative only after consumed Entry binding or a validated exact Run read. */
  get run() {
    return this.runHandle;
  }
  get idempotencyKey() {
    return this.identity.idempotencyKey;
  }

  /** No SSE for result-only callers. First observation fixes one deadline for all consumers. */
  result(options: WaitOptions = {}): Promise<RunOutcome> {
    if (this.outcomePromise) {
      if (Object.keys(options).length)
        throw new TypeError(
          "The interaction observation has already started; set options before starting it.",
        );
      return this.outcomePromise;
    }
    if (this.closed) return Promise.reject(this.localAbort.signal.reason);
    const settings = { ...this.initialOptions, ...options };
    const signal = AbortSignal.any([
      this.localAbort.signal,
      ...(this.invocationSignal ? [this.invocationSignal] : []),
      ...(this.initialOptions.signal ? [this.initialOptions.signal] : []),
      ...(options.signal ? [options.signal] : []),
    ]);
    this.watch = observation(this.shutdown, { ...settings, signal });
    let resolveBound!: (run: RunHandle) => void;
    let rejectBound!: (cause: unknown) => void;
    this.boundPromise = new Promise((resolve, reject) => {
      resolveBound = resolve;
      rejectBound = reject;
    });
    void this.boundPromise.catch(() => undefined);
    this.outcomePromise = this.poll(this.watch, resolveBound).finally(() => {
      this.settled = true;
      this.watch!.close();
      void this.stopReader().catch(() => undefined);
    });
    void this.outcomePromise.catch(rejectBound);
    return this.outcomePromise;
  }

  private async poll(
    watch: ReturnType<typeof observation>,
    onBound: (run: RunHandle) => void,
  ): Promise<RunOutcome> {
    try {
      let runId = this.identity.runId;
      if (this.entry) {
        while (!runId) {
          watch.signal.throwIfAborted();
          const snapshot = await abortable(
            this.entry.get({ signal: watch.signal }),
            watch.signal,
          );
          if (
            snapshot.data.id !== this.entry.id ||
            snapshot.data.thread_id !== this.entry.threadId
          )
            throw new ProtocolError(
              "Service returned a different submission entry.",
            );
          if (
            snapshot.data.status === "failed" ||
            snapshot.data.status === "withdrawn"
          )
            throw new SubmissionDispositionError(snapshot);
          if (snapshot.data.status === "consumed") {
            if (!snapshot.data.assigned_run_id)
              throw new ProtocolError(
                "Consumed submission has no incorporating Run ID.",
              );
            runId = snapshot.data.assigned_run_id;
            this.runHandle = new RunHandle(
              runId,
              this.resources,
              this.shutdown,
            );
            onBound(this.runHandle);
          } else await delay(watch.pollIntervalMs, watch.signal);
        }
      }
      if (!runId)
        throw new ProtocolError(
          "Interaction has no exact Run or Entry identity.",
        );
      const run =
        this.runHandle ?? new RunHandle(runId, this.resources, this.shutdown);
      while (true) {
        watch.signal.throwIfAborted();
        const snapshot = await abortable(
          run.get({ signal: watch.signal }),
          watch.signal,
        );
        if (
          snapshot.data.id !== runId ||
          typeof snapshot.data.thread_id !== "string" ||
          !snapshot.data.thread_id ||
          (this.threadHandle &&
            snapshot.data.thread_id !== this.threadHandle.id)
        )
          throw new ProtocolError("Service returned a different exact Run.");
        if (!this.runHandle) {
          this.runHandle = run;
          this.threadHandle = new ThreadHandle(
            snapshot.data.thread_id,
            this.resources,
            this.shutdown,
          );
          onBound(run);
        }
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
    } catch (cause) {
      if (watch.signal.aborted) throw watch.signal.reason;
      throw cause;
    }
  }

  private async nextEvent(): Promise<IteratorResult<ThreadEvent>> {
    const outcome = this.result();
    const run = await this.boundPromise!;
    if (this.closed) this.localAbort.signal.throwIfAborted();
    if (this.settled) {
      await outcome;
      return { done: true, value: undefined };
    }
    if (!this.reader) {
      this.streamAbort = new AbortController();
      const signal = AbortSignal.any([
        this.watch!.signal,
        this.streamAbort.signal,
      ]);
      this.reader = threadStream(
        async (options) => {
          const opening = this.resources.threads
            .ref(this.threadHandle!.id)
            .stream.get(options);
          // A late opening is still owned and must be closed after local cancellation.
          void opening.then(
            (binary) => {
              if (signal.aborted) void binary.close().catch(() => undefined);
            },
            () => undefined,
          );
          const binary = await abortable(opening, signal);
          this.binary = binary;
          return binary;
        },
        this.shutdown,
        { signal },
      );
    }
    try {
      while (true) {
        const next = await this.reader.next();
        if (this.closed) this.localAbort.signal.throwIfAborted();
        if (this.settled) {
          await outcome;
          return { done: true, value: undefined };
        }
        if (next.done) return next;
        if (
          next.value.frame.type !== "changed" &&
          next.value.frame.data.run_id === run.id
        )
          return next;
      }
    } catch (cause) {
      if (this.settled) {
        await outcome;
        return { done: true, value: undefined };
      }
      throw cause;
    }
  }

  private stopReader(): Promise<void> {
    this.streamAbort?.abort(
      new DOMException("Interaction reader stopped.", "AbortError"),
    );
    if (!this.readerClose && this.reader)
      this.readerClose = (async () => {
        // Cancel the actual transport read first, even if the consumer is paused at yield.
        try {
          await this.binary
            ?.close()
            .catch((cause: unknown) => this.readerCancellation(cause));
        } finally {
          await this.reader!.return(undefined).catch((cause: unknown) =>
            this.readerCancellation(cause),
          );
        }
      })();
    return this.readerClose ?? Promise.resolve();
  }

  private readerCancellation(cause: unknown): void {
    for (const signal of [
      this.watch?.signal,
      this.localAbort.signal,
      this.streamAbort?.signal,
      this.shutdown,
    ]) {
      if (signal?.aborted && cause === signal.reason) return;
    }
    throw cause;
  }

  /** Joined local cleanup. Never interrupts or resumes remote execution. */
  close(): Promise<void> {
    if (!this.closePromise) {
      this.closed = true;
      this.localAbort.abort(
        new DOMException("Interaction closed.", "AbortError"),
      );
      this.closePromise = (async () => {
        try {
          await this.stopReader();
        } finally {
          await this.outcomePromise?.catch(() => undefined);
        }
      })();
    }
    return this.closePromise;
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<ThreadEvent> {
    if (this.consumer || this.rawUsed)
      throw new TypeError(
        "Only one raw or text consumer may read an Interaction at a time.",
      );
    this.rawUsed = true;
    this.consumer = "raw";
    try {
      while (true) {
        const next = await this.nextEvent();
        if (next.done) return;
        yield next.value;
      }
    } finally {
      this.consumer = null;
      await this.close();
    }
  }

  /** Lazy preview only; interruption is sticky and leaves result/sequential raw access open. */
  async *textStream(): AsyncGenerator<string> {
    if (this.previewFailure) throw this.previewFailure;
    if (this.consumer || this.previewUsed || this.rawUsed)
      throw new TypeError(
        "Only one preview consumer is allowed, before raw consumption.",
      );
    this.previewUsed = true;
    this.consumer = "text";
    const active = new Map<string, boolean>();
    let previous: { attempt: number; sequence: number } | undefined;
    try {
      while (true) {
        const next = await this.nextEvent();
        if (next.done) return;
        const frame = next.value.frame;
        if (frame.type === "gap" || frame.type === "reset")
          throw new PreviewInterruptedError(
            `Text preview interrupted by ${frame.type}.`,
          );
        if (frame.type === "boundary") {
          if (
            previous &&
            (frame.data.attempt !== previous.attempt ||
              frame.data.sequence > previous.sequence)
          )
            throw new PreviewInterruptedError(
              "Text preview boundary covers unseen Service deltas.",
            );
          // A first boundary establishes only a coordinate, never reconstructed message content.
          previous ??= {
            attempt: frame.data.attempt,
            sequence: frame.data.sequence,
          };
          continue;
        }
        if (frame.type !== "delta") continue;
        // Service positions include child and hidden deltas; Redis and inner AG-UI coordinates do not.
        // Late boundaries never regress the received delta high-water mark.
        if (
          previous &&
          (frame.data.attempt !== previous.attempt ||
            frame.data.sequence !== previous.sequence + 1)
        )
          throw new PreviewInterruptedError(
            "Text preview encountered a discontinuous Service delta position.",
          );
        previous = {
          attempt: frame.data.attempt,
          sequence: frame.data.sequence,
        };
        const event = frame.data.event;
        if (event.subagentRunId !== undefined && event.subagentRunId !== null)
          continue;
        const hidden =
          isRecord(event.metadata) && event.metadata.display === false;
        if (
          hidden &&
          event.type !== "TEXT_MESSAGE_START" &&
          event.type !== "TEXT_MESSAGE_END"
        )
          continue;
        if (event.type === "CUSTOM" && event.name === "a13n.stream.fragment")
          throw new PreviewInterruptedError(
            "Text preview does not assemble root custom fragments.",
          );
        if (event.type === "TEXT_MESSAGE_START") {
          if (
            typeof event.messageId !== "string" ||
            typeof event.role !== "string" ||
            active.has(event.messageId)
          )
            throw new PreviewInterruptedError(
              "Text preview received an ambiguous message start.",
            );
          if (active.size >= 8)
            throw new PreviewInterruptedError(
              "Text preview exceeded eight active root message identities.",
            );
          active.set(event.messageId, !hidden && event.role === "assistant");
        } else if (event.type === "TEXT_MESSAGE_CONTENT") {
          if (
            typeof event.messageId !== "string" ||
            !active.has(event.messageId)
          )
            throw new PreviewInterruptedError(
              "Text preview content has no trustworthy start or string delta.",
            );
          if (!active.get(event.messageId)) continue;
          if (typeof event.delta !== "string")
            throw new PreviewInterruptedError(
              "Text preview content has no string delta.",
            );
          yield event.delta;
        } else if (event.type === "TEXT_MESSAGE_END") {
          if (
            hidden &&
            (typeof event.messageId !== "string" ||
              !active.has(event.messageId))
          )
            continue;
          if (
            typeof event.messageId !== "string" ||
            !active.delete(event.messageId)
          )
            throw new PreviewInterruptedError(
              "Text preview received an unmatched message end.",
            );
        }
      }
    } catch (cause) {
      if (
        cause instanceof PreviewInterruptedError ||
        cause instanceof ProtocolError
      ) {
        this.previewFailure =
          cause instanceof PreviewInterruptedError
            ? cause
            : new PreviewInterruptedError(
                "Text preview interrupted by a protocol discontinuity.",
                cause,
              );
        throw this.previewFailure;
      }
      throw cause;
    } finally {
      this.consumer = null;
    }
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
    options: StartOptions = {},
  ): Promise<Interaction> {
    const body = {
      ...startFields(options),
      agent_id: this.id,
      payload: messagePayload(input),
    };
    const { value: receipt, key } = await mutation(
      "start",
      { agentId: this.id },
      options,
      async (request) => {
        const result = await this.resources.threads.create(body, request);
        submittedIdentity(result);
        return result;
      },
    );
    return new Interaction(
      {
        origin: "submitted",
        ...submittedIdentity(receipt),
        idempotencyKey: key,
      },
      this.resources,
      this.shutdown,
      options.signal,
      receipt,
    );
  }
  async send(
    threadId: string,
    input: MessageInput,
    options: SendOptions = {},
  ): Promise<Interaction> {
    const body = {
      ...sendFields(options),
      agent_id: this.id,
      payload: messagePayload(input),
    };
    const { value: receipt, key } = await mutation(
      "send",
      { agentId: this.id, threadId },
      options,
      async (request) => {
        const result = await this.resources.threads
          .ref(threadId)
          .inbox.create(body, request);
        submittedIdentity(result, threadId);
        return result;
      },
    );
    return new Interaction(
      {
        origin: "submitted",
        ...submittedIdentity(receipt),
        idempotencyKey: key,
      },
      this.resources,
      this.shutdown,
      options.signal,
      receipt,
    );
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
  constructor(
    private readonly resources: ServiceResources,
    private readonly shutdown: AbortSignal,
  ) {}
  ref(id: string) {
    return new ThreadHandle(id, this.resources, this.shutdown);
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
