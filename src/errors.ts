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
  ) {
    super(message);
  }
}

export class ProtocolError extends Error {
  override readonly name = "ProtocolError";
}

/** A locally recognized transport failure with no claim about remote mutation outcome. */
export class TransportError extends Error {
  override readonly name = "TransportError";
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class WaitTimeoutError extends Error {
  override readonly name = "WaitTimeoutError";
  constructor(readonly timeoutMs: number) {
    super(
      `The resource did not reach a terminal state within ${timeoutMs} ms.`,
    );
  }
}

export class ReplayGapError extends ApiError {
  override readonly name = "ReplayGapError";
  readonly runId: string | undefined;
  readonly requestedCursor: string | undefined;
  readonly retainedFloor: string | undefined;
  readonly highWatermark: string | undefined;

  constructor(
    status: number,
    code: string,
    message: string,
    details: Record<string, unknown>,
    requestId: string | null,
    retryAfter: string | null = null,
  ) {
    super(status, code, message, details, requestId, retryAfter);
    this.runId = optionalString(details, "run_id");
    this.requestedCursor = optionalString(details, "requested_cursor");
    this.retainedFloor = optionalString(details, "retained_floor");
    this.highWatermark = optionalString(details, "high_watermark");
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function optionalString(
  value: Record<string, unknown>,
  key: string,
): string | undefined {
  const field = value[key];
  return typeof field === "string" ? field : undefined;
}

export async function requireSuccess(response: Response): Promise<void> {
  if (response.ok) return;
  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }
  const error =
    isRecord(payload) && isRecord(payload.error) ? payload.error : {};
  const code = typeof error.code === "string" ? error.code : "http_error";
  const ErrorType = code.includes("replay_gap") ? ReplayGapError : ApiError;
  throw new ErrorType(
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
  );
}

/** Extract a required representation; 204 operations should await their response directly. */
export function data<T>(result: { data?: T; response: Response }): T {
  if (result.data === undefined)
    throw new ProtocolError("The Service returned no representation.");
  return result.data;
}
