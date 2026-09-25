import type { components } from "../schema.js";
import type { Transport } from "../transport.js";
import {
  flattenPages,
  jsonRequest,
  PageIterator,
  selector,
  snapshot,
  withCursor,
  type EtagOptions,
  type RequestOptions,
  type ResourceResult,
} from "./base.js";
import { Collection, EditableResource, Resource } from "./management.js";

type S = components["schemas"];
type CursorFilters = { cursor?: string | null; limit?: number };
type RevisionFilters = CursorFilters & { path?: string; run_id?: string };

function child(base: string, id: string): string {
  return `${base}/${encodeURIComponent(selector(id))}`;
}
function etag(options: EtagOptions): HeadersInit {
  return { "If-Match": options.ifMatch };
}

export class Memories extends Collection<
  S["Memory"],
  S["MemoryPage"],
  S["MemoryCreate"]
> {
  override ref(id: string): Memory {
    return new Memory(this.transport, child(this.base, id));
  }
}

export class Memory extends EditableResource<S["Memory"], S["MemoryUpdate"]> {
  readonly files: MemoryFiles;
  readonly records: MemoryRecords;
  readonly revisions: MemoryRevisions;
  constructor(transport: Transport, base: string) {
    super(transport, base);
    this.files = new MemoryFiles(transport, `${base}/files`);
    this.records = new MemoryRecords(transport, `${base}/records`);
    this.revisions = new MemoryRevisions(transport, `${base}/revisions`);
  }
  delete(options: EtagOptions): Promise<ResourceResult<void>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.base,
      undefined,
      etag(options),
      { signal: options.signal },
    );
  }
}

/** File paths are encoded once, including separators, then decoded by the Service path route. */
export class MemoryFiles extends Collection<
  S["MemoryFileEntry"],
  S["MemoryFilePage"],
  S["MemoryFileCreate"],
  S["MemoryFile"]
> {
  override ref(path: string): MemoryFile {
    return new MemoryFile(this.transport, child(this.base, path));
  }
  move(
    body: S["MemoryFileMove"],
    options: EtagOptions,
  ): Promise<ResourceResult<S["MemoryFile"]>> {
    return jsonRequest(
      this.transport,
      "POST",
      `${this.base}/move`,
      body,
      etag(options),
      { signal: options.signal },
    );
  }
}
export class MemoryFile extends Resource<S["MemoryFile"]> {
  replace(
    body: S["MemoryFileReplace"],
    options: EtagOptions,
  ): Promise<ResourceResult<S["MemoryFile"]>> {
    return jsonRequest(this.transport, "PUT", this.base, body, etag(options), {
      signal: options.signal,
    });
  }
  delete(options: EtagOptions): Promise<ResourceResult<void>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.base,
      undefined,
      etag(options),
      { signal: options.signal },
    );
  }
}

/** Records have no item GET, version or conditional write; uncertain writes are never replayed. */
export class MemoryRecords {
  constructor(
    private readonly transport: Transport,
    private readonly base: string,
  ) {}
  ref(id: string): MemoryRecord {
    return new MemoryRecord(this.transport, child(this.base, id));
  }
  list(
    filters: CursorFilters = {},
    options?: RequestOptions,
  ): Promise<ResourceResult<S["MemoryRecordPage"]>> {
    return jsonRequest(this.transport, "GET", this.base, undefined, undefined, {
      query: filters,
      signal: options?.signal,
    });
  }
  pages(
    filters: CursorFilters = {},
    options?: RequestOptions,
  ): PageIterator<S["MemoryRecordPage"], S["MemoryRecordView"]> {
    const stable = snapshot(filters);
    return new PageIterator(
      stable.cursor,
      (cursor) => this.list(withCursor(stable, cursor), options),
      (result) => result,
    );
  }
  items(filters: CursorFilters = {}, options?: RequestOptions) {
    return flattenPages(this.pages(filters, options), (result) => result);
  }
  create(
    body: S["MemoryRecordText"],
    options?: RequestOptions,
  ): Promise<ResourceResult<S["MemoryRecordView"]>> {
    return jsonRequest(this.transport, "POST", this.base, body, undefined, {
      signal: options?.signal,
    });
  }
  search(
    body: S["MemoryRecordSearch"],
    options?: RequestOptions,
  ): Promise<ResourceResult<S["MemoryRecordPage"]>> {
    return jsonRequest(
      this.transport,
      "POST",
      `${this.base}/search`,
      body,
      undefined,
      { signal: options?.signal },
    );
  }
}
export class MemoryRecord {
  constructor(
    private readonly transport: Transport,
    private readonly base: string,
  ) {}
  replace(
    body: S["MemoryRecordText"],
    options?: RequestOptions,
  ): Promise<ResourceResult<S["MemoryRecordView"]>> {
    return jsonRequest(this.transport, "PUT", this.base, body, undefined, {
      signal: options?.signal,
    });
  }
  delete(options?: RequestOptions): Promise<ResourceResult<void>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.base,
      undefined,
      undefined,
      { signal: options?.signal },
    );
  }
}

