import { requireSuccess } from "./errors.js";

export type Authentication =
  | { type: "session"; csrfToken?: string }
  | { type: "bearer"; token: string | (() => string | Promise<string>) };

export interface ClientOptions {
  /** Origin, optionally with a reverse-proxy prefix. */
  baseUrl: string;
  auth: Authentication;
  fetch?: typeof globalThis.fetch;
  maxReadRetries?: number;
}

const publicMutations = new Set([
  "/api/v1/auth/bootstrap",
  "/api/v1/auth/login",
  "/api/v1/auth/password-reset",
  "/api/v1/auth/password-reset/confirm",
  "/api/v1/auth/email-change/confirm",
]);

const retryableStatuses = new Set([429, 502, 503, 504]);

export function delay(
  milliseconds: number,
  signal: AbortSignal,
): Promise<void> {
  signal.throwIfAborted();
  return new Promise((resolve, reject) => {
    const abort = () => {
      clearTimeout(timer);
      reject(signal.reason);
    };
    const timer = setTimeout(() => {
      signal.removeEventListener("abort", abort);
      resolve();
    }, milliseconds);
    signal.addEventListener("abort", abort, { once: true });
  });
}

export async function abortable<T>(
  promise: Promise<T>,
  signal: AbortSignal,
): Promise<T> {
  signal.throwIfAborted();
  return new Promise<T>((resolve, reject) => {
    const abort = () => reject(signal.reason);
    signal.addEventListener("abort", abort, { once: true });
    promise.then(
      (value) => {
        signal.removeEventListener("abort", abort);
        if (signal.aborted) reject(signal.reason);
        else resolve(value);
      },
      (error: unknown) => {
        signal.removeEventListener("abort", abort);
        reject(error);
      },
    );
  });
}

export function retryAfterMilliseconds(
  value: string | null,
  now = Date.now(),
): number | undefined {
  if (value === null) return undefined;
  const seconds = Number(value);
  const milliseconds = Number.isFinite(seconds)
    ? seconds * 1000
    : Date.parse(value) - now;
  if (!Number.isFinite(milliseconds) || milliseconds < 0) return undefined;
  return Math.min(milliseconds, 30_000);
}

export class Transport {
  readonly baseUrl: string;
  private readonly shutdown = new AbortController();
  private readonly fetcher: typeof globalThis.fetch;
  private csrfToken: string | undefined;
  private readonly retries: number;

  constructor(private readonly options: ClientOptions) {
    const url = new URL(options.baseUrl);
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password ||
      url.search ||
      url.hash
    ) {
      throw new TypeError(
        "baseUrl must be an HTTP(S) URL without credentials, query, or fragment.",
      );
    }
    this.baseUrl = url.href.replace(/\/$/, "");
    this.fetcher = options.fetch ?? globalThis.fetch.bind(globalThis);
    this.csrfToken =
      options.auth.type === "session" ? options.auth.csrfToken : undefined;
    this.retries = options.maxReadRetries ?? 2;
    if (!Number.isInteger(this.retries) || this.retries < 0 || this.retries > 5)
      throw new RangeError("maxReadRetries must be 0–5.");
  }

  httpOptions(baseUrl = this.baseUrl) {
    return {
      baseUrl,
      fetch: this.fetch,
      bodySerializer: (body: unknown) => {
        if (
          body instanceof Blob ||
          body instanceof ReadableStream ||
          body instanceof FormData
        )
          return body;
        if (
          typeof body === "object" &&
          body !== null &&
          "file" in body &&
          body.file instanceof Blob &&
          Object.keys(body).length === 1
        ) {
          const form = new FormData();
          form.append("file", body.file);
          return form;
        }
        return JSON.stringify(body);
      },
    };
  }

  setCsrfToken(token: string | undefined): void {
    this.csrfToken = token;
  }

  get signal(): AbortSignal {
    return this.shutdown.signal;
  }

  get closed(): boolean {
    return this.shutdown.signal.aborted;
  }

  close(): void {
    this.csrfToken = undefined;
    this.shutdown.abort();
  }

  fetch = async (input: Request): Promise<Response> => {
    const target = new URL(input.url);
    const base = new URL(this.baseUrl);
    const prefix = base.pathname.replace(/\/$/, "");
    const probe =
      input.method === "GET" &&
      ["/healthz", "/readyz"].some(
        (path) => target.pathname === `${prefix}${path}`,
      );
    if (
      target.origin !== base.origin ||
      (!target.pathname.startsWith(`${prefix}/api/v1/`) && !probe)
    ) {
      throw new TypeError("Requests must target the configured Service API.");
    }
    const signal = AbortSignal.any([input.signal, this.shutdown.signal]);
    signal.throwIfAborted();
    const headers = new Headers(input.headers);
    const auth = this.options.auth;
    const path = target.pathname.slice(prefix.length);
    const mutation = !["GET", "HEAD", "OPTIONS"].includes(input.method);
    if (auth.type === "bearer") {
      const token =
        typeof auth.token === "function"
          ? await abortable(Promise.resolve(auth.token()), signal)
          : auth.token;
      signal.throwIfAborted();
      headers.set("Authorization", `Bearer ${token}`);
    } else if (
      auth.type === "session" &&
      mutation &&
      !publicMutations.has(path) &&
      !/^\/api\/v1\/invitations\/[^/]+\/accept$/.test(path)
    ) {
      if (!this.csrfToken)
        throw new Error(
          "Restore the browser CSRF token before mutating Service resources.",
        );
      headers.set("X-CSRF-Token", this.csrfToken);
    }
    const request = new Request(input, {
      headers,
      signal,
      credentials: auth.type === "session" ? "same-origin" : "omit",
      redirect: "error",
    });
    const retries =
      request.method === "GET" || request.method === "HEAD" ? this.retries : 0;
    for (let attempt = 0; ; attempt++) {
      let response: Response;
      try {
        response = await this.fetcher(retries ? request.clone() : request);
      } catch (error) {
        if (signal.aborted) throw error;
        if (attempt >= retries) {
          throw error;
        }
        await delay(250 * 2 ** attempt, signal);
        continue;
      }
      if (retryableStatuses.has(response.status) && attempt < retries) {
        const milliseconds =
          retryAfterMilliseconds(response.headers.get("Retry-After")) ??
          250 * 2 ** attempt;
        await response.body?.cancel();
        await delay(milliseconds, signal);
        continue;
      }
      await requireSuccess(response);
      return response;
    }
  };
}
