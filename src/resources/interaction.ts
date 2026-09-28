import { WaitTimeoutError } from "../errors.js";
import type { components } from "../schema.js";
import { abortable, delay } from "../transport.js";
import type { ResourceResult } from "./base.js";

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

/** A cancellable deadline shared by queued Entry observation and exact-Run waiting. */
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
  return {
    signal,
    pollIntervalMs,
    close: () => clearTimeout(timer),
    // Monotonic deadlines are enforced by the signal; the remaining value only bounds inner polls.
    remaining: (started: number) =>
      Math.max(0, timeoutMs - (Date.now() - started)),
  };
}

/** Poll one exact Run through its generated GET; never follow or control a successor. */
export async function waitForRun(
  get: (options: {
    signal: AbortSignal;
  }) => Promise<ResourceResult<components["schemas"]["RunView"]>>,
  shutdown: AbortSignal,
  options: WaitOptions = {},
): Promise<ResourceResult<components["schemas"]["RunView"]>> {
  const watch = observation(shutdown, options);
  try {
    while (true) {
      watch.signal.throwIfAborted();
      const result = await abortable(
        get({ signal: watch.signal }),
        watch.signal,
      );
      if (
        ["completed", "failed", "cancelled", "waiting"].includes(
          result.data.status,
        )
      )
        return result;
      await delay(watch.pollIntervalMs, watch.signal);
    }
  } catch (error) {
    if (watch.signal.aborted) throw watch.signal.reason;
    throw error;
  } finally {
    watch.close();
  }
}
