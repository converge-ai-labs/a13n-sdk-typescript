import { ProtocolError } from "../errors.js";
import type { BinaryResult } from "../resources/base.js";
import type { SessionStreamFrame } from "../session-stream-schema.js";
import * as validators from "../session-stream-validation.js";
import { decodeSseDetailed } from "./sse.js";

export interface SessionStreamOptions {
  signal?: AbortSignal;
  /** Optional application frame limit in UTF-16 code units; absent means no SDK cap. */
  maxFrameCharacters?: number;
}

/** Consume one native Session response. Every connection starts from a fresh snapshot.
 * The caller owns reconnect policy; continuation is display state, never a Thread cursor.
 */
export async function* sessionStream(
  stream: BinaryResult,
  options: SessionStreamOptions = {},
): AsyncGenerator<SessionStreamFrame> {
  try {
    if (
      options.maxFrameCharacters !== undefined &&
      (!Number.isSafeInteger(options.maxFrameCharacters) ||
        options.maxFrameCharacters < 1)
    )
      throw new RangeError(
        "maxFrameCharacters must be a positive safe integer.",
      );
    for await (const frame of decodeSseDetailed(
      stream.body,
      options.signal,
      options.maxFrameCharacters ?? Infinity,
    )) {
      // Future event names are ignored before interpreting their data or ID.
      if (!Object.hasOwn(validators, frame.event)) continue;
      if (frame.idPresent)
        throw new ProtocolError("A Session frame must not carry an SSE id.");
      let data: unknown;
      try {
        data = JSON.parse(frame.data);
      } catch {
        throw new ProtocolError("Invalid Session frame JSON.");
      }
      const validate = validators[frame.event as keyof typeof validators];
      if (!validate(data))
        throw new ProtocolError(`Invalid Session ${frame.event} frame.`);
      yield { type: frame.event, data } as SessionStreamFrame;
    }
  } finally {
    await stream.close();
  }
}
