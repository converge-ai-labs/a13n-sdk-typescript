import type { operations } from "../schema.js";
import type { Transport } from "../transport.js";
import {
  binaryRequest,
  flattenPages,
  jsonRequest,
  type BinaryResult,
  type EtagOptions,
  type MutationOptions,
  PageIterator,
  type PageFilters,
  type PageLike,
  type RequestOptions,
  type ResourceResult,
  selector,
  snapshot,
  uploadRequest,
  withCursor,
} from "./base.js";

type Operation = keyof operations;
type RawQueryOf<K extends Operation> = operations[K]["parameters"] extends {
  query?: infer Query;
}
  ? Exclude<Query, undefined>
  : never;
type QueryOf<K extends Operation> = [RawQueryOf<K>] extends [never]
  ? Record<string, never>
  : RawQueryOf<K>;
type BodyOf<K extends Operation> = operations[K] extends {
  requestBody: { content: { "application/json": infer Body } };
}
  ? Body
  : never;
type OptionalBodyOf<K extends Operation> =
  Exclude<operations[K]["requestBody"], undefined> extends {
    content: { "application/json": infer Body };
  }
    ? Body
    : never;
type ResponseOf<
  K extends Operation,
  Status extends number,
> = operations[K] extends { responses: infer Responses }
  ? Status extends keyof Responses
    ? Responses[Status] extends {
        content: { "application/json": infer Response };
      }
      ? Response
      : void
    : never
  : never;
type FiltersOf<K extends Operation> = Omit<QueryOf<K>, "cursor"> & {
  cursor?: string | null;
};

type ScopeKind = "workspace" | "organization";

interface ScopeContext<Kind extends ScopeKind = ScopeKind> {
  readonly transport: Transport;
  readonly kind: Kind;
  readonly id: string;
  readonly prefix: string;
  readonly workspaceId?: string;
}

function scopeContext<Kind extends ScopeKind>(
  transport: Transport,
  kind: Kind,
  id: string,
): ScopeContext<Kind> {
  const safeId = encodeURIComponent(selector(id, `${kind}Id`));
  return {
    transport,
    kind,
    id,
    prefix: `/api/v1/${kind === "workspace" ? "workspaces" : "organizations"}/${safeId}`,
    ...(kind === "workspace" ? { workspaceId: id } : {}),
  };
}

function scopedOptions(
  context: ScopeContext,
  options: RequestOptions,
  query?: Readonly<Record<string, unknown>>,
): {
  workspaceId?: string;
  signal?: AbortSignal;
  query?: Readonly<Record<string, unknown>>;
} {
  return {
    ...(context.workspaceId ? { workspaceId: context.workspaceId } : {}),
    ...(options.signal ? { signal: options.signal } : {}),
    ...(query ? { query } : {}),
  };
}

function etagHeaders(options: EtagOptions): HeadersInit {
  return { "If-Match": options.ifMatch };
}

function mutationHeaders(options: MutationOptions): HeadersInit {
  return { "Idempotency-Key": options.idempotencyKey };
}

function guardedMutationHeaders(options: {
  idempotencyKey: string;
  ifMatch: string;
}): HeadersInit {
  return {
    "Idempotency-Key": options.idempotencyKey,
    "If-Match": options.ifMatch,
  };
}

function resourcePath(path: string, id: string): string {
  return `${path}/${encodeURIComponent(selector(id))}`;
}

abstract class PagedCollection<
  Page extends PageLike<Item>,
  Item,
  Filters extends PageFilters,
> {
  protected constructor(
    protected readonly context: ScopeContext,
    protected readonly path: string,
  ) {}

  list(
    filters: Filters = {} as Filters,
    options: RequestOptions = {},
  ): Promise<ResourceResult<Page>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      this.path,
      undefined,
      undefined,
      scopedOptions(this.context, options, filters),
    );
  }

  pages(
    filters: Filters = {} as Filters,
    options: RequestOptions = {},
  ): PageIterator<Page, Item> {
    const saved = snapshot(filters);
    return new PageIterator(
      saved.cursor,
      (cursor) => this.list(withCursor(saved, cursor), options),
      (page) => page,
    );
  }

  iterate(
    filters: Filters = {} as Filters,
    options: RequestOptions = {},
  ): AsyncIterable<Item> {
    return flattenPages(this.pages(filters, options), (page) => page);
  }
}

export type Model = ResponseOf<"get_workspaces_workspace_models_model_id", 200>;
export type ModelCollectionPage = ResponseOf<
  "get_workspaces_workspace_models",
  200
>;
export type ModelListFilters = FiltersOf<"get_workspaces_workspace_models">;
export type CreateModelRequest = BodyOf<"post_workspaces_workspace_models">;
export type UpdateModelRequest =
  BodyOf<"patch_workspaces_workspace_models_model_id">;
export type ModelTestRequest =
  OptionalBodyOf<"post_workspaces_workspace_models_model_id_test">;
export type ModelTestResult = ResponseOf<
  "post_workspaces_workspace_models_model_id_test",
  200
>;

export class Models extends PagedCollection<
  ModelCollectionPage,
  Model,
  ModelListFilters
> {
  constructor(context: ScopeContext) {
    super(context, `${context.prefix}/models`);
  }

  ref(modelId: string): ModelResource {
    return new ModelResource(this.context, resourcePath(this.path, modelId));
  }

  create(
    body: CreateModelRequest,
    options: RequestOptions = {},
  ): Promise<ResourceResult<Model>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      this.path,
      body,
      undefined,
      scopedOptions(this.context, options),
    );
  }
}

export class ModelResource {
  constructor(
    private readonly context: ScopeContext,
    private readonly path: string,
  ) {}

  get(options: RequestOptions = {}): Promise<ResourceResult<Model>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      this.path,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  update(
    body: UpdateModelRequest,
    options: EtagOptions,
  ): Promise<ResourceResult<Model>> {
    return jsonRequest(
      this.context.transport,
      "PATCH",
      this.path,
      body,
      etagHeaders(options),
      scopedOptions(this.context, options),
    );
  }

  test(
    body?: ModelTestRequest,
    options: RequestOptions = {},
  ): Promise<ResourceResult<ModelTestResult>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      `${this.path}/test`,
      body,
      undefined,
      scopedOptions(this.context, options),
    );
  }
}

export type ModelProvider = ResponseOf<
  "get_workspaces_workspace_model_providers_provider_id",
  200
>;
export type ModelProviderCollectionPage = ResponseOf<
  "get_workspaces_workspace_model_providers",
  200
>;
export type ModelProviderListFilters =
  FiltersOf<"get_workspaces_workspace_model_providers">;
export type CreateModelProviderRequest =
  BodyOf<"post_workspaces_workspace_model_providers">;
export type UpdateModelProviderRequest =
  BodyOf<"patch_workspaces_workspace_model_providers_provider_id">;
export type ModelProviderTestResult = ResponseOf<
  "post_workspaces_workspace_model_providers_provider_id_test",
  200
>;

export class ModelProviders extends PagedCollection<
  ModelProviderCollectionPage,
  ModelProvider,
  ModelProviderListFilters
> {
  constructor(context: ScopeContext) {
    super(context, `${context.prefix}/model-providers`);
  }

  ref(providerId: string): ModelProviderResource {
    return new ModelProviderResource(
      this.context,
      resourcePath(this.path, providerId),
    );
  }

  create(
    body: CreateModelProviderRequest,
    options: RequestOptions = {},
  ): Promise<ResourceResult<ModelProvider>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      this.path,
      body,
      undefined,
      scopedOptions(this.context, options),
    );
  }
}

export class ModelProviderResource {
  constructor(
    private readonly context: ScopeContext,
    private readonly path: string,
  ) {}

