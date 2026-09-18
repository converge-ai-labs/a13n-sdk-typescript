import {
  ApiError,
  isRecord,
  ProtocolError,
  ReplayGapError,
  TransportError,
} from "../errors.js";
import { jsonRequest } from "../resources/base.js";
import type { Run } from "../resources/interaction.js";
import type { components } from "../schema.js";
import {
  delay,
  RecoverableFetchError,
  retryAfterMilliseconds,
  type Transport,
} from "../transport.js";
import { parseRunEvent, type RunEvent } from "./run-event.js";
import { decodeSseDetailed, type DetailedSseFrame } from "./sse.js";

export interface ObserveRunOptions {
  after?: string;
  signal?: AbortSignal;
  reconnect?: boolean;
  maxReconnects?: number;
}

export interface StreamResponse {
  readonly status: number;
  readonly headers: Headers;
}

export interface RunStream extends AsyncIterableIterator<RunEvent> {
  readonly run: Run;
  readonly closed: boolean;
  readonly response: StreamResponse | undefined;
  readonly lastReceivedCursor: string | undefined;
  next(): Promise<IteratorResult<RunEvent, void>>;
  return(): Promise<IteratorResult<RunEvent, void>>;
  close(): Promise<void>;
  [Symbol.asyncIterator](): RunStream;
}

const retryableStatuses = new Set([429, 502, 503, 504]);
const terminalEvents = new Set([
  "run.completed",
  "run.failed",
  "run.cancelled",
  "run.waiting",
]);
const sealedStatuses = new Set(["completed", "failed", "cancelled", "waiting"]);
const localClose = Symbol("run-stream-local-close");

type ItemCollection = components["schemas"]["ItemCollection"];
type RunResource = components["schemas"]["RunResource"];

function recoverableFetchFailure(error: unknown): TransportError | undefined {
  if (error instanceof TransportError) return error;
  if (error instanceof RecoverableFetchError)
    return new TransportError(
      "Run stream transport failed; the Run outcome is unchanged.",
      { cause: error.failure },
    );
  return undefined;
}

function streamReadFailure(error: unknown): TransportError | undefined {
  const classified = recoverableFetchFailure(error);
  if (classified) return classified;
  if (error instanceof TypeError)
    return new TransportError(
      "Run stream transport failed; the Run outcome is unchanged.",
      { cause: error },
    );
  return undefined;
}

function gapFromFrame(
  frame: DetailedSseFrame,
  runId: string,
  fallbackCursor: string | undefined,
): ReplayGapError {
  if (frame.idPresent)
    throw new ProtocolError("A replay-gap frame must not advance the cursor.");
  let payload: unknown;
  try {
    payload = JSON.parse(frame.data);
  } catch {
    throw new ProtocolError("Invalid replay-gap JSON.");
  }
  if (!isRecord(payload))
    throw new ProtocolError("Invalid replay-gap evidence.");
  if (typeof payload.run_id === "string" && payload.run_id !== runId)
    throw new ProtocolError("Replay-gap evidence belongs to another Run.");
  const details: Record<string, unknown> = {
    ...payload,
    run_id: runId,
  };
  if (details.requested_cursor === undefined && fallbackCursor !== undefined)
    details.requested_cursor = fallbackCursor;
  return new ReplayGapError(
    409,
    "run_stream_replay_gap",
    "Run history requires explicit retained-state reconciliation.",
    details,
    null,
  );
}

export class ResourceRunStream implements RunStream {
  private readonly closeController = new AbortController();
  private readonly externalSignal: AbortSignal | undefined;
  private readonly reconnect: boolean;
  private readonly maxReconnects: number;
  private acknowledgedCursor: string | undefined;
  private pendingAcknowledgement: string | undefined;
  private receivedCursor: string | undefined;
  private retries = 0;
  private reading = false;
  private isClosed = false;
  private terminalReceived = false;
  private streamResponse: StreamResponse | undefined;
  private frames: AsyncIterator<DetailedSseFrame> | undefined;
  private activeDone: Promise<void> | undefined;
  private resolveActive: (() => void) | undefined;

