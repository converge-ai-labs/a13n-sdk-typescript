import { isRecord, ProtocolError, WaitTimeoutError } from "../errors.js";
import type { components, operations } from "../schema.js";
import {
  ResourceRunStream,
  type ObserveRunOptions,
  type RunStream,
} from "../streams/resource-run-stream.js";
import { delay, type Transport } from "../transport.js";
import {
  flattenPages,
  jsonRequest,
  type IdempotentEtagOptions,
  type MutationOptions,
  normalizeInput,
  PageIterator,
  type RequestOptions,
  type ResourceResult,
  rejectReservedFields,
  selector,
  snapshot,
  withCursor,
} from "./base.js";
import { workspaceManagement, type WorkspaceManagement } from "./management.js";

type Schema = components["schemas"];
type QueryOf<K extends keyof operations> = Exclude<
  operations[K]["parameters"]["query"],
  undefined
>;

export type AgentInput = Schema["AgentInput"];
export type AgentResource = Schema["Agent"];
export type AgentCollectionPage = Schema["AgentCollection"];
export type AgentRevision = Schema["AgentRevision"];
export type AgentRevisionCollectionPage = Schema["AgentRevisionCollection"];
export type AgentRevisionCreateResult = Schema["AgentRevisionCreateResult"];
export type RunResource = Schema["RunResource"];
export type RunCollectionPage = Schema["RunCollection"];
export type ThreadResource = Schema["ThreadResource"];
export type RunAcceptanceReceipt = Schema["RunAcceptanceReceipt"];
export type ThreadRunSubmissionReceipt = Schema["ThreadRunSubmissionReceipt"];
export type QueuedSubmissionResource = Schema["QueuedSubmission"];
export type ItemCollectionPage = Schema["ItemCollection"];
export type PendingActionCollection = Schema["PendingActionCollection"];
export type AttemptCollection = Schema["RunAttemptCollection"];

export interface StartOptions extends MutationOptions {
  body?: Omit<Schema["StartRunRequest"], "agent_id" | "input">;
}

export interface SubmitOptions extends MutationOptions {
  body: Omit<Schema["ThreadRunSubmissionRequest"], "input">;
}

export interface WaitOptions extends RequestOptions {
  timeoutMs: number;
  pollIntervalMs?: number;
}

export interface RunAccepted<Receipt> {
  readonly outcome: "run_accepted";
  readonly run: Run;
  readonly thread: Thread;
  readonly session: Session;
  readonly receipt: ResourceResult<Receipt>;
}

export interface SubmissionQueued {
  readonly outcome: "queued";
  readonly queuedSubmission: QueuedSubmission;
  readonly thread: Thread;
  readonly receipt: ResourceResult<ThreadRunSubmissionReceipt>;
}

export type ThreadSubmission =
  RunAccepted<ThreadRunSubmissionReceipt> | SubmissionQueued;

const idPattern = /^[a-z][a-z0-9]{1,7}_[a-z0-9]{16,64}$/;
const sealedStatuses = new Set(["completed", "failed", "cancelled", "waiting"]);

function headers(options: MutationOptions): HeadersInit {
  return { "Idempotency-Key": options.idempotencyKey };
}

function guardedHeaders(options: IdempotentEtagOptions): HeadersInit {
  return {
    "Idempotency-Key": options.idempotencyKey,
    "If-Match": options.ifMatch,
  };
}

function identity(
  value: Record<string, unknown>,
  field: string,
  context: string,
): string {
  const candidate = value[field];
  if (typeof candidate !== "string" || !candidate.trim())
    throw new ProtocolError(`${context} has an invalid ${field}.`);
  return candidate;
}

function accepted<Receipt>(
  transport: Transport,
  workspaceId: string,
  receipt: ResourceResult<Receipt>,
  value: unknown,
  sourceRunId?: string,
): RunAccepted<Receipt> {
  if (!isRecord(value))
    throw new ProtocolError("Run acceptance is not an object.");
  const runId = identity(value, "run_id", "Run acceptance");
  const threadId = identity(value, "thread_id", "Run acceptance");
  const sessionId = identity(value, "session_id", "Run acceptance");
  if (sourceRunId && runId === sourceRunId)
    throw new ProtocolError("Successor acceptance must identify a new Run.");
  return {
    outcome: "run_accepted",
    run: new Run(transport, workspaceId, runId),
    thread: new Thread(transport, workspaceId, threadId),
    session: new Session(transport, workspaceId, sessionId),
    receipt,
  };
}

