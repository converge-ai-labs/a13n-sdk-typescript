import { WaitTimeoutError } from "../errors.js";
import type { components } from "../schema.js";

/** Construct a text message without hiding submission fields or dispatching I/O. */
export function textPayload(
  text: string,
): components["schemas"]["MessagePayload"] {
  return { content: [{ type: "text", text }] };
}

export interface WaitOptions {
  /** One observation deadline, including in-flight reads and all poll delays. */
  timeoutMs?: number;
  pollIntervalMs?: number;
  signal?: AbortSignal;
}

/** A cancellable deadline shared by Entry, exact Run and finite SSE observation. */
export function observation(shutdown: AbortSignal, options: WaitOptions = {}) {
  const timeoutMs = options.timeoutMs ?? 300_000;
  if (!Number.isFinite(timeoutMs) || timeoutMs < 0 || timeoutMs > 2_147_483_647)
    throw new RangeError("timeoutMs must be between 0 and 2147483647.");
  const pollIntervalMs = options.pollIntervalMs ?? 500;
  if (!Number.isFinite(pollIntervalMs) || pollIntervalMs <= 0)
    throw new RangeError("pollIntervalMs must be positive and finite.");
  const deadline = new AbortController();
  const signal = AbortSignal.any([
    shutdown,
    ...(options.signal ? [options.signal] : []),
    deadline.signal,
  ]);
  const expire = () => deadline.abort(new WaitTimeoutError(timeoutMs));
  if (timeoutMs === 0) expire();
  const timer = timeoutMs === 0 ? undefined : setTimeout(expire, timeoutMs);
  return { signal, pollIntervalMs, close: () => clearTimeout(timer) };
}
