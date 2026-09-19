import { ApiError, ProtocolError, ReplayGapError } from "../errors.js";
import { delay, type Transport } from "../transport.js";
import { parseRunEvent, type RunEvent } from "./run-event.js";
import { decodeSse } from "./sse.js";

export type { RunEvent, RunStreamEvent } from "./run-event.js";
export interface RunStreamOptions {
  signal?: AbortSignal;
  after?: string;
  workspaceId?: string;
}

export async function* runStream(
  transport: Transport,
  runId: string,
  options: RunStreamOptions = {},
): AsyncGenerator<RunEvent> {
  const signal = options.signal
    ? AbortSignal.any([options.signal, transport.signal])
    : transport.signal;
  let cursor = options.after;
  for (let attempt = 0; ; attempt++) {
    signal.throwIfAborted();
    const headers = new Headers({ Accept: "text/event-stream" });
    if (cursor) headers.set("Last-Event-ID", cursor);
    if (options.workspaceId)
      headers.set("X-A13N-Workspace-ID", options.workspaceId);
    try {
      const response = await transport.fetch(
        new Request(
          `${transport.baseUrl}/api/v1/runs/${encodeURIComponent(runId)}/stream`,
          { headers, signal },
        ),
      );
      if (
        !response.headers
          .get("Content-Type")
          ?.startsWith("text/event-stream") ||
        !response.body
      ) {
        await response.body?.cancel();
        throw new ProtocolError("Expected a Run event stream.");
      }
      for await (const frame of decodeSse(response.body)) {
        if (
          frame.event === "run_stream.replay_gap" ||
          frame.event.includes("replay_gap")
        ) {
          throw new ReplayGapError(
            409,
            "run_stream_replay_gap",
            "Run history requires reconciliation.",
            {},
            response.headers.get("X-Request-ID"),
          );
        }
        if (!/^\d+-\d+$/.test(frame.id))
          throw new ProtocolError("Missing or invalid Run stream cursor.");
        if (frame.id === cursor) continue;
        yield {
          cursor: frame.id,
          event: parseRunEvent(frame.data, runId, frame.event),
        };
        // Resume advances only when the consumer requests the next applied event.
        cursor = frame.id;
      }
      return;
    } catch (error) {
      if (
        signal.aborted ||
        error instanceof ApiError ||
        error instanceof ProtocolError ||
        attempt >= 2
      )
        throw error;
      await delay(250 * 2 ** attempt, signal);
    }
  }
}
