import { WaitTimeoutError } from "../errors.js";
import type { components } from "../schema.js";
import {
  threadStream,
  type ThreadStreamOptions,
} from "../streams/thread-stream.js";
import { delay, type Transport } from "../transport.js";
import {
  flattenPages,
  jsonRequest,
  normalizeInput,
  PageIterator,
  selector,
  snapshot,
  type EtagOptions,
  type MutationOptions,
  type RequestOptions,
  type ResourceResult,
  withCursor,
} from "./base.js";
import { workspaceManagement, type WorkspaceManagement } from "./management.js";

type S = components["schemas"];
type Filters = Record<string, string | number | boolean | null | undefined> & {
  cursor?: string | null;
};
export type AgentResource = S["Agent"];
export type AgentRevision = S["AgentRevision"];
export type RunResource = S["RunView"];
export type ThreadResource = S["ThreadView"];
export type Submitted = S["Submitted"];
export type WaitOptions = RequestOptions & {
  timeoutMs: number;
  pollIntervalMs?: number;
};

function path(...parts: string[]): string {
  return `/api/v1/${parts.map((part) => encodeURIComponent(selector(part))).join("/")}`;
}
function workspacePath(workspaceId: string, ...parts: string[]): string {
  return path("workspaces", workspaceId, ...parts);
}
function headers(
  options?: MutationOptions | EtagOptions,
): HeadersInit | undefined {
  if (!options) return undefined;
  const result = new Headers();
  if ("idempotencyKey" in options)
    result.set("Idempotency-Key", options.idempotencyKey);
  if ("ifMatch" in options) result.set("If-Match", options.ifMatch);
  return result;
}
function page<TPage extends { items: T[]; next_cursor: string | null }, T>(
  filters: Filters,
  get: (
    filters: Filters,
    options?: RequestOptions,
  ) => Promise<ResourceResult<TPage>>,
  options?: RequestOptions,
): PageIterator<TPage, T> {
  const stable = snapshot(filters);
  return new PageIterator(
    stable.cursor,
    (cursor) => get(withCursor(stable, cursor), options),
    (result) => result,
  );
}

export class Workspaces {
  constructor(private readonly transport: Transport) {}
  ref(id: string): Workspace {
    return new Workspace(this.transport, selector(id, "workspace ID"));
  }
  list(
    filters: Filters = {},
    options?: RequestOptions,
  ): Promise<ResourceResult<S["WorkspacePage"]>> {
    return jsonRequest(
      this.transport,
      "GET",
      path("workspaces"),
      undefined,
      undefined,
      { query: filters, signal: options?.signal },
    );
  }
  pages(filters: Filters = {}, options?: RequestOptions) {
    return page<S["WorkspacePage"], S["Workspace"]>(
      filters,
      (f, o) => this.list(f, o),
      options,
    );
  }
  items(filters: Filters = {}, options?: RequestOptions) {
    return flattenPages(this.pages(filters, options), (p) => p);
  }
}

export class Workspace implements WorkspaceManagement {
  readonly agents: Agents;
  readonly threads: Threads;
  readonly runs: Runs;
  readonly sessions: Sessions;
  readonly assets: WorkspaceManagement["assets"];
  readonly connections: WorkspaceManagement["connections"];
  readonly environments: WorkspaceManagement["environments"];
  readonly environmentTemplates: WorkspaceManagement["environmentTemplates"];
  readonly secrets: WorkspaceManagement["secrets"];
  readonly skills: WorkspaceManagement["skills"];
  readonly subscriptions: WorkspaceManagement["subscriptions"];
  constructor(
    readonly transport: Transport,
    readonly id: string,
  ) {
    this.agents = new Agents(transport, id);
    this.threads = new Threads(transport, id);
    this.runs = new Runs(transport, id);
    this.sessions = new Sessions(transport, id);
    const management = workspaceManagement(transport, id);
    this.assets = management.assets;
    this.connections = management.connections;
    this.environments = management.environments;
    this.environmentTemplates = management.environmentTemplates;
    this.secrets = management.secrets;
    this.skills = management.skills;
    this.subscriptions = management.subscriptions;
  }
  get(options?: RequestOptions): Promise<ResourceResult<S["Workspace"]>> {
    return jsonRequest(
      this.transport,
      "GET",
      workspacePath(this.id),
      undefined,
      undefined,
      { signal: options?.signal },
    );
  }
}