function validateWait(options: WaitOptions): number {
  if (!Number.isFinite(options.timeoutMs) || options.timeoutMs <= 0)
    throw new RangeError("timeoutMs must be a finite positive number.");
  const pollIntervalMs = options.pollIntervalMs ?? 500;
  if (!Number.isFinite(pollIntervalMs) || pollIntervalMs <= 0)
    throw new RangeError("pollIntervalMs must be a finite positive number.");
  return pollIntervalMs;
}

function deadlineSignal(
  remaining: number,
  transport: AbortSignal,
  caller: AbortSignal | undefined,
): AbortSignal {
  const signals = [
    transport,
    AbortSignal.timeout(Math.max(1, Math.ceil(remaining))),
  ];
  if (caller) signals.push(caller);
  return AbortSignal.any(signals);
}

export class Workspaces {
  constructor(private readonly transport: Transport) {}
  ref(workspaceId: string): Workspace {
    return new Workspace(this.transport, selector(workspaceId, "workspaceId"));
  }
}

export class Workspace {
  readonly agents: Agents;
  readonly threads: Threads;
  readonly runs: Runs;
  readonly sessions: Sessions;
  readonly models: WorkspaceManagement["models"];
  readonly modelProviders: WorkspaceManagement["modelProviders"];
  readonly webProviders: WorkspaceManagement["webProviders"];
  readonly environmentProviders: WorkspaceManagement["environmentProviders"];
  readonly environmentTemplates: WorkspaceManagement["environmentTemplates"];
  readonly environments: WorkspaceManagement["environments"];
  readonly assets: WorkspaceManagement["assets"];
  readonly connections: WorkspaceManagement["connections"];
  readonly connectorProviders: WorkspaceManagement["connectorProviders"];
  readonly memoryProviders: WorkspaceManagement["memoryProviders"];
  readonly skills: WorkspaceManagement["skills"];
  readonly hookSubscriptions: WorkspaceManagement["hookSubscriptions"];
  readonly traces: WorkspaceManagement["traces"];
  readonly lifecycleEvents: WorkspaceManagement["lifecycleEvents"];
  readonly configurationAssistant: WorkspaceManagement["configurationAssistant"];
  readonly configurationSessions: WorkspaceManagement["configurationSessions"];
  readonly configurationDrafts: WorkspaceManagement["configurationDrafts"];
  readonly applicationAccounts: WorkspaceManagement["applicationAccounts"];
  readonly bots: WorkspaceManagement["bots"];
  readonly invitations: WorkspaceManagement["invitations"];
  readonly roleBindings: WorkspaceManagement["roleBindings"];
  readonly permissions: WorkspaceManagement["permissions"];
  readonly members: WorkspaceManagement["members"];
  readonly personalApiKeys: WorkspaceManagement["personalApiKeys"];
  readonly serviceAccounts: WorkspaceManagement["serviceAccounts"];

  constructor(
    readonly transport: Transport,
    readonly id: string,
  ) {
    this.agents = new Agents(transport, id);
    this.threads = new Threads(transport, id);
    this.runs = new Runs(transport, id);
    this.sessions = new Sessions(transport, id);
    const management = workspaceManagement(transport, id);
    this.models = management.models;
    this.modelProviders = management.modelProviders;
    this.webProviders = management.webProviders;
    this.environmentProviders = management.environmentProviders;
    this.environmentTemplates = management.environmentTemplates;
    this.environments = management.environments;
    this.assets = management.assets;
    this.connections = management.connections;
    this.connectorProviders = management.connectorProviders;
    this.memoryProviders = management.memoryProviders;
    this.skills = management.skills;
    this.hookSubscriptions = management.hookSubscriptions;
    this.traces = management.traces;
    this.lifecycleEvents = management.lifecycleEvents;
    this.configurationAssistant = management.configurationAssistant;
    this.configurationSessions = management.configurationSessions;
    this.configurationDrafts = management.configurationDrafts;
    this.applicationAccounts = management.applicationAccounts;
    this.bots = management.bots;
    this.invitations = management.invitations;
    this.roleBindings = management.roleBindings;
    this.permissions = management.permissions;
    this.members = management.members;
    this.personalApiKeys = management.personalApiKeys;
    this.serviceAccounts = management.serviceAccounts;
  }
}