  get(options: RequestOptions = {}): Promise<ResourceResult<ModelProvider>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      this.path,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  update(
    body: UpdateModelProviderRequest,
    options: EtagOptions,
  ): Promise<ResourceResult<ModelProvider>> {
    return jsonRequest(
      this.context.transport,
      "PATCH",
      this.path,
      body,
      etagHeaders(options),
      scopedOptions(this.context, options),
    );
  }

  test(
    options: RequestOptions = {},
  ): Promise<ResourceResult<ModelProviderTestResult>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      `${this.path}/test`,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }
}

export type WebProvider = ResponseOf<
  "get_workspaces_workspace_web_providers_provider_id",
  200
>;
export type WebProviderCollectionPage = ResponseOf<
  "get_workspaces_workspace_web_providers",
  200
>;
export type WebProviderListFilters =
  FiltersOf<"get_workspaces_workspace_web_providers">;
export type CreateWebProviderRequest =
  BodyOf<"post_workspaces_workspace_web_providers">;
export type UpdateWebProviderRequest =
  BodyOf<"patch_workspaces_workspace_web_providers_provider_id">;
export type WebProviderTestResult = ResponseOf<
  "post_workspaces_workspace_web_providers_provider_id_test",
  200
>;
export type WebProviderReferences = ResponseOf<
  "get_workspaces_workspace_web_providers_provider_id_references",
  200
>;

export class WebProviders extends PagedCollection<
  WebProviderCollectionPage,
  WebProvider,
  WebProviderListFilters
> {
  constructor(context: ScopeContext) {
    super(context, `${context.prefix}/web-providers`);
  }

  ref(providerId: string): WebProviderResource {
    return new WebProviderResource(
      this.context,
      resourcePath(this.path, providerId),
    );
  }

  create(
    body: CreateWebProviderRequest,
    options: RequestOptions = {},
  ): Promise<ResourceResult<WebProvider>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      this.path,
      body,
      undefined,
      scopedOptions(this.context, options),
    );
  }
}

export class WebProviderResource {
  constructor(
    private readonly context: ScopeContext,
    private readonly path: string,
  ) {}

  get(options: RequestOptions = {}): Promise<ResourceResult<WebProvider>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      this.path,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  update(
    body: UpdateWebProviderRequest,
    options: EtagOptions,
  ): Promise<ResourceResult<WebProvider>> {
    return jsonRequest(
      this.context.transport,
      "PATCH",
      this.path,
      body,
      etagHeaders(options),
      scopedOptions(this.context, options),
    );
  }

  test(
    options: RequestOptions = {},
  ): Promise<ResourceResult<WebProviderTestResult>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      `${this.path}/test`,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  references(
    options: RequestOptions = {},
  ): Promise<ResourceResult<WebProviderReferences>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      `${this.path}/references`,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }
}

export type EnvironmentProvider = ResponseOf<
  "get_environment_providers_resource_id",
  200
>;
export type EnvironmentProviderCollectionPage = ResponseOf<
  "get_workspaces_workspace_environment_providers",
  200
>;
export type EnvironmentProviderListFilters =
  FiltersOf<"get_workspaces_workspace_environment_providers">;
export type CreateEnvironmentProviderRequest =
  BodyOf<"post_workspaces_workspace_environment_providers">;
export type UpdateEnvironmentProviderRequest =
  BodyOf<"patch_environment_providers_provider_id">;
export type EnvironmentProviderConnectivity = ResponseOf<
  "get_environment_providers_provider_id_connectivity",
  200
>;
export type ReplaceEnvironmentProviderCredentialRequest =
  BodyOf<"put_environment_providers_provider_id_credential">;
export type TestEnvironmentProviderImageRequest =
  BodyOf<"post_environment_providers_provider_id_test_image">;
export type EnvironmentProviderImageTest = ResponseOf<
  "post_environment_providers_provider_id_test_image",
  200
>;

export class EnvironmentProviders extends PagedCollection<
  EnvironmentProviderCollectionPage,
  EnvironmentProvider,
  EnvironmentProviderListFilters
> {
  constructor(context: ScopeContext) {
    super(context, `${context.prefix}/environment-providers`);
  }

  ref(providerId: string): EnvironmentProviderResource {
    return new EnvironmentProviderResource(
      this.context,
      `/api/v1/environment-providers/${encodeURIComponent(selector(providerId, "providerId"))}`,
    );
  }

  create(
    body: CreateEnvironmentProviderRequest,
    options: RequestOptions = {},
  ): Promise<ResourceResult<EnvironmentProvider>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      this.path,
      body,
      undefined,
      scopedOptions(this.context, options),
    );
  }
}

export class EnvironmentProviderResource {
  constructor(
    private readonly context: ScopeContext,
    private readonly path: string,
  ) {}

  get(
    options: RequestOptions = {},
  ): Promise<ResourceResult<EnvironmentProvider>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      this.path,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  update(
    body: UpdateEnvironmentProviderRequest,
    options: EtagOptions,
  ): Promise<ResourceResult<EnvironmentProvider>> {
    return jsonRequest(
      this.context.transport,
      "PATCH",
      this.path,
      body,
      etagHeaders(options),
      scopedOptions(this.context, options),
    );
  }

  replaceCredential(
    body: ReplaceEnvironmentProviderCredentialRequest,
    options: EtagOptions,
  ): Promise<ResourceResult<EnvironmentProvider>> {
    return jsonRequest(
      this.context.transport,
      "PUT",
      `${this.path}/credential`,
      body,
      etagHeaders(options),
      scopedOptions(this.context, options),
    );
  }

  connectivity(
    options: RequestOptions = {},
  ): Promise<ResourceResult<EnvironmentProviderConnectivity>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      `${this.path}/connectivity`,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  testImage(
    body: TestEnvironmentProviderImageRequest,
    options: RequestOptions = {},
  ): Promise<ResourceResult<EnvironmentProviderImageTest>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      `${this.path}/test-image`,
      body,
      undefined,
      scopedOptions(this.context, options),
    );
  }
}

export type EnvironmentTemplate = ResponseOf<
  "get_environment_templates_resource_id",
  200
>;
export type EnvironmentTemplateCollectionPage = ResponseOf<
  "get_workspaces_workspace_environment_templates",
  200
>;
export type EnvironmentTemplateListFilters =
  FiltersOf<"get_workspaces_workspace_environment_templates">;
export type CreateEnvironmentTemplateRequest =
  BodyOf<"post_workspaces_workspace_environment_templates">;
export type UpdateEnvironmentTemplateRequest =
  BodyOf<"patch_environment_templates_template_id">;
export type EnvironmentTemplateRevisionCollectionPage = ResponseOf<
  "get_environment_templates_template_id_revisions",
  200
>;
export type CreateEnvironmentTemplateRevisionRequest =
  BodyOf<"post_environment_templates_template_id_revisions">;
export type EnvironmentTemplateRevision = ResponseOf<
  "post_environment_templates_template_id_revisions",
  201
>;

export class EnvironmentTemplates extends PagedCollection<
  EnvironmentTemplateCollectionPage,
  EnvironmentTemplate,
  EnvironmentTemplateListFilters
> {
  constructor(context: ScopeContext) {
    super(context, `${context.prefix}/environment-templates`);
  }

  ref(templateId: string): EnvironmentTemplateResource {
    return new EnvironmentTemplateResource(
      this.context,
      `/api/v1/environment-templates/${encodeURIComponent(selector(templateId, "templateId"))}`,
    );
  }

  create(
    body: CreateEnvironmentTemplateRequest,
    options: MutationOptions,
  ): Promise<ResourceResult<EnvironmentTemplate>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      this.path,
      body,
      mutationHeaders(options),
      scopedOptions(this.context, options),
    );
  }
}

export class EnvironmentTemplateResource {
  constructor(
    private readonly context: ScopeContext,
    private readonly path: string,
  ) {}