export class Agents {
  constructor(
    private readonly transport: Transport,
    readonly workspaceId: string,
  ) {}
  ref(id: string): Agent {
    return new Agent(
      this.transport,
      this.workspaceId,
      selector(id, "agent ID or key"),
    );
  }
  list(
    filters: Filters = {},
    options?: RequestOptions,
  ): Promise<ResourceResult<S["AgentPage"]>> {
    return jsonRequest(
      this.transport,
      "GET",
      workspacePath(this.workspaceId, "agents"),
      undefined,
      undefined,
      { query: filters, signal: options?.signal },
    );
  }
  pages(filters: Filters = {}, options?: RequestOptions) {
    return page<S["AgentPage"], S["Agent"]>(
      filters,
      (f, o) => this.list(f, o),
      options,
    );
  }
  items(filters: Filters = {}, options?: RequestOptions) {
    return flattenPages(this.pages(filters, options), (p) => p);
  }
  create(
    body: S["AgentCreate"],
    options?: RequestOptions,
  ): Promise<ResourceResult<S["Agent"]>> {
    return jsonRequest(
      this.transport,
      "POST",
      workspacePath(this.workspaceId, "agents"),
      body,
      undefined,
      { signal: options?.signal },
    );
  }
}
export class Agent {
  readonly revisions: AgentRevisions;
  constructor(
    private readonly transport: Transport,
    readonly workspaceId: string,
    readonly id: string,
  ) {
    this.revisions = new AgentRevisions(transport, workspaceId, id);
  }
  get(options?: RequestOptions): Promise<ResourceResult<S["Agent"]>> {
    return jsonRequest(
      this.transport,
      "GET",
      workspacePath(this.workspaceId, "agents", this.id),
      undefined,
      undefined,
      { signal: options?.signal },
    );
  }
  update(
    body: S["AgentUpdate"],
    options: EtagOptions,
  ): Promise<ResourceResult<S["Agent"]>> {
    return jsonRequest(
      this.transport,
      "PATCH",
      workspacePath(this.workspaceId, "agents", this.id),
      body,
      headers(options),
      { signal: options.signal },
    );
  }
  archive(options: EtagOptions): Promise<ResourceResult<S["Agent"]>> {
    return jsonRequest(
      this.transport,
      "POST",
      workspacePath(this.workspaceId, "agents", this.id, "archive"),
      undefined,
      headers(options),
      { signal: options.signal },
    );
  }
  unarchive(options: EtagOptions): Promise<ResourceResult<S["Agent"]>> {
    return jsonRequest(
      this.transport,
      "POST",
      workspacePath(this.workspaceId, "agents", this.id, "unarchive"),
      undefined,
      headers(options),
      { signal: options.signal },
    );
  }
  /** A new Thread submission; the entry is always present but its Run can be null. */
  start(
    input: string | S["MessagePayload"],
    options: MutationOptions & {
      body?: Omit<S["NewThread"], "agent_id" | "payload">;
    },
  ): Promise<ResourceResult<S["Submitted"]>> {
    const body = options.body ?? {};
    return jsonRequest(
      this.transport,
      "POST",
      workspacePath(this.workspaceId, "threads"),
      {
        ...body,
        agent_id: this.id,
        payload: normalizeInput<S["MessagePayload"]>(input),
      },
      headers(options),
      { signal: options.signal, retryReads: false },
    );
  }
}
export class AgentRevisions {
  constructor(
    private readonly transport: Transport,
    readonly workspaceId: string,
    readonly agentId: string,
  ) {}
  list(
    filters: Filters = {},
    options?: RequestOptions,
  ): Promise<ResourceResult<S["AgentRevisionPage"]>> {
    return jsonRequest(
      this.transport,
      "GET",
      workspacePath(this.workspaceId, "agents", this.agentId, "revisions"),
      undefined,
      undefined,
      { query: filters, signal: options?.signal },
    );
  }
  create(
    body: S["AgentRevisionCreate"],
    options: EtagOptions,
  ): Promise<ResourceResult<S["AgentRevision"]>> {
    return jsonRequest(
      this.transport,
      "POST",
      workspacePath(this.workspaceId, "agents", this.agentId, "revisions"),
      body,
      headers(options),
      { signal: options.signal },
    );
  }
  ref(id: string): AgentRevisionRef {
    return new AgentRevisionRef(
      this.transport,
      this.workspaceId,
      this.agentId,
      id,
    );
  }
}
export class AgentRevisionRef {
  constructor(
    private readonly transport: Transport,
    readonly workspaceId: string,
    readonly agentId: string,
    readonly id: string,
  ) {}
  get(options?: RequestOptions): Promise<ResourceResult<S["AgentRevision"]>> {
    return jsonRequest(
      this.transport,
      "GET",
      workspacePath(
        this.workspaceId,
        "agents",
        this.agentId,
        "revisions",
        this.id,
      ),
      undefined,
      undefined,
      { signal: options?.signal },
    );
  }
  setDefault(options: EtagOptions): Promise<ResourceResult<S["Agent"]>> {
    return jsonRequest(
      this.transport,
      "POST",
      workspacePath(
        this.workspaceId,
        "agents",
        this.agentId,
        "revisions",
        this.id,
        "set-default",
      ),
      undefined,
      headers(options),
      { signal: options.signal },
    );
  }
}

