import { ProtocolError } from "../errors.js";
import type { Transport } from "../transport.js";

export interface ResourceResult<T> {
  readonly data: T;
  readonly response: Response;
}

export interface RequestOptions {
  signal?: AbortSignal;
}

export interface MutationOptions extends RequestOptions {
  idempotencyKey: string;
}

export interface EtagOptions extends RequestOptions {
  ifMatch: string;
}

export interface IdempotentEtagOptions extends MutationOptions, EtagOptions {}

export interface PageFilters {
  cursor?: string | null;
  [key: string]: unknown;
}

interface JsonRequestOptions {
  workspaceId?: string;
  query?: Readonly<Record<string, unknown>>;
  signal?: AbortSignal | undefined;
  retryReads?: boolean;
  classifyFetchFailures?: boolean;
}

function requestSignal(signal: AbortSignal | undefined): AbortSignal {
  return signal ?? new AbortController().signal;
}

export function selector(value: string, name = "selector"): string {
  if (!value || value === "." || value === "..")
    throw new TypeError(`${name} must be a nonblank resource selector.`);
  return value;
}

export function withQuery(
  path: string,
  query: Readonly<Record<string, unknown>> | undefined,
): string {
  if (!query) return path;
  const parameters = new URLSearchParams();
  for (const [key, raw] of Object.entries(query)) {
    if (raw === undefined) continue;
    const values = Array.isArray(raw) ? raw : [raw];
    for (const value of values) {
      if (value === undefined) continue;
      parameters.append(key, value === null ? "" : String(value));
    }
  }
  const encoded = parameters.toString();
  return encoded ? `${path}?${encoded}` : path;
}

export async function jsonRequest<T>(
  transport: Transport,
  method: string,
  path: string,
  body: unknown,
  headers: HeadersInit | undefined,
  options: JsonRequestOptions = {},
): Promise<ResourceResult<T>> {
  const requestHeaders = new Headers(headers);
  requestHeaders.set("Accept", "application/json");
  if (options.workspaceId)
    requestHeaders.set("X-A13N-Workspace-ID", options.workspaceId);
  const hasBody = body !== undefined;
  if (hasBody) requestHeaders.set("Content-Type", "application/json");
  const init: RequestInit = {
    method,
    headers: requestHeaders,
    signal: requestSignal(options.signal),
  };
  if (hasBody) init.body = JSON.stringify(body);
  const fetcher = options.classifyFetchFailures
    ? transport.fetchOnceForRecovery
    : options.retryReads === false
      ? transport.fetchOnce
      : transport.fetch;
  const response = await fetcher(
    new Request(`${transport.baseUrl}${withQuery(path, options.query)}`, init),
  );
  if (response.status === 204 || response.status === 205)
    return { data: undefined as T, response };
  const text = await response.text();
  if (!text) return { data: undefined as T, response };
  try {
    return { data: JSON.parse(text) as T, response };
  } catch {
    throw new ProtocolError("The Service returned invalid JSON.");
  }
}

export interface BinaryResult {
  readonly response: Response;
  readonly body: ReadableStream<Uint8Array>;
  readonly closed: boolean;
  close(): Promise<void>;
}

class ScopedBinaryResult implements BinaryResult {
  readonly body: ReadableStream<Uint8Array>;
  private readonly sourceReader: ReadableStreamDefaultReader<Uint8Array>;
  private isClosed = false;
  private released = false;
  private closePromise: Promise<void> | undefined;

  constructor(
    readonly response: Response,
    source: ReadableStream<Uint8Array>,
  ) {
    this.sourceReader = source.getReader();
    this.body = new ReadableStream<Uint8Array>({
      pull: async (controller) => {
        try {
          const result = await this.sourceReader.read();
          if (result.done) {
            this.isClosed = true;
            this.releaseSource();
            controller.close();
          } else controller.enqueue(result.value);
        } catch (error) {
          this.isClosed = true;
          this.releaseSource();
          controller.error(error);
        }
      },
      cancel: (reason) => this.cancelSource(reason),
    });
  }

  get closed(): boolean {
    return this.isClosed;
  }

  close(): Promise<void> {
    return this.cancelSource(
      new DOMException("Binary download closed.", "AbortError"),
    );
  }

  private cancelSource(reason: unknown): Promise<void> {
    if (this.isClosed) return Promise.resolve();
    if (!this.closePromise) {
      this.closePromise = this.sourceReader.cancel(reason).then(() => {
        this.isClosed = true;
        this.releaseSource();
      });
    }
    return this.closePromise;
  }

  private releaseSource(): void {
    if (this.released) return;
    this.released = true;
    this.sourceReader.releaseLock();
  }
}