  constructor(
    readonly run: Run,
    private readonly transport: Transport,
    options: ObserveRunOptions,
  ) {
    if (
      options.after !== undefined &&
      (!options.after || /[\r\n\0]/.test(options.after))
    )
      throw new TypeError(
        "after must be a nonblank SSE cursor without control delimiters.",
      );
    const maxReconnects = options.maxReconnects ?? 5;
    if (!Number.isInteger(maxReconnects) || maxReconnects < 0)
      throw new RangeError("maxReconnects must be a non-negative integer.");
    this.acknowledgedCursor = options.after;
    this.externalSignal = options.signal;
    this.reconnect = (options.reconnect ?? true) && maxReconnects > 0;
    this.maxReconnects = maxReconnects;
  }

  get closed(): boolean {
    return this.isClosed;
  }

  get response(): StreamResponse | undefined {
    return this.streamResponse;
  }

  get lastReceivedCursor(): string | undefined {
    return this.receivedCursor;
  }

  [Symbol.asyncIterator](): this {
    return this;
  }

  async next(): Promise<IteratorResult<RunEvent, void>> {
    if (this.isClosed) return { done: true, value: undefined };
    if (this.reading)
      throw new TypeError("RunStream supports one active reader.");
    this.reading = true;
    this.activeDone = new Promise((resolve) => {
      this.resolveActive = resolve;
    });
    if (this.pendingAcknowledgement !== undefined) {
      if (this.pendingAcknowledgement !== this.acknowledgedCursor)
        this.retries = 0;
      this.acknowledgedCursor = this.pendingAcknowledgement;
      this.pendingAcknowledgement = undefined;
    }
    try {
      return await this.readNext();
    } catch (error) {
      if (this.closeController.signal.aborted)
        return { done: true, value: undefined };
      if (this.externalSignal?.aborted) {
        await this.finish();
        throw this.externalSignal.reason;
      }
      if (this.transport.signal.aborted) {
        await this.finish();
        throw this.transport.signal.reason;
      }
      await this.finish();
      throw error;
    } finally {
      this.reading = false;
      this.resolveActive?.();
      this.resolveActive = undefined;
      this.activeDone = undefined;
    }
  }

  async return(): Promise<IteratorResult<RunEvent, void>> {
    await this.close();
    return { done: true, value: undefined };
  }

  async close(): Promise<void> {
    if (!this.isClosed) {
      this.isClosed = true;
      this.closeController.abort(localClose);
    }
    await this.activeDone;
    await this.closeAttachment();
  }

  private signal(): AbortSignal {
    const signals = [this.closeController.signal, this.transport.signal];
    if (this.externalSignal) signals.push(this.externalSignal);
    return AbortSignal.any(signals);
  }

  private async readNext(): Promise<IteratorResult<RunEvent, void>> {
    while (!this.isClosed) {
      this.signal().throwIfAborted();
      await this.ensureAttachment();
      let result: IteratorResult<DetailedSseFrame>;
      try {
        result = await this.frames!.next();
        this.signal().throwIfAborted();
      } catch (error) {
        if (this.signal().aborted) throw this.signal().reason;
        if (error instanceof ProtocolError || error instanceof ReplayGapError)
          throw error;
        const failure = streamReadFailure(error);
        if (!failure) throw error;
        await this.recover(failure);
        continue;
      }
      if (result.done) {
        await this.closeAttachment();
        this.signal().throwIfAborted();
        if (this.isClosed || !this.reconnect)
          return this.finish().then(() => ({ done: true, value: undefined }));
        if (this.terminalReceived) {
          await this.finish();
          return { done: true, value: undefined };
        }
        let terminalProjection: boolean;
        try {
          terminalProjection = await this.confirmedTerminalProjection();
        } catch (error) {
          await this.recoverEvidenceFailure(error);
          continue;
        }
        if (terminalProjection) {
          await this.finish();
          return { done: true, value: undefined };
        }
        await this.recover(
          new TransportError(
            "Run stream ended without confirmed completion; the Run outcome is unchanged.",
          ),
        );
        continue;
      }
      const frame = result.value;
      if (frame.event === "a13n.service.replay_gap")
        throw gapFromFrame(frame, this.run.id, this.acknowledgedCursor);
      if (!frame.idPresent || !/^\d+-\d+$/.test(frame.id))
        throw new ProtocolError("Missing or invalid Run stream cursor.");
      if (frame.id === this.acknowledgedCursor) continue;
      const event = parseRunEvent(frame.data, this.run.id, frame.event);
      this.receivedCursor = frame.id;
      this.pendingAcknowledgement = frame.id;
      if (terminalEvents.has(event.event_type)) this.terminalReceived = true;
      return { done: false, value: { cursor: frame.id, event } };
    }
    return { done: true, value: undefined };
  }