  get(
    options: RequestOptions = {},
  ): Promise<ResourceResult<EnvironmentTemplate>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      this.path,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  update(
    body: UpdateEnvironmentTemplateRequest,
    options: EtagOptions,
  ): Promise<ResourceResult<EnvironmentTemplate>> {
    return jsonRequest(
      this.context.transport,
      "PATCH",
      this.path,
      body,
      etagHeaders(options),
      scopedOptions(this.context, options),
    );
  }

  revisions(
    options: RequestOptions = {},
  ): Promise<ResourceResult<EnvironmentTemplateRevisionCollectionPage>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      `${this.path}/revisions`,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  createRevision(
    body: CreateEnvironmentTemplateRevisionRequest,
    options: RequestOptions = {},
  ): Promise<ResourceResult<EnvironmentTemplateRevision>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      `${this.path}/revisions`,
      body,
      undefined,
      scopedOptions(this.context, options),
    );
  }
}

export type Environment = ResponseOf<
  "post_workspaces_workspace_environments",
  201
>;
export type EnvironmentDetail = ResponseOf<"get_environments_resource_id", 200>;
export type EnvironmentCollectionPage = ResponseOf<
  "get_workspaces_workspace_environments",
  200
>;
export type EnvironmentCollectionItem =
  EnvironmentCollectionPage extends PageLike<infer Item> ? Item : never;
export type EnvironmentListFilters =
  FiltersOf<"get_workspaces_workspace_environments">;
export type CreateEnvironmentRequest =
  BodyOf<"post_workspaces_workspace_environments">;
export type UpdateEnvironmentRequest =
  BodyOf<"patch_environments_environment_id">;
export type EnvironmentConnection = ResponseOf<
  "get_environments_environment_id_connection",
  200
>;
export type EnvironmentConnectionTicket = ResponseOf<
  "post_environments_environment_id_connection_tickets",
  201
>;
export type EnvironmentCommand = ResponseOf<
  "post_environments_environment_id_stop",
  202
>;

export class Environments extends PagedCollection<
  EnvironmentCollectionPage,
  EnvironmentCollectionItem,
  EnvironmentListFilters
> {
  constructor(context: ScopeContext) {
    super(context, `${context.prefix}/environments`);
  }

  ref(environmentId: string): EnvironmentResource {
    return new EnvironmentResource(
      this.context,
      `/api/v1/environments/${encodeURIComponent(selector(environmentId, "environmentId"))}`,
    );
  }

  create(
    body: CreateEnvironmentRequest,
    options: MutationOptions,
  ): Promise<ResourceResult<Environment>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      this.path,
      body,
      mutationHeaders(options),
      scopedOptions(this.context, options),
    );
  }
}

export class EnvironmentResource {
  constructor(
    private readonly context: ScopeContext,
    private readonly path: string,
  ) {}

  get(
    options: RequestOptions = {},
  ): Promise<ResourceResult<EnvironmentDetail>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      this.path,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  update(
    body: UpdateEnvironmentRequest,
    options: EtagOptions,
  ): Promise<
    ResourceResult<ResponseOf<"patch_environments_environment_id", 200>>
  > {
    return jsonRequest(
      this.context.transport,
      "PATCH",
      this.path,
      body,
      etagHeaders(options),
      scopedOptions(this.context, options),
    );
  }

  connection(
    options: RequestOptions = {},
  ): Promise<ResourceResult<EnvironmentConnection>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      `${this.path}/connection`,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  createConnectionTicket(
    options: RequestOptions = {},
  ): Promise<ResourceResult<EnvironmentConnectionTicket>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      `${this.path}/connection-tickets`,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  stop(options: MutationOptions): Promise<ResourceResult<EnvironmentCommand>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      `${this.path}/stop`,
      undefined,
      mutationHeaders(options),
      scopedOptions(this.context, options),
    );
  }

  delete(
    options: MutationOptions,
  ): Promise<ResourceResult<EnvironmentCommand>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      `${this.path}/delete`,
      undefined,
      mutationHeaders(options),
      scopedOptions(this.context, options),
    );
  }
}

export type Asset = ResponseOf<"get_assets_asset_id", 200>;
export type AssetCollectionPage = ResponseOf<
  "get_workspaces_workspace_assets",
  200
>;
export type AssetListFilters = FiltersOf<"get_workspaces_workspace_assets">;
export type AssetUploadReceipt = ResponseOf<
  "post_workspaces_workspace_assets",
  201
>;

export interface AssetUploadOptions extends MutationOptions {
  filename: string;
  mediaType?: string;
  contentType?: string;
}

export class Assets extends PagedCollection<
  AssetCollectionPage,
  Asset,
  AssetListFilters
> {
  constructor(context: ScopeContext) {
    super(context, `${context.prefix}/assets`);
  }

  ref(assetId: string): AssetResource {
    return new AssetResource(
      this.context,
      `/api/v1/assets/${encodeURIComponent(selector(assetId, "assetId"))}`,
    );
  }

  upload(
    body: Blob | ReadableStream<Uint8Array>,
    options: AssetUploadOptions,
  ): Promise<ResourceResult<AssetUploadReceipt>> {
    return uploadRequest(
      this.context.transport,
      "POST",
      this.path,
      body,
      options.contentType ?? options.mediaType ?? "application/octet-stream",
      mutationHeaders(options),
      scopedOptions(this.context, options, {
        filename: options.filename,
        media_type: options.mediaType,
      }),
    );
  }
}

export class AssetResource {
  constructor(
    private readonly context: ScopeContext,
    private readonly path: string,
  ) {}

  get(options: RequestOptions = {}): Promise<ResourceResult<Asset>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      this.path,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  download(options: RequestOptions = {}): Promise<BinaryResult> {
    return binaryRequest(
      this.context.transport,
      `${this.path}/content`,
      scopedOptions(this.context, options),
    );
  }

  delete(options: RequestOptions = {}): Promise<ResourceResult<void>> {
    return jsonRequest(
      this.context.transport,
      "DELETE",
      this.path,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }
}

export type Connection = ResponseOf<"get_connections_connection_id", 200>;
export type ConnectionCollectionPage = ResponseOf<
  "get_workspaces_workspace_connections",
  200
>;
export type ConnectionListFilters =
  FiltersOf<"get_workspaces_workspace_connections">;
export type CreateConnectionRequest =
  BodyOf<"post_workspaces_workspace_connections">;
export type UpdateConnectionRequest = BodyOf<"patch_connections_connection_id">;
export type ConnectionCommandRequest =
  BodyOf<"post_connections_connection_id_check">;
export type ConnectionCleanupReceipt = ResponseOf<
  "delete_connections_connection_id",
  200
>;

export class Connections extends PagedCollection<
  ConnectionCollectionPage,
  Connection,
  ConnectionListFilters
> {
  constructor(context: ScopeContext) {
    super(context, `${context.prefix}/connections`);
  }

  ref(connectionId: string): ConnectionResource {
    return new ConnectionResource(
      this.context,
      `/api/v1/connections/${encodeURIComponent(selector(connectionId, "connectionId"))}`,
    );
  }

  create(
    body: CreateConnectionRequest,
    options: MutationOptions,
  ): Promise<ResourceResult<Connection>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      this.path,
      body,
      mutationHeaders(options),
      scopedOptions(this.context, options),
    );
  }
}

export class ConnectionResource {
  constructor(
    private readonly context: ScopeContext,
    private readonly path: string,
  ) {}

