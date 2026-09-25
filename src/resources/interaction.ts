import { WaitTimeoutError } from "../errors.js";
import type { components } from "../schema.js";
import { abortable, delay } from "../transport.js";
import type { ResourceResult } from "./base.js";

/** Construct a text message without hiding any submission fields or dispatching I/O. */
export function textPayload(
  text: string,
): components["schemas"]["MessagePayload"] {
  return { content: [{ type: "text", text }] };
}

export interface WaitOptions {
  /** Whole-wait deadline, including authentication, requests, response bodies and retries. */
  timeoutMs: number;
  pollIntervalMs?: number;
  signal?: AbortSignal;
}

/** Poll one exact Run through its generated GET; never follow or control a successor. */
export async function waitForRun(
  get: (options: {
    signal: AbortSignal;
  }) => Promise<ResourceResult<components["schemas"]["RunView"]>>,
  shutdown: AbortSignal,
  options: WaitOptions,
): Promise<ResourceResult<components["schemas"]["RunView"]>> {
  if (
    !Number.isFinite(options.timeoutMs) ||
    options.timeoutMs < 0 ||
    options.timeoutMs > 2_147_483_647
  )
    throw new RangeError("timeoutMs must be between 0 and 2147483647.");
  const interval = options.pollIntervalMs ?? 500;
  if (!Number.isFinite(interval) || interval <= 0)
    throw new RangeError("pollIntervalMs must be positive and finite.");
  const deadline = new AbortController();
  const signal = AbortSignal.any([
    shutdown,
    ...(options.signal ? [options.signal] : []),
    deadline.signal,
  ]);
  const expire = () => deadline.abort(new WaitTimeoutError(options.timeoutMs));
  if (options.timeoutMs === 0) expire();
  const timer = setTimeout(expire, options.timeoutMs);
  try {
    while (true) {
      signal.throwIfAborted();
      const result = await abortable(get({ signal }), signal);
      if (
        ["completed", "failed", "cancelled", "waiting"].includes(
          result.data.status,
        )
      )
        return result;
      await delay(Math.min(interval, options.timeoutMs), signal);
    }
  } catch (error) {
    // Fetch implementations can wrap abort reasons; keep timeout distinct from caller/close cancellation.
    if (signal.aborted) throw signal.reason;
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