export type AgentListFilters = Omit<
  QueryOf<"get_workspaces_workspace_agents">,
  "cursor"
> & { cursor?: string | null };

export class Agents {
  constructor(
    private readonly transport: Transport,
    readonly workspaceId: string,
  ) {}

  ref(agent: string): Agent {
    return new Agent(
      this.transport,
      this.workspaceId,
      selector(agent, "agent"),
    );
  }

  list(
    filters: AgentListFilters = {},
    options: RequestOptions = {},
  ): Promise<ResourceResult<AgentCollectionPage>> {
    return jsonRequest(
      this.transport,
      "GET",
      `/api/v1/workspaces/${encodeURIComponent(this.workspaceId)}/agents`,
      undefined,
      undefined,
      { query: filters, workspaceId: this.workspaceId, signal: options.signal },
    );
  }

  pages(
    filters: AgentListFilters = {},
    options: RequestOptions = {},
  ): PageIterator<AgentCollectionPage, AgentResource> {
    const saved = snapshot(filters);
    return new PageIterator(
      saved.cursor,
      (cursor) => this.list(withCursor(saved, cursor), options),
      (page) => page,
    );
  }

  iterate(
    filters: AgentListFilters = {},
    options: RequestOptions = {},
  ): AsyncIterable<AgentResource> {
    return flattenPages(this.pages(filters, options), (page) => page);
  }

  create(
    body: Schema["CreateAgentRequest"],
    options: MutationOptions,
  ): Promise<ResourceResult<Schema["AgentRevisionCreateResult"]>> {
    return jsonRequest(
      this.transport,
      "POST",
      `/api/v1/workspaces/${encodeURIComponent(this.workspaceId)}/agents`,
      body,
      headers(options),
      { workspaceId: this.workspaceId, signal: options.signal },
    );
  }
}

export class Agent {
  readonly revisions: AgentRevisions;

  constructor(
    private readonly transport: Transport,
    readonly workspaceId: string,
    readonly selector: string,
  ) {
    this.revisions = new AgentRevisions(transport, workspaceId, selector);
  }

  get(options: RequestOptions = {}): Promise<ResourceResult<AgentResource>> {
    return jsonRequest(
      this.transport,
      "GET",
      `/api/v1/workspaces/${encodeURIComponent(this.workspaceId)}/agents/${encodeURIComponent(this.selector)}`,
      undefined,
      undefined,
      { workspaceId: this.workspaceId, signal: options.signal },
    );
  }

  update(
    body: Schema["UpdateAgentRequest"],
    options: { ifMatch: string; signal?: AbortSignal },
  ): Promise<ResourceResult<AgentResource>> {
    return jsonRequest(
      this.transport,
      "PATCH",
      `/api/v1/workspaces/${encodeURIComponent(this.workspaceId)}/agents/${encodeURIComponent(this.selector)}`,
      body,
      { "If-Match": options.ifMatch },
      { workspaceId: this.workspaceId, signal: options.signal },
    );
  }

  changeLifecycle(
    action: string,
    options: IdempotentEtagOptions,
  ): Promise<ResourceResult<AgentResource>> {
    return jsonRequest(
      this.transport,
      "POST",
      `/api/v1/workspaces/${encodeURIComponent(this.workspaceId)}/agents/${encodeURIComponent(this.selector)}/${encodeURIComponent(selector(action, "action"))}`,
      undefined,
      guardedHeaders(options),
      { workspaceId: this.workspaceId, signal: options.signal },
    );
  }

  async start(
    input: string | AgentInput,
    options: StartOptions,
  ): Promise<RunAccepted<RunAcceptanceReceipt>> {
    rejectReservedFields(options.body, ["agent_id", "input"]);
    const agentId = idPattern.test(this.selector)
      ? this.selector
      : (await this.get(options.signal ? { signal: options.signal } : {})).data
          .id;
    const body: Schema["StartRunRequest"] = {
      ...options.body,
      agent_id: agentId,
      input: normalizeInput<AgentInput>(input),
    };
    const receipt = await jsonRequest<RunAcceptanceReceipt>(
      this.transport,
      "POST",
      `/api/v1/workspaces/${encodeURIComponent(this.workspaceId)}/runs`,
      body,
      headers(options),
      { workspaceId: this.workspaceId, signal: options.signal },
    );
    return accepted(this.transport, this.workspaceId, receipt, receipt.data);
  }
}