  get(options: RequestOptions = {}): Promise<ResourceResult<Connection>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      this.path,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  update(
    body: UpdateConnectionRequest,
    options: RequestOptions = {},
  ): Promise<ResourceResult<Connection>> {
    return jsonRequest(
      this.context.transport,
      "PATCH",
      this.path,
      body,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  check(
    body: ConnectionCommandRequest,
    options: RequestOptions = {},
  ): Promise<ResourceResult<Connection>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      `${this.path}/check`,
      body,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  enable(
    body: ConnectionCommandRequest,
    options: MutationOptions,
  ): Promise<ResourceResult<Connection>> {
    return this.command("enable", body, options);
  }

  disable(
    body: ConnectionCommandRequest,
    options: MutationOptions,
  ): Promise<ResourceResult<Connection>> {
    return this.command("disable", body, options);
  }

  revoke(
    body: ConnectionCommandRequest,
    options: MutationOptions,
  ): Promise<ResourceResult<ConnectionCleanupReceipt>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      `${this.path}/connector/revoke`,
      body,
      mutationHeaders(options),
      scopedOptions(this.context, options),
    );
  }

  delete(
    expectedVersion: number,
    options: MutationOptions,
  ): Promise<ResourceResult<ConnectionCleanupReceipt>> {
    return jsonRequest(
      this.context.transport,
      "DELETE",
      this.path,
      undefined,
      mutationHeaders(options),
      scopedOptions(this.context, options, {
        expected_version: expectedVersion,
      }),
    );
  }

  private command(
    command: string,
    body: ConnectionCommandRequest,
    options: MutationOptions,
  ): Promise<ResourceResult<Connection>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      `${this.path}/${command}`,
      body,
      mutationHeaders(options),
      scopedOptions(this.context, options),
    );
  }
}

export type ConnectorProvider = ResponseOf<
  "get_connector_providers_connector_provider_id",
  200
>;
export type ConnectorProviderCollectionPage = ResponseOf<
  "get_workspaces_workspace_connector_providers",
  200
>;
export type ConnectorProviderListFilters =
  FiltersOf<"get_workspaces_workspace_connector_providers">;
export type CreateConnectorProviderRequest =
  BodyOf<"post_workspaces_workspace_connector_providers">;
export type UpdateConnectorProviderRequest =
  BodyOf<"patch_connector_providers_connector_provider_id">;
export type ConnectorProviderCommandRequest =
  BodyOf<"post_connector_providers_connector_provider_id_test">;
export type ConnectorProviderTestResult = ResponseOf<
  "post_connector_providers_connector_provider_id_test",
  200
>;
export type ReplaceConnectorProviderCredentialsRequest =
  BodyOf<"post_connector_providers_connector_provider_id_credentials">;

export class ConnectorProviders extends PagedCollection<
  ConnectorProviderCollectionPage,
  ConnectorProvider,
  ConnectorProviderListFilters
> {
  constructor(context: ScopeContext) {
    super(context, `${context.prefix}/connector-providers`);
  }

  ref(providerId: string): ConnectorProviderResource {
    return new ConnectorProviderResource(
      this.context,
      `/api/v1/connector-providers/${encodeURIComponent(selector(providerId, "providerId"))}`,
    );
  }

  create(
    body: CreateConnectorProviderRequest,
    options: MutationOptions,
  ): Promise<ResourceResult<ConnectorProvider>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      this.path,
      body,
      mutationHeaders(options),
      scopedOptions(this.context, options),
    );
  }
}

export class ConnectorProviderResource {
  constructor(
    private readonly context: ScopeContext,
    private readonly path: string,
  ) {}

  get(
    options: RequestOptions = {},
  ): Promise<ResourceResult<ConnectorProvider>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      this.path,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  update(
    body: UpdateConnectorProviderRequest,
    options: RequestOptions = {},
  ): Promise<ResourceResult<ConnectorProvider>> {
    return jsonRequest(
      this.context.transport,
      "PATCH",
      this.path,
      body,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  replaceCredentials(
    body: ReplaceConnectorProviderCredentialsRequest,
    options: MutationOptions,
  ): Promise<ResourceResult<ConnectorProvider>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      `${this.path}/credentials`,
      body,
      mutationHeaders(options),
      scopedOptions(this.context, options),
    );
  }

  test(
    body: ConnectorProviderCommandRequest,
    options: MutationOptions,
  ): Promise<ResourceResult<ConnectorProviderTestResult>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      `${this.path}/test`,
      body,
      mutationHeaders(options),
      scopedOptions(this.context, options),
    );
  }
}

export type MemoryProvider = ResponseOf<
  "get_workspaces_workspace_memory_providers_provider_id",
  200
>;
export type MemoryProviderCollectionPage = ResponseOf<
  "get_workspaces_workspace_memory_providers",
  200
>;
export type MemoryProviderListFilters =
  FiltersOf<"get_workspaces_workspace_memory_providers">;
export type CreateMemoryProviderRequest =
  BodyOf<"post_workspaces_workspace_memory_providers">;
export type UpdateMemoryProviderRequest =
  BodyOf<"patch_workspaces_workspace_memory_providers_provider_id">;
export type MemoryProviderReferences = ResponseOf<
  "get_workspaces_workspace_memory_providers_provider_id_references",
  200
>;

export class MemoryProviders extends PagedCollection<
  MemoryProviderCollectionPage,
  MemoryProvider,
  MemoryProviderListFilters
> {
  constructor(context: ScopeContext) {
    super(context, `${context.prefix}/memory-providers`);
  }

  ref(providerId: string): MemoryProviderResource {
    return new MemoryProviderResource(
      this.context,
      resourcePath(this.path, providerId),
    );
  }

  create(
    body: CreateMemoryProviderRequest,
    options: RequestOptions = {},
  ): Promise<ResourceResult<MemoryProvider>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      this.path,
      body,
      undefined,
      scopedOptions(this.context, options),
    );
  }
}

export class MemoryProviderResource {
  readonly memories?: Memories;

  constructor(
    private readonly context: ScopeContext,
    private readonly path: string,
  ) {
    if (context.kind === "workspace")
      this.memories = new Memories(context, `${path}/memories`);
  }

  get(options: RequestOptions = {}): Promise<ResourceResult<MemoryProvider>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      this.path,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  update(
    body: UpdateMemoryProviderRequest,
    options: EtagOptions,
  ): Promise<ResourceResult<MemoryProvider>> {
    return jsonRequest(
      this.context.transport,
      "PATCH",
      this.path,
      body,
      etagHeaders(options),
      scopedOptions(this.context, options),
    );
  }

  references(
    options: RequestOptions = {},
  ): Promise<ResourceResult<MemoryProviderReferences>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      `${this.path}/references`,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }
}

export type Memory = ResponseOf<
  "get_workspaces_workspace_memory_providers_provider_id_memories_memory_id",
  200
>;
export type MemoryCollectionPage = ResponseOf<
  "get_workspaces_workspace_memory_providers_provider_id_memories",
  200
>;
export type MemoryListFilters =
  FiltersOf<"get_workspaces_workspace_memory_providers_provider_id_memories">;
export type AddMemoryRequest =
  BodyOf<"post_workspaces_workspace_memory_providers_provider_id_memories">;
export type SearchMemoriesRequest =
  BodyOf<"post_workspaces_workspace_memory_providers_provider_id_memories_search">;
export type SearchMemoriesResult = ResponseOf<
  "post_workspaces_workspace_memory_providers_provider_id_memories_search",
  200
>;
export type UpdateMemoryRequest =
  BodyOf<"put_workspaces_workspace_memory_providers_provider_id_memories_memory_id">;

export type MemoryWriteFilters =
  QueryOf<"post_workspaces_workspace_memory_providers_provider_id_memories">;
export type MemorySearchFilters =
  QueryOf<"post_workspaces_workspace_memory_providers_provider_id_memories_search">;

export class Memories {
  constructor(
    private readonly context: ScopeContext,
    private readonly path: string,
  ) {}

