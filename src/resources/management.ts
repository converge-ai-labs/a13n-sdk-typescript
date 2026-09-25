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

type S = components["schemas"];
type Filters = Record<
  string,
  string | readonly string[] | number | boolean | null | undefined
> & {
  cursor?: string | null;
};
function url(base: string, ...parts: string[]): string {
  return `${base}/${parts.map((part) => encodeURIComponent(selector(part))).join("/")}`;
}
function etag(options: EtagOptions): HeadersInit {
  return { "If-Match": options.ifMatch };
}

/** Collection reads and creation are bound to actual Service collection routes. */
export class Collection<
  T,
  Page extends { items: T[]; next_cursor: string | null },
  Create,
  Created = T,
> {
  constructor(
    protected readonly transport: Transport,
    protected readonly base: string,
  ) {}
  ref(id: string): Resource<T> {
    return new Resource(this.transport, url(this.base, id));
  }
  list(
    filters: Filters = {},
    options?: RequestOptions,
  ): Promise<ResourceResult<Page>> {
    return jsonRequest(this.transport, "GET", this.base, undefined, undefined, {
      query: filters,
      signal: options?.signal,
    });
  }
  pages(
    filters: Filters = {},
    options?: RequestOptions,
  ): PageIterator<Page, T> {
    const stable = snapshot(filters);
    return new PageIterator(
      stable.cursor,
      (cursor) => this.list(withCursor(stable, cursor), options),
      (result) => result,
    );
  }
  items(filters: Filters = {}, options?: RequestOptions): AsyncGenerator<T> {
    return flattenPages(this.pages(filters, options), (result) => result);
  }
  create(
    body: Create,
    options?: RequestOptions,
  ): Promise<ResourceResult<Created>> {
    return jsonRequest(this.transport, "POST", this.base, body, undefined, {
      signal: options?.signal,
    });
  }
}
export class Resource<T> {
  constructor(
    protected readonly transport: Transport,
    protected readonly base: string,
  ) {}
  get(options?: RequestOptions): Promise<ResourceResult<T>> {
    return jsonRequest(this.transport, "GET", this.base, undefined, undefined, {
      signal: options?.signal,
    });
  }
}
/** Only resources with a PATCH item route have an editable reference. */
export class EditableResource<T, Update> extends Resource<T> {
  update(body: Update, options: EtagOptions): Promise<ResourceResult<T>> {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.base,
      body,
      etag(options),
      { signal: options.signal },
    );
  }
}
export class EditableCollection<
  T,
  Page extends { items: T[]; next_cursor: string | null },
  Create,
  Update,
  Created = T,
> extends Collection<T, Page, Create, Created> {
  override ref(id: string): EditableResource<T, Update> {
    return new EditableResource(this.transport, url(this.base, id));
  }
}
export class ProviderResource extends EditableResource<
  S["Provider"],
  S["ProviderUpdate"]
> {
  test(options?: RequestOptions): Promise<ResourceResult<S["ProviderTest"]>> {
    return jsonRequest(
      this.transport,
      "POST",
      url(this.base, "test"),
      undefined,
      undefined,
      { signal: options?.signal },
    );
  }
}
export class ProviderCollection extends EditableCollection<
  S["Provider"],
  S["ProviderPage"],
  S["ProviderCreate"],
  S["ProviderUpdate"]
