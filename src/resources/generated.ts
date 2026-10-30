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
type Operation109 = operations["prepare_finding_agent"];
type Operation109Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation109["parameters"]["header"]
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
type Operation44 = operations["takeover_browser"];
type Operation44Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation44["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation44["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation45 = operations["browser_viewer"];
type Operation45Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation45["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation46 = operations["list_builtin_skills"];
type Operation46Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation46["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation47 = operations["get_builtin_skill"];
type Operation47Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation47["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation48 = operations["read_builtin_skill_archive"];
type Operation48Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation48["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation48["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation49 = operations["list_connections"];
type Operation49Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation49["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation49["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation50 = operations["create_connection"];
type Operation50Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation50["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation51 = operations["complete_authorization"];
type Operation51Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation51["parameters"]["query"]>;
};
type Operation52 = operations["get_redirect_uri"];
type Operation52Options = { signal?: AbortSignal };
type Operation53 = operations["get_connection"];
type Operation53Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation53["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation54 = operations["update_connection"];
type Operation54Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation54["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation54["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation55 = operations["authorize_connection"];
type Operation55Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation55["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation55["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation56 = operations["revoke_connection"];
type Operation56Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation56["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation56["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation57 = operations["test_connection"];
type Operation57Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation57["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation58 = operations["list_connection_tools"];
type Operation58Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation58["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation59 = operations["define_connection_tools"];
type Operation59Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation59["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation59["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation60 = operations["index_connection_tools"];
type Operation60Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation60["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation60["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation61 = operations["list_connector_providers"];
type Operation61Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation61["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation61["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation62 = operations["create_connector_provider"];
type Operation62Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation62["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation63 = operations["delete_connector_provider"];
type Operation63Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation63["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation63["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation64 = operations["get_connector_provider"];
type Operation64Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation64["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation65 = operations["update_connector_provider"];
type Operation65Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation65["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation65["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation71 = operations["test_connector_provider"];
type Operation71Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation71["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation66 = operations["list_connector_apps"];
type Operation66Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation66["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation66["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation67 = operations["get_connector_app"];
type Operation67Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation67["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation68 = operations["list_connector_actions"];
type Operation68Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation68["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation69 = operations["define_connector_actions"];
type Operation69Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation69["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation69["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation70 = operations["index_connector_actions"];
type Operation70Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation70["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation70["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation72 = operations["complete_assistance"];
type Operation72Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation72["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation73 = operations["control_desktop"];
type Operation73Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation73["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation73["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation74 = operations["disconnect_desktop"];
type Operation74Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation74["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation75 = operations["request_control"];
type Operation75Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation75["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation76 = operations["view_desktop"];
type Operation76Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation76["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation76["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation77 = operations["list_devices"];
type Operation77Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation77["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation77["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation78 = operations["create_device"];
type Operation78Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation78["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation79 = operations["delete_device"];
type Operation79Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation79["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation79["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation80 = operations["get_device"];
type Operation80Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation80["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation81 = operations["update_device"];
type Operation81Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation81["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation81["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation83 = operations["rotate_device_credential"];
type Operation83Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation83["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation83["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation82 = operations["query_device_metrics"];
type Operation82Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation82["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation84 = operations["vercel_provider_options"];
type Operation84Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation84["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation85 = operations["list_environment_providers"];
type Operation85Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation85["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation85["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation86 = operations["create_environment_provider"];
type Operation86Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation86["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation87 = operations["delete_environment_provider"];
type Operation87Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation87["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation87["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation88 = operations["get_environment_provider"];
type Operation88Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation88["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation89 = operations["update_environment_provider"];
type Operation89Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation89["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation89["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation91 = operations["test_environment_provider"];
type Operation91Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation91["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation90 = operations["environment_provider_references"];
type Operation90Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation90["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation92 = operations["list_environment_templates"];
type Operation92Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation92["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation92["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation93 = operations["create_environment_template"];
type Operation93Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation93["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation94 = operations["get_environment_template"];
type Operation94Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation94["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation95 = operations["update_environment_template"];
type Operation95Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation95["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation95["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation96 = operations["list_environments"];
type Operation96Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation96["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation96["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation97 = operations["create_environment"];
type Operation97Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation97["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation98 = operations["delete_environment"];
type Operation98Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation98["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation98["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation99 = operations["get_environment"];
type Operation99Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation99["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation100 = operations["update_environment"];
type Operation100Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation100["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation100["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation107 = operations["retry_environment_creation"];
type Operation107Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation107["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation107["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation108 = operations["stop_environment"];
type Operation108Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation108["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation108["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation101 = operations["check_computer"];
type Operation101Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation101["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation102 = operations["get_environment_creation"];
type Operation102Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation102["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation103 = operations["get_environment_desktop_preview"];
type Operation103Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation103["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation104 = operations["select_metrics_source"];
type Operation104Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation104["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation104["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation106 = operations["query_environment_metrics"];
type Operation106Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation106["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation105 = operations["get_collector_status"];
type Operation105Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation105["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation110 = operations["list_finding_analyses"];
type Operation110Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation110["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation110["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation111 = operations["start_analysis"];
type Operation111Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation111["parameters"]["header"]>["Idempotency-Key"]
  >;
  xWorkspaceId?: NonNullable<
    Operation111["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation112 = operations["list_findings"];
type Operation112Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation112["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation112["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation113 = operations["create_finding"];
type Operation113Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation113["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation114 = operations["get_finding"];
type Operation114Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation114["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation115 = operations["update_finding"];
type Operation115Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation115["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation115["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation116 = operations["accept"];
type Operation116Options = { signal?: AbortSignal };
type Operation117 = operations["list_mcp_servers"];
type Operation117Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation117["parameters"]["query"]>;
};
type Operation118 = operations["get_media_defaults"];
type Operation118Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation118["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation119 = operations["replace_media_defaults"];
type Operation119Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation119["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation119["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation120 = operations["list_memories"];
type Operation120Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation120["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation120["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation121 = operations["create_memory"];
type Operation121Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation121["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation122 = operations["delete_memory"];
type Operation122Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation122["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation122["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation123 = operations["get_memory"];
type Operation123Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation123["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation124 = operations["update_memory"];
type Operation124Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation124["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation124["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation125 = operations["list_files"];
type Operation125Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation125["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation125["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation126 = operations["create_file"];
type Operation126Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation126["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation127 = operations["move_file"];
type Operation127Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation127["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation127["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation128 = operations["delete_file"];
type Operation128Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation128["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation128["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation129 = operations["read_file"];
type Operation129Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation129["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation130 = operations["replace_file"];
type Operation130Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation130["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation130["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation131 = operations["list_records"];
type Operation131Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation131["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation131["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation132 = operations["add_record"];
type Operation132Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation132["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation133 = operations["search_records"];
type Operation133Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation133["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation134 = operations["delete_record"];
type Operation134Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation134["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation135 = operations["update_record"];
type Operation135Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation135["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation136 = operations["purge_history"];
type Operation136Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation136["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation136["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation137 = operations["list_memory_revisions"];
type Operation137Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation137["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation137["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation138 = operations["get_memory_revision"];
type Operation138Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation138["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation139 = operations["restore_memory_revision"];
type Operation139Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation139["parameters"]["header"]>["If-Match"];
  xWorkspaceId?: NonNullable<
    Operation139["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation140 = operations["list_memory_providers"];
type Operation140Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation140["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation140["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation141 = operations["create_memory_provider"];
type Operation141Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation141["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation142 = operations["delete_memory_provider"];
type Operation142Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation142["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation142["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation143 = operations["get_memory_provider"];
type Operation143Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation143["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation144 = operations["update_memory_provider"];
type Operation144Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation144["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation144["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation145 = operations["test_memory_provider"];
type Operation145Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation145["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation146 = operations["list_spaces"];
type Operation146Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation146["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation146["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation147 = operations["create_space"];
type Operation147Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation147["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation148 = operations["delete_space"];
type Operation148Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation148["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation148["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation149 = operations["get_space"];
type Operation149Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation149["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation150 = operations["update_space"];
type Operation150Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation150["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation150["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation151 = operations["get_space_organization"];
type Operation151Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation151["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation152 = operations["list_space_organizations"];
type Operation152Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation152["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation152["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation153 = operations["organize_space"];
type Operation153Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation153["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation154 = operations["list_space_sessions"];
type Operation154Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation154["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation154["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation155 = operations["list_dashboards"];
type Operation155Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation155["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation155["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation156 = operations["create_dashboard"];
type Operation156Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation156["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation157 = operations["get_dashboard_preset"];
type Operation157Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation157["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation158 = operations["delete_dashboard"];
type Operation158Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation158["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation158["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation159 = operations["get_dashboard"];
type Operation159Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation159["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation160 = operations["update_dashboard"];
type Operation160Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation160["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation160["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation161 = operations["list_metrics_data_sources"];
type Operation161Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation161["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation161["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation162 = operations["create_metrics_data_source"];
type Operation162Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation162["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation163 = operations["get_metrics_capabilities"];
type Operation163Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation163["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation164 = operations["get_metrics_deployment_preset"];
type Operation164Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation164["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation165 = operations["delete_metrics_data_source"];
type Operation165Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation165["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation165["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation166 = operations["get_metrics_data_source"];
type Operation166Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation166["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation167 = operations["update_metrics_data_source"];
type Operation167Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation167["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation167["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation168 = operations["query_metrics_data_source"];
type Operation168Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation168["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation169 = operations["get_model_catalog"];
type Operation169Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation169["parameters"]["query"]>;
};
type Operation169DetailedOptions = Omit<Operation169Options, "query"> & {
  query?: Omit<
    NonNullable<Operation169["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed"; section?: null };
};
type Operation170 = operations["list_model_providers"];
type Operation170Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation170["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation170["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation171 = operations["create_model_provider"];
type Operation171Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation171["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation172 = operations["delete_model_provider"];
type Operation172Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation172["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation172["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation173 = operations["get_model_provider"];
type Operation173Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation173["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation174 = operations["update_model_provider"];
type Operation174Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation174["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation174["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation178 = operations["authorize_model"];
type Operation178Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation178["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation180 = operations["test_model_provider"];
type Operation180Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation180["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation175 = operations["disconnect_model_authorization"];
type Operation175Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation175["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation176 = operations["model_authorization"];
type Operation176Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation176["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation177 = operations["complete_model_authorization"];
type Operation177Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation177["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation179 = operations["discover_model_provider_models"];
type Operation179Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation179["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation181 = operations["list_models"];
type Operation181Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation181["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation181["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation182 = operations["create_model"];
type Operation182Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation182["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation183 = operations["get_model"];
type Operation183Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation183["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation184 = operations["update_model"];
type Operation184Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation184["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation184["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation185 = operations["list_organizations"];
type Operation185Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation185["parameters"]["query"]>;
};
type Operation186 = operations["get_organization"];
type Operation186Options = { signal?: AbortSignal };
type Operation187 = operations["update_organization"];
type Operation187Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation187["parameters"]["header"]>["If-Match"]
  >;
};
type Operation188 = operations["list_organization_audit_events"];
type Operation188Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation188["parameters"]["query"]>;
};
type Operation189 = operations["list_organization_grants"];
type Operation189Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation189["parameters"]["query"]>;
};
type Operation190 = operations["create_organization_grant"];
type Operation190Options = { signal?: AbortSignal };
type Operation191Options = { signal?: AbortSignal };
type Operation192 = operations["change_organization_grant"];
type Operation192Options = { signal?: AbortSignal };
type Operation193 = operations["delete_organization_icon"];
type Operation193Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation193["parameters"]["header"]>["If-Match"]
  >;
};
type Operation194Options = { signal?: AbortSignal };
type Operation195 = operations["put_organization_icon"];
type Operation195Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation195["parameters"]["header"]>["If-Match"]
  >;
  contentType: "image/jpeg" | "image/png" | "image/webp";
};
type Operation196 = operations["list_organization_invitations"];
type Operation196Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation196["parameters"]["query"]>;
};
type Operation197 = operations["create_organization_invitation"];
type Operation197Options = { signal?: AbortSignal };
type Operation198 = operations["resend_organization_invitation"];
type Operation198Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation198["parameters"]["header"]>["If-Match"]
  >;
};
type Operation199 = operations["revoke_organization_invitation"];
type Operation199Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation199["parameters"]["header"]>["If-Match"]
  >;
};
type Operation200 = operations["list_members"];
type Operation200Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation200["parameters"]["query"]>;
};
type Operation201 = operations["list_organization_workspaces"];
type Operation201Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation201["parameters"]["query"]>;
};
type Operation202 = operations["create_workspace"];
type Operation202Options = { signal?: AbortSignal };
type Operation203 = operations["list_plugins"];
type Operation203Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation203["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation204 = operations["list_provider_types"];
type Operation204Options = { signal?: AbortSignal };
type Operation205 = operations["list_runs"];
type Operation205Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation205["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation205["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation206 = operations["get_run"];
type Operation206Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation206["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation206["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation206DetailedOptions = Omit<Operation206Options, "query"> & {
  query?: Omit<
    NonNullable<Operation206["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed"; section?: null };
};
type Operation207 = operations["update_run"];
type Operation207Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation207["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation207["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation220 = operations["fork_run"];
type Operation220Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation220["parameters"]["header"]>["Idempotency-Key"]
  >;
  xWorkspaceId?: NonNullable<
    Operation220["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation222 = operations["interrupt_run"];
type Operation222Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation222["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation226 = operations["resume_run"];
type Operation226Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation226["parameters"]["header"]>["Idempotency-Key"]
  >;
  xWorkspaceId?: NonNullable<
    Operation226["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation208 = operations["get_run_agent"];
type Operation208Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation208["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation208["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation208DetailedOptions = Omit<Operation208Options, "query"> & {
  query?: Omit<
    NonNullable<Operation208["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed"; section?: null };
};
type Operation209 = operations["open_run_app"];
type Operation209Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation209["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation210 = operations["read_run_app_resource"];
type Operation210Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation210["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation211 = operations["call_run_app_tool"];
type Operation211Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation211["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation212 = operations["list_run_attempts"];
type Operation212Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation212["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation213 = operations["get_run_attempt"];
type Operation213Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation213["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation214 = operations["list_attempt_spans"];
type Operation214Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation214["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation214["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation214DetailedOptions = Omit<Operation214Options, "query"> & {
  query?: Omit<
    NonNullable<Operation214["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed" };
};
type Operation215 = operations["get_run_content"];
type Operation215Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation215["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation215["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation215DetailedOptions = Omit<Operation215Options, "query"> & {
  query?: Omit<
    NonNullable<Operation215["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed" };
};
type Operation216 = operations["get_assistance"];
type Operation216Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation216["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation217 = operations["get_control"];
type Operation217Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation217["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation218 = operations["open_control"];
type Operation218Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation218["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation219 = operations["open_view"];
type Operation219Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation219["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation221 = operations["run_image"];
type Operation221Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation221["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation223 = operations["list_run_items"];
type Operation223Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation223["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation223["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation223DetailedOptions = Omit<Operation223Options, "query"> & {
  query?: Omit<
    NonNullable<Operation223["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed" };
};
type Operation224 = operations["read_run_item_content"];
type Operation224Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation224["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation224["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation225 = operations["get_run_lineage"];
type Operation225Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation225["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation225["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation227 = operations["list_schedules"];
type Operation227Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation227["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation227["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation228 = operations["create_schedule"];
type Operation228Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation228["parameters"]["header"]>["Idempotency-Key"]
  >;
  xWorkspaceId?: NonNullable<
    Operation228["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation229 = operations["preview_schedule"];
type Operation229Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation229["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation230 = operations["archive_schedule"];
type Operation230Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation230["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation230["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation231 = operations["get_schedule"];
type Operation231Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation231["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation232 = operations["update_schedule"];
type Operation232Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation232["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation232["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation233 = operations["dispatch_schedule"];
type Operation233Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation233["parameters"]["header"]>["Idempotency-Key"]
  >;
  ifMatch: NonNullable<
    NonNullable<Operation233["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation233["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation234 = operations["enable_schedule"];
type Operation234Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation234["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation234["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation237 = operations["pause_schedule"];
type Operation237Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation237["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation237["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation235 = operations["list_schedule_occurrences"];
type Operation235Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation235["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation235["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation236 = operations["get_schedule_occurrence"];
type Operation236Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation236["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation236["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation238 = operations["get_schedule_status"];
type Operation238Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation238["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation239 = operations["list_sessions"];
type Operation239Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation239["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation239["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation240 = operations["create_session"];
type Operation240Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation240["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation241 = operations["get_session"];
type Operation241Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation241["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation242 = operations["update_session"];
type Operation242Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation242["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation242["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation243 = operations["get_message_authors"];
type Operation243Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation243["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation243["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation244 = operations["session_stream"];
type Operation244Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation244["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation245 = operations["list_session_threads"];
type Operation245Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation245["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation245["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation246 = operations["list_skills"];
type Operation246Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation246["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation246["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation247 = operations["create_skill"];
type Operation247Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation247["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation248 = operations["validate_skill"];
type Operation248Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation248["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation249 = operations["get_skill"];
type Operation249Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation249["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation250 = operations["update_skill"];
type Operation250Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation250["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation250["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation251 = operations["archive_skill"];
type Operation251Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation251["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation251["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation258 = operations["unarchive_skill"];
type Operation258Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation258["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation258["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation252 = operations["list_skill_revisions"];
type Operation252Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation252["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation252["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation253 = operations["create_skill_revision"];
type Operation253Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation253["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation253["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation254 = operations["get_skill_revision"];
type Operation254Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation254["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation257 = operations["set_default_skill_revision"];
type Operation257Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation257["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation257["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation255 = operations["read_skill_archive"];
type Operation255Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation255["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation256 = operations["read_skill_file"];
type Operation256Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation256["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation259 = operations["list_subscriptions"];
type Operation259Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation259["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation259["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation260 = operations["create_subscription"];
type Operation260Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation260["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation261 = operations["delete_subscription"];
type Operation261Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation261["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation261["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation262 = operations["get_subscription"];
type Operation262Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation262["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation263 = operations["update_subscription"];
type Operation263Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation263["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation263["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation264 = operations["list_deliveries"];
type Operation264Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation264["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation264["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation265 = operations["redeliver"];
type Operation265Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation265["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation266 = operations["list_threads"];
type Operation266Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation266["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation266["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation267 = operations["create_thread"];
type Operation267Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation267["parameters"]["header"]>["Idempotency-Key"]
  >;
  xWorkspaceId?: NonNullable<
    Operation267["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation268 = operations["get_thread"];
type Operation268Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation268["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation269 = operations["update_thread"];
type Operation269Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation269["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation269["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation270 = operations["archive_thread"];
type Operation270Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation270["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation270["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation271 = operations["get_binding"];
type Operation271Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation271["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation272 = operations["bind_browser"];
type Operation272Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation272["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation272["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation273 = operations["list_environment_mounts"];
type Operation273Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation273["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation274 = operations["add_environment_mount"];
type Operation274Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation274["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation274["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation275 = operations["remove_environment_mount"];
type Operation275Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation275["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation275["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation276 = operations["update_environment_mount"];
type Operation276Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation276["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation276["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation277 = operations["list_inbox"];
type Operation277Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation277["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation277["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation277DetailedOptions = Omit<Operation277Options, "query"> & {
  query?: Omit<
    NonNullable<Operation277["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed" };
};
type Operation278 = operations["submit_message"];
type Operation278Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation278["parameters"]["header"]>["Idempotency-Key"]
  >;
  xWorkspaceId?: NonNullable<
    Operation278["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation279 = operations["reorder_inbox"];
type Operation279Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation279["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation279["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation280 = operations["withdraw_entry"];
type Operation280Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation280["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation280["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation281 = operations["get_inbox_entry"];
type Operation281Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation281["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation281["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation281DetailedOptions = Omit<Operation281Options, "query"> & {
  query?: Omit<
    NonNullable<Operation281["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed"; section?: null };
};
type Operation282 = operations["edit_entry"];
type Operation282Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation282["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation282["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation283 = operations["list_memory_mounts"];
type Operation283Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation283["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation284 = operations["add_memory_mount"];
type Operation284Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation284["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation284["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation285 = operations["remove_memory_mount"];
type Operation285Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation285["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation285["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation286 = operations["update_memory_mount"];
type Operation286Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation286["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation286["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation287 = operations["list_thread_runs"];
type Operation287Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation287["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation287["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation288 = operations["thread_stream"];
type Operation288Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation288["parameters"]["query"]>;
  lastEventId?: NonNullable<
    Operation288["parameters"]["header"]
  >["Last-Event-ID"];
  xWorkspaceId?: NonNullable<
    Operation288["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation289 = operations["list_tool_executions"];
type Operation289Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation289["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation289["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation290 = operations["get_tool_execution"];
type Operation290Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation290["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation291 = operations["cancel_tool_execution"];
type Operation291Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation291["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation292 = operations["observe_tool_execution"];
type Operation292Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation292["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation293 = operations["get_tool_execution_result"];
type Operation293Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation293["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation293["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation294 = operations["list_toolsets"];
type Operation294Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation294["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation295 = operations["define_toolsets"];
type Operation295Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation295["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation295["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation296 = operations["index_toolsets"];
type Operation296Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation296["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation296["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation297 = operations["get_trace_backend"];
type Operation297Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation297["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation298 = operations["list_traces"];
type Operation298Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation298["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation298["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation298DetailedOptions = Omit<Operation298Options, "query"> & {
  query?: Omit<
    NonNullable<Operation298["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed" };
};
type Operation299 = operations["search_traces"];
type Operation299Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation299["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation299["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation300 = operations["get_trace"];
type Operation300Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation300["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation300["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation300DetailedOptions = Omit<Operation300Options, "query"> & {
  query?: Omit<
    NonNullable<Operation300["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed"; section?: null };
};
type Operation301 = operations["list_trace_spans"];
type Operation301Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation301["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation301["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation301DetailedOptions = Omit<Operation301Options, "query"> & {
  query?: Omit<
    NonNullable<Operation301["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed" };
};
type Operation302 = operations["get_trace_span"];
type Operation302Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation302["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation303 = operations["read_span_content"];
type Operation303Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation303["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation303["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation304 = operations["create_upload"];
type Operation304Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation304["parameters"]["header"]>["Idempotency-Key"]
  >;
  xWorkspaceId?: NonNullable<
    Operation304["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation305 = operations["summarize_usage"];
type Operation305Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation305["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation305["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation306 = operations["usage_agents"];
type Operation306Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation306["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation306["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation307 = operations["context_usage"];
type Operation307Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation307["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation307["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation308 = operations["list_usage_members"];
type Operation308Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation308["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation308["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation309 = operations["usage_models"];
type Operation309Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation309["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation309["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation310 = operations["usage_overview"];
type Operation310Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation310["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation310["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation311 = operations["model_request_metrics"];
type Operation311Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation311["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation312 = operations["list_run_usage"];
type Operation312Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation312["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation312["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation313 = operations["get_profile"];
type Operation313Options = { signal?: AbortSignal };
type Operation314 = operations["update_profile"];
type Operation314Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation314["parameters"]["header"]>["If-Match"]
  >;
};
type Operation318 = operations["disable_account"];
type Operation318Options = { signal?: AbortSignal };
type Operation324 = operations["change_password"];
type Operation324Options = { signal?: AbortSignal };
type Operation315 = operations["list_account_audit_events"];
type Operation315Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation315["parameters"]["query"]>;
};
type Operation316 = operations["delete_user_avatar"];
type Operation316Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation316["parameters"]["header"]>["If-Match"]
  >;
};
type Operation317 = operations["put_user_avatar"];
type Operation317Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation317["parameters"]["header"]>["If-Match"]
  >;
  contentType: "image/jpeg" | "image/png" | "image/webp";
};
type Operation319 = operations["list_user_keys"];
type Operation319Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation319["parameters"]["query"]>;
};
type Operation320 = operations["create_user_key"];
type Operation320Options = { signal?: AbortSignal };
type Operation321 = operations["revoke_user_key"];
type Operation321Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation321["parameters"]["header"]>["If-Match"]
  >;
};
type Operation322 = operations["list_login_sessions"];
type Operation322Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation322["parameters"]["query"]>;
};
type Operation323Options = { signal?: AbortSignal };
type Operation325Options = { signal?: AbortSignal };
type Operation326 = operations["list_web_providers"];
type Operation326Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation326["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation326["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation327 = operations["create_web_provider"];
type Operation327Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation327["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation328 = operations["delete_web_provider"];
type Operation328Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation328["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation328["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation329 = operations["get_web_provider"];
type Operation329Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation329["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation330 = operations["update_web_provider"];
type Operation330Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation330["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation330["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation331 = operations["test_web_provider"];
type Operation331Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation331["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation332 = operations["list_workspaces"];
type Operation332Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation332["parameters"]["query"]>;
};
type Operation333 = operations["get_workspace"];
type Operation333Options = { signal?: AbortSignal };
type Operation334 = operations["update_workspace"];
type Operation334Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation334["parameters"]["header"]>["If-Match"]
  >;
};
type Operation335 = operations["archive_workspace"];
type Operation335Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation335["parameters"]["header"]>["If-Match"]
  >;
};
type Operation336 = operations["list_workspace_audit_events"];
type Operation336Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation336["parameters"]["query"]>;
};
type Operation337 = operations["list_workspace_grants"];
type Operation337Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation337["parameters"]["query"]>;
};
type Operation338 = operations["create_workspace_grant"];
type Operation338Options = { signal?: AbortSignal };
type Operation339Options = { signal?: AbortSignal };
type Operation340 = operations["change_workspace_grant"];
type Operation340Options = { signal?: AbortSignal };
type Operation341 = operations["delete_workspace_icon"];
type Operation341Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation341["parameters"]["header"]>["If-Match"]
  >;
};
type Operation342Options = { signal?: AbortSignal };
type Operation343 = operations["put_workspace_icon"];
type Operation343Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation343["parameters"]["header"]>["If-Match"]
  >;
  contentType: "image/jpeg" | "image/png" | "image/webp";
};
type Operation344 = operations["list_workspace_invitations"];
type Operation344Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation344["parameters"]["query"]>;
};
type Operation345 = operations["create_workspace_invitation"];
type Operation345Options = { signal?: AbortSignal };
type Operation346 = operations["resend_workspace_invitation"];
type Operation346Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation346["parameters"]["header"]>["If-Match"]
  >;
};
type Operation347 = operations["revoke_workspace_invitation"];
type Operation347Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation347["parameters"]["header"]>["If-Match"]
  >;
};
type Operation348 = operations["list_workspace_keys"];
type Operation348Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation348["parameters"]["query"]>;
};
type Operation349 = operations["revoke_workspace_key"];
type Operation349Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation349["parameters"]["header"]>["If-Match"]
  >;
};
type Operation350 = operations["list_service_accounts"];
type Operation350Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation350["parameters"]["query"]>;
};
type Operation351 = operations["create_service_account"];
type Operation351Options = { signal?: AbortSignal };
type Operation352 = operations["delete_service_account"];
type Operation352Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation352["parameters"]["header"]>["If-Match"]
  >;
};
type Operation353 = operations["get_service_account"];
type Operation353Options = { signal?: AbortSignal };
type Operation354 = operations["update_service_account"];
type Operation354Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation354["parameters"]["header"]>["If-Match"]
  >;
};
type Operation355 = operations["list_service_account_keys"];
type Operation355Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation355["parameters"]["query"]>;
};
type Operation356 = operations["create_service_account_key"];
type Operation356Options = { signal?: AbortSignal };
type Operation357 = operations["health"];
type Operation357Options = { signal?: AbortSignal };
type Operation358 = operations["ready"];
type Operation358Options = { signal?: AbortSignal };
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
  get connections(): ConnectionsResource {
    return new ConnectionsResource(this.transport, "/api/v1/connections");
  }
  get connectorProviders(): ConnectorProvidersResource {
    return new ConnectorProvidersResource(
      this.transport,
      "/api/v1/connector-providers",
    );
  }
  get desktopAssistance(): DesktopAssistanceResource {
    return new DesktopAssistanceResource(
      this.transport,
      "/api/v1/desktop-assistance",
    );
  }
  get devices(): DevicesResource {
    return new DevicesResource(this.transport, "/api/v1/devices");
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
    options: Operation109Options = {},
  ): Promise<
    ResourceResult<
      Operation109["responses"][200]["content"]["application/json"]
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
  /** POST /api/v1/browsers/{browser_id}/takeover. Preserves response metadata; mutations are not replayed. */
  takeover(
    body: NonNullable<
      Operation44["requestBody"]
    >["content"]["application/json"],
    options: Operation44Options,
  ): Promise<
    ResourceResult<Operation44["responses"][200]["content"]["application/json"]>
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
    options: Operation45Options = {},
  ): Promise<
    ResourceResult<Operation45["responses"][200]["content"]["application/json"]>
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
    options: Operation46Options = {},
  ): Promise<
    ResourceResult<Operation46["responses"][200]["content"]["application/json"]>
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
  get(options: Operation48Options = {}): Promise<BinaryResult> {
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

export class ConnectionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/connections. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation49Options = {},
  ): Promise<
    ResourceResult<Operation49["responses"][200]["content"]["application/json"]>
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
  pages(options: Operation49Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation49["responses"][200]["content"]["application/json"],
      Operation49["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation49Options = {}) {
    return flattenPages<
      Operation49["responses"][200]["content"]["application/json"],
      Operation49["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/connections. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation50["requestBody"]
    >["content"]["application/json"],
    options: Operation50Options = {},
  ): Promise<
    ResourceResult<Operation50["responses"][201]["content"]["application/json"]>
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
    options: Operation51Options,
  ): Promise<
    ResourceResult<Operation51["responses"][200]["content"]["application/json"]>
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
    options: Operation52Options = {},
  ): Promise<
    ResourceResult<Operation52["responses"][200]["content"]["application/json"]>
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
  /** PATCH /api/v1/connections/{connection_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation54["requestBody"]
    >["content"]["application/json"],
    options: Operation54Options,
  ): Promise<
    ResourceResult<Operation54["responses"][200]["content"]["application/json"]>
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
      Operation55["requestBody"]
    >["content"]["application/json"],
    options: Operation55Options,
  ): Promise<
    ResourceResult<Operation55["responses"][200]["content"]["application/json"]>
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
    options: Operation56Options,
  ): Promise<
    ResourceResult<Operation56["responses"][200]["content"]["application/json"]>
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
    options: Operation57Options = {},
  ): Promise<
    ResourceResult<Operation57["responses"][200]["content"]["application/json"]>
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
    options: Operation59Options,
  ): Promise<
    ResourceResult<Operation59["responses"][200]["content"]["application/json"]>
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
    options: Operation60Options = {},
  ): Promise<
    ResourceResult<Operation60["responses"][200]["content"]["application/json"]>
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
  pages(options: Operation60Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation60["responses"][200]["content"]["application/json"],
      Operation60["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation60Options = {}) {
    return flattenPages<
      Operation60["responses"][200]["content"]["application/json"],
      Operation60["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation61Options = {},
  ): Promise<
    ResourceResult<Operation61["responses"][200]["content"]["application/json"]>
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
  pages(options: Operation61Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation61["responses"][200]["content"]["application/json"],
      Operation61["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation61Options = {}) {
    return flattenPages<
      Operation61["responses"][200]["content"]["application/json"],
      Operation61["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/connector-providers. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation62["requestBody"]
    >["content"]["application/json"],
    options: Operation62Options = {},
  ): Promise<
    ResourceResult<Operation62["responses"][201]["content"]["application/json"]>
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
  delete(options: Operation63Options): Promise<ResourceResult<undefined>> {
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
  /** PATCH /api/v1/connector-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation65["requestBody"]
    >["content"]["application/json"],
    options: Operation65Options,
  ): Promise<
    ResourceResult<Operation65["responses"][200]["content"]["application/json"]>
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
    options: Operation71Options = {},
  ): Promise<
    ResourceResult<Operation71["responses"][200]["content"]["application/json"]>
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
    options: Operation66Options = {},
  ): Promise<
    ResourceResult<Operation66["responses"][200]["content"]["application/json"]>
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
  pages(options: Operation66Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation66["responses"][200]["content"]["application/json"],
      Operation66["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation66Options = {}) {
    return flattenPages<
      Operation66["responses"][200]["content"]["application/json"],
      Operation66["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation68Options = {},
  ): Promise<
    ResourceResult<Operation68["responses"][200]["content"]["application/json"]>
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
    options: Operation69Options,
  ): Promise<
    ResourceResult<Operation69["responses"][200]["content"]["application/json"]>
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
    options: Operation70Options = {},
  ): Promise<
    ResourceResult<Operation70["responses"][200]["content"]["application/json"]>
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
  pages(options: Operation70Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation70["responses"][200]["content"]["application/json"],
      Operation70["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation70Options = {}) {
    return flattenPages<
      Operation70["responses"][200]["content"]["application/json"],
      Operation70["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class DesktopAssistanceResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  ref(
    value: operations["complete_assistance"]["parameters"]["path"]["assistance_id"],
  ): DesktopAssistanceAssistanceIdResource {
    return new DesktopAssistanceAssistanceIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class DesktopAssistanceAssistanceIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** POST /api/v1/desktop-assistance/{assistance_id}/complete. Preserves response metadata; mutations are not replayed. */
  complete(
    body: NonNullable<
      Operation72["requestBody"]
    >["content"]["application/json"],
    options: Operation72Options = {},
  ): Promise<
    ResourceResult<Operation72["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/complete",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/desktop-assistance/{assistance_id}/control. Preserves response metadata; mutations are not replayed. */
  control(
    body: NonNullable<
      Operation73["requestBody"]
    >["content"]["application/json"],
    options: Operation73Options = {},
  ): Promise<
    ResourceResult<Operation73["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/control",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
  /** POST /api/v1/desktop-assistance/{assistance_id}/disconnect. Preserves response metadata; mutations are not replayed. */
  disconnect(
    body: NonNullable<
      Operation74["requestBody"]
    >["content"]["application/json"],
    options: Operation74Options = {},
  ): Promise<
    ResourceResult<Operation74["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/disconnect",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/desktop-assistance/{assistance_id}/request-control. Preserves response metadata; mutations are not replayed. */
  requestControl(
    options: Operation75Options = {},
  ): Promise<
    ResourceResult<Operation75["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/request-control",
      undefined,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/desktop-assistance/{assistance_id}/view. Preserves response metadata; mutations are not replayed. */
  view(
    body: NonNullable<
      Operation76["requestBody"]
    >["content"]["application/json"],
    options: Operation76Options = {},
  ): Promise<
    ResourceResult<Operation76["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/view",
      body,
      Object.fromEntries(
        Object.entries({ "X-Workspace-ID": options.xWorkspaceId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal, query: options.query },
    );
  }
}

export class DevicesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/devices. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation77Options = {},
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
  pages(options: Operation77Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation77["responses"][200]["content"]["application/json"],
      Operation77["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation77Options = {}) {
    return flattenPages<
      Operation77["responses"][200]["content"]["application/json"],
      Operation77["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/devices. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation78["requestBody"]
    >["content"]["application/json"],
    options: Operation78Options = {},
  ): Promise<
    ResourceResult<Operation78["responses"][201]["content"]["application/json"]>
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
  delete(options: Operation79Options): Promise<ResourceResult<undefined>> {
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
    options: Operation80Options = {},
  ): Promise<
    ResourceResult<Operation80["responses"][200]["content"]["application/json"]>
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
      Operation81["requestBody"]
    >["content"]["application/json"],
    options: Operation81Options,
  ): Promise<
    ResourceResult<Operation81["responses"][200]["content"]["application/json"]>
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
    options: Operation83Options,
  ): Promise<
    ResourceResult<Operation83["responses"][200]["content"]["application/json"]>
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
      Operation82["requestBody"]
    >["content"]["application/json"],
    options: Operation82Options = {},
  ): Promise<
    ResourceResult<Operation82["responses"][200]["content"]["application/json"]>
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

export class EnvironmentProviderOptionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** POST /api/v1/environment-provider-options/vercel. Preserves response metadata; mutations are not replayed. */
  vercel(
    body: NonNullable<
      Operation84["requestBody"]
    >["content"]["application/json"],
    options: Operation84Options = {},
  ): Promise<
    ResourceResult<Operation84["responses"][200]["content"]["application/json"]>
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
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation85Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation85["responses"][200]["content"]["application/json"],
      Operation85["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation85Options = {}) {
    return flattenPages<
      Operation85["responses"][200]["content"]["application/json"],
      Operation85["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/environment-providers. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation86["requestBody"]
    >["content"]["application/json"],
    options: Operation86Options = {},
  ): Promise<
    ResourceResult<Operation86["responses"][201]["content"]["application/json"]>
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
  delete(options: Operation87Options): Promise<ResourceResult<undefined>> {
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
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/environment-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation89["requestBody"]
    >["content"]["application/json"],
    options: Operation89Options,
  ): Promise<
    ResourceResult<Operation89["responses"][200]["content"]["application/json"]>
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
    options: Operation91Options = {},
  ): Promise<
    ResourceResult<Operation91["responses"][200]["content"]["application/json"]>
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
    options: Operation92Options = {},
  ): Promise<
    ResourceResult<Operation92["responses"][200]["content"]["application/json"]>
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
  pages(options: Operation92Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation92["responses"][200]["content"]["application/json"],
      Operation92["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation92Options = {}) {
    return flattenPages<
      Operation92["responses"][200]["content"]["application/json"],
      Operation92["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/environment-templates. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation93["requestBody"]
    >["content"]["application/json"],
    options: Operation93Options = {},
  ): Promise<
    ResourceResult<Operation93["responses"][201]["content"]["application/json"]>
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
    options: Operation94Options = {},
  ): Promise<
    ResourceResult<Operation94["responses"][200]["content"]["application/json"]>
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
      Operation95["requestBody"]
    >["content"]["application/json"],
    options: Operation95Options,
  ): Promise<
    ResourceResult<Operation95["responses"][200]["content"]["application/json"]>
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
    options: Operation96Options = {},
  ): Promise<
    ResourceResult<Operation96["responses"][200]["content"]["application/json"]>
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
  pages(options: Operation96Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation96["responses"][200]["content"]["application/json"],
      Operation96["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation96Options = {}) {
    return flattenPages<
      Operation96["responses"][200]["content"]["application/json"],
      Operation96["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/environments. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation97["requestBody"]
    >["content"]["application/json"],
    options: Operation97Options = {},
  ): Promise<
    ResourceResult<Operation97["responses"][201]["content"]["application/json"]>
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
    options: Operation98Options,
  ): Promise<
    ResourceResult<Operation98["responses"][202]["content"]["application/json"]>
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
  /** PATCH /api/v1/environments/{environment_id}. Preserves response metadata; mutations are not replayed. */
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
  get desktopPreview(): EnvironmentsEnvironmentIdDesktopPreviewResource {
    return new EnvironmentsEnvironmentIdDesktopPreviewResource(
      this.transport,
      this.path + "/desktop-preview",
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
    options: Operation107Options,
  ): Promise<
    ResourceResult<
      Operation107["responses"][202]["content"]["application/json"]
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
    options: Operation108Options,
  ): Promise<
    ResourceResult<
      Operation108["responses"][202]["content"]["application/json"]
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
    options: Operation101Options = {},
  ): Promise<
    ResourceResult<
      Operation101["responses"][200]["content"]["application/json"]
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
  get(options: Operation103Options = {}): Promise<BinaryResult> {
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

export class EnvironmentsEnvironmentIdMetricsBindingResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** PUT /api/v1/environments/{environment_id}/metrics-binding. Preserves response metadata; mutations are not replayed. */
  replace(
    body: NonNullable<
      Operation104["requestBody"]
    >["content"]["application/json"],
    options: Operation104Options,
  ): Promise<
    ResourceResult<
      Operation104["responses"][200]["content"]["application/json"]
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
      Operation106["requestBody"]
    >["content"]["application/json"],
    options: Operation106Options = {},
  ): Promise<
    ResourceResult<
      Operation106["responses"][200]["content"]["application/json"]
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
    options: Operation105Options = {},
  ): Promise<
    ResourceResult<
      Operation105["responses"][200]["content"]["application/json"]
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
    options: Operation110Options = {},
  ): Promise<
    ResourceResult<
      Operation110["responses"][200]["content"]["application/json"]
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
  pages(options: Operation110Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation110["responses"][200]["content"]["application/json"],
      Operation110["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation110Options = {}) {
    return flattenPages<
      Operation110["responses"][200]["content"]["application/json"],
      Operation110["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/finding-analyses. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation111["requestBody"]
    >["content"]["application/json"],
    options: Operation111Options,
  ): Promise<
    ResourceResult<
      Operation111["responses"][201]["content"]["application/json"]
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
    options: Operation112Options = {},
  ): Promise<
    ResourceResult<
      Operation112["responses"][200]["content"]["application/json"]
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
  pages(options: Operation112Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation112["responses"][200]["content"]["application/json"],
      Operation112["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation112Options = {}) {
    return flattenPages<
      Operation112["responses"][200]["content"]["application/json"],
      Operation112["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/findings. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation113["requestBody"]
    >["content"]["application/json"],
    options: Operation113Options = {},
  ): Promise<
    ResourceResult<
      Operation113["responses"][201]["content"]["application/json"]
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
    options: Operation114Options = {},
  ): Promise<
    ResourceResult<
      Operation114["responses"][200]["content"]["application/json"]
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
      Operation115["requestBody"]
    >["content"]["application/json"],
    options: Operation115Options,
  ): Promise<
    ResourceResult<
      Operation115["responses"][200]["content"]["application/json"]
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
      Operation116["requestBody"]
    >["content"]["application/json"],
    options: Operation116Options = {},
  ): Promise<
    ResourceResult<
      Operation116["responses"][200]["content"]["application/json"]
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
    options: Operation117Options = {},
  ): Promise<
    ResourceResult<
      Operation117["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
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
}

export class MediaUnderstandingDefaultsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/media-understanding-defaults. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation118Options = {},
  ): Promise<
    ResourceResult<
      Operation118["responses"][200]["content"]["application/json"]
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
      Operation119["requestBody"]
    >["content"]["application/json"],
    options: Operation119Options,
  ): Promise<
    ResourceResult<
      Operation119["responses"][200]["content"]["application/json"]
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
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation120Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation120["responses"][200]["content"]["application/json"],
      Operation120["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation120Options = {}) {
    return flattenPages<
      Operation120["responses"][200]["content"]["application/json"],
      Operation120["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/memories. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation121["requestBody"]
    >["content"]["application/json"],
    options: Operation121Options = {},
  ): Promise<
    ResourceResult<
      Operation121["responses"][201]["content"]["application/json"]
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
    value: operations["delete_memory"]["parameters"]["path"]["memory_id"],
  ): MemoriesMemoryIdResource {
    return new MemoriesMemoryIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class MemoriesMemoryIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/memories/{memory_id}. Preserves response metadata; mutations are not replayed. */
  delete(options: Operation122Options): Promise<ResourceResult<undefined>> {
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
  /** PATCH /api/v1/memories/{memory_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation124["requestBody"]
    >["content"]["application/json"],
    options: Operation124Options,
  ): Promise<
    ResourceResult<
      Operation124["responses"][200]["content"]["application/json"]
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
    options: Operation125Options = {},
  ): Promise<
    ResourceResult<
      Operation125["responses"][200]["content"]["application/json"]
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
  pages(options: Operation125Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation125["responses"][200]["content"]["application/json"],
      Operation125["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation125Options = {}) {
    return flattenPages<
      Operation125["responses"][200]["content"]["application/json"],
      Operation125["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/memories/{memory_id}/files. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation126["requestBody"]
    >["content"]["application/json"],
    options: Operation126Options = {},
  ): Promise<
    ResourceResult<
      Operation126["responses"][201]["content"]["application/json"]
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
      Operation127["requestBody"]
    >["content"]["application/json"],
    options: Operation127Options,
  ): Promise<
    ResourceResult<
      Operation127["responses"][200]["content"]["application/json"]
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
  delete(options: Operation128Options): Promise<ResourceResult<undefined>> {
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
    options: Operation129Options = {},
  ): Promise<
    ResourceResult<
      Operation129["responses"][200]["content"]["application/json"]
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
      Operation130["requestBody"]
    >["content"]["application/json"],
    options: Operation130Options,
  ): Promise<
    ResourceResult<
      Operation130["responses"][200]["content"]["application/json"]
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
    options: Operation131Options = {},
  ): Promise<
    ResourceResult<
      Operation131["responses"][200]["content"]["application/json"]
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
  pages(options: Operation131Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation131["responses"][200]["content"]["application/json"],
      Operation131["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation131Options = {}) {
    return flattenPages<
      Operation131["responses"][200]["content"]["application/json"],
      Operation131["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/memories/{memory_id}/records. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation132["requestBody"]
    >["content"]["application/json"],
    options: Operation132Options = {},
  ): Promise<
    ResourceResult<
      Operation132["responses"][201]["content"]["application/json"]
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
      Operation133["requestBody"]
    >["content"]["application/json"],
    options: Operation133Options = {},
  ): Promise<
    ResourceResult<
      Operation133["responses"][200]["content"]["application/json"]
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
    options: Operation134Options = {},
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
      Operation135["requestBody"]
    >["content"]["application/json"],
    options: Operation135Options = {},
  ): Promise<
    ResourceResult<
      Operation135["responses"][200]["content"]["application/json"]
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
    options: Operation136Options,
  ): Promise<
    ResourceResult<
      Operation136["responses"][200]["content"]["application/json"]
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
    options: Operation137Options = {},
  ): Promise<
    ResourceResult<
      Operation137["responses"][200]["content"]["application/json"]
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
  pages(options: Operation137Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation137["responses"][200]["content"]["application/json"],
      Operation137["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation137Options = {}) {
    return flattenPages<
      Operation137["responses"][200]["content"]["application/json"],
      Operation137["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation138Options = {},
  ): Promise<
    ResourceResult<
      Operation138["responses"][200]["content"]["application/json"]
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
    options: Operation139Options = {},
  ): Promise<
    ResourceResult<
      Operation139["responses"][200]["content"]["application/json"]
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

export class MemoryProvidersResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/memory-providers. Preserves response metadata; mutations are not replayed. */
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
  /** POST /api/v1/memory-providers. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation141["requestBody"]
    >["content"]["application/json"],
    options: Operation141Options = {},
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
  delete(options: Operation142Options): Promise<ResourceResult<undefined>> {
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
    options: Operation143Options = {},
  ): Promise<
    ResourceResult<
      Operation143["responses"][200]["content"]["application/json"]
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
      Operation144["requestBody"]
    >["content"]["application/json"],
    options: Operation144Options,
  ): Promise<
    ResourceResult<
      Operation144["responses"][200]["content"]["application/json"]
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
    options: Operation145Options = {},
  ): Promise<
    ResourceResult<
      Operation145["responses"][200]["content"]["application/json"]
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
    options: Operation146Options = {},
  ): Promise<
    ResourceResult<
      Operation146["responses"][200]["content"]["application/json"]
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
  pages(options: Operation146Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation146["responses"][200]["content"]["application/json"],
      Operation146["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation146Options = {}) {
    return flattenPages<
      Operation146["responses"][200]["content"]["application/json"],
      Operation146["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/memory-spaces. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation147["requestBody"]
    >["content"]["application/json"],
    options: Operation147Options = {},
  ): Promise<
    ResourceResult<
      Operation147["responses"][201]["content"]["application/json"]
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
  delete(options: Operation148Options): Promise<ResourceResult<undefined>> {
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
    options: Operation149Options = {},
  ): Promise<
    ResourceResult<
      Operation149["responses"][200]["content"]["application/json"]
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
      Operation150["requestBody"]
    >["content"]["application/json"],
    options: Operation150Options,
  ): Promise<
    ResourceResult<
      Operation150["responses"][200]["content"]["application/json"]
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
    options: Operation151Options = {},
  ): Promise<
    ResourceResult<
      Operation151["responses"][200]["content"]["application/json"]
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
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation152Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation152["responses"][200]["content"]["application/json"],
      Operation152["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation152Options = {}) {
    return flattenPages<
      Operation152["responses"][200]["content"]["application/json"],
      Operation152["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/memory-spaces/{space_id}/organizations. Preserves response metadata; mutations are not replayed. */
  create(
    options: Operation153Options = {},
  ): Promise<
    ResourceResult<
      Operation153["responses"][202]["content"]["application/json"]
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
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation154Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation154["responses"][200]["content"]["application/json"],
      Operation154["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation154Options = {}) {
    return flattenPages<
      Operation154["responses"][200]["content"]["application/json"],
      Operation154["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation155Options = {},
  ): Promise<
    ResourceResult<
      Operation155["responses"][200]["content"]["application/json"]
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
  pages(options: Operation155Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation155["responses"][200]["content"]["application/json"],
      Operation155["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation155Options = {}) {
    return flattenPages<
      Operation155["responses"][200]["content"]["application/json"],
      Operation155["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/metrics-dashboards. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation156["requestBody"]
    >["content"]["application/json"],
    options: Operation156Options = {},
  ): Promise<
    ResourceResult<
      Operation156["responses"][201]["content"]["application/json"]
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
    options: Operation157Options = {},
  ): Promise<
    ResourceResult<
      Operation157["responses"][200]["content"]["application/json"]
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
  delete(options: Operation158Options): Promise<ResourceResult<undefined>> {
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
    options: Operation159Options = {},
  ): Promise<
    ResourceResult<
      Operation159["responses"][200]["content"]["application/json"]
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
      Operation160["requestBody"]
    >["content"]["application/json"],
    options: Operation160Options,
  ): Promise<
    ResourceResult<
      Operation160["responses"][200]["content"]["application/json"]
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
    options: Operation161Options = {},
  ): Promise<
    ResourceResult<
      Operation161["responses"][200]["content"]["application/json"]
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
  pages(options: Operation161Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation161["responses"][200]["content"]["application/json"],
      Operation161["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation161Options = {}) {
    return flattenPages<
      Operation161["responses"][200]["content"]["application/json"],
      Operation161["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/metrics-data-sources. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation162["requestBody"]
    >["content"]["application/json"],
    options: Operation162Options = {},
  ): Promise<
    ResourceResult<
      Operation162["responses"][201]["content"]["application/json"]
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
    options: Operation163Options = {},
  ): Promise<
    ResourceResult<
      Operation163["responses"][200]["content"]["application/json"]
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
  delete(options: Operation165Options): Promise<ResourceResult<undefined>> {
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
    options: Operation166Options = {},
  ): Promise<
    ResourceResult<
      Operation166["responses"][200]["content"]["application/json"]
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
      Operation167["requestBody"]
    >["content"]["application/json"],
    options: Operation167Options,
  ): Promise<
    ResourceResult<
      Operation167["responses"][200]["content"]["application/json"]
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
    options?: Operation169DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["ModelCatalog"]>>;
  list(
    options: Operation169Options,
  ): Promise<
    ResourceResult<
      Operation169["responses"][200]["content"]["application/json"]
    >
  >;
  list(
    options: Operation169Options = {},
  ): Promise<
    ResourceResult<
      Operation169["responses"][200]["content"]["application/json"]
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
  /** POST /api/v1/model-providers. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation171["requestBody"]
    >["content"]["application/json"],
    options: Operation171Options = {},
  ): Promise<
    ResourceResult<
      Operation171["responses"][201]["content"]["application/json"]
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
  delete(options: Operation172Options): Promise<ResourceResult<undefined>> {
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
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/model-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation174["requestBody"]
    >["content"]["application/json"],
    options: Operation174Options,
  ): Promise<
    ResourceResult<
      Operation174["responses"][200]["content"]["application/json"]
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
      Operation178["requestBody"]
    >["content"]["application/json"],
    options: Operation178Options = {},
  ): Promise<
    ResourceResult<
      Operation178["responses"][200]["content"]["application/json"]
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
    options: Operation180Options = {},
  ): Promise<
    ResourceResult<
      Operation180["responses"][200]["content"]["application/json"]
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
    options: Operation175Options = {},
  ): Promise<
    ResourceResult<
      Operation175["responses"][200]["content"]["application/json"]
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
  /** POST /api/v1/model-providers/{provider_id}/authorization/callback. Preserves response metadata; mutations are not replayed. */
  callback(
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
    options: Operation179Options = {},
  ): Promise<
    ResourceResult<
      Operation179["responses"][200]["content"]["application/json"]
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
    options: Operation181Options = {},
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
  pages(options: Operation181Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation181["responses"][200]["content"]["application/json"],
      Operation181["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation181Options = {}) {
    return flattenPages<
      Operation181["responses"][200]["content"]["application/json"],
      Operation181["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/models. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation182["requestBody"]
    >["content"]["application/json"],
    options: Operation182Options = {},
  ): Promise<
    ResourceResult<
      Operation182["responses"][201]["content"]["application/json"]
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
    options: Operation183Options = {},
  ): Promise<
    ResourceResult<
      Operation183["responses"][200]["content"]["application/json"]
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
      Operation184["requestBody"]
    >["content"]["application/json"],
    options: Operation184Options,
  ): Promise<
    ResourceResult<
      Operation184["responses"][200]["content"]["application/json"]
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
    options: Operation185Options = {},
  ): Promise<
    ResourceResult<
      Operation185["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation185Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation185["responses"][200]["content"]["application/json"],
      Operation185["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation185Options = {}) {
    return flattenPages<
      Operation185["responses"][200]["content"]["application/json"],
      Operation185["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation186Options = {},
  ): Promise<
    ResourceResult<
      Operation186["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/organizations/{organization_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation187["requestBody"]
    >["content"]["application/json"],
    options: Operation187Options,
  ): Promise<
    ResourceResult<
      Operation187["responses"][200]["content"]["application/json"]
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

export class OrganizationsOrganizationIdAuditEventsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/audit-events. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation188Options = {},
  ): Promise<
    ResourceResult<
      Operation188["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
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
}

export class OrganizationsOrganizationIdGrantsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/grants. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation189Options = {},
  ): Promise<
    ResourceResult<
      Operation189["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation189Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation189["responses"][200]["content"]["application/json"],
      Operation189["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation189Options = {}) {
    return flattenPages<
      Operation189["responses"][200]["content"]["application/json"],
      Operation189["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/organizations/{organization_id}/grants. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation190["requestBody"]
    >["content"]["application/json"],
    options: Operation190Options = {},
  ): Promise<
    ResourceResult<
      Operation190["responses"][201]["content"]["application/json"]
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
    options: Operation191Options = {},
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
      Operation192["requestBody"]
    >["content"]["application/json"],
    options: Operation192Options = {},
  ): Promise<
    ResourceResult<
      Operation192["responses"][200]["content"]["application/json"]
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
    options: Operation193Options,
  ): Promise<
    ResourceResult<
      Operation193["responses"][200]["content"]["application/json"]
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
  get(options: Operation194Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal },
      headers: undefined,
      accept: "image/jpeg, image/png, image/webp",
    });
  }
  /** PUT /api/v1/organizations/{organization_id}/icon. Preserves response metadata; mutations are not replayed. */
  replace(
    body: Binary,
    options: Operation195Options,
  ): Promise<
    ResourceResult<
      Operation195["responses"][200]["content"]["application/json"]
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
    options: Operation196Options = {},
  ): Promise<
    ResourceResult<
      Operation196["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
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
  /** POST /api/v1/organizations/{organization_id}/invitations. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation197["requestBody"]
    >["content"]["application/json"],
    options: Operation197Options = {},
  ): Promise<
    ResourceResult<
      Operation197["responses"][201]["content"]["application/json"]
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
    options: Operation198Options,
  ): Promise<
    ResourceResult<
      Operation198["responses"][200]["content"]["application/json"]
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
    options: Operation199Options,
  ): Promise<
    ResourceResult<
      Operation199["responses"][200]["content"]["application/json"]
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
    options: Operation200Options = {},
  ): Promise<
    ResourceResult<
      Operation200["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation200Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation200["responses"][200]["content"]["application/json"],
      Operation200["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation200Options = {}) {
    return flattenPages<
      Operation200["responses"][200]["content"]["application/json"],
      Operation200["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation201Options = {},
  ): Promise<
    ResourceResult<
      Operation201["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation201Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation201["responses"][200]["content"]["application/json"],
      Operation201["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation201Options = {}) {
    return flattenPages<
      Operation201["responses"][200]["content"]["application/json"],
      Operation201["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/organizations/{organization_id}/workspaces. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation202["requestBody"]
    >["content"]["application/json"],
    options: Operation202Options = {},
  ): Promise<
    ResourceResult<
      Operation202["responses"][201]["content"]["application/json"]
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
    options: Operation204Options = {},
  ): Promise<
    ResourceResult<
      Operation204["responses"][200]["content"]["application/json"]
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
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation205Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation205["responses"][200]["content"]["application/json"],
      Operation205["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation205Options = {}) {
    return flattenPages<
      Operation205["responses"][200]["content"]["application/json"],
      Operation205["responses"][200]["content"]["application/json"]["items"][number]
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
    options?: Operation206DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["RunView"]>>;
  get(
    options: Operation206Options,
  ): Promise<
    ResourceResult<
      Operation206["responses"][200]["content"]["application/json"]
    >
  >;
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
      { signal: options.signal, query: options.query },
    );
  }
  /** PATCH /api/v1/runs/{run_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation207["requestBody"]
    >["content"]["application/json"],
    options: Operation207Options,
  ): Promise<
    ResourceResult<
      Operation207["responses"][200]["content"]["application/json"]
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
  get desktopAssistance(): RunsRunIdDesktopAssistanceResource {
    return new RunsRunIdDesktopAssistanceResource(
      this.transport,
      this.path + "/desktop-assistance",
    );
  }
  get desktopControl(): RunsRunIdDesktopControlResource {
    return new RunsRunIdDesktopControlResource(
      this.transport,
      this.path + "/desktop-control",
    );
  }
  /** POST /api/v1/runs/{run_id}/fork. Preserves response metadata; mutations are not replayed. */
  fork(
    body: NonNullable<
      Operation220["requestBody"]
    >["content"]["application/json"],
    options: Operation220Options,
  ): Promise<
    ResourceResult<
      | Operation220["responses"][200]["content"]["application/json"]
      | Operation220["responses"][201]["content"]["application/json"]
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
    options: Operation222Options = {},
  ): Promise<
    ResourceResult<
      Operation222["responses"][200]["content"]["application/json"]
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
      Operation226["requestBody"]
    >["content"]["application/json"],
    options: Operation226Options,
  ): Promise<
    ResourceResult<
      | Operation226["responses"][200]["content"]["application/json"]
      | Operation226["responses"][201]["content"]["application/json"]
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
    options?: Operation208DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["RunAgent"]>>;
  get(
    options: Operation208Options,
  ): Promise<
    ResourceResult<
      Operation208["responses"][200]["content"]["application/json"]
    >
  >;
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
    options: Operation209Options = {},
  ): Promise<
    ResourceResult<
      Operation209["responses"][200]["content"]["application/json"]
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
      Operation211["requestBody"]
    >["content"]["application/json"],
    options: Operation211Options = {},
  ): Promise<
    ResourceResult<
      Operation211["responses"][200]["content"]["application/json"]
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
    options: Operation213Options = {},
  ): Promise<
    ResourceResult<
      Operation213["responses"][200]["content"]["application/json"]
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
    options?: Operation214DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["SpanPage"]>>;
  list(
    options: Operation214Options,
  ): Promise<
    ResourceResult<
      Operation214["responses"][200]["content"]["application/json"]
    >
  >;
  list(
    options: Operation214Options = {},
  ): Promise<
    ResourceResult<
      Operation214["responses"][200]["content"]["application/json"]
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
  pages(options: Operation214Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation214["responses"][200]["content"]["application/json"],
      Operation214["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation214Options = {}) {
    return flattenPages<
      Operation214["responses"][200]["content"]["application/json"],
      Operation214["responses"][200]["content"]["application/json"]["items"][number]
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
    options?: Operation215DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["RunContent"]>>;
  get(
    options: Operation215Options,
  ): Promise<
    ResourceResult<
      Operation215["responses"][200]["content"]["application/json"]
    >
  >;
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
      { signal: options.signal, query: options.query },
    );
  }
}

export class RunsRunIdDesktopAssistanceResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  ref(
    value: operations["get_assistance"]["parameters"]["path"]["call_id"],
  ): RunsRunIdDesktopAssistanceCallIdResource {
    return new RunsRunIdDesktopAssistanceCallIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class RunsRunIdDesktopAssistanceCallIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/runs/{run_id}/desktop-assistance/{call_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation216Options = {},
  ): Promise<
    ResourceResult<
      Operation216["responses"][200]["content"]["application/json"]
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

export class RunsRunIdDesktopControlResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/runs/{run_id}/desktop-control. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation217Options = {},
  ): Promise<
    ResourceResult<
      Operation217["responses"][200]["content"]["application/json"]
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
  /** POST /api/v1/runs/{run_id}/desktop-control. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation218["requestBody"]
    >["content"]["application/json"],
    options: Operation218Options = {},
  ): Promise<
    ResourceResult<
      Operation218["responses"][200]["content"]["application/json"]
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
  /** POST /api/v1/runs/{run_id}/desktop-control/view. Preserves response metadata; mutations are not replayed. */
  view(
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
      this.path + "/view",
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
  get(options: Operation221Options = {}): Promise<BinaryResult> {
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
    options?: Operation223DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["RunItems"]>>;
  get(
    options: Operation223Options,
  ): Promise<
    ResourceResult<
      Operation223["responses"][200]["content"]["application/json"]
    >
  >;
  get(
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
    options: Operation224Options,
  ): Promise<
    ResourceResult<
      Operation224["responses"][200]["content"]["application/json"]
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
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation225Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation225["responses"][200]["content"]["application/json"],
      Operation225["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation225Options = {}) {
    return flattenPages<
      Operation225["responses"][200]["content"]["application/json"],
      Operation225["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation227Options = {},
  ): Promise<
    ResourceResult<
      Operation227["responses"][200]["content"]["application/json"]
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
  /** POST /api/v1/schedules. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation228["requestBody"]
    >["content"]["application/json"],
    options: Operation228Options,
  ): Promise<
    ResourceResult<
      Operation228["responses"][201]["content"]["application/json"]
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
      Operation229["requestBody"]
    >["content"]["application/json"],
    options: Operation229Options = {},
  ): Promise<
    ResourceResult<
      Operation229["responses"][200]["content"]["application/json"]
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
  delete(options: Operation230Options): Promise<ResourceResult<undefined>> {
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
    options: Operation231Options = {},
  ): Promise<
    ResourceResult<
      Operation231["responses"][200]["content"]["application/json"]
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
      Operation232["requestBody"]
    >["content"]["application/json"],
    options: Operation232Options,
  ): Promise<
    ResourceResult<
      Operation232["responses"][200]["content"]["application/json"]
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
      Operation233["requestBody"]
    >["content"]["application/json"],
    options: Operation233Options,
  ): Promise<
    ResourceResult<
      Operation233["responses"][202]["content"]["application/json"]
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
      Operation234["requestBody"]
    >["content"]["application/json"],
    options: Operation234Options,
  ): Promise<
    ResourceResult<
      Operation234["responses"][200]["content"]["application/json"]
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
      Operation237["requestBody"]
    >["content"]["application/json"],
    options: Operation237Options,
  ): Promise<
    ResourceResult<
      Operation237["responses"][200]["content"]["application/json"]
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
    options: Operation235Options = {},
  ): Promise<
    ResourceResult<
      Operation235["responses"][200]["content"]["application/json"]
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
  pages(options: Operation235Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation235["responses"][200]["content"]["application/json"],
      Operation235["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation235Options = {}) {
    return flattenPages<
      Operation235["responses"][200]["content"]["application/json"],
      Operation235["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation236Options = {},
  ): Promise<
    ResourceResult<
      Operation236["responses"][200]["content"]["application/json"]
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
    options: Operation238Options = {},
  ): Promise<
    ResourceResult<
      Operation238["responses"][200]["content"]["application/json"]
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
    options: Operation239Options = {},
  ): Promise<
    ResourceResult<
      Operation239["responses"][200]["content"]["application/json"]
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
  pages(options: Operation239Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation239["responses"][200]["content"]["application/json"],
      Operation239["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation239Options = {}) {
    return flattenPages<
      Operation239["responses"][200]["content"]["application/json"],
      Operation239["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/sessions. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation240["requestBody"]
    >["content"]["application/json"],
    options: Operation240Options = {},
  ): Promise<
    ResourceResult<
      Operation240["responses"][201]["content"]["application/json"]
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
    options: Operation241Options = {},
  ): Promise<
    ResourceResult<
      Operation241["responses"][200]["content"]["application/json"]
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
      Operation242["requestBody"]
    >["content"]["application/json"],
    options: Operation242Options,
  ): Promise<
    ResourceResult<
      Operation242["responses"][200]["content"]["application/json"]
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
    options: Operation243Options,
  ): Promise<
    ResourceResult<
      Operation243["responses"][200]["content"]["application/json"]
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
  get(options: Operation244Options = {}): Promise<BinaryResult> {
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
    options: Operation245Options = {},
  ): Promise<
    ResourceResult<
      Operation245["responses"][200]["content"]["application/json"]
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
}

export class SkillsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/skills. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation246Options = {},
  ): Promise<
    ResourceResult<
      Operation246["responses"][200]["content"]["application/json"]
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
  pages(options: Operation246Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation246["responses"][200]["content"]["application/json"],
      Operation246["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation246Options = {}) {
    return flattenPages<
      Operation246["responses"][200]["content"]["application/json"],
      Operation246["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/skills. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation247["requestBody"]
    >["content"]["application/json"],
    options: Operation247Options = {},
  ): Promise<
    ResourceResult<
      Operation247["responses"][201]["content"]["application/json"]
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
      Operation248["requestBody"]
    >["content"]["application/json"],
    options: Operation248Options = {},
  ): Promise<
    ResourceResult<
      Operation248["responses"][200]["content"]["application/json"]
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
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/skills/{skill_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation250["requestBody"]
    >["content"]["application/json"],
    options: Operation250Options,
  ): Promise<
    ResourceResult<
      Operation250["responses"][200]["content"]["application/json"]
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
    options: Operation251Options,
  ): Promise<
    ResourceResult<
      Operation251["responses"][200]["content"]["application/json"]
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
    options: Operation258Options,
  ): Promise<
    ResourceResult<
      Operation258["responses"][200]["content"]["application/json"]
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
  pages(options: Operation252Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation252["responses"][200]["content"]["application/json"],
      Operation252["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation252Options = {}) {
    return flattenPages<
      Operation252["responses"][200]["content"]["application/json"],
      Operation252["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/skills/{skill_id}/revisions. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation253["requestBody"]
    >["content"]["application/json"],
    options: Operation253Options,
  ): Promise<
    ResourceResult<
      Operation253["responses"][201]["content"]["application/json"]
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
    options: Operation254Options = {},
  ): Promise<
    ResourceResult<
      Operation254["responses"][200]["content"]["application/json"]
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
    options: Operation257Options,
  ): Promise<
    ResourceResult<
      Operation257["responses"][200]["content"]["application/json"]
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
  get(options: Operation255Options = {}): Promise<BinaryResult> {
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
  get(options: Operation256Options = {}): Promise<BinaryResult> {
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
  pages(options: Operation259Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation259["responses"][200]["content"]["application/json"],
      Operation259["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation259Options = {}) {
    return flattenPages<
      Operation259["responses"][200]["content"]["application/json"],
      Operation259["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/subscriptions. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation260["requestBody"]
    >["content"]["application/json"],
    options: Operation260Options = {},
  ): Promise<
    ResourceResult<
      Operation260["responses"][201]["content"]["application/json"]
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
  delete(options: Operation261Options): Promise<ResourceResult<undefined>> {
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
    options: Operation262Options = {},
  ): Promise<
    ResourceResult<
      Operation262["responses"][200]["content"]["application/json"]
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
      Operation263["requestBody"]
    >["content"]["application/json"],
    options: Operation263Options,
  ): Promise<
    ResourceResult<
      Operation263["responses"][200]["content"]["application/json"]
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
    options: Operation264Options = {},
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
  pages(options: Operation264Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation264["responses"][200]["content"]["application/json"],
      Operation264["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation264Options = {}) {
    return flattenPages<
      Operation264["responses"][200]["content"]["application/json"],
      Operation264["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation265Options = {},
  ): Promise<
    ResourceResult<
      Operation265["responses"][200]["content"]["application/json"]
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
    options: Operation266Options = {},
  ): Promise<
    ResourceResult<
      Operation266["responses"][200]["content"]["application/json"]
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
  pages(options: Operation266Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation266["responses"][200]["content"]["application/json"],
      Operation266["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation266Options = {}) {
    return flattenPages<
      Operation266["responses"][200]["content"]["application/json"],
      Operation266["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/threads. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation267["requestBody"]
    >["content"]["application/json"],
    options: Operation267Options,
  ): Promise<
    ResourceResult<
      | Operation267["responses"][200]["content"]["application/json"]
      | Operation267["responses"][201]["content"]["application/json"]
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
    options: Operation268Options = {},
  ): Promise<
    ResourceResult<
      Operation268["responses"][200]["content"]["application/json"]
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
      Operation269["requestBody"]
    >["content"]["application/json"],
    options: Operation269Options,
  ): Promise<
    ResourceResult<
      Operation269["responses"][200]["content"]["application/json"]
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
    options: Operation270Options,
  ): Promise<
    ResourceResult<
      Operation270["responses"][200]["content"]["application/json"]
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
  /** PUT /api/v1/threads/{thread_id}/browser. Preserves response metadata; mutations are not replayed. */
  replace(
    body:
      | NonNullable<Operation272["requestBody"]>["content"]["application/json"]
      | undefined,
    options: Operation272Options,
  ): Promise<
    ResourceResult<
      Operation272["responses"][200]["content"]["application/json"]
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
    options: Operation273Options = {},
  ): Promise<
    ResourceResult<
      Operation273["responses"][200]["content"]["application/json"]
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
      Operation274["requestBody"]
    >["content"]["application/json"],
    options: Operation274Options,
  ): Promise<
    ResourceResult<
      Operation274["responses"][201]["content"]["application/json"]
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
  delete(options: Operation275Options): Promise<ResourceResult<undefined>> {
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
      Operation276["requestBody"]
    >["content"]["application/json"],
    options: Operation276Options,
  ): Promise<
    ResourceResult<
      Operation276["responses"][200]["content"]["application/json"]
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
    options?: Operation277DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["EntryPage"]>>;
  list(
    options: Operation277Options,
  ): Promise<
    ResourceResult<
      Operation277["responses"][200]["content"]["application/json"]
    >
  >;
  list(
    options: Operation277Options = {},
  ): Promise<
    ResourceResult<
      Operation277["responses"][200]["content"]["application/json"]
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
  pages(options: Operation277Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation277["responses"][200]["content"]["application/json"],
      Operation277["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation277Options = {}) {
    return flattenPages<
      Operation277["responses"][200]["content"]["application/json"],
      Operation277["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/threads/{thread_id}/inbox. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation278["requestBody"]
    >["content"]["application/json"],
    options: Operation278Options,
  ): Promise<
    ResourceResult<
      | Operation278["responses"][200]["content"]["application/json"]
      | Operation278["responses"][201]["content"]["application/json"]
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
      Operation279["requestBody"]
    >["content"]["application/json"],
    options: Operation279Options,
  ): Promise<
    ResourceResult<
      Operation279["responses"][200]["content"]["application/json"]
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
    options: Operation280Options,
  ): Promise<
    ResourceResult<
      Operation280["responses"][200]["content"]["application/json"]
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
    options?: Operation281DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["EntryView"]>>;
  get(
    options: Operation281Options,
  ): Promise<
    ResourceResult<
      Operation281["responses"][200]["content"]["application/json"]
    >
  >;
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
      { signal: options.signal, query: options.query },
    );
  }
  /** PATCH /api/v1/threads/{thread_id}/inbox/{entry_id}. Preserves response metadata; mutations are not replayed. */
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
}

export class ThreadsThreadIdMemoriesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/threads/{thread_id}/memories. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation283Options = {},
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
      { signal: options.signal },
    );
  }
  /** POST /api/v1/threads/{thread_id}/memories. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation284["requestBody"]
    >["content"]["application/json"],
    options: Operation284Options,
  ): Promise<
    ResourceResult<
      Operation284["responses"][201]["content"]["application/json"]
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
  delete(options: Operation285Options): Promise<ResourceResult<undefined>> {
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
      Operation286["requestBody"]
    >["content"]["application/json"],
    options: Operation286Options,
  ): Promise<
    ResourceResult<
      Operation286["responses"][200]["content"]["application/json"]
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
    options: Operation287Options = {},
  ): Promise<
    ResourceResult<
      Operation287["responses"][200]["content"]["application/json"]
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
  pages(options: Operation287Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation287["responses"][200]["content"]["application/json"],
      Operation287["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation287Options = {}) {
    return flattenPages<
      Operation287["responses"][200]["content"]["application/json"],
      Operation287["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class ThreadsThreadIdStreamResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/threads/{thread_id}/stream. Caller owns and closes the unbuffered body. */
  get(options: Operation288Options = {}): Promise<BinaryResult> {
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
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation289Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation289["responses"][200]["content"]["application/json"],
      Operation289["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation289Options = {}) {
    return flattenPages<
      Operation289["responses"][200]["content"]["application/json"],
      Operation289["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation290Options = {},
  ): Promise<
    ResourceResult<
      Operation290["responses"][200]["content"]["application/json"]
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
    options: Operation291Options = {},
  ): Promise<
    ResourceResult<
      Operation291["responses"][202]["content"]["application/json"]
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
    options: Operation293Options = {},
  ): Promise<
    ResourceResult<
      Operation293["responses"][200]["content"]["application/json"]
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
    options: Operation295Options,
  ): Promise<
    ResourceResult<
      Operation295["responses"][200]["content"]["application/json"]
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
    options: Operation296Options = {},
  ): Promise<
    ResourceResult<
      Operation296["responses"][200]["content"]["application/json"]
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
  pages(options: Operation296Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation296["responses"][200]["content"]["application/json"],
      Operation296["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation296Options = {}) {
    return flattenPages<
      Operation296["responses"][200]["content"]["application/json"],
      Operation296["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation297Options = {},
  ): Promise<
    ResourceResult<
      Operation297["responses"][200]["content"]["application/json"]
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
    options?: Operation298DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["SpanPage"]>>;
  list(
    options: Operation298Options,
  ): Promise<
    ResourceResult<
      Operation298["responses"][200]["content"]["application/json"]
    >
  >;
  list(
    options: Operation298Options = {},
  ): Promise<
    ResourceResult<
      Operation298["responses"][200]["content"]["application/json"]
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
  pages(options: Operation298Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation298["responses"][200]["content"]["application/json"],
      Operation298["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation298Options = {}) {
    return flattenPages<
      Operation298["responses"][200]["content"]["application/json"],
      Operation298["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation299Options,
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
  pages(options: Operation299Options) {
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
  items(options: Operation299Options) {
    return flattenPages<
      Operation299["responses"][200]["content"]["application/json"],
      Operation299["responses"][200]["content"]["application/json"]["items"][number]
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
    options?: Operation300DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["Span"]>>;
  get(
    options: Operation300Options,
  ): Promise<
    ResourceResult<
      Operation300["responses"][200]["content"]["application/json"]
    >
  >;
  get(
    options: Operation300Options = {},
  ): Promise<
    ResourceResult<
      Operation300["responses"][200]["content"]["application/json"]
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
    options?: Operation301DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["SpanPage"]>>;
  list(
    options: Operation301Options,
  ): Promise<
    ResourceResult<
      Operation301["responses"][200]["content"]["application/json"]
    >
  >;
  list(
    options: Operation301Options = {},
  ): Promise<
    ResourceResult<
      Operation301["responses"][200]["content"]["application/json"]
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
  pages(options: Operation301Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation301["responses"][200]["content"]["application/json"],
      Operation301["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation301Options = {}) {
    return flattenPages<
      Operation301["responses"][200]["content"]["application/json"],
      Operation301["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation303Options = {},
  ): Promise<
    ResourceResult<
      Operation303["responses"][200]["content"]["application/json"]
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
      Operation304["requestBody"]
    >["content"]["multipart/form-data"],
    options: Operation304Options,
  ): Promise<
    ResourceResult<
      Operation304["responses"][200]["content"]["application/json"]
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
    options: Operation305Options = {},
  ): Promise<
    ResourceResult<
      Operation305["responses"][200]["content"]["application/json"]
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
}

export class UsageAgentsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/usage/agents. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation306Options,
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
  pages(options: Operation306Options) {
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
  items(options: Operation306Options) {
    return flattenPages<
      Operation306["responses"][200]["content"]["application/json"],
      Operation306["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation307Options = {},
  ): Promise<
    ResourceResult<
      Operation307["responses"][200]["content"]["application/json"]
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
    options: Operation308Options,
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
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation308Options) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation308["responses"][200]["content"]["application/json"],
      Operation308["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation308Options) {
    return flattenPages<
      Operation308["responses"][200]["content"]["application/json"],
      Operation308["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation309Options,
  ): Promise<
    ResourceResult<
      Operation309["responses"][200]["content"]["application/json"]
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
  pages(options: Operation309Options) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation309["responses"][200]["content"]["application/json"],
      Operation309["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation309Options) {
    return flattenPages<
      Operation309["responses"][200]["content"]["application/json"],
      Operation309["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation310Options,
  ): Promise<
    ResourceResult<
      Operation310["responses"][200]["content"]["application/json"]
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
}

export class UsageRunsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/usage/runs. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation312Options = {},
  ): Promise<
    ResourceResult<
      Operation312["responses"][200]["content"]["application/json"]
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
  pages(options: Operation312Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation312["responses"][200]["content"]["application/json"],
      Operation312["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation312Options = {}) {
    return flattenPages<
      Operation312["responses"][200]["content"]["application/json"],
      Operation312["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation313Options = {},
  ): Promise<
    ResourceResult<
      Operation313["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/users/me. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation314["requestBody"]
    >["content"]["application/json"],
    options: Operation314Options,
  ): Promise<
    ResourceResult<
      Operation314["responses"][200]["content"]["application/json"]
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
      Operation318["requestBody"]
    >["content"]["application/json"],
    options: Operation318Options = {},
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
      Operation324["requestBody"]
    >["content"]["application/json"],
    options: Operation324Options = {},
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
    options: Operation315Options = {},
  ): Promise<
    ResourceResult<
      Operation315["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation315Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation315["responses"][200]["content"]["application/json"],
      Operation315["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation315Options = {}) {
    return flattenPages<
      Operation315["responses"][200]["content"]["application/json"],
      Operation315["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation316Options,
  ): Promise<
    ResourceResult<
      Operation316["responses"][200]["content"]["application/json"]
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
    options: Operation317Options,
  ): Promise<
    ResourceResult<
      Operation317["responses"][200]["content"]["application/json"]
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
    options: Operation319Options = {},
  ): Promise<
    ResourceResult<
      Operation319["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation319Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation319["responses"][200]["content"]["application/json"],
      Operation319["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation319Options = {}) {
    return flattenPages<
      Operation319["responses"][200]["content"]["application/json"],
      Operation319["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/users/me/keys. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation320["requestBody"]
    >["content"]["application/json"],
    options: Operation320Options = {},
  ): Promise<
    ResourceResult<
      Operation320["responses"][201]["content"]["application/json"]
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
    options: Operation321Options,
  ): Promise<
    ResourceResult<
      Operation321["responses"][200]["content"]["application/json"]
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
    options: Operation322Options = {},
  ): Promise<
    ResourceResult<
      Operation322["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation322Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation322["responses"][200]["content"]["application/json"],
      Operation322["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation322Options = {}) {
    return flattenPages<
      Operation322["responses"][200]["content"]["application/json"],
      Operation322["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation323Options = {},
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
  get(options: Operation325Options = {}): Promise<BinaryResult> {
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
    options: Operation326Options = {},
  ): Promise<
    ResourceResult<
      Operation326["responses"][200]["content"]["application/json"]
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
  pages(options: Operation326Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation326["responses"][200]["content"]["application/json"],
      Operation326["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation326Options = {}) {
    return flattenPages<
      Operation326["responses"][200]["content"]["application/json"],
      Operation326["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/web-providers. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation327["requestBody"]
    >["content"]["application/json"],
    options: Operation327Options = {},
  ): Promise<
    ResourceResult<
      Operation327["responses"][201]["content"]["application/json"]
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
  delete(options: Operation328Options): Promise<ResourceResult<undefined>> {
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
    options: Operation329Options = {},
  ): Promise<
    ResourceResult<
      Operation329["responses"][200]["content"]["application/json"]
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
      Operation330["requestBody"]
    >["content"]["application/json"],
    options: Operation330Options,
  ): Promise<
    ResourceResult<
      Operation330["responses"][200]["content"]["application/json"]
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
    options: Operation331Options = {},
  ): Promise<
    ResourceResult<
      Operation331["responses"][200]["content"]["application/json"]
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
    options: Operation332Options = {},
  ): Promise<
    ResourceResult<
      Operation332["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation332Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation332["responses"][200]["content"]["application/json"],
      Operation332["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation332Options = {}) {
    return flattenPages<
      Operation332["responses"][200]["content"]["application/json"],
      Operation332["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation333Options = {},
  ): Promise<
    ResourceResult<
      Operation333["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/workspaces/{workspace_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation334["requestBody"]
    >["content"]["application/json"],
    options: Operation334Options,
  ): Promise<
    ResourceResult<
      Operation334["responses"][200]["content"]["application/json"]
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
    options: Operation335Options,
  ): Promise<
    ResourceResult<
      Operation335["responses"][200]["content"]["application/json"]
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
    options: Operation336Options = {},
  ): Promise<
    ResourceResult<
      Operation336["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation336Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation336["responses"][200]["content"]["application/json"],
      Operation336["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation336Options = {}) {
    return flattenPages<
      Operation336["responses"][200]["content"]["application/json"],
      Operation336["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation337Options = {},
  ): Promise<
    ResourceResult<
      Operation337["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation337Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation337["responses"][200]["content"]["application/json"],
      Operation337["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation337Options = {}) {
    return flattenPages<
      Operation337["responses"][200]["content"]["application/json"],
      Operation337["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/grants. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation338["requestBody"]
    >["content"]["application/json"],
    options: Operation338Options = {},
  ): Promise<
    ResourceResult<
      Operation338["responses"][201]["content"]["application/json"]
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
    options: Operation339Options = {},
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
      Operation340["requestBody"]
    >["content"]["application/json"],
    options: Operation340Options = {},
  ): Promise<
    ResourceResult<
      Operation340["responses"][200]["content"]["application/json"]
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
    options: Operation341Options,
  ): Promise<
    ResourceResult<
      Operation341["responses"][200]["content"]["application/json"]
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
  get(options: Operation342Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal },
      headers: undefined,
      accept: "image/jpeg, image/png, image/webp",
    });
  }
  /** PUT /api/v1/workspaces/{workspace_id}/icon. Preserves response metadata; mutations are not replayed. */
  replace(
    body: Binary,
    options: Operation343Options,
  ): Promise<
    ResourceResult<
      Operation343["responses"][200]["content"]["application/json"]
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
    options: Operation344Options = {},
  ): Promise<
    ResourceResult<
      Operation344["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation344Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation344["responses"][200]["content"]["application/json"],
      Operation344["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation344Options = {}) {
    return flattenPages<
      Operation344["responses"][200]["content"]["application/json"],
      Operation344["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/invitations. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation345["requestBody"]
    >["content"]["application/json"],
    options: Operation345Options = {},
  ): Promise<
    ResourceResult<
      Operation345["responses"][201]["content"]["application/json"]
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
    options: Operation346Options,
  ): Promise<
    ResourceResult<
      Operation346["responses"][200]["content"]["application/json"]
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
    options: Operation347Options,
  ): Promise<
    ResourceResult<
      Operation347["responses"][200]["content"]["application/json"]
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
    options: Operation348Options = {},
  ): Promise<
    ResourceResult<
      Operation348["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation348Options = {}) {
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
  items(options: Operation348Options = {}) {
    return flattenPages<
      Operation348["responses"][200]["content"]["application/json"],
      Operation348["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation349Options,
  ): Promise<
    ResourceResult<
      Operation349["responses"][200]["content"]["application/json"]
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
    options: Operation350Options = {},
  ): Promise<
    ResourceResult<
      Operation350["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation350Options = {}) {
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
  items(options: Operation350Options = {}) {
    return flattenPages<
      Operation350["responses"][200]["content"]["application/json"],
      Operation350["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/service-accounts. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation351["requestBody"]
    >["content"]["application/json"],
    options: Operation351Options = {},
  ): Promise<
    ResourceResult<
      Operation351["responses"][201]["content"]["application/json"]
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
    options: Operation352Options,
  ): Promise<
    ResourceResult<
      Operation352["responses"][200]["content"]["application/json"]
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
    options: Operation353Options = {},
  ): Promise<
    ResourceResult<
      Operation353["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/workspaces/{workspace_id}/service-accounts/{account_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation354["requestBody"]
    >["content"]["application/json"],
    options: Operation354Options,
  ): Promise<
    ResourceResult<
      Operation354["responses"][200]["content"]["application/json"]
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
    options: Operation355Options = {},
  ): Promise<
    ResourceResult<
      Operation355["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation355Options = {}) {
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
  items(options: Operation355Options = {}) {
    return flattenPages<
      Operation355["responses"][200]["content"]["application/json"],
      Operation355["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/service-accounts/{account_id}/keys. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation356["requestBody"]
    >["content"]["application/json"],
    options: Operation356Options = {},
  ): Promise<
    ResourceResult<
      Operation356["responses"][201]["content"]["application/json"]
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
    options: Operation357Options = {},
  ): Promise<
    ResourceResult<
      Operation357["responses"][200]["content"]["application/json"]
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
    options: Operation358Options = {},
  ): Promise<
    ResourceResult<
      Operation358["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
}
