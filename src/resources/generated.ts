/** Generated resource bindings. Do not edit; run npm run generate. */
import type { operations, components, Binary } from "../schema.js";
import type { Transport } from "../transport.js";
import {
  jsonRequest,
  uploadRequest,
  binaryRequest,
  multipartBody,
  selector,
  snapshot,
  withCursor,
  PageIterator,
  flattenPages,
  type ResourceResult,
  type BinaryResult,
} from "./base.js";
type Operation0 = operations["prepare_composer"];
type Operation0Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation0["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation139 = operations["prepare_finding_agent"];
type Operation139Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation139["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation1 = operations["list_agents"];
type Operation1Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation1["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation1["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation2 = operations["create_agent"];
type Operation2Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation2["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation3 = operations["validate_agent"];
type Operation3Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation3["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation4 = operations["get_agent"];
type Operation4Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation4["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation5 = operations["update_agent"];
type Operation5Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation5["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation5["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation6 = operations["archive_agent"];
type Operation6Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation6["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation6["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation10 = operations["duplicate_agent"];
type Operation10Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation10["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation16 = operations["unarchive_agent"];
type Operation16Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation16["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation16["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation7 = operations["delete_agent_avatar"];
type Operation7Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation7["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation7["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation8 = operations["get_agent_avatar"];
type Operation8Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation8["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation9 = operations["put_agent_avatar"];
type Operation9Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation9["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation9["parameters"]["header"]
  >["X-Workspace-ID"];
  contentType: "image/jpeg" | "image/png" | "image/webp";
};
type Operation11 = operations["list_agent_revisions"];
type Operation11Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation11["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation11["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation11DetailedOptions = Omit<Operation11Options, "query"> & {
  query?: Omit<
    NonNullable<Operation11["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed" };
};
type Operation12 = operations["create_agent_revision"];
type Operation12Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation12["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation12["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation13 = operations["get_agent_revision"];
type Operation13Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation13["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation13["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation13DetailedOptions = Omit<Operation13Options, "query"> & {
  query?: Omit<
    NonNullable<Operation13["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed"; section?: null };
};
type Operation15 = operations["set_default_agent_revision"];
type Operation15Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation15["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation15["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation14 = operations["compare_agent_revisions"];
type Operation14Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation14["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation14["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation17 = operations["list_assets"];
type Operation17Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation17["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation17["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation18 = operations["create_asset"];
type Operation18Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation18["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation19 = operations["retire_asset"];
type Operation19Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation19["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation19["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation20 = operations["get_asset"];
type Operation20Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation20["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation21 = operations["read_asset_content"];
type Operation21Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation21["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation22 = operations["bootstrap_administrator"];
type Operation22Options = { signal?: AbortSignal };
type Operation25 = operations["password_login"];
type Operation25Options = { signal?: AbortSignal };
type Operation26Options = { signal?: AbortSignal };
type Operation23 = operations["auth_configuration"];
type Operation23Options = { signal?: AbortSignal };
type Operation24 = operations["confirm_email_change"];
type Operation24Options = { signal?: AbortSignal };
type Operation27 = operations["request_password_reset"];
type Operation27Options = { signal?: AbortSignal };
type Operation28 = operations["confirm_password_reset"];
type Operation28Options = { signal?: AbortSignal };
type Operation29 = operations["session_profile"];
type Operation29Options = { signal?: AbortSignal };
type Operation30 = operations["list_browser_providers"];
type Operation30Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation30["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation30["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation31 = operations["create_browser_provider"];
type Operation31Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation31["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation32 = operations["delete_browser_provider"];
type Operation32Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation32["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation32["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation33 = operations["get_browser_provider"];
type Operation33Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation33["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation34 = operations["update_browser_provider"];
type Operation34Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation34["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation34["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation35 = operations["test_browser_provider"];
type Operation35Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation35["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation36 = operations["list_browsers"];
type Operation36Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation36["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation36["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation37 = operations["create_browser"];
type Operation37Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation37["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation38 = operations["attach_browser"];
type Operation38Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation38["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation39 = operations["get_browser"];
type Operation39Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation39["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation40 = operations["handback_browser"];
type Operation40Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation40["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation40["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation41 = operations["prepare_browser"];
type Operation41Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation41["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation42 = operations["release_browser"];
type Operation42Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation42["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation42["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation43 = operations["renew_browser_control"];
type Operation43Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation43["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation44 = operations["stop_browser"];
type Operation44Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation44["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation44["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation45 = operations["takeover_browser"];
type Operation45Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation45["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation45["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation46 = operations["browser_viewer"];
type Operation46Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation46["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation47 = operations["list_builtin_skills"];
type Operation47Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation47["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation48 = operations["get_builtin_skill"];
type Operation48Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation48["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation49 = operations["read_builtin_skill_archive"];
type Operation49Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation49["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation49["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation50 = operations["register_client_environment"];
type Operation50Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation50["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation51 = operations["connect_client_environment"];
type Operation51Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation51["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation52 = operations["create_client_pairing"];
type Operation52Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation52["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation53 = operations["get_client_pairing"];
type Operation53Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation53["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation54 = operations["approve_client_pairing"];
type Operation54Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation54["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation55 = operations["cancel_client_pairing"];
type Operation55Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation55["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation56 = operations["claim_client_pairing"];
type Operation56Options = { signal?: AbortSignal };
type Operation57 = operations["recognize_client_pairing"];
type Operation57Options = { signal?: AbortSignal };
type Operation58 = operations["get_client_environment"];
type Operation58Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation58["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation59 = operations["revoke_client_environment_credential"];
type Operation59Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation59["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation59["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation60 = operations["rotate_client_environment_credential"];
type Operation60Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation60["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation60["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation61 = operations["change_client_environment_status"];
type Operation61Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation61["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation61["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation62 = operations["list_cloudflare_deployments"];
type Operation62Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation62["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation63 = operations["create_cloudflare_deployment"];
type Operation63Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation63["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation64 = operations["get_cloudflare_deployment"];
type Operation64Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation64["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation65 = operations["retire_cloudflare_deployment"];
type Operation65Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation65["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation65["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation66 = operations["retry_cloudflare_deployment"];
type Operation66Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation66["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation66["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation67 = operations["list_connections"];
type Operation67Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation67["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation67["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation68 = operations["create_connection"];
type Operation68Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation68["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation69 = operations["complete_authorization"];
type Operation69Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation69["parameters"]["query"]>;
};
type Operation70 = operations["get_redirect_uri"];
type Operation70Options = { signal?: AbortSignal };
type Operation71 = operations["get_connection"];
type Operation71Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation71["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation72 = operations["update_connection"];
type Operation72Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation72["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation72["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation73 = operations["authorize_connection"];
type Operation73Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation73["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation73["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation74 = operations["revoke_connection"];
type Operation74Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation74["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation74["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation75 = operations["test_connection"];
type Operation75Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation75["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation76 = operations["list_connection_tools"];
type Operation76Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation76["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation77 = operations["define_connection_tools"];
type Operation77Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation77["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation77["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation78 = operations["index_connection_tools"];
type Operation78Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation78["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation78["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation79 = operations["list_connector_providers"];
type Operation79Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation79["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation79["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation80 = operations["create_connector_provider"];
type Operation80Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation80["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation81 = operations["delete_connector_provider"];
type Operation81Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation81["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation81["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation82 = operations["get_connector_provider"];
type Operation82Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation82["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation83 = operations["update_connector_provider"];
type Operation83Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation83["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation83["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation89 = operations["test_connector_provider"];
type Operation89Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation89["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation84 = operations["list_connector_apps"];
type Operation84Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation84["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation84["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation85 = operations["get_connector_app"];
type Operation85Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation85["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation86 = operations["list_connector_actions"];
type Operation86Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation86["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation87 = operations["define_connector_actions"];
type Operation87Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation87["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation87["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation88 = operations["index_connector_actions"];
type Operation88Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation88["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation88["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation90 = operations["list_devices"];
type Operation90Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation90["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation90["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation91 = operations["create_device"];
type Operation91Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation91["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation92 = operations["delete_device"];
type Operation92Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation92["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation92["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation93 = operations["get_device"];
type Operation93Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation93["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation94 = operations["update_device"];
type Operation94Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation94["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation94["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation96 = operations["rotate_device_credential"];
type Operation96Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation96["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation96["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation95 = operations["query_device_metrics"];
type Operation95Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation95["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation97 = operations["list_egress_credentials"];
type Operation97Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation97["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation97["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation98 = operations["create_egress_credential"];
type Operation98Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation98["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation99 = operations["get_egress_credential"];
type Operation99Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation99["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation100 = operations["update_egress_credential"];
type Operation100Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation100["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation100["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation101 = operations["revoke_egress_credential"];
type Operation101Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation101["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation101["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation103 = operations["sync_egress_credential"];
type Operation103Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation103["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation102 = operations["list_credential_sessions"];
type Operation102Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation102["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation102["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation104 = operations["rotate_egress_credential"];
type Operation104Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation104["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation104["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation105 = operations["vercel_provider_options"];
type Operation105Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation105["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation106 = operations["list_environment_providers"];
type Operation106Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation106["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation106["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation107 = operations["create_environment_provider"];
type Operation107Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation107["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation108 = operations["delete_environment_provider"];
type Operation108Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation108["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation108["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation109 = operations["get_environment_provider"];
type Operation109Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation109["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation110 = operations["update_environment_provider"];
type Operation110Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation110["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation110["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation112 = operations["test_environment_provider"];
type Operation112Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation112["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation111 = operations["environment_provider_references"];
type Operation111Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation111["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation113 = operations["list_environment_templates"];
type Operation113Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation113["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation113["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation114 = operations["create_environment_template"];
type Operation114Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation114["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation115 = operations["get_environment_template"];
type Operation115Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation115["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation116 = operations["update_environment_template"];
type Operation116Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation116["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation116["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation117 = operations["list_environments"];
type Operation117Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation117["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation117["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation118 = operations["create_environment"];
type Operation118Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation118["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation119 = operations["delete_environment"];
type Operation119Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation119["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation119["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation120 = operations["get_environment"];
type Operation120Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation120["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation121 = operations["update_environment"];
type Operation121Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation121["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation121["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation131 = operations["open_desktop_viewer"];
type Operation131Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation131["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation137 = operations["retry_environment_creation"];
type Operation137Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation137["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation137["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation138 = operations["stop_environment"];
type Operation138Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation138["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation138["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation122 = operations["check_computer"];
type Operation122Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation122["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation123 = operations["get_environment_creation"];
type Operation123Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation123["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation124 = operations["list_environment_credential_sessions"];
type Operation124Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation124["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation124["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation125 = operations["set_environment_debug_hold"];
type Operation125Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation125["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation125["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation126 = operations["get_desktop_control"];
type Operation126Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation126["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation127 = operations["return_desktop_control"];
type Operation127Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation127["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation127["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation128 = operations["renew_desktop_control"];
type Operation128Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation128["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation129 = operations["take_over_desktop"];
type Operation129Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation129["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation129["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation130 = operations["get_environment_desktop_preview"];
type Operation130Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation130["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation132 = operations["get_kubernetes_environment_diagnostics"];
type Operation132Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation132["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation133 = operations["get_kubernetes_environment_logs"];
type Operation133Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation133["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation133["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation134 = operations["select_metrics_source"];
type Operation134Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation134["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation134["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation136 = operations["query_environment_metrics"];
type Operation136Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation136["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation135 = operations["get_collector_status"];
type Operation135Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation135["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation140 = operations["list_finding_analyses"];
type Operation140Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation140["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation140["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation141 = operations["start_analysis"];
type Operation141Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation141["parameters"]["header"]>["Idempotency-Key"]
  >;
  xWorkspaceId?: NonNullable<
    Operation141["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation142 = operations["list_findings"];
type Operation142Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation142["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation142["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation143 = operations["create_finding"];
type Operation143Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation143["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation144 = operations["get_finding"];
type Operation144Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation144["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation145 = operations["update_finding"];
type Operation145Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation145["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation145["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation146 = operations["accept"];
type Operation146Options = { signal?: AbortSignal };
type Operation147 = operations["list_mcp_servers"];
type Operation147Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation147["parameters"]["query"]>;
};
type Operation148 = operations["get_media_defaults"];
type Operation148Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation148["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation149 = operations["replace_media_defaults"];
type Operation149Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation149["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation149["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation150 = operations["list_memories"];
type Operation150Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation150["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation150["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation151 = operations["create_memory"];
type Operation151Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation151["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation152 = operations["list_memory_guidance_presets"];
type Operation152Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation152["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation153 = operations["delete_memory"];
type Operation153Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation153["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation153["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation154 = operations["get_memory"];
type Operation154Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation154["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation155 = operations["update_memory"];
type Operation155Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation155["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation155["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation156 = operations["list_files"];
type Operation156Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation156["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation156["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation157 = operations["create_file"];
type Operation157Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation157["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation158 = operations["move_file"];
type Operation158Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation158["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation158["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation159 = operations["delete_file"];
type Operation159Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation159["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation159["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation160 = operations["read_file"];
type Operation160Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation160["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation161 = operations["replace_file"];
type Operation161Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation161["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation161["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation162 = operations["get_memory_automation"];
type Operation162Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation162["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation163 = operations["update_memory_automation"];
type Operation163Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation163["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation163["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation164 = operations["list_records"];
type Operation164Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation164["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation164["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation165 = operations["add_record"];
type Operation165Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation165["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation166 = operations["search_records"];
type Operation166Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation166["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation167 = operations["delete_record"];
type Operation167Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation167["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation168 = operations["update_record"];
type Operation168Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation168["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation169 = operations["purge_history"];
type Operation169Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation169["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation169["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation170 = operations["list_memory_revisions"];
type Operation170Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation170["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation170["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation171 = operations["get_memory_revision"];
type Operation171Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation171["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation172 = operations["restore_memory_revision"];
type Operation172Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation172["parameters"]["header"]>["If-Match"];
  xWorkspaceId?: NonNullable<
    Operation172["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation173 = operations["list_memory_organizations"];
type Operation173Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation173["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation173["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation174 = operations["create_memory_organization"];
type Operation174Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation174["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation175 = operations["get_memory_organization"];
type Operation175Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation175["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation176 = operations["get_organization_candidate"];
type Operation176Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation176["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation177 = operations["apply_organization_candidate"];
type Operation177Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation177["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation179 = operations["discard_organization_candidate"];
type Operation179Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation179["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation178 = operations["get_organization_candidate_diff"];
type Operation178Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation178["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation178["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation180 = operations["get_organization_candidate_file"];
type Operation180Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation180["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation180["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation181 = operations["get_organization_candidate_replacement"];
type Operation181Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation181["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation181["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation182 = operations["list_memory_providers"];
type Operation182Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation182["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation182["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation183 = operations["create_memory_provider"];
type Operation183Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation183["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation184 = operations["delete_memory_provider"];
type Operation184Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation184["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation184["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation185 = operations["get_memory_provider"];
type Operation185Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation185["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation186 = operations["update_memory_provider"];
type Operation186Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation186["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation186["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation187 = operations["test_memory_provider"];
type Operation187Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation187["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation188 = operations["list_spaces"];
type Operation188Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation188["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation188["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation189 = operations["create_space"];
type Operation189Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation189["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation190 = operations["delete_space"];
type Operation190Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation190["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation190["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation191 = operations["get_space"];
type Operation191Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation191["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation192 = operations["update_space"];
type Operation192Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation192["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation192["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation193 = operations["get_space_organization"];
type Operation193Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation193["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation194 = operations["list_space_organizations"];
type Operation194Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation194["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation194["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation195 = operations["organize_space"];
type Operation195Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation195["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation196 = operations["list_space_sessions"];
type Operation196Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation196["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation196["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation197 = operations["list_dashboards"];
type Operation197Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation197["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation197["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation198 = operations["create_dashboard"];
type Operation198Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation198["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation199 = operations["get_dashboard_preset"];
type Operation199Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation199["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation200 = operations["delete_dashboard"];
type Operation200Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation200["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation200["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation201 = operations["get_dashboard"];
type Operation201Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation201["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation202 = operations["update_dashboard"];
type Operation202Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation202["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation202["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation203 = operations["list_metrics_data_sources"];
type Operation203Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation203["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation203["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation204 = operations["create_metrics_data_source"];
type Operation204Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation204["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation205 = operations["get_metrics_capabilities"];
type Operation205Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation205["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation206 = operations["get_metrics_deployment_preset"];
type Operation206Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation206["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation207 = operations["delete_metrics_data_source"];
type Operation207Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation207["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation207["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation208 = operations["get_metrics_data_source"];
type Operation208Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation208["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation209 = operations["update_metrics_data_source"];
type Operation209Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation209["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation209["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation210 = operations["query_metrics_data_source"];
type Operation210Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation210["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation211 = operations["get_model_catalog"];
type Operation211Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation211["parameters"]["query"]>;
};
type Operation211DetailedOptions = Omit<Operation211Options, "query"> & {
  query?: Omit<
    NonNullable<Operation211["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed"; section?: null };
};
type Operation212 = operations["list_model_providers"];
type Operation212Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation212["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation212["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation213 = operations["create_model_provider"];
type Operation213Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation213["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation214 = operations["delete_model_provider"];
type Operation214Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation214["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation214["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation215 = operations["get_model_provider"];
type Operation215Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation215["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation216 = operations["update_model_provider"];
type Operation216Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation216["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation216["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation220 = operations["authorize_model"];
type Operation220Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation220["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation222 = operations["test_model_provider"];
type Operation222Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation222["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation217 = operations["disconnect_model_authorization"];
type Operation217Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation217["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation218 = operations["model_authorization"];
type Operation218Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation218["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation219 = operations["complete_model_authorization"];
type Operation219Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation219["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation221 = operations["discover_model_provider_models"];
type Operation221Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation221["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation223 = operations["list_models"];
type Operation223Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation223["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation223["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation224 = operations["create_model"];
type Operation224Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation224["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation225 = operations["get_model"];
type Operation225Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation225["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation226 = operations["update_model"];
type Operation226Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation226["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation226["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation227 = operations["list_organizations"];
type Operation227Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation227["parameters"]["query"]>;
};
type Operation228 = operations["get_organization"];
type Operation228Options = { signal?: AbortSignal };
type Operation229 = operations["update_organization"];
type Operation229Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation229["parameters"]["header"]>["If-Match"]
  >;
};
type Operation230 = operations["list_app_plugins"];
type Operation230Options = { signal?: AbortSignal };
type Operation231 = operations["update_app_plugin"];
type Operation231Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation231["parameters"]["header"]>["If-Match"]
  >;
};
type Operation232 = operations["list_organization_audit_events"];
type Operation232Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation232["parameters"]["query"]>;
};
type Operation233 = operations["list_organization_grants"];
type Operation233Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation233["parameters"]["query"]>;
};
type Operation234 = operations["create_organization_grant"];
type Operation234Options = { signal?: AbortSignal };
type Operation235Options = { signal?: AbortSignal };
type Operation236 = operations["change_organization_grant"];
type Operation236Options = { signal?: AbortSignal };
type Operation237 = operations["delete_organization_icon"];
type Operation237Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation237["parameters"]["header"]>["If-Match"]
  >;
};
type Operation238Options = { signal?: AbortSignal };
type Operation239 = operations["put_organization_icon"];
type Operation239Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation239["parameters"]["header"]>["If-Match"]
  >;
  contentType: "image/jpeg" | "image/png" | "image/webp";
};
type Operation240 = operations["list_organization_invitations"];
type Operation240Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation240["parameters"]["query"]>;
};
type Operation241 = operations["create_organization_invitation"];
type Operation241Options = { signal?: AbortSignal };
type Operation242 = operations["resend_organization_invitation"];
type Operation242Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation242["parameters"]["header"]>["If-Match"]
  >;
};
type Operation243 = operations["revoke_organization_invitation"];
type Operation243Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation243["parameters"]["header"]>["If-Match"]
  >;
};
type Operation244 = operations["list_members"];
type Operation244Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation244["parameters"]["query"]>;
};
type Operation245 = operations["list_organization_workspaces"];
type Operation245Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation245["parameters"]["query"]>;
};
type Operation246 = operations["create_workspace"];
type Operation246Options = { signal?: AbortSignal };
type Operation247 = operations["list_plugins"];
type Operation247Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation247["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation248 = operations["list_provider_types"];
type Operation248Options = { signal?: AbortSignal };
type Operation249 = operations["list_runs"];
type Operation249Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation249["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation249["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation250 = operations["get_run"];
type Operation250Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation250["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation250["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation250DetailedOptions = Omit<Operation250Options, "query"> & {
  query?: Omit<
    NonNullable<Operation250["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed"; section?: null };
};
type Operation251 = operations["update_run"];
type Operation251Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation251["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation251["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation260 = operations["fork_run"];
type Operation260Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation260["parameters"]["header"]>["Idempotency-Key"]
  >;
  xWorkspaceId?: NonNullable<
    Operation260["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation262 = operations["interrupt_run"];
type Operation262Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation262["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation266 = operations["resume_run"];
type Operation266Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation266["parameters"]["header"]>["Idempotency-Key"]
  >;
  xWorkspaceId?: NonNullable<
    Operation266["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation252 = operations["get_run_agent"];
type Operation252Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation252["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation252["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation252DetailedOptions = Omit<Operation252Options, "query"> & {
  query?: Omit<
    NonNullable<Operation252["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed"; section?: null };
};
type Operation253 = operations["open_run_app"];
type Operation253Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation253["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation254 = operations["read_run_app_resource"];
type Operation254Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation254["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation255 = operations["call_run_app_tool"];
type Operation255Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation255["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation256 = operations["list_run_attempts"];
type Operation256Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation256["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation257 = operations["get_run_attempt"];
type Operation257Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation257["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation258 = operations["list_attempt_spans"];
type Operation258Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation258["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation258["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation258DetailedOptions = Omit<Operation258Options, "query"> & {
  query?: Omit<
    NonNullable<Operation258["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed" };
};
type Operation259 = operations["get_run_content"];
type Operation259Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation259["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation259["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation259DetailedOptions = Omit<Operation259Options, "query"> & {
  query?: Omit<
    NonNullable<Operation259["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed" };
};
type Operation261 = operations["run_image"];
type Operation261Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation261["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation263 = operations["list_run_items"];
type Operation263Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation263["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation263["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation263DetailedOptions = Omit<Operation263Options, "query"> & {
  query?: Omit<
    NonNullable<Operation263["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed" };
};
type Operation264 = operations["read_run_item_content"];
type Operation264Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation264["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation264["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation265 = operations["get_run_lineage"];
type Operation265Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation265["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation265["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation267 = operations["list_schedules"];
type Operation267Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation267["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation267["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation268 = operations["create_schedule"];
type Operation268Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation268["parameters"]["header"]>["Idempotency-Key"]
  >;
  xWorkspaceId?: NonNullable<
    Operation268["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation269 = operations["preview_schedule"];
type Operation269Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation269["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation270 = operations["archive_schedule"];
type Operation270Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation270["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation270["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation271 = operations["get_schedule"];
type Operation271Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation271["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation272 = operations["update_schedule"];
type Operation272Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation272["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation272["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation273 = operations["dispatch_schedule"];
type Operation273Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation273["parameters"]["header"]>["Idempotency-Key"]
  >;
  ifMatch: NonNullable<
    NonNullable<Operation273["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation273["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation274 = operations["enable_schedule"];
type Operation274Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation274["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation274["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation277 = operations["pause_schedule"];
type Operation277Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation277["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation277["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation275 = operations["list_schedule_occurrences"];
type Operation275Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation275["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation275["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation276 = operations["get_schedule_occurrence"];
type Operation276Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation276["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation276["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation278 = operations["get_schedule_status"];
type Operation278Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation278["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation279 = operations["list_sessions"];
type Operation279Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation279["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation279["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation280 = operations["create_session"];
type Operation280Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation280["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation281 = operations["get_session"];
type Operation281Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation281["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation282 = operations["update_session"];
type Operation282Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation282["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation282["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation283 = operations["get_message_authors"];
type Operation283Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation283["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation283["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation284 = operations["session_stream"];
type Operation284Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation284["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation285 = operations["list_session_threads"];
type Operation285Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation285["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation285["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation286 = operations["list_skills"];
type Operation286Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation286["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation286["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation287 = operations["create_skill"];
type Operation287Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation287["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation288 = operations["validate_skill"];
type Operation288Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation288["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation289 = operations["get_skill"];
type Operation289Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation289["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation290 = operations["update_skill"];
type Operation290Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation290["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation290["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation291 = operations["archive_skill"];
type Operation291Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation291["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation291["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation298 = operations["unarchive_skill"];
type Operation298Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation298["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation298["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation292 = operations["list_skill_revisions"];
type Operation292Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation292["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation292["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation293 = operations["create_skill_revision"];
type Operation293Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation293["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation293["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation294 = operations["get_skill_revision"];
type Operation294Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation294["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation297 = operations["set_default_skill_revision"];
type Operation297Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation297["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation297["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation295 = operations["read_skill_archive"];
type Operation295Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation295["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation296 = operations["read_skill_file"];
type Operation296Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation296["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation299 = operations["list_subscriptions"];
type Operation299Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation299["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation299["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation300 = operations["create_subscription"];
type Operation300Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation300["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation301 = operations["delete_subscription"];
type Operation301Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation301["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation301["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation302 = operations["get_subscription"];
type Operation302Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation302["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation303 = operations["update_subscription"];
type Operation303Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation303["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation303["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation304 = operations["list_deliveries"];
type Operation304Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation304["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation304["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation305 = operations["redeliver"];
type Operation305Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation305["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation306 = operations["list_threads"];
type Operation306Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation306["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation306["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation307 = operations["create_thread"];
type Operation307Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation307["parameters"]["header"]>["Idempotency-Key"]
  >;
  xWorkspaceId?: NonNullable<
    Operation307["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation308 = operations["get_thread"];
type Operation308Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation308["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation309 = operations["update_thread"];
type Operation309Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation309["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation309["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation310 = operations["archive_thread"];
type Operation310Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation310["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation310["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation311 = operations["get_binding"];
type Operation311Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation311["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation312 = operations["bind_browser"];
type Operation312Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation312["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation312["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation313 = operations["list_environment_mounts"];
type Operation313Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation313["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation314 = operations["add_environment_mount"];
type Operation314Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation314["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation314["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation315 = operations["remove_environment_mount"];
type Operation315Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation315["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation315["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation316 = operations["update_environment_mount"];
type Operation316Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation316["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation316["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation317 = operations["list_inbox"];
type Operation317Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation317["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation317["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation317DetailedOptions = Omit<Operation317Options, "query"> & {
  query?: Omit<
    NonNullable<Operation317["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed" };
};
type Operation318 = operations["submit_message"];
type Operation318Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation318["parameters"]["header"]>["Idempotency-Key"]
  >;
  xWorkspaceId?: NonNullable<
    Operation318["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation319 = operations["reorder_inbox"];
type Operation319Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation319["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation319["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation320 = operations["withdraw_entry"];
type Operation320Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation320["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation320["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation321 = operations["get_inbox_entry"];
type Operation321Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation321["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation321["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation321DetailedOptions = Omit<Operation321Options, "query"> & {
  query?: Omit<
    NonNullable<Operation321["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed"; section?: null };
};
type Operation322 = operations["edit_entry"];
type Operation322Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation322["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation322["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation323 = operations["list_memory_mounts"];
type Operation323Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation323["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation324 = operations["add_memory_mount"];
type Operation324Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation324["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation324["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation325 = operations["remove_memory_mount"];
type Operation325Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation325["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation325["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation326 = operations["update_memory_mount"];
type Operation326Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation326["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation326["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation327 = operations["list_thread_runs"];
type Operation327Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation327["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation327["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation328 = operations["get_session_binding"];
type Operation328Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation328["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation329 = operations["update_session_binding"];
type Operation329Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation329["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation329["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation330 = operations["thread_stream"];
type Operation330Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation330["parameters"]["query"]>;
  lastEventId?: NonNullable<
    Operation330["parameters"]["header"]
  >["Last-Event-ID"];
  xWorkspaceId?: NonNullable<
    Operation330["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation331 = operations["list_tool_executions"];
type Operation331Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation331["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation331["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation332 = operations["get_tool_execution"];
type Operation332Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation332["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation333 = operations["cancel_tool_execution"];
type Operation333Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation333["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation334 = operations["observe_tool_execution"];
type Operation334Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation334["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation335 = operations["get_tool_execution_result"];
type Operation335Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation335["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation335["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation336 = operations["list_toolsets"];
type Operation336Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation336["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation336["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation337 = operations["define_toolsets"];
type Operation337Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation337["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation337["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation338 = operations["index_toolsets"];
type Operation338Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation338["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation338["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation339 = operations["get_trace_backend"];
type Operation339Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation339["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation340 = operations["list_traces"];
type Operation340Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation340["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation340["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation340DetailedOptions = Omit<Operation340Options, "query"> & {
  query?: Omit<
    NonNullable<Operation340["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed" };
};
type Operation341 = operations["search_traces"];
type Operation341Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation341["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation341["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation342 = operations["get_trace"];
type Operation342Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation342["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation342["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation342DetailedOptions = Omit<Operation342Options, "query"> & {
  query?: Omit<
    NonNullable<Operation342["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed"; section?: null };
};
type Operation343 = operations["list_trace_spans"];
type Operation343Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation343["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation343["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation343DetailedOptions = Omit<Operation343Options, "query"> & {
  query?: Omit<
    NonNullable<Operation343["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed" };
};
type Operation344 = operations["get_trace_span"];
type Operation344Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation344["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation345 = operations["read_span_content"];
type Operation345Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation345["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation345["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation346 = operations["create_upload"];
type Operation346Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation346["parameters"]["header"]>["Idempotency-Key"]
  >;
  xWorkspaceId?: NonNullable<
    Operation346["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation347 = operations["summarize_usage"];
type Operation347Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation347["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation347["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation348 = operations["usage_agents"];
type Operation348Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation348["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation348["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation349 = operations["context_usage"];
type Operation349Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation349["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation349["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation350 = operations["list_usage_members"];
type Operation350Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation350["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation350["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation351 = operations["usage_models"];
type Operation351Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation351["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation351["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation352 = operations["usage_overview"];
type Operation352Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation352["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation352["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation353 = operations["model_request_metrics"];
type Operation353Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation353["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation354 = operations["list_run_usage"];
type Operation354Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation354["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation354["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation355 = operations["list_session_usage"];
type Operation355Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation355["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation355["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation356 = operations["get_profile"];
type Operation356Options = { signal?: AbortSignal };
type Operation357 = operations["update_profile"];
type Operation357Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation357["parameters"]["header"]>["If-Match"]
  >;
};
type Operation361 = operations["disable_account"];
type Operation361Options = { signal?: AbortSignal };
type Operation367 = operations["change_password"];
type Operation367Options = { signal?: AbortSignal };
type Operation358 = operations["list_account_audit_events"];
type Operation358Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation358["parameters"]["query"]>;
};
type Operation359 = operations["delete_user_avatar"];
type Operation359Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation359["parameters"]["header"]>["If-Match"]
  >;
};
type Operation360 = operations["put_user_avatar"];
type Operation360Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation360["parameters"]["header"]>["If-Match"]
  >;
  contentType: "image/jpeg" | "image/png" | "image/webp";
};
type Operation362 = operations["list_user_keys"];
type Operation362Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation362["parameters"]["query"]>;
};
type Operation363 = operations["create_user_key"];
type Operation363Options = { signal?: AbortSignal };
type Operation364 = operations["revoke_user_key"];
type Operation364Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation364["parameters"]["header"]>["If-Match"]
  >;
};
type Operation365 = operations["list_login_sessions"];
type Operation365Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation365["parameters"]["query"]>;
};
type Operation366Options = { signal?: AbortSignal };
type Operation368Options = { signal?: AbortSignal };
type Operation369 = operations["list_web_providers"];
type Operation369Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation369["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation369["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation370 = operations["create_web_provider"];
type Operation370Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation370["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation371 = operations["delete_web_provider"];
type Operation371Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation371["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation371["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation372 = operations["get_web_provider"];
type Operation372Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation372["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation373 = operations["update_web_provider"];
type Operation373Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation373["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation373["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation374 = operations["test_web_provider"];
type Operation374Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation374["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation375 = operations["list_workspaces"];
type Operation375Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation375["parameters"]["query"]>;
};
type Operation376 = operations["get_workspace"];
type Operation376Options = { signal?: AbortSignal };
type Operation377 = operations["update_workspace"];
type Operation377Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation377["parameters"]["header"]>["If-Match"]
  >;
};
type Operation378 = operations["archive_workspace"];
type Operation378Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation378["parameters"]["header"]>["If-Match"]
  >;
};
type Operation379 = operations["list_workspace_audit_events"];
type Operation379Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation379["parameters"]["query"]>;
};
type Operation380 = operations["list_workspace_grants"];
type Operation380Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation380["parameters"]["query"]>;
};
type Operation381 = operations["create_workspace_grant"];
type Operation381Options = { signal?: AbortSignal };
type Operation382Options = { signal?: AbortSignal };
type Operation383 = operations["change_workspace_grant"];
type Operation383Options = { signal?: AbortSignal };
type Operation384 = operations["delete_workspace_icon"];
type Operation384Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation384["parameters"]["header"]>["If-Match"]
  >;
};
type Operation385Options = { signal?: AbortSignal };
type Operation386 = operations["put_workspace_icon"];
type Operation386Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation386["parameters"]["header"]>["If-Match"]
  >;
  contentType: "image/jpeg" | "image/png" | "image/webp";
};
type Operation387 = operations["list_workspace_invitations"];
type Operation387Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation387["parameters"]["query"]>;
};
type Operation388 = operations["create_workspace_invitation"];
type Operation388Options = { signal?: AbortSignal };
type Operation389 = operations["resend_workspace_invitation"];
type Operation389Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation389["parameters"]["header"]>["If-Match"]
  >;
};
type Operation390 = operations["revoke_workspace_invitation"];
type Operation390Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation390["parameters"]["header"]>["If-Match"]
  >;
};
type Operation391 = operations["list_workspace_keys"];
type Operation391Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation391["parameters"]["query"]>;
};
type Operation392 = operations["revoke_workspace_key"];
type Operation392Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation392["parameters"]["header"]>["If-Match"]
  >;
};
type Operation393 = operations["list_service_accounts"];
type Operation393Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation393["parameters"]["query"]>;
};
type Operation394 = operations["create_service_account"];
type Operation394Options = { signal?: AbortSignal };
type Operation395 = operations["delete_service_account"];
type Operation395Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation395["parameters"]["header"]>["If-Match"]
  >;
};
type Operation396 = operations["get_service_account"];
type Operation396Options = { signal?: AbortSignal };
type Operation397 = operations["update_service_account"];
type Operation397Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation397["parameters"]["header"]>["If-Match"]
  >;
};
type Operation398 = operations["list_service_account_keys"];
type Operation398Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation398["parameters"]["query"]>;
};
type Operation399 = operations["create_service_account_key"];
type Operation399Options = { signal?: AbortSignal };
type Operation400 = operations["health"];
type Operation400Options = { signal?: AbortSignal };
type Operation401 = operations["ready"];
type Operation401Options = { signal?: AbortSignal };
export class ServiceResources {
  constructor(private readonly transport: Transport) {}
  /** POST /api/v1/agent-composer. Preserves response metadata; mutations are not replayed. */
  agentComposer(
    options: Operation0Options = {},
  ): Promise<
    ResourceResult<Operation0["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      "/api/v1/agent-composer",
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get agents(): AgentsResource {
    return new AgentsResource(this.transport, "/api/v1/agents");
  }
  get assets(): AssetsResource {
    return new AssetsResource(this.transport, "/api/v1/assets");
  }
  get auth(): AuthResource {
    return new AuthResource(this.transport, "/api/v1/auth");
  }
  get browserProviders(): BrowserProvidersResource {
    return new BrowserProvidersResource(
      this.transport,
      "/api/v1/browser-providers",
    );
  }
  get browsers(): BrowsersResource {
    return new BrowsersResource(this.transport, "/api/v1/browsers");
  }
  get builtinSkills(): BuiltinSkillsResource {
    return new BuiltinSkillsResource(this.transport, "/api/v1/builtin-skills");
  }
  get clientEnvironments(): ClientEnvironmentsResource {
    return new ClientEnvironmentsResource(
      this.transport,
      "/api/v1/client-environments",
    );
  }
  get cloudflareDeployments(): CloudflareDeploymentsResource {
    return new CloudflareDeploymentsResource(
      this.transport,
      "/api/v1/cloudflare-deployments",
    );
  }
  get connections(): ConnectionsResource {
    return new ConnectionsResource(this.transport, "/api/v1/connections");
  }
  get connectorProviders(): ConnectorProvidersResource {
    return new ConnectorProvidersResource(
      this.transport,
      "/api/v1/connector-providers",
    );
  }
  get devices(): DevicesResource {
    return new DevicesResource(this.transport, "/api/v1/devices");
  }
  get egressCredentials(): EgressCredentialsResource {
    return new EgressCredentialsResource(
      this.transport,
      "/api/v1/egress-credentials",
    );
  }
  get environmentProviderOptions(): EnvironmentProviderOptionsResource {
    return new EnvironmentProviderOptionsResource(
      this.transport,
      "/api/v1/environment-provider-options",
    );
  }
  get environmentProviders(): EnvironmentProvidersResource {
    return new EnvironmentProvidersResource(
      this.transport,
      "/api/v1/environment-providers",
    );
  }
  get environmentTemplates(): EnvironmentTemplatesResource {
    return new EnvironmentTemplatesResource(
      this.transport,
      "/api/v1/environment-templates",
    );
  }
  get environments(): EnvironmentsResource {
    return new EnvironmentsResource(this.transport, "/api/v1/environments");
  }
  /** POST /api/v1/finding-agent. Preserves response metadata; mutations are not replayed. */
  findingAgent(
    options: Operation139Options = {},
  ): Promise<
    ResourceResult<
      Operation139["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      "/api/v1/finding-agent",
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get findingAnalyses(): FindingAnalysesResource {
    return new FindingAnalysesResource(
      this.transport,
      "/api/v1/finding-analyses",
    );
  }
  get findings(): FindingsResource {
    return new FindingsResource(this.transport, "/api/v1/findings");
  }
  get invitations(): InvitationsResource {
    return new InvitationsResource(this.transport, "/api/v1/invitations");
  }
  get mcpServers(): McpServersResource {
    return new McpServersResource(this.transport, "/api/v1/mcp-servers");
  }
  get mediaUnderstandingDefaults(): MediaUnderstandingDefaultsResource {
    return new MediaUnderstandingDefaultsResource(
      this.transport,
      "/api/v1/media-understanding-defaults",
    );
  }
  get memories(): MemoriesResource {
    return new MemoriesResource(this.transport, "/api/v1/memories");
  }
  get memoryOrganizations(): MemoryOrganizationsResource {
    return new MemoryOrganizationsResource(
      this.transport,
      "/api/v1/memory-organizations",
    );
  }
  get memoryProviders(): MemoryProvidersResource {
    return new MemoryProvidersResource(
      this.transport,
      "/api/v1/memory-providers",
    );
  }
  get memorySpaces(): MemorySpacesResource {
    return new MemorySpacesResource(this.transport, "/api/v1/memory-spaces");
  }
  get metricsDashboards(): MetricsDashboardsResource {
    return new MetricsDashboardsResource(
      this.transport,
      "/api/v1/metrics-dashboards",
    );
  }
  get metricsDataSources(): MetricsDataSourcesResource {
    return new MetricsDataSourcesResource(
      this.transport,
      "/api/v1/metrics-data-sources",
    );
  }
  get modelCatalog(): ModelCatalogResource {
    return new ModelCatalogResource(this.transport, "/api/v1/model-catalog");
  }
  get modelProviders(): ModelProvidersResource {
    return new ModelProvidersResource(
      this.transport,
      "/api/v1/model-providers",
    );
  }
  get models(): ModelsResource {
    return new ModelsResource(this.transport, "/api/v1/models");
  }
  get organizations(): OrganizationsResource {
    return new OrganizationsResource(this.transport, "/api/v1/organizations");
  }
  get plugins(): PluginsResource {
    return new PluginsResource(this.transport, "/api/v1/plugins");
  }
  get providerTypes(): ProviderTypesResource {
    return new ProviderTypesResource(this.transport, "/api/v1/provider-types");
  }
  get runs(): RunsResource {
    return new RunsResource(this.transport, "/api/v1/runs");
  }
  get schedules(): SchedulesResource {
    return new SchedulesResource(this.transport, "/api/v1/schedules");
  }
  get sessions(): SessionsResource {
    return new SessionsResource(this.transport, "/api/v1/sessions");
  }
  get skills(): SkillsResource {
    return new SkillsResource(this.transport, "/api/v1/skills");
  }
  get subscriptions(): SubscriptionsResource {
    return new SubscriptionsResource(this.transport, "/api/v1/subscriptions");
  }
  get threads(): ThreadsResource {
    return new ThreadsResource(this.transport, "/api/v1/threads");
  }
  get toolsets(): ToolsetsResource {
    return new ToolsetsResource(this.transport, "/api/v1/toolsets");
  }
  get traceBackend(): TraceBackendResource {
    return new TraceBackendResource(this.transport, "/api/v1/trace-backend");
  }
  get traces(): TracesResource {
    return new TracesResource(this.transport, "/api/v1/traces");
  }
  get uploads(): UploadsResource {
    return new UploadsResource(this.transport, "/api/v1/uploads");
  }
  get usage(): UsageResource {
    return new UsageResource(this.transport, "/api/v1/usage");
  }
  get users(): UsersResource {
    return new UsersResource(this.transport, "/api/v1/users");
  }
  get webProviders(): WebProvidersResource {
    return new WebProvidersResource(this.transport, "/api/v1/web-providers");
  }
  get workspaces(): WorkspacesResource {
    return new WorkspacesResource(this.transport, "/api/v1/workspaces");
  }
  get healthz(): HealthzResource {
    return new HealthzResource(this.transport, "/healthz");
  }
  get readyz(): ReadyzResource {
    return new ReadyzResource(this.transport, "/readyz");
  }
}

export class AgentsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/agents. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation1Options = {},
  ): Promise<
    ResourceResult<Operation1["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation1Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation1["responses"][200]["content"]["application/json"],
      Operation1["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation1Options = {}) {
    return flattenPages<
      Operation1["responses"][200]["content"]["application/json"],
      Operation1["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/agents. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<Operation2["requestBody"]>["content"]["application/json"],
    options: Operation2Options = {},
  ): Promise<
    ResourceResult<Operation2["responses"][201]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/agents/validate. Preserves response metadata; mutations are not replayed. */
  validate(
    body: NonNullable<Operation3["requestBody"]>["content"]["application/json"],
    options: Operation3Options = {},
  ): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/validate",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["get_agent"]["parameters"]["path"]["agent_id"],
  ): AgentsAgentIdResource {
    return new AgentsAgentIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class AgentsAgentIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/agents/{agent_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation4Options = {},
  ): Promise<
    ResourceResult<Operation4["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/agents/{agent_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<Operation5["requestBody"]>["content"]["application/json"],
    options: Operation5Options,
  ): Promise<
    ResourceResult<Operation5["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/agents/{agent_id}/archive. Preserves response metadata; mutations are not replayed. */
  archive(
    options: Operation6Options,
  ): Promise<
    ResourceResult<Operation6["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/archive",
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get avatar(): AgentsAgentIdAvatarResource {
    return new AgentsAgentIdAvatarResource(
      this.transport,
      this.path + "/avatar",
    );
  }
  /** POST /api/v1/agents/{agent_id}/duplicate. Preserves response metadata; mutations are not replayed. */
  duplicate(
    body: NonNullable<
      Operation10["requestBody"]
    >["content"]["application/json"],
    options: Operation10Options = {},
  ): Promise<
    ResourceResult<Operation10["responses"][201]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/duplicate",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get revisions(): AgentsAgentIdRevisionsResource {
    return new AgentsAgentIdRevisionsResource(
      this.transport,
      this.path + "/revisions",
    );
  }
  /** POST /api/v1/agents/{agent_id}/unarchive. Preserves response metadata; mutations are not replayed. */
  unarchive(
    options: Operation16Options,
  ): Promise<
    ResourceResult<Operation16["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/unarchive",
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class AgentsAgentIdAvatarResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/agents/{agent_id}/avatar. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation7Options,
  ): Promise<
    ResourceResult<Operation7["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** GET /api/v1/agents/{agent_id}/avatar. Caller owns and closes the unbuffered body. */
  get(options: Operation8Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal },
      headers: Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      accept: "image/jpeg, image/png, image/webp",
    });
  }
  /** PUT /api/v1/agents/{agent_id}/avatar. Preserves response metadata; mutations are not replayed. */
  replace(
    body: Binary,
    options: Operation9Options,
  ): Promise<
    ResourceResult<Operation9["responses"][200]["content"]["application/json"]>
  > {
    return uploadRequest(
      this.transport,
      "PUT",
      this.path,
      body,
      options.contentType,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class AgentsAgentIdRevisionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/agents/{agent_id}/revisions. Preserves response metadata; mutations are not replayed. */
  list(
    options?: Operation11DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["AgentRevisionPage"]>>;
  list(
    options: Operation11Options,
  ): Promise<
    ResourceResult<Operation11["responses"][200]["content"]["application/json"]>
  >;
  list(
    options: Operation11Options = {},
  ): Promise<
    ResourceResult<Operation11["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation11Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation11["responses"][200]["content"]["application/json"],
      Operation11["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation11Options = {}) {
    return flattenPages<
      Operation11["responses"][200]["content"]["application/json"],
      Operation11["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/agents/{agent_id}/revisions. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation12["requestBody"]
    >["content"]["application/json"],
    options: Operation12Options,
  ): Promise<
    ResourceResult<Operation12["responses"][201]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["get_agent_revision"]["parameters"]["path"]["revision_id"],
  ): AgentsAgentIdRevisionsRevisionIdResource {
    return new AgentsAgentIdRevisionsRevisionIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class AgentsAgentIdRevisionsRevisionIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/agents/{agent_id}/revisions/{revision_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options?: Operation13DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["AgentRevision"]>>;
  get(
    options: Operation13Options,
  ): Promise<
    ResourceResult<Operation13["responses"][200]["content"]["application/json"]>
  >;
  get(
    options: Operation13Options = {},
  ): Promise<
    ResourceResult<Operation13["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  get compare(): AgentsAgentIdRevisionsRevisionIdCompareResource {
    return new AgentsAgentIdRevisionsRevisionIdCompareResource(
      this.transport,
      this.path + "/compare",
    );
  }
  /** POST /api/v1/agents/{agent_id}/revisions/{revision_id}/set-default. Preserves response metadata; mutations are not replayed. */
  setDefault(
    options: Operation15Options,
  ): Promise<
    ResourceResult<Operation15["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/set-default",
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class AgentsAgentIdRevisionsRevisionIdCompareResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/agents/{agent_id}/revisions/{revision_id}/compare. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation14Options,
  ): Promise<
    ResourceResult<Operation14["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
}

export class AssetsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/assets. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation17Options = {},
  ): Promise<
    ResourceResult<Operation17["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation17Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation17["responses"][200]["content"]["application/json"],
      Operation17["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation17Options = {}) {
    return flattenPages<
      Operation17["responses"][200]["content"]["application/json"],
      Operation17["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/assets. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation18["requestBody"]
    >["content"]["application/json"],
    options: Operation18Options = {},
  ): Promise<
    ResourceResult<
      | Operation18["responses"][200]["content"]["application/json"]
      | Operation18["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["retire_asset"]["parameters"]["path"]["asset_id"],
  ): AssetsAssetIdResource {
    return new AssetsAssetIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class AssetsAssetIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/assets/{asset_id}. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation19Options,
  ): Promise<
    ResourceResult<Operation19["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** GET /api/v1/assets/{asset_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation20Options = {},
  ): Promise<
    ResourceResult<Operation20["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get content(): AssetsAssetIdContentResource {
    return new AssetsAssetIdContentResource(
      this.transport,
      this.path + "/content",
    );
  }
}

export class AssetsAssetIdContentResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/assets/{asset_id}/content. Caller owns and closes the unbuffered body. */
  get(options: Operation21Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal },
      headers: Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      accept: "*/*",
    });
  }
}

export class AuthResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** POST /api/v1/auth/bootstrap. Preserves response metadata; mutations are not replayed. */
  bootstrap(
    body: NonNullable<
      Operation22["requestBody"]
    >["content"]["application/json"],
    options: Operation22Options = {},
  ): Promise<
    ResourceResult<Operation22["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/bootstrap",
      body,
      undefined,
      { signal: options.signal },
    );
  }
  get configuration(): AuthConfigurationResource {
    return new AuthConfigurationResource(
      this.transport,
      this.path + "/configuration",
    );
  }
  get emailChange(): AuthEmailChangeResource {
    return new AuthEmailChangeResource(
      this.transport,
      this.path + "/email-change",
    );
  }
  /** POST /api/v1/auth/login. Preserves response metadata; mutations are not replayed. */
  login(
    body: NonNullable<
      Operation25["requestBody"]
    >["content"]["application/json"],
    options: Operation25Options = {},
  ): Promise<
    ResourceResult<Operation25["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/login",
      body,
      undefined,
      { signal: options.signal },
    );
  }
  /** POST /api/v1/auth/logout. Preserves response metadata; mutations are not replayed. */
  logout(options: Operation26Options = {}): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/logout",
      undefined,
      undefined,
      { signal: options.signal },
    );
  }
  get passwordReset(): AuthPasswordResetResource {
    return new AuthPasswordResetResource(
      this.transport,
      this.path + "/password-reset",
    );
  }
  get session(): AuthSessionResource {
    return new AuthSessionResource(this.transport, this.path + "/session");
  }
}

export class AuthConfigurationResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/auth/configuration. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation23Options = {},
  ): Promise<
    ResourceResult<Operation23["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
}

export class AuthEmailChangeResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** POST /api/v1/auth/email-change/confirm. Preserves response metadata; mutations are not replayed. */
  confirm(
    body: NonNullable<
      Operation24["requestBody"]
    >["content"]["application/json"],
    options: Operation24Options = {},
  ): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/confirm",
      body,
      undefined,
      { signal: options.signal },
    );
  }
}

export class AuthPasswordResetResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** POST /api/v1/auth/password-reset. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation27["requestBody"]
    >["content"]["application/json"],
    options: Operation27Options = {},
  ): Promise<ResourceResult<undefined>> {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  /** POST /api/v1/auth/password-reset/confirm. Preserves response metadata; mutations are not replayed. */
  confirm(
    body: NonNullable<
      Operation28["requestBody"]
    >["content"]["application/json"],
    options: Operation28Options = {},
  ): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/confirm",
      body,
      undefined,
      { signal: options.signal },
    );
  }
}

export class AuthSessionResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/auth/session. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation29Options = {},
  ): Promise<
    ResourceResult<Operation29["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
}

export class BrowserProvidersResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/browser-providers. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation30Options = {},
  ): Promise<
    ResourceResult<Operation30["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation30Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation30["responses"][200]["content"]["application/json"],
      Operation30["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation30Options = {}) {
    return flattenPages<
      Operation30["responses"][200]["content"]["application/json"],
      Operation30["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/browser-providers. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation31["requestBody"]
    >["content"]["application/json"],
    options: Operation31Options = {},
  ): Promise<
    ResourceResult<Operation31["responses"][201]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["delete_browser_provider"]["parameters"]["path"]["provider_id"],
  ): BrowserProvidersProviderIdResource {
    return new BrowserProvidersProviderIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class BrowserProvidersProviderIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/browser-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  delete(options: Operation32Options): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** GET /api/v1/browser-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation33Options = {},
  ): Promise<
    ResourceResult<Operation33["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/browser-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation34["requestBody"]
    >["content"]["application/json"],
    options: Operation34Options,
  ): Promise<
    ResourceResult<Operation34["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/browser-providers/{provider_id}/test. Preserves response metadata; mutations are not replayed. */
  test(
    options: Operation35Options = {},
  ): Promise<
    ResourceResult<Operation35["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/test",
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class BrowsersResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/browsers. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation36Options = {},
  ): Promise<
    ResourceResult<Operation36["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation36Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation36["responses"][200]["content"]["application/json"],
      Operation36["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation36Options = {}) {
    return flattenPages<
      Operation36["responses"][200]["content"]["application/json"],
      Operation36["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/browsers. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation37["requestBody"]
    >["content"]["application/json"],
    options: Operation37Options = {},
  ): Promise<
    ResourceResult<Operation37["responses"][201]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/browsers/attach. Preserves response metadata; mutations are not replayed. */
  attach(
    body: NonNullable<
      Operation38["requestBody"]
    >["content"]["application/json"],
    options: Operation38Options = {},
  ): Promise<
    ResourceResult<Operation38["responses"][201]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/attach",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["get_browser"]["parameters"]["path"]["browser_id"],
  ): BrowsersBrowserIdResource {
    return new BrowsersBrowserIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class BrowsersBrowserIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/browsers/{browser_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation39Options = {},
  ): Promise<
    ResourceResult<Operation39["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/browsers/{browser_id}/handback. Preserves response metadata; mutations are not replayed. */
  handback(
    options: Operation40Options,
  ): Promise<
    ResourceResult<Operation40["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/handback",
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/browsers/{browser_id}/prepare. Preserves response metadata; mutations are not replayed. */
  prepare(
    options: Operation41Options = {},
  ): Promise<
    ResourceResult<Operation41["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/prepare",
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/browsers/{browser_id}/release. Preserves response metadata; mutations are not replayed. */
  release(
    options: Operation42Options,
  ): Promise<
    ResourceResult<Operation42["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/release",
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/browsers/{browser_id}/renew. Preserves response metadata; mutations are not replayed. */
  renew(
    body: NonNullable<
      Operation43["requestBody"]
    >["content"]["application/json"],
    options: Operation43Options = {},
  ): Promise<
    ResourceResult<Operation43["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/renew",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/browsers/{browser_id}/stop. Preserves response metadata; mutations are not replayed. */
  stop(
    options: Operation44Options,
  ): Promise<
    ResourceResult<Operation44["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/stop",
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/browsers/{browser_id}/takeover. Preserves response metadata; mutations are not replayed. */
  takeover(
    body: NonNullable<
      Operation45["requestBody"]
    >["content"]["application/json"],
    options: Operation45Options,
  ): Promise<
    ResourceResult<Operation45["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/takeover",
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/browsers/{browser_id}/viewer. Preserves response metadata; mutations are not replayed. */
  viewer(
    options: Operation46Options = {},
  ): Promise<
    ResourceResult<Operation46["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/viewer",
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class BuiltinSkillsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/builtin-skills. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation47Options = {},
  ): Promise<
    ResourceResult<Operation47["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["get_builtin_skill"]["parameters"]["path"]["name"],
  ): BuiltinSkillsNameResource {
    return new BuiltinSkillsNameResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class BuiltinSkillsNameResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/builtin-skills/{name}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation48Options = {},
  ): Promise<
    ResourceResult<Operation48["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get content(): BuiltinSkillsNameContentResource {
    return new BuiltinSkillsNameContentResource(
      this.transport,
      this.path + "/content",
    );
  }
}

export class BuiltinSkillsNameContentResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/builtin-skills/{name}/content. Caller owns and closes the unbuffered body. */
  get(options: Operation49Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal, query: options.query },
      headers: Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      accept: "application/zip",
    });
  }
}

export class ClientEnvironmentsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** POST /api/v1/client-environments. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation50["requestBody"]
    >["content"]["application/json"],
    options: Operation50Options = {},
  ): Promise<
    ResourceResult<
      | Operation50["responses"][200]["content"]["application/json"]
      | Operation50["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/client-environments/connect. Preserves response metadata; mutations are not replayed. */
  connect(
    body: NonNullable<
      Operation51["requestBody"]
    >["content"]["application/json"],
    options: Operation51Options = {},
  ): Promise<
    ResourceResult<
      | Operation51["responses"][200]["content"]["application/json"]
      | Operation51["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/connect",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get pairings(): ClientEnvironmentsPairingsResource {
    return new ClientEnvironmentsPairingsResource(
      this.transport,
      this.path + "/pairings",
    );
  }
  ref(
    value: operations["get_client_environment"]["parameters"]["path"]["environment_id"],
  ): ClientEnvironmentsEnvironmentIdResource {
    return new ClientEnvironmentsEnvironmentIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class ClientEnvironmentsPairingsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** POST /api/v1/client-environments/pairings. Preserves response metadata; mutations are not replayed. */
  create(
    options: Operation52Options = {},
  ): Promise<
    ResourceResult<Operation52["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["get_client_pairing"]["parameters"]["path"]["pairing_id"],
  ): ClientEnvironmentsPairingsPairingIdResource {
    return new ClientEnvironmentsPairingsPairingIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class ClientEnvironmentsPairingsPairingIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/client-environments/pairings/{pairing_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation53Options = {},
  ): Promise<
    ResourceResult<Operation53["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/client-environments/pairings/{pairing_id}/approve. Preserves response metadata; mutations are not replayed. */
  approve(
    body: NonNullable<
      Operation54["requestBody"]
    >["content"]["application/json"],
    options: Operation54Options = {},
  ): Promise<
    ResourceResult<Operation54["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/approve",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/client-environments/pairings/{pairing_id}/cancel. Preserves response metadata; mutations are not replayed. */
  cancel(
    options: Operation55Options = {},
  ): Promise<
    ResourceResult<Operation55["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/cancel",
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/client-environments/pairings/{pairing_id}/claim. Preserves response metadata; mutations are not replayed. */
  claim(
    body: NonNullable<
      Operation56["requestBody"]
    >["content"]["application/json"],
    options: Operation56Options = {},
  ): Promise<
    ResourceResult<Operation56["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/claim",
      body,
      undefined,
      { signal: options.signal },
    );
  }
  /** POST /api/v1/client-environments/pairings/{pairing_id}/recognize. Preserves response metadata; mutations are not replayed. */
  recognize(
    body: NonNullable<
      Operation57["requestBody"]
    >["content"]["application/json"],
    options: Operation57Options = {},
  ): Promise<
    ResourceResult<Operation57["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/recognize",
      body,
      undefined,
      { signal: options.signal },
    );
  }
}

export class ClientEnvironmentsEnvironmentIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/client-environments/{environment_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation58Options = {},
  ): Promise<
    ResourceResult<Operation58["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/client-environments/{environment_id}/revoke-credential. Preserves response metadata; mutations are not replayed. */
  revokeCredential(
    options: Operation59Options,
  ): Promise<
    ResourceResult<Operation59["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/revoke-credential",
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/client-environments/{environment_id}/rotate-credential. Preserves response metadata; mutations are not replayed. */
  rotateCredential(
    options: Operation60Options,
  ): Promise<
    ResourceResult<Operation60["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/rotate-credential",
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get status(): ClientEnvironmentsEnvironmentIdStatusResource {
    return new ClientEnvironmentsEnvironmentIdStatusResource(
      this.transport,
      this.path + "/status",
    );
  }
}

export class ClientEnvironmentsEnvironmentIdStatusResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** PATCH /api/v1/client-environments/{environment_id}/status. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation61["requestBody"]
    >["content"]["application/json"],
    options: Operation61Options,
  ): Promise<
    ResourceResult<Operation61["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class CloudflareDeploymentsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/cloudflare-deployments. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation62Options = {},
  ): Promise<
    ResourceResult<Operation62["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/cloudflare-deployments. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation63["requestBody"]
    >["content"]["application/json"],
    options: Operation63Options = {},
  ): Promise<
    ResourceResult<Operation63["responses"][202]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["get_cloudflare_deployment"]["parameters"]["path"]["deployment_id"],
  ): CloudflareDeploymentsDeploymentIdResource {
    return new CloudflareDeploymentsDeploymentIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class CloudflareDeploymentsDeploymentIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/cloudflare-deployments/{deployment_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation64Options = {},
  ): Promise<
    ResourceResult<Operation64["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/cloudflare-deployments/{deployment_id}/retire. Preserves response metadata; mutations are not replayed. */
  retire(
    options: Operation65Options,
  ): Promise<
    ResourceResult<Operation65["responses"][202]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/retire",
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/cloudflare-deployments/{deployment_id}/retry. Preserves response metadata; mutations are not replayed. */
  retry(
    body: NonNullable<
      Operation66["requestBody"]
    >["content"]["application/json"],
    options: Operation66Options,
  ): Promise<
    ResourceResult<Operation66["responses"][202]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/retry",
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class ConnectionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/connections. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation67Options = {},
  ): Promise<
    ResourceResult<Operation67["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation67Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation67["responses"][200]["content"]["application/json"],
      Operation67["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation67Options = {}) {
    return flattenPages<
      Operation67["responses"][200]["content"]["application/json"],
      Operation67["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/connections. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation68["requestBody"]
    >["content"]["application/json"],
    options: Operation68Options = {},
  ): Promise<
    ResourceResult<Operation68["responses"][201]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get callback(): ConnectionsCallbackResource {
    return new ConnectionsCallbackResource(
      this.transport,
      this.path + "/callback",
    );
  }
  get redirectUri(): ConnectionsRedirectUriResource {
    return new ConnectionsRedirectUriResource(
      this.transport,
      this.path + "/redirect-uri",
    );
  }
  ref(
    value: operations["get_connection"]["parameters"]["path"]["connection_id"],
  ): ConnectionsConnectionIdResource {
    return new ConnectionsConnectionIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class ConnectionsCallbackResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/connections/callback. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation69Options,
  ): Promise<
    ResourceResult<Operation69["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
}

export class ConnectionsRedirectUriResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/connections/redirect-uri. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation70Options = {},
  ): Promise<
    ResourceResult<Operation70["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
}

export class ConnectionsConnectionIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/connections/{connection_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation71Options = {},
  ): Promise<
    ResourceResult<Operation71["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/connections/{connection_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation72["requestBody"]
    >["content"]["application/json"],
    options: Operation72Options,
  ): Promise<
    ResourceResult<Operation72["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/connections/{connection_id}/authorize. Preserves response metadata; mutations are not replayed. */
  authorize(
    body: NonNullable<
      Operation73["requestBody"]
    >["content"]["application/json"],
    options: Operation73Options,
  ): Promise<
    ResourceResult<Operation73["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/authorize",
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/connections/{connection_id}/revoke. Preserves response metadata; mutations are not replayed. */
  revoke(
    options: Operation74Options,
  ): Promise<
    ResourceResult<Operation74["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/revoke",
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/connections/{connection_id}/test. Preserves response metadata; mutations are not replayed. */
  test(
    options: Operation75Options = {},
  ): Promise<
    ResourceResult<Operation75["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/test",
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get tools(): ConnectionsConnectionIdToolsResource {
    return new ConnectionsConnectionIdToolsResource(
      this.transport,
      this.path + "/tools",
    );
  }
}

export class ConnectionsConnectionIdToolsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/connections/{connection_id}/tools. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation76Options = {},
  ): Promise<
    ResourceResult<Operation76["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get definitions(): ConnectionsConnectionIdToolsDefinitionsResource {
    return new ConnectionsConnectionIdToolsDefinitionsResource(
      this.transport,
      this.path + "/definitions",
    );
  }
  get index(): ConnectionsConnectionIdToolsIndexResource {
    return new ConnectionsConnectionIdToolsIndexResource(
      this.transport,
      this.path + "/index",
    );
  }
}

export class ConnectionsConnectionIdToolsDefinitionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/connections/{connection_id}/tools/definitions. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation77Options,
  ): Promise<
    ResourceResult<Operation77["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
}

export class ConnectionsConnectionIdToolsIndexResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/connections/{connection_id}/tools/index. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation78Options = {},
  ): Promise<
    ResourceResult<Operation78["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation78Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation78["responses"][200]["content"]["application/json"],
      Operation78["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation78Options = {}) {
    return flattenPages<
      Operation78["responses"][200]["content"]["application/json"],
      Operation78["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class ConnectorProvidersResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/connector-providers. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation79Options = {},
  ): Promise<
    ResourceResult<Operation79["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation79Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation79["responses"][200]["content"]["application/json"],
      Operation79["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation79Options = {}) {
    return flattenPages<
      Operation79["responses"][200]["content"]["application/json"],
      Operation79["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/connector-providers. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation80["requestBody"]
    >["content"]["application/json"],
    options: Operation80Options = {},
  ): Promise<
    ResourceResult<Operation80["responses"][201]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["delete_connector_provider"]["parameters"]["path"]["provider_id"],
  ): ConnectorProvidersProviderIdResource {
    return new ConnectorProvidersProviderIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class ConnectorProvidersProviderIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/connector-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  delete(options: Operation81Options): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** GET /api/v1/connector-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation82Options = {},
  ): Promise<
    ResourceResult<Operation82["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/connector-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation83["requestBody"]
    >["content"]["application/json"],
    options: Operation83Options,
  ): Promise<
    ResourceResult<Operation83["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get apps(): ConnectorProvidersProviderIdAppsResource {
    return new ConnectorProvidersProviderIdAppsResource(
      this.transport,
      this.path + "/apps",
    );
  }
  /** POST /api/v1/connector-providers/{provider_id}/test. Preserves response metadata; mutations are not replayed. */
  test(
    options: Operation89Options = {},
  ): Promise<
    ResourceResult<Operation89["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/test",
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class ConnectorProvidersProviderIdAppsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/connector-providers/{provider_id}/apps. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation84Options = {},
  ): Promise<
    ResourceResult<Operation84["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation84Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation84["responses"][200]["content"]["application/json"],
      Operation84["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation84Options = {}) {
    return flattenPages<
      Operation84["responses"][200]["content"]["application/json"],
      Operation84["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  ref(
    value: operations["get_connector_app"]["parameters"]["path"]["app"],
  ): ConnectorProvidersProviderIdAppsAppResource {
    return new ConnectorProvidersProviderIdAppsAppResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class ConnectorProvidersProviderIdAppsAppResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/connector-providers/{provider_id}/apps/{app}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation85Options = {},
  ): Promise<
    ResourceResult<Operation85["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get actions(): ConnectorProvidersProviderIdAppsAppActionsResource {
    return new ConnectorProvidersProviderIdAppsAppActionsResource(
      this.transport,
      this.path + "/actions",
    );
  }
}

export class ConnectorProvidersProviderIdAppsAppActionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/connector-providers/{provider_id}/apps/{app}/actions. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation86Options = {},
  ): Promise<
    ResourceResult<Operation86["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get definitions(): ConnectorProvidersProviderIdAppsAppActionsDefinitionsResource {
    return new ConnectorProvidersProviderIdAppsAppActionsDefinitionsResource(
      this.transport,
      this.path + "/definitions",
    );
  }
  get index(): ConnectorProvidersProviderIdAppsAppActionsIndexResource {
    return new ConnectorProvidersProviderIdAppsAppActionsIndexResource(
      this.transport,
      this.path + "/index",
    );
  }
}

export class ConnectorProvidersProviderIdAppsAppActionsDefinitionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/connector-providers/{provider_id}/apps/{app}/actions/definitions. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation87Options,
  ): Promise<
    ResourceResult<Operation87["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
}

export class ConnectorProvidersProviderIdAppsAppActionsIndexResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/connector-providers/{provider_id}/apps/{app}/actions/index. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation88Options = {},
  ): Promise<
    ResourceResult<Operation88["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation88Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation88["responses"][200]["content"]["application/json"],
      Operation88["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation88Options = {}) {
    return flattenPages<
      Operation88["responses"][200]["content"]["application/json"],
      Operation88["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class DevicesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/devices. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation90Options = {},
  ): Promise<
    ResourceResult<Operation90["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation90Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation90["responses"][200]["content"]["application/json"],
      Operation90["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation90Options = {}) {
    return flattenPages<
      Operation90["responses"][200]["content"]["application/json"],
      Operation90["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/devices. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation91["requestBody"]
    >["content"]["application/json"],
    options: Operation91Options = {},
  ): Promise<
    ResourceResult<Operation91["responses"][201]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["delete_device"]["parameters"]["path"]["device_id"],
  ): DevicesDeviceIdResource {
    return new DevicesDeviceIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class DevicesDeviceIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/devices/{device_id}. Preserves response metadata; mutations are not replayed. */
  delete(options: Operation92Options): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** GET /api/v1/devices/{device_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation93Options = {},
  ): Promise<
    ResourceResult<Operation93["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/devices/{device_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation94["requestBody"]
    >["content"]["application/json"],
    options: Operation94Options,
  ): Promise<
    ResourceResult<Operation94["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get metrics(): DevicesDeviceIdMetricsResource {
    return new DevicesDeviceIdMetricsResource(
      this.transport,
      this.path + "/metrics",
    );
  }
  /** POST /api/v1/devices/{device_id}/rotate-credential. Preserves response metadata; mutations are not replayed. */
  rotateCredential(
    options: Operation96Options,
  ): Promise<
    ResourceResult<Operation96["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/rotate-credential",
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class DevicesDeviceIdMetricsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** POST /api/v1/devices/{device_id}/metrics/query. Preserves response metadata; mutations are not replayed. */
  query(
    body: NonNullable<
      Operation95["requestBody"]
    >["content"]["application/json"],
    options: Operation95Options = {},
  ): Promise<
    ResourceResult<Operation95["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/query",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class EgressCredentialsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/egress-credentials. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation97Options = {},
  ): Promise<
    ResourceResult<Operation97["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation97Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation97["responses"][200]["content"]["application/json"],
      Operation97["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation97Options = {}) {
    return flattenPages<
      Operation97["responses"][200]["content"]["application/json"],
      Operation97["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/egress-credentials. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation98["requestBody"]
    >["content"]["application/json"],
    options: Operation98Options = {},
  ): Promise<
    ResourceResult<Operation98["responses"][201]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["get_egress_credential"]["parameters"]["path"]["credential_id"],
  ): EgressCredentialsCredentialIdResource {
    return new EgressCredentialsCredentialIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class EgressCredentialsCredentialIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/egress-credentials/{credential_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation99Options = {},
  ): Promise<
    ResourceResult<Operation99["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/egress-credentials/{credential_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation100["requestBody"]
    >["content"]["application/json"],
    options: Operation100Options,
  ): Promise<
    ResourceResult<
      Operation100["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/egress-credentials/{credential_id}/revoke. Preserves response metadata; mutations are not replayed. */
  revoke(
    options: Operation101Options,
  ): Promise<
    ResourceResult<
      Operation101["responses"][202]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/revoke",
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get sessions(): EgressCredentialsCredentialIdSessionsResource {
    return new EgressCredentialsCredentialIdSessionsResource(
      this.transport,
      this.path + "/sessions",
    );
  }
  /** POST /api/v1/egress-credentials/{credential_id}/sync. Preserves response metadata; mutations are not replayed. */
  sync(
    options: Operation103Options = {},
  ): Promise<
    ResourceResult<
      Operation103["responses"][202]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/sync",
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get value(): EgressCredentialsCredentialIdValueResource {
    return new EgressCredentialsCredentialIdValueResource(
      this.transport,
      this.path + "/value",
    );
  }
}

export class EgressCredentialsCredentialIdSessionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/egress-credentials/{credential_id}/sessions. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation102Options = {},
  ): Promise<
    ResourceResult<
      Operation102["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation102Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation102["responses"][200]["content"]["application/json"],
      Operation102["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation102Options = {}) {
    return flattenPages<
      Operation102["responses"][200]["content"]["application/json"],
      Operation102["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class EgressCredentialsCredentialIdValueResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** PUT /api/v1/egress-credentials/{credential_id}/value. Preserves response metadata; mutations are not replayed. */
  replace(
    body: NonNullable<
      Operation104["requestBody"]
    >["content"]["application/json"],
    options: Operation104Options,
  ): Promise<
    ResourceResult<
      Operation104["responses"][202]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PUT",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class EnvironmentProviderOptionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** POST /api/v1/environment-provider-options/vercel. Preserves response metadata; mutations are not replayed. */
  vercel(
    body: NonNullable<
      Operation105["requestBody"]
    >["content"]["application/json"],
    options: Operation105Options = {},
  ): Promise<
    ResourceResult<
      Operation105["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/vercel",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class EnvironmentProvidersResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/environment-providers. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation106Options = {},
  ): Promise<
    ResourceResult<
      Operation106["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation106Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation106["responses"][200]["content"]["application/json"],
      Operation106["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation106Options = {}) {
    return flattenPages<
      Operation106["responses"][200]["content"]["application/json"],
      Operation106["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/environment-providers. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation107["requestBody"]
    >["content"]["application/json"],
    options: Operation107Options = {},
  ): Promise<
    ResourceResult<
      Operation107["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["delete_environment_provider"]["parameters"]["path"]["provider_id"],
  ): EnvironmentProvidersProviderIdResource {
    return new EnvironmentProvidersProviderIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class EnvironmentProvidersProviderIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/environment-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  delete(options: Operation108Options): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** GET /api/v1/environment-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation109Options = {},
  ): Promise<
    ResourceResult<
      Operation109["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/environment-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation110["requestBody"]
    >["content"]["application/json"],
    options: Operation110Options,
  ): Promise<
    ResourceResult<
      Operation110["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get references(): EnvironmentProvidersProviderIdReferencesResource {
    return new EnvironmentProvidersProviderIdReferencesResource(
      this.transport,
      this.path + "/references",
    );
  }
  /** POST /api/v1/environment-providers/{provider_id}/test. Preserves response metadata; mutations are not replayed. */
  test(
    options: Operation112Options = {},
  ): Promise<
    ResourceResult<
      Operation112["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/test",
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class EnvironmentProvidersProviderIdReferencesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/environment-providers/{provider_id}/references. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation111Options = {},
  ): Promise<
    ResourceResult<
      Operation111["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class EnvironmentTemplatesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/environment-templates. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation113Options = {},
  ): Promise<
    ResourceResult<
      Operation113["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation113Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation113["responses"][200]["content"]["application/json"],
      Operation113["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation113Options = {}) {
    return flattenPages<
      Operation113["responses"][200]["content"]["application/json"],
      Operation113["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/environment-templates. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation114["requestBody"]
    >["content"]["application/json"],
    options: Operation114Options = {},
  ): Promise<
    ResourceResult<
      Operation114["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["get_environment_template"]["parameters"]["path"]["template_id"],
  ): EnvironmentTemplatesTemplateIdResource {
    return new EnvironmentTemplatesTemplateIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class EnvironmentTemplatesTemplateIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/environment-templates/{template_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation115Options = {},
  ): Promise<
    ResourceResult<
      Operation115["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/environment-templates/{template_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation116["requestBody"]
    >["content"]["application/json"],
    options: Operation116Options,
  ): Promise<
    ResourceResult<
      Operation116["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class EnvironmentsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/environments. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation117Options = {},
  ): Promise<
    ResourceResult<
      Operation117["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation117Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation117["responses"][200]["content"]["application/json"],
      Operation117["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation117Options = {}) {
    return flattenPages<
      Operation117["responses"][200]["content"]["application/json"],
      Operation117["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/environments. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation118["requestBody"]
    >["content"]["application/json"],
    options: Operation118Options = {},
  ): Promise<
    ResourceResult<
      Operation118["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["delete_environment"]["parameters"]["path"]["environment_id"],
  ): EnvironmentsEnvironmentIdResource {
    return new EnvironmentsEnvironmentIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class EnvironmentsEnvironmentIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/environments/{environment_id}. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation119Options,
  ): Promise<
    ResourceResult<
      Operation119["responses"][202]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** GET /api/v1/environments/{environment_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation120Options = {},
  ): Promise<
    ResourceResult<
      Operation120["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/environments/{environment_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation121["requestBody"]
    >["content"]["application/json"],
    options: Operation121Options,
  ): Promise<
    ResourceResult<
      Operation121["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get computer(): EnvironmentsEnvironmentIdComputerResource {
    return new EnvironmentsEnvironmentIdComputerResource(
      this.transport,
      this.path + "/computer",
    );
  }
  get creation(): EnvironmentsEnvironmentIdCreationResource {
    return new EnvironmentsEnvironmentIdCreationResource(
      this.transport,
      this.path + "/creation",
    );
  }
  get credentialSessions(): EnvironmentsEnvironmentIdCredentialSessionsResource {
    return new EnvironmentsEnvironmentIdCredentialSessionsResource(
      this.transport,
      this.path + "/credential-sessions",
    );
  }
  get debugHold(): EnvironmentsEnvironmentIdDebugHoldResource {
    return new EnvironmentsEnvironmentIdDebugHoldResource(
      this.transport,
      this.path + "/debug-hold",
    );
  }
  get desktopControl(): EnvironmentsEnvironmentIdDesktopControlResource {
    return new EnvironmentsEnvironmentIdDesktopControlResource(
      this.transport,
      this.path + "/desktop-control",
    );
  }
  get desktopPreview(): EnvironmentsEnvironmentIdDesktopPreviewResource {
    return new EnvironmentsEnvironmentIdDesktopPreviewResource(
      this.transport,
      this.path + "/desktop-preview",
    );
  }
  /** POST /api/v1/environments/{environment_id}/desktop-viewer. Preserves response metadata; mutations are not replayed. */
  desktopViewer(
    body: NonNullable<
      Operation131["requestBody"]
    >["content"]["application/json"],
    options: Operation131Options = {},
  ): Promise<
    ResourceResult<
      Operation131["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/desktop-viewer",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get kubernetes(): EnvironmentsEnvironmentIdKubernetesResource {
    return new EnvironmentsEnvironmentIdKubernetesResource(
      this.transport,
      this.path + "/kubernetes",
    );
  }
  get metricsBinding(): EnvironmentsEnvironmentIdMetricsBindingResource {
    return new EnvironmentsEnvironmentIdMetricsBindingResource(
      this.transport,
      this.path + "/metrics-binding",
    );
  }
  get metrics(): EnvironmentsEnvironmentIdMetricsResource {
    return new EnvironmentsEnvironmentIdMetricsResource(
      this.transport,
      this.path + "/metrics",
    );
  }
  /** POST /api/v1/environments/{environment_id}/retry-creation. Preserves response metadata; mutations are not replayed. */
  retryCreation(
    options: Operation137Options,
  ): Promise<
    ResourceResult<
      Operation137["responses"][202]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/retry-creation",
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/environments/{environment_id}/stop. Preserves response metadata; mutations are not replayed. */
  stop(
    options: Operation138Options,
  ): Promise<
    ResourceResult<
      Operation138["responses"][202]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/stop",
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class EnvironmentsEnvironmentIdComputerResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** POST /api/v1/environments/{environment_id}/computer/check. Preserves response metadata; mutations are not replayed. */
  check(
    options: Operation122Options = {},
  ): Promise<
    ResourceResult<
      Operation122["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/check",
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class EnvironmentsEnvironmentIdCreationResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/environments/{environment_id}/creation. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation123Options = {},
  ): Promise<
    ResourceResult<
      Operation123["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class EnvironmentsEnvironmentIdCredentialSessionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/environments/{environment_id}/credential-sessions. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation124Options = {},
  ): Promise<
    ResourceResult<
      Operation124["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation124Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation124["responses"][200]["content"]["application/json"],
      Operation124["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation124Options = {}) {
    return flattenPages<
      Operation124["responses"][200]["content"]["application/json"],
      Operation124["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class EnvironmentsEnvironmentIdDebugHoldResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** PUT /api/v1/environments/{environment_id}/debug-hold. Preserves response metadata; mutations are not replayed. */
  replace(
    body: NonNullable<
      Operation125["requestBody"]
    >["content"]["application/json"],
    options: Operation125Options,
  ): Promise<
    ResourceResult<
      Operation125["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PUT",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class EnvironmentsEnvironmentIdDesktopControlResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/environments/{environment_id}/desktop-control. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation126Options = {},
  ): Promise<
    ResourceResult<
      Operation126["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/environments/{environment_id}/desktop-control/handback. Preserves response metadata; mutations are not replayed. */
  handback(
    options: Operation127Options,
  ): Promise<
    ResourceResult<
      Operation127["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/handback",
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/environments/{environment_id}/desktop-control/renew. Preserves response metadata; mutations are not replayed. */
  renew(
    body: NonNullable<
      Operation128["requestBody"]
    >["content"]["application/json"],
    options: Operation128Options = {},
  ): Promise<
    ResourceResult<
      Operation128["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/renew",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/environments/{environment_id}/desktop-control/takeover. Preserves response metadata; mutations are not replayed. */
  takeover(
    body: NonNullable<
      Operation129["requestBody"]
    >["content"]["application/json"],
    options: Operation129Options,
  ): Promise<
    ResourceResult<
      Operation129["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/takeover",
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class EnvironmentsEnvironmentIdDesktopPreviewResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/environments/{environment_id}/desktop-preview. Caller owns and closes the unbuffered body. */
  get(options: Operation130Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal },
      headers: Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      accept: "image/jpeg, image/png",
    });
  }
}

export class EnvironmentsEnvironmentIdKubernetesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  get diagnostics(): EnvironmentsEnvironmentIdKubernetesDiagnosticsResource {
    return new EnvironmentsEnvironmentIdKubernetesDiagnosticsResource(
      this.transport,
      this.path + "/diagnostics",
    );
  }
  get logs(): EnvironmentsEnvironmentIdKubernetesLogsResource {
    return new EnvironmentsEnvironmentIdKubernetesLogsResource(
      this.transport,
      this.path + "/logs",
    );
  }
}

export class EnvironmentsEnvironmentIdKubernetesDiagnosticsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/environments/{environment_id}/kubernetes/diagnostics. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation132Options = {},
  ): Promise<
    ResourceResult<
      Operation132["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class EnvironmentsEnvironmentIdKubernetesLogsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/environments/{environment_id}/kubernetes/logs. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation133Options = {},
  ): Promise<
    ResourceResult<
      Operation133["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
}

export class EnvironmentsEnvironmentIdMetricsBindingResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** PUT /api/v1/environments/{environment_id}/metrics-binding. Preserves response metadata; mutations are not replayed. */
  replace(
    body: NonNullable<
      Operation134["requestBody"]
    >["content"]["application/json"],
    options: Operation134Options,
  ): Promise<
    ResourceResult<
      Operation134["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PUT",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class EnvironmentsEnvironmentIdMetricsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  get collector(): EnvironmentsEnvironmentIdMetricsCollectorResource {
    return new EnvironmentsEnvironmentIdMetricsCollectorResource(
      this.transport,
      this.path + "/collector",
    );
  }
  /** POST /api/v1/environments/{environment_id}/metrics/query. Preserves response metadata; mutations are not replayed. */
  query(
    body: NonNullable<
      Operation136["requestBody"]
    >["content"]["application/json"],
    options: Operation136Options = {},
  ): Promise<
    ResourceResult<
      Operation136["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/query",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class EnvironmentsEnvironmentIdMetricsCollectorResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/environments/{environment_id}/metrics/collector. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation135Options = {},
  ): Promise<
    ResourceResult<
      Operation135["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class FindingAnalysesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/finding-analyses. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation140Options = {},
  ): Promise<
    ResourceResult<
      Operation140["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation140Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation140["responses"][200]["content"]["application/json"],
      Operation140["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation140Options = {}) {
    return flattenPages<
      Operation140["responses"][200]["content"]["application/json"],
      Operation140["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/finding-analyses. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation141["requestBody"]
    >["content"]["application/json"],
    options: Operation141Options,
  ): Promise<
    ResourceResult<
      Operation141["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "Idempotency-Key": options.idempotencyKey,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class FindingsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/findings. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation142Options = {},
  ): Promise<
    ResourceResult<
      Operation142["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation142Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation142["responses"][200]["content"]["application/json"],
      Operation142["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation142Options = {}) {
    return flattenPages<
      Operation142["responses"][200]["content"]["application/json"],
      Operation142["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/findings. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation143["requestBody"]
    >["content"]["application/json"],
    options: Operation143Options = {},
  ): Promise<
    ResourceResult<
      Operation143["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["get_finding"]["parameters"]["path"]["finding_id"],
  ): FindingsFindingIdResource {
    return new FindingsFindingIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class FindingsFindingIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/findings/{finding_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation144Options = {},
  ): Promise<
    ResourceResult<
      Operation144["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/findings/{finding_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation145["requestBody"]
    >["content"]["application/json"],
    options: Operation145Options,
  ): Promise<
    ResourceResult<
      Operation145["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class InvitationsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  ref(
    value: operations["accept"]["parameters"]["path"]["invitation_id"],
  ): InvitationsInvitationIdResource {
    return new InvitationsInvitationIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class InvitationsInvitationIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** POST /api/v1/invitations/{invitation_id}/accept. Preserves response metadata; mutations are not replayed. */
  accept(
    body: NonNullable<
      Operation146["requestBody"]
    >["content"]["application/json"],
    options: Operation146Options = {},
  ): Promise<
    ResourceResult<
      Operation146["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/accept",
      body,
      undefined,
      { signal: options.signal },
    );
  }
}

export class McpServersResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/mcp-servers. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation147Options = {},
  ): Promise<
    ResourceResult<
      Operation147["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation147Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation147["responses"][200]["content"]["application/json"],
      Operation147["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation147Options = {}) {
    return flattenPages<
      Operation147["responses"][200]["content"]["application/json"],
      Operation147["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class MediaUnderstandingDefaultsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/media-understanding-defaults. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation148Options = {},
  ): Promise<
    ResourceResult<
      Operation148["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PUT /api/v1/media-understanding-defaults. Preserves response metadata; mutations are not replayed. */
  replace(
    body: NonNullable<
      Operation149["requestBody"]
    >["content"]["application/json"],
    options: Operation149Options,
  ): Promise<
    ResourceResult<
      Operation149["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PUT",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class MemoriesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/memories. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation150Options = {},
  ): Promise<
    ResourceResult<
      Operation150["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation150Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation150["responses"][200]["content"]["application/json"],
      Operation150["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation150Options = {}) {
    return flattenPages<
      Operation150["responses"][200]["content"]["application/json"],
      Operation150["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/memories. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation151["requestBody"]
    >["content"]["application/json"],
    options: Operation151Options = {},
  ): Promise<
    ResourceResult<
      Operation151["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get guidancePresets(): MemoriesGuidancePresetsResource {
    return new MemoriesGuidancePresetsResource(
      this.transport,
      this.path + "/guidance-presets",
    );
  }
  ref(
    value: operations["delete_memory"]["parameters"]["path"]["memory_id"],
  ): MemoriesMemoryIdResource {
    return new MemoriesMemoryIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class MemoriesGuidancePresetsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/memories/guidance-presets. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation152Options = {},
  ): Promise<
    ResourceResult<
      Operation152["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class MemoriesMemoryIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/memories/{memory_id}. Preserves response metadata; mutations are not replayed. */
  delete(options: Operation153Options): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** GET /api/v1/memories/{memory_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation154Options = {},
  ): Promise<
    ResourceResult<
      Operation154["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/memories/{memory_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation155["requestBody"]
    >["content"]["application/json"],
    options: Operation155Options,
  ): Promise<
    ResourceResult<
      Operation155["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get files(): MemoriesMemoryIdFilesResource {
    return new MemoriesMemoryIdFilesResource(
      this.transport,
      this.path + "/files",
    );
  }
  get organization(): MemoriesMemoryIdOrganizationResource {
    return new MemoriesMemoryIdOrganizationResource(
      this.transport,
      this.path + "/organization",
    );
  }
  get records(): MemoriesMemoryIdRecordsResource {
    return new MemoriesMemoryIdRecordsResource(
      this.transport,
      this.path + "/records",
    );
  }
  get revisions(): MemoriesMemoryIdRevisionsResource {
    return new MemoriesMemoryIdRevisionsResource(
      this.transport,
      this.path + "/revisions",
    );
  }
}

export class MemoriesMemoryIdFilesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/memories/{memory_id}/files. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation156Options = {},
  ): Promise<
    ResourceResult<
      Operation156["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation156Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation156["responses"][200]["content"]["application/json"],
      Operation156["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation156Options = {}) {
    return flattenPages<
      Operation156["responses"][200]["content"]["application/json"],
      Operation156["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/memories/{memory_id}/files. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation157["requestBody"]
    >["content"]["application/json"],
    options: Operation157Options = {},
  ): Promise<
    ResourceResult<
      Operation157["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/memories/{memory_id}/files/move. Preserves response metadata; mutations are not replayed. */
  move(
    body: NonNullable<
      Operation158["requestBody"]
    >["content"]["application/json"],
    options: Operation158Options,
  ): Promise<
    ResourceResult<
      Operation158["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/move",
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["delete_file"]["parameters"]["path"]["path"],
  ): MemoriesMemoryIdFilesPathResource {
    return new MemoriesMemoryIdFilesPathResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class MemoriesMemoryIdFilesPathResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/memories/{memory_id}/files/{path}. Preserves response metadata; mutations are not replayed. */
  delete(options: Operation159Options): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** GET /api/v1/memories/{memory_id}/files/{path}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation160Options = {},
  ): Promise<
    ResourceResult<
      Operation160["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PUT /api/v1/memories/{memory_id}/files/{path}. Preserves response metadata; mutations are not replayed. */
  replace(
    body: NonNullable<
      Operation161["requestBody"]
    >["content"]["application/json"],
    options: Operation161Options,
  ): Promise<
    ResourceResult<
      Operation161["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PUT",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class MemoriesMemoryIdOrganizationResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/memories/{memory_id}/organization. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation162Options = {},
  ): Promise<
    ResourceResult<
      Operation162["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PUT /api/v1/memories/{memory_id}/organization. Preserves response metadata; mutations are not replayed. */
  replace(
    body: NonNullable<
      Operation163["requestBody"]
    >["content"]["application/json"],
    options: Operation163Options,
  ): Promise<
    ResourceResult<
      Operation163["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PUT",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class MemoriesMemoryIdRecordsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/memories/{memory_id}/records. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation164Options = {},
  ): Promise<
    ResourceResult<
      Operation164["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation164Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation164["responses"][200]["content"]["application/json"],
      Operation164["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation164Options = {}) {
    return flattenPages<
      Operation164["responses"][200]["content"]["application/json"],
      Operation164["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/memories/{memory_id}/records. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation165["requestBody"]
    >["content"]["application/json"],
    options: Operation165Options = {},
  ): Promise<
    ResourceResult<
      Operation165["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/memories/{memory_id}/records/search. Preserves response metadata; mutations are not replayed. */
  search(
    body: NonNullable<
      Operation166["requestBody"]
    >["content"]["application/json"],
    options: Operation166Options = {},
  ): Promise<
    ResourceResult<
      Operation166["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/search",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["delete_record"]["parameters"]["path"]["record_id"],
  ): MemoriesMemoryIdRecordsRecordIdResource {
    return new MemoriesMemoryIdRecordsRecordIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class MemoriesMemoryIdRecordsRecordIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/memories/{memory_id}/records/{record_id}. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation167Options = {},
  ): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PUT /api/v1/memories/{memory_id}/records/{record_id}. Preserves response metadata; mutations are not replayed. */
  replace(
    body: NonNullable<
      Operation168["requestBody"]
    >["content"]["application/json"],
    options: Operation168Options = {},
  ): Promise<
    ResourceResult<
      Operation168["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PUT",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class MemoriesMemoryIdRevisionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/memories/{memory_id}/revisions. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation169Options,
  ): Promise<
    ResourceResult<
      Operation169["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  /** GET /api/v1/memories/{memory_id}/revisions. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation170Options = {},
  ): Promise<
    ResourceResult<
      Operation170["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation170Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation170["responses"][200]["content"]["application/json"],
      Operation170["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation170Options = {}) {
    return flattenPages<
      Operation170["responses"][200]["content"]["application/json"],
      Operation170["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  ref(
    value: operations["get_memory_revision"]["parameters"]["path"]["seq"],
  ): MemoriesMemoryIdRevisionsSeqResource {
    return new MemoriesMemoryIdRevisionsSeqResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class MemoriesMemoryIdRevisionsSeqResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/memories/{memory_id}/revisions/{seq}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation171Options = {},
  ): Promise<
    ResourceResult<
      Operation171["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/memories/{memory_id}/revisions/{seq}/restore. Preserves response metadata; mutations are not replayed. */
  restore(
    options: Operation172Options = {},
  ): Promise<
    ResourceResult<
      Operation172["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/restore",
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class MemoryOrganizationsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/memory-organizations. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation173Options = {},
  ): Promise<
    ResourceResult<
      Operation173["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation173Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation173["responses"][200]["content"]["application/json"],
      Operation173["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation173Options = {}) {
    return flattenPages<
      Operation173["responses"][200]["content"]["application/json"],
      Operation173["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/memory-organizations. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation174["requestBody"]
    >["content"]["application/json"],
    options: Operation174Options = {},
  ): Promise<
    ResourceResult<
      Operation174["responses"][202]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["get_memory_organization"]["parameters"]["path"]["organization_id"],
  ): MemoryOrganizationsOrganizationIdResource {
    return new MemoryOrganizationsOrganizationIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class MemoryOrganizationsOrganizationIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/memory-organizations/{organization_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation175Options = {},
  ): Promise<
    ResourceResult<
      Operation175["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get candidate(): MemoryOrganizationsOrganizationIdCandidateResource {
    return new MemoryOrganizationsOrganizationIdCandidateResource(
      this.transport,
      this.path + "/candidate",
    );
  }
}

export class MemoryOrganizationsOrganizationIdCandidateResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/memory-organizations/{organization_id}/candidate. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation176Options = {},
  ): Promise<
    ResourceResult<
      Operation176["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/memory-organizations/{organization_id}/candidate/apply. Preserves response metadata; mutations are not replayed. */
  apply(
    body: NonNullable<
      Operation177["requestBody"]
    >["content"]["application/json"],
    options: Operation177Options = {},
  ): Promise<
    ResourceResult<
      Operation177["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/apply",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get diff(): MemoryOrganizationsOrganizationIdCandidateDiffResource {
    return new MemoryOrganizationsOrganizationIdCandidateDiffResource(
      this.transport,
      this.path + "/diff",
    );
  }
  /** POST /api/v1/memory-organizations/{organization_id}/candidate/discard. Preserves response metadata; mutations are not replayed. */
  discard(
    options: Operation179Options = {},
  ): Promise<
    ResourceResult<
      Operation179["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/discard",
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get file(): MemoryOrganizationsOrganizationIdCandidateFileResource {
    return new MemoryOrganizationsOrganizationIdCandidateFileResource(
      this.transport,
      this.path + "/file",
    );
  }
  get replacement(): MemoryOrganizationsOrganizationIdCandidateReplacementResource {
    return new MemoryOrganizationsOrganizationIdCandidateReplacementResource(
      this.transport,
      this.path + "/replacement",
    );
  }
}

export class MemoryOrganizationsOrganizationIdCandidateDiffResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/memory-organizations/{organization_id}/candidate/diff. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation178Options,
  ): Promise<
    ResourceResult<
      Operation178["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
}

export class MemoryOrganizationsOrganizationIdCandidateFileResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/memory-organizations/{organization_id}/candidate/file. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation180Options,
  ): Promise<
    ResourceResult<
      Operation180["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
}

export class MemoryOrganizationsOrganizationIdCandidateReplacementResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/memory-organizations/{organization_id}/candidate/replacement. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation181Options,
  ): Promise<
    ResourceResult<
      Operation181["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
}

export class MemoryProvidersResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/memory-providers. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation182Options = {},
  ): Promise<
    ResourceResult<
      Operation182["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation182Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation182["responses"][200]["content"]["application/json"],
      Operation182["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation182Options = {}) {
    return flattenPages<
      Operation182["responses"][200]["content"]["application/json"],
      Operation182["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/memory-providers. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation183["requestBody"]
    >["content"]["application/json"],
    options: Operation183Options = {},
  ): Promise<
    ResourceResult<
      Operation183["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["delete_memory_provider"]["parameters"]["path"]["provider_id"],
  ): MemoryProvidersProviderIdResource {
    return new MemoryProvidersProviderIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class MemoryProvidersProviderIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/memory-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  delete(options: Operation184Options): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** GET /api/v1/memory-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation185Options = {},
  ): Promise<
    ResourceResult<
      Operation185["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/memory-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation186["requestBody"]
    >["content"]["application/json"],
    options: Operation186Options,
  ): Promise<
    ResourceResult<
      Operation186["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/memory-providers/{provider_id}/test. Preserves response metadata; mutations are not replayed. */
  test(
    options: Operation187Options = {},
  ): Promise<
    ResourceResult<
      Operation187["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/test",
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class MemorySpacesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/memory-spaces. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation188Options = {},
  ): Promise<
    ResourceResult<
      Operation188["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation188Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation188["responses"][200]["content"]["application/json"],
      Operation188["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation188Options = {}) {
    return flattenPages<
      Operation188["responses"][200]["content"]["application/json"],
      Operation188["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/memory-spaces. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation189["requestBody"]
    >["content"]["application/json"],
    options: Operation189Options = {},
  ): Promise<
    ResourceResult<
      Operation189["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["delete_space"]["parameters"]["path"]["space_id"],
  ): MemorySpacesSpaceIdResource {
    return new MemorySpacesSpaceIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class MemorySpacesSpaceIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/memory-spaces/{space_id}. Preserves response metadata; mutations are not replayed. */
  delete(options: Operation190Options): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** GET /api/v1/memory-spaces/{space_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation191Options = {},
  ): Promise<
    ResourceResult<
      Operation191["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/memory-spaces/{space_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation192["requestBody"]
    >["content"]["application/json"],
    options: Operation192Options,
  ): Promise<
    ResourceResult<
      Operation192["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get organization(): MemorySpacesSpaceIdOrganizationResource {
    return new MemorySpacesSpaceIdOrganizationResource(
      this.transport,
      this.path + "/organization",
    );
  }
  get organizations(): MemorySpacesSpaceIdOrganizationsResource {
    return new MemorySpacesSpaceIdOrganizationsResource(
      this.transport,
      this.path + "/organizations",
    );
  }
  get sessions(): MemorySpacesSpaceIdSessionsResource {
    return new MemorySpacesSpaceIdSessionsResource(
      this.transport,
      this.path + "/sessions",
    );
  }
}

export class MemorySpacesSpaceIdOrganizationResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/memory-spaces/{space_id}/organization. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation193Options = {},
  ): Promise<
    ResourceResult<
      Operation193["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class MemorySpacesSpaceIdOrganizationsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/memory-spaces/{space_id}/organizations. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation194Options = {},
  ): Promise<
    ResourceResult<
      Operation194["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation194Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation194["responses"][200]["content"]["application/json"],
      Operation194["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation194Options = {}) {
    return flattenPages<
      Operation194["responses"][200]["content"]["application/json"],
      Operation194["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/memory-spaces/{space_id}/organizations. Preserves response metadata; mutations are not replayed. */
  create(
    options: Operation195Options = {},
  ): Promise<
    ResourceResult<
      Operation195["responses"][202]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class MemorySpacesSpaceIdSessionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/memory-spaces/{space_id}/sessions. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation196Options = {},
  ): Promise<
    ResourceResult<
      Operation196["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation196Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation196["responses"][200]["content"]["application/json"],
      Operation196["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation196Options = {}) {
    return flattenPages<
      Operation196["responses"][200]["content"]["application/json"],
      Operation196["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class MetricsDashboardsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/metrics-dashboards. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation197Options = {},
  ): Promise<
    ResourceResult<
      Operation197["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation197Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation197["responses"][200]["content"]["application/json"],
      Operation197["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation197Options = {}) {
    return flattenPages<
      Operation197["responses"][200]["content"]["application/json"],
      Operation197["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/metrics-dashboards. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation198["requestBody"]
    >["content"]["application/json"],
    options: Operation198Options = {},
  ): Promise<
    ResourceResult<
      Operation198["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get preset(): MetricsDashboardsPresetResource {
    return new MetricsDashboardsPresetResource(
      this.transport,
      this.path + "/preset",
    );
  }
  ref(
    value: operations["delete_dashboard"]["parameters"]["path"]["dashboard_id"],
  ): MetricsDashboardsDashboardIdResource {
    return new MetricsDashboardsDashboardIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class MetricsDashboardsPresetResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/metrics-dashboards/preset. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation199Options = {},
  ): Promise<
    ResourceResult<
      Operation199["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class MetricsDashboardsDashboardIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/metrics-dashboards/{dashboard_id}. Preserves response metadata; mutations are not replayed. */
  delete(options: Operation200Options): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** GET /api/v1/metrics-dashboards/{dashboard_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation201Options = {},
  ): Promise<
    ResourceResult<
      Operation201["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/metrics-dashboards/{dashboard_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation202["requestBody"]
    >["content"]["application/json"],
    options: Operation202Options,
  ): Promise<
    ResourceResult<
      Operation202["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class MetricsDataSourcesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/metrics-data-sources. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation203Options = {},
  ): Promise<
    ResourceResult<
      Operation203["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation203Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation203["responses"][200]["content"]["application/json"],
      Operation203["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation203Options = {}) {
    return flattenPages<
      Operation203["responses"][200]["content"]["application/json"],
      Operation203["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/metrics-data-sources. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation204["requestBody"]
    >["content"]["application/json"],
    options: Operation204Options = {},
  ): Promise<
    ResourceResult<
      Operation204["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get capabilities(): MetricsDataSourcesCapabilitiesResource {
    return new MetricsDataSourcesCapabilitiesResource(
      this.transport,
      this.path + "/capabilities",
    );
  }
  get deploymentPreset(): MetricsDataSourcesDeploymentPresetResource {
    return new MetricsDataSourcesDeploymentPresetResource(
      this.transport,
      this.path + "/deployment-preset",
    );
  }
  ref(
    value: operations["delete_metrics_data_source"]["parameters"]["path"]["source_id"],
  ): MetricsDataSourcesSourceIdResource {
    return new MetricsDataSourcesSourceIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class MetricsDataSourcesCapabilitiesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/metrics-data-sources/capabilities. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation205Options = {},
  ): Promise<
    ResourceResult<
      Operation205["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class MetricsDataSourcesDeploymentPresetResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/metrics-data-sources/deployment-preset. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation206Options = {},
  ): Promise<
    ResourceResult<
      Operation206["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class MetricsDataSourcesSourceIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/metrics-data-sources/{source_id}. Preserves response metadata; mutations are not replayed. */
  delete(options: Operation207Options): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** GET /api/v1/metrics-data-sources/{source_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation208Options = {},
  ): Promise<
    ResourceResult<
      Operation208["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/metrics-data-sources/{source_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation209["requestBody"]
    >["content"]["application/json"],
    options: Operation209Options,
  ): Promise<
    ResourceResult<
      Operation209["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/metrics-data-sources/{source_id}/query. Preserves response metadata; mutations are not replayed. */
  query(
    body: NonNullable<
      Operation210["requestBody"]
    >["content"]["application/json"],
    options: Operation210Options = {},
  ): Promise<
    ResourceResult<
      Operation210["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/query",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class ModelCatalogResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/model-catalog. Preserves response metadata; mutations are not replayed. */
  list(
    options?: Operation211DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["ModelCatalog"]>>;
  list(
    options: Operation211Options,
  ): Promise<
    ResourceResult<
      Operation211["responses"][200]["content"]["application/json"]
    >
  >;
  list(
    options: Operation211Options = {},
  ): Promise<
    ResourceResult<
      Operation211["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
}

export class ModelProvidersResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/model-providers. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation212Options = {},
  ): Promise<
    ResourceResult<
      Operation212["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation212Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation212["responses"][200]["content"]["application/json"],
      Operation212["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation212Options = {}) {
    return flattenPages<
      Operation212["responses"][200]["content"]["application/json"],
      Operation212["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/model-providers. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation213["requestBody"]
    >["content"]["application/json"],
    options: Operation213Options = {},
  ): Promise<
    ResourceResult<
      Operation213["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["delete_model_provider"]["parameters"]["path"]["provider_id"],
  ): ModelProvidersProviderIdResource {
    return new ModelProvidersProviderIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class ModelProvidersProviderIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/model-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  delete(options: Operation214Options): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** GET /api/v1/model-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation215Options = {},
  ): Promise<
    ResourceResult<
      Operation215["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/model-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation216["requestBody"]
    >["content"]["application/json"],
    options: Operation216Options,
  ): Promise<
    ResourceResult<
      Operation216["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get authorization(): ModelProvidersProviderIdAuthorizationResource {
    return new ModelProvidersProviderIdAuthorizationResource(
      this.transport,
      this.path + "/authorization",
    );
  }
  /** POST /api/v1/model-providers/{provider_id}/authorize. Preserves response metadata; mutations are not replayed. */
  authorize(
    body: NonNullable<
      Operation220["requestBody"]
    >["content"]["application/json"],
    options: Operation220Options = {},
  ): Promise<
    ResourceResult<
      Operation220["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/authorize",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get models(): ModelProvidersProviderIdModelsResource {
    return new ModelProvidersProviderIdModelsResource(
      this.transport,
      this.path + "/models",
    );
  }
  /** POST /api/v1/model-providers/{provider_id}/test. Preserves response metadata; mutations are not replayed. */
  test(
    options: Operation222Options = {},
  ): Promise<
    ResourceResult<
      Operation222["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/test",
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class ModelProvidersProviderIdAuthorizationResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/model-providers/{provider_id}/authorization. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation217Options = {},
  ): Promise<
    ResourceResult<
      Operation217["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** GET /api/v1/model-providers/{provider_id}/authorization. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation218Options = {},
  ): Promise<
    ResourceResult<
      Operation218["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/model-providers/{provider_id}/authorization/callback. Preserves response metadata; mutations are not replayed. */
  callback(
    body: NonNullable<
      Operation219["requestBody"]
    >["content"]["application/json"],
    options: Operation219Options = {},
  ): Promise<
    ResourceResult<
      Operation219["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/callback",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class ModelProvidersProviderIdModelsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/model-providers/{provider_id}/models. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation221Options = {},
  ): Promise<
    ResourceResult<
      Operation221["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class ModelsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/models. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation223Options = {},
  ): Promise<
    ResourceResult<
      Operation223["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation223Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation223["responses"][200]["content"]["application/json"],
      Operation223["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation223Options = {}) {
    return flattenPages<
      Operation223["responses"][200]["content"]["application/json"],
      Operation223["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/models. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation224["requestBody"]
    >["content"]["application/json"],
    options: Operation224Options = {},
  ): Promise<
    ResourceResult<
      Operation224["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["get_model"]["parameters"]["path"]["key"],
  ): ModelsKeyResource {
    return new ModelsKeyResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class ModelsKeyResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/models/{key}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation225Options = {},
  ): Promise<
    ResourceResult<
      Operation225["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/models/{key}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation226["requestBody"]
    >["content"]["application/json"],
    options: Operation226Options,
  ): Promise<
    ResourceResult<
      Operation226["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class OrganizationsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation227Options = {},
  ): Promise<
    ResourceResult<
      Operation227["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation227Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation227["responses"][200]["content"]["application/json"],
      Operation227["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation227Options = {}) {
    return flattenPages<
      Operation227["responses"][200]["content"]["application/json"],
      Operation227["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  ref(
    value: operations["get_organization"]["parameters"]["path"]["organization_id"],
  ): OrganizationsOrganizationIdResource {
    return new OrganizationsOrganizationIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class OrganizationsOrganizationIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation228Options = {},
  ): Promise<
    ResourceResult<
      Operation228["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/organizations/{organization_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation229["requestBody"]
    >["content"]["application/json"],
    options: Operation229Options,
  ): Promise<
    ResourceResult<
      Operation229["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "If-Match": options.ifMatch })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get appPlugins(): OrganizationsOrganizationIdAppPluginsResource {
    return new OrganizationsOrganizationIdAppPluginsResource(
      this.transport,
      this.path + "/app-plugins",
    );
  }
  get auditEvents(): OrganizationsOrganizationIdAuditEventsResource {
    return new OrganizationsOrganizationIdAuditEventsResource(
      this.transport,
      this.path + "/audit-events",
    );
  }
  get grants(): OrganizationsOrganizationIdGrantsResource {
    return new OrganizationsOrganizationIdGrantsResource(
      this.transport,
      this.path + "/grants",
    );
  }
  get icon(): OrganizationsOrganizationIdIconResource {
    return new OrganizationsOrganizationIdIconResource(
      this.transport,
      this.path + "/icon",
    );
  }
  get invitations(): OrganizationsOrganizationIdInvitationsResource {
    return new OrganizationsOrganizationIdInvitationsResource(
      this.transport,
      this.path + "/invitations",
    );
  }
  get members(): OrganizationsOrganizationIdMembersResource {
    return new OrganizationsOrganizationIdMembersResource(
      this.transport,
      this.path + "/members",
    );
  }
  get workspaces(): OrganizationsOrganizationIdWorkspacesResource {
    return new OrganizationsOrganizationIdWorkspacesResource(
      this.transport,
      this.path + "/workspaces",
    );
  }
}

export class OrganizationsOrganizationIdAppPluginsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/app-plugins. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation230Options = {},
  ): Promise<
    ResourceResult<
      Operation230["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["update_app_plugin"]["parameters"]["path"]["app_id"],
  ): OrganizationsOrganizationIdAppPluginsAppIdResource {
    return new OrganizationsOrganizationIdAppPluginsAppIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class OrganizationsOrganizationIdAppPluginsAppIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** PUT /api/v1/organizations/{organization_id}/app-plugins/{app_id}. Preserves response metadata; mutations are not replayed. */
  replace(
    body: NonNullable<
      Operation231["requestBody"]
    >["content"]["application/json"],
    options: Operation231Options,
  ): Promise<
    ResourceResult<
      Operation231["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PUT",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "If-Match": options.ifMatch })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class OrganizationsOrganizationIdAuditEventsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/audit-events. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation232Options = {},
  ): Promise<
    ResourceResult<
      Operation232["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation232Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation232["responses"][200]["content"]["application/json"],
      Operation232["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation232Options = {}) {
    return flattenPages<
      Operation232["responses"][200]["content"]["application/json"],
      Operation232["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class OrganizationsOrganizationIdGrantsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/grants. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation233Options = {},
  ): Promise<
    ResourceResult<
      Operation233["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation233Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation233["responses"][200]["content"]["application/json"],
      Operation233["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation233Options = {}) {
    return flattenPages<
      Operation233["responses"][200]["content"]["application/json"],
      Operation233["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/organizations/{organization_id}/grants. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation234["requestBody"]
    >["content"]["application/json"],
    options: Operation234Options = {},
  ): Promise<
    ResourceResult<
      Operation234["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["delete_organization_grant"]["parameters"]["path"]["grant_id"],
  ): OrganizationsOrganizationIdGrantsGrantIdResource {
    return new OrganizationsOrganizationIdGrantsGrantIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class OrganizationsOrganizationIdGrantsGrantIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/organizations/{organization_id}/grants/{grant_id}. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation235Options = {},
  ): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      undefined,
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/organizations/{organization_id}/grants/{grant_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation236["requestBody"]
    >["content"]["application/json"],
    options: Operation236Options = {},
  ): Promise<
    ResourceResult<
      Operation236["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "PATCH", this.path, body, undefined, {
      signal: options.signal,
    });
  }
}

export class OrganizationsOrganizationIdIconResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/organizations/{organization_id}/icon. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation237Options,
  ): Promise<
    ResourceResult<
      Operation237["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "If-Match": options.ifMatch })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** GET /api/v1/organizations/{organization_id}/icon. Caller owns and closes the unbuffered body. */
  get(options: Operation238Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal },
      headers: undefined,
      accept: "image/jpeg, image/png, image/webp",
    });
  }
  /** PUT /api/v1/organizations/{organization_id}/icon. Preserves response metadata; mutations are not replayed. */
  replace(
    body: Binary,
    options: Operation239Options,
  ): Promise<
    ResourceResult<
      Operation239["responses"][200]["content"]["application/json"]
    >
  > {
    return uploadRequest(
      this.transport,
      "PUT",
      this.path,
      body,
      options.contentType,
      Object.fromEntries(
        Object.entries({ "If-Match": options.ifMatch })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class OrganizationsOrganizationIdInvitationsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/invitations. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation240Options = {},
  ): Promise<
    ResourceResult<
      Operation240["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation240Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation240["responses"][200]["content"]["application/json"],
      Operation240["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation240Options = {}) {
    return flattenPages<
      Operation240["responses"][200]["content"]["application/json"],
      Operation240["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/organizations/{organization_id}/invitations. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation241["requestBody"]
    >["content"]["application/json"],
    options: Operation241Options = {},
  ): Promise<
    ResourceResult<
      Operation241["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["resend_organization_invitation"]["parameters"]["path"]["invitation_id"],
  ): OrganizationsOrganizationIdInvitationsInvitationIdResource {
    return new OrganizationsOrganizationIdInvitationsInvitationIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class OrganizationsOrganizationIdInvitationsInvitationIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** POST /api/v1/organizations/{organization_id}/invitations/{invitation_id}/resend. Preserves response metadata; mutations are not replayed. */
  resend(
    options: Operation242Options,
  ): Promise<
    ResourceResult<
      Operation242["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/resend",
      undefined,
      Object.fromEntries(
        Object.entries({ "If-Match": options.ifMatch })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/organizations/{organization_id}/invitations/{invitation_id}/revoke. Preserves response metadata; mutations are not replayed. */
  revoke(
    options: Operation243Options,
  ): Promise<
    ResourceResult<
      Operation243["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/revoke",
      undefined,
      Object.fromEntries(
        Object.entries({ "If-Match": options.ifMatch })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class OrganizationsOrganizationIdMembersResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/members. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation244Options = {},
  ): Promise<
    ResourceResult<
      Operation244["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation244Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation244["responses"][200]["content"]["application/json"],
      Operation244["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation244Options = {}) {
    return flattenPages<
      Operation244["responses"][200]["content"]["application/json"],
      Operation244["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class OrganizationsOrganizationIdWorkspacesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/workspaces. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation245Options = {},
  ): Promise<
    ResourceResult<
      Operation245["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation245Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation245["responses"][200]["content"]["application/json"],
      Operation245["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation245Options = {}) {
    return flattenPages<
      Operation245["responses"][200]["content"]["application/json"],
      Operation245["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/organizations/{organization_id}/workspaces. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation246["requestBody"]
    >["content"]["application/json"],
    options: Operation246Options = {},
  ): Promise<
    ResourceResult<
      Operation246["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
}

export class PluginsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/plugins. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation247Options = {},
  ): Promise<
    ResourceResult<
      Operation247["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class ProviderTypesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  ref(
    value: operations["list_provider_types"]["parameters"]["path"]["kind"],
  ): ProviderTypesKindResource {
    return new ProviderTypesKindResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class ProviderTypesKindResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/provider-types/{kind}. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation248Options = {},
  ): Promise<
    ResourceResult<
      Operation248["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
}

export class RunsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/runs. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation249Options = {},
  ): Promise<
    ResourceResult<
      Operation249["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation249Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation249["responses"][200]["content"]["application/json"],
      Operation249["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation249Options = {}) {
    return flattenPages<
      Operation249["responses"][200]["content"]["application/json"],
      Operation249["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  ref(
    value: operations["get_run"]["parameters"]["path"]["run_id"],
  ): RunsRunIdResource {
    return new RunsRunIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class RunsRunIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/runs/{run_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options?: Operation250DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["RunView"]>>;
  get(
    options: Operation250Options,
  ): Promise<
    ResourceResult<
      Operation250["responses"][200]["content"]["application/json"]
    >
  >;
  get(
    options: Operation250Options = {},
  ): Promise<
    ResourceResult<
      Operation250["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  /** PATCH /api/v1/runs/{run_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation251["requestBody"]
    >["content"]["application/json"],
    options: Operation251Options,
  ): Promise<
    ResourceResult<
      Operation251["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get agent(): RunsRunIdAgentResource {
    return new RunsRunIdAgentResource(this.transport, this.path + "/agent");
  }
  get apps(): RunsRunIdAppsResource {
    return new RunsRunIdAppsResource(this.transport, this.path + "/apps");
  }
  get attempts(): RunsRunIdAttemptsResource {
    return new RunsRunIdAttemptsResource(
      this.transport,
      this.path + "/attempts",
    );
  }
  get contents(): RunsRunIdContentsResource {
    return new RunsRunIdContentsResource(
      this.transport,
      this.path + "/contents",
    );
  }
  /** POST /api/v1/runs/{run_id}/fork. Preserves response metadata; mutations are not replayed. */
  fork(
    body: NonNullable<
      Operation260["requestBody"]
    >["content"]["application/json"],
    options: Operation260Options,
  ): Promise<
    ResourceResult<
      | Operation260["responses"][200]["content"]["application/json"]
      | Operation260["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/fork",
      body,
      Object.fromEntries(
        Object.entries({
          "Idempotency-Key": options.idempotencyKey,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get images(): RunsRunIdImagesResource {
    return new RunsRunIdImagesResource(this.transport, this.path + "/images");
  }
  /** POST /api/v1/runs/{run_id}/interrupt. Preserves response metadata; mutations are not replayed. */
  interrupt(
    options: Operation262Options = {},
  ): Promise<
    ResourceResult<
      Operation262["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/interrupt",
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get items(): RunsRunIdItemsResource {
    return new RunsRunIdItemsResource(this.transport, this.path + "/items");
  }
  get lineage(): RunsRunIdLineageResource {
    return new RunsRunIdLineageResource(this.transport, this.path + "/lineage");
  }
  /** POST /api/v1/runs/{run_id}/resume. Preserves response metadata; mutations are not replayed. */
  resume(
    body: NonNullable<
      Operation266["requestBody"]
    >["content"]["application/json"],
    options: Operation266Options,
  ): Promise<
    ResourceResult<
      | Operation266["responses"][200]["content"]["application/json"]
      | Operation266["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/resume",
      body,
      Object.fromEntries(
        Object.entries({
          "Idempotency-Key": options.idempotencyKey,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class RunsRunIdAgentResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/runs/{run_id}/agent. Preserves response metadata; mutations are not replayed. */
  get(
    options?: Operation252DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["RunAgent"]>>;
  get(
    options: Operation252Options,
  ): Promise<
    ResourceResult<
      Operation252["responses"][200]["content"]["application/json"]
    >
  >;
  get(
    options: Operation252Options = {},
  ): Promise<
    ResourceResult<
      Operation252["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
}

export class RunsRunIdAppsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  ref(
    value: operations["open_run_app"]["parameters"]["path"]["app_id"],
  ): RunsRunIdAppsAppIdResource {
    return new RunsRunIdAppsAppIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class RunsRunIdAppsAppIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** POST /api/v1/runs/{run_id}/apps/{app_id}/open. Preserves response metadata; mutations are not replayed. */
  open(
    options: Operation253Options = {},
  ): Promise<
    ResourceResult<
      Operation253["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/open",
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get resources(): RunsRunIdAppsAppIdResourcesResource {
    return new RunsRunIdAppsAppIdResourcesResource(
      this.transport,
      this.path + "/resources",
    );
  }
  get tools(): RunsRunIdAppsAppIdToolsResource {
    return new RunsRunIdAppsAppIdToolsResource(
      this.transport,
      this.path + "/tools",
    );
  }
}

export class RunsRunIdAppsAppIdResourcesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** POST /api/v1/runs/{run_id}/apps/{app_id}/resources/read. Preserves response metadata; mutations are not replayed. */
  read(
    body: NonNullable<
      Operation254["requestBody"]
    >["content"]["application/json"],
    options: Operation254Options = {},
  ): Promise<
    ResourceResult<
      Operation254["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/read",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class RunsRunIdAppsAppIdToolsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** POST /api/v1/runs/{run_id}/apps/{app_id}/tools/call. Preserves response metadata; mutations are not replayed. */
  call(
    body: NonNullable<
      Operation255["requestBody"]
    >["content"]["application/json"],
    options: Operation255Options = {},
  ): Promise<
    ResourceResult<
      Operation255["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/call",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class RunsRunIdAttemptsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/runs/{run_id}/attempts. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation256Options = {},
  ): Promise<
    ResourceResult<
      Operation256["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["get_run_attempt"]["parameters"]["path"]["attempt_id"],
  ): RunsRunIdAttemptsAttemptIdResource {
    return new RunsRunIdAttemptsAttemptIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class RunsRunIdAttemptsAttemptIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/runs/{run_id}/attempts/{attempt_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation257Options = {},
  ): Promise<
    ResourceResult<
      Operation257["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get trace(): RunsRunIdAttemptsAttemptIdTraceResource {
    return new RunsRunIdAttemptsAttemptIdTraceResource(
      this.transport,
      this.path + "/trace",
    );
  }
}

export class RunsRunIdAttemptsAttemptIdTraceResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/runs/{run_id}/attempts/{attempt_id}/trace. Preserves response metadata; mutations are not replayed. */
  list(
    options?: Operation258DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["SpanPage"]>>;
  list(
    options: Operation258Options,
  ): Promise<
    ResourceResult<
      Operation258["responses"][200]["content"]["application/json"]
    >
  >;
  list(
    options: Operation258Options = {},
  ): Promise<
    ResourceResult<
      Operation258["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation258Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation258["responses"][200]["content"]["application/json"],
      Operation258["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation258Options = {}) {
    return flattenPages<
      Operation258["responses"][200]["content"]["application/json"],
      Operation258["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class RunsRunIdContentsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  ref(
    value: operations["get_run_content"]["parameters"]["path"]["content_id"],
  ): RunsRunIdContentsContentIdResource {
    return new RunsRunIdContentsContentIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class RunsRunIdContentsContentIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/runs/{run_id}/contents/{content_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options?: Operation259DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["RunContent"]>>;
  get(
    options: Operation259Options,
  ): Promise<
    ResourceResult<
      Operation259["responses"][200]["content"]["application/json"]
    >
  >;
  get(
    options: Operation259Options = {},
  ): Promise<
    ResourceResult<
      Operation259["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
}

export class RunsRunIdImagesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  ref(
    value: operations["run_image"]["parameters"]["path"]["image_id"],
  ): RunsRunIdImagesImageIdResource {
    return new RunsRunIdImagesImageIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class RunsRunIdImagesImageIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/runs/{run_id}/images/{image_id}. Caller owns and closes the unbuffered body. */
  get(options: Operation261Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal },
      headers: Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      accept: "image/jpeg, image/png",
    });
  }
}

export class RunsRunIdItemsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/runs/{run_id}/items. Preserves response metadata; mutations are not replayed. */
  get(
    options?: Operation263DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["RunItems"]>>;
  get(
    options: Operation263Options,
  ): Promise<
    ResourceResult<
      Operation263["responses"][200]["content"]["application/json"]
    >
  >;
  get(
    options: Operation263Options = {},
  ): Promise<
    ResourceResult<
      Operation263["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  ref(
    value: operations["read_run_item_content"]["parameters"]["path"]["item_id"],
  ): RunsRunIdItemsItemIdResource {
    return new RunsRunIdItemsItemIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class RunsRunIdItemsItemIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  get content(): RunsRunIdItemsItemIdContentResource {
    return new RunsRunIdItemsItemIdContentResource(
      this.transport,
      this.path + "/content",
    );
  }
}

export class RunsRunIdItemsItemIdContentResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/runs/{run_id}/items/{item_id}/content. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation264Options,
  ): Promise<
    ResourceResult<
      Operation264["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
}

export class RunsRunIdLineageResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/runs/{run_id}/lineage. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation265Options = {},
  ): Promise<
    ResourceResult<
      Operation265["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation265Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation265["responses"][200]["content"]["application/json"],
      Operation265["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation265Options = {}) {
    return flattenPages<
      Operation265["responses"][200]["content"]["application/json"],
      Operation265["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class SchedulesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/schedules. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation267Options = {},
  ): Promise<
    ResourceResult<
      Operation267["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation267Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation267["responses"][200]["content"]["application/json"],
      Operation267["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation267Options = {}) {
    return flattenPages<
      Operation267["responses"][200]["content"]["application/json"],
      Operation267["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/schedules. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation268["requestBody"]
    >["content"]["application/json"],
    options: Operation268Options,
  ): Promise<
    ResourceResult<
      Operation268["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "Idempotency-Key": options.idempotencyKey,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/schedules/preview. Preserves response metadata; mutations are not replayed. */
  preview(
    body: NonNullable<
      Operation269["requestBody"]
    >["content"]["application/json"],
    options: Operation269Options = {},
  ): Promise<
    ResourceResult<
      Operation269["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/preview",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["archive_schedule"]["parameters"]["path"]["schedule_id"],
  ): SchedulesScheduleIdResource {
    return new SchedulesScheduleIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class SchedulesScheduleIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/schedules/{schedule_id}. Preserves response metadata; mutations are not replayed. */
  delete(options: Operation270Options): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** GET /api/v1/schedules/{schedule_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation271Options = {},
  ): Promise<
    ResourceResult<
      Operation271["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/schedules/{schedule_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation272["requestBody"]
    >["content"]["application/json"],
    options: Operation272Options,
  ): Promise<
    ResourceResult<
      Operation272["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/schedules/{schedule_id}/dispatch. Preserves response metadata; mutations are not replayed. */
  dispatch(
    body: NonNullable<
      Operation273["requestBody"]
    >["content"]["application/json"],
    options: Operation273Options,
  ): Promise<
    ResourceResult<
      Operation273["responses"][202]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/dispatch",
      body,
      Object.fromEntries(
        Object.entries({
          "Idempotency-Key": options.idempotencyKey,
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/schedules/{schedule_id}/enable. Preserves response metadata; mutations are not replayed. */
  enable(
    body: NonNullable<
      Operation274["requestBody"]
    >["content"]["application/json"],
    options: Operation274Options,
  ): Promise<
    ResourceResult<
      Operation274["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/enable",
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get occurrences(): SchedulesScheduleIdOccurrencesResource {
    return new SchedulesScheduleIdOccurrencesResource(
      this.transport,
      this.path + "/occurrences",
    );
  }
  /** POST /api/v1/schedules/{schedule_id}/pause. Preserves response metadata; mutations are not replayed. */
  pause(
    body: NonNullable<
      Operation277["requestBody"]
    >["content"]["application/json"],
    options: Operation277Options,
  ): Promise<
    ResourceResult<
      Operation277["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/pause",
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get status(): SchedulesScheduleIdStatusResource {
    return new SchedulesScheduleIdStatusResource(
      this.transport,
      this.path + "/status",
    );
  }
}

export class SchedulesScheduleIdOccurrencesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/schedules/{schedule_id}/occurrences. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation275Options = {},
  ): Promise<
    ResourceResult<
      Operation275["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation275Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation275["responses"][200]["content"]["application/json"],
      Operation275["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation275Options = {}) {
    return flattenPages<
      Operation275["responses"][200]["content"]["application/json"],
      Operation275["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  ref(
    value: operations["get_schedule_occurrence"]["parameters"]["path"]["occurrence_id"],
  ): SchedulesScheduleIdOccurrencesOccurrenceIdResource {
    return new SchedulesScheduleIdOccurrencesOccurrenceIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class SchedulesScheduleIdOccurrencesOccurrenceIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/schedules/{schedule_id}/occurrences/{occurrence_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation276Options = {},
  ): Promise<
    ResourceResult<
      Operation276["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
}

export class SchedulesScheduleIdStatusResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/schedules/{schedule_id}/status. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation278Options = {},
  ): Promise<
    ResourceResult<
      Operation278["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class SessionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/sessions. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation279Options = {},
  ): Promise<
    ResourceResult<
      Operation279["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation279Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation279["responses"][200]["content"]["application/json"],
      Operation279["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation279Options = {}) {
    return flattenPages<
      Operation279["responses"][200]["content"]["application/json"],
      Operation279["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/sessions. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation280["requestBody"]
    >["content"]["application/json"],
    options: Operation280Options = {},
  ): Promise<
    ResourceResult<
      Operation280["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["get_session"]["parameters"]["path"]["session_id"],
  ): SessionsSessionIdResource {
    return new SessionsSessionIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class SessionsSessionIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/sessions/{session_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation281Options = {},
  ): Promise<
    ResourceResult<
      Operation281["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/sessions/{session_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation282["requestBody"]
    >["content"]["application/json"],
    options: Operation282Options,
  ): Promise<
    ResourceResult<
      Operation282["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get messageAuthors(): SessionsSessionIdMessageAuthorsResource {
    return new SessionsSessionIdMessageAuthorsResource(
      this.transport,
      this.path + "/message-authors",
    );
  }
  get stream(): SessionsSessionIdStreamResource {
    return new SessionsSessionIdStreamResource(
      this.transport,
      this.path + "/stream",
    );
  }
  get threads(): SessionsSessionIdThreadsResource {
    return new SessionsSessionIdThreadsResource(
      this.transport,
      this.path + "/threads",
    );
  }
}

export class SessionsSessionIdMessageAuthorsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/sessions/{session_id}/message-authors. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation283Options,
  ): Promise<
    ResourceResult<
      Operation283["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
}

export class SessionsSessionIdStreamResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/sessions/{session_id}/stream. Caller owns and closes the unbuffered body. */
  get(options: Operation284Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal },
      headers: Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      accept: "text/event-stream",
    });
  }
}

export class SessionsSessionIdThreadsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/sessions/{session_id}/threads. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation285Options = {},
  ): Promise<
    ResourceResult<
      Operation285["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation285Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation285["responses"][200]["content"]["application/json"],
      Operation285["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation285Options = {}) {
    return flattenPages<
      Operation285["responses"][200]["content"]["application/json"],
      Operation285["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class SkillsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/skills. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation286Options = {},
  ): Promise<
    ResourceResult<
      Operation286["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation286Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation286["responses"][200]["content"]["application/json"],
      Operation286["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation286Options = {}) {
    return flattenPages<
      Operation286["responses"][200]["content"]["application/json"],
      Operation286["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/skills. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation287["requestBody"]
    >["content"]["application/json"],
    options: Operation287Options = {},
  ): Promise<
    ResourceResult<
      Operation287["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/skills/validate. Preserves response metadata; mutations are not replayed. */
  validate(
    body: NonNullable<
      Operation288["requestBody"]
    >["content"]["application/json"],
    options: Operation288Options = {},
  ): Promise<
    ResourceResult<
      Operation288["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/validate",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["get_skill"]["parameters"]["path"]["skill_id"],
  ): SkillsSkillIdResource {
    return new SkillsSkillIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class SkillsSkillIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/skills/{skill_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation289Options = {},
  ): Promise<
    ResourceResult<
      Operation289["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/skills/{skill_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation290["requestBody"]
    >["content"]["application/json"],
    options: Operation290Options,
  ): Promise<
    ResourceResult<
      Operation290["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/skills/{skill_id}/archive. Preserves response metadata; mutations are not replayed. */
  archive(
    options: Operation291Options,
  ): Promise<
    ResourceResult<
      Operation291["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/archive",
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get revisions(): SkillsSkillIdRevisionsResource {
    return new SkillsSkillIdRevisionsResource(
      this.transport,
      this.path + "/revisions",
    );
  }
  /** POST /api/v1/skills/{skill_id}/unarchive. Preserves response metadata; mutations are not replayed. */
  unarchive(
    options: Operation298Options,
  ): Promise<
    ResourceResult<
      Operation298["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/unarchive",
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class SkillsSkillIdRevisionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/skills/{skill_id}/revisions. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation292Options = {},
  ): Promise<
    ResourceResult<
      Operation292["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation292Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation292["responses"][200]["content"]["application/json"],
      Operation292["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation292Options = {}) {
    return flattenPages<
      Operation292["responses"][200]["content"]["application/json"],
      Operation292["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/skills/{skill_id}/revisions. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation293["requestBody"]
    >["content"]["application/json"],
    options: Operation293Options,
  ): Promise<
    ResourceResult<
      Operation293["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["get_skill_revision"]["parameters"]["path"]["revision_id"],
  ): SkillsSkillIdRevisionsRevisionIdResource {
    return new SkillsSkillIdRevisionsRevisionIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class SkillsSkillIdRevisionsRevisionIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/skills/{skill_id}/revisions/{revision_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation294Options = {},
  ): Promise<
    ResourceResult<
      Operation294["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get content(): SkillsSkillIdRevisionsRevisionIdContentResource {
    return new SkillsSkillIdRevisionsRevisionIdContentResource(
      this.transport,
      this.path + "/content",
    );
  }
  get files(): SkillsSkillIdRevisionsRevisionIdFilesResource {
    return new SkillsSkillIdRevisionsRevisionIdFilesResource(
      this.transport,
      this.path + "/files",
    );
  }
  /** POST /api/v1/skills/{skill_id}/revisions/{revision_id}/set-default. Preserves response metadata; mutations are not replayed. */
  setDefault(
    options: Operation297Options,
  ): Promise<
    ResourceResult<
      Operation297["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/set-default",
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class SkillsSkillIdRevisionsRevisionIdContentResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/skills/{skill_id}/revisions/{revision_id}/content. Caller owns and closes the unbuffered body. */
  get(options: Operation295Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal },
      headers: Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      accept: "application/zip",
    });
  }
}

export class SkillsSkillIdRevisionsRevisionIdFilesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  ref(
    value: operations["read_skill_file"]["parameters"]["path"]["path"],
  ): SkillsSkillIdRevisionsRevisionIdFilesPathResource {
    return new SkillsSkillIdRevisionsRevisionIdFilesPathResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class SkillsSkillIdRevisionsRevisionIdFilesPathResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/skills/{skill_id}/revisions/{revision_id}/files/{path}. Caller owns and closes the unbuffered body. */
  get(options: Operation296Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal },
      headers: Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      accept: "application/octet-stream",
    });
  }
}

export class SubscriptionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/subscriptions. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation299Options = {},
  ): Promise<
    ResourceResult<
      Operation299["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation299Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation299["responses"][200]["content"]["application/json"],
      Operation299["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation299Options = {}) {
    return flattenPages<
      Operation299["responses"][200]["content"]["application/json"],
      Operation299["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/subscriptions. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation300["requestBody"]
    >["content"]["application/json"],
    options: Operation300Options = {},
  ): Promise<
    ResourceResult<
      Operation300["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["delete_subscription"]["parameters"]["path"]["subscription_id"],
  ): SubscriptionsSubscriptionIdResource {
    return new SubscriptionsSubscriptionIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class SubscriptionsSubscriptionIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/subscriptions/{subscription_id}. Preserves response metadata; mutations are not replayed. */
  delete(options: Operation301Options): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** GET /api/v1/subscriptions/{subscription_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation302Options = {},
  ): Promise<
    ResourceResult<
      Operation302["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/subscriptions/{subscription_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation303["requestBody"]
    >["content"]["application/json"],
    options: Operation303Options,
  ): Promise<
    ResourceResult<
      Operation303["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get deliveries(): SubscriptionsSubscriptionIdDeliveriesResource {
    return new SubscriptionsSubscriptionIdDeliveriesResource(
      this.transport,
      this.path + "/deliveries",
    );
  }
}

export class SubscriptionsSubscriptionIdDeliveriesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/subscriptions/{subscription_id}/deliveries. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation304Options = {},
  ): Promise<
    ResourceResult<
      Operation304["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation304Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation304["responses"][200]["content"]["application/json"],
      Operation304["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation304Options = {}) {
    return flattenPages<
      Operation304["responses"][200]["content"]["application/json"],
      Operation304["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  ref(
    value: operations["redeliver"]["parameters"]["path"]["delivery_id"],
  ): SubscriptionsSubscriptionIdDeliveriesDeliveryIdResource {
    return new SubscriptionsSubscriptionIdDeliveriesDeliveryIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class SubscriptionsSubscriptionIdDeliveriesDeliveryIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** POST /api/v1/subscriptions/{subscription_id}/deliveries/{delivery_id}/redeliver. Preserves response metadata; mutations are not replayed. */
  redeliver(
    options: Operation305Options = {},
  ): Promise<
    ResourceResult<
      Operation305["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/redeliver",
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class ThreadsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/threads. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation306Options = {},
  ): Promise<
    ResourceResult<
      Operation306["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation306Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation306["responses"][200]["content"]["application/json"],
      Operation306["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation306Options = {}) {
    return flattenPages<
      Operation306["responses"][200]["content"]["application/json"],
      Operation306["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/threads. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation307["requestBody"]
    >["content"]["application/json"],
    options: Operation307Options,
  ): Promise<
    ResourceResult<
      | Operation307["responses"][200]["content"]["application/json"]
      | Operation307["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "Idempotency-Key": options.idempotencyKey,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["get_thread"]["parameters"]["path"]["thread_id"],
  ): ThreadsThreadIdResource {
    return new ThreadsThreadIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class ThreadsThreadIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/threads/{thread_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation308Options = {},
  ): Promise<
    ResourceResult<
      Operation308["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/threads/{thread_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation309["requestBody"]
    >["content"]["application/json"],
    options: Operation309Options,
  ): Promise<
    ResourceResult<
      Operation309["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/threads/{thread_id}/archive. Preserves response metadata; mutations are not replayed. */
  archive(
    options: Operation310Options,
  ): Promise<
    ResourceResult<
      Operation310["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/archive",
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get browser(): ThreadsThreadIdBrowserResource {
    return new ThreadsThreadIdBrowserResource(
      this.transport,
      this.path + "/browser",
    );
  }
  get environments(): ThreadsThreadIdEnvironmentsResource {
    return new ThreadsThreadIdEnvironmentsResource(
      this.transport,
      this.path + "/environments",
    );
  }
  get inbox(): ThreadsThreadIdInboxResource {
    return new ThreadsThreadIdInboxResource(
      this.transport,
      this.path + "/inbox",
    );
  }
  get memories(): ThreadsThreadIdMemoriesResource {
    return new ThreadsThreadIdMemoriesResource(
      this.transport,
      this.path + "/memories",
    );
  }
  get runs(): ThreadsThreadIdRunsResource {
    return new ThreadsThreadIdRunsResource(this.transport, this.path + "/runs");
  }
  get sessionBindings(): ThreadsThreadIdSessionBindingsResource {
    return new ThreadsThreadIdSessionBindingsResource(
      this.transport,
      this.path + "/session-bindings",
    );
  }
  get stream(): ThreadsThreadIdStreamResource {
    return new ThreadsThreadIdStreamResource(
      this.transport,
      this.path + "/stream",
    );
  }
  get toolExecutions(): ThreadsThreadIdToolExecutionsResource {
    return new ThreadsThreadIdToolExecutionsResource(
      this.transport,
      this.path + "/tool-executions",
    );
  }
}

export class ThreadsThreadIdBrowserResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/threads/{thread_id}/browser. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation311Options = {},
  ): Promise<
    ResourceResult<
      Operation311["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PUT /api/v1/threads/{thread_id}/browser. Preserves response metadata; mutations are not replayed. */
  replace(
    body:
      | NonNullable<Operation312["requestBody"]>["content"]["application/json"]
      | undefined,
    options: Operation312Options,
  ): Promise<
    ResourceResult<
      Operation312["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PUT",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class ThreadsThreadIdEnvironmentsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/threads/{thread_id}/environments. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation313Options = {},
  ): Promise<
    ResourceResult<
      Operation313["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/threads/{thread_id}/environments. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation314["requestBody"]
    >["content"]["application/json"],
    options: Operation314Options,
  ): Promise<
    ResourceResult<
      Operation314["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["remove_environment_mount"]["parameters"]["path"]["name"],
  ): ThreadsThreadIdEnvironmentsNameResource {
    return new ThreadsThreadIdEnvironmentsNameResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class ThreadsThreadIdEnvironmentsNameResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/threads/{thread_id}/environments/{name}. Preserves response metadata; mutations are not replayed. */
  delete(options: Operation315Options): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/threads/{thread_id}/environments/{name}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation316["requestBody"]
    >["content"]["application/json"],
    options: Operation316Options,
  ): Promise<
    ResourceResult<
      Operation316["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class ThreadsThreadIdInboxResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/threads/{thread_id}/inbox. Preserves response metadata; mutations are not replayed. */
  list(
    options?: Operation317DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["EntryPage"]>>;
  list(
    options: Operation317Options,
  ): Promise<
    ResourceResult<
      Operation317["responses"][200]["content"]["application/json"]
    >
  >;
  list(
    options: Operation317Options = {},
  ): Promise<
    ResourceResult<
      Operation317["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation317Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation317["responses"][200]["content"]["application/json"],
      Operation317["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation317Options = {}) {
    return flattenPages<
      Operation317["responses"][200]["content"]["application/json"],
      Operation317["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/threads/{thread_id}/inbox. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation318["requestBody"]
    >["content"]["application/json"],
    options: Operation318Options,
  ): Promise<
    ResourceResult<
      | Operation318["responses"][200]["content"]["application/json"]
      | Operation318["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "Idempotency-Key": options.idempotencyKey,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get order(): ThreadsThreadIdInboxOrderResource {
    return new ThreadsThreadIdInboxOrderResource(
      this.transport,
      this.path + "/order",
    );
  }
  ref(
    value: operations["withdraw_entry"]["parameters"]["path"]["entry_id"],
  ): ThreadsThreadIdInboxEntryIdResource {
    return new ThreadsThreadIdInboxEntryIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class ThreadsThreadIdInboxOrderResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** PUT /api/v1/threads/{thread_id}/inbox/order. Preserves response metadata; mutations are not replayed. */
  replace(
    body: NonNullable<
      Operation319["requestBody"]
    >["content"]["application/json"],
    options: Operation319Options,
  ): Promise<
    ResourceResult<
      Operation319["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PUT",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class ThreadsThreadIdInboxEntryIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/threads/{thread_id}/inbox/{entry_id}. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation320Options,
  ): Promise<
    ResourceResult<
      Operation320["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** GET /api/v1/threads/{thread_id}/inbox/{entry_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options?: Operation321DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["EntryView"]>>;
  get(
    options: Operation321Options,
  ): Promise<
    ResourceResult<
      Operation321["responses"][200]["content"]["application/json"]
    >
  >;
  get(
    options: Operation321Options = {},
  ): Promise<
    ResourceResult<
      Operation321["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  /** PATCH /api/v1/threads/{thread_id}/inbox/{entry_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation322["requestBody"]
    >["content"]["application/json"],
    options: Operation322Options,
  ): Promise<
    ResourceResult<
      Operation322["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class ThreadsThreadIdMemoriesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/threads/{thread_id}/memories. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation323Options = {},
  ): Promise<
    ResourceResult<
      Operation323["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/threads/{thread_id}/memories. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation324["requestBody"]
    >["content"]["application/json"],
    options: Operation324Options,
  ): Promise<
    ResourceResult<
      Operation324["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["remove_memory_mount"]["parameters"]["path"]["name"],
  ): ThreadsThreadIdMemoriesNameResource {
    return new ThreadsThreadIdMemoriesNameResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class ThreadsThreadIdMemoriesNameResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/threads/{thread_id}/memories/{name}. Preserves response metadata; mutations are not replayed. */
  delete(options: Operation325Options): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/threads/{thread_id}/memories/{name}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation326["requestBody"]
    >["content"]["application/json"],
    options: Operation326Options,
  ): Promise<
    ResourceResult<
      Operation326["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class ThreadsThreadIdRunsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/threads/{thread_id}/runs. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation327Options = {},
  ): Promise<
    ResourceResult<
      Operation327["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation327Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation327["responses"][200]["content"]["application/json"],
      Operation327["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation327Options = {}) {
    return flattenPages<
      Operation327["responses"][200]["content"]["application/json"],
      Operation327["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class ThreadsThreadIdSessionBindingsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  ref(
    value: operations["get_session_binding"]["parameters"]["path"]["environment_id"],
  ): ThreadsThreadIdSessionBindingsEnvironmentIdResource {
    return new ThreadsThreadIdSessionBindingsEnvironmentIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class ThreadsThreadIdSessionBindingsEnvironmentIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  ref(
    value: operations["get_session_binding"]["parameters"]["path"]["name"],
  ): ThreadsThreadIdSessionBindingsEnvironmentIdNameResource {
    return new ThreadsThreadIdSessionBindingsEnvironmentIdNameResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class ThreadsThreadIdSessionBindingsEnvironmentIdNameResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/threads/{thread_id}/session-bindings/{environment_id}/{name}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation328Options = {},
  ): Promise<
    ResourceResult<
      Operation328["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PUT /api/v1/threads/{thread_id}/session-bindings/{environment_id}/{name}. Preserves response metadata; mutations are not replayed. */
  replace(
    body: NonNullable<
      Operation329["requestBody"]
    >["content"]["application/json"],
    options: Operation329Options,
  ): Promise<
    ResourceResult<
      Operation329["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PUT",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class ThreadsThreadIdStreamResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/threads/{thread_id}/stream. Caller owns and closes the unbuffered body. */
  get(options: Operation330Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal, query: options.query },
      headers: Object.fromEntries(
        Object.entries({
          "Last-Event-ID": options.lastEventId,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      accept: "text/event-stream",
    });
  }
}

export class ThreadsThreadIdToolExecutionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/threads/{thread_id}/tool-executions. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation331Options = {},
  ): Promise<
    ResourceResult<
      Operation331["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation331Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation331["responses"][200]["content"]["application/json"],
      Operation331["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation331Options = {}) {
    return flattenPages<
      Operation331["responses"][200]["content"]["application/json"],
      Operation331["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  ref(
    value: operations["get_tool_execution"]["parameters"]["path"]["execution_id"],
  ): ThreadsThreadIdToolExecutionsExecutionIdResource {
    return new ThreadsThreadIdToolExecutionsExecutionIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class ThreadsThreadIdToolExecutionsExecutionIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/threads/{thread_id}/tool-executions/{execution_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation332Options = {},
  ): Promise<
    ResourceResult<
      Operation332["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/threads/{thread_id}/tool-executions/{execution_id}/cancel. Preserves response metadata; mutations are not replayed. */
  cancel(
    options: Operation333Options = {},
  ): Promise<
    ResourceResult<
      Operation333["responses"][202]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/cancel",
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get observation(): ThreadsThreadIdToolExecutionsExecutionIdObservationResource {
    return new ThreadsThreadIdToolExecutionsExecutionIdObservationResource(
      this.transport,
      this.path + "/observation",
    );
  }
  get result(): ThreadsThreadIdToolExecutionsExecutionIdResultResource {
    return new ThreadsThreadIdToolExecutionsExecutionIdResultResource(
      this.transport,
      this.path + "/result",
    );
  }
}

export class ThreadsThreadIdToolExecutionsExecutionIdObservationResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/threads/{thread_id}/tool-executions/{execution_id}/observation. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation334Options = {},
  ): Promise<
    ResourceResult<
      Operation334["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class ThreadsThreadIdToolExecutionsExecutionIdResultResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/threads/{thread_id}/tool-executions/{execution_id}/result. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation335Options = {},
  ): Promise<
    ResourceResult<
      Operation335["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
}

export class ToolsetsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/toolsets. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation336Options = {},
  ): Promise<
    ResourceResult<
      Operation336["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  get definitions(): ToolsetsDefinitionsResource {
    return new ToolsetsDefinitionsResource(
      this.transport,
      this.path + "/definitions",
    );
  }
  get index(): ToolsetsIndexResource {
    return new ToolsetsIndexResource(this.transport, this.path + "/index");
  }
}

export class ToolsetsDefinitionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/toolsets/definitions. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation337Options,
  ): Promise<
    ResourceResult<
      Operation337["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
}

export class ToolsetsIndexResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/toolsets/index. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation338Options = {},
  ): Promise<
    ResourceResult<
      Operation338["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation338Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation338["responses"][200]["content"]["application/json"],
      Operation338["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation338Options = {}) {
    return flattenPages<
      Operation338["responses"][200]["content"]["application/json"],
      Operation338["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class TraceBackendResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/trace-backend. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation339Options = {},
  ): Promise<
    ResourceResult<
      Operation339["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class TracesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/traces. Preserves response metadata; mutations are not replayed. */
  list(
    options?: Operation340DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["SpanPage"]>>;
  list(
    options: Operation340Options,
  ): Promise<
    ResourceResult<
      Operation340["responses"][200]["content"]["application/json"]
    >
  >;
  list(
    options: Operation340Options = {},
  ): Promise<
    ResourceResult<
      Operation340["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation340Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation340["responses"][200]["content"]["application/json"],
      Operation340["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation340Options = {}) {
    return flattenPages<
      Operation340["responses"][200]["content"]["application/json"],
      Operation340["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  get search(): TracesSearchResource {
    return new TracesSearchResource(this.transport, this.path + "/search");
  }
  ref(
    value: operations["get_trace"]["parameters"]["path"]["trace_id"],
  ): TracesTraceIdResource {
    return new TracesTraceIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class TracesSearchResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/traces/search. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation341Options,
  ): Promise<
    ResourceResult<
      Operation341["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation341Options) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation341["responses"][200]["content"]["application/json"],
      Operation341["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation341Options) {
    return flattenPages<
      Operation341["responses"][200]["content"]["application/json"],
      Operation341["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class TracesTraceIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/traces/{trace_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options?: Operation342DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["Span"]>>;
  get(
    options: Operation342Options,
  ): Promise<
    ResourceResult<
      Operation342["responses"][200]["content"]["application/json"]
    >
  >;
  get(
    options: Operation342Options = {},
  ): Promise<
    ResourceResult<
      Operation342["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  get spans(): TracesTraceIdSpansResource {
    return new TracesTraceIdSpansResource(this.transport, this.path + "/spans");
  }
}

export class TracesTraceIdSpansResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/traces/{trace_id}/spans. Preserves response metadata; mutations are not replayed. */
  list(
    options?: Operation343DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["SpanPage"]>>;
  list(
    options: Operation343Options,
  ): Promise<
    ResourceResult<
      Operation343["responses"][200]["content"]["application/json"]
    >
  >;
  list(
    options: Operation343Options = {},
  ): Promise<
    ResourceResult<
      Operation343["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation343Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation343["responses"][200]["content"]["application/json"],
      Operation343["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation343Options = {}) {
    return flattenPages<
      Operation343["responses"][200]["content"]["application/json"],
      Operation343["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  ref(
    value: operations["get_trace_span"]["parameters"]["path"]["span_id"],
  ): TracesTraceIdSpansSpanIdResource {
    return new TracesTraceIdSpansSpanIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class TracesTraceIdSpansSpanIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/traces/{trace_id}/spans/{span_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation344Options = {},
  ): Promise<
    ResourceResult<
      Operation344["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get content(): TracesTraceIdSpansSpanIdContentResource {
    return new TracesTraceIdSpansSpanIdContentResource(
      this.transport,
      this.path + "/content",
    );
  }
}

export class TracesTraceIdSpansSpanIdContentResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/traces/{trace_id}/spans/{span_id}/content. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation345Options = {},
  ): Promise<
    ResourceResult<
      Operation345["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
}

export class UploadsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** POST /api/v1/uploads. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation346["requestBody"]
    >["content"]["multipart/form-data"],
    options: Operation346Options,
  ): Promise<
    ResourceResult<
      Operation346["responses"][200]["content"]["application/json"]
    >
  > {
    return uploadRequest(
      this.transport,
      "POST",
      this.path,
      multipartBody(body),
      undefined,
      Object.fromEntries(
        Object.entries({
          "Idempotency-Key": options.idempotencyKey,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class UsageResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/usage. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation347Options = {},
  ): Promise<
    ResourceResult<
      Operation347["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  get agents(): UsageAgentsResource {
    return new UsageAgentsResource(this.transport, this.path + "/agents");
  }
  get context(): UsageContextResource {
    return new UsageContextResource(this.transport, this.path + "/context");
  }
  get members(): UsageMembersResource {
    return new UsageMembersResource(this.transport, this.path + "/members");
  }
  get models(): UsageModelsResource {
    return new UsageModelsResource(this.transport, this.path + "/models");
  }
  get overview(): UsageOverviewResource {
    return new UsageOverviewResource(this.transport, this.path + "/overview");
  }
  get records(): UsageRecordsResource {
    return new UsageRecordsResource(this.transport, this.path + "/records");
  }
  get runs(): UsageRunsResource {
    return new UsageRunsResource(this.transport, this.path + "/runs");
  }
  get sessions(): UsageSessionsResource {
    return new UsageSessionsResource(this.transport, this.path + "/sessions");
  }
}

export class UsageAgentsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/usage/agents. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation348Options,
  ): Promise<
    ResourceResult<
      Operation348["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation348Options) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation348["responses"][200]["content"]["application/json"],
      Operation348["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation348Options) {
    return flattenPages<
      Operation348["responses"][200]["content"]["application/json"],
      Operation348["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class UsageContextResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/usage/context. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation349Options = {},
  ): Promise<
    ResourceResult<
      Operation349["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
}

export class UsageMembersResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/usage/members. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation350Options,
  ): Promise<
    ResourceResult<
      Operation350["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation350Options) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation350["responses"][200]["content"]["application/json"],
      Operation350["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation350Options) {
    return flattenPages<
      Operation350["responses"][200]["content"]["application/json"],
      Operation350["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class UsageModelsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/usage/models. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation351Options,
  ): Promise<
    ResourceResult<
      Operation351["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation351Options) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation351["responses"][200]["content"]["application/json"],
      Operation351["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation351Options) {
    return flattenPages<
      Operation351["responses"][200]["content"]["application/json"],
      Operation351["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class UsageOverviewResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/usage/overview. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation352Options,
  ): Promise<
    ResourceResult<
      Operation352["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
}

export class UsageRecordsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  ref(
    value: operations["model_request_metrics"]["parameters"]["path"]["record_id"],
  ): UsageRecordsRecordIdResource {
    return new UsageRecordsRecordIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class UsageRecordsRecordIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  get metrics(): UsageRecordsRecordIdMetricsResource {
    return new UsageRecordsRecordIdMetricsResource(
      this.transport,
      this.path + "/metrics",
    );
  }
}

export class UsageRecordsRecordIdMetricsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/usage/records/{record_id}/metrics. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation353Options = {},
  ): Promise<
    ResourceResult<
      Operation353["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class UsageRunsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/usage/runs. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation354Options = {},
  ): Promise<
    ResourceResult<
      Operation354["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation354Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation354["responses"][200]["content"]["application/json"],
      Operation354["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation354Options = {}) {
    return flattenPages<
      Operation354["responses"][200]["content"]["application/json"],
      Operation354["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class UsageSessionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/usage/sessions. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation355Options,
  ): Promise<
    ResourceResult<
      Operation355["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation355Options) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation355["responses"][200]["content"]["application/json"],
      Operation355["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation355Options) {
    return flattenPages<
      Operation355["responses"][200]["content"]["application/json"],
      Operation355["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class UsersResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  get me(): UsersMeResource {
    return new UsersMeResource(this.transport, this.path + "/me");
  }
  ref(
    value: operations["get_user_avatar"]["parameters"]["path"]["user_id"],
  ): UsersUserIdResource {
    return new UsersUserIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class UsersMeResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/users/me. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation356Options = {},
  ): Promise<
    ResourceResult<
      Operation356["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/users/me. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation357["requestBody"]
    >["content"]["application/json"],
    options: Operation357Options,
  ): Promise<
    ResourceResult<
      Operation357["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "If-Match": options.ifMatch })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get auditEvents(): UsersMeAuditEventsResource {
    return new UsersMeAuditEventsResource(
      this.transport,
      this.path + "/audit-events",
    );
  }
  get avatar(): UsersMeAvatarResource {
    return new UsersMeAvatarResource(this.transport, this.path + "/avatar");
  }
  /** POST /api/v1/users/me/disable. Preserves response metadata; mutations are not replayed. */
  disable(
    body: NonNullable<
      Operation361["requestBody"]
    >["content"]["application/json"],
    options: Operation361Options = {},
  ): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/disable",
      body,
      undefined,
      { signal: options.signal },
    );
  }
  get keys(): UsersMeKeysResource {
    return new UsersMeKeysResource(this.transport, this.path + "/keys");
  }
  get loginSessions(): UsersMeLoginSessionsResource {
    return new UsersMeLoginSessionsResource(
      this.transport,
      this.path + "/login-sessions",
    );
  }
  /** POST /api/v1/users/me/password. Preserves response metadata; mutations are not replayed. */
  password(
    body: NonNullable<
      Operation367["requestBody"]
    >["content"]["application/json"],
    options: Operation367Options = {},
  ): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/password",
      body,
      undefined,
      { signal: options.signal },
    );
  }
}

export class UsersMeAuditEventsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/users/me/audit-events. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation358Options = {},
  ): Promise<
    ResourceResult<
      Operation358["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation358Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation358["responses"][200]["content"]["application/json"],
      Operation358["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation358Options = {}) {
    return flattenPages<
      Operation358["responses"][200]["content"]["application/json"],
      Operation358["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class UsersMeAvatarResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/users/me/avatar. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation359Options,
  ): Promise<
    ResourceResult<
      Operation359["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "If-Match": options.ifMatch })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PUT /api/v1/users/me/avatar. Preserves response metadata; mutations are not replayed. */
  replace(
    body: Binary,
    options: Operation360Options,
  ): Promise<
    ResourceResult<
      Operation360["responses"][200]["content"]["application/json"]
    >
  > {
    return uploadRequest(
      this.transport,
      "PUT",
      this.path,
      body,
      options.contentType,
      Object.fromEntries(
        Object.entries({ "If-Match": options.ifMatch })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class UsersMeKeysResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/users/me/keys. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation362Options = {},
  ): Promise<
    ResourceResult<
      Operation362["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation362Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation362["responses"][200]["content"]["application/json"],
      Operation362["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation362Options = {}) {
    return flattenPages<
      Operation362["responses"][200]["content"]["application/json"],
      Operation362["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/users/me/keys. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation363["requestBody"]
    >["content"]["application/json"],
    options: Operation363Options = {},
  ): Promise<
    ResourceResult<
      Operation363["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["revoke_user_key"]["parameters"]["path"]["key_id"],
  ): UsersMeKeysKeyIdResource {
    return new UsersMeKeysKeyIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class UsersMeKeysKeyIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/users/me/keys/{key_id}. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation364Options,
  ): Promise<
    ResourceResult<
      Operation364["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "If-Match": options.ifMatch })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class UsersMeLoginSessionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/users/me/login-sessions. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation365Options = {},
  ): Promise<
    ResourceResult<
      Operation365["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation365Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation365["responses"][200]["content"]["application/json"],
      Operation365["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation365Options = {}) {
    return flattenPages<
      Operation365["responses"][200]["content"]["application/json"],
      Operation365["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  ref(
    value: operations["revoke_login_session"]["parameters"]["path"]["session_id"],
  ): UsersMeLoginSessionsSessionIdResource {
    return new UsersMeLoginSessionsSessionIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class UsersMeLoginSessionsSessionIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/users/me/login-sessions/{session_id}. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation366Options = {},
  ): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      undefined,
      { signal: options.signal },
    );
  }
}

export class UsersUserIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  get avatar(): UsersUserIdAvatarResource {
    return new UsersUserIdAvatarResource(this.transport, this.path + "/avatar");
  }
}

export class UsersUserIdAvatarResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/users/{user_id}/avatar. Caller owns and closes the unbuffered body. */
  get(options: Operation368Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal },
      headers: undefined,
      accept: "image/jpeg, image/png, image/webp",
    });
  }
}

export class WebProvidersResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/web-providers. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation369Options = {},
  ): Promise<
    ResourceResult<
      Operation369["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation369Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation369["responses"][200]["content"]["application/json"],
      Operation369["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation369Options = {}) {
    return flattenPages<
      Operation369["responses"][200]["content"]["application/json"],
      Operation369["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/web-providers. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation370["requestBody"]
    >["content"]["application/json"],
    options: Operation370Options = {},
  ): Promise<
    ResourceResult<
      Operation370["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["delete_web_provider"]["parameters"]["path"]["provider_id"],
  ): WebProvidersProviderIdResource {
    return new WebProvidersProviderIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WebProvidersProviderIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/web-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  delete(options: Operation371Options): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** GET /api/v1/web-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation372Options = {},
  ): Promise<
    ResourceResult<
      Operation372["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "GET",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/web-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation373["requestBody"]
    >["content"]["application/json"],
    options: Operation373Options,
  ): Promise<
    ResourceResult<
      Operation373["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({
          "If-Match": options.ifMatch,
          "X-Workspace-ID": options.xWorkspaceId,
        })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/web-providers/{provider_id}/test. Preserves response metadata; mutations are not replayed. */
  test(
    options: Operation374Options = {},
  ): Promise<
    ResourceResult<
      Operation374["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/test",
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class WorkspacesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation375Options = {},
  ): Promise<
    ResourceResult<
      Operation375["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation375Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation375["responses"][200]["content"]["application/json"],
      Operation375["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation375Options = {}) {
    return flattenPages<
      Operation375["responses"][200]["content"]["application/json"],
      Operation375["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  ref(
    value: operations["get_workspace"]["parameters"]["path"]["workspace_id"],
  ): WorkspacesWorkspaceIdResource {
    return new WorkspacesWorkspaceIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation376Options = {},
  ): Promise<
    ResourceResult<
      Operation376["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/workspaces/{workspace_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation377["requestBody"]
    >["content"]["application/json"],
    options: Operation377Options,
  ): Promise<
    ResourceResult<
      Operation377["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "If-Match": options.ifMatch })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/workspaces/{workspace_id}/archive. Preserves response metadata; mutations are not replayed. */
  archive(
    options: Operation378Options,
  ): Promise<
    ResourceResult<
      Operation378["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/archive",
      undefined,
      Object.fromEntries(
        Object.entries({ "If-Match": options.ifMatch })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get auditEvents(): WorkspacesWorkspaceIdAuditEventsResource {
    return new WorkspacesWorkspaceIdAuditEventsResource(
      this.transport,
      this.path + "/audit-events",
    );
  }
  get grants(): WorkspacesWorkspaceIdGrantsResource {
    return new WorkspacesWorkspaceIdGrantsResource(
      this.transport,
      this.path + "/grants",
    );
  }
  get icon(): WorkspacesWorkspaceIdIconResource {
    return new WorkspacesWorkspaceIdIconResource(
      this.transport,
      this.path + "/icon",
    );
  }
  get invitations(): WorkspacesWorkspaceIdInvitationsResource {
    return new WorkspacesWorkspaceIdInvitationsResource(
      this.transport,
      this.path + "/invitations",
    );
  }
  get keys(): WorkspacesWorkspaceIdKeysResource {
    return new WorkspacesWorkspaceIdKeysResource(
      this.transport,
      this.path + "/keys",
    );
  }
  get serviceAccounts(): WorkspacesWorkspaceIdServiceAccountsResource {
    return new WorkspacesWorkspaceIdServiceAccountsResource(
      this.transport,
      this.path + "/service-accounts",
    );
  }
}

export class WorkspacesWorkspaceIdAuditEventsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/audit-events. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation379Options = {},
  ): Promise<
    ResourceResult<
      Operation379["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation379Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation379["responses"][200]["content"]["application/json"],
      Operation379["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation379Options = {}) {
    return flattenPages<
      Operation379["responses"][200]["content"]["application/json"],
      Operation379["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class WorkspacesWorkspaceIdGrantsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/grants. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation380Options = {},
  ): Promise<
    ResourceResult<
      Operation380["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation380Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation380["responses"][200]["content"]["application/json"],
      Operation380["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation380Options = {}) {
    return flattenPages<
      Operation380["responses"][200]["content"]["application/json"],
      Operation380["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/grants. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation381["requestBody"]
    >["content"]["application/json"],
    options: Operation381Options = {},
  ): Promise<
    ResourceResult<
      Operation381["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["delete_workspace_grant"]["parameters"]["path"]["grant_id"],
  ): WorkspacesWorkspaceIdGrantsGrantIdResource {
    return new WorkspacesWorkspaceIdGrantsGrantIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdGrantsGrantIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/workspaces/{workspace_id}/grants/{grant_id}. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation382Options = {},
  ): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      undefined,
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/workspaces/{workspace_id}/grants/{grant_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation383["requestBody"]
    >["content"]["application/json"],
    options: Operation383Options = {},
  ): Promise<
    ResourceResult<
      Operation383["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "PATCH", this.path, body, undefined, {
      signal: options.signal,
    });
  }
}

export class WorkspacesWorkspaceIdIconResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/workspaces/{workspace_id}/icon. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation384Options,
  ): Promise<
    ResourceResult<
      Operation384["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "If-Match": options.ifMatch })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** GET /api/v1/workspaces/{workspace_id}/icon. Caller owns and closes the unbuffered body. */
  get(options: Operation385Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal },
      headers: undefined,
      accept: "image/jpeg, image/png, image/webp",
    });
  }
  /** PUT /api/v1/workspaces/{workspace_id}/icon. Preserves response metadata; mutations are not replayed. */
  replace(
    body: Binary,
    options: Operation386Options,
  ): Promise<
    ResourceResult<
      Operation386["responses"][200]["content"]["application/json"]
    >
  > {
    return uploadRequest(
      this.transport,
      "PUT",
      this.path,
      body,
      options.contentType,
      Object.fromEntries(
        Object.entries({ "If-Match": options.ifMatch })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class WorkspacesWorkspaceIdInvitationsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/invitations. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation387Options = {},
  ): Promise<
    ResourceResult<
      Operation387["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation387Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation387["responses"][200]["content"]["application/json"],
      Operation387["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation387Options = {}) {
    return flattenPages<
      Operation387["responses"][200]["content"]["application/json"],
      Operation387["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/invitations. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation388["requestBody"]
    >["content"]["application/json"],
    options: Operation388Options = {},
  ): Promise<
    ResourceResult<
      Operation388["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["resend_workspace_invitation"]["parameters"]["path"]["invitation_id"],
  ): WorkspacesWorkspaceIdInvitationsInvitationIdResource {
    return new WorkspacesWorkspaceIdInvitationsInvitationIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdInvitationsInvitationIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** POST /api/v1/workspaces/{workspace_id}/invitations/{invitation_id}/resend. Preserves response metadata; mutations are not replayed. */
  resend(
    options: Operation389Options,
  ): Promise<
    ResourceResult<
      Operation389["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/resend",
      undefined,
      Object.fromEntries(
        Object.entries({ "If-Match": options.ifMatch })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/workspaces/{workspace_id}/invitations/{invitation_id}/revoke. Preserves response metadata; mutations are not replayed. */
  revoke(
    options: Operation390Options,
  ): Promise<
    ResourceResult<
      Operation390["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/revoke",
      undefined,
      Object.fromEntries(
        Object.entries({ "If-Match": options.ifMatch })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class WorkspacesWorkspaceIdKeysResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/keys. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation391Options = {},
  ): Promise<
    ResourceResult<
      Operation391["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation391Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation391["responses"][200]["content"]["application/json"],
      Operation391["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation391Options = {}) {
    return flattenPages<
      Operation391["responses"][200]["content"]["application/json"],
      Operation391["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  ref(
    value: operations["revoke_workspace_key"]["parameters"]["path"]["key_id"],
  ): WorkspacesWorkspaceIdKeysKeyIdResource {
    return new WorkspacesWorkspaceIdKeysKeyIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdKeysKeyIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/workspaces/{workspace_id}/keys/{key_id}. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation392Options,
  ): Promise<
    ResourceResult<
      Operation392["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "If-Match": options.ifMatch })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class WorkspacesWorkspaceIdServiceAccountsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/service-accounts. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation393Options = {},
  ): Promise<
    ResourceResult<
      Operation393["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation393Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation393["responses"][200]["content"]["application/json"],
      Operation393["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation393Options = {}) {
    return flattenPages<
      Operation393["responses"][200]["content"]["application/json"],
      Operation393["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/service-accounts. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation394["requestBody"]
    >["content"]["application/json"],
    options: Operation394Options = {},
  ): Promise<
    ResourceResult<
      Operation394["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["delete_service_account"]["parameters"]["path"]["account_id"],
  ): WorkspacesWorkspaceIdServiceAccountsAccountIdResource {
    return new WorkspacesWorkspaceIdServiceAccountsAccountIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdServiceAccountsAccountIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/workspaces/{workspace_id}/service-accounts/{account_id}. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation395Options,
  ): Promise<
    ResourceResult<
      Operation395["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      Object.fromEntries(
        Object.entries({ "If-Match": options.ifMatch })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** GET /api/v1/workspaces/{workspace_id}/service-accounts/{account_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation396Options = {},
  ): Promise<
    ResourceResult<
      Operation396["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/workspaces/{workspace_id}/service-accounts/{account_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation397["requestBody"]
    >["content"]["application/json"],
    options: Operation397Options,
  ): Promise<
    ResourceResult<
      Operation397["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "PATCH",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "If-Match": options.ifMatch })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get keys(): WorkspacesWorkspaceIdServiceAccountsAccountIdKeysResource {
    return new WorkspacesWorkspaceIdServiceAccountsAccountIdKeysResource(
      this.transport,
      this.path + "/keys",
    );
  }
}

export class WorkspacesWorkspaceIdServiceAccountsAccountIdKeysResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/service-accounts/{account_id}/keys. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation398Options = {},
  ): Promise<
    ResourceResult<
      Operation398["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation398Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation398["responses"][200]["content"]["application/json"],
      Operation398["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation398Options = {}) {
    return flattenPages<
      Operation398["responses"][200]["content"]["application/json"],
      Operation398["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/service-accounts/{account_id}/keys. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation399["requestBody"]
    >["content"]["application/json"],
    options: Operation399Options = {},
  ): Promise<
    ResourceResult<
      Operation399["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
}

export class HealthzResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /healthz. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation400Options = {},
  ): Promise<
    ResourceResult<
      Operation400["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
}

export class ReadyzResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /readyz. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation401Options = {},
  ): Promise<
    ResourceResult<
      Operation401["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
}