export class MemoryRevisions {
  constructor(
    private readonly transport: Transport,
    private readonly base: string,
  ) {}
  ref(seq: number): MemoryRevision {
    return new MemoryRevision(this.transport, child(this.base, String(seq)));
  }
  list(
    filters: RevisionFilters = {},
    options?: RequestOptions,
  ): Promise<ResourceResult<S["MemoryRevisionPage"]>> {
    return jsonRequest(this.transport, "GET", this.base, undefined, undefined, {
      query: filters,
      signal: options?.signal,
    });
  }
  pages(
    filters: RevisionFilters = {},
    options?: RequestOptions,
  ): PageIterator<S["MemoryRevisionPage"], S["MemoryRevision"]> {
    const stable = snapshot(filters);
    return new PageIterator(
      stable.cursor,
      (cursor) => this.list(withCursor(stable, cursor), options),
      (result) => result,
    );
  }
  items(filters: RevisionFilters = {}, options?: RequestOptions) {
    return flattenPages(this.pages(filters, options), (result) => result);
  }
  purge(
    path: string,
    options?: RequestOptions,
  ): Promise<ResourceResult<S["HistoryPurge"]>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.base,
      undefined,
      undefined,
      { query: { path }, signal: options?.signal },
    );
  }
}
export class MemoryRevision extends Resource<S["MemoryRevisionDetail"]> {
  /** Omit ifMatch only when no file currently exists at this revision's path. */
  restore(
    options?: RequestOptions & { ifMatch?: string },
  ): Promise<ResourceResult<S["MemoryFileState"]>> {
    const headers =
      options?.ifMatch === undefined
        ? undefined
        : { "If-Match": options.ifMatch };
    return jsonRequest(
      this.transport,
      "POST",
      `${this.base}/restore`,
      undefined,
      headers,
      { signal: options?.signal },
    );
  }
}

/** The response ETag belongs to the Thread, not to the mounted Memory. */
export class ThreadMemories {
  constructor(
    private readonly transport: Transport,
    private readonly base: string,
  ) {}
  ref(name: string): ThreadMemory {
    return new ThreadMemory(this.transport, child(this.base, name));
  }
  list(
    options?: RequestOptions,
  ): Promise<ResourceResult<S["MemoryMountPage"]>> {
    return jsonRequest(this.transport, "GET", this.base, undefined, undefined, {
      signal: options?.signal,
    });
  }
  create(
    body: S["MemoryMount"],
    options: EtagOptions,
  ): Promise<ResourceResult<S["MemoryMount"]>> {
    return jsonRequest(this.transport, "POST", this.base, body, etag(options), {
      signal: options.signal,
    });
  }
}
export class ThreadMemory {
  constructor(
    private readonly transport: Transport,
    private readonly base: string,
  ) {}
  update(
    body: S["MemoryMountUpdate"],
    options: EtagOptions,
  ): Promise<ResourceResult<S["MemoryMount"]>> {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.base,
      body,
      etag(options),
      { signal: options.signal },
    );
  }
  delete(options: EtagOptions): Promise<ResourceResult<void>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.base,
      undefined,
      etag(options),
      { signal: options.signal },
    );
  }
}