  ref(memoryId: string): MemoryResource {
    return new MemoryResource(this.context, resourcePath(this.path, memoryId));
  }

  list(
    filters: MemoryListFilters,
    options: RequestOptions = {},
  ): Promise<ResourceResult<MemoryCollectionPage>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      this.path,
      undefined,
      undefined,
      scopedOptions(this.context, options, filters),
    );
  }

  pages(
    filters: MemoryListFilters,
    options: RequestOptions = {},
  ): PageIterator<MemoryCollectionPage, Memory> {
    const saved = snapshot(filters);
    return new PageIterator(
      saved.cursor,
      (cursor) => this.list(withCursor(saved, cursor), options),
      (page) => page,
    );
  }

  iterate(
    filters: MemoryListFilters,
    options: RequestOptions = {},
  ): AsyncIterable<Memory> {
    return flattenPages(this.pages(filters, options), (page) => page);
  }

  add(
    body: AddMemoryRequest,
    filters: MemoryWriteFilters,
    options: RequestOptions = {},
  ): Promise<ResourceResult<Memory>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      this.path,
      body,
      undefined,
      scopedOptions(this.context, options, filters),
    );
  }

  search(
    body: SearchMemoriesRequest,
    filters: MemorySearchFilters,
    options: RequestOptions = {},
  ): Promise<ResourceResult<SearchMemoriesResult>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      `${this.path}/search`,
      body,
      undefined,
      scopedOptions(this.context, options, filters),
    );
  }
}

export class MemoryResource {
  constructor(
    private readonly context: ScopeContext,
    private readonly path: string,
  ) {}

  get(
    filters: QueryOf<"get_workspaces_workspace_memory_providers_provider_id_memories_memory_id">,
    options: RequestOptions = {},
  ): Promise<ResourceResult<Memory>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      this.path,
      undefined,
      undefined,
      scopedOptions(this.context, options, filters),
    );
  }

  update(
    body: UpdateMemoryRequest,
    filters: QueryOf<"put_workspaces_workspace_memory_providers_provider_id_memories_memory_id">,
    options: RequestOptions = {},
  ): Promise<ResourceResult<Memory>> {
    return jsonRequest(
      this.context.transport,
      "PUT",
      this.path,
      body,
      undefined,
      scopedOptions(this.context, options, filters),
    );
  }

  delete(
    filters: QueryOf<"delete_workspaces_workspace_memory_providers_provider_id_memories_memory_id">,
    options: RequestOptions = {},
  ): Promise<ResourceResult<void>> {
    return jsonRequest(
      this.context.transport,
      "DELETE",
      this.path,
      undefined,
      undefined,
      scopedOptions(this.context, options, filters),
    );
  }
}

export type Skill = ResponseOf<"get_skills_skill_id", 200>;
export type SkillCollectionPage = ResponseOf<
  "get_workspaces_workspace_skills",
  200
>;
export type SkillListFilters = FiltersOf<"get_workspaces_workspace_skills">;
export type CreateSkillRequest = BodyOf<"post_workspaces_workspace_skills">;
export type SkillPublicationReceipt = ResponseOf<
  "post_workspaces_workspace_skills",
  201
>;
export type UpdateSkillRequest = BodyOf<"patch_skills_skill_id">;
export type CreateSkillRevisionRequest =
  BodyOf<"post_skills_skill_id_revisions">;
export type SkillRevision = ResponseOf<"post_skills_skill_id_revisions", 201>;

export class Skills extends PagedCollection<
  SkillCollectionPage,
  Skill,
  SkillListFilters
> {
  constructor(context: ScopeContext) {
    super(context, `${context.prefix}/skills`);
  }

  ref(skillId: string): SkillResource {
    return new SkillResource(
      this.context,
      `/api/v1/skills/${encodeURIComponent(selector(skillId, "skillId"))}`,
    );
  }

  byKey(
    skillKey: string,
    options: RequestOptions = {},
  ): Promise<ResourceResult<Skill>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      `${this.path}/${encodeURIComponent(selector(skillKey, "skillKey"))}`,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  create(
    body: CreateSkillRequest,
    options: MutationOptions,
  ): Promise<ResourceResult<SkillPublicationReceipt>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      this.path,
      body,
      mutationHeaders(options),
      scopedOptions(this.context, options),
    );
  }
}

export class SkillResource {
  constructor(
    private readonly context: ScopeContext,
    private readonly path: string,
  ) {}

  get(options: RequestOptions = {}): Promise<ResourceResult<Skill>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      this.path,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  update(
    body: UpdateSkillRequest,
    options: EtagOptions,
  ): Promise<ResourceResult<Skill>> {
    return jsonRequest(
      this.context.transport,
      "PATCH",
      this.path,
      body,
      etagHeaders(options),
      scopedOptions(this.context, options),
    );
  }

  createRevision(
    body: CreateSkillRevisionRequest,
    options: MutationOptions,
  ): Promise<ResourceResult<SkillRevision>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      `${this.path}/revisions`,
      body,
      mutationHeaders(options),
      scopedOptions(this.context, options),
    );
  }

  delete(options: EtagOptions): Promise<ResourceResult<void>> {
    return jsonRequest(
      this.context.transport,
      "DELETE",
      this.path,
      undefined,
      etagHeaders(options),
      scopedOptions(this.context, options),
    );
  }
}

export type HookSubscription = ResponseOf<
  "get_hook_subscriptions_subscription_id",
  200
>;
export type HookSubscriptionCollectionPage = ResponseOf<
  "get_workspaces_workspace_hook_subscriptions",
  200
>;
export type HookSubscriptionListFilters =
  FiltersOf<"get_workspaces_workspace_hook_subscriptions">;
export type CreateHookSubscriptionRequest =
  BodyOf<"post_workspaces_workspace_hook_subscriptions">;
export type UpdateHookSubscriptionRequest =
  BodyOf<"put_hook_subscriptions_subscription_id">;
export type UpdateHookSubscriptionStateRequest =
  BodyOf<"patch_hook_subscriptions_subscription_id">;

export class HookSubscriptions extends PagedCollection<
  HookSubscriptionCollectionPage,
  HookSubscription,
  HookSubscriptionListFilters
> {
  constructor(context: ScopeContext) {
    super(context, `${context.prefix}/hook-subscriptions`);
  }

  ref(subscriptionId: string): HookSubscriptionResource {
    return new HookSubscriptionResource(
      this.context,
      `/api/v1/hook-subscriptions/${encodeURIComponent(selector(subscriptionId, "subscriptionId"))}`,
    );
  }

  create(
    body: CreateHookSubscriptionRequest,
    options: RequestOptions = {},
  ): Promise<ResourceResult<HookSubscription>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      this.path,
      body,
      undefined,
      scopedOptions(this.context, options),
    );
  }
}

export class HookSubscriptionResource {
  constructor(
    private readonly context: ScopeContext,
    private readonly path: string,
  ) {}

  get(options: RequestOptions = {}): Promise<ResourceResult<HookSubscription>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      this.path,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  update(
    body: UpdateHookSubscriptionRequest,
    options: EtagOptions,
  ): Promise<ResourceResult<HookSubscription>> {
    return jsonRequest(
      this.context.transport,
      "PUT",
      this.path,
      body,
      etagHeaders(options),
      scopedOptions(this.context, options),
    );
  }

  updateState(
    body: UpdateHookSubscriptionStateRequest,
    options: EtagOptions,
  ): Promise<ResourceResult<HookSubscription>> {
    return jsonRequest(
      this.context.transport,
      "PATCH",
      this.path,
      body,
      etagHeaders(options),
      scopedOptions(this.context, options),
    );
  }

