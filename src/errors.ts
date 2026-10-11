/** Errors preserve safe Service evidence without retaining requests or credentials. */
export class ApiError extends Error {
  override readonly name: string = "ApiError";
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly details: Record<string, unknown>,
    readonly requestId: string | null,
    readonly retryAfter: string | null = null,
    cause?: unknown,
  ) {
    super(message, cause === undefined ? undefined : { cause });
  }
}

export class ProtocolError extends Error {
  override readonly name = "ProtocolError";
}

/** An attempted mutation has no reliable acknowledgement. Never automatically replay it. */
export class SubmissionUnknownError extends Error {
  override readonly name = "SubmissionUnknownError";
  constructor(
    readonly idempotencyKey: string,
    readonly operation: "start" | "send" | "resume",
    readonly identities: Readonly<{
      agentId?: string;
      threadId?: string;
      runId?: string;
    }>,
    cause: unknown,
  ) {
    super(
      `The ${operation} submission outcome is unknown; retain its idempotency key for recovery.`,
      { cause },
    );
  }
}

/** Preview stopped because faithful root assistant text can no longer be projected. */
export class PreviewInterruptedError extends Error {
  override readonly name = "PreviewInterruptedError";
  constructor(message: string, cause?: unknown) {
    super(message, { cause });
  }
}

export class WaitTimeoutError extends Error {
  override readonly name = "WaitTimeoutError";
  constructor(readonly timeoutMs: number) {
    super(
      `The Run did not reach a terminal or waiting state within ${timeoutMs} ms.`,
    );
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// A bare gateway status is not evidence that Service rejected a mutation.
const serviceRejections = new WeakSet<ApiError>();
export function isServiceRejection(error: unknown): error is ApiError {
  return error instanceof ApiError && serviceRejections.has(error);
}

export async function requireSuccess(response: Response): Promise<void> {
  if (response.ok) return;
  let payload: unknown;
  let failure: unknown;
  try {
    payload = await response.json();
  } catch (cause) {
    failure = cause;
    payload = null;
  }
  const error =
    isRecord(payload) && isRecord(payload.error) ? payload.error : {};
  const code = typeof error.code === "string" ? error.code : "http_error";
  const result = new ApiError(
    response.status,
    code,
    typeof error.message === "string"
      ? error.message
      : `Service request failed (${response.status}).`,
    isRecord(error.details) ? error.details : {},
    typeof error.request_id === "string"
      ? error.request_id
      : response.headers.get("X-Request-ID"),
    response.headers.get("Retry-After"),
    failure,
  );
  if (
    typeof error.code === "string" &&
    typeof error.message === "string" &&
    isRecord(error.details) &&
    (typeof error.request_id === "string" || error.request_id === null)
  )
    serviceRejections.add(result);
  throw result;
}

/** Extract a required representation; 204 operations should await their response directly. */
export function data<T>(result: { data?: T; response: Response }): T {
  if (result.data === undefined)
    throw new ProtocolError("The Service returned no representation.");
  return result.data;
}