export async function uploadRequest<T>(
  transport: Transport,
  method: string,
  path: string,
  body: Blob | ReadableStream<Uint8Array>,
  contentType: string,
  headers: HeadersInit | undefined,
  options: JsonRequestOptions = {},
): Promise<ResourceResult<T>> {
  const requestHeaders = new Headers(headers);
  requestHeaders.set("Accept", "application/json");
  requestHeaders.set("Content-Type", contentType);
  if (options.workspaceId)
    requestHeaders.set("X-A13N-Workspace-ID", options.workspaceId);
  const init: RequestInit & { duplex?: "half" } = {
    method,
    headers: requestHeaders,
    body,
    signal: requestSignal(options.signal),
  };
  if (body instanceof ReadableStream) init.duplex = "half";
  const response = await transport.fetch(
    new Request(`${transport.baseUrl}${withQuery(path, options.query)}`, init),
  );
  const text = await response.text();
  if (!text) return { data: undefined as T, response };
  try {
    return { data: JSON.parse(text) as T, response };
  } catch {
    throw new ProtocolError("The Service returned invalid JSON.");
  }
}

export async function binaryRequest(
  transport: Transport,
  path: string,
  options: JsonRequestOptions = {},
): Promise<BinaryResult> {
  const headers = new Headers();
  if (options.workspaceId)
    headers.set("X-A13N-Workspace-ID", options.workspaceId);
  const response = await transport.fetch(
    new Request(`${transport.baseUrl}${path}`, {
      headers,
      signal: requestSignal(options.signal),
    }),
  );
  if (!response.body)
    throw new ProtocolError("The Service returned no binary response body.");
  return new ScopedBinaryResult(response, response.body);
}

export function textInput(text: string): {
  schema_version: "2";
  content: [{ type: "text"; text: string }];
} {
  return {
    schema_version: "2",
    content: [{ type: "text", text }],
  };
}

export function normalizeInput<T>(input: string | T): T {
  return (typeof input === "string" ? textInput(input) : input) as T;
}

export function rejectReservedFields(
  body: Readonly<Record<string, unknown>> | undefined,
  fields: readonly string[],
): void {
  if (!body) return;
  for (const field of fields) {
    if (Object.prototype.hasOwnProperty.call(body, field))
      throw new TypeError(`The convenience method binds ${field} locally.`);
  }
}

export interface PageLike<T> {
  readonly items: readonly T[];
  readonly next_cursor?: string | null;
}

export class PageIterator<TPage, TItem> implements AsyncIterableIterator<
  ResourceResult<TPage>
> {
  private cursor: string | null | undefined;
  private readonly seen = new Set<string>();
  private reading = false;
  private isClosed = false;

  constructor(
    cursor: string | null | undefined,
    private readonly fetchPage: (
      cursor: string | null | undefined,
    ) => Promise<ResourceResult<TPage>>,
    private readonly pageInfo: (page: TPage) => PageLike<TItem>,
  ) {
    this.cursor = cursor;
    if (typeof cursor === "string") this.seen.add(cursor);
  }

  [Symbol.asyncIterator](): this {
    return this;
  }

  async next(): Promise<IteratorResult<ResourceResult<TPage>, void>> {
    if (this.isClosed) return { done: true, value: undefined };
    if (this.reading)
      throw new TypeError("The page iterator supports one active reader.");
    this.reading = true;
    try {
      const page = await this.fetchPage(this.cursor);
      const following = this.pageInfo(page.data).next_cursor;
      if (following === null || following === undefined) this.isClosed = true;
      else {
        if (this.seen.has(following))
          throw new ProtocolError(
            "The Service returned a repeated pagination cursor.",
          );
        this.seen.add(following);
        this.cursor = following;
      }
      return { done: false, value: page };
    } finally {
      this.reading = false;
    }
  }

  async return(): Promise<IteratorResult<ResourceResult<TPage>, void>> {
    this.isClosed = true;
    return { done: true, value: undefined };
  }
}

export async function* flattenPages<TPage, TItem>(
  pages: AsyncIterable<ResourceResult<TPage>>,
  pageInfo: (page: TPage) => PageLike<TItem>,
): AsyncGenerator<TItem> {
  for await (const page of pages) {
    for (const item of pageInfo(page.data).items) yield item;
  }
}

export function snapshot<T>(value: T): T {
  return structuredClone(value);
}

export function withCursor<T extends Record<string, unknown>>(
  filters: T,
  cursor: string | null | undefined,
): T & { cursor?: string | null } {
  const copy = { ...filters } as T & { cursor?: string | null };
  if (cursor === undefined) delete copy.cursor;
  else copy.cursor = cursor;
  return copy;
}
