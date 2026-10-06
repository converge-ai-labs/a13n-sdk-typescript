import { ApiError, isRecord, ProtocolError } from "../errors.js";
import { delay } from "../transport.js";
import type { BinaryResult } from "../resources/base.js";
import { decodeSse, type SseFrame } from "./sse.js";

export interface ThreadStreamOptions {
  signal?: AbortSignal;
  /** Redis entry ID from the last applied delta/boundary or RunItems.resume_after. */
  after?: string;
  /** Exact Run and applied display coverage; both must be supplied together. */
  run?: string;
  position?: string;
}
export interface ItemRef {
  id: string;
  kind: "text_message" | "reasoning_message" | "tool_call" | "observation";
  state: "in_progress" | "completed" | "interrupted" | "failed";
  ordinal?: number | null;
  response_group?: string | null;
  failure?: Record<string, unknown> | null;
}
export type ThreadStreamFrame =
  | {
      type: "delta";
      data: {
        run_id: string;
        attempt: number;
        sequence: number;
        event: Record<string, unknown>;
        item: ItemRef | null;
      };
    }
  | {
      type: "boundary";
      data: { run_id: string; attempt: number; sequence: number };
    }
  | { type: "changed"; data: { version: number } }
  | { type: "reset"; data: { run_id: string } }
  | { type: "gap"; data: { run_id: string; position?: string | null } };
export type ThreadEvent =
  | {
      cursor: string;
      frame: Extract<ThreadStreamFrame, { type: "delta" | "boundary" }>;
    }
  | {
      cursor: null;
      frame: Extract<ThreadStreamFrame, { type: "changed" | "reset" | "gap" }>;
    };

const cursorPattern = /^\d{1,20}-\d{1,20}$/;
const positionPattern = /^(0|[1-9]\d{0,19})-(0|[1-9]\d{0,19})$/;
const kinds = new Set([
  "text_message",
  "reasoning_message",
  "tool_call",
  "observation",
]);
const states = new Set(["in_progress", "completed", "interrupted", "failed"]);
function natural(value: unknown): value is number {
  return Number.isSafeInteger(value) && (value as number) >= 0;
}
function runSignal(
  value: Record<string, unknown>,
): value is Record<string, unknown> & { run_id: string } {
  return typeof value.run_id === "string";
}
function parseFrame(frame: SseFrame): ThreadEvent {
  let value: unknown;
  try {
    value = JSON.parse(frame.data);
  } catch {
    throw new ProtocolError("Invalid Thread frame JSON.");
  }
  if (!isRecord(value)) throw new ProtocolError("Invalid Thread frame data.");
  if (frame.event === "delta" || frame.event === "boundary") {
    if (
      !cursorPattern.test(frame.id) ||
      !runSignal(value) ||
      !natural(value.attempt) ||
      !natural(value.sequence)
    )
      throw new ProtocolError("Invalid Thread output frame.");
    if (frame.event === "delta") {
      const item = value.item;
      if (
        !isRecord(value.event) ||
        !(
          item === null ||
          (isRecord(item) &&
            typeof item.id === "string" &&
            kinds.has(item.kind as string) &&
            states.has(item.state as string))
        )
      )
        throw new ProtocolError("Invalid Thread delta.");
    }
    return {
      cursor: frame.id,
      frame: { type: frame.event, data: value },
    } as ThreadEvent;
  }
  if (frame.id)
    throw new ProtocolError("A Thread signal must not advance the cursor.");
  if (frame.event === "changed" && natural(value.version))
    return {
      cursor: null,
      frame: { type: "changed", data: { version: value.version } },
    };
  if (frame.event === "reset" && runSignal(value))
    return {
      cursor: null,
      frame: { type: "reset", data: { run_id: value.run_id } },
    };
  if (frame.event === "gap" && runSignal(value)) {
    if (
      value.position !== undefined &&
      value.position !== null &&
      !(
        typeof value.position === "string" &&
        positionPattern.test(value.position)
      )
    )
      throw new ProtocolError("Invalid Thread gap position.");
    return {
      cursor: null,
      frame: {
        type: "gap",
        data: {
          run_id: value.run_id,
          ...(value.position !== undefined
            ? { position: value.position as string | null }
            : {}),
        },
      },
    };
  }
  throw new ProtocolError("Unsupported Thread frame.");
}

/** Observe one thread. Signals require durable readback; neither stream delivery nor close changes execution. */
export async function* threadStream(
  open: (options: {
    signal: AbortSignal;
    lastEventId?: string;
    query?: { run: string; position: string };
  }) => Promise<BinaryResult>,
  shutdown: AbortSignal,
  options: ThreadStreamOptions = {},
): AsyncGenerator<ThreadEvent> {
  if (options.after && !cursorPattern.test(options.after))
    throw new TypeError("after must be a Redis stream entry ID.");
  if ((options.run !== undefined) !== (options.position !== undefined))
    throw new TypeError("run and position must be supplied together.");
  if (options.position !== undefined && !positionPattern.test(options.position))
    throw new TypeError(
      "position must be a canonical attempt-sequence position.",
    );
  const coverage =
    options.run !== undefined && options.position !== undefined
      ? { run: options.run, position: options.position }
      : undefined;
  const signal = options.signal
    ? AbortSignal.any([options.signal, shutdown])
    : shutdown;
  let cursor = options.after;
  let failures = 0;
  while (true) {
    signal.throwIfAborted();
    let stream: BinaryResult | undefined;
    try {
      stream = await open({
        signal,
        ...(cursor ? { lastEventId: cursor } : {}),
        ...(coverage ? { query: coverage } : {}),
      });
      const response = stream.response;
      if (
        !response.headers
          .get("Content-Type")
          ?.startsWith("text/event-stream") ||
        !response.body
      ) {
        throw new ProtocolError("Expected a Thread event stream.");
      }
      for await (const raw of decodeSse(stream.body, signal)) {
        signal.throwIfAborted();
        const event = parseFrame(raw);
        if (event.cursor && event.cursor === cursor) continue;
        yield event;
        signal.throwIfAborted();
        // Only applied output advances replay; gap-only reconnects cannot reset the retry bound.
        if (event.cursor) {
          cursor = event.cursor;
          failures = 0;
        }
      }
    } catch (error) {
      if (
        signal.aborted ||
        error instanceof ApiError ||
        error instanceof ProtocolError ||
        failures >= 2
      )
        throw error;
    } finally {
      await stream?.close();
    }
    if (failures >= 2)
      throw new ProtocolError(
        "Thread stream closed without a stable connection.",
      );
    await delay(250 * 2 ** failures++, signal);
  }
}