  redrive(
    deliveryId: string,
    options: RequestOptions = {},
  ): Promise<ResourceResult<void>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      `${this.path}/deliveries/${encodeURIComponent(selector(deliveryId, "deliveryId"))}/redrive`,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  delete(options: EtagOptions): Promise<ResourceResult<void>> {
    return jsonRequest(
      this.context.transport,
      "DELETE",
      this.path,
      undefined,
      etagHeaders(options),
      scopedOptions(this.context, options),
    );
  }
}

export type Trace = ResponseOf<"get_workspaces_workspace_traces_trace_id", 200>;
export type TraceCollectionPage = ResponseOf<
  "get_workspaces_workspace_traces",
  200
>;
export type TraceListFilters = FiltersOf<"get_workspaces_workspace_traces">;
export type TraceObservations = ResponseOf<
  "get_workspaces_workspace_traces_trace_id_observations",
  200
>;

export class Traces extends PagedCollection<
  TraceCollectionPage,
  Trace,
  TraceListFilters
> {
  constructor(context: ScopeContext) {
    super(context, `${context.prefix}/traces`);
  }

  ref(traceId: string): TraceResource {
    return new TraceResource(this.context, resourcePath(this.path, traceId));
  }
}

export class TraceResource {
  constructor(
    private readonly context: ScopeContext,
    private readonly path: string,
  ) {}

  get(options: RequestOptions = {}): Promise<ResourceResult<Trace>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      this.path,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  observations(
    filters: QueryOf<"get_workspaces_workspace_traces_trace_id_observations"> = {},
    options: RequestOptions = {},
  ): Promise<ResourceResult<TraceObservations>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      `${this.path}/observations`,
      undefined,
      undefined,
      scopedOptions(this.context, options, filters),
    );
  }
}

export type LifecycleEventCollection = ResponseOf<
  "get_workspaces_workspace_events",
  200
>;
export type LifecycleEventFilters = QueryOf<"get_workspaces_workspace_events">;

export class LifecycleEvents {
  constructor(private readonly context: ScopeContext) {}

  list(
    filters: LifecycleEventFilters = {},
    options: RequestOptions = {},
  ): Promise<ResourceResult<LifecycleEventCollection>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      `${this.context.prefix}/events`,
      undefined,
      undefined,
      scopedOptions(this.context, options, filters),
    );
  }
}

export type ConfigurationReadiness = ResponseOf<
  "get_workspaces_workspace_configuration_assistant_readiness",
  200
>;
export type ConfigurationReadinessFilters =
  QueryOf<"get_workspaces_workspace_configuration_assistant_readiness">;

export class ConfigurationAssistant {
  constructor(private readonly context: ScopeContext) {}

  readiness(
    filters: ConfigurationReadinessFilters = {},
    options: RequestOptions = {},
  ): Promise<ResourceResult<ConfigurationReadiness>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      `${this.context.prefix}/configuration-assistant/readiness`,
      undefined,
      undefined,
      scopedOptions(this.context, options, filters),
    );
  }
}

export type ConfigurationSession = ResponseOf<
  "get_configuration_sessions_session_id",
  200
>;
export type ConfigurationSessionCollectionPage = ResponseOf<
  "get_workspaces_workspace_configuration_sessions",
  200
>;
export type ConfigurationSessionListItem =
  ConfigurationSessionCollectionPage extends PageLike<infer Item>
    ? Item
    : never;
export type ConfigurationSessionListFilters =
  FiltersOf<"get_workspaces_workspace_configuration_sessions">;
export type CreateConfigurationSessionRequest =
  BodyOf<"post_workspaces_workspace_configuration_sessions">;

export class ConfigurationSessions extends PagedCollection<
  ConfigurationSessionCollectionPage,
  ConfigurationSessionListItem,
  ConfigurationSessionListFilters
> {
  constructor(context: ScopeContext) {
    super(context, `${context.prefix}/configuration-sessions`);
  }

  ref(sessionId: string): ConfigurationSessionResource {
    return new ConfigurationSessionResource(
      this.context,
      `/api/v1/configuration-sessions/${encodeURIComponent(selector(sessionId, "sessionId"))}`,
    );
  }

  create(
    body: CreateConfigurationSessionRequest,
    options: MutationOptions,
  ): Promise<ResourceResult<ConfigurationSession>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      this.path,
      body,
      mutationHeaders(options),
      scopedOptions(this.context, options),
    );
  }
}

export type ConfigurationThreadCollectionPage = ResponseOf<
  "get_configuration_sessions_session_id_threads",
  200
>;
export type ConfigurationThread = ResponseOf<
  "get_configuration_threads_thread_id",
  200
>;
export type ConfigurationThreadListItem =
  ConfigurationThreadCollectionPage extends PageLike<infer Item> ? Item : never;
export type ConfigurationThreadListFilters =
  FiltersOf<"get_configuration_sessions_session_id_threads">;
export type CreateConfigurationThreadRequest =
  BodyOf<"post_configuration_sessions_session_id_threads">;
export type ConfigurationInputRequest =
  BodyOf<"post_configuration_threads_thread_id_inputs">;
export type ConfigurationInputReceipt = ResponseOf<
  "post_configuration_threads_thread_id_inputs",
  202
>;

export class ConfigurationSessionResource {
  readonly threads: ConfigurationThreads;

  constructor(
    private readonly context: ScopeContext,
    private readonly path: string,
  ) {
    this.threads = new ConfigurationThreads(context, `${path}/threads`);
  }

  get(
    options: RequestOptions = {},
  ): Promise<ResourceResult<ConfigurationSession>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      this.path,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }
}

export class ConfigurationThreads extends PagedCollection<
  ConfigurationThreadCollectionPage,
  ConfigurationThreadListItem,
  ConfigurationThreadListFilters
> {
  constructor(context: ScopeContext, path: string) {
    super(context, path);
  }

  ref(threadId: string): ConfigurationThreadResource {
    return new ConfigurationThreadResource(
      this.context,
      `/api/v1/configuration-threads/${encodeURIComponent(selector(threadId, "threadId"))}`,
    );
  }

  create(
    body: CreateConfigurationThreadRequest,
    options: MutationOptions,
  ): Promise<ResourceResult<ConfigurationThread>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      this.path,
      body,
      mutationHeaders(options),
      scopedOptions(this.context, options),
    );
  }
}

export class ConfigurationThreadResource {
  constructor(
    private readonly context: ScopeContext,
    private readonly path: string,
  ) {}

  get(
    options: RequestOptions = {},
  ): Promise<ResourceResult<ConfigurationThread>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      this.path,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  submitInput(
    body: ConfigurationInputRequest,
    options: MutationOptions,
  ): Promise<ResourceResult<ConfigurationInputReceipt>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      `${this.path}/inputs`,
      body,
      mutationHeaders(options),
      scopedOptions(this.context, options),
    );
  }
}

export type ConfigurationDraftReview = ResponseOf<
  "get_configuration_drafts_draft_id",
  200
>;
export type ConfigurationDraft = ResponseOf<
  "patch_configuration_drafts_draft_id",
  200
>;
export type UpdateConfigurationDraftRequest =
  BodyOf<"patch_configuration_drafts_draft_id">;
export type ApplyConfigurationDraftRequest =
  BodyOf<"post_configuration_drafts_draft_id_apply">;
export type ConfigurationApplicationReceipt = ResponseOf<
  "post_configuration_drafts_draft_id_apply",
  200
>;
export type DiscardConfigurationDraftRequest =
  BodyOf<"post_configuration_drafts_draft_id_discard">;
export type RebaseConfigurationDraftRequest =
  BodyOf<"post_configuration_drafts_draft_id_rebase">;
export type ConfigurationApplicationCollectionPage = ResponseOf<
  "get_configuration_drafts_draft_id_applications",
  200
>;
export type ConfigurationApplication =
  ConfigurationApplicationCollectionPage extends PageLike<infer Item>
    ? Item
    : never;
