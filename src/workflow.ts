import type { components } from "./schema.js";

type Schema = components["schemas"];
/** Public structural values backed by the pinned Service contract. */
export type RunOptions = Schema["RunOptions-Input"];
export type RunConfiguration = Schema["RunConfiguration-Input"];
export type AgentOverride = Schema["AgentOverride-Input"];
export type MemoryMount = Schema["MemoryMount"];
export type EnvironmentMounts = Schema["InitialMounts"];
export type McpHeaders = Schema["McpHeaders"];
export type MessageHistory = Schema["MessageHistory"];
export type PendingCall = Schema["PendingCall"];
export type RunStatus = Schema["RunStatus"];
export type Failure = Schema["Failure"];
export type MessagePayload = Schema["MessagePayload"];
export type InputPart = Schema["Part"];
export type MessageInput =
  string | readonly (string | InputPart)[] | MessagePayload;

export const text = (value: string): Schema["TextPart"] => ({
  type: "text",
  text: value,
});
export const json = (value: unknown): Schema["JsonPart"] => ({
  type: "json",
  value,
});
export const url = (value: string): Schema["UrlPart"] => ({
  type: "url",
  url: value,
});
export const asset = (id: string): Schema["AssetPart"] => ({
  type: "asset",
  asset_id: id,
});

export function messagePayload(input: MessageInput): MessagePayload {
  if (typeof input === "string") return { content: [text(input)] };
  if (Array.isArray(input))
    return {
      content: input.map((part) =>
        typeof part === "string" ? text(part) : part,
      ),
    };
  return input as MessagePayload;
}

export type ResumeAnswer = Schema["ApprovalDecision"] | Schema["CallResult"];
export type ResumeAnswers = Readonly<Record<string, ResumeAnswer>>;
export const approve = (): Schema["Approve"] => ({ action: "approve" });
export const deny = (reason?: string | null): Schema["Deny"] => ({
  action: "deny",
  ...(reason !== undefined ? { reason } : {}),
});
export const returned = (value: unknown): Schema["Returned"] => ({
  status: "returned",
  value,
});
export const failed = (message: string): Schema["Failed"] => ({
  status: "failed",
  message,
});

export interface SubmissionOptions {
  /** Omit for one generated key; persist a caller key before dispatch for durable jobs. */
  idempotencyKey?: string;
  signal?: AbortSignal;
}
export interface SendOptions extends SubmissionOptions {
  agentRevisionId?: string | null;
  delivery?: Schema["Delivery"];
  options?: RunOptions;
}
export interface StartOptions extends SendOptions {
  sessionId?: string | null;
  messageHistory?: MessageHistory;
  memories?: MemoryMount[];
  environments?: EnvironmentMounts;
  mcpHeaders?: McpHeaders;
}
export interface ResumeOptions extends SubmissionOptions {
  input?: MessageInput | null;
}

export function resumePayload(
  answers: ResumeAnswers,
  input: MessageInput | null | undefined,
): Schema["Resume"] {
  const approvals: Schema["Resume"]["approvals"] = {};
  const calls: Schema["Resume"]["calls"] = {};
  for (const [id, answer] of Object.entries(answers)) {
    if ("action" in answer)
      Object.defineProperty(approvals, id, { value: answer, enumerable: true });
    else Object.defineProperty(calls, id, { value: answer, enumerable: true });
  }
  return {
    approvals,
    calls,
    ...(input !== undefined
      ? { input: input === null ? null : messagePayload(input) }
      : {}),
  };
}

export function submissionKey(key: string | undefined): string {
  return key ?? globalThis.crypto.randomUUID();
}

export function sendFields(options: SendOptions) {
  return {
    ...(options.agentRevisionId !== undefined
      ? { agent_revision_id: options.agentRevisionId }
      : {}),
    ...(options.delivery !== undefined ? { delivery: options.delivery } : {}),
    ...(options.options !== undefined ? { options: options.options } : {}),
  };
}
export function startFields(options: StartOptions) {
  return {
    ...sendFields(options),
    ...(options.sessionId !== undefined
      ? { session_id: options.sessionId }
      : {}),
    ...(options.messageHistory !== undefined
      ? { message_history: options.messageHistory }
      : {}),
    ...(options.memories !== undefined ? { memories: options.memories } : {}),
    ...(options.environments !== undefined
      ? { environments: options.environments }
      : {}),
    ...(options.mcpHeaders !== undefined
      ? { mcp_headers: options.mcpHeaders }
      : {}),
  };
}