export class Threads {
  constructor(
    private readonly transport: Transport,
    readonly workspaceId: string,
  ) {}
  ref(id: string): Thread {
    return new Thread(
      this.transport,
      this.workspaceId,
      selector(id, "thread ID"),
    );
  }
  list(
    filters: Filters = {},
    options?: RequestOptions,
  ): Promise<ResourceResult<S["ThreadPage"]>> {
    return jsonRequest(
      this.transport,
      "GET",
      workspacePath(this.workspaceId, "threads"),
      undefined,
      undefined,
      { query: filters, signal: options?.signal },
    );
  }
  pages(filters: Filters = {}, options?: RequestOptions) {
    return page<S["ThreadPage"], S["ThreadView"]>(
      filters,
      (f, o) => this.list(f, o),
      options,
    );
  }
  items(filters: Filters = {}, options?: RequestOptions) {
    return flattenPages(this.pages(filters, options), (p) => p);
  }
  create(
    body: S["NewThread"],
    options: MutationOptions,
  ): Promise<ResourceResult<S["Submitted"]>> {
    return jsonRequest(
      this.transport,
      "POST",
      workspacePath(this.workspaceId, "threads"),
      body,
      headers(options),
      { signal: options.signal },
    );
  }
}
export class Thread {
  readonly inbox: Inbox;
  readonly runs: ThreadRuns;
  constructor(
    private readonly transport: Transport,
    readonly workspaceId: string,
    readonly id: string,
  ) {
    this.inbox = new Inbox(transport, workspaceId, id);
    this.runs = new ThreadRuns(transport, workspaceId, id);
  }
  get(options?: RequestOptions): Promise<ResourceResult<S["ThreadView"]>> {
    return jsonRequest(
      this.transport,
      "GET",
      workspacePath(this.workspaceId, "threads", this.id),
      undefined,
      undefined,
      { signal: options?.signal },
    );
  }
  update(
    body: S["ThreadUpdate"],
    options: EtagOptions,
  ): Promise<ResourceResult<S["ThreadView"]>> {
    return jsonRequest(
      this.transport,
      "PATCH",
      workspacePath(this.workspaceId, "threads", this.id),
      body,
      headers(options),
      { signal: options.signal },
    );
  }
  archive(options: EtagOptions): Promise<ResourceResult<S["ThreadView"]>> {
    return jsonRequest(
      this.transport,
      "POST",
      workspacePath(this.workspaceId, "threads", this.id, "archive"),
      undefined,
      headers(options),
      { signal: options.signal },
    );
  }
  submit(
    input: string | S["MessagePayload"],
    options: MutationOptions & { body: Omit<S["Message"], "payload"> },
  ): Promise<ResourceResult<S["Submitted"]>> {
    return this.inbox.submit(
      { ...options.body, payload: normalizeInput<S["MessagePayload"]>(input) },
      options,
    );
  }
  stream(options?: ThreadStreamOptions) {
    return threadStream(this.transport, this.workspaceId, this.id, options);
  }
}
export class Inbox {
  constructor(
    private readonly transport: Transport,
    readonly workspaceId: string,
    readonly threadId: string,
  ) {}
  private path(...parts: string[]) {
    return workspacePath(
      this.workspaceId,
      "threads",
      this.threadId,
      "inbox",
      ...parts,
    );
  }
  list(
    filters: Filters = {},
    options?: RequestOptions,
  ): Promise<ResourceResult<S["EntryPage"]>> {
    return jsonRequest(
      this.transport,
      "GET",
      this.path(),
      undefined,
      undefined,
      { query: filters, signal: options?.signal },
    );
  }
  pages(filters: Filters = {}, options?: RequestOptions) {
    return page<S["EntryPage"], S["EntryView"]>(
      filters,
      (f, o) => this.list(f, o),
      options,
    );
  }
  items(filters: Filters = {}, options?: RequestOptions) {
    return flattenPages(this.pages(filters, options), (p) => p);
  }
  submit(
    body: S["Message"],
    options: MutationOptions,
  ): Promise<ResourceResult<S["Submitted"]>> {
    return jsonRequest(
      this.transport,
      "POST",
      this.path(),
      body,
      headers(options),
      { signal: options.signal },
    );
  }
  ref(id: string): InboxEntry {
    return new InboxEntry(
      this.transport,
      this.workspaceId,
      this.threadId,
      selector(id, "entry ID"),
    );
  }
  order(
    body: S["InboxOrder"],
    options: EtagOptions,
  ): Promise<ResourceResult<S["ThreadView"]>> {
    return jsonRequest(
      this.transport,
      "PUT",
      this.path("order"),
      body,
      headers(options),
      { signal: options.signal },
    );
  }
}
export class InboxEntry {
  constructor(
    private readonly transport: Transport,
    private readonly workspaceId: string,
    private readonly threadId: string,
    readonly id: string,
  ) {}
  private path() {
    return workspacePath(
      this.workspaceId,
      "threads",
      this.threadId,
      "inbox",
      this.id,
    );
  }
  get(options?: RequestOptions): Promise<ResourceResult<S["EntryView"]>> {
    return jsonRequest(
      this.transport,
      "GET",
      this.path(),
      undefined,
      undefined,
      { signal: options?.signal },
    );
  }
  update(
    body: S["EntryUpdate"],
    options: EtagOptions,
  ): Promise<ResourceResult<S["Submitted"]>> {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path(),
      body,
      headers(options),
      { signal: options.signal },
    );
  }
  delete(options: EtagOptions): Promise<ResourceResult<S["Submitted"]>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path(),
      undefined,
      headers(options),
      { signal: options.signal },
    );
  }
}
export class ThreadRuns {
  constructor(
    private readonly transport: Transport,
    private readonly workspaceId: string,
    private readonly threadId: string,
  ) {}
  list(
    filters: Filters = {},
    options?: RequestOptions,
  ): Promise<ResourceResult<S["RunPage"]>> {
    return jsonRequest(
      this.transport,
      "GET",
      workspacePath(this.workspaceId, "threads", this.threadId, "runs"),
      undefined,
      undefined,
      { query: filters, signal: options?.signal },
    );
  }
  pages(filters: Filters = {}, options?: RequestOptions) {
    return page<S["RunPage"], S["RunView"]>(
      filters,
      (f, o) => this.list(f, o),
      options,
    );
  }
  items(filters: Filters = {}, options?: RequestOptions) {
    return flattenPages(this.pages(filters, options), (p) => p);
  }
}

