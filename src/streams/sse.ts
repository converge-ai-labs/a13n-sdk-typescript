import { ProtocolError } from "../errors.js";

export interface SseFrame {
  id: string;
  event: string;
  data: string;
}
export interface DetailedSseFrame extends SseFrame {
  idPresent: boolean;
}
const maxFrameCharacters = 1024 * 1024;

/** Decode incremental UTF-8 and LF/CRLF/CR framing, including split delimiters. */
export async function* decodeSse(
  body: ReadableStream<Uint8Array>,
): AsyncGenerator<SseFrame> {
  for await (const frame of decodeSseDetailed(body)) {
    yield { id: frame.id, event: frame.event, data: frame.data };
  }
}

/** Internal framing details retain whether this event carried an explicit id field. */
export async function* decodeSseDetailed(
  body: ReadableStream<Uint8Array>,
  signal?: AbortSignal,
): AsyncGenerator<DetailedSseFrame> {
  const reader = body.getReader();
  const abort = () => {
    void reader.cancel(signal?.reason).catch(() => undefined);
  };
  signal?.throwIfAborted();
  signal?.addEventListener("abort", abort, { once: true });
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let buffer = "",
    id = "",
    event = "",
    idPresent = false,
    values: string[] = [],
    size = 0;
  try {
    while (true) {
      const chunk = await reader.read();
      buffer += decoder.decode(chunk.value, { stream: !chunk.done });
      let boundary: number;
      while ((boundary = buffer.search(/[\r\n]/)) >= 0) {
        if (
          buffer[boundary] === "\r" &&
          boundary === buffer.length - 1 &&
          !chunk.done
        )
          break;
        const line = buffer.slice(0, boundary);
        const width =
          buffer[boundary] === "\r" && buffer[boundary + 1] === "\n" ? 2 : 1;
        buffer = buffer.slice(boundary + width);
        size += line.length;
        if (size > maxFrameCharacters)
          throw new ProtocolError("SSE frame exceeds the size limit.");
        if (!line) {
          if (values.length)
            yield {
              id,
              event: event || "message",
              data: values.join("\n"),
              idPresent,
            };
          values = [];
          event = "";
          idPresent = false;
          size = 0;
          continue;
        }
        if (line.startsWith(":")) continue;
        const separator = line.indexOf(":");
        const field = separator < 0 ? line : line.slice(0, separator);
        const value =
          separator < 0 ? "" : line.slice(separator + 1).replace(/^ /, "");
        if (field === "data") values.push(value);
        if (field === "event") event = value;
        if (field === "id" && !value.includes("\0")) {
          id = value;
          idPresent = true;
        }
      }
      if (buffer.length + size > maxFrameCharacters)
        throw new ProtocolError("SSE frame exceeds the size limit.");
      if (chunk.done) {
        if (buffer || values.length)
          throw new ProtocolError("The stream ended inside an SSE frame.");
        return;
      }
    }
  } finally {
    signal?.removeEventListener("abort", abort);
    await reader.cancel().catch(() => undefined);
    reader.releaseLock();
  }
}
