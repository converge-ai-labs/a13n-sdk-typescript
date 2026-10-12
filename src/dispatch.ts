/** Per-invocation dispatch evidence; no requests, credentials or bodies are retained. */
const invocations = new WeakMap<AbortSignal, { attempted: boolean }>();

export function trackDispatch(signal: AbortSignal) {
  const evidence = { attempted: false };
  invocations.set(signal, evidence);
  return evidence;
}

export function inheritDispatch(
  request: Request,
  signal: AbortSignal | undefined,
): Request {
  const evidence = signal && invocations.get(signal);
  if (evidence) invocations.set(request.signal, evidence);
  return request;
}

export function markDispatch(signal: AbortSignal): void {
  const evidence = invocations.get(signal);
  if (evidence) evidence.attempted = true;
}