export class Runs {
  constructor(
    private readonly transport: Transport,
    private readonly workspaceId: string,
  ) {}
  ref(id: string): Run {
    return new Run(this.transport, this.workspaceId, selector(id, "run ID"));
  }
}
export class Run {
  constructor(
    private readonly transport: Transport,
    readonly workspaceId: string,
    readonly id: string,
  ) {}
  private path(...parts: string[]) {
    return workspacePath(this.workspaceId, "runs", this.id, ...parts);
  }
  get(options?: RequestOptions): Promise<ResourceResult<S["RunView"]>> {
    return jsonRequest(
      this.transport,
      "GET",
      this.path(),
      undefined,
      undefined,
      { signal: options?.signal },
    );
  }
  items(
    filters: Filters = {},
    options?: RequestOptions,
  ): Promise<ResourceResult<S["RunItems"]>> {
    return jsonRequest(
      this.transport,
      "GET",
      this.path("items"),
      undefined,
      undefined,
      { query: filters, signal: options?.signal },
    );
  }
  interrupt(options?: RequestOptions): Promise<ResourceResult<S["RunView"]>> {
    return jsonRequest(
      this.transport,
      "POST",
      this.path("interrupt"),
      undefined,
      undefined,
      { signal: options?.signal },
    );
  }
  resume(
    body: S["ResumeRequest"],
    options: MutationOptions,
  ): Promise<ResourceResult<S["RunView"]>> {
    return jsonRequest(
      this.transport,
      "POST",
      this.path("resume"),
      body,
      headers(options),
      { signal: options.signal },
    );
  }
  fork(
    body: S["Fork"],
    options: MutationOptions,
  ): Promise<ResourceResult<S["Submitted"]>> {
    return jsonRequest(
      this.transport,
      "POST",
      this.path("fork"),
      body,
      headers(options),
      { signal: options.signal },
    );
  }
  async wait(options: WaitOptions): Promise<ResourceResult<S["RunView"]>> {
    if (!Number.isFinite(options.timeoutMs) || options.timeoutMs < 0)
      throw new RangeError("timeoutMs must be non-negative.");
    const deadline = Date.now() + options.timeoutMs;
    while (true) {
      const result = await this.get(options);
      if (
        ["completed", "failed", "cancelled", "waiting"].includes(
          result.data.status,
        )
      )
        return result;
      const remaining = deadline - Date.now();
      if (remaining <= 0) throw new WaitTimeoutError(options.timeoutMs);
      await delay(
        Math.min(options.pollIntervalMs ?? 500, remaining),
        options.signal ?? this.transport.signal,
      );
    }
  }
}
export class Sessions {
  constructor(
    private readonly transport: Transport,
    private readonly workspaceId: string,
  ) {}
  ref(id: string): Session {
    return new Session(
      this.transport,
      this.workspaceId,
      selector(id, "session ID"),
    );
  }
  list(
    filters: Filters = {},
    options?: RequestOptions,
  ): Promise<ResourceResult<S["SessionPage"]>> {
    return jsonRequest(
      this.transport,
      "GET",
      workspacePath(this.workspaceId, "sessions"),
      undefined,
      undefined,
      { query: filters, signal: options?.signal },
    );
  }
  pages(filters: Filters = {}, options?: RequestOptions) {
    return page<S["SessionPage"], S["SessionView"]>(
      filters,
      (f, o) => this.list(f, o),
      options,
    );
  }
  items(filters: Filters = {}, options?: RequestOptions) {
    return flattenPages(this.pages(filters, options), (p) => p);
  }
  create(
    body: S["SessionCreate"] = {},
    options?: RequestOptions,
  ): Promise<ResourceResult<S["SessionView"]>> {
    return jsonRequest(
      this.transport,
      "POST",
      workspacePath(this.workspaceId, "sessions"),
      body,
      undefined,
      { signal: options?.signal },
    );
  }
}
export class Session {
  constructor(
    private readonly transport: Transport,
    readonly workspaceId: string,
    readonly id: string,
  ) {}
  get(options?: RequestOptions): Promise<ResourceResult<S["SessionView"]>> {
    return jsonRequest(
      this.transport,
      "GET",
      workspacePath(this.workspaceId, "sessions", this.id),
      undefined,
      undefined,
      { signal: options?.signal },
    );
  }
  update(
    body: S["SessionUpdate"],
    options: EtagOptions,
  ): Promise<ResourceResult<S["SessionView"]>> {
    return jsonRequest(
      this.transport,
      "PATCH",
      workspacePath(this.workspaceId, "sessions", this.id),
      body,
      headers(options),
      { signal: options.signal },
    );
  }
}
