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
type Operation110 = operations["prepare_finding_agent"];
type Operation110Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation110["parameters"]["header"]
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
type Operation50 = operations["list_connections"];
type Operation50Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation50["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation50["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation51 = operations["create_connection"];
type Operation51Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation51["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation52 = operations["complete_authorization"];
type Operation52Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation52["parameters"]["query"]>;
};
type Operation53 = operations["get_redirect_uri"];
type Operation53Options = { signal?: AbortSignal };
type Operation54 = operations["get_connection"];
type Operation54Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation54["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation55 = operations["update_connection"];
type Operation55Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation55["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation55["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation56 = operations["authorize_connection"];
type Operation56Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation56["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation56["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation57 = operations["revoke_connection"];
type Operation57Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation57["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation57["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation58 = operations["test_connection"];
type Operation58Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation58["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation59 = operations["list_connection_tools"];
type Operation59Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation59["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation60 = operations["define_connection_tools"];
type Operation60Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation60["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation60["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation61 = operations["index_connection_tools"];
type Operation61Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation61["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation61["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation62 = operations["list_connector_providers"];
type Operation62Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation62["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation62["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation63 = operations["create_connector_provider"];
type Operation63Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation63["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation64 = operations["delete_connector_provider"];
type Operation64Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation64["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation64["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation65 = operations["get_connector_provider"];
type Operation65Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation65["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation66 = operations["update_connector_provider"];
type Operation66Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation66["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation66["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation72 = operations["test_connector_provider"];
type Operation72Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation72["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation67 = operations["list_connector_apps"];
type Operation67Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation67["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation67["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation68 = operations["get_connector_app"];
type Operation68Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation68["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation69 = operations["list_connector_actions"];
type Operation69Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation69["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation70 = operations["define_connector_actions"];
type Operation70Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation70["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation70["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation71 = operations["index_connector_actions"];
type Operation71Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation71["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation71["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation73 = operations["list_devices"];
type Operation73Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation73["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation73["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation74 = operations["create_device"];
type Operation74Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation74["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation75 = operations["delete_device"];
type Operation75Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation75["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation75["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation76 = operations["get_device"];
type Operation76Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation76["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation77 = operations["update_device"];
type Operation77Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation77["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation77["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation79 = operations["rotate_device_credential"];
type Operation79Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation79["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation79["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation78 = operations["query_device_metrics"];
type Operation78Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation78["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation80 = operations["vercel_provider_options"];
type Operation80Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation80["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation81 = operations["list_environment_providers"];
type Operation81Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation81["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation81["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation82 = operations["create_environment_provider"];
type Operation82Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation82["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation83 = operations["delete_environment_provider"];
type Operation83Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation83["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation83["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation84 = operations["get_environment_provider"];
type Operation84Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation84["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation85 = operations["update_environment_provider"];
type Operation85Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation85["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation85["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation87 = operations["test_environment_provider"];
type Operation87Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation87["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation86 = operations["environment_provider_references"];
type Operation86Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation86["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation88 = operations["list_environment_templates"];
type Operation88Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation88["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation88["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation89 = operations["create_environment_template"];
type Operation89Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation89["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation90 = operations["get_environment_template"];
type Operation90Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation90["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation91 = operations["update_environment_template"];
type Operation91Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation91["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation91["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation92 = operations["list_environments"];
type Operation92Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation92["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation92["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation93 = operations["create_environment"];
type Operation93Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation93["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation94 = operations["delete_environment"];
type Operation94Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation94["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation94["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation95 = operations["get_environment"];
type Operation95Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation95["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation96 = operations["update_environment"];
type Operation96Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation96["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation96["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation104 = operations["open_desktop_viewer"];
type Operation104Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation104["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation108 = operations["retry_environment_creation"];
type Operation108Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation108["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation108["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation109 = operations["stop_environment"];
type Operation109Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation109["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation109["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation97 = operations["check_computer"];
type Operation97Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation97["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation98 = operations["get_environment_creation"];
type Operation98Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation98["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation99 = operations["get_desktop_control"];
type Operation99Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation99["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation100 = operations["return_desktop_control"];
type Operation100Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation100["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation100["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation101 = operations["renew_desktop_control"];
type Operation101Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation101["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation102 = operations["take_over_desktop"];
type Operation102Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation102["parameters"]["header"]>["If-Match"]
  >;
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
type Operation105 = operations["select_metrics_source"];
type Operation105Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation105["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation105["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation107 = operations["query_environment_metrics"];
type Operation107Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation107["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation106 = operations["get_collector_status"];
type Operation106Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation106["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation111 = operations["list_finding_analyses"];
type Operation111Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation111["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation111["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation112 = operations["start_analysis"];
type Operation112Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation112["parameters"]["header"]>["Idempotency-Key"]
  >;
  xWorkspaceId?: NonNullable<
    Operation112["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation113 = operations["list_findings"];
type Operation113Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation113["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation113["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation114 = operations["create_finding"];
type Operation114Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation114["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation115 = operations["get_finding"];
type Operation115Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation115["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation116 = operations["update_finding"];
type Operation116Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation116["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation116["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation117 = operations["accept"];
type Operation117Options = { signal?: AbortSignal };
type Operation118 = operations["list_mcp_servers"];
type Operation118Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation118["parameters"]["query"]>;
};
type Operation119 = operations["get_media_defaults"];
type Operation119Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation119["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation120 = operations["replace_media_defaults"];
type Operation120Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation120["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation120["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation121 = operations["list_memories"];
type Operation121Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation121["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation121["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation122 = operations["create_memory"];
type Operation122Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation122["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation123 = operations["delete_memory"];
type Operation123Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation123["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation123["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation124 = operations["get_memory"];
type Operation124Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation124["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation125 = operations["update_memory"];
type Operation125Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation125["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation125["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation126 = operations["list_files"];
type Operation126Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation126["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation126["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation127 = operations["create_file"];
type Operation127Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation127["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation128 = operations["move_file"];
type Operation128Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation128["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation128["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation129 = operations["delete_file"];
type Operation129Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation129["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation129["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation130 = operations["read_file"];
type Operation130Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation130["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation131 = operations["replace_file"];
type Operation131Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation131["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation131["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation132 = operations["list_records"];
type Operation132Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation132["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation132["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation133 = operations["add_record"];
type Operation133Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation133["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation134 = operations["search_records"];
type Operation134Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation134["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation135 = operations["delete_record"];
type Operation135Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation135["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation136 = operations["update_record"];
type Operation136Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation136["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation137 = operations["purge_history"];
type Operation137Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation137["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation137["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation138 = operations["list_memory_revisions"];
type Operation138Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation138["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation138["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation139 = operations["get_memory_revision"];
type Operation139Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation139["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation140 = operations["restore_memory_revision"];
type Operation140Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation140["parameters"]["header"]>["If-Match"];
  xWorkspaceId?: NonNullable<
    Operation140["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation141 = operations["list_memory_providers"];
type Operation141Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation141["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation141["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation142 = operations["create_memory_provider"];
type Operation142Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation142["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation143 = operations["delete_memory_provider"];
type Operation143Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation143["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation143["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation144 = operations["get_memory_provider"];
type Operation144Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation144["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation145 = operations["update_memory_provider"];
type Operation145Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation145["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation145["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation146 = operations["test_memory_provider"];
type Operation146Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation146["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation147 = operations["list_spaces"];
type Operation147Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation147["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation147["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation148 = operations["create_space"];
type Operation148Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation148["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation149 = operations["delete_space"];
type Operation149Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation149["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation149["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation150 = operations["get_space"];
type Operation150Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation150["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation151 = operations["update_space"];
type Operation151Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation151["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation151["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation152 = operations["get_space_organization"];
type Operation152Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation152["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation153 = operations["list_space_organizations"];
type Operation153Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation153["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation153["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation154 = operations["organize_space"];
type Operation154Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation154["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation155 = operations["list_space_sessions"];
type Operation155Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation155["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation155["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation156 = operations["list_dashboards"];
type Operation156Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation156["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation156["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation157 = operations["create_dashboard"];
type Operation157Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation157["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation158 = operations["get_dashboard_preset"];
type Operation158Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation158["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation159 = operations["delete_dashboard"];
type Operation159Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation159["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation159["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation160 = operations["get_dashboard"];
type Operation160Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation160["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation161 = operations["update_dashboard"];
type Operation161Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation161["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation161["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation162 = operations["list_metrics_data_sources"];
type Operation162Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation162["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation162["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation163 = operations["create_metrics_data_source"];
type Operation163Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation163["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation164 = operations["get_metrics_capabilities"];
type Operation164Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation164["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation165 = operations["get_metrics_deployment_preset"];
type Operation165Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation165["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation166 = operations["delete_metrics_data_source"];
type Operation166Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation166["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation166["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation167 = operations["get_metrics_data_source"];
type Operation167Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation167["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation168 = operations["update_metrics_data_source"];
type Operation168Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation168["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation168["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation169 = operations["query_metrics_data_source"];
type Operation169Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation169["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation170 = operations["get_model_catalog"];
type Operation170Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation170["parameters"]["query"]>;
};
type Operation170DetailedOptions = Omit<Operation170Options, "query"> & {
  query?: Omit<
    NonNullable<Operation170["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed"; section?: null };
};
type Operation171 = operations["list_model_providers"];
type Operation171Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation171["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation171["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation172 = operations["create_model_provider"];
type Operation172Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation172["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation173 = operations["delete_model_provider"];
type Operation173Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation173["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation173["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation174 = operations["get_model_provider"];
type Operation174Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation174["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation175 = operations["update_model_provider"];
type Operation175Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation175["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation175["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation179 = operations["authorize_model"];
type Operation179Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation179["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation181 = operations["test_model_provider"];
type Operation181Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation181["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation176 = operations["disconnect_model_authorization"];
type Operation176Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation176["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation177 = operations["model_authorization"];
type Operation177Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation177["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation178 = operations["complete_model_authorization"];
type Operation178Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation178["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation180 = operations["discover_model_provider_models"];
type Operation180Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation180["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation182 = operations["list_models"];
type Operation182Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation182["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation182["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation183 = operations["create_model"];
type Operation183Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation183["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation184 = operations["get_model"];
type Operation184Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation184["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation185 = operations["update_model"];
type Operation185Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation185["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation185["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation186 = operations["list_organizations"];
type Operation186Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation186["parameters"]["query"]>;
};
type Operation187 = operations["get_organization"];
type Operation187Options = { signal?: AbortSignal };
type Operation188 = operations["update_organization"];
type Operation188Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation188["parameters"]["header"]>["If-Match"]
  >;
};
type Operation189 = operations["list_organization_audit_events"];
type Operation189Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation189["parameters"]["query"]>;
};
type Operation190 = operations["list_organization_grants"];
type Operation190Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation190["parameters"]["query"]>;
};
type Operation191 = operations["create_organization_grant"];
type Operation191Options = { signal?: AbortSignal };
type Operation192Options = { signal?: AbortSignal };
type Operation193 = operations["change_organization_grant"];
type Operation193Options = { signal?: AbortSignal };
type Operation194 = operations["delete_organization_icon"];
type Operation194Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation194["parameters"]["header"]>["If-Match"]
  >;
};
type Operation195Options = { signal?: AbortSignal };
type Operation196 = operations["put_organization_icon"];
type Operation196Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation196["parameters"]["header"]>["If-Match"]
  >;
  contentType: "image/jpeg" | "image/png" | "image/webp";
};
type Operation197 = operations["list_organization_invitations"];
type Operation197Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation197["parameters"]["query"]>;
};
type Operation198 = operations["create_organization_invitation"];
type Operation198Options = { signal?: AbortSignal };
type Operation199 = operations["resend_organization_invitation"];
type Operation199Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation199["parameters"]["header"]>["If-Match"]
  >;
};
type Operation200 = operations["revoke_organization_invitation"];
type Operation200Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation200["parameters"]["header"]>["If-Match"]
  >;
};
type Operation201 = operations["list_members"];
type Operation201Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation201["parameters"]["query"]>;
};
type Operation202 = operations["list_organization_workspaces"];
type Operation202Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation202["parameters"]["query"]>;
};
type Operation203 = operations["create_workspace"];
type Operation203Options = { signal?: AbortSignal };
type Operation204 = operations["list_plugins"];
type Operation204Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation204["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation205 = operations["list_provider_types"];
type Operation205Options = { signal?: AbortSignal };
type Operation206 = operations["list_runs"];
type Operation206Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation206["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation206["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation207 = operations["get_run"];
type Operation207Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation207["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation207["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation207DetailedOptions = Omit<Operation207Options, "query"> & {
  query?: Omit<
    NonNullable<Operation207["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed"; section?: null };
};
type Operation208 = operations["update_run"];
type Operation208Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation208["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation208["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation217 = operations["fork_run"];
type Operation217Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation217["parameters"]["header"]>["Idempotency-Key"]
  >;
  xWorkspaceId?: NonNullable<
    Operation217["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation219 = operations["interrupt_run"];
type Operation219Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation219["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation223 = operations["resume_run"];
type Operation223Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation223["parameters"]["header"]>["Idempotency-Key"]
  >;
  xWorkspaceId?: NonNullable<
    Operation223["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation209 = operations["get_run_agent"];
type Operation209Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation209["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation209["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation209DetailedOptions = Omit<Operation209Options, "query"> & {
  query?: Omit<
    NonNullable<Operation209["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed"; section?: null };
};
type Operation210 = operations["open_run_app"];
type Operation210Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation210["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation211 = operations["read_run_app_resource"];
type Operation211Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation211["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation212 = operations["call_run_app_tool"];
type Operation212Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation212["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation213 = operations["list_run_attempts"];
type Operation213Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation213["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation214 = operations["get_run_attempt"];
type Operation214Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation214["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation215 = operations["list_attempt_spans"];
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
type Operation216 = operations["get_run_content"];
type Operation216Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation216["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation216["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation216DetailedOptions = Omit<Operation216Options, "query"> & {
  query?: Omit<
    NonNullable<Operation216["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed" };
};
type Operation218 = operations["run_image"];
type Operation218Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation218["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation220 = operations["list_run_items"];
type Operation220Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation220["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation220["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation220DetailedOptions = Omit<Operation220Options, "query"> & {
  query?: Omit<
    NonNullable<Operation220["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed" };
};
type Operation221 = operations["read_run_item_content"];
type Operation221Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation221["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation221["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation222 = operations["get_run_lineage"];
type Operation222Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation222["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation222["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation224 = operations["list_schedules"];
type Operation224Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation224["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation224["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation225 = operations["create_schedule"];
type Operation225Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation225["parameters"]["header"]>["Idempotency-Key"]
  >;
  xWorkspaceId?: NonNullable<
    Operation225["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation226 = operations["preview_schedule"];
type Operation226Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation226["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation227 = operations["archive_schedule"];
type Operation227Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation227["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation227["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation228 = operations["get_schedule"];
type Operation228Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation228["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation229 = operations["update_schedule"];
type Operation229Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation229["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation229["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation230 = operations["dispatch_schedule"];
type Operation230Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation230["parameters"]["header"]>["Idempotency-Key"]
  >;
  ifMatch: NonNullable<
    NonNullable<Operation230["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation230["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation231 = operations["enable_schedule"];
type Operation231Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation231["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation231["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation234 = operations["pause_schedule"];
type Operation234Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation234["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation234["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation232 = operations["list_schedule_occurrences"];
type Operation232Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation232["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation232["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation233 = operations["get_schedule_occurrence"];
type Operation233Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation233["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation233["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation235 = operations["get_schedule_status"];
type Operation235Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation235["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation236 = operations["list_sessions"];
type Operation236Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation236["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation236["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation237 = operations["create_session"];
type Operation237Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation237["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation238 = operations["get_session"];
type Operation238Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation238["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation239 = operations["update_session"];
type Operation239Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation239["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation239["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation240 = operations["get_message_authors"];
type Operation240Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation240["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation240["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation241 = operations["session_stream"];
type Operation241Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation241["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation242 = operations["list_session_threads"];
type Operation242Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation242["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation242["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation243 = operations["list_skills"];
type Operation243Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation243["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation243["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation244 = operations["create_skill"];
type Operation244Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation244["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation245 = operations["validate_skill"];
type Operation245Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation245["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation246 = operations["get_skill"];
type Operation246Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation246["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation247 = operations["update_skill"];
type Operation247Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation247["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation247["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation248 = operations["archive_skill"];
type Operation248Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation248["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation248["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation255 = operations["unarchive_skill"];
type Operation255Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation255["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation255["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation249 = operations["list_skill_revisions"];
type Operation249Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation249["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation249["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation250 = operations["create_skill_revision"];
type Operation250Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation250["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation250["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation251 = operations["get_skill_revision"];
type Operation251Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation251["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation254 = operations["set_default_skill_revision"];
type Operation254Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation254["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation254["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation252 = operations["read_skill_archive"];
type Operation252Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation252["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation253 = operations["read_skill_file"];
type Operation253Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation253["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation256 = operations["list_subscriptions"];
type Operation256Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation256["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation256["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation257 = operations["create_subscription"];
type Operation257Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation257["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation258 = operations["delete_subscription"];
type Operation258Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation258["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation258["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation259 = operations["get_subscription"];
type Operation259Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation259["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation260 = operations["update_subscription"];
type Operation260Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation260["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation260["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation261 = operations["list_deliveries"];
type Operation261Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation261["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation261["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation262 = operations["redeliver"];
type Operation262Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation262["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation263 = operations["list_threads"];
type Operation263Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation263["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation263["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation264 = operations["create_thread"];
type Operation264Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation264["parameters"]["header"]>["Idempotency-Key"]
  >;
  xWorkspaceId?: NonNullable<
    Operation264["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation265 = operations["get_thread"];
type Operation265Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation265["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation266 = operations["update_thread"];
type Operation266Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation266["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation266["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation267 = operations["archive_thread"];
type Operation267Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation267["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation267["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation268 = operations["get_binding"];
type Operation268Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation268["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation269 = operations["bind_browser"];
type Operation269Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation269["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation269["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation270 = operations["list_environment_mounts"];
type Operation270Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation270["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation271 = operations["add_environment_mount"];
type Operation271Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation271["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation271["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation272 = operations["remove_environment_mount"];
type Operation272Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation272["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation272["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation273 = operations["update_environment_mount"];
type Operation273Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation273["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation273["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation274 = operations["list_inbox"];
type Operation274Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation274["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation274["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation274DetailedOptions = Omit<Operation274Options, "query"> & {
  query?: Omit<
    NonNullable<Operation274["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed" };
};
type Operation275 = operations["submit_message"];
type Operation275Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation275["parameters"]["header"]>["Idempotency-Key"]
  >;
  xWorkspaceId?: NonNullable<
    Operation275["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation276 = operations["reorder_inbox"];
type Operation276Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation276["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation276["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation277 = operations["withdraw_entry"];
type Operation277Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation277["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation277["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation278 = operations["get_inbox_entry"];
type Operation278Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation278["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation278["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation278DetailedOptions = Omit<Operation278Options, "query"> & {
  query?: Omit<
    NonNullable<Operation278["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed"; section?: null };
};
type Operation279 = operations["edit_entry"];
type Operation279Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation279["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation279["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation280 = operations["list_memory_mounts"];
type Operation280Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation280["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation281 = operations["add_memory_mount"];
type Operation281Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation281["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation281["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation282 = operations["remove_memory_mount"];
type Operation282Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation282["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation282["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation283 = operations["update_memory_mount"];
type Operation283Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation283["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation283["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation284 = operations["list_thread_runs"];
type Operation284Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation284["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation284["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation285 = operations["thread_stream"];
type Operation285Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation285["parameters"]["query"]>;
  lastEventId?: NonNullable<
    Operation285["parameters"]["header"]
  >["Last-Event-ID"];
  xWorkspaceId?: NonNullable<
    Operation285["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation286 = operations["list_tool_executions"];
type Operation286Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation286["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation286["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation287 = operations["get_tool_execution"];
type Operation287Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation287["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation288 = operations["cancel_tool_execution"];
type Operation288Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation288["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation289 = operations["observe_tool_execution"];
type Operation289Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation289["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation290 = operations["get_tool_execution_result"];
type Operation290Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation290["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation290["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation291 = operations["list_toolsets"];
type Operation291Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation291["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation291["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation292 = operations["define_toolsets"];
type Operation292Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation292["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation292["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation293 = operations["index_toolsets"];
type Operation293Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation293["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation293["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation294 = operations["get_trace_backend"];
type Operation294Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation294["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation295 = operations["list_traces"];
type Operation295Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation295["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation295["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation295DetailedOptions = Omit<Operation295Options, "query"> & {
  query?: Omit<
    NonNullable<Operation295["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed" };
};
type Operation296 = operations["search_traces"];
type Operation296Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation296["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation296["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation297 = operations["get_trace"];
type Operation297Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation297["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation297["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation297DetailedOptions = Omit<Operation297Options, "query"> & {
  query?: Omit<
    NonNullable<Operation297["parameters"]["query"]>,
    "view" | "section"
  > & { view?: "detailed"; section?: null };
};
type Operation298 = operations["list_trace_spans"];
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
type Operation299 = operations["get_trace_span"];
type Operation299Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation299["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation300 = operations["read_span_content"];
type Operation300Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation300["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation300["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation301 = operations["create_upload"];
type Operation301Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    NonNullable<Operation301["parameters"]["header"]>["Idempotency-Key"]
  >;
  xWorkspaceId?: NonNullable<
    Operation301["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation302 = operations["summarize_usage"];
type Operation302Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation302["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation302["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation303 = operations["usage_agents"];
type Operation303Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation303["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation303["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation304 = operations["context_usage"];
type Operation304Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation304["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation304["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation305 = operations["list_usage_members"];
type Operation305Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation305["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation305["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation306 = operations["usage_models"];
type Operation306Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation306["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation306["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation307 = operations["usage_overview"];
type Operation307Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation307["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation307["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation308 = operations["model_request_metrics"];
type Operation308Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation308["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation309 = operations["list_run_usage"];
type Operation309Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation309["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation309["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation310 = operations["get_profile"];
type Operation310Options = { signal?: AbortSignal };
type Operation311 = operations["update_profile"];
type Operation311Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation311["parameters"]["header"]>["If-Match"]
  >;
};
type Operation315 = operations["disable_account"];
type Operation315Options = { signal?: AbortSignal };
type Operation321 = operations["change_password"];
type Operation321Options = { signal?: AbortSignal };
type Operation312 = operations["list_account_audit_events"];
type Operation312Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation312["parameters"]["query"]>;
};
type Operation313 = operations["delete_user_avatar"];
type Operation313Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation313["parameters"]["header"]>["If-Match"]
  >;
};
type Operation314 = operations["put_user_avatar"];
type Operation314Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation314["parameters"]["header"]>["If-Match"]
  >;
  contentType: "image/jpeg" | "image/png" | "image/webp";
};
type Operation316 = operations["list_user_keys"];
type Operation316Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation316["parameters"]["query"]>;
};
type Operation317 = operations["create_user_key"];
type Operation317Options = { signal?: AbortSignal };
type Operation318 = operations["revoke_user_key"];
type Operation318Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation318["parameters"]["header"]>["If-Match"]
  >;
};
type Operation319 = operations["list_login_sessions"];
type Operation319Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation319["parameters"]["query"]>;
};
type Operation320Options = { signal?: AbortSignal };
type Operation322Options = { signal?: AbortSignal };
type Operation323 = operations["list_web_providers"];
type Operation323Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation323["parameters"]["query"]>;
  xWorkspaceId?: NonNullable<
    Operation323["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation324 = operations["create_web_provider"];
type Operation324Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation324["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation325 = operations["delete_web_provider"];
type Operation325Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation325["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation325["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation326 = operations["get_web_provider"];
type Operation326Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation326["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation327 = operations["update_web_provider"];
type Operation327Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation327["parameters"]["header"]>["If-Match"]
  >;
  xWorkspaceId?: NonNullable<
    Operation327["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation328 = operations["test_web_provider"];
type Operation328Options = {
  signal?: AbortSignal;
  xWorkspaceId?: NonNullable<
    Operation328["parameters"]["header"]
  >["X-Workspace-ID"];
};
type Operation329 = operations["list_workspaces"];
type Operation329Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation329["parameters"]["query"]>;
};
type Operation330 = operations["get_workspace"];
type Operation330Options = { signal?: AbortSignal };
type Operation331 = operations["update_workspace"];
type Operation331Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation331["parameters"]["header"]>["If-Match"]
  >;
};
type Operation332 = operations["archive_workspace"];
type Operation332Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation332["parameters"]["header"]>["If-Match"]
  >;
};
type Operation333 = operations["list_workspace_audit_events"];
type Operation333Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation333["parameters"]["query"]>;
};
type Operation334 = operations["list_workspace_grants"];
type Operation334Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation334["parameters"]["query"]>;
};
type Operation335 = operations["create_workspace_grant"];
type Operation335Options = { signal?: AbortSignal };
type Operation336Options = { signal?: AbortSignal };
type Operation337 = operations["change_workspace_grant"];
type Operation337Options = { signal?: AbortSignal };
type Operation338 = operations["delete_workspace_icon"];
type Operation338Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation338["parameters"]["header"]>["If-Match"]
  >;
};
type Operation339Options = { signal?: AbortSignal };
type Operation340 = operations["put_workspace_icon"];
type Operation340Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation340["parameters"]["header"]>["If-Match"]
  >;
  contentType: "image/jpeg" | "image/png" | "image/webp";
};
type Operation341 = operations["list_workspace_invitations"];
type Operation341Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation341["parameters"]["query"]>;
};
type Operation342 = operations["create_workspace_invitation"];
type Operation342Options = { signal?: AbortSignal };
type Operation343 = operations["resend_workspace_invitation"];
type Operation343Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation343["parameters"]["header"]>["If-Match"]
  >;
};
type Operation344 = operations["revoke_workspace_invitation"];
type Operation344Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation344["parameters"]["header"]>["If-Match"]
  >;
};
type Operation345 = operations["list_workspace_keys"];
type Operation345Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation345["parameters"]["query"]>;
};
type Operation346 = operations["revoke_workspace_key"];
type Operation346Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation346["parameters"]["header"]>["If-Match"]
  >;
};
type Operation347 = operations["list_service_accounts"];
type Operation347Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation347["parameters"]["query"]>;
};
type Operation348 = operations["create_service_account"];
type Operation348Options = { signal?: AbortSignal };
type Operation349 = operations["delete_service_account"];
type Operation349Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation349["parameters"]["header"]>["If-Match"]
  >;
};
type Operation350 = operations["get_service_account"];
type Operation350Options = { signal?: AbortSignal };
type Operation351 = operations["update_service_account"];
type Operation351Options = {
  signal?: AbortSignal;
  ifMatch: NonNullable<
    NonNullable<Operation351["parameters"]["header"]>["If-Match"]
  >;
};
type Operation352 = operations["list_service_account_keys"];
type Operation352Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation352["parameters"]["query"]>;
};
type Operation353 = operations["create_service_account_key"];
type Operation353Options = { signal?: AbortSignal };
type Operation354 = operations["health"];
type Operation354Options = { signal?: AbortSignal };
type Operation355 = operations["ready"];
type Operation355Options = { signal?: AbortSignal };
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
    options: Operation110Options = {},
  ): Promise<
    ResourceResult<
      Operation110["responses"][200]["content"]["application/json"]
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

export class ConnectionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/connections. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation50Options = {},
  ): Promise<
    ResourceResult<Operation50["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
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
  pages(options: Operation50Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation50["responses"][200]["content"]["application/json"],
      Operation50["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation50Options = {}) {
    return flattenPages<
      Operation50["responses"][200]["content"]["application/json"],
      Operation50["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/connections. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation51["requestBody"]
    >["content"]["application/json"],
    options: Operation51Options = {},
  ): Promise<
    ResourceResult<Operation51["responses"][201]["content"]["application/json"]>
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
    options: Operation52Options,
  ): Promise<
    ResourceResult<Operation52["responses"][200]["content"]["application/json"]>
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
    options: Operation53Options = {},
  ): Promise<
    ResourceResult<Operation53["responses"][200]["content"]["application/json"]>
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
    options: Operation54Options = {},
  ): Promise<
    ResourceResult<Operation54["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
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
      Operation55["requestBody"]
    >["content"]["application/json"],
    options: Operation55Options,
  ): Promise<
    ResourceResult<Operation55["responses"][200]["content"]["application/json"]>
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
      Operation56["requestBody"]
    >["content"]["application/json"],
    options: Operation56Options,
  ): Promise<
    ResourceResult<Operation56["responses"][200]["content"]["application/json"]>
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
    options: Operation57Options,
  ): Promise<
    ResourceResult<Operation57["responses"][200]["content"]["application/json"]>
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
    options: Operation58Options = {},
  ): Promise<
    ResourceResult<Operation58["responses"][200]["content"]["application/json"]>
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
    options: Operation59Options = {},
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
    options: Operation60Options,
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
}

export class ConnectionsConnectionIdToolsIndexResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/connections/{connection_id}/tools/index. Preserves response metadata; mutations are not replayed. */
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
}

export class ConnectorProvidersResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/connector-providers. Preserves response metadata; mutations are not replayed. */
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
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation62Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation62["responses"][200]["content"]["application/json"],
      Operation62["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation62Options = {}) {
    return flattenPages<
      Operation62["responses"][200]["content"]["application/json"],
      Operation62["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/connector-providers. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation63["requestBody"]
    >["content"]["application/json"],
    options: Operation63Options = {},
  ): Promise<
    ResourceResult<Operation63["responses"][201]["content"]["application/json"]>
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
  delete(options: Operation64Options): Promise<ResourceResult<undefined>> {
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
    options: Operation65Options = {},
  ): Promise<
    ResourceResult<Operation65["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
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
      Operation66["requestBody"]
    >["content"]["application/json"],
    options: Operation66Options,
  ): Promise<
    ResourceResult<Operation66["responses"][200]["content"]["application/json"]>
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
    options: Operation72Options = {},
  ): Promise<
    ResourceResult<Operation72["responses"][200]["content"]["application/json"]>
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
    options: Operation69Options = {},
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
    options: Operation70Options,
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
}

export class ConnectorProvidersProviderIdAppsAppActionsIndexResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/connector-providers/{provider_id}/apps/{app}/actions/index. Preserves response metadata; mutations are not replayed. */
  list(
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
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation71Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation71["responses"][200]["content"]["application/json"],
      Operation71["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation71Options = {}) {
    return flattenPages<
      Operation71["responses"][200]["content"]["application/json"],
      Operation71["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation73Options = {},
  ): Promise<
    ResourceResult<Operation73["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
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
  pages(options: Operation73Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation73["responses"][200]["content"]["application/json"],
      Operation73["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation73Options = {}) {
    return flattenPages<
      Operation73["responses"][200]["content"]["application/json"],
      Operation73["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/devices. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation74["requestBody"]
    >["content"]["application/json"],
    options: Operation74Options = {},
  ): Promise<
    ResourceResult<Operation74["responses"][201]["content"]["application/json"]>
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
  delete(options: Operation75Options): Promise<ResourceResult<undefined>> {
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
  /** PATCH /api/v1/devices/{device_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation77["requestBody"]
    >["content"]["application/json"],
    options: Operation77Options,
  ): Promise<
    ResourceResult<Operation77["responses"][200]["content"]["application/json"]>
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
    options: Operation79Options,
  ): Promise<
    ResourceResult<Operation79["responses"][200]["content"]["application/json"]>
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
      Operation78["requestBody"]
    >["content"]["application/json"],
    options: Operation78Options = {},
  ): Promise<
    ResourceResult<Operation78["responses"][200]["content"]["application/json"]>
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
      Operation80["requestBody"]
    >["content"]["application/json"],
    options: Operation80Options = {},
  ): Promise<
    ResourceResult<Operation80["responses"][200]["content"]["application/json"]>
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
    options: Operation81Options = {},
  ): Promise<
    ResourceResult<Operation81["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
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
  pages(options: Operation81Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation81["responses"][200]["content"]["application/json"],
      Operation81["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation81Options = {}) {
    return flattenPages<
      Operation81["responses"][200]["content"]["application/json"],
      Operation81["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/environment-providers. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation82["requestBody"]
    >["content"]["application/json"],
    options: Operation82Options = {},
  ): Promise<
    ResourceResult<Operation82["responses"][201]["content"]["application/json"]>
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
  delete(options: Operation83Options): Promise<ResourceResult<undefined>> {
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
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/environment-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation85["requestBody"]
    >["content"]["application/json"],
    options: Operation85Options,
  ): Promise<
    ResourceResult<Operation85["responses"][200]["content"]["application/json"]>
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
    options: Operation87Options = {},
  ): Promise<
    ResourceResult<Operation87["responses"][200]["content"]["application/json"]>
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
}

export class EnvironmentTemplatesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/environment-templates. Preserves response metadata; mutations are not replayed. */
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
  /** POST /api/v1/environment-templates. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation89["requestBody"]
    >["content"]["application/json"],
    options: Operation89Options = {},
  ): Promise<
    ResourceResult<Operation89["responses"][201]["content"]["application/json"]>
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
  /** PATCH /api/v1/environment-templates/{template_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation91["requestBody"]
    >["content"]["application/json"],
    options: Operation91Options,
  ): Promise<
    ResourceResult<Operation91["responses"][200]["content"]["application/json"]>
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
  /** POST /api/v1/environments. Preserves response metadata; mutations are not replayed. */
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
    options: Operation94Options,
  ): Promise<
    ResourceResult<Operation94["responses"][202]["content"]["application/json"]>
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
    options: Operation95Options = {},
  ): Promise<
    ResourceResult<Operation95["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
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
      Operation96["requestBody"]
    >["content"]["application/json"],
    options: Operation96Options,
  ): Promise<
    ResourceResult<Operation96["responses"][200]["content"]["application/json"]>
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
      Operation104["requestBody"]
    >["content"]["application/json"],
    options: Operation104Options = {},
  ): Promise<
    ResourceResult<
      Operation104["responses"][200]["content"]["application/json"]
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
    options: Operation108Options,
  ): Promise<
    ResourceResult<
      Operation108["responses"][202]["content"]["application/json"]
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
    options: Operation109Options,
  ): Promise<
    ResourceResult<
      Operation109["responses"][202]["content"]["application/json"]
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
    options: Operation97Options = {},
  ): Promise<
    ResourceResult<Operation97["responses"][200]["content"]["application/json"]>
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
    options: Operation98Options = {},
  ): Promise<
    ResourceResult<Operation98["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
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

export class EnvironmentsEnvironmentIdDesktopControlResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/environments/{environment_id}/desktop-control. Preserves response metadata; mutations are not replayed. */
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
  /** POST /api/v1/environments/{environment_id}/desktop-control/handback. Preserves response metadata; mutations are not replayed. */
  handback(
    options: Operation100Options,
  ): Promise<
    ResourceResult<
      Operation100["responses"][200]["content"]["application/json"]
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
      Operation101["requestBody"]
    >["content"]["application/json"],
    options: Operation101Options = {},
  ): Promise<
    ResourceResult<
      Operation101["responses"][200]["content"]["application/json"]
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
      Operation102["requestBody"]
    >["content"]["application/json"],
    options: Operation102Options,
  ): Promise<
    ResourceResult<
      Operation102["responses"][200]["content"]["application/json"]
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
      Operation105["requestBody"]
    >["content"]["application/json"],
    options: Operation105Options,
  ): Promise<
    ResourceResult<
      Operation105["responses"][200]["content"]["application/json"]
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
      Operation107["requestBody"]
    >["content"]["application/json"],
    options: Operation107Options = {},
  ): Promise<
    ResourceResult<
      Operation107["responses"][200]["content"]["application/json"]
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
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation111Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation111["responses"][200]["content"]["application/json"],
      Operation111["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation111Options = {}) {
    return flattenPages<
      Operation111["responses"][200]["content"]["application/json"],
      Operation111["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/finding-analyses. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation112["requestBody"]
    >["content"]["application/json"],
    options: Operation112Options,
  ): Promise<
    ResourceResult<
      Operation112["responses"][201]["content"]["application/json"]
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
  /** POST /api/v1/findings. Preserves response metadata; mutations are not replayed. */
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
  /** PATCH /api/v1/findings/{finding_id}. Preserves response metadata; mutations are not replayed. */
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
      Operation117["requestBody"]
    >["content"]["application/json"],
    options: Operation117Options = {},
  ): Promise<
    ResourceResult<
      Operation117["responses"][200]["content"]["application/json"]
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
    options: Operation118Options = {},
  ): Promise<
    ResourceResult<
      Operation118["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation118Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation118["responses"][200]["content"]["application/json"],
      Operation118["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation118Options = {}) {
    return flattenPages<
      Operation118["responses"][200]["content"]["application/json"],
      Operation118["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation119Options = {},
  ): Promise<
    ResourceResult<
      Operation119["responses"][200]["content"]["application/json"]
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
      Operation120["requestBody"]
    >["content"]["application/json"],
    options: Operation120Options,
  ): Promise<
    ResourceResult<
      Operation120["responses"][200]["content"]["application/json"]
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
    options: Operation121Options = {},
  ): Promise<
    ResourceResult<
      Operation121["responses"][200]["content"]["application/json"]
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
  pages(options: Operation121Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation121["responses"][200]["content"]["application/json"],
      Operation121["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation121Options = {}) {
    return flattenPages<
      Operation121["responses"][200]["content"]["application/json"],
      Operation121["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/memories. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation122["requestBody"]
    >["content"]["application/json"],
    options: Operation122Options = {},
  ): Promise<
    ResourceResult<
      Operation122["responses"][201]["content"]["application/json"]
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
  delete(options: Operation123Options): Promise<ResourceResult<undefined>> {
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
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/memories/{memory_id}. Preserves response metadata; mutations are not replayed. */
  update(
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
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation126Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation126["responses"][200]["content"]["application/json"],
      Operation126["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation126Options = {}) {
    return flattenPages<
      Operation126["responses"][200]["content"]["application/json"],
      Operation126["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/memories/{memory_id}/files. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation127["requestBody"]
    >["content"]["application/json"],
    options: Operation127Options = {},
  ): Promise<
    ResourceResult<
      Operation127["responses"][201]["content"]["application/json"]
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
      Operation128["requestBody"]
    >["content"]["application/json"],
    options: Operation128Options,
  ): Promise<
    ResourceResult<
      Operation128["responses"][200]["content"]["application/json"]
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
  delete(options: Operation129Options): Promise<ResourceResult<undefined>> {
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
    options: Operation130Options = {},
  ): Promise<
    ResourceResult<
      Operation130["responses"][200]["content"]["application/json"]
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
      Operation131["requestBody"]
    >["content"]["application/json"],
    options: Operation131Options,
  ): Promise<
    ResourceResult<
      Operation131["responses"][200]["content"]["application/json"]
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
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation132Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation132["responses"][200]["content"]["application/json"],
      Operation132["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation132Options = {}) {
    return flattenPages<
      Operation132["responses"][200]["content"]["application/json"],
      Operation132["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/memories/{memory_id}/records. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation133["requestBody"]
    >["content"]["application/json"],
    options: Operation133Options = {},
  ): Promise<
    ResourceResult<
      Operation133["responses"][201]["content"]["application/json"]
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
      Operation134["requestBody"]
    >["content"]["application/json"],
    options: Operation134Options = {},
  ): Promise<
    ResourceResult<
      Operation134["responses"][200]["content"]["application/json"]
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
    options: Operation135Options = {},
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
    options: Operation137Options,
  ): Promise<
    ResourceResult<
      Operation137["responses"][200]["content"]["application/json"]
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
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation138Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation138["responses"][200]["content"]["application/json"],
      Operation138["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation138Options = {}) {
    return flattenPages<
      Operation138["responses"][200]["content"]["application/json"],
      Operation138["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation139Options = {},
  ): Promise<
    ResourceResult<
      Operation139["responses"][200]["content"]["application/json"]
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
    options: Operation140Options = {},
  ): Promise<
    ResourceResult<
      Operation140["responses"][200]["content"]["application/json"]
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
    options: Operation141Options = {},
  ): Promise<
    ResourceResult<
      Operation141["responses"][200]["content"]["application/json"]
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
  pages(options: Operation141Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation141["responses"][200]["content"]["application/json"],
      Operation141["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation141Options = {}) {
    return flattenPages<
      Operation141["responses"][200]["content"]["application/json"],
      Operation141["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/memory-providers. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation142["requestBody"]
    >["content"]["application/json"],
    options: Operation142Options = {},
  ): Promise<
    ResourceResult<
      Operation142["responses"][201]["content"]["application/json"]
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
  delete(options: Operation143Options): Promise<ResourceResult<undefined>> {
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
  /** PATCH /api/v1/memory-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
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
  /** POST /api/v1/memory-providers/{provider_id}/test. Preserves response metadata; mutations are not replayed. */
  test(
    options: Operation146Options = {},
  ): Promise<
    ResourceResult<
      Operation146["responses"][200]["content"]["application/json"]
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
    options: Operation147Options = {},
  ): Promise<
    ResourceResult<
      Operation147["responses"][200]["content"]["application/json"]
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
  /** POST /api/v1/memory-spaces. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation148["requestBody"]
    >["content"]["application/json"],
    options: Operation148Options = {},
  ): Promise<
    ResourceResult<
      Operation148["responses"][201]["content"]["application/json"]
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
  delete(options: Operation149Options): Promise<ResourceResult<undefined>> {
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
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/memory-spaces/{space_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation151["requestBody"]
    >["content"]["application/json"],
    options: Operation151Options,
  ): Promise<
    ResourceResult<
      Operation151["responses"][200]["content"]["application/json"]
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

export class MemorySpacesSpaceIdOrganizationsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/memory-spaces/{space_id}/organizations. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation153Options = {},
  ): Promise<
    ResourceResult<
      Operation153["responses"][200]["content"]["application/json"]
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
  pages(options: Operation153Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation153["responses"][200]["content"]["application/json"],
      Operation153["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation153Options = {}) {
    return flattenPages<
      Operation153["responses"][200]["content"]["application/json"],
      Operation153["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/memory-spaces/{space_id}/organizations. Preserves response metadata; mutations are not replayed. */
  create(
    options: Operation154Options = {},
  ): Promise<
    ResourceResult<
      Operation154["responses"][202]["content"]["application/json"]
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
}

export class MetricsDashboardsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/metrics-dashboards. Preserves response metadata; mutations are not replayed. */
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
  /** POST /api/v1/metrics-dashboards. Preserves response metadata; mutations are not replayed. */
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
    options: Operation158Options = {},
  ): Promise<
    ResourceResult<
      Operation158["responses"][200]["content"]["application/json"]
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
  /** GET /api/v1/metrics-dashboards/{dashboard_id}. Preserves response metadata; mutations are not replayed. */
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
  /** PATCH /api/v1/metrics-dashboards/{dashboard_id}. Preserves response metadata; mutations are not replayed. */
  update(
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
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation162Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation162["responses"][200]["content"]["application/json"],
      Operation162["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation162Options = {}) {
    return flattenPages<
      Operation162["responses"][200]["content"]["application/json"],
      Operation162["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/metrics-data-sources. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation163["requestBody"]
    >["content"]["application/json"],
    options: Operation163Options = {},
  ): Promise<
    ResourceResult<
      Operation163["responses"][201]["content"]["application/json"]
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

export class MetricsDataSourcesDeploymentPresetResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/metrics-data-sources/deployment-preset. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation165Options = {},
  ): Promise<
    ResourceResult<
      Operation165["responses"][200]["content"]["application/json"]
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
  delete(options: Operation166Options): Promise<ResourceResult<undefined>> {
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
    options: Operation167Options = {},
  ): Promise<
    ResourceResult<
      Operation167["responses"][200]["content"]["application/json"]
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
      Operation168["requestBody"]
    >["content"]["application/json"],
    options: Operation168Options,
  ): Promise<
    ResourceResult<
      Operation168["responses"][200]["content"]["application/json"]
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
      Operation169["requestBody"]
    >["content"]["application/json"],
    options: Operation169Options = {},
  ): Promise<
    ResourceResult<
      Operation169["responses"][200]["content"]["application/json"]
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
    options?: Operation170DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["ModelCatalog"]>>;
  list(
    options: Operation170Options,
  ): Promise<
    ResourceResult<
      Operation170["responses"][200]["content"]["application/json"]
    >
  >;
  list(
    options: Operation170Options = {},
  ): Promise<
    ResourceResult<
      Operation170["responses"][200]["content"]["application/json"]
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
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation171Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation171["responses"][200]["content"]["application/json"],
      Operation171["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation171Options = {}) {
    return flattenPages<
      Operation171["responses"][200]["content"]["application/json"],
      Operation171["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/model-providers. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation172["requestBody"]
    >["content"]["application/json"],
    options: Operation172Options = {},
  ): Promise<
    ResourceResult<
      Operation172["responses"][201]["content"]["application/json"]
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
  delete(options: Operation173Options): Promise<ResourceResult<undefined>> {
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
    options: Operation174Options = {},
  ): Promise<
    ResourceResult<
      Operation174["responses"][200]["content"]["application/json"]
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
      Operation175["requestBody"]
    >["content"]["application/json"],
    options: Operation175Options,
  ): Promise<
    ResourceResult<
      Operation175["responses"][200]["content"]["application/json"]
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
      Operation179["requestBody"]
    >["content"]["application/json"],
    options: Operation179Options = {},
  ): Promise<
    ResourceResult<
      Operation179["responses"][200]["content"]["application/json"]
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
    options: Operation181Options = {},
  ): Promise<
    ResourceResult<
      Operation181["responses"][200]["content"]["application/json"]
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
    options: Operation176Options = {},
  ): Promise<
    ResourceResult<
      Operation176["responses"][200]["content"]["application/json"]
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
    options: Operation177Options = {},
  ): Promise<
    ResourceResult<
      Operation177["responses"][200]["content"]["application/json"]
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
    options: Operation180Options = {},
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
  /** POST /api/v1/models. Preserves response metadata; mutations are not replayed. */
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
    options: Operation184Options = {},
  ): Promise<
    ResourceResult<
      Operation184["responses"][200]["content"]["application/json"]
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
      Operation185["requestBody"]
    >["content"]["application/json"],
    options: Operation185Options,
  ): Promise<
    ResourceResult<
      Operation185["responses"][200]["content"]["application/json"]
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
    options: Operation186Options = {},
  ): Promise<
    ResourceResult<
      Operation186["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation186Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation186["responses"][200]["content"]["application/json"],
      Operation186["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation186Options = {}) {
    return flattenPages<
      Operation186["responses"][200]["content"]["application/json"],
      Operation186["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation187Options = {},
  ): Promise<
    ResourceResult<
      Operation187["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/organizations/{organization_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation188["requestBody"]
    >["content"]["application/json"],
    options: Operation188Options,
  ): Promise<
    ResourceResult<
      Operation188["responses"][200]["content"]["application/json"]
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
}

export class OrganizationsOrganizationIdGrantsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/grants. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation190Options = {},
  ): Promise<
    ResourceResult<
      Operation190["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation190Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation190["responses"][200]["content"]["application/json"],
      Operation190["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation190Options = {}) {
    return flattenPages<
      Operation190["responses"][200]["content"]["application/json"],
      Operation190["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/organizations/{organization_id}/grants. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation191["requestBody"]
    >["content"]["application/json"],
    options: Operation191Options = {},
  ): Promise<
    ResourceResult<
      Operation191["responses"][201]["content"]["application/json"]
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
    options: Operation192Options = {},
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
      Operation193["requestBody"]
    >["content"]["application/json"],
    options: Operation193Options = {},
  ): Promise<
    ResourceResult<
      Operation193["responses"][200]["content"]["application/json"]
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
    options: Operation194Options,
  ): Promise<
    ResourceResult<
      Operation194["responses"][200]["content"]["application/json"]
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
  get(options: Operation195Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal },
      headers: undefined,
      accept: "image/jpeg, image/png, image/webp",
    });
  }
  /** PUT /api/v1/organizations/{organization_id}/icon. Preserves response metadata; mutations are not replayed. */
  replace(
    body: Binary,
    options: Operation196Options,
  ): Promise<
    ResourceResult<
      Operation196["responses"][200]["content"]["application/json"]
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
    options: Operation197Options = {},
  ): Promise<
    ResourceResult<
      Operation197["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
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
  /** POST /api/v1/organizations/{organization_id}/invitations. Preserves response metadata; mutations are not replayed. */
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
    options: Operation199Options,
  ): Promise<
    ResourceResult<
      Operation199["responses"][200]["content"]["application/json"]
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
    options: Operation200Options,
  ): Promise<
    ResourceResult<
      Operation200["responses"][200]["content"]["application/json"]
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
}

export class OrganizationsOrganizationIdWorkspacesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/workspaces. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation202Options = {},
  ): Promise<
    ResourceResult<
      Operation202["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation202Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation202["responses"][200]["content"]["application/json"],
      Operation202["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation202Options = {}) {
    return flattenPages<
      Operation202["responses"][200]["content"]["application/json"],
      Operation202["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/organizations/{organization_id}/workspaces. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation203["requestBody"]
    >["content"]["application/json"],
    options: Operation203Options = {},
  ): Promise<
    ResourceResult<
      Operation203["responses"][201]["content"]["application/json"]
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
    options: Operation204Options = {},
  ): Promise<
    ResourceResult<
      Operation204["responses"][200]["content"]["application/json"]
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
    options: Operation205Options = {},
  ): Promise<
    ResourceResult<
      Operation205["responses"][200]["content"]["application/json"]
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
  pages(options: Operation206Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation206["responses"][200]["content"]["application/json"],
      Operation206["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation206Options = {}) {
    return flattenPages<
      Operation206["responses"][200]["content"]["application/json"],
      Operation206["responses"][200]["content"]["application/json"]["items"][number]
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
    options?: Operation207DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["RunView"]>>;
  get(
    options: Operation207Options,
  ): Promise<
    ResourceResult<
      Operation207["responses"][200]["content"]["application/json"]
    >
  >;
  get(
    options: Operation207Options = {},
  ): Promise<
    ResourceResult<
      Operation207["responses"][200]["content"]["application/json"]
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
      Operation208["requestBody"]
    >["content"]["application/json"],
    options: Operation208Options,
  ): Promise<
    ResourceResult<
      Operation208["responses"][200]["content"]["application/json"]
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
      Operation217["requestBody"]
    >["content"]["application/json"],
    options: Operation217Options,
  ): Promise<
    ResourceResult<
      | Operation217["responses"][200]["content"]["application/json"]
      | Operation217["responses"][201]["content"]["application/json"]
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
    options: Operation219Options = {},
  ): Promise<
    ResourceResult<
      Operation219["responses"][200]["content"]["application/json"]
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
      Operation223["requestBody"]
    >["content"]["application/json"],
    options: Operation223Options,
  ): Promise<
    ResourceResult<
      | Operation223["responses"][200]["content"]["application/json"]
      | Operation223["responses"][201]["content"]["application/json"]
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
    options?: Operation209DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["RunAgent"]>>;
  get(
    options: Operation209Options,
  ): Promise<
    ResourceResult<
      Operation209["responses"][200]["content"]["application/json"]
    >
  >;
  get(
    options: Operation209Options = {},
  ): Promise<
    ResourceResult<
      Operation209["responses"][200]["content"]["application/json"]
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
    options: Operation210Options = {},
  ): Promise<
    ResourceResult<
      Operation210["responses"][200]["content"]["application/json"]
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
      Operation212["requestBody"]
    >["content"]["application/json"],
    options: Operation212Options = {},
  ): Promise<
    ResourceResult<
      Operation212["responses"][200]["content"]["application/json"]
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
    options?: Operation215DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["SpanPage"]>>;
  list(
    options: Operation215Options,
  ): Promise<
    ResourceResult<
      Operation215["responses"][200]["content"]["application/json"]
    >
  >;
  list(
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
  pages(options: Operation215Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation215["responses"][200]["content"]["application/json"],
      Operation215["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation215Options = {}) {
    return flattenPages<
      Operation215["responses"][200]["content"]["application/json"],
      Operation215["responses"][200]["content"]["application/json"]["items"][number]
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
    options?: Operation216DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["RunContent"]>>;
  get(
    options: Operation216Options,
  ): Promise<
    ResourceResult<
      Operation216["responses"][200]["content"]["application/json"]
    >
  >;
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
  get(options: Operation218Options = {}): Promise<BinaryResult> {
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
    options?: Operation220DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["RunItems"]>>;
  get(
    options: Operation220Options,
  ): Promise<
    ResourceResult<
      Operation220["responses"][200]["content"]["application/json"]
    >
  >;
  get(
    options: Operation220Options = {},
  ): Promise<
    ResourceResult<
      Operation220["responses"][200]["content"]["application/json"]
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
    options: Operation221Options,
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
    options: Operation222Options = {},
  ): Promise<
    ResourceResult<
      Operation222["responses"][200]["content"]["application/json"]
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
  pages(options: Operation222Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation222["responses"][200]["content"]["application/json"],
      Operation222["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation222Options = {}) {
    return flattenPages<
      Operation222["responses"][200]["content"]["application/json"],
      Operation222["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation224Options = {},
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
  pages(options: Operation224Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation224["responses"][200]["content"]["application/json"],
      Operation224["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation224Options = {}) {
    return flattenPages<
      Operation224["responses"][200]["content"]["application/json"],
      Operation224["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/schedules. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation225["requestBody"]
    >["content"]["application/json"],
    options: Operation225Options,
  ): Promise<
    ResourceResult<
      Operation225["responses"][201]["content"]["application/json"]
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
      Operation226["requestBody"]
    >["content"]["application/json"],
    options: Operation226Options = {},
  ): Promise<
    ResourceResult<
      Operation226["responses"][200]["content"]["application/json"]
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
  delete(options: Operation227Options): Promise<ResourceResult<undefined>> {
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
    options: Operation228Options = {},
  ): Promise<
    ResourceResult<
      Operation228["responses"][200]["content"]["application/json"]
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
      Operation230["requestBody"]
    >["content"]["application/json"],
    options: Operation230Options,
  ): Promise<
    ResourceResult<
      Operation230["responses"][202]["content"]["application/json"]
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
    options: Operation232Options = {},
  ): Promise<
    ResourceResult<
      Operation232["responses"][200]["content"]["application/json"]
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
    options: Operation233Options = {},
  ): Promise<
    ResourceResult<
      Operation233["responses"][200]["content"]["application/json"]
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
  pages(options: Operation236Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation236["responses"][200]["content"]["application/json"],
      Operation236["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation236Options = {}) {
    return flattenPages<
      Operation236["responses"][200]["content"]["application/json"],
      Operation236["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/sessions. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation237["requestBody"]
    >["content"]["application/json"],
    options: Operation237Options = {},
  ): Promise<
    ResourceResult<
      Operation237["responses"][201]["content"]["application/json"]
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
  /** PATCH /api/v1/sessions/{session_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation239["requestBody"]
    >["content"]["application/json"],
    options: Operation239Options,
  ): Promise<
    ResourceResult<
      Operation239["responses"][200]["content"]["application/json"]
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
    options: Operation240Options,
  ): Promise<
    ResourceResult<
      Operation240["responses"][200]["content"]["application/json"]
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
  get(options: Operation241Options = {}): Promise<BinaryResult> {
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
    options: Operation242Options = {},
  ): Promise<
    ResourceResult<
      Operation242["responses"][200]["content"]["application/json"]
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
  pages(options: Operation242Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation242["responses"][200]["content"]["application/json"],
      Operation242["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation242Options = {}) {
    return flattenPages<
      Operation242["responses"][200]["content"]["application/json"],
      Operation242["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation243Options = {},
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
  pages(options: Operation243Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation243["responses"][200]["content"]["application/json"],
      Operation243["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation243Options = {}) {
    return flattenPages<
      Operation243["responses"][200]["content"]["application/json"],
      Operation243["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/skills. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation244["requestBody"]
    >["content"]["application/json"],
    options: Operation244Options = {},
  ): Promise<
    ResourceResult<
      Operation244["responses"][201]["content"]["application/json"]
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
      Operation245["requestBody"]
    >["content"]["application/json"],
    options: Operation245Options = {},
  ): Promise<
    ResourceResult<
      Operation245["responses"][200]["content"]["application/json"]
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
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/skills/{skill_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation247["requestBody"]
    >["content"]["application/json"],
    options: Operation247Options,
  ): Promise<
    ResourceResult<
      Operation247["responses"][200]["content"]["application/json"]
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
    options: Operation248Options,
  ): Promise<
    ResourceResult<
      Operation248["responses"][200]["content"]["application/json"]
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
    options: Operation255Options,
  ): Promise<
    ResourceResult<
      Operation255["responses"][200]["content"]["application/json"]
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
  /** POST /api/v1/skills/{skill_id}/revisions. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation250["requestBody"]
    >["content"]["application/json"],
    options: Operation250Options,
  ): Promise<
    ResourceResult<
      Operation250["responses"][201]["content"]["application/json"]
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
    options: Operation251Options = {},
  ): Promise<
    ResourceResult<
      Operation251["responses"][200]["content"]["application/json"]
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
    options: Operation254Options,
  ): Promise<
    ResourceResult<
      Operation254["responses"][200]["content"]["application/json"]
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
  get(options: Operation252Options = {}): Promise<BinaryResult> {
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
  get(options: Operation253Options = {}): Promise<BinaryResult> {
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
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation256Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation256["responses"][200]["content"]["application/json"],
      Operation256["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation256Options = {}) {
    return flattenPages<
      Operation256["responses"][200]["content"]["application/json"],
      Operation256["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/subscriptions. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation257["requestBody"]
    >["content"]["application/json"],
    options: Operation257Options = {},
  ): Promise<
    ResourceResult<
      Operation257["responses"][201]["content"]["application/json"]
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
  delete(options: Operation258Options): Promise<ResourceResult<undefined>> {
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
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/subscriptions/{subscription_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation260["requestBody"]
    >["content"]["application/json"],
    options: Operation260Options,
  ): Promise<
    ResourceResult<
      Operation260["responses"][200]["content"]["application/json"]
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
    options: Operation261Options = {},
  ): Promise<
    ResourceResult<
      Operation261["responses"][200]["content"]["application/json"]
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
  pages(options: Operation261Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation261["responses"][200]["content"]["application/json"],
      Operation261["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation261Options = {}) {
    return flattenPages<
      Operation261["responses"][200]["content"]["application/json"],
      Operation261["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation262Options = {},
  ): Promise<
    ResourceResult<
      Operation262["responses"][200]["content"]["application/json"]
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
  pages(options: Operation263Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation263["responses"][200]["content"]["application/json"],
      Operation263["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation263Options = {}) {
    return flattenPages<
      Operation263["responses"][200]["content"]["application/json"],
      Operation263["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/threads. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation264["requestBody"]
    >["content"]["application/json"],
    options: Operation264Options,
  ): Promise<
    ResourceResult<
      | Operation264["responses"][200]["content"]["application/json"]
      | Operation264["responses"][201]["content"]["application/json"]
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
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/threads/{thread_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation266["requestBody"]
    >["content"]["application/json"],
    options: Operation266Options,
  ): Promise<
    ResourceResult<
      Operation266["responses"][200]["content"]["application/json"]
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
    options: Operation267Options,
  ): Promise<
    ResourceResult<
      Operation267["responses"][200]["content"]["application/json"]
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
  /** PUT /api/v1/threads/{thread_id}/browser. Preserves response metadata; mutations are not replayed. */
  replace(
    body:
      | NonNullable<Operation269["requestBody"]>["content"]["application/json"]
      | undefined,
    options: Operation269Options,
  ): Promise<
    ResourceResult<
      Operation269["responses"][200]["content"]["application/json"]
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
    options: Operation270Options = {},
  ): Promise<
    ResourceResult<
      Operation270["responses"][200]["content"]["application/json"]
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
      Operation271["requestBody"]
    >["content"]["application/json"],
    options: Operation271Options,
  ): Promise<
    ResourceResult<
      Operation271["responses"][201]["content"]["application/json"]
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
  delete(options: Operation272Options): Promise<ResourceResult<undefined>> {
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
      Operation273["requestBody"]
    >["content"]["application/json"],
    options: Operation273Options,
  ): Promise<
    ResourceResult<
      Operation273["responses"][200]["content"]["application/json"]
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
    options?: Operation274DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["EntryPage"]>>;
  list(
    options: Operation274Options,
  ): Promise<
    ResourceResult<
      Operation274["responses"][200]["content"]["application/json"]
    >
  >;
  list(
    options: Operation274Options = {},
  ): Promise<
    ResourceResult<
      Operation274["responses"][200]["content"]["application/json"]
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
  pages(options: Operation274Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation274["responses"][200]["content"]["application/json"],
      Operation274["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation274Options = {}) {
    return flattenPages<
      Operation274["responses"][200]["content"]["application/json"],
      Operation274["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/threads/{thread_id}/inbox. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation275["requestBody"]
    >["content"]["application/json"],
    options: Operation275Options,
  ): Promise<
    ResourceResult<
      | Operation275["responses"][200]["content"]["application/json"]
      | Operation275["responses"][201]["content"]["application/json"]
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
    options: Operation277Options,
  ): Promise<
    ResourceResult<
      Operation277["responses"][200]["content"]["application/json"]
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
    options?: Operation278DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["EntryView"]>>;
  get(
    options: Operation278Options,
  ): Promise<
    ResourceResult<
      Operation278["responses"][200]["content"]["application/json"]
    >
  >;
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
      { signal: options.signal, query: options.query },
    );
  }
  /** PATCH /api/v1/threads/{thread_id}/inbox/{entry_id}. Preserves response metadata; mutations are not replayed. */
  update(
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
    options: Operation280Options = {},
  ): Promise<
    ResourceResult<
      Operation280["responses"][200]["content"]["application/json"]
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
      Operation281["requestBody"]
    >["content"]["application/json"],
    options: Operation281Options,
  ): Promise<
    ResourceResult<
      Operation281["responses"][201]["content"]["application/json"]
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
  delete(options: Operation282Options): Promise<ResourceResult<undefined>> {
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
      Operation283["requestBody"]
    >["content"]["application/json"],
    options: Operation283Options,
  ): Promise<
    ResourceResult<
      Operation283["responses"][200]["content"]["application/json"]
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
    options: Operation284Options = {},
  ): Promise<
    ResourceResult<
      Operation284["responses"][200]["content"]["application/json"]
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
  pages(options: Operation284Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation284["responses"][200]["content"]["application/json"],
      Operation284["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation284Options = {}) {
    return flattenPages<
      Operation284["responses"][200]["content"]["application/json"],
      Operation284["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
}

export class ThreadsThreadIdStreamResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/threads/{thread_id}/stream. Caller owns and closes the unbuffered body. */
  get(options: Operation285Options = {}): Promise<BinaryResult> {
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
      { signal: options.signal },
    );
  }
  /** POST /api/v1/threads/{thread_id}/tool-executions/{execution_id}/cancel. Preserves response metadata; mutations are not replayed. */
  cancel(
    options: Operation288Options = {},
  ): Promise<
    ResourceResult<
      Operation288["responses"][202]["content"]["application/json"]
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
}

export class ThreadsThreadIdToolExecutionsExecutionIdResultResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/threads/{thread_id}/tool-executions/{execution_id}/result. Preserves response metadata; mutations are not replayed. */
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
    options: Operation291Options = {},
  ): Promise<
    ResourceResult<
      Operation291["responses"][200]["content"]["application/json"]
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
    options: Operation292Options,
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
}

export class ToolsetsIndexResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/toolsets/index. Preserves response metadata; mutations are not replayed. */
  list(
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
  pages(options: Operation293Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation293["responses"][200]["content"]["application/json"],
      Operation293["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation293Options = {}) {
    return flattenPages<
      Operation293["responses"][200]["content"]["application/json"],
      Operation293["responses"][200]["content"]["application/json"]["items"][number]
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
}

export class TracesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/traces. Preserves response metadata; mutations are not replayed. */
  list(
    options?: Operation295DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["SpanPage"]>>;
  list(
    options: Operation295Options,
  ): Promise<
    ResourceResult<
      Operation295["responses"][200]["content"]["application/json"]
    >
  >;
  list(
    options: Operation295Options = {},
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
  pages(options: Operation295Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation295["responses"][200]["content"]["application/json"],
      Operation295["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation295Options = {}) {
    return flattenPages<
      Operation295["responses"][200]["content"]["application/json"],
      Operation295["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation296Options,
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
  pages(options: Operation296Options) {
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
  items(options: Operation296Options) {
    return flattenPages<
      Operation296["responses"][200]["content"]["application/json"],
      Operation296["responses"][200]["content"]["application/json"]["items"][number]
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
    options?: Operation297DetailedOptions,
  ): Promise<ResourceResult<components["schemas"]["Span"]>>;
  get(
    options: Operation297Options,
  ): Promise<
    ResourceResult<
      Operation297["responses"][200]["content"]["application/json"]
    >
  >;
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
}

export class UploadsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** POST /api/v1/uploads. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation301["requestBody"]
    >["content"]["multipart/form-data"],
    options: Operation301Options,
  ): Promise<
    ResourceResult<
      Operation301["responses"][200]["content"]["application/json"]
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
    options: Operation303Options,
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
  pages(options: Operation303Options) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation303["responses"][200]["content"]["application/json"],
      Operation303["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation303Options) {
    return flattenPages<
      Operation303["responses"][200]["content"]["application/json"],
      Operation303["responses"][200]["content"]["application/json"]["items"][number]
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
}

export class UsageMembersResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/usage/members. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation305Options,
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
  pages(options: Operation305Options) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation305["responses"][200]["content"]["application/json"],
      Operation305["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation305Options) {
    return flattenPages<
      Operation305["responses"][200]["content"]["application/json"],
      Operation305["responses"][200]["content"]["application/json"]["items"][number]
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

export class UsageOverviewResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/usage/overview. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation307Options,
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
}

export class UsageRunsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/usage/runs. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation309Options = {},
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
  pages(options: Operation309Options = {}) {
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
  items(options: Operation309Options = {}) {
    return flattenPages<
      Operation309["responses"][200]["content"]["application/json"],
      Operation309["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation310Options = {},
  ): Promise<
    ResourceResult<
      Operation310["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/users/me. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation311["requestBody"]
    >["content"]["application/json"],
    options: Operation311Options,
  ): Promise<
    ResourceResult<
      Operation311["responses"][200]["content"]["application/json"]
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
      Operation315["requestBody"]
    >["content"]["application/json"],
    options: Operation315Options = {},
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
      Operation321["requestBody"]
    >["content"]["application/json"],
    options: Operation321Options = {},
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
    options: Operation312Options = {},
  ): Promise<
    ResourceResult<
      Operation312["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
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

export class UsersMeAvatarResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/users/me/avatar. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation313Options,
  ): Promise<
    ResourceResult<
      Operation313["responses"][200]["content"]["application/json"]
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
    options: Operation314Options,
  ): Promise<
    ResourceResult<
      Operation314["responses"][200]["content"]["application/json"]
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
    options: Operation316Options = {},
  ): Promise<
    ResourceResult<
      Operation316["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation316Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation316["responses"][200]["content"]["application/json"],
      Operation316["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation316Options = {}) {
    return flattenPages<
      Operation316["responses"][200]["content"]["application/json"],
      Operation316["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/users/me/keys. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation317["requestBody"]
    >["content"]["application/json"],
    options: Operation317Options = {},
  ): Promise<
    ResourceResult<
      Operation317["responses"][201]["content"]["application/json"]
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
    options: Operation318Options,
  ): Promise<
    ResourceResult<
      Operation318["responses"][200]["content"]["application/json"]
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
    options: Operation320Options = {},
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
  get(options: Operation322Options = {}): Promise<BinaryResult> {
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
      { signal: options.signal, query: options.query },
    );
  }
  pages(options: Operation323Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation323["responses"][200]["content"]["application/json"],
      Operation323["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation323Options = {}) {
    return flattenPages<
      Operation323["responses"][200]["content"]["application/json"],
      Operation323["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/web-providers. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation324["requestBody"]
    >["content"]["application/json"],
    options: Operation324Options = {},
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
  /** GET /api/v1/web-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  get(
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
      { signal: options.signal },
    );
  }
  /** PATCH /api/v1/web-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation327["requestBody"]
    >["content"]["application/json"],
    options: Operation327Options,
  ): Promise<
    ResourceResult<
      Operation327["responses"][200]["content"]["application/json"]
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
    options: Operation328Options = {},
  ): Promise<
    ResourceResult<
      Operation328["responses"][200]["content"]["application/json"]
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
    options: Operation329Options = {},
  ): Promise<
    ResourceResult<
      Operation329["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation329Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation329["responses"][200]["content"]["application/json"],
      Operation329["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation329Options = {}) {
    return flattenPages<
      Operation329["responses"][200]["content"]["application/json"],
      Operation329["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation330Options = {},
  ): Promise<
    ResourceResult<
      Operation330["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/workspaces/{workspace_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation331["requestBody"]
    >["content"]["application/json"],
    options: Operation331Options,
  ): Promise<
    ResourceResult<
      Operation331["responses"][200]["content"]["application/json"]
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
    options: Operation332Options,
  ): Promise<
    ResourceResult<
      Operation332["responses"][200]["content"]["application/json"]
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
    options: Operation333Options = {},
  ): Promise<
    ResourceResult<
      Operation333["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation333Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation333["responses"][200]["content"]["application/json"],
      Operation333["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation333Options = {}) {
    return flattenPages<
      Operation333["responses"][200]["content"]["application/json"],
      Operation333["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation334Options = {},
  ): Promise<
    ResourceResult<
      Operation334["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation334Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation334["responses"][200]["content"]["application/json"],
      Operation334["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation334Options = {}) {
    return flattenPages<
      Operation334["responses"][200]["content"]["application/json"],
      Operation334["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/grants. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation335["requestBody"]
    >["content"]["application/json"],
    options: Operation335Options = {},
  ): Promise<
    ResourceResult<
      Operation335["responses"][201]["content"]["application/json"]
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
    options: Operation336Options = {},
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
      Operation337["requestBody"]
    >["content"]["application/json"],
    options: Operation337Options = {},
  ): Promise<
    ResourceResult<
      Operation337["responses"][200]["content"]["application/json"]
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
    options: Operation338Options,
  ): Promise<
    ResourceResult<
      Operation338["responses"][200]["content"]["application/json"]
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
  get(options: Operation339Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal },
      headers: undefined,
      accept: "image/jpeg, image/png, image/webp",
    });
  }
  /** PUT /api/v1/workspaces/{workspace_id}/icon. Preserves response metadata; mutations are not replayed. */
  replace(
    body: Binary,
    options: Operation340Options,
  ): Promise<
    ResourceResult<
      Operation340["responses"][200]["content"]["application/json"]
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
    options: Operation341Options = {},
  ): Promise<
    ResourceResult<
      Operation341["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation341Options = {}) {
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
  items(options: Operation341Options = {}) {
    return flattenPages<
      Operation341["responses"][200]["content"]["application/json"],
      Operation341["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/invitations. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation342["requestBody"]
    >["content"]["application/json"],
    options: Operation342Options = {},
  ): Promise<
    ResourceResult<
      Operation342["responses"][201]["content"]["application/json"]
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
    options: Operation343Options,
  ): Promise<
    ResourceResult<
      Operation343["responses"][200]["content"]["application/json"]
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
    options: Operation344Options,
  ): Promise<
    ResourceResult<
      Operation344["responses"][200]["content"]["application/json"]
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
    options: Operation345Options = {},
  ): Promise<
    ResourceResult<
      Operation345["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation345Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation345["responses"][200]["content"]["application/json"],
      Operation345["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation345Options = {}) {
    return flattenPages<
      Operation345["responses"][200]["content"]["application/json"],
      Operation345["responses"][200]["content"]["application/json"]["items"][number]
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
    options: Operation346Options,
  ): Promise<
    ResourceResult<
      Operation346["responses"][200]["content"]["application/json"]
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
    options: Operation347Options = {},
  ): Promise<
    ResourceResult<
      Operation347["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation347Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation347["responses"][200]["content"]["application/json"],
      Operation347["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation347Options = {}) {
    return flattenPages<
      Operation347["responses"][200]["content"]["application/json"],
      Operation347["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/service-accounts. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation348["requestBody"]
    >["content"]["application/json"],
    options: Operation348Options = {},
  ): Promise<
    ResourceResult<
      Operation348["responses"][201]["content"]["application/json"]
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
  /** GET /api/v1/workspaces/{workspace_id}/service-accounts/{account_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation350Options = {},
  ): Promise<
    ResourceResult<
      Operation350["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/workspaces/{workspace_id}/service-accounts/{account_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation351["requestBody"]
    >["content"]["application/json"],
    options: Operation351Options,
  ): Promise<
    ResourceResult<
      Operation351["responses"][200]["content"]["application/json"]
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
    options: Operation352Options = {},
  ): Promise<
    ResourceResult<
      Operation352["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation352Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator<
      Operation352["responses"][200]["content"]["application/json"],
      Operation352["responses"][200]["content"]["application/json"]["items"][number]
    >(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation352Options = {}) {
    return flattenPages<
      Operation352["responses"][200]["content"]["application/json"],
      Operation352["responses"][200]["content"]["application/json"]["items"][number]
    >(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/service-accounts/{account_id}/keys. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation353["requestBody"]
    >["content"]["application/json"],
    options: Operation353Options = {},
  ): Promise<
    ResourceResult<
      Operation353["responses"][201]["content"]["application/json"]
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
    options: Operation354Options = {},
  ): Promise<
    ResourceResult<
      Operation354["responses"][200]["content"]["application/json"]
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
    options: Operation355Options = {},
  ): Promise<
    ResourceResult<
      Operation355["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
}