export type AgentRevisionListFilters = Omit<
  QueryOf<"get_workspaces_workspace_agents_agent_revisions">,
  "cursor"
> & { cursor?: string | null };

export class AgentRevisions {
  private readonly path: string;

  constructor(
    private readonly transport: Transport,
    readonly workspaceId: string,
    readonly agent: string,
  ) {
    this.path = `/api/v1/workspaces/${encodeURIComponent(workspaceId)}/agents/${encodeURIComponent(agent)}/revisions`;
  }

  list(
    filters: AgentRevisionListFilters = {},
    options: RequestOptions = {},
  ): Promise<ResourceResult<AgentRevisionCollectionPage>> {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      query: filters,
      workspaceId: this.workspaceId,
      signal: options.signal,
    });
  }

  pages(
    filters: AgentRevisionListFilters = {},
    options: RequestOptions = {},
  ): PageIterator<AgentRevisionCollectionPage, AgentRevision> {
    const saved = snapshot(filters);
    return new PageIterator(
      saved.cursor,
      (cursor) => this.list(withCursor(saved, cursor), options),
      (page) => page,
    );
  }

  iterate(
    filters: AgentRevisionListFilters = {},
    options: RequestOptions = {},
  ): AsyncIterable<AgentRevision> {
    return flattenPages(this.pages(filters, options), (page) => page);
  }

  create(
    body: Schema["CreateAgentRevisionRequest"],
    options: IdempotentEtagOptions,
  ): Promise<ResourceResult<AgentRevisionCreateResult>> {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      guardedHeaders(options),
      { workspaceId: this.workspaceId, signal: options.signal },
    );
  }

  setDefault(
    revisionId: string,
    body: Schema["SetDefaultAgentRevisionRequest"],
    options: IdempotentEtagOptions,
  ): Promise<ResourceResult<AgentRevisionCreateResult>> {
    return jsonRequest(
      this.transport,
      "POST",
      `${this.path}/${encodeURIComponent(selector(revisionId, "revisionId"))}/default`,
      body,
      guardedHeaders(options),
      { workspaceId: this.workspaceId, signal: options.signal },
    );
  }
}

export class Threads {
  constructor(
    private readonly transport: Transport,
    readonly workspaceId: string,
  ) {}
  ref(threadId: string): Thread {
    return new Thread(
      this.transport,
      this.workspaceId,
      selector(threadId, "threadId"),
    );
  }
}

export class Thread {
  readonly queuedSubmissions: QueuedSubmissions;
  readonly runs: ThreadRuns;

  constructor(
    private readonly transport: Transport,
    readonly workspaceId: string,
    readonly id: string,
  ) {
    this.queuedSubmissions = new QueuedSubmissions(transport, workspaceId, id);
    this.runs = new ThreadRuns(transport, workspaceId, id);
  }

  get(options: RequestOptions = {}): Promise<ResourceResult<ThreadResource>> {
    return jsonRequest(
      this.transport,
      "GET",
      `/api/v1/threads/${encodeURIComponent(this.id)}`,
      undefined,
      undefined,
      { workspaceId: this.workspaceId, signal: options.signal },
    );
  }