> {
  override ref(id: string): ProviderResource {
    return new ProviderResource(this.transport, url(this.base, id));
  }
}
export class SecretResource extends Resource<S["Secret"]> {
  update(
    body: S["SecretUpdate"],
    options: EtagOptions,
  ): Promise<ResourceResult<S["Secret"]>> {
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
export class SecretCollection extends Collection<
  S["Secret"],
  S["SecretPage"],
  S["SecretCreate"]
> {
  override ref(id: string): SecretResource {
    return new SecretResource(this.transport, url(this.base, id));
  }
}

export interface WorkspaceManagement {
  assets: Collection<S["Asset"], S["AssetPage"], S["AssetCreate"]>;
  connections: EditableCollection<
    S["Connection"],
    S["ConnectionPage"],
    S["ConnectionCreate"],
    S["ConnectionUpdate"]
  >;
  environments: EditableCollection<
    S["EnvironmentView"],
    S["EnvironmentPage"],
    S["ManagedEnvironmentCreate"] | S["ExternalTargetCreate"],
    S["EnvironmentUpdate"]
  >;
  environmentTemplates: EditableCollection<
    S["Template"],
    S["TemplatePage"],
    S["TemplateCreate"],
    S["TemplateUpdate"]
  >;
  secrets: SecretCollection;
  skills: EditableCollection<
    S["Skill"],
    S["SkillPage"],
    S["SkillCreate"],
    S["SkillUpdate"]
  >;
  subscriptions: EditableCollection<
    S["Subscription"],
    S["SubscriptionPage"],
    S["SubscriptionCreate"],
    S["SubscriptionUpdate"],
    S["CreatedSubscription"]
  >;
}
export function workspaceManagement(
  transport: Transport,
  workspaceId: string,
): WorkspaceManagement {
  const base = url("/api/v1/workspaces", workspaceId);
  return {
    assets: new Collection(transport, url(base, "assets")),
    connections: new EditableCollection(transport, url(base, "connections")),
    environments: new EditableCollection(transport, url(base, "environments")),
    environmentTemplates: new EditableCollection(
      transport,
      url(base, "environment-templates"),
    ),
    secrets: new SecretCollection(transport, url(base, "secrets")),
    skills: new EditableCollection(transport, url(base, "skills")),
    subscriptions: new EditableCollection(
      transport,
      url(base, "subscriptions"),
    ),
  };
}
export interface OrganizationManagement {
  models: EditableCollection<
    S["Model"],
    S["ModelPage"],
    S["ModelCreate"],
    S["ModelUpdate"]
  >;
  modelProviders: ProviderCollection;
  webProviders: ProviderCollection;
  environmentProviders: ProviderCollection;
  connectorProviders: ProviderCollection;
  memoryProviders: ProviderCollection;
}
export function organizationManagement(
  transport: Transport,
  organizationId: string,
): OrganizationManagement {
  const base = url("/api/v1/organizations", organizationId);
  return {
    models: new EditableCollection(transport, url(base, "models")),
    modelProviders: new ProviderCollection(
      transport,
      url(base, "model-providers"),
    ),
    memoryProviders: new ProviderCollection(
      transport,
      url(base, "memory-providers"),
    ),
    webProviders: new ProviderCollection(transport, url(base, "web-providers")),
    environmentProviders: new ProviderCollection(
      transport,
      url(base, "environment-providers"),
    ),
    connectorProviders: new ProviderCollection(
      transport,
      url(base, "connector-providers"),
    ),
  };
}
export class Organizations {
  constructor(private readonly transport: Transport) {}
  ref(id: string): Organization {
    return new Organization(this.transport, selector(id, "organization ID"));
  }
  list(
    filters: Filters = {},
    options?: RequestOptions,
  ): Promise<ResourceResult<S["OrganizationPage"]>> {
    return jsonRequest(
      this.transport,
      "GET",
      "/api/v1/organizations",
      undefined,
      undefined,
      { query: filters, signal: options?.signal },
    );
  }
  pages(
    filters: Filters = {},
    options?: RequestOptions,
  ): PageIterator<S["OrganizationPage"], S["Organization"]> {
    const stable = snapshot(filters);
    return new PageIterator(
      stable.cursor,
      (cursor) => this.list(withCursor(stable, cursor), options),
      (result) => result,
    );
  }
  items(filters: Filters = {}, options?: RequestOptions) {
    return flattenPages(this.pages(filters, options), (p) => p);
  }
}
export class Organization
  extends EditableResource<S["Organization"], S["OrganizationUpdate"]>
  implements OrganizationManagement
{
  readonly models: OrganizationManagement["models"];
  readonly modelProviders: OrganizationManagement["modelProviders"];
  readonly webProviders: OrganizationManagement["webProviders"];
  readonly environmentProviders: OrganizationManagement["environmentProviders"];
  readonly connectorProviders: OrganizationManagement["connectorProviders"];
  readonly memoryProviders: OrganizationManagement["memoryProviders"];
  constructor(
    transport: Transport,
    readonly id: string,
  ) {
    super(transport, url("/api/v1/organizations", id));
    const management = organizationManagement(transport, id);
    this.models = management.models;
    this.modelProviders = management.modelProviders;
    this.webProviders = management.webProviders;
    this.environmentProviders = management.environmentProviders;
    this.connectorProviders = management.connectorProviders;
    this.memoryProviders = management.memoryProviders;
  }
}