export type ConfigurationApplicationListFilters =
  FiltersOf<"get_configuration_drafts_draft_id_applications">;

export class ConfigurationDrafts {
  constructor(private readonly context: ScopeContext) {}

  ref(draftId: string): ConfigurationDraftResource {
    return new ConfigurationDraftResource(
      this.context,
      `/api/v1/configuration-drafts/${encodeURIComponent(selector(draftId, "draftId"))}`,
    );
  }
}

export class ConfigurationDraftResource {
  readonly applications: ConfigurationApplications;

  constructor(
    private readonly context: ScopeContext,
    private readonly path: string,
  ) {
    this.applications = new ConfigurationApplications(
      context,
      `${path}/applications`,
    );
  }

  get(
    options: RequestOptions = {},
  ): Promise<ResourceResult<ConfigurationDraftReview>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      this.path,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  update(
    body: UpdateConfigurationDraftRequest,
    options: { idempotencyKey: string; ifMatch: string; signal?: AbortSignal },
  ): Promise<ResourceResult<ConfigurationDraft>> {
    return this.command("PATCH", "", body, options);
  }

  apply(
    body: ApplyConfigurationDraftRequest,
    options: { idempotencyKey: string; ifMatch: string; signal?: AbortSignal },
  ): Promise<ResourceResult<ConfigurationApplicationReceipt>> {
    return this.command("POST", "/apply", body, options);
  }

  discard(
    body: DiscardConfigurationDraftRequest,
    options: { idempotencyKey: string; ifMatch: string; signal?: AbortSignal },
  ): Promise<ResourceResult<ConfigurationDraft>> {
    return this.command("POST", "/discard", body, options);
  }

  rebase(
    body: RebaseConfigurationDraftRequest,
    options: { idempotencyKey: string; ifMatch: string; signal?: AbortSignal },
  ): Promise<ResourceResult<ConfigurationDraft>> {
    return this.command("POST", "/rebase", body, options);
  }

  private command<T>(
    method: "PATCH" | "POST",
    suffix: string,
    body: unknown,
    options: { idempotencyKey: string; ifMatch: string; signal?: AbortSignal },
  ): Promise<ResourceResult<T>> {
    return jsonRequest(
      this.context.transport,
      method,
      `${this.path}${suffix}`,
      body,
      guardedMutationHeaders(options),
      scopedOptions(this.context, options),
    );
  }
}

export class ConfigurationApplications extends PagedCollection<
  ConfigurationApplicationCollectionPage,
  ConfigurationApplication,
  ConfigurationApplicationListFilters
> {
  constructor(context: ScopeContext, path: string) {
    super(context, path);
  }
}

export type ApplicationAccount = ResponseOf<
  "get_application_accounts_account_id",
  200
>;
export type ApplicationAccountCollectionPage = ResponseOf<
  "get_workspaces_workspace_application_accounts",
  200
>;
export type ApplicationAccountListFilters =
  FiltersOf<"get_workspaces_workspace_application_accounts">;
export type CreateApplicationAccountRequest =
  BodyOf<"post_workspaces_workspace_application_accounts">;
export type UpdateApplicationAccountRequest =
  BodyOf<"patch_application_accounts_account_id">;

export class ApplicationAccounts extends PagedCollection<
  ApplicationAccountCollectionPage,
  ApplicationAccount,
  ApplicationAccountListFilters
> {
  constructor(context: ScopeContext) {
    super(context, `${context.prefix}/application-accounts`);
  }

  ref(accountId: string): ApplicationAccountResource {
    return new ApplicationAccountResource(
      this.context,
      `/api/v1/application-accounts/${encodeURIComponent(selector(accountId, "accountId"))}`,
    );
  }

  create(
    body: CreateApplicationAccountRequest,
    options: MutationOptions,
  ): Promise<ResourceResult<ApplicationAccount>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      this.path,
      body,
      mutationHeaders(options),
      scopedOptions(this.context, options),
    );
  }
}

export class ApplicationAccountResource {
  constructor(
    private readonly context: ScopeContext,
    private readonly path: string,
  ) {}

  get(
    options: RequestOptions = {},
  ): Promise<ResourceResult<ApplicationAccount>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      this.path,
      undefined,
      undefined,
      scopedOptions(this.context, options),
    );
  }

  update(
    body: UpdateApplicationAccountRequest,
    options: EtagOptions,
  ): Promise<ResourceResult<ApplicationAccount>> {
    return jsonRequest(
      this.context.transport,
      "PATCH",
      this.path,
      body,
      etagHeaders(options),
      scopedOptions(this.context, options),
    );
  }
}

export type BotCollectionPage = ResponseOf<
  "get_workspaces_workspace_bots",
  200
>;
export type Bot = BotCollectionPage extends PageLike<infer Item> ? Item : never;
export type BotListFilters = FiltersOf<"get_workspaces_workspace_bots">;

export class Bots extends PagedCollection<
  BotCollectionPage,
  Bot,
  BotListFilters
> {
  constructor(context: ScopeContext) {
    super(context, `${context.prefix}/bots`);
  }
}

export type InvitationCollectionPage = ResponseOf<
  "get_workspaces_workspace_invitations",
  200
>;
export type Invitation =
  InvitationCollectionPage extends PageLike<infer Item> ? Item : never;
export type InvitationListFilters =
  FiltersOf<"get_workspaces_workspace_invitations">;
export type WorkspaceCreateInvitationRequest =
  BodyOf<"post_workspaces_workspace_invitations">;
export type OrganizationCreateInvitationRequest =
  BodyOf<"post_organizations_organization_invitations">;
export type CreateInvitationRequest<Kind extends ScopeKind = ScopeKind> =
  Kind extends "workspace"
    ? WorkspaceCreateInvitationRequest
    : OrganizationCreateInvitationRequest;
export type InvitationCreateResult<Kind extends ScopeKind = ScopeKind> =
  Kind extends "workspace"
    ? ResponseOf<"post_workspaces_workspace_invitations", 201>
    : ResponseOf<"post_organizations_organization_invitations", 201>;

export class Invitations<
  Kind extends ScopeKind = ScopeKind,
> extends PagedCollection<
  InvitationCollectionPage,
  Invitation,
  InvitationListFilters
> {
  constructor(context: ScopeContext<Kind>) {
    super(context, `${context.prefix}/invitations`);
  }

  create(
    body: CreateInvitationRequest<Kind>,
    options: RequestOptions = {},
  ): Promise<ResourceResult<InvitationCreateResult<Kind>>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      this.path,
      body,
      undefined,
      scopedOptions(this.context, options),
    );
  }
}

export type RoleBindingCollectionPage = ResponseOf<
  "get_workspaces_workspace_role_bindings",
  200
>;
export type RoleBinding =
  RoleBindingCollectionPage extends PageLike<infer Item> ? Item : never;
export type RoleBindingListFilters =
  FiltersOf<"get_workspaces_workspace_role_bindings">;
export type CreateRoleBindingRequest =
  BodyOf<"post_workspaces_workspace_role_bindings">;

export class RoleBindings extends PagedCollection<
  RoleBindingCollectionPage,
  RoleBinding,
  RoleBindingListFilters
> {
  constructor(context: ScopeContext) {
    super(context, `${context.prefix}/role-bindings`);
  }

  create(
    body: CreateRoleBindingRequest,
    options: RequestOptions = {},
  ): Promise<ResourceResult<RoleBinding>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      this.path,
      body,
      undefined,
      scopedOptions(this.context, options),
    );
  }
}

export type WorkspacePermissionCollection = ResponseOf<
  "get_workspaces_workspace_permissions",
  200
>;
export type OrganizationPermissionCollection = ResponseOf<
  "get_organizations_organization_permissions",
  200