  async submit(
    input: string | AgentInput,
    options: SubmitOptions,
  ): Promise<ThreadSubmission> {
    rejectReservedFields(options.body, ["input"]);
    const body: Schema["ThreadRunSubmissionRequest"] = {
      ...options.body,
      input: normalizeInput<AgentInput>(input),
    };
    const receipt = await jsonRequest<ThreadRunSubmissionReceipt>(
      this.transport,
      "POST",
      `/api/v1/threads/${encodeURIComponent(this.id)}/runs`,
      body,
      headers(options),
      { workspaceId: this.workspaceId, signal: options.signal },
    );
    const value: unknown = receipt.data;
    if (!isRecord(value))
      throw new ProtocolError("Thread submission receipt is not an object.");
    if (
      value.outcome === "run_accepted" &&
      isRecord(value.run) &&
      !value.queued_submission
    ) {
      if (identity(value.run, "thread_id", "Accepted Run") !== this.id)
        throw new ProtocolError(
          "Accepted Run does not belong to the bound Thread.",
        );
      return accepted(this.transport, this.workspaceId, receipt, value.run);
    }
    if (
      value.outcome === "queued" &&
      isRecord(value.queued_submission) &&
      !value.run
    ) {
      const queued = value.queued_submission;
      const threadId = identity(queued, "thread_id", "Queued submission");
      const queuedSubmissionId = identity(
        queued,
        "queued_submission_id",
        "Queued submission",
      );
      if (threadId !== this.id)
        throw new ProtocolError(
          "Queued submission does not belong to the bound Thread.",
        );
      return {
        outcome: "queued",
        queuedSubmission: new QueuedSubmission(
          this.transport,
          this.workspaceId,
          queuedSubmissionId,
        ),
        thread: this,
        receipt,
      };
    }
    throw new ProtocolError(
      "Thread submission has no matching resource disposition.",
    );
  }
}

export type RunListFilters = Omit<
  QueryOf<"get_workspaces_workspace_runs">,
  "cursor"
> & { cursor?: string | null };

export class Runs {
  constructor(
    private readonly transport: Transport,
    readonly workspaceId: string,
  ) {}
  ref(runId: string): Run {
    return new Run(this.transport, this.workspaceId, selector(runId, "runId"));
  }
  list(
    filters: RunListFilters = {},
    options: RequestOptions = {},
  ): Promise<ResourceResult<RunCollectionPage>> {
    return jsonRequest(
      this.transport,
      "GET",
      `/api/v1/workspaces/${encodeURIComponent(this.workspaceId)}/runs`,
      undefined,
      undefined,
      { query: filters, workspaceId: this.workspaceId, signal: options.signal },
    );
  }
  pages(
    filters: RunListFilters = {},
    options: RequestOptions = {},
  ): PageIterator<RunCollectionPage, RunResource> {
    const saved = snapshot(filters);
    return new PageIterator(
      saved.cursor,
      (cursor) => this.list(withCursor(saved, cursor), options),
      (page) => page,
    );
  }
  iterate(
    filters: RunListFilters = {},
    options: RequestOptions = {},
  ): AsyncIterable<RunResource> {
    return flattenPages(this.pages(filters, options), (page) => page);
  }
}

export class Run {
  readonly steers: RunSteers;
  readonly items: RunItems;
  readonly pendingActions: RunPendingActions;
  readonly attempts: RunAttempts;

  constructor(
    private readonly transport: Transport,
    readonly workspaceId: string,
    readonly id: string,
  ) {
    this.steers = new RunSteers(transport, workspaceId, id);
    this.items = new RunItems(transport, workspaceId, id);
    this.pendingActions = new RunPendingActions(transport, workspaceId, id);
    this.attempts = new RunAttempts(transport, workspaceId, id);
  }

  get(options: RequestOptions = {}): Promise<ResourceResult<RunResource>> {
    return jsonRequest(
      this.transport,
      "GET",
      `/api/v1/runs/${encodeURIComponent(this.id)}`,
      undefined,
      undefined,
      { workspaceId: this.workspaceId, signal: options.signal },
    );
  }

  async wait(options: WaitOptions): Promise<ResourceResult<RunResource>> {
    const pollIntervalMs = validateWait(options);
    const deadline = performance.now() + options.timeoutMs;
    while (true) {
      options.signal?.throwIfAborted();
      this.transport.signal.throwIfAborted();
      const remaining = deadline - performance.now();
      if (remaining <= 0) throw new WaitTimeoutError(options.timeoutMs);
      const signal = deadlineSignal(
        remaining,
        this.transport.signal,
        options.signal,
      );
      try {
        const result = await this.get({ signal });
        if (sealedStatuses.has(result.data.status)) return result;
        const sleep = Math.min(pollIntervalMs, deadline - performance.now());
        if (sleep <= 0) throw new WaitTimeoutError(options.timeoutMs);
        await delay(sleep, signal);
      } catch (error) {
        if (options.signal?.aborted) throw options.signal.reason;
        if (this.transport.signal.aborted) throw this.transport.signal.reason;
        if (performance.now() >= deadline || signal.aborted)
          throw new WaitTimeoutError(options.timeoutMs);
        throw error;
      }
    }
  }

