import { isRecord, ProtocolError } from "../errors.js";
import type { components } from "../schema.js";

export type RunStreamEvent = components["schemas"]["RunStreamEvent"];
export interface RunEvent {
  cursor: string;
  event: RunStreamEvent;
}

export function parseRunEvent(
  text: string,
  runId: string,
  eventType: string,
): RunStreamEvent {
  let event: unknown;
  try {
    event = JSON.parse(text);
  } catch {
    throw new ProtocolError("Invalid Run event JSON.");
  }
  if (
    !isRecord(event) ||
    event.schema_version !== "1" ||
    event.run_id !== runId ||
    event.event_type !== eventType ||
    typeof event.event_id !== "string" ||
    typeof event.thread_id !== "string" ||
    typeof event.occurred_at !== "string" ||
    !isRecord(event.payload)
  ) {
    throw new ProtocolError("Invalid Run event envelope.");
  }
  // The envelope is checked here; event-specific payloads belong to consumers.
  return event as RunStreamEvent;
}