>;
export type PermissionCollection = WorkspacePermissionCollection;
export type WorkspacePermissionFilters =
  QueryOf<"get_workspaces_workspace_permissions">;
export type OrganizationPermissionFilters =
  QueryOf<"get_organizations_organization_permissions">;
export type PermissionFilters = WorkspacePermissionFilters;
type ScopedPermissionCollection<Kind extends ScopeKind> =
  Kind extends "workspace"
    ? WorkspacePermissionCollection
    : OrganizationPermissionCollection;
type ScopedPermissionFilters<Kind extends ScopeKind> = Kind extends "workspace"
  ? WorkspacePermissionFilters
  : OrganizationPermissionFilters;

export class Permissions<Kind extends ScopeKind = ScopeKind> {
  constructor(private readonly context: ScopeContext<Kind>) {}

  list(
    filters: ScopedPermissionFilters<Kind> = {} as ScopedPermissionFilters<Kind>,
    options: RequestOptions = {},
  ): Promise<ResourceResult<ScopedPermissionCollection<Kind>>> {
    return jsonRequest(
      this.context.transport,
      "GET",
      `${this.context.prefix}/permissions`,
      undefined,
      undefined,
      scopedOptions(this.context, options, filters),
    );
  }
}

export type MemberCollectionPage = ResponseOf<
  "get_workspaces_workspace_members",
  200
>;
export type Member =
  MemberCollectionPage extends PageLike<infer Item> ? Item : never;
export type MemberListFilters = FiltersOf<"get_workspaces_workspace_members">;

export class Members extends PagedCollection<
  MemberCollectionPage,
  Member,
  MemberListFilters
> {
  constructor(context: ScopeContext) {
    super(context, `${context.prefix}/members`);
  }
}

export type PersonalApiKeyCollectionPage = ResponseOf<
  "get_workspaces_workspace_personal_api_keys",
  200
>;
export type PersonalApiKey =
  PersonalApiKeyCollectionPage extends PageLike<infer Item> ? Item : never;
export type PersonalApiKeyListFilters =
  FiltersOf<"get_workspaces_workspace_personal_api_keys">;
export type CreatePersonalApiKeyRequest =
  BodyOf<"post_workspaces_workspace_personal_api_keys">;
export type PersonalApiKeyCreateResult = ResponseOf<
  "post_workspaces_workspace_personal_api_keys",
  201
>;

export class PersonalApiKeys extends PagedCollection<
  PersonalApiKeyCollectionPage,
  PersonalApiKey,
  PersonalApiKeyListFilters
> {
  constructor(context: ScopeContext) {
    super(context, `${context.prefix}/personal-api-keys`);
  }

  create(
    body: CreatePersonalApiKeyRequest,
    options: RequestOptions = {},
  ): Promise<ResourceResult<PersonalApiKeyCreateResult>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      this.path,
      body,
      undefined,
      scopedOptions(this.context, options),
    );
  }
}

export type ServiceAccountCollectionPage = ResponseOf<
  "get_workspaces_workspace_service_accounts",
  200
>;
export type ServiceAccount =
  ServiceAccountCollectionPage extends PageLike<infer Item> ? Item : never;
export type ServiceAccountListFilters =
  FiltersOf<"get_workspaces_workspace_service_accounts">;
export type CreateServiceAccountRequest =
  BodyOf<"post_workspaces_workspace_service_accounts">;
export type ServiceAccountCreateResult = ResponseOf<
  "post_workspaces_workspace_service_accounts",
  201
>;

export class ServiceAccounts extends PagedCollection<
  ServiceAccountCollectionPage,
  ServiceAccount,
  ServiceAccountListFilters
> {
  constructor(context: ScopeContext) {
    super(context, `${context.prefix}/service-accounts`);
  }

  create(
    body: CreateServiceAccountRequest,
    options: RequestOptions = {},
  ): Promise<ResourceResult<ServiceAccountCreateResult>> {
    return jsonRequest(
      this.context.transport,
      "POST",
      this.path,
      body,
      undefined,
      scopedOptions(this.context, options),
    );
  }
}

export class Organizations {
  constructor(private readonly transport: Transport) {}

  ref(organizationId: string): Organization {
    return new Organization(this.transport, organizationId);
  }
}

export class Organization {
  readonly models: Models;
  readonly modelProviders: ModelProviders;
  readonly webProviders: WebProviders;
  readonly environmentProviders: EnvironmentProviders;
  readonly environmentTemplates: EnvironmentTemplates;
  readonly connectorProviders: ConnectorProviders;
  readonly memoryProviders: MemoryProviders;
  readonly invitations: Invitations<"organization">;
  readonly roleBindings: RoleBindings;
  readonly permissions: Permissions<"organization">;

  constructor(
    readonly transport: Transport,
    readonly id: string,
  ) {
    const context = scopeContext(transport, "organization", id);
    this.models = new Models(context);
    this.modelProviders = new ModelProviders(context);
    this.webProviders = new WebProviders(context);
    this.environmentProviders = new EnvironmentProviders(context);
    this.environmentTemplates = new EnvironmentTemplates(context);
    this.connectorProviders = new ConnectorProviders(context);
    this.memoryProviders = new MemoryProviders(context);
    this.invitations = new Invitations(context);
    this.roleBindings = new RoleBindings(context);
    this.permissions = new Permissions(context);
  }
}

export interface WorkspaceManagement {
  readonly models: Models;
  readonly modelProviders: ModelProviders;
  readonly webProviders: WebProviders;
  readonly environmentProviders: EnvironmentProviders;
  readonly environmentTemplates: EnvironmentTemplates;
  readonly environments: Environments;
  readonly assets: Assets;
  readonly connections: Connections;
  readonly connectorProviders: ConnectorProviders;
  readonly memoryProviders: MemoryProviders;
  readonly skills: Skills;
  readonly hookSubscriptions: HookSubscriptions;
  readonly traces: Traces;
  readonly lifecycleEvents: LifecycleEvents;
  readonly configurationAssistant: ConfigurationAssistant;
  readonly configurationSessions: ConfigurationSessions;
  readonly configurationDrafts: ConfigurationDrafts;
  readonly applicationAccounts: ApplicationAccounts;
  readonly bots: Bots;
  readonly invitations: Invitations<"workspace">;
  readonly roleBindings: RoleBindings;
  readonly permissions: Permissions<"workspace">;
  readonly members: Members;
  readonly personalApiKeys: PersonalApiKeys;
  readonly serviceAccounts: ServiceAccounts;
}

export function workspaceManagement(
  transport: Transport,
  workspaceId: string,
): WorkspaceManagement {
  const context = scopeContext(transport, "workspace", workspaceId);
  return {
    models: new Models(context),
    modelProviders: new ModelProviders(context),
    webProviders: new WebProviders(context),
    environmentProviders: new EnvironmentProviders(context),
    environmentTemplates: new EnvironmentTemplates(context),
    environments: new Environments(context),
    assets: new Assets(context),
    connections: new Connections(context),
    connectorProviders: new ConnectorProviders(context),
    memoryProviders: new MemoryProviders(context),
    skills: new Skills(context),
    hookSubscriptions: new HookSubscriptions(context),
    traces: new Traces(context),
    lifecycleEvents: new LifecycleEvents(context),
    configurationAssistant: new ConfigurationAssistant(context),
    configurationSessions: new ConfigurationSessions(context),
    configurationDrafts: new ConfigurationDrafts(context),
    applicationAccounts: new ApplicationAccounts(context),
    bots: new Bots(context),
    invitations: new Invitations(context),
    roleBindings: new RoleBindings(context),
    permissions: new Permissions(context),
    members: new Members(context),
    personalApiKeys: new PersonalApiKeys(context),
    serviceAccounts: new ServiceAccounts(context),
  };
}