  stream(options: ObserveRunOptions = {}): RunStream {
    return new ResourceRunStream(this, this.transport, options);
  }

  steer(
    input: string | AgentInput,
    options: MutationOptions,
  ): Promise<ResourceResult<Schema["SteerReceipt"]>> {
    return jsonRequest(
      this.transport,
      "POST",
      `/api/v1/runs/${encodeURIComponent(this.id)}/steer`,
      normalizeInput<AgentInput>(input),
      headers(options),
      { workspaceId: this.workspaceId, signal: options.signal },
    );
  }

  cancel(
    body: Schema["InterruptRequest"],
    options: MutationOptions,
  ): Promise<ResourceResult<Schema["InterruptReceipt"]>> {
    return jsonRequest(
      this.transport,
      "POST",
      `/api/v1/runs/${encodeURIComponent(this.id)}/interrupt`,
      body,
      headers(options),
      { workspaceId: this.workspaceId, signal: options.signal },
    );
  }

  feedback(
    body: Schema["WaitingRunFeedbackRequest"],
    options: MutationOptions,
  ): Promise<RunAccepted<RunAcceptanceReceipt>> {
    return this.successor("feedback", body, options);
  }

  retry(
    body: Schema["RetryRunRequest"],
    options: MutationOptions,
  ): Promise<RunAccepted<RunAcceptanceReceipt>> {
    return this.successor("retry", body, options);
  }

  continueFrom(
    body: Schema["ContinueRunRequest"],
    options: MutationOptions,
  ): Promise<RunAccepted<RunAcceptanceReceipt>> {
    return this.successor("continue", body, options, true);
  }

  fork(
    body: Schema["ForkRunRequest"],
    options: MutationOptions,
  ): Promise<RunAccepted<RunAcceptanceReceipt>> {
    return this.successor("fork", body, options);
  }

  private async successor(
    command: "feedback" | "retry" | "continue" | "fork",
    body:
      | Schema["WaitingRunFeedbackRequest"]
      | Schema["RetryRunRequest"]
      | Schema["ContinueRunRequest"]
      | Schema["ForkRunRequest"],
    options: MutationOptions,
    sourcePath = false,
  ): Promise<RunAccepted<RunAcceptanceReceipt>> {
    const receipt = await jsonRequest<RunAcceptanceReceipt>(
      this.transport,
      "POST",
      sourcePath
        ? `/api/v1/runs/${encodeURIComponent(this.id)}/continue`
        : `/api/v1/runs/${encodeURIComponent(this.id)}/${command}`,
      body,
      headers(options),
      { workspaceId: this.workspaceId, signal: options.signal },
    );
    return accepted(
      this.transport,
      this.workspaceId,
      receipt,
      receipt.data,
      this.id,
    );
  }
}

export class RunSteers {
  constructor(
    private readonly transport: Transport,
    private readonly workspaceId: string,
    private readonly runId: string,
  ) {}
  ref(steerId: string): RunSteer {
    return new RunSteer(
      this.transport,
      this.workspaceId,
      this.runId,
      selector(steerId, "steerId"),
    );
  }
}

export class RunSteer {
  constructor(
    private readonly transport: Transport,
    private readonly workspaceId: string,
    private readonly runId: string,
    readonly id: string,
  ) {}
  get(
    options: RequestOptions = {},
  ): Promise<ResourceResult<Schema["SteerStatus"]>> {
    return jsonRequest(
      this.transport,
      "GET",
      `/api/v1/runs/${encodeURIComponent(this.runId)}/steers/${encodeURIComponent(this.id)}`,
      undefined,
      undefined,
      { workspaceId: this.workspaceId, signal: options.signal },
    );
  }
}

export type ItemListFilters = Omit<
  QueryOf<"get_runs_run_id_items">,
  "cursor"
> & { cursor?: string | null };