  private async ensureAttachment(): Promise<void> {
    while (!this.frames && !this.isClosed) {
      try {
        await this.attach();
      } catch (error) {
        if (this.signal().aborted) throw this.signal().reason;
        if (error instanceof ReplayGapError) {
          const details = { ...error.details };
          if (details.run_id === undefined) details.run_id = this.run.id;
          if (
            details.requested_cursor === undefined &&
            this.acknowledgedCursor !== undefined
          )
            details.requested_cursor = this.acknowledgedCursor;
          throw new ReplayGapError(
            error.status,
            error.code,
            error.message,
            details,
            error.requestId,
            error.retryAfter,
          );
        }
        if (error instanceof ApiError) {
          if (!retryableStatuses.has(error.status)) throw error;
          await this.recover(error);
          continue;
        }
        if (error instanceof ProtocolError) throw error;
        const failure = recoverableFetchFailure(error);
        if (!failure) throw error;
        await this.recover(failure);
      }
    }
  }

  private async attach(): Promise<void> {
    const headers = new Headers({ Accept: "text/event-stream" });
    headers.set("X-A13N-Workspace-ID", this.run.workspaceId);
    if (this.acknowledgedCursor)
      headers.set("Last-Event-ID", this.acknowledgedCursor);
    const response = await this.transport.fetchOnceForRecovery(
      new Request(
        `${this.transport.baseUrl}/api/v1/runs/${encodeURIComponent(this.run.id)}/stream`,
        { headers, signal: this.signal() },
      ),
    );
    if (
      response.headers.get("Content-Type")?.split(";", 1)[0]?.trim() !==
        "text/event-stream" ||
      !response.body
    ) {
      await response.body?.cancel();
      throw new ProtocolError("Expected a Run event stream.");
    }
    this.streamResponse = {
      status: response.status,
      headers: new Headers(response.headers),
    };
    this.frames = decodeSseDetailed(response.body, this.signal())[
      Symbol.asyncIterator
    ]();
  }

  private async recover(error: ApiError | TransportError): Promise<void> {
    await this.closeAttachment();
    if (!this.reconnect || this.retries >= this.maxReconnects) throw error;
    this.retries += 1;
    const base = Math.min(500 * 2 ** (this.retries - 1), 10_000);
    const jitter = base / 2 + Math.random() * (base / 2);
    const retryAfter =
      error instanceof ApiError
        ? retryAfterMilliseconds(error.retryAfter)
        : undefined;
    await delay(Math.max(jitter, retryAfter ?? 0), this.signal());
  }

  private async recoverEvidenceFailure(error: unknown): Promise<void> {
    if (this.signal().aborted) throw this.signal().reason;
    if (error instanceof ReplayGapError || error instanceof ProtocolError)
      throw error;
    if (error instanceof ApiError) {
      if (!retryableStatuses.has(error.status)) throw error;
      await this.recover(error);
      return;
    }
    const failure = recoverableFetchFailure(error);
    if (!failure) throw error;
    await this.recover(failure);
  }

  private async confirmedTerminalProjection(): Promise<boolean> {
    const run = await jsonRequest<RunResource>(
      this.transport,
      "GET",
      `/api/v1/runs/${encodeURIComponent(this.run.id)}`,
      undefined,
      undefined,
      {
        workspaceId: this.run.workspaceId,
        signal: this.signal(),
        retryReads: false,
        classifyFetchFailures: true,
      },
    );
    if (!sealedStatuses.has(run.data.status)) return false;
    const items = await jsonRequest<ItemCollection>(
      this.transport,
      "GET",
      `/api/v1/runs/${encodeURIComponent(this.run.id)}/items`,
      undefined,
      undefined,
      {
        workspaceId: this.run.workspaceId,
        signal: this.signal(),
        retryReads: false,
        classifyFetchFailures: true,
      },
    );
    return (
      items.data.complete &&
      items.data.finalized &&
      items.data.projection_cursor === this.acknowledgedCursor
    );
  }

  private async closeAttachment(): Promise<void> {
    const frames = this.frames;
    this.frames = undefined;
    await frames?.return?.().catch(() => undefined);
  }

  private async finish(): Promise<void> {
    this.isClosed = true;
    await this.closeAttachment();
  }
}