export class RunItems {
  constructor(
    private readonly transport: Transport,
    private readonly workspaceId: string,
    private readonly runId: string,
  ) {}
  list(
    filters: ItemListFilters = {},
    options: RequestOptions = {},
  ): Promise<ResourceResult<ItemCollectionPage>> {
    return jsonRequest(
      this.transport,
      "GET",
      `/api/v1/runs/${encodeURIComponent(this.runId)}/items`,
      undefined,
      undefined,
      { query: filters, workspaceId: this.workspaceId, signal: options.signal },
    );
  }
  pages(
    filters: ItemListFilters = {},
    options: RequestOptions = {},
  ): PageIterator<ItemCollectionPage, Schema["ItemResource"]> {
    const saved = snapshot(filters);
    return new PageIterator(
      saved.cursor,
      (cursor) => this.list(withCursor(saved, cursor), options),
      (page) => page,
    );
  }
  iterate(
    filters: ItemListFilters = {},
    options: RequestOptions = {},
  ): AsyncIterable<Schema["ItemResource"]> {
    return flattenPages(this.pages(filters, options), (page) => page);
  }
}

export class RunPendingActions {
  constructor(
    private readonly transport: Transport,
    private readonly workspaceId: string,
    private readonly runId: string,
  ) {}
  list(
    options: RequestOptions = {},
  ): Promise<ResourceResult<PendingActionCollection>> {
    return jsonRequest(
      this.transport,
      "GET",
      `/api/v1/runs/${encodeURIComponent(this.runId)}/pending-actions`,
      undefined,
      undefined,
      { workspaceId: this.workspaceId, signal: options.signal },
    );
  }
}

export class RunAttempts {
  constructor(
    private readonly transport: Transport,
    private readonly workspaceId: string,
    private readonly runId: string,
  ) {}
  list(
    options: RequestOptions = {},
  ): Promise<ResourceResult<AttemptCollection>> {
    return jsonRequest(
      this.transport,
      "GET",
      `/api/v1/runs/${encodeURIComponent(this.runId)}/attempts`,
      undefined,
      undefined,
      { workspaceId: this.workspaceId, signal: options.signal },
    );
  }
}

export type ThreadRunListFilters = Omit<
  QueryOf<"get_threads_thread_id_runs">,
  "cursor"
> & { cursor?: string | null };

export class ThreadRuns {
  constructor(
    private readonly transport: Transport,
    private readonly workspaceId: string,
    private readonly threadId: string,
  ) {}
  list(
    filters: ThreadRunListFilters = {},
    options: RequestOptions = {},
  ): Promise<ResourceResult<RunCollectionPage>> {
    return jsonRequest(
      this.transport,
      "GET",
      `/api/v1/threads/${encodeURIComponent(this.threadId)}/runs`,
      undefined,
      undefined,
      { query: filters, workspaceId: this.workspaceId, signal: options.signal },
    );
  }
  pages(
    filters: ThreadRunListFilters = {},
    options: RequestOptions = {},
  ): PageIterator<RunCollectionPage, RunResource> {
    const saved = snapshot(filters);
    return new PageIterator(
      saved.cursor,
      (cursor) => this.list(withCursor(saved, cursor), options),
      (page) => page,
    );
  }
  iterate(
    filters: ThreadRunListFilters = {},
    options: RequestOptions = {},
  ): AsyncIterable<RunResource> {
    return flattenPages(this.pages(filters, options), (page) => page);
  }
}

export class QueuedSubmissions {
  constructor(
    private readonly transport: Transport,
    private readonly workspaceId: string,
    private readonly threadId: string,
  ) {}
  ref(queuedSubmissionId: string): QueuedSubmission {
    return new QueuedSubmission(
      this.transport,
      this.workspaceId,
      selector(queuedSubmissionId, "queuedSubmissionId"),
    );
  }
  list(
    options: RequestOptions = {},
  ): Promise<ResourceResult<Schema["QueuedSubmissionCollection"]>> {
    return jsonRequest(
      this.transport,
      "GET",
      `/api/v1/threads/${encodeURIComponent(this.threadId)}/queued-submissions`,
      undefined,
      undefined,
      { workspaceId: this.workspaceId, signal: options.signal },
    );
  }
  reorder(
    body: Schema["ReorderQueuedSubmissionsRequest"],
    options: MutationOptions,
  ): Promise<ResourceResult<Schema["ThreadQueueMutationReceipt"]>> {
    return jsonRequest(
      this.transport,
      "POST",
      `/api/v1/threads/${encodeURIComponent(this.threadId)}/queued-submissions/reorder`,
      body,
      headers(options),
      { workspaceId: this.workspaceId, signal: options.signal },
    );
  }
  consume(
    body: Schema["ConsumeQueuedSubmissionRequest"],
    options: MutationOptions,
  ): Promise<ResourceResult<Schema["QueuedSubmissionConsumptionReceipt"]>> {
    return jsonRequest(
      this.transport,
      "POST",
      `/api/v1/threads/${encodeURIComponent(this.threadId)}/queued-submissions/consume`,
      body,
      headers(options),
      { workspaceId: this.workspaceId, signal: options.signal },
    );
  }
}

export class QueuedSubmission {
  constructor(
    private readonly transport: Transport,
    readonly workspaceId: string,
    readonly id: string,
  ) {}
  get(
    options: RequestOptions = {},
  ): Promise<ResourceResult<QueuedSubmissionResource>> {
    return jsonRequest(
      this.transport,
      "GET",
      `/api/v1/queued-submissions/${encodeURIComponent(this.id)}`,
      undefined,
      undefined,
      { workspaceId: this.workspaceId, signal: options.signal },
    );
  }
  async wait(
    options: WaitOptions,
  ): Promise<ResourceResult<QueuedSubmissionResource>> {
    const pollIntervalMs = validateWait(options);
    const deadline = performance.now() + options.timeoutMs;
    while (true) {
      options.signal?.throwIfAborted();
      this.transport.signal.throwIfAborted();
      const remaining = deadline - performance.now();
      if (remaining <= 0) throw new WaitTimeoutError(options.timeoutMs);
      const signal = deadlineSignal(
        remaining,
        this.transport.signal,
        options.signal,
      );
      try {
        const result = await this.get({ signal });
        if (["consumed", "failed"].includes(result.data.state)) return result;
        const sleep = Math.min(pollIntervalMs, deadline - performance.now());
        if (sleep <= 0) throw new WaitTimeoutError(options.timeoutMs);
        await delay(sleep, signal);
      } catch (error) {
        if (options.signal?.aborted) throw options.signal.reason;
        if (this.transport.signal.aborted) throw this.transport.signal.reason;
        if (performance.now() >= deadline || signal.aborted)
          throw new WaitTimeoutError(options.timeoutMs);
        throw error;
      }
    }
  }
  update(
    body: Schema["UpdateQueuedSubmissionRequest"],
    options: MutationOptions,
  ): Promise<ResourceResult<Schema["QueuedSubmissionMutationReceipt"]>> {
    return jsonRequest(
      this.transport,
      "PATCH",
      `/api/v1/queued-submissions/${encodeURIComponent(this.id)}`,
      body,
      headers(options),
      { workspaceId: this.workspaceId, signal: options.signal },
    );
  }
  delete(
    options: MutationOptions & { expectedVersion: number },
  ): Promise<ResourceResult<void>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      `/api/v1/queued-submissions/${encodeURIComponent(this.id)}`,
      undefined,
      headers(options),
      {
        workspaceId: this.workspaceId,
        signal: options.signal,
        query: { expected_version: options.expectedVersion },
      },
    );
  }
}

export type SessionListFilters = Omit<
  QueryOf<"get_workspaces_workspace_sessions">,
  "cursor"
> & { cursor?: string | null };

export class Sessions {
  constructor(
    private readonly transport: Transport,
    readonly workspaceId: string,
  ) {}
  ref(sessionId: string): Session {
    return new Session(
      this.transport,
      this.workspaceId,
      selector(sessionId, "sessionId"),
    );
  }
  list(
    filters: SessionListFilters = {},
    options: RequestOptions = {},
  ): Promise<ResourceResult<Schema["SessionCollection"]>> {
    return jsonRequest(
      this.transport,
      "GET",
      `/api/v1/workspaces/${encodeURIComponent(this.workspaceId)}/sessions`,
      undefined,
      undefined,
      { query: filters, workspaceId: this.workspaceId, signal: options.signal },
    );
  }
}

export class Session {
  constructor(
    private readonly transport: Transport,
    readonly workspaceId: string,
    readonly id: string,
  ) {}
  threads(
    filters: QueryOf<"get_sessions_session_id_threads"> = {},
    options: RequestOptions = {},
  ): Promise<ResourceResult<Schema["ThreadCollection"]>> {
    return jsonRequest(
      this.transport,
      "GET",
      `/api/v1/sessions/${encodeURIComponent(this.id)}/threads`,
      undefined,
      undefined,
      { query: filters, workspaceId: this.workspaceId, signal: options.signal },
    );
  }
}
