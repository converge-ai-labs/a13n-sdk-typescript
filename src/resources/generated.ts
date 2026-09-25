/** Generated resource bindings. Do not edit; run npm run generate. */
import type { operations, Binary } from "../schema.js";
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
type Operation0 =
  operations["bootstrap_administrator_api_v1_auth_bootstrap_post"];
type Operation0Options = { signal?: AbortSignal };
type Operation3 = operations["password_login_api_v1_auth_login_post"];
type Operation3Options = { signal?: AbortSignal };
type Operation4Options = { signal?: AbortSignal };
type Operation1 =
  operations["auth_configuration_api_v1_auth_configuration_get"];
type Operation1Options = { signal?: AbortSignal };
type Operation2 =
  operations["confirm_email_change_api_v1_auth_email_change_confirm_post"];
type Operation2Options = { signal?: AbortSignal };
type Operation5 =
  operations["request_password_reset_api_v1_auth_password_reset_post"];
type Operation5Options = { signal?: AbortSignal };
type Operation6 =
  operations["confirm_password_reset_api_v1_auth_password_reset_confirm_post"];
type Operation6Options = { signal?: AbortSignal };
type Operation7 = operations["session_profile_api_v1_auth_session_get"];
type Operation7Options = { signal?: AbortSignal };
type Operation8 =
  operations["complete_authorization_api_v1_connections_callback_get"];
type Operation8Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation8["parameters"]["query"]>;
};
type Operation9 =
  operations["get_redirect_uri_api_v1_connections_redirect_uri_get"];
type Operation9Options = { signal?: AbortSignal };
type Operation10 =
  operations["accept_api_v1_invitations__invitation_id__accept_post"];
type Operation10Options = { signal?: AbortSignal };
type Operation11 = operations["list_mcp_servers_api_v1_mcp_servers_get"];
type Operation11Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation11["parameters"]["query"]>;
};
type Operation12 = operations["get_model_catalog_api_v1_model_catalog_get"];
type Operation12Options = { signal?: AbortSignal };
type Operation13 = operations["list_organizations_api_v1_organizations_get"];
type Operation13Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation13["parameters"]["query"]>;
};
type Operation14 =
  operations["get_organization_api_v1_organizations__organization_id__get"];
type Operation14Options = { signal?: AbortSignal };
type Operation15 =
  operations["update_organization_api_v1_organizations__organization_id__patch"];
type Operation15Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation15["parameters"]["header"]>["If-Match"];
};
type Operation16 =
  operations["list_organization_audit_events_api_v1_organizations__organization_id__audit_events_get"];
type Operation16Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation16["parameters"]["query"]>;
};
type Operation17 =
  operations["list_providers_api_v1_organizations__organization_id__connector_providers_get"];
type Operation17Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation17["parameters"]["query"]>;
};
type Operation18 =
  operations["create_provider_api_v1_organizations__organization_id__connector_providers_post"];
type Operation18Options = { signal?: AbortSignal };
type Operation19 =
  operations["get_provider_api_v1_organizations__organization_id__connector_providers__provider_id__get"];
type Operation19Options = { signal?: AbortSignal };
type Operation20 =
  operations["update_provider_api_v1_organizations__organization_id__connector_providers__provider_id__patch"];
type Operation20Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation20["parameters"]["header"]>["If-Match"];
};
type Operation21 =
  operations["test_provider_api_v1_organizations__organization_id__connector_providers__provider_id__test_post"];
type Operation21Options = { signal?: AbortSignal };
type Operation22 =
  operations["list_providers_api_v1_organizations__organization_id__environment_providers_get"];
type Operation22Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation22["parameters"]["query"]>;
};
type Operation23 =
  operations["create_provider_api_v1_organizations__organization_id__environment_providers_post"];
type Operation23Options = { signal?: AbortSignal };
type Operation24 =
  operations["get_provider_api_v1_organizations__organization_id__environment_providers__provider_id__get"];
type Operation24Options = { signal?: AbortSignal };
type Operation25 =
  operations["update_provider_api_v1_organizations__organization_id__environment_providers__provider_id__patch"];
type Operation25Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation25["parameters"]["header"]>["If-Match"];
};
type Operation26 =
  operations["test_provider_api_v1_organizations__organization_id__environment_providers__provider_id__test_post"];
type Operation26Options = { signal?: AbortSignal };
type Operation27 =
  operations["list_organization_grants_api_v1_organizations__organization_id__grants_get"];
type Operation27Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation27["parameters"]["query"]>;
};
type Operation28 =
  operations["create_organization_grant_api_v1_organizations__organization_id__grants_post"];
type Operation28Options = { signal?: AbortSignal };
type Operation29Options = { signal?: AbortSignal };
type Operation30 =
  operations["change_organization_grant_api_v1_organizations__organization_id__grants__grant_id__patch"];
type Operation30Options = { signal?: AbortSignal };
type Operation31 =
  operations["delete_organization_icon_api_v1_organizations__organization_id__icon_delete"];
type Operation31Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation31["parameters"]["header"]>["If-Match"];
};
type Operation32Options = { signal?: AbortSignal };
type Operation33 =
  operations["put_organization_icon_api_v1_organizations__organization_id__icon_put"];
type Operation33Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation33["parameters"]["header"]>["If-Match"];
  contentType: "image/jpeg" | "image/png" | "image/webp";
};
type Operation34 =
  operations["list_organization_invitations_api_v1_organizations__organization_id__invitations_get"];
type Operation34Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation34["parameters"]["query"]>;
};
type Operation35 =
  operations["create_organization_invitation_api_v1_organizations__organization_id__invitations_post"];
type Operation35Options = { signal?: AbortSignal };
type Operation36 =
  operations["resend_organization_invitation_api_v1_organizations__organization_id__invitations__invitation_id__resend_post"];
type Operation36Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation36["parameters"]["header"]>["If-Match"];
};
type Operation37 =
  operations["revoke_organization_invitation_api_v1_organizations__organization_id__invitations__invitation_id__revoke_post"];
type Operation37Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation37["parameters"]["header"]>["If-Match"];
};
type Operation38 =
  operations["list_members_api_v1_organizations__organization_id__members_get"];
type Operation38Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation38["parameters"]["query"]>;
};
type Operation39 =
  operations["list_providers_api_v1_organizations__organization_id__memory_providers_get"];
type Operation39Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation39["parameters"]["query"]>;
};
type Operation40 =
  operations["create_provider_api_v1_organizations__organization_id__memory_providers_post"];
type Operation40Options = { signal?: AbortSignal };
type Operation41 =
  operations["get_provider_api_v1_organizations__organization_id__memory_providers__provider_id__get"];
type Operation41Options = { signal?: AbortSignal };
type Operation42 =
  operations["update_provider_api_v1_organizations__organization_id__memory_providers__provider_id__patch"];
type Operation42Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation42["parameters"]["header"]>["If-Match"];
};
type Operation43 =
  operations["test_provider_api_v1_organizations__organization_id__memory_providers__provider_id__test_post"];
type Operation43Options = { signal?: AbortSignal };
type Operation44 =
  operations["list_providers_api_v1_organizations__organization_id__model_providers_get"];
type Operation44Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation44["parameters"]["query"]>;
};
type Operation45 =
  operations["create_provider_api_v1_organizations__organization_id__model_providers_post"];
type Operation45Options = { signal?: AbortSignal };
type Operation46 =
  operations["get_provider_api_v1_organizations__organization_id__model_providers__provider_id__get"];
type Operation46Options = { signal?: AbortSignal };
type Operation47 =
  operations["update_provider_api_v1_organizations__organization_id__model_providers__provider_id__patch"];
type Operation47Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation47["parameters"]["header"]>["If-Match"];
};
type Operation48 =
  operations["test_provider_api_v1_organizations__organization_id__model_providers__provider_id__test_post"];
type Operation48Options = { signal?: AbortSignal };
type Operation49 =
  operations["list_models_api_v1_organizations__organization_id__models_get"];
type Operation49Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation49["parameters"]["query"]>;
};
type Operation50 =
  operations["create_model_api_v1_organizations__organization_id__models_post"];
type Operation50Options = { signal?: AbortSignal };
type Operation51 =
  operations["get_model_api_v1_organizations__organization_id__models__model_id__get"];
type Operation51Options = { signal?: AbortSignal };
type Operation52 =
  operations["update_model_api_v1_organizations__organization_id__models__model_id__patch"];
type Operation52Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation52["parameters"]["header"]>["If-Match"];
};
type Operation53 =
  operations["list_providers_api_v1_organizations__organization_id__web_providers_get"];
type Operation53Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation53["parameters"]["query"]>;
};
type Operation54 =
  operations["create_provider_api_v1_organizations__organization_id__web_providers_post"];
type Operation54Options = { signal?: AbortSignal };
type Operation55 =
  operations["get_provider_api_v1_organizations__organization_id__web_providers__provider_id__get"];
type Operation55Options = { signal?: AbortSignal };
type Operation56 =
  operations["update_provider_api_v1_organizations__organization_id__web_providers__provider_id__patch"];
type Operation56Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation56["parameters"]["header"]>["If-Match"];
};
type Operation57 =
  operations["test_provider_api_v1_organizations__organization_id__web_providers__provider_id__test_post"];
type Operation57Options = { signal?: AbortSignal };
type Operation58 =
  operations["list_organization_workspaces_api_v1_organizations__organization_id__workspaces_get"];
type Operation58Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation58["parameters"]["query"]>;
};
type Operation59 =
  operations["create_workspace_api_v1_organizations__organization_id__workspaces_post"];
type Operation59Options = { signal?: AbortSignal };
type Operation60 =
  operations["list_provider_types_api_v1_provider_types__kind__get"];
type Operation60Options = { signal?: AbortSignal };
type Operation61 = operations["get_profile_api_v1_users_me_get"];
type Operation61Options = { signal?: AbortSignal };
type Operation62 = operations["update_profile_api_v1_users_me_patch"];
type Operation62Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation62["parameters"]["header"]>["If-Match"];
};
type Operation66 = operations["disable_account_api_v1_users_me_disable_post"];
type Operation66Options = { signal?: AbortSignal };
type Operation72 = operations["change_password_api_v1_users_me_password_post"];
type Operation72Options = { signal?: AbortSignal };
type Operation63 =
  operations["list_account_audit_events_api_v1_users_me_audit_events_get"];
type Operation63Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation63["parameters"]["query"]>;
};
type Operation64 = operations["delete_avatar_api_v1_users_me_avatar_delete"];
type Operation64Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation64["parameters"]["header"]>["If-Match"];
};
type Operation65 = operations["put_avatar_api_v1_users_me_avatar_put"];
type Operation65Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation65["parameters"]["header"]>["If-Match"];
  contentType: "image/jpeg" | "image/png" | "image/webp";
};
type Operation67 = operations["list_user_keys_api_v1_users_me_keys_get"];
type Operation67Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation67["parameters"]["query"]>;
};
type Operation68 = operations["create_user_key_api_v1_users_me_keys_post"];
type Operation68Options = { signal?: AbortSignal };
type Operation69 =
  operations["revoke_user_key_api_v1_users_me_keys__key_id__delete"];
type Operation69Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation69["parameters"]["header"]>["If-Match"];
};
type Operation70 =
  operations["list_login_sessions_api_v1_users_me_login_sessions_get"];
type Operation70Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation70["parameters"]["query"]>;
};
type Operation71Options = { signal?: AbortSignal };
type Operation73Options = { signal?: AbortSignal };
type Operation74 = operations["list_workspaces_api_v1_workspaces_get"];
type Operation74Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation74["parameters"]["query"]>;
};
type Operation75 =
  operations["get_workspace_api_v1_workspaces__workspace_id__get"];
type Operation75Options = { signal?: AbortSignal };
type Operation76 =
  operations["update_workspace_api_v1_workspaces__workspace_id__patch"];
type Operation76Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation76["parameters"]["header"]>["If-Match"];
};
type Operation92 =
  operations["archive_workspace_api_v1_workspaces__workspace_id__archive_post"];
type Operation92Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation92["parameters"]["header"]>["If-Match"];
};
type Operation99 =
  operations["prepare_assistant_api_v1_workspaces__workspace_id__configuration_assistant_post"];
type Operation99Options = { signal?: AbortSignal };
type Operation77 =
  operations["list_agents_api_v1_workspaces__workspace_id__agents_get"];
type Operation77Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation77["parameters"]["query"]>;
};
type Operation78 =
  operations["create_agent_api_v1_workspaces__workspace_id__agents_post"];
type Operation78Options = { signal?: AbortSignal };
type Operation79 =
  operations["validate_revision_api_v1_workspaces__workspace_id__agents_validate_post"];
type Operation79Options = { signal?: AbortSignal };
type Operation80 =
  operations["get_agent_api_v1_workspaces__workspace_id__agents__agent_id__get"];
type Operation80Options = { signal?: AbortSignal };
type Operation81 =
  operations["update_agent_api_v1_workspaces__workspace_id__agents__agent_id__patch"];
type Operation81Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation81["parameters"]["header"]>["If-Match"];
};
type Operation82 =
  operations["archive_agent_api_v1_workspaces__workspace_id__agents__agent_id__archive_post"];
type Operation82Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation82["parameters"]["header"]>["If-Match"];
};
type Operation86 =
  operations["duplicate_agent_api_v1_workspaces__workspace_id__agents__agent_id__duplicate_post"];
type Operation86Options = { signal?: AbortSignal };
type Operation91 =
  operations["unarchive_agent_api_v1_workspaces__workspace_id__agents__agent_id__unarchive_post"];
type Operation91Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation91["parameters"]["header"]>["If-Match"];
};
type Operation83 =
  operations["delete_avatar_api_v1_workspaces__workspace_id__agents__agent_id__avatar_delete"];
type Operation83Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation83["parameters"]["header"]>["If-Match"];
};
type Operation84Options = { signal?: AbortSignal };
type Operation85 =
  operations["put_avatar_api_v1_workspaces__workspace_id__agents__agent_id__avatar_put"];
type Operation85Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation85["parameters"]["header"]>["If-Match"];
  contentType: "image/jpeg" | "image/png" | "image/webp";
};
type Operation87 =
  operations["list_revisions_api_v1_workspaces__workspace_id__agents__agent_id__revisions_get"];
type Operation87Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation87["parameters"]["query"]>;
};
type Operation88 =
  operations["create_revision_api_v1_workspaces__workspace_id__agents__agent_id__revisions_post"];
type Operation88Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation88["parameters"]["header"]>["If-Match"];
};
type Operation89 =
  operations["get_revision_api_v1_workspaces__workspace_id__agents__agent_id__revisions__revision_id__get"];
type Operation89Options = { signal?: AbortSignal };
type Operation90 =
  operations["set_default_api_v1_workspaces__workspace_id__agents__agent_id__revisions__revision_id__set_default_post"];
type Operation90Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation90["parameters"]["header"]>["If-Match"];
};
type Operation93 =
  operations["list_assets_api_v1_workspaces__workspace_id__assets_get"];
type Operation93Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation93["parameters"]["query"]>;
};
type Operation94 =
  operations["create_asset_api_v1_workspaces__workspace_id__assets_post"];
type Operation94Options = { signal?: AbortSignal };
type Operation95 =
  operations["retire_asset_api_v1_workspaces__workspace_id__assets__asset_id__delete"];
type Operation95Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation95["parameters"]["header"]>["If-Match"];
};
type Operation96 =
  operations["get_asset_api_v1_workspaces__workspace_id__assets__asset_id__get"];
type Operation96Options = { signal?: AbortSignal };
type Operation97Options = { signal?: AbortSignal };
type Operation98 =
  operations["list_workspace_audit_events_api_v1_workspaces__workspace_id__audit_events_get"];
type Operation98Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation98["parameters"]["query"]>;
};
type Operation100 =
  operations["list_connections_api_v1_workspaces__workspace_id__connections_get"];
type Operation100Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation100["parameters"]["query"]>;
};
type Operation101 =
  operations["create_connection_api_v1_workspaces__workspace_id__connections_post"];
type Operation101Options = { signal?: AbortSignal };
type Operation102 =
  operations["get_connection_api_v1_workspaces__workspace_id__connections__connection_id__get"];
type Operation102Options = { signal?: AbortSignal };
type Operation103 =
  operations["update_connection_api_v1_workspaces__workspace_id__connections__connection_id__patch"];
type Operation103Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation103["parameters"]["header"]>["If-Match"];
};
type Operation104 =
  operations["authorize_connection_api_v1_workspaces__workspace_id__connections__connection_id__authorize_post"];
type Operation104Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation104["parameters"]["header"]>["If-Match"];
};
type Operation105 =
  operations["revoke_connection_api_v1_workspaces__workspace_id__connections__connection_id__revoke_post"];
type Operation105Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation105["parameters"]["header"]>["If-Match"];
};
type Operation106 =
  operations["test_connection_api_v1_workspaces__workspace_id__connections__connection_id__test_post"];
type Operation106Options = { signal?: AbortSignal };
type Operation107 =
  operations["list_tools_api_v1_workspaces__workspace_id__connections__connection_id__tools_get"];
type Operation107Options = { signal?: AbortSignal };
type Operation108 =
  operations["list_apps_api_v1_workspaces__workspace_id__connector_providers__provider_id__apps_get"];
type Operation108Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation108["parameters"]["query"]>;
};
type Operation109 =
  operations["get_app_api_v1_workspaces__workspace_id__connector_providers__provider_id__apps__app__get"];
type Operation109Options = { signal?: AbortSignal };
type Operation110 =
  operations["list_actions_api_v1_workspaces__workspace_id__connector_providers__provider_id__apps__app__actions_get"];
type Operation110Options = { signal?: AbortSignal };
type Operation111 =
  operations["list_templates_api_v1_workspaces__workspace_id__environment_templates_get"];
type Operation111Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation111["parameters"]["query"]>;
};
type Operation112 =
  operations["create_template_api_v1_workspaces__workspace_id__environment_templates_post"];
type Operation112Options = { signal?: AbortSignal };
type Operation113 =
  operations["get_template_api_v1_workspaces__workspace_id__environment_templates__template_id__get"];
type Operation113Options = { signal?: AbortSignal };
type Operation114 =
  operations["update_template_api_v1_workspaces__workspace_id__environment_templates__template_id__patch"];
type Operation114Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation114["parameters"]["header"]>["If-Match"];
};
type Operation115 =
  operations["list_environments_api_v1_workspaces__workspace_id__environments_get"];
type Operation115Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation115["parameters"]["query"]>;
};
type Operation116 =
  operations["create_environment_api_v1_workspaces__workspace_id__environments_post"];
type Operation116Options = { signal?: AbortSignal };
type Operation117 =
  operations["delete_environment_api_v1_workspaces__workspace_id__environments__environment_id__delete"];
type Operation117Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation117["parameters"]["header"]>["If-Match"];
};
type Operation118 =
  operations["get_environment_api_v1_workspaces__workspace_id__environments__environment_id__get"];
type Operation118Options = { signal?: AbortSignal };
type Operation119 =
  operations["update_environment_api_v1_workspaces__workspace_id__environments__environment_id__patch"];
type Operation119Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation119["parameters"]["header"]>["If-Match"];
};
type Operation120 =
  operations["stop_environment_api_v1_workspaces__workspace_id__environments__environment_id__stop_post"];
type Operation120Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation120["parameters"]["header"]>["If-Match"];
};
type Operation121 =
  operations["list_workspace_grants_api_v1_workspaces__workspace_id__grants_get"];
type Operation121Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation121["parameters"]["query"]>;
};
type Operation122 =
  operations["create_workspace_grant_api_v1_workspaces__workspace_id__grants_post"];
type Operation122Options = { signal?: AbortSignal };
type Operation123Options = { signal?: AbortSignal };
type Operation124 =
  operations["change_workspace_grant_api_v1_workspaces__workspace_id__grants__grant_id__patch"];
type Operation124Options = { signal?: AbortSignal };
type Operation125 =
  operations["delete_workspace_icon_api_v1_workspaces__workspace_id__icon_delete"];
type Operation125Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation125["parameters"]["header"]>["If-Match"];
};
type Operation126Options = { signal?: AbortSignal };
type Operation127 =
  operations["put_workspace_icon_api_v1_workspaces__workspace_id__icon_put"];
type Operation127Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation127["parameters"]["header"]>["If-Match"];
  contentType: "image/jpeg" | "image/png" | "image/webp";
};
type Operation128 =
  operations["list_workspace_invitations_api_v1_workspaces__workspace_id__invitations_get"];
type Operation128Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation128["parameters"]["query"]>;
};
type Operation129 =
  operations["create_workspace_invitation_api_v1_workspaces__workspace_id__invitations_post"];
type Operation129Options = { signal?: AbortSignal };
type Operation130 =
  operations["resend_workspace_invitation_api_v1_workspaces__workspace_id__invitations__invitation_id__resend_post"];
type Operation130Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation130["parameters"]["header"]>["If-Match"];
};
type Operation131 =
  operations["revoke_workspace_invitation_api_v1_workspaces__workspace_id__invitations__invitation_id__revoke_post"];
type Operation131Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation131["parameters"]["header"]>["If-Match"];
};
type Operation132 =
  operations["list_workspace_keys_api_v1_workspaces__workspace_id__keys_get"];
type Operation132Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation132["parameters"]["query"]>;
};
type Operation133 =
  operations["revoke_workspace_key_api_v1_workspaces__workspace_id__keys__key_id__delete"];
type Operation133Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation133["parameters"]["header"]>["If-Match"];
};
type Operation134 =
  operations["get_media_defaults_api_v1_workspaces__workspace_id__media_understanding_defaults_get"];
type Operation134Options = { signal?: AbortSignal };
type Operation135 =
  operations["replace_media_defaults_api_v1_workspaces__workspace_id__media_understanding_defaults_put"];
type Operation135Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation135["parameters"]["header"]>["If-Match"];
};
type Operation136 =
  operations["list_memories_api_v1_workspaces__workspace_id__memories_get"];
type Operation136Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation136["parameters"]["query"]>;
};
type Operation137 =
  operations["create_memory_api_v1_workspaces__workspace_id__memories_post"];
type Operation137Options = { signal?: AbortSignal };
type Operation138 =
  operations["delete_memory_api_v1_workspaces__workspace_id__memories__memory_id__delete"];
type Operation138Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation138["parameters"]["header"]>["If-Match"];
};
type Operation139 =
  operations["get_memory_api_v1_workspaces__workspace_id__memories__memory_id__get"];
type Operation139Options = { signal?: AbortSignal };
type Operation140 =
  operations["update_memory_api_v1_workspaces__workspace_id__memories__memory_id__patch"];
type Operation140Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation140["parameters"]["header"]>["If-Match"];
};
type Operation141 =
  operations["list_files_api_v1_workspaces__workspace_id__memories__memory_id__files_get"];
type Operation141Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation141["parameters"]["query"]>;
};
type Operation142 =
  operations["create_file_api_v1_workspaces__workspace_id__memories__memory_id__files_post"];
type Operation142Options = { signal?: AbortSignal };
type Operation143 =
  operations["move_file_api_v1_workspaces__workspace_id__memories__memory_id__files_move_post"];
type Operation143Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation143["parameters"]["header"]>["If-Match"];
};
type Operation144 =
  operations["delete_file_api_v1_workspaces__workspace_id__memories__memory_id__files__path__delete"];
type Operation144Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation144["parameters"]["header"]>["If-Match"];
};
type Operation145 =
  operations["read_file_api_v1_workspaces__workspace_id__memories__memory_id__files__path__get"];
type Operation145Options = { signal?: AbortSignal };
type Operation146 =
  operations["replace_file_api_v1_workspaces__workspace_id__memories__memory_id__files__path__put"];
type Operation146Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation146["parameters"]["header"]>["If-Match"];
};
type Operation147 =
  operations["list_records_api_v1_workspaces__workspace_id__memories__memory_id__records_get"];
type Operation147Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation147["parameters"]["query"]>;
};
type Operation148 =
  operations["add_record_api_v1_workspaces__workspace_id__memories__memory_id__records_post"];
type Operation148Options = { signal?: AbortSignal };
type Operation149 =
  operations["search_records_api_v1_workspaces__workspace_id__memories__memory_id__records_search_post"];
type Operation149Options = { signal?: AbortSignal };
type Operation150Options = { signal?: AbortSignal };
type Operation151 =
  operations["update_record_api_v1_workspaces__workspace_id__memories__memory_id__records__record_id__put"];
type Operation151Options = { signal?: AbortSignal };
type Operation152 =
  operations["purge_history_api_v1_workspaces__workspace_id__memories__memory_id__revisions_delete"];
type Operation152Options = {
  signal?: AbortSignal;
  query: NonNullable<Operation152["parameters"]["query"]>;
};
type Operation153 =
  operations["list_revisions_api_v1_workspaces__workspace_id__memories__memory_id__revisions_get"];
type Operation153Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation153["parameters"]["query"]>;
};
type Operation154 =
  operations["get_revision_api_v1_workspaces__workspace_id__memories__memory_id__revisions__seq__get"];
type Operation154Options = { signal?: AbortSignal };
type Operation155 =
  operations["restore_revision_api_v1_workspaces__workspace_id__memories__memory_id__revisions__seq__restore_post"];
type Operation155Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation155["parameters"]["header"]>["If-Match"];
};
type Operation156 =
  operations["get_run_api_v1_workspaces__workspace_id__runs__run_id__get"];
type Operation156Options = { signal?: AbortSignal };
type Operation157 =
  operations["update_run_api_v1_workspaces__workspace_id__runs__run_id__patch"];
type Operation157Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation157["parameters"]["header"]>["If-Match"];
};
type Operation160 =
  operations["fork_run_api_v1_workspaces__workspace_id__runs__run_id__fork_post"];
type Operation160Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    Operation160["parameters"]["header"]
  >["Idempotency-Key"];
};
type Operation161 =
  operations["interrupt_run_api_v1_workspaces__workspace_id__runs__run_id__interrupt_post"];
type Operation161Options = { signal?: AbortSignal };
type Operation164 =
  operations["resume_run_api_v1_workspaces__workspace_id__runs__run_id__resume_post"];
type Operation164Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    Operation164["parameters"]["header"]
  >["Idempotency-Key"];
};
type Operation158 =
  operations["run_attempts_api_v1_workspaces__workspace_id__runs__run_id__attempts_get"];
type Operation158Options = { signal?: AbortSignal };
type Operation159 =
  operations["list_attempt_spans_api_v1_workspaces__workspace_id__runs__run_id__attempts__attempt_id__trace_get"];
type Operation159Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation159["parameters"]["query"]>;
};
type Operation162 =
  operations["run_items_api_v1_workspaces__workspace_id__runs__run_id__items_get"];
type Operation162Options = { signal?: AbortSignal };
type Operation163 =
  operations["run_lineage_api_v1_workspaces__workspace_id__runs__run_id__lineage_get"];
type Operation163Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation163["parameters"]["query"]>;
};
type Operation165 =
  operations["list_secrets_api_v1_workspaces__workspace_id__secrets_get"];
type Operation165Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation165["parameters"]["query"]>;
};
type Operation166 =
  operations["create_secret_api_v1_workspaces__workspace_id__secrets_post"];
type Operation166Options = { signal?: AbortSignal };
type Operation167 =
  operations["delete_secret_api_v1_workspaces__workspace_id__secrets__secret_id__delete"];
type Operation167Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation167["parameters"]["header"]>["If-Match"];
};
type Operation168 =
  operations["get_secret_api_v1_workspaces__workspace_id__secrets__secret_id__get"];
type Operation168Options = { signal?: AbortSignal };
type Operation169 =
  operations["replace_secret_api_v1_workspaces__workspace_id__secrets__secret_id__put"];
type Operation169Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation169["parameters"]["header"]>["If-Match"];
};
type Operation170 =
  operations["list_service_accounts_api_v1_workspaces__workspace_id__service_accounts_get"];
type Operation170Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation170["parameters"]["query"]>;
};
type Operation171 =
  operations["create_service_account_api_v1_workspaces__workspace_id__service_accounts_post"];
type Operation171Options = { signal?: AbortSignal };
type Operation172 =
  operations["delete_service_account_api_v1_workspaces__workspace_id__service_accounts__account_id__delete"];
type Operation172Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation172["parameters"]["header"]>["If-Match"];
};
type Operation173 =
  operations["get_service_account_api_v1_workspaces__workspace_id__service_accounts__account_id__get"];
type Operation173Options = { signal?: AbortSignal };
type Operation174 =
  operations["update_service_account_api_v1_workspaces__workspace_id__service_accounts__account_id__patch"];
type Operation174Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation174["parameters"]["header"]>["If-Match"];
};
type Operation175 =
  operations["list_service_account_keys_api_v1_workspaces__workspace_id__service_accounts__account_id__keys_get"];
type Operation175Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation175["parameters"]["query"]>;
};
type Operation176 =
  operations["create_service_account_key_api_v1_workspaces__workspace_id__service_accounts__account_id__keys_post"];
type Operation176Options = { signal?: AbortSignal };
type Operation177 =
  operations["list_sessions_api_v1_workspaces__workspace_id__sessions_get"];
type Operation177Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation177["parameters"]["query"]>;
};
type Operation178 =
  operations["create_session_api_v1_workspaces__workspace_id__sessions_post"];
type Operation178Options = { signal?: AbortSignal };
type Operation179 =
  operations["get_session_api_v1_workspaces__workspace_id__sessions__session_id__get"];
type Operation179Options = { signal?: AbortSignal };
type Operation180 =
  operations["update_session_api_v1_workspaces__workspace_id__sessions__session_id__patch"];
type Operation180Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation180["parameters"]["header"]>["If-Match"];
};
type Operation181 =
  operations["list_skills_api_v1_workspaces__workspace_id__skills_get"];
type Operation181Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation181["parameters"]["query"]>;
};
type Operation182 =
  operations["create_skill_api_v1_workspaces__workspace_id__skills_post"];
type Operation182Options = { signal?: AbortSignal };
type Operation183 =
  operations["validate_package_api_v1_workspaces__workspace_id__skills_validate_post"];
type Operation183Options = { signal?: AbortSignal };
type Operation184 =
  operations["get_skill_api_v1_workspaces__workspace_id__skills__skill_id__get"];
type Operation184Options = { signal?: AbortSignal };
type Operation185 =
  operations["update_skill_api_v1_workspaces__workspace_id__skills__skill_id__patch"];
type Operation185Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation185["parameters"]["header"]>["If-Match"];
};
type Operation186 =
  operations["archive_skill_api_v1_workspaces__workspace_id__skills__skill_id__archive_post"];
type Operation186Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation186["parameters"]["header"]>["If-Match"];
};
type Operation193 =
  operations["unarchive_skill_api_v1_workspaces__workspace_id__skills__skill_id__unarchive_post"];
type Operation193Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation193["parameters"]["header"]>["If-Match"];
};
type Operation187 =
  operations["list_revisions_api_v1_workspaces__workspace_id__skills__skill_id__revisions_get"];
type Operation187Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation187["parameters"]["query"]>;
};
type Operation188 =
  operations["create_revision_api_v1_workspaces__workspace_id__skills__skill_id__revisions_post"];
type Operation188Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation188["parameters"]["header"]>["If-Match"];
};
type Operation189 =
  operations["get_revision_api_v1_workspaces__workspace_id__skills__skill_id__revisions__revision_id__get"];
type Operation189Options = { signal?: AbortSignal };
type Operation192 =
  operations["set_default_revision_api_v1_workspaces__workspace_id__skills__skill_id__revisions__revision_id__set_default_post"];
type Operation192Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation192["parameters"]["header"]>["If-Match"];
};
type Operation190Options = { signal?: AbortSignal };
type Operation191Options = { signal?: AbortSignal };
type Operation194 =
  operations["list_subscriptions_api_v1_workspaces__workspace_id__subscriptions_get"];
type Operation194Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation194["parameters"]["query"]>;
};
type Operation195 =
  operations["create_subscription_api_v1_workspaces__workspace_id__subscriptions_post"];
type Operation195Options = { signal?: AbortSignal };
type Operation196 =
  operations["delete_subscription_api_v1_workspaces__workspace_id__subscriptions__subscription_id__delete"];
type Operation196Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation196["parameters"]["header"]>["If-Match"];
};
type Operation197 =
  operations["get_subscription_api_v1_workspaces__workspace_id__subscriptions__subscription_id__get"];
type Operation197Options = { signal?: AbortSignal };
type Operation198 =
  operations["update_subscription_api_v1_workspaces__workspace_id__subscriptions__subscription_id__patch"];
type Operation198Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation198["parameters"]["header"]>["If-Match"];
};
type Operation199 =
  operations["list_deliveries_api_v1_workspaces__workspace_id__subscriptions__subscription_id__deliveries_get"];
type Operation199Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation199["parameters"]["query"]>;
};
type Operation200 =
  operations["redeliver_api_v1_workspaces__workspace_id__subscriptions__subscription_id__deliveries__delivery_id__redeliver_post"];
type Operation200Options = { signal?: AbortSignal };
type Operation201 =
  operations["list_threads_api_v1_workspaces__workspace_id__threads_get"];
type Operation201Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation201["parameters"]["query"]>;
};
type Operation202 =
  operations["create_thread_api_v1_workspaces__workspace_id__threads_post"];
type Operation202Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    Operation202["parameters"]["header"]
  >["Idempotency-Key"];
};
type Operation203 =
  operations["get_thread_api_v1_workspaces__workspace_id__threads__thread_id__get"];
type Operation203Options = { signal?: AbortSignal };
type Operation204 =
  operations["update_thread_api_v1_workspaces__workspace_id__threads__thread_id__patch"];
type Operation204Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation204["parameters"]["header"]>["If-Match"];
};
type Operation205 =
  operations["archive_thread_api_v1_workspaces__workspace_id__threads__thread_id__archive_post"];
type Operation205Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation205["parameters"]["header"]>["If-Match"];
};
type Operation206 =
  operations["list_mounts_api_v1_workspaces__workspace_id__threads__thread_id__environments_get"];
type Operation206Options = { signal?: AbortSignal };
type Operation207 =
  operations["add_mount_api_v1_workspaces__workspace_id__threads__thread_id__environments_post"];
type Operation207Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation207["parameters"]["header"]>["If-Match"];
};
type Operation208 =
  operations["remove_mount_api_v1_workspaces__workspace_id__threads__thread_id__environments__name__delete"];
type Operation208Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation208["parameters"]["header"]>["If-Match"];
};
type Operation209 =
  operations["list_inbox_api_v1_workspaces__workspace_id__threads__thread_id__inbox_get"];
type Operation209Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation209["parameters"]["query"]>;
};
type Operation210 =
  operations["submit_message_api_v1_workspaces__workspace_id__threads__thread_id__inbox_post"];
type Operation210Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    Operation210["parameters"]["header"]
  >["Idempotency-Key"];
};
type Operation211 =
  operations["reorder_inbox_api_v1_workspaces__workspace_id__threads__thread_id__inbox_order_put"];
type Operation211Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation211["parameters"]["header"]>["If-Match"];
};
type Operation212 =
  operations["withdraw_entry_api_v1_workspaces__workspace_id__threads__thread_id__inbox__entry_id__delete"];
type Operation212Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation212["parameters"]["header"]>["If-Match"];
};
type Operation213 =
  operations["get_entry_api_v1_workspaces__workspace_id__threads__thread_id__inbox__entry_id__get"];
type Operation213Options = { signal?: AbortSignal };
type Operation214 =
  operations["edit_entry_api_v1_workspaces__workspace_id__threads__thread_id__inbox__entry_id__patch"];
type Operation214Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation214["parameters"]["header"]>["If-Match"];
};
type Operation215 =
  operations["list_mounts_api_v1_workspaces__workspace_id__threads__thread_id__memories_get"];
type Operation215Options = { signal?: AbortSignal };
type Operation216 =
  operations["add_mount_api_v1_workspaces__workspace_id__threads__thread_id__memories_post"];
type Operation216Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation216["parameters"]["header"]>["If-Match"];
};
type Operation217 =
  operations["remove_mount_api_v1_workspaces__workspace_id__threads__thread_id__memories__name__delete"];
type Operation217Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation217["parameters"]["header"]>["If-Match"];
};
type Operation218 =
  operations["update_mount_api_v1_workspaces__workspace_id__threads__thread_id__memories__name__patch"];
type Operation218Options = {
  signal?: AbortSignal;
  ifMatch?: NonNullable<Operation218["parameters"]["header"]>["If-Match"];
};
type Operation219 =
  operations["list_thread_runs_api_v1_workspaces__workspace_id__threads__thread_id__runs_get"];
type Operation219Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation219["parameters"]["query"]>;
};
type Operation220 =
  operations["thread_stream_api_v1_workspaces__workspace_id__threads__thread_id__stream_get"];
type Operation220Options = {
  signal?: AbortSignal;
  lastEventId?: NonNullable<
    Operation220["parameters"]["header"]
  >["Last-Event-ID"];
};
type Operation221 =
  operations["list_toolsets_api_v1_workspaces__workspace_id__toolsets_get"];
type Operation221Options = { signal?: AbortSignal };
type Operation222 =
  operations["get_trace_backend_api_v1_workspaces__workspace_id__trace_backend_get"];
type Operation222Options = { signal?: AbortSignal };
type Operation223 =
  operations["list_traces_api_v1_workspaces__workspace_id__traces_get"];
type Operation223Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation223["parameters"]["query"]>;
};
type Operation224 =
  operations["get_trace_api_v1_workspaces__workspace_id__traces__trace_id__get"];
type Operation224Options = { signal?: AbortSignal };
type Operation225 =
  operations["list_trace_spans_api_v1_workspaces__workspace_id__traces__trace_id__spans_get"];
type Operation225Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation225["parameters"]["query"]>;
};
type Operation226 =
  operations["create_upload_api_v1_workspaces__workspace_id__uploads_post"];
type Operation226Options = {
  signal?: AbortSignal;
  idempotencyKey: NonNullable<
    Operation226["parameters"]["header"]
  >["Idempotency-Key"];
};
type Operation227 =
  operations["summarize_usage_api_v1_workspaces__workspace_id__usage_get"];
type Operation227Options = {
  signal?: AbortSignal;
  query?: NonNullable<Operation227["parameters"]["query"]>;
};
type Operation228 = operations["health_healthz_get"];
type Operation228Options = { signal?: AbortSignal };
type Operation229 = operations["ready_readyz_get"];
type Operation229Options = { signal?: AbortSignal };
export class ServiceResources {
  constructor(private readonly transport: Transport) {}
  get auth(): AuthResource {
    return new AuthResource(this.transport, "/api/v1/auth");
  }
  get connections(): ConnectionsResource {
    return new ConnectionsResource(this.transport, "/api/v1/connections");
  }
  get invitations(): InvitationsResource {
    return new InvitationsResource(this.transport, "/api/v1/invitations");
  }
  get mcpServers(): McpServersResource {
    return new McpServersResource(this.transport, "/api/v1/mcp-servers");
  }
  get modelCatalog(): ModelCatalogResource {
    return new ModelCatalogResource(this.transport, "/api/v1/model-catalog");
  }
  get organizations(): OrganizationsResource {
    return new OrganizationsResource(this.transport, "/api/v1/organizations");
  }
  get providerTypes(): ProviderTypesResource {
    return new ProviderTypesResource(this.transport, "/api/v1/provider-types");
  }
  get users(): UsersResource {
    return new UsersResource(this.transport, "/api/v1/users");
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

export class AuthResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** POST /api/v1/auth/bootstrap. Preserves response metadata; mutations are not replayed. */
  bootstrap(
    body: NonNullable<Operation0["requestBody"]>["content"]["application/json"],
    options: Operation0Options = {},
  ): Promise<
    ResourceResult<Operation0["responses"][200]["content"]["application/json"]>
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
    body: NonNullable<Operation3["requestBody"]>["content"]["application/json"],
    options: Operation3Options = {},
  ): Promise<
    ResourceResult<Operation3["responses"][200]["content"]["application/json"]>
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
  logout(options: Operation4Options = {}): Promise<ResourceResult<undefined>> {
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
    options: Operation1Options = {},
  ): Promise<
    ResourceResult<Operation1["responses"][200]["content"]["application/json"]>
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
    body: NonNullable<Operation2["requestBody"]>["content"]["application/json"],
    options: Operation2Options = {},
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
    body: NonNullable<Operation5["requestBody"]>["content"]["application/json"],
    options: Operation5Options = {},
  ): Promise<ResourceResult<undefined>> {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  /** POST /api/v1/auth/password-reset/confirm. Preserves response metadata; mutations are not replayed. */
  confirm(
    body: NonNullable<Operation6["requestBody"]>["content"]["application/json"],
    options: Operation6Options = {},
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
    options: Operation7Options = {},
  ): Promise<
    ResourceResult<Operation7["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
}

export class ConnectionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
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
}

export class ConnectionsCallbackResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/connections/callback. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation8Options,
  ): Promise<
    ResourceResult<Operation8["responses"][200]["content"]["application/json"]>
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
    options: Operation9Options = {},
  ): Promise<
    ResourceResult<Operation9["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
}

export class InvitationsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  ref(
    value: operations["accept_api_v1_invitations__invitation_id__accept_post"]["parameters"]["path"]["invitation_id"],
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
      Operation10["requestBody"]
    >["content"]["application/json"],
    options: Operation10Options = {},
  ): Promise<
    ResourceResult<Operation10["responses"][200]["content"]["application/json"]>
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
    options: Operation11Options = {},
  ): Promise<
    ResourceResult<Operation11["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation11Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation11Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
}

export class ModelCatalogResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/model-catalog. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation12Options = {},
  ): Promise<
    ResourceResult<Operation12["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
}

export class OrganizationsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation13Options = {},
  ): Promise<
    ResourceResult<Operation13["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation13Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation13Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  ref(
    value: operations["get_organization_api_v1_organizations__organization_id__get"]["parameters"]["path"]["organization_id"],
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
    options: Operation14Options = {},
  ): Promise<
    ResourceResult<Operation14["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/organizations/{organization_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation15["requestBody"]
    >["content"]["application/json"],
    options: Operation15Options = {},
  ): Promise<
    ResourceResult<Operation15["responses"][200]["content"]["application/json"]>
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
  get connectorProviders(): OrganizationsOrganizationIdConnectorProvidersResource {
    return new OrganizationsOrganizationIdConnectorProvidersResource(
      this.transport,
      this.path + "/connector-providers",
    );
  }
  get environmentProviders(): OrganizationsOrganizationIdEnvironmentProvidersResource {
    return new OrganizationsOrganizationIdEnvironmentProvidersResource(
      this.transport,
      this.path + "/environment-providers",
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
  get memoryProviders(): OrganizationsOrganizationIdMemoryProvidersResource {
    return new OrganizationsOrganizationIdMemoryProvidersResource(
      this.transport,
      this.path + "/memory-providers",
    );
  }
  get modelProviders(): OrganizationsOrganizationIdModelProvidersResource {
    return new OrganizationsOrganizationIdModelProvidersResource(
      this.transport,
      this.path + "/model-providers",
    );
  }
  get models(): OrganizationsOrganizationIdModelsResource {
    return new OrganizationsOrganizationIdModelsResource(
      this.transport,
      this.path + "/models",
    );
  }
  get webProviders(): OrganizationsOrganizationIdWebProvidersResource {
    return new OrganizationsOrganizationIdWebProvidersResource(
      this.transport,
      this.path + "/web-providers",
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
    options: Operation16Options = {},
  ): Promise<
    ResourceResult<Operation16["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation16Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation16Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
}

export class OrganizationsOrganizationIdConnectorProvidersResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/connector-providers. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation17Options = {},
  ): Promise<
    ResourceResult<Operation17["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation17Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation17Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/organizations/{organization_id}/connector-providers. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation18["requestBody"]
    >["content"]["application/json"],
    options: Operation18Options = {},
  ): Promise<
    ResourceResult<Operation18["responses"][201]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["get_provider_api_v1_organizations__organization_id__connector_providers__provider_id__get"]["parameters"]["path"]["provider_id"],
  ): OrganizationsOrganizationIdConnectorProvidersProviderIdResource {
    return new OrganizationsOrganizationIdConnectorProvidersProviderIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class OrganizationsOrganizationIdConnectorProvidersProviderIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/connector-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation19Options = {},
  ): Promise<
    ResourceResult<Operation19["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/organizations/{organization_id}/connector-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation20["requestBody"]
    >["content"]["application/json"],
    options: Operation20Options = {},
  ): Promise<
    ResourceResult<Operation20["responses"][200]["content"]["application/json"]>
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
  /** POST /api/v1/organizations/{organization_id}/connector-providers/{provider_id}/test. Preserves response metadata; mutations are not replayed. */
  test(
    options: Operation21Options = {},
  ): Promise<
    ResourceResult<Operation21["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/test",
      undefined,
      undefined,
      { signal: options.signal },
    );
  }
}

export class OrganizationsOrganizationIdEnvironmentProvidersResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/environment-providers. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation22Options = {},
  ): Promise<
    ResourceResult<Operation22["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation22Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation22Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/organizations/{organization_id}/environment-providers. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation23["requestBody"]
    >["content"]["application/json"],
    options: Operation23Options = {},
  ): Promise<
    ResourceResult<Operation23["responses"][201]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["get_provider_api_v1_organizations__organization_id__environment_providers__provider_id__get"]["parameters"]["path"]["provider_id"],
  ): OrganizationsOrganizationIdEnvironmentProvidersProviderIdResource {
    return new OrganizationsOrganizationIdEnvironmentProvidersProviderIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class OrganizationsOrganizationIdEnvironmentProvidersProviderIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/environment-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation24Options = {},
  ): Promise<
    ResourceResult<Operation24["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/organizations/{organization_id}/environment-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation25["requestBody"]
    >["content"]["application/json"],
    options: Operation25Options = {},
  ): Promise<
    ResourceResult<Operation25["responses"][200]["content"]["application/json"]>
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
  /** POST /api/v1/organizations/{organization_id}/environment-providers/{provider_id}/test. Preserves response metadata; mutations are not replayed. */
  test(
    options: Operation26Options = {},
  ): Promise<
    ResourceResult<Operation26["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/test",
      undefined,
      undefined,
      { signal: options.signal },
    );
  }
}

export class OrganizationsOrganizationIdGrantsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/grants. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation27Options = {},
  ): Promise<
    ResourceResult<Operation27["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation27Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation27Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/organizations/{organization_id}/grants. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation28["requestBody"]
    >["content"]["application/json"],
    options: Operation28Options = {},
  ): Promise<
    ResourceResult<Operation28["responses"][201]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["delete_organization_grant_api_v1_organizations__organization_id__grants__grant_id__delete"]["parameters"]["path"]["grant_id"],
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
  delete(options: Operation29Options = {}): Promise<ResourceResult<undefined>> {
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
      Operation30["requestBody"]
    >["content"]["application/json"],
    options: Operation30Options = {},
  ): Promise<
    ResourceResult<Operation30["responses"][200]["content"]["application/json"]>
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
    options: Operation31Options = {},
  ): Promise<
    ResourceResult<Operation31["responses"][200]["content"]["application/json"]>
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
  get(options: Operation32Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal },
      headers: undefined,
      accept: "image/jpeg, image/png, image/webp",
    });
  }
  /** PUT /api/v1/organizations/{organization_id}/icon. Preserves response metadata; mutations are not replayed. */
  replace(
    body: Binary,
    options: Operation33Options,
  ): Promise<
    ResourceResult<Operation33["responses"][200]["content"]["application/json"]>
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
    options: Operation34Options = {},
  ): Promise<
    ResourceResult<Operation34["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation34Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation34Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/organizations/{organization_id}/invitations. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation35["requestBody"]
    >["content"]["application/json"],
    options: Operation35Options = {},
  ): Promise<
    ResourceResult<Operation35["responses"][201]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["resend_organization_invitation_api_v1_organizations__organization_id__invitations__invitation_id__resend_post"]["parameters"]["path"]["invitation_id"],
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
    options: Operation36Options = {},
  ): Promise<
    ResourceResult<Operation36["responses"][200]["content"]["application/json"]>
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
    options: Operation37Options = {},
  ): Promise<
    ResourceResult<Operation37["responses"][200]["content"]["application/json"]>
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
    options: Operation38Options = {},
  ): Promise<
    ResourceResult<Operation38["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation38Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation38Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
}

export class OrganizationsOrganizationIdMemoryProvidersResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/memory-providers. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation39Options = {},
  ): Promise<
    ResourceResult<Operation39["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation39Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation39Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/organizations/{organization_id}/memory-providers. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation40["requestBody"]
    >["content"]["application/json"],
    options: Operation40Options = {},
  ): Promise<
    ResourceResult<Operation40["responses"][201]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["get_provider_api_v1_organizations__organization_id__memory_providers__provider_id__get"]["parameters"]["path"]["provider_id"],
  ): OrganizationsOrganizationIdMemoryProvidersProviderIdResource {
    return new OrganizationsOrganizationIdMemoryProvidersProviderIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class OrganizationsOrganizationIdMemoryProvidersProviderIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/memory-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation41Options = {},
  ): Promise<
    ResourceResult<Operation41["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/organizations/{organization_id}/memory-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation42["requestBody"]
    >["content"]["application/json"],
    options: Operation42Options = {},
  ): Promise<
    ResourceResult<Operation42["responses"][200]["content"]["application/json"]>
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
  /** POST /api/v1/organizations/{organization_id}/memory-providers/{provider_id}/test. Preserves response metadata; mutations are not replayed. */
  test(
    options: Operation43Options = {},
  ): Promise<
    ResourceResult<Operation43["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/test",
      undefined,
      undefined,
      { signal: options.signal },
    );
  }
}

export class OrganizationsOrganizationIdModelProvidersResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/model-providers. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation44Options = {},
  ): Promise<
    ResourceResult<Operation44["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation44Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation44Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/organizations/{organization_id}/model-providers. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation45["requestBody"]
    >["content"]["application/json"],
    options: Operation45Options = {},
  ): Promise<
    ResourceResult<Operation45["responses"][201]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["get_provider_api_v1_organizations__organization_id__model_providers__provider_id__get"]["parameters"]["path"]["provider_id"],
  ): OrganizationsOrganizationIdModelProvidersProviderIdResource {
    return new OrganizationsOrganizationIdModelProvidersProviderIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class OrganizationsOrganizationIdModelProvidersProviderIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/model-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation46Options = {},
  ): Promise<
    ResourceResult<Operation46["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/organizations/{organization_id}/model-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation47["requestBody"]
    >["content"]["application/json"],
    options: Operation47Options = {},
  ): Promise<
    ResourceResult<Operation47["responses"][200]["content"]["application/json"]>
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
  /** POST /api/v1/organizations/{organization_id}/model-providers/{provider_id}/test. Preserves response metadata; mutations are not replayed. */
  test(
    options: Operation48Options = {},
  ): Promise<
    ResourceResult<Operation48["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/test",
      undefined,
      undefined,
      { signal: options.signal },
    );
  }
}

export class OrganizationsOrganizationIdModelsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/models. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation49Options = {},
  ): Promise<
    ResourceResult<Operation49["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation49Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation49Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/organizations/{organization_id}/models. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation50["requestBody"]
    >["content"]["application/json"],
    options: Operation50Options = {},
  ): Promise<
    ResourceResult<Operation50["responses"][201]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["get_model_api_v1_organizations__organization_id__models__model_id__get"]["parameters"]["path"]["model_id"],
  ): OrganizationsOrganizationIdModelsModelIdResource {
    return new OrganizationsOrganizationIdModelsModelIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class OrganizationsOrganizationIdModelsModelIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/models/{model_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation51Options = {},
  ): Promise<
    ResourceResult<Operation51["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/organizations/{organization_id}/models/{model_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation52["requestBody"]
    >["content"]["application/json"],
    options: Operation52Options = {},
  ): Promise<
    ResourceResult<Operation52["responses"][200]["content"]["application/json"]>
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
}

export class OrganizationsOrganizationIdWebProvidersResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/web-providers. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation53Options = {},
  ): Promise<
    ResourceResult<Operation53["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation53Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation53Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/organizations/{organization_id}/web-providers. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation54["requestBody"]
    >["content"]["application/json"],
    options: Operation54Options = {},
  ): Promise<
    ResourceResult<Operation54["responses"][201]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["get_provider_api_v1_organizations__organization_id__web_providers__provider_id__get"]["parameters"]["path"]["provider_id"],
  ): OrganizationsOrganizationIdWebProvidersProviderIdResource {
    return new OrganizationsOrganizationIdWebProvidersProviderIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class OrganizationsOrganizationIdWebProvidersProviderIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/web-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation55Options = {},
  ): Promise<
    ResourceResult<Operation55["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/organizations/{organization_id}/web-providers/{provider_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation56["requestBody"]
    >["content"]["application/json"],
    options: Operation56Options = {},
  ): Promise<
    ResourceResult<Operation56["responses"][200]["content"]["application/json"]>
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
  /** POST /api/v1/organizations/{organization_id}/web-providers/{provider_id}/test. Preserves response metadata; mutations are not replayed. */
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
      undefined,
      { signal: options.signal },
    );
  }
}

export class OrganizationsOrganizationIdWorkspacesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/organizations/{organization_id}/workspaces. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation58Options = {},
  ): Promise<
    ResourceResult<Operation58["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation58Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation58Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/organizations/{organization_id}/workspaces. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation59["requestBody"]
    >["content"]["application/json"],
    options: Operation59Options = {},
  ): Promise<
    ResourceResult<Operation59["responses"][201]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
}

export class ProviderTypesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  ref(
    value: operations["list_provider_types_api_v1_provider_types__kind__get"]["parameters"]["path"]["kind"],
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
    options: Operation60Options = {},
  ): Promise<
    ResourceResult<Operation60["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
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
    value: operations["get_avatar_api_v1_users__user_id__avatar_get"]["parameters"]["path"]["user_id"],
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
    options: Operation61Options = {},
  ): Promise<
    ResourceResult<Operation61["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/users/me. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation62["requestBody"]
    >["content"]["application/json"],
    options: Operation62Options = {},
  ): Promise<
    ResourceResult<Operation62["responses"][200]["content"]["application/json"]>
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
      Operation66["requestBody"]
    >["content"]["application/json"],
    options: Operation66Options = {},
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
      Operation72["requestBody"]
    >["content"]["application/json"],
    options: Operation72Options = {},
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
    options: Operation63Options = {},
  ): Promise<
    ResourceResult<Operation63["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation63Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation63Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
}

export class UsersMeAvatarResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/users/me/avatar. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation64Options = {},
  ): Promise<
    ResourceResult<Operation64["responses"][200]["content"]["application/json"]>
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
    options: Operation65Options,
  ): Promise<
    ResourceResult<Operation65["responses"][200]["content"]["application/json"]>
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
    options: Operation67Options = {},
  ): Promise<
    ResourceResult<Operation67["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation67Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation67Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/users/me/keys. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation68["requestBody"]
    >["content"]["application/json"],
    options: Operation68Options = {},
  ): Promise<
    ResourceResult<Operation68["responses"][201]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["revoke_user_key_api_v1_users_me_keys__key_id__delete"]["parameters"]["path"]["key_id"],
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
    options: Operation69Options = {},
  ): Promise<
    ResourceResult<Operation69["responses"][200]["content"]["application/json"]>
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
    options: Operation70Options = {},
  ): Promise<
    ResourceResult<Operation70["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation70Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation70Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  ref(
    value: operations["revoke_login_session_api_v1_users_me_login_sessions__session_id__delete"]["parameters"]["path"]["session_id"],
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
  delete(options: Operation71Options = {}): Promise<ResourceResult<undefined>> {
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
  get(options: Operation73Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal },
      headers: undefined,
      accept: "image/jpeg, image/png, image/webp",
    });
  }
}

export class WorkspacesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation74Options = {},
  ): Promise<
    ResourceResult<Operation74["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation74Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation74Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  ref(
    value: operations["get_workspace_api_v1_workspaces__workspace_id__get"]["parameters"]["path"]["workspace_id"],
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
    options: Operation75Options = {},
  ): Promise<
    ResourceResult<Operation75["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/workspaces/{workspace_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation76["requestBody"]
    >["content"]["application/json"],
    options: Operation76Options = {},
  ): Promise<
    ResourceResult<Operation76["responses"][200]["content"]["application/json"]>
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
  get agents(): WorkspacesWorkspaceIdAgentsResource {
    return new WorkspacesWorkspaceIdAgentsResource(
      this.transport,
      this.path + "/agents",
    );
  }
  /** POST /api/v1/workspaces/{workspace_id}/archive. Preserves response metadata; mutations are not replayed. */
  archive(
    options: Operation92Options = {},
  ): Promise<
    ResourceResult<Operation92["responses"][200]["content"]["application/json"]>
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
  get assets(): WorkspacesWorkspaceIdAssetsResource {
    return new WorkspacesWorkspaceIdAssetsResource(
      this.transport,
      this.path + "/assets",
    );
  }
  get auditEvents(): WorkspacesWorkspaceIdAuditEventsResource {
    return new WorkspacesWorkspaceIdAuditEventsResource(
      this.transport,
      this.path + "/audit-events",
    );
  }
  /** POST /api/v1/workspaces/{workspace_id}/configuration-assistant. Preserves response metadata; mutations are not replayed. */
  configurationAssistant(
    options: Operation99Options = {},
  ): Promise<
    ResourceResult<Operation99["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/configuration-assistant",
      undefined,
      undefined,
      { signal: options.signal },
    );
  }
  get connections(): WorkspacesWorkspaceIdConnectionsResource {
    return new WorkspacesWorkspaceIdConnectionsResource(
      this.transport,
      this.path + "/connections",
    );
  }
  get connectorProviders(): WorkspacesWorkspaceIdConnectorProvidersResource {
    return new WorkspacesWorkspaceIdConnectorProvidersResource(
      this.transport,
      this.path + "/connector-providers",
    );
  }
  get environmentTemplates(): WorkspacesWorkspaceIdEnvironmentTemplatesResource {
    return new WorkspacesWorkspaceIdEnvironmentTemplatesResource(
      this.transport,
      this.path + "/environment-templates",
    );
  }
  get environments(): WorkspacesWorkspaceIdEnvironmentsResource {
    return new WorkspacesWorkspaceIdEnvironmentsResource(
      this.transport,
      this.path + "/environments",
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
  get mediaUnderstandingDefaults(): WorkspacesWorkspaceIdMediaUnderstandingDefaultsResource {
    return new WorkspacesWorkspaceIdMediaUnderstandingDefaultsResource(
      this.transport,
      this.path + "/media-understanding-defaults",
    );
  }
  get memories(): WorkspacesWorkspaceIdMemoriesResource {
    return new WorkspacesWorkspaceIdMemoriesResource(
      this.transport,
      this.path + "/memories",
    );
  }
  get runs(): WorkspacesWorkspaceIdRunsResource {
    return new WorkspacesWorkspaceIdRunsResource(
      this.transport,
      this.path + "/runs",
    );
  }
  get secrets(): WorkspacesWorkspaceIdSecretsResource {
    return new WorkspacesWorkspaceIdSecretsResource(
      this.transport,
      this.path + "/secrets",
    );
  }
  get serviceAccounts(): WorkspacesWorkspaceIdServiceAccountsResource {
    return new WorkspacesWorkspaceIdServiceAccountsResource(
      this.transport,
      this.path + "/service-accounts",
    );
  }
  get sessions(): WorkspacesWorkspaceIdSessionsResource {
    return new WorkspacesWorkspaceIdSessionsResource(
      this.transport,
      this.path + "/sessions",
    );
  }
  get skills(): WorkspacesWorkspaceIdSkillsResource {
    return new WorkspacesWorkspaceIdSkillsResource(
      this.transport,
      this.path + "/skills",
    );
  }
  get subscriptions(): WorkspacesWorkspaceIdSubscriptionsResource {
    return new WorkspacesWorkspaceIdSubscriptionsResource(
      this.transport,
      this.path + "/subscriptions",
    );
  }
  get threads(): WorkspacesWorkspaceIdThreadsResource {
    return new WorkspacesWorkspaceIdThreadsResource(
      this.transport,
      this.path + "/threads",
    );
  }
  get toolsets(): WorkspacesWorkspaceIdToolsetsResource {
    return new WorkspacesWorkspaceIdToolsetsResource(
      this.transport,
      this.path + "/toolsets",
    );
  }
  get traceBackend(): WorkspacesWorkspaceIdTraceBackendResource {
    return new WorkspacesWorkspaceIdTraceBackendResource(
      this.transport,
      this.path + "/trace-backend",
    );
  }
  get traces(): WorkspacesWorkspaceIdTracesResource {
    return new WorkspacesWorkspaceIdTracesResource(
      this.transport,
      this.path + "/traces",
    );
  }
  get uploads(): WorkspacesWorkspaceIdUploadsResource {
    return new WorkspacesWorkspaceIdUploadsResource(
      this.transport,
      this.path + "/uploads",
    );
  }
  get usage(): WorkspacesWorkspaceIdUsageResource {
    return new WorkspacesWorkspaceIdUsageResource(
      this.transport,
      this.path + "/usage",
    );
  }
}

export class WorkspacesWorkspaceIdAgentsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/agents. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation77Options = {},
  ): Promise<
    ResourceResult<Operation77["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation77Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation77Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/agents. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation78["requestBody"]
    >["content"]["application/json"],
    options: Operation78Options = {},
  ): Promise<
    ResourceResult<Operation78["responses"][201]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  /** POST /api/v1/workspaces/{workspace_id}/agents/validate. Preserves response metadata; mutations are not replayed. */
  validate(
    body: NonNullable<
      Operation79["requestBody"]
    >["content"]["application/json"],
    options: Operation79Options = {},
  ): Promise<ResourceResult<undefined>> {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/validate",
      body,
      undefined,
      { signal: options.signal },
    );
  }
  ref(
    value: operations["get_agent_api_v1_workspaces__workspace_id__agents__agent_id__get"]["parameters"]["path"]["agent_id"],
  ): WorkspacesWorkspaceIdAgentsAgentIdResource {
    return new WorkspacesWorkspaceIdAgentsAgentIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdAgentsAgentIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/agents/{agent_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation80Options = {},
  ): Promise<
    ResourceResult<Operation80["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/workspaces/{workspace_id}/agents/{agent_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation81["requestBody"]
    >["content"]["application/json"],
    options: Operation81Options = {},
  ): Promise<
    ResourceResult<Operation81["responses"][200]["content"]["application/json"]>
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
  /** POST /api/v1/workspaces/{workspace_id}/agents/{agent_id}/archive. Preserves response metadata; mutations are not replayed. */
  archive(
    options: Operation82Options = {},
  ): Promise<
    ResourceResult<Operation82["responses"][200]["content"]["application/json"]>
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
  get avatar(): WorkspacesWorkspaceIdAgentsAgentIdAvatarResource {
    return new WorkspacesWorkspaceIdAgentsAgentIdAvatarResource(
      this.transport,
      this.path + "/avatar",
    );
  }
  /** POST /api/v1/workspaces/{workspace_id}/agents/{agent_id}/duplicate. Preserves response metadata; mutations are not replayed. */
  duplicate(
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
      this.path + "/duplicate",
      body,
      undefined,
      { signal: options.signal },
    );
  }
  get revisions(): WorkspacesWorkspaceIdAgentsAgentIdRevisionsResource {
    return new WorkspacesWorkspaceIdAgentsAgentIdRevisionsResource(
      this.transport,
      this.path + "/revisions",
    );
  }
  /** POST /api/v1/workspaces/{workspace_id}/agents/{agent_id}/unarchive. Preserves response metadata; mutations are not replayed. */
  unarchive(
    options: Operation91Options = {},
  ): Promise<
    ResourceResult<Operation91["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/unarchive",
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

export class WorkspacesWorkspaceIdAgentsAgentIdAvatarResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/workspaces/{workspace_id}/agents/{agent_id}/avatar. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation83Options = {},
  ): Promise<
    ResourceResult<Operation83["responses"][200]["content"]["application/json"]>
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
  /** GET /api/v1/workspaces/{workspace_id}/agents/{agent_id}/avatar. Caller owns and closes the unbuffered body. */
  get(options: Operation84Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal },
      headers: undefined,
      accept: "image/jpeg, image/png, image/webp",
    });
  }
  /** PUT /api/v1/workspaces/{workspace_id}/agents/{agent_id}/avatar. Preserves response metadata; mutations are not replayed. */
  replace(
    body: Binary,
    options: Operation85Options,
  ): Promise<
    ResourceResult<Operation85["responses"][200]["content"]["application/json"]>
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

export class WorkspacesWorkspaceIdAgentsAgentIdRevisionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/agents/{agent_id}/revisions. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation87Options = {},
  ): Promise<
    ResourceResult<Operation87["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation87Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation87Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/agents/{agent_id}/revisions. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation88["requestBody"]
    >["content"]["application/json"],
    options: Operation88Options = {},
  ): Promise<
    ResourceResult<Operation88["responses"][201]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
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
  ref(
    value: operations["get_revision_api_v1_workspaces__workspace_id__agents__agent_id__revisions__revision_id__get"]["parameters"]["path"]["revision_id"],
  ): WorkspacesWorkspaceIdAgentsAgentIdRevisionsRevisionIdResource {
    return new WorkspacesWorkspaceIdAgentsAgentIdRevisionsRevisionIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdAgentsAgentIdRevisionsRevisionIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/agents/{agent_id}/revisions/{revision_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation89Options = {},
  ): Promise<
    ResourceResult<Operation89["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** POST /api/v1/workspaces/{workspace_id}/agents/{agent_id}/revisions/{revision_id}/set-default. Preserves response metadata; mutations are not replayed. */
  setDefault(
    options: Operation90Options = {},
  ): Promise<
    ResourceResult<Operation90["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/set-default",
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

export class WorkspacesWorkspaceIdAssetsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/assets. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation93Options = {},
  ): Promise<
    ResourceResult<Operation93["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation93Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation93Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/assets. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation94["requestBody"]
    >["content"]["application/json"],
    options: Operation94Options = {},
  ): Promise<
    ResourceResult<
      | Operation94["responses"][200]["content"]["application/json"]
      | Operation94["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["retire_asset_api_v1_workspaces__workspace_id__assets__asset_id__delete"]["parameters"]["path"]["asset_id"],
  ): WorkspacesWorkspaceIdAssetsAssetIdResource {
    return new WorkspacesWorkspaceIdAssetsAssetIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdAssetsAssetIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/workspaces/{workspace_id}/assets/{asset_id}. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation95Options = {},
  ): Promise<
    ResourceResult<Operation95["responses"][200]["content"]["application/json"]>
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
  /** GET /api/v1/workspaces/{workspace_id}/assets/{asset_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation96Options = {},
  ): Promise<
    ResourceResult<Operation96["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  get content(): WorkspacesWorkspaceIdAssetsAssetIdContentResource {
    return new WorkspacesWorkspaceIdAssetsAssetIdContentResource(
      this.transport,
      this.path + "/content",
    );
  }
}

export class WorkspacesWorkspaceIdAssetsAssetIdContentResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/assets/{asset_id}/content. Caller owns and closes the unbuffered body. */
  get(options: Operation97Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal },
      headers: undefined,
      accept: "*/*",
    });
  }
}

export class WorkspacesWorkspaceIdAuditEventsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/audit-events. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation98Options = {},
  ): Promise<
    ResourceResult<Operation98["responses"][200]["content"]["application/json"]>
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation98Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation98Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
}

export class WorkspacesWorkspaceIdConnectionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/connections. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation100Options = {},
  ): Promise<
    ResourceResult<
      Operation100["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation100Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation100Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/connections. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation101["requestBody"]
    >["content"]["application/json"],
    options: Operation101Options = {},
  ): Promise<
    ResourceResult<
      Operation101["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["get_connection_api_v1_workspaces__workspace_id__connections__connection_id__get"]["parameters"]["path"]["connection_id"],
  ): WorkspacesWorkspaceIdConnectionsConnectionIdResource {
    return new WorkspacesWorkspaceIdConnectionsConnectionIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdConnectionsConnectionIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/connections/{connection_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation102Options = {},
  ): Promise<
    ResourceResult<
      Operation102["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/workspaces/{workspace_id}/connections/{connection_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation103["requestBody"]
    >["content"]["application/json"],
    options: Operation103Options = {},
  ): Promise<
    ResourceResult<
      Operation103["responses"][200]["content"]["application/json"]
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
  /** POST /api/v1/workspaces/{workspace_id}/connections/{connection_id}/authorize. Preserves response metadata; mutations are not replayed. */
  authorize(
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
      this.path + "/authorize",
      body,
      Object.fromEntries(
        Object.entries({ "If-Match": options.ifMatch })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/workspaces/{workspace_id}/connections/{connection_id}/revoke. Preserves response metadata; mutations are not replayed. */
  revoke(
    options: Operation105Options = {},
  ): Promise<
    ResourceResult<
      Operation105["responses"][200]["content"]["application/json"]
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
  /** POST /api/v1/workspaces/{workspace_id}/connections/{connection_id}/test. Preserves response metadata; mutations are not replayed. */
  test(
    options: Operation106Options = {},
  ): Promise<
    ResourceResult<
      Operation106["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/test",
      undefined,
      undefined,
      { signal: options.signal },
    );
  }
  get tools(): WorkspacesWorkspaceIdConnectionsConnectionIdToolsResource {
    return new WorkspacesWorkspaceIdConnectionsConnectionIdToolsResource(
      this.transport,
      this.path + "/tools",
    );
  }
}

export class WorkspacesWorkspaceIdConnectionsConnectionIdToolsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/connections/{connection_id}/tools. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation107Options = {},
  ): Promise<
    ResourceResult<
      Operation107["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
}

export class WorkspacesWorkspaceIdConnectorProvidersResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  ref(
    value: operations["list_apps_api_v1_workspaces__workspace_id__connector_providers__provider_id__apps_get"]["parameters"]["path"]["provider_id"],
  ): WorkspacesWorkspaceIdConnectorProvidersProviderIdResource {
    return new WorkspacesWorkspaceIdConnectorProvidersProviderIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdConnectorProvidersProviderIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  get apps(): WorkspacesWorkspaceIdConnectorProvidersProviderIdAppsResource {
    return new WorkspacesWorkspaceIdConnectorProvidersProviderIdAppsResource(
      this.transport,
      this.path + "/apps",
    );
  }
}

export class WorkspacesWorkspaceIdConnectorProvidersProviderIdAppsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/connector-providers/{provider_id}/apps. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation108Options = {},
  ): Promise<
    ResourceResult<
      Operation108["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation108Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation108Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  ref(
    value: operations["get_app_api_v1_workspaces__workspace_id__connector_providers__provider_id__apps__app__get"]["parameters"]["path"]["app"],
  ): WorkspacesWorkspaceIdConnectorProvidersProviderIdAppsAppResource {
    return new WorkspacesWorkspaceIdConnectorProvidersProviderIdAppsAppResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdConnectorProvidersProviderIdAppsAppResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/connector-providers/{provider_id}/apps/{app}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation109Options = {},
  ): Promise<
    ResourceResult<
      Operation109["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  get actions(): WorkspacesWorkspaceIdConnectorProvidersProviderIdAppsAppActionsResource {
    return new WorkspacesWorkspaceIdConnectorProvidersProviderIdAppsAppActionsResource(
      this.transport,
      this.path + "/actions",
    );
  }
}

export class WorkspacesWorkspaceIdConnectorProvidersProviderIdAppsAppActionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/connector-providers/{provider_id}/apps/{app}/actions. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation110Options = {},
  ): Promise<
    ResourceResult<
      Operation110["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
}

export class WorkspacesWorkspaceIdEnvironmentTemplatesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/environment-templates. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation111Options = {},
  ): Promise<
    ResourceResult<
      Operation111["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation111Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation111Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/environment-templates. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation112["requestBody"]
    >["content"]["application/json"],
    options: Operation112Options = {},
  ): Promise<
    ResourceResult<
      Operation112["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["get_template_api_v1_workspaces__workspace_id__environment_templates__template_id__get"]["parameters"]["path"]["template_id"],
  ): WorkspacesWorkspaceIdEnvironmentTemplatesTemplateIdResource {
    return new WorkspacesWorkspaceIdEnvironmentTemplatesTemplateIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdEnvironmentTemplatesTemplateIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/environment-templates/{template_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation113Options = {},
  ): Promise<
    ResourceResult<
      Operation113["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/workspaces/{workspace_id}/environment-templates/{template_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation114["requestBody"]
    >["content"]["application/json"],
    options: Operation114Options = {},
  ): Promise<
    ResourceResult<
      Operation114["responses"][200]["content"]["application/json"]
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
}

export class WorkspacesWorkspaceIdEnvironmentsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/environments. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation115Options = {},
  ): Promise<
    ResourceResult<
      Operation115["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation115Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation115Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/environments. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation116["requestBody"]
    >["content"]["application/json"],
    options: Operation116Options = {},
  ): Promise<
    ResourceResult<
      Operation116["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["delete_environment_api_v1_workspaces__workspace_id__environments__environment_id__delete"]["parameters"]["path"]["environment_id"],
  ): WorkspacesWorkspaceIdEnvironmentsEnvironmentIdResource {
    return new WorkspacesWorkspaceIdEnvironmentsEnvironmentIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdEnvironmentsEnvironmentIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/workspaces/{workspace_id}/environments/{environment_id}. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation117Options = {},
  ): Promise<
    ResourceResult<
      Operation117["responses"][202]["content"]["application/json"]
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
  /** GET /api/v1/workspaces/{workspace_id}/environments/{environment_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation118Options = {},
  ): Promise<
    ResourceResult<
      Operation118["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/workspaces/{workspace_id}/environments/{environment_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation119["requestBody"]
    >["content"]["application/json"],
    options: Operation119Options = {},
  ): Promise<
    ResourceResult<
      Operation119["responses"][200]["content"]["application/json"]
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
  /** POST /api/v1/workspaces/{workspace_id}/environments/{environment_id}/stop. Preserves response metadata; mutations are not replayed. */
  stop(
    options: Operation120Options = {},
  ): Promise<
    ResourceResult<
      Operation120["responses"][202]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/stop",
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

export class WorkspacesWorkspaceIdGrantsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/grants. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation121Options = {},
  ): Promise<
    ResourceResult<
      Operation121["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation121Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation121Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/grants. Preserves response metadata; mutations are not replayed. */
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
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["delete_workspace_grant_api_v1_workspaces__workspace_id__grants__grant_id__delete"]["parameters"]["path"]["grant_id"],
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
    options: Operation123Options = {},
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
      Operation124["requestBody"]
    >["content"]["application/json"],
    options: Operation124Options = {},
  ): Promise<
    ResourceResult<
      Operation124["responses"][200]["content"]["application/json"]
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
    options: Operation125Options = {},
  ): Promise<
    ResourceResult<
      Operation125["responses"][200]["content"]["application/json"]
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
  get(options: Operation126Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal },
      headers: undefined,
      accept: "image/jpeg, image/png, image/webp",
    });
  }
  /** PUT /api/v1/workspaces/{workspace_id}/icon. Preserves response metadata; mutations are not replayed. */
  replace(
    body: Binary,
    options: Operation127Options,
  ): Promise<
    ResourceResult<
      Operation127["responses"][200]["content"]["application/json"]
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
    options: Operation128Options = {},
  ): Promise<
    ResourceResult<
      Operation128["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation128Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation128Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/invitations. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation129["requestBody"]
    >["content"]["application/json"],
    options: Operation129Options = {},
  ): Promise<
    ResourceResult<
      Operation129["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["resend_workspace_invitation_api_v1_workspaces__workspace_id__invitations__invitation_id__resend_post"]["parameters"]["path"]["invitation_id"],
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
    options: Operation130Options = {},
  ): Promise<
    ResourceResult<
      Operation130["responses"][200]["content"]["application/json"]
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
    options: Operation131Options = {},
  ): Promise<
    ResourceResult<
      Operation131["responses"][200]["content"]["application/json"]
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
    options: Operation132Options = {},
  ): Promise<
    ResourceResult<
      Operation132["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation132Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation132Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  ref(
    value: operations["revoke_workspace_key_api_v1_workspaces__workspace_id__keys__key_id__delete"]["parameters"]["path"]["key_id"],
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
    options: Operation133Options = {},
  ): Promise<
    ResourceResult<
      Operation133["responses"][200]["content"]["application/json"]
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

export class WorkspacesWorkspaceIdMediaUnderstandingDefaultsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/media-understanding-defaults. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation134Options = {},
  ): Promise<
    ResourceResult<
      Operation134["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PUT /api/v1/workspaces/{workspace_id}/media-understanding-defaults. Preserves response metadata; mutations are not replayed. */
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
        Object.entries({ "If-Match": options.ifMatch })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class WorkspacesWorkspaceIdMemoriesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/memories. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation136Options = {},
  ): Promise<
    ResourceResult<
      Operation136["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation136Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation136Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/memories. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation137["requestBody"]
    >["content"]["application/json"],
    options: Operation137Options = {},
  ): Promise<
    ResourceResult<
      Operation137["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["delete_memory_api_v1_workspaces__workspace_id__memories__memory_id__delete"]["parameters"]["path"]["memory_id"],
  ): WorkspacesWorkspaceIdMemoriesMemoryIdResource {
    return new WorkspacesWorkspaceIdMemoriesMemoryIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdMemoriesMemoryIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/workspaces/{workspace_id}/memories/{memory_id}. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation138Options = {},
  ): Promise<ResourceResult<undefined>> {
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
  /** GET /api/v1/workspaces/{workspace_id}/memories/{memory_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation139Options = {},
  ): Promise<
    ResourceResult<
      Operation139["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/workspaces/{workspace_id}/memories/{memory_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation140["requestBody"]
    >["content"]["application/json"],
    options: Operation140Options = {},
  ): Promise<
    ResourceResult<
      Operation140["responses"][200]["content"]["application/json"]
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
  get files(): WorkspacesWorkspaceIdMemoriesMemoryIdFilesResource {
    return new WorkspacesWorkspaceIdMemoriesMemoryIdFilesResource(
      this.transport,
      this.path + "/files",
    );
  }
  get records(): WorkspacesWorkspaceIdMemoriesMemoryIdRecordsResource {
    return new WorkspacesWorkspaceIdMemoriesMemoryIdRecordsResource(
      this.transport,
      this.path + "/records",
    );
  }
  get revisions(): WorkspacesWorkspaceIdMemoriesMemoryIdRevisionsResource {
    return new WorkspacesWorkspaceIdMemoriesMemoryIdRevisionsResource(
      this.transport,
      this.path + "/revisions",
    );
  }
}

export class WorkspacesWorkspaceIdMemoriesMemoryIdFilesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/memories/{memory_id}/files. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation141Options = {},
  ): Promise<
    ResourceResult<
      Operation141["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation141Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation141Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/memories/{memory_id}/files. Preserves response metadata; mutations are not replayed. */
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
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  /** POST /api/v1/workspaces/{workspace_id}/memories/{memory_id}/files/move. Preserves response metadata; mutations are not replayed. */
  move(
    body: NonNullable<
      Operation143["requestBody"]
    >["content"]["application/json"],
    options: Operation143Options = {},
  ): Promise<
    ResourceResult<
      Operation143["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/move",
      body,
      Object.fromEntries(
        Object.entries({ "If-Match": options.ifMatch })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["delete_file_api_v1_workspaces__workspace_id__memories__memory_id__files__path__delete"]["parameters"]["path"]["path"],
  ): WorkspacesWorkspaceIdMemoriesMemoryIdFilesPathResource {
    return new WorkspacesWorkspaceIdMemoriesMemoryIdFilesPathResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdMemoriesMemoryIdFilesPathResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/workspaces/{workspace_id}/memories/{memory_id}/files/{path}. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation144Options = {},
  ): Promise<ResourceResult<undefined>> {
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
  /** GET /api/v1/workspaces/{workspace_id}/memories/{memory_id}/files/{path}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation145Options = {},
  ): Promise<
    ResourceResult<
      Operation145["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PUT /api/v1/workspaces/{workspace_id}/memories/{memory_id}/files/{path}. Preserves response metadata; mutations are not replayed. */
  replace(
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

export class WorkspacesWorkspaceIdMemoriesMemoryIdRecordsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/memories/{memory_id}/records. Preserves response metadata; mutations are not replayed. */
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
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation147Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/memories/{memory_id}/records. Preserves response metadata; mutations are not replayed. */
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
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  /** POST /api/v1/workspaces/{workspace_id}/memories/{memory_id}/records/search. Preserves response metadata; mutations are not replayed. */
  search(
    body: NonNullable<
      Operation149["requestBody"]
    >["content"]["application/json"],
    options: Operation149Options = {},
  ): Promise<
    ResourceResult<
      Operation149["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/search",
      body,
      undefined,
      { signal: options.signal },
    );
  }
  ref(
    value: operations["delete_record_api_v1_workspaces__workspace_id__memories__memory_id__records__record_id__delete"]["parameters"]["path"]["record_id"],
  ): WorkspacesWorkspaceIdMemoriesMemoryIdRecordsRecordIdResource {
    return new WorkspacesWorkspaceIdMemoriesMemoryIdRecordsRecordIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdMemoriesMemoryIdRecordsRecordIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/workspaces/{workspace_id}/memories/{memory_id}/records/{record_id}. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation150Options = {},
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
  /** PUT /api/v1/workspaces/{workspace_id}/memories/{memory_id}/records/{record_id}. Preserves response metadata; mutations are not replayed. */
  replace(
    body: NonNullable<
      Operation151["requestBody"]
    >["content"]["application/json"],
    options: Operation151Options = {},
  ): Promise<
    ResourceResult<
      Operation151["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "PUT", this.path, body, undefined, {
      signal: options.signal,
    });
  }
}

export class WorkspacesWorkspaceIdMemoriesMemoryIdRevisionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/workspaces/{workspace_id}/memories/{memory_id}/revisions. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation152Options,
  ): Promise<
    ResourceResult<
      Operation152["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "DELETE",
      this.path,
      undefined,
      undefined,
      { signal: options.signal, query: options.query },
    );
  }
  /** GET /api/v1/workspaces/{workspace_id}/memories/{memory_id}/revisions. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation153Options = {},
  ): Promise<
    ResourceResult<
      Operation153["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation153Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation153Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  ref(
    value: operations["get_revision_api_v1_workspaces__workspace_id__memories__memory_id__revisions__seq__get"]["parameters"]["path"]["seq"],
  ): WorkspacesWorkspaceIdMemoriesMemoryIdRevisionsSeqResource {
    return new WorkspacesWorkspaceIdMemoriesMemoryIdRevisionsSeqResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdMemoriesMemoryIdRevisionsSeqResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/memories/{memory_id}/revisions/{seq}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation154Options = {},
  ): Promise<
    ResourceResult<
      Operation154["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** POST /api/v1/workspaces/{workspace_id}/memories/{memory_id}/revisions/{seq}/restore. Preserves response metadata; mutations are not replayed. */
  restore(
    options: Operation155Options = {},
  ): Promise<
    ResourceResult<
      Operation155["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/restore",
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

export class WorkspacesWorkspaceIdRunsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  ref(
    value: operations["get_run_api_v1_workspaces__workspace_id__runs__run_id__get"]["parameters"]["path"]["run_id"],
  ): WorkspacesWorkspaceIdRunsRunIdResource {
    return new WorkspacesWorkspaceIdRunsRunIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdRunsRunIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/runs/{run_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation156Options = {},
  ): Promise<
    ResourceResult<
      Operation156["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/workspaces/{workspace_id}/runs/{run_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation157["requestBody"]
    >["content"]["application/json"],
    options: Operation157Options = {},
  ): Promise<
    ResourceResult<
      Operation157["responses"][200]["content"]["application/json"]
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
  get attempts(): WorkspacesWorkspaceIdRunsRunIdAttemptsResource {
    return new WorkspacesWorkspaceIdRunsRunIdAttemptsResource(
      this.transport,
      this.path + "/attempts",
    );
  }
  /** POST /api/v1/workspaces/{workspace_id}/runs/{run_id}/fork. Preserves response metadata; mutations are not replayed. */
  fork(
    body: NonNullable<
      Operation160["requestBody"]
    >["content"]["application/json"],
    options: Operation160Options,
  ): Promise<
    ResourceResult<
      | Operation160["responses"][200]["content"]["application/json"]
      | Operation160["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/fork",
      body,
      Object.fromEntries(
        Object.entries({ "Idempotency-Key": options.idempotencyKey })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/workspaces/{workspace_id}/runs/{run_id}/interrupt. Preserves response metadata; mutations are not replayed. */
  interrupt(
    options: Operation161Options = {},
  ): Promise<
    ResourceResult<
      Operation161["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/interrupt",
      undefined,
      undefined,
      { signal: options.signal },
    );
  }
  get items(): WorkspacesWorkspaceIdRunsRunIdItemsResource {
    return new WorkspacesWorkspaceIdRunsRunIdItemsResource(
      this.transport,
      this.path + "/items",
    );
  }
  get lineage(): WorkspacesWorkspaceIdRunsRunIdLineageResource {
    return new WorkspacesWorkspaceIdRunsRunIdLineageResource(
      this.transport,
      this.path + "/lineage",
    );
  }
  /** POST /api/v1/workspaces/{workspace_id}/runs/{run_id}/resume. Preserves response metadata; mutations are not replayed. */
  resume(
    body: NonNullable<
      Operation164["requestBody"]
    >["content"]["application/json"],
    options: Operation164Options,
  ): Promise<
    ResourceResult<
      | Operation164["responses"][200]["content"]["application/json"]
      | Operation164["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/resume",
      body,
      Object.fromEntries(
        Object.entries({ "Idempotency-Key": options.idempotencyKey })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class WorkspacesWorkspaceIdRunsRunIdAttemptsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/runs/{run_id}/attempts. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation158Options = {},
  ): Promise<
    ResourceResult<
      Operation158["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["list_attempt_spans_api_v1_workspaces__workspace_id__runs__run_id__attempts__attempt_id__trace_get"]["parameters"]["path"]["attempt_id"],
  ): WorkspacesWorkspaceIdRunsRunIdAttemptsAttemptIdResource {
    return new WorkspacesWorkspaceIdRunsRunIdAttemptsAttemptIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdRunsRunIdAttemptsAttemptIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  get trace(): WorkspacesWorkspaceIdRunsRunIdAttemptsAttemptIdTraceResource {
    return new WorkspacesWorkspaceIdRunsRunIdAttemptsAttemptIdTraceResource(
      this.transport,
      this.path + "/trace",
    );
  }
}

export class WorkspacesWorkspaceIdRunsRunIdAttemptsAttemptIdTraceResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/runs/{run_id}/attempts/{attempt_id}/trace. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation159Options = {},
  ): Promise<
    ResourceResult<
      Operation159["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation159Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation159Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
}

export class WorkspacesWorkspaceIdRunsRunIdItemsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/runs/{run_id}/items. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation162Options = {},
  ): Promise<
    ResourceResult<
      Operation162["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
}

export class WorkspacesWorkspaceIdRunsRunIdLineageResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/runs/{run_id}/lineage. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation163Options = {},
  ): Promise<
    ResourceResult<
      Operation163["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation163Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation163Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
}

export class WorkspacesWorkspaceIdSecretsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/secrets. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation165Options = {},
  ): Promise<
    ResourceResult<
      Operation165["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation165Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation165Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/secrets. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation166["requestBody"]
    >["content"]["application/json"],
    options: Operation166Options = {},
  ): Promise<
    ResourceResult<
      Operation166["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["delete_secret_api_v1_workspaces__workspace_id__secrets__secret_id__delete"]["parameters"]["path"]["secret_id"],
  ): WorkspacesWorkspaceIdSecretsSecretIdResource {
    return new WorkspacesWorkspaceIdSecretsSecretIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdSecretsSecretIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/workspaces/{workspace_id}/secrets/{secret_id}. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation167Options = {},
  ): Promise<ResourceResult<undefined>> {
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
  /** GET /api/v1/workspaces/{workspace_id}/secrets/{secret_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation168Options = {},
  ): Promise<
    ResourceResult<
      Operation168["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PUT /api/v1/workspaces/{workspace_id}/secrets/{secret_id}. Preserves response metadata; mutations are not replayed. */
  replace(
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

export class WorkspacesWorkspaceIdServiceAccountsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/service-accounts. Preserves response metadata; mutations are not replayed. */
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
  pages(options: Operation170Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation170Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/service-accounts. Preserves response metadata; mutations are not replayed. */
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
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["delete_service_account_api_v1_workspaces__workspace_id__service_accounts__account_id__delete"]["parameters"]["path"]["account_id"],
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
    options: Operation172Options = {},
  ): Promise<
    ResourceResult<
      Operation172["responses"][200]["content"]["application/json"]
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
    options: Operation173Options = {},
  ): Promise<
    ResourceResult<
      Operation173["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/workspaces/{workspace_id}/service-accounts/{account_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation174["requestBody"]
    >["content"]["application/json"],
    options: Operation174Options = {},
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
    options: Operation175Options = {},
  ): Promise<
    ResourceResult<
      Operation175["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation175Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation175Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/service-accounts/{account_id}/keys. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation176["requestBody"]
    >["content"]["application/json"],
    options: Operation176Options = {},
  ): Promise<
    ResourceResult<
      Operation176["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
}

export class WorkspacesWorkspaceIdSessionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/sessions. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation177Options = {},
  ): Promise<
    ResourceResult<
      Operation177["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation177Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation177Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/sessions. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation178["requestBody"]
    >["content"]["application/json"],
    options: Operation178Options = {},
  ): Promise<
    ResourceResult<
      Operation178["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["get_session_api_v1_workspaces__workspace_id__sessions__session_id__get"]["parameters"]["path"]["session_id"],
  ): WorkspacesWorkspaceIdSessionsSessionIdResource {
    return new WorkspacesWorkspaceIdSessionsSessionIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdSessionsSessionIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/sessions/{session_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation179Options = {},
  ): Promise<
    ResourceResult<
      Operation179["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/workspaces/{workspace_id}/sessions/{session_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation180["requestBody"]
    >["content"]["application/json"],
    options: Operation180Options = {},
  ): Promise<
    ResourceResult<
      Operation180["responses"][200]["content"]["application/json"]
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
}

export class WorkspacesWorkspaceIdSkillsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/skills. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation181Options = {},
  ): Promise<
    ResourceResult<
      Operation181["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation181Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation181Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/skills. Preserves response metadata; mutations are not replayed. */
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
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  /** POST /api/v1/workspaces/{workspace_id}/skills/validate. Preserves response metadata; mutations are not replayed. */
  validate(
    body: NonNullable<
      Operation183["requestBody"]
    >["content"]["application/json"],
    options: Operation183Options = {},
  ): Promise<
    ResourceResult<
      Operation183["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/validate",
      body,
      undefined,
      { signal: options.signal },
    );
  }
  ref(
    value: operations["get_skill_api_v1_workspaces__workspace_id__skills__skill_id__get"]["parameters"]["path"]["skill_id"],
  ): WorkspacesWorkspaceIdSkillsSkillIdResource {
    return new WorkspacesWorkspaceIdSkillsSkillIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdSkillsSkillIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/skills/{skill_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation184Options = {},
  ): Promise<
    ResourceResult<
      Operation184["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/workspaces/{workspace_id}/skills/{skill_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation185["requestBody"]
    >["content"]["application/json"],
    options: Operation185Options = {},
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
        Object.entries({ "If-Match": options.ifMatch })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  /** POST /api/v1/workspaces/{workspace_id}/skills/{skill_id}/archive. Preserves response metadata; mutations are not replayed. */
  archive(
    options: Operation186Options = {},
  ): Promise<
    ResourceResult<
      Operation186["responses"][200]["content"]["application/json"]
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
  get revisions(): WorkspacesWorkspaceIdSkillsSkillIdRevisionsResource {
    return new WorkspacesWorkspaceIdSkillsSkillIdRevisionsResource(
      this.transport,
      this.path + "/revisions",
    );
  }
  /** POST /api/v1/workspaces/{workspace_id}/skills/{skill_id}/unarchive. Preserves response metadata; mutations are not replayed. */
  unarchive(
    options: Operation193Options = {},
  ): Promise<
    ResourceResult<
      Operation193["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/unarchive",
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

export class WorkspacesWorkspaceIdSkillsSkillIdRevisionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/skills/{skill_id}/revisions. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation187Options = {},
  ): Promise<
    ResourceResult<
      Operation187["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation187Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation187Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/skills/{skill_id}/revisions. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation188["requestBody"]
    >["content"]["application/json"],
    options: Operation188Options = {},
  ): Promise<
    ResourceResult<
      Operation188["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
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
  ref(
    value: operations["get_revision_api_v1_workspaces__workspace_id__skills__skill_id__revisions__revision_id__get"]["parameters"]["path"]["revision_id"],
  ): WorkspacesWorkspaceIdSkillsSkillIdRevisionsRevisionIdResource {
    return new WorkspacesWorkspaceIdSkillsSkillIdRevisionsRevisionIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdSkillsSkillIdRevisionsRevisionIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/skills/{skill_id}/revisions/{revision_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation189Options = {},
  ): Promise<
    ResourceResult<
      Operation189["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  get content(): WorkspacesWorkspaceIdSkillsSkillIdRevisionsRevisionIdContentResource {
    return new WorkspacesWorkspaceIdSkillsSkillIdRevisionsRevisionIdContentResource(
      this.transport,
      this.path + "/content",
    );
  }
  get files(): WorkspacesWorkspaceIdSkillsSkillIdRevisionsRevisionIdFilesResource {
    return new WorkspacesWorkspaceIdSkillsSkillIdRevisionsRevisionIdFilesResource(
      this.transport,
      this.path + "/files",
    );
  }
  /** POST /api/v1/workspaces/{workspace_id}/skills/{skill_id}/revisions/{revision_id}/set-default. Preserves response metadata; mutations are not replayed. */
  setDefault(
    options: Operation192Options = {},
  ): Promise<
    ResourceResult<
      Operation192["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/set-default",
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

export class WorkspacesWorkspaceIdSkillsSkillIdRevisionsRevisionIdContentResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/skills/{skill_id}/revisions/{revision_id}/content. Caller owns and closes the unbuffered body. */
  get(options: Operation190Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal },
      headers: undefined,
      accept: "application/zip",
    });
  }
}

export class WorkspacesWorkspaceIdSkillsSkillIdRevisionsRevisionIdFilesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  ref(
    value: operations["read_file_api_v1_workspaces__workspace_id__skills__skill_id__revisions__revision_id__files__path__get"]["parameters"]["path"]["path"],
  ): WorkspacesWorkspaceIdSkillsSkillIdRevisionsRevisionIdFilesPathResource {
    return new WorkspacesWorkspaceIdSkillsSkillIdRevisionsRevisionIdFilesPathResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdSkillsSkillIdRevisionsRevisionIdFilesPathResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/skills/{skill_id}/revisions/{revision_id}/files/{path}. Caller owns and closes the unbuffered body. */
  get(options: Operation191Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal },
      headers: undefined,
      accept: "application/octet-stream",
    });
  }
}

export class WorkspacesWorkspaceIdSubscriptionsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/subscriptions. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation194Options = {},
  ): Promise<
    ResourceResult<
      Operation194["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation194Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation194Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/subscriptions. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation195["requestBody"]
    >["content"]["application/json"],
    options: Operation195Options = {},
  ): Promise<
    ResourceResult<
      Operation195["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "POST", this.path, body, undefined, {
      signal: options.signal,
    });
  }
  ref(
    value: operations["delete_subscription_api_v1_workspaces__workspace_id__subscriptions__subscription_id__delete"]["parameters"]["path"]["subscription_id"],
  ): WorkspacesWorkspaceIdSubscriptionsSubscriptionIdResource {
    return new WorkspacesWorkspaceIdSubscriptionsSubscriptionIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdSubscriptionsSubscriptionIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/workspaces/{workspace_id}/subscriptions/{subscription_id}. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation196Options = {},
  ): Promise<ResourceResult<undefined>> {
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
  /** GET /api/v1/workspaces/{workspace_id}/subscriptions/{subscription_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation197Options = {},
  ): Promise<
    ResourceResult<
      Operation197["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/workspaces/{workspace_id}/subscriptions/{subscription_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation198["requestBody"]
    >["content"]["application/json"],
    options: Operation198Options = {},
  ): Promise<
    ResourceResult<
      Operation198["responses"][200]["content"]["application/json"]
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
  get deliveries(): WorkspacesWorkspaceIdSubscriptionsSubscriptionIdDeliveriesResource {
    return new WorkspacesWorkspaceIdSubscriptionsSubscriptionIdDeliveriesResource(
      this.transport,
      this.path + "/deliveries",
    );
  }
}

export class WorkspacesWorkspaceIdSubscriptionsSubscriptionIdDeliveriesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/subscriptions/{subscription_id}/deliveries. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation199Options = {},
  ): Promise<
    ResourceResult<
      Operation199["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation199Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation199Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  ref(
    value: operations["redeliver_api_v1_workspaces__workspace_id__subscriptions__subscription_id__deliveries__delivery_id__redeliver_post"]["parameters"]["path"]["delivery_id"],
  ): WorkspacesWorkspaceIdSubscriptionsSubscriptionIdDeliveriesDeliveryIdResource {
    return new WorkspacesWorkspaceIdSubscriptionsSubscriptionIdDeliveriesDeliveryIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdSubscriptionsSubscriptionIdDeliveriesDeliveryIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** POST /api/v1/workspaces/{workspace_id}/subscriptions/{subscription_id}/deliveries/{delivery_id}/redeliver. Preserves response metadata; mutations are not replayed. */
  redeliver(
    options: Operation200Options = {},
  ): Promise<
    ResourceResult<
      Operation200["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path + "/redeliver",
      undefined,
      undefined,
      { signal: options.signal },
    );
  }
}

export class WorkspacesWorkspaceIdThreadsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/threads. Preserves response metadata; mutations are not replayed. */
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
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation201Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/threads. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation202["requestBody"]
    >["content"]["application/json"],
    options: Operation202Options,
  ): Promise<
    ResourceResult<
      | Operation202["responses"][200]["content"]["application/json"]
      | Operation202["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "Idempotency-Key": options.idempotencyKey })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  ref(
    value: operations["get_thread_api_v1_workspaces__workspace_id__threads__thread_id__get"]["parameters"]["path"]["thread_id"],
  ): WorkspacesWorkspaceIdThreadsThreadIdResource {
    return new WorkspacesWorkspaceIdThreadsThreadIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdThreadsThreadIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/threads/{thread_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation203Options = {},
  ): Promise<
    ResourceResult<
      Operation203["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/workspaces/{workspace_id}/threads/{thread_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation204["requestBody"]
    >["content"]["application/json"],
    options: Operation204Options = {},
  ): Promise<
    ResourceResult<
      Operation204["responses"][200]["content"]["application/json"]
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
  /** POST /api/v1/workspaces/{workspace_id}/threads/{thread_id}/archive. Preserves response metadata; mutations are not replayed. */
  archive(
    options: Operation205Options = {},
  ): Promise<
    ResourceResult<
      Operation205["responses"][200]["content"]["application/json"]
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
  get environments(): WorkspacesWorkspaceIdThreadsThreadIdEnvironmentsResource {
    return new WorkspacesWorkspaceIdThreadsThreadIdEnvironmentsResource(
      this.transport,
      this.path + "/environments",
    );
  }
  get inbox(): WorkspacesWorkspaceIdThreadsThreadIdInboxResource {
    return new WorkspacesWorkspaceIdThreadsThreadIdInboxResource(
      this.transport,
      this.path + "/inbox",
    );
  }
  get memories(): WorkspacesWorkspaceIdThreadsThreadIdMemoriesResource {
    return new WorkspacesWorkspaceIdThreadsThreadIdMemoriesResource(
      this.transport,
      this.path + "/memories",
    );
  }
  get runs(): WorkspacesWorkspaceIdThreadsThreadIdRunsResource {
    return new WorkspacesWorkspaceIdThreadsThreadIdRunsResource(
      this.transport,
      this.path + "/runs",
    );
  }
  get stream(): WorkspacesWorkspaceIdThreadsThreadIdStreamResource {
    return new WorkspacesWorkspaceIdThreadsThreadIdStreamResource(
      this.transport,
      this.path + "/stream",
    );
  }
}

export class WorkspacesWorkspaceIdThreadsThreadIdEnvironmentsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/threads/{thread_id}/environments. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation206Options = {},
  ): Promise<
    ResourceResult<
      Operation206["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** POST /api/v1/workspaces/{workspace_id}/threads/{thread_id}/environments. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation207["requestBody"]
    >["content"]["application/json"],
    options: Operation207Options = {},
  ): Promise<
    ResourceResult<
      Operation207["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
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
  ref(
    value: operations["remove_mount_api_v1_workspaces__workspace_id__threads__thread_id__environments__name__delete"]["parameters"]["path"]["name"],
  ): WorkspacesWorkspaceIdThreadsThreadIdEnvironmentsNameResource {
    return new WorkspacesWorkspaceIdThreadsThreadIdEnvironmentsNameResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdThreadsThreadIdEnvironmentsNameResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/workspaces/{workspace_id}/threads/{thread_id}/environments/{name}. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation208Options = {},
  ): Promise<ResourceResult<undefined>> {
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

export class WorkspacesWorkspaceIdThreadsThreadIdInboxResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/threads/{thread_id}/inbox. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation209Options = {},
  ): Promise<
    ResourceResult<
      Operation209["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation209Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation209Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  /** POST /api/v1/workspaces/{workspace_id}/threads/{thread_id}/inbox. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation210["requestBody"]
    >["content"]["application/json"],
    options: Operation210Options,
  ): Promise<
    ResourceResult<
      | Operation210["responses"][200]["content"]["application/json"]
      | Operation210["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
      this.path,
      body,
      Object.fromEntries(
        Object.entries({ "Idempotency-Key": options.idempotencyKey })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
  get order(): WorkspacesWorkspaceIdThreadsThreadIdInboxOrderResource {
    return new WorkspacesWorkspaceIdThreadsThreadIdInboxOrderResource(
      this.transport,
      this.path + "/order",
    );
  }
  ref(
    value: operations["withdraw_entry_api_v1_workspaces__workspace_id__threads__thread_id__inbox__entry_id__delete"]["parameters"]["path"]["entry_id"],
  ): WorkspacesWorkspaceIdThreadsThreadIdInboxEntryIdResource {
    return new WorkspacesWorkspaceIdThreadsThreadIdInboxEntryIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdThreadsThreadIdInboxOrderResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** PUT /api/v1/workspaces/{workspace_id}/threads/{thread_id}/inbox/order. Preserves response metadata; mutations are not replayed. */
  replace(
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

export class WorkspacesWorkspaceIdThreadsThreadIdInboxEntryIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/workspaces/{workspace_id}/threads/{thread_id}/inbox/{entry_id}. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation212Options = {},
  ): Promise<
    ResourceResult<
      Operation212["responses"][200]["content"]["application/json"]
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
  /** GET /api/v1/workspaces/{workspace_id}/threads/{thread_id}/inbox/{entry_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation213Options = {},
  ): Promise<
    ResourceResult<
      Operation213["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** PATCH /api/v1/workspaces/{workspace_id}/threads/{thread_id}/inbox/{entry_id}. Preserves response metadata; mutations are not replayed. */
  update(
    body: NonNullable<
      Operation214["requestBody"]
    >["content"]["application/json"],
    options: Operation214Options = {},
  ): Promise<
    ResourceResult<
      Operation214["responses"][200]["content"]["application/json"]
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
}

export class WorkspacesWorkspaceIdThreadsThreadIdMemoriesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/threads/{thread_id}/memories. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation215Options = {},
  ): Promise<
    ResourceResult<
      Operation215["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  /** POST /api/v1/workspaces/{workspace_id}/threads/{thread_id}/memories. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation216["requestBody"]
    >["content"]["application/json"],
    options: Operation216Options = {},
  ): Promise<
    ResourceResult<
      Operation216["responses"][201]["content"]["application/json"]
    >
  > {
    return jsonRequest(
      this.transport,
      "POST",
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
  ref(
    value: operations["remove_mount_api_v1_workspaces__workspace_id__threads__thread_id__memories__name__delete"]["parameters"]["path"]["name"],
  ): WorkspacesWorkspaceIdThreadsThreadIdMemoriesNameResource {
    return new WorkspacesWorkspaceIdThreadsThreadIdMemoriesNameResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdThreadsThreadIdMemoriesNameResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** DELETE /api/v1/workspaces/{workspace_id}/threads/{thread_id}/memories/{name}. Preserves response metadata; mutations are not replayed. */
  delete(
    options: Operation217Options = {},
  ): Promise<ResourceResult<undefined>> {
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
  /** PATCH /api/v1/workspaces/{workspace_id}/threads/{thread_id}/memories/{name}. Preserves response metadata; mutations are not replayed. */
  update(
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
}

export class WorkspacesWorkspaceIdThreadsThreadIdRunsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/threads/{thread_id}/runs. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation219Options = {},
  ): Promise<
    ResourceResult<
      Operation219["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation219Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation219Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
}

export class WorkspacesWorkspaceIdThreadsThreadIdStreamResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/threads/{thread_id}/stream. Caller owns and closes the unbuffered body. */
  get(options: Operation220Options = {}): Promise<BinaryResult> {
    return binaryRequest(this.transport, this.path, {
      ...{ signal: options.signal },
      headers: Object.fromEntries(
        Object.entries({ "Last-Event-ID": options.lastEventId })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      accept: "text/event-stream",
    });
  }
}

export class WorkspacesWorkspaceIdToolsetsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/toolsets. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation221Options = {},
  ): Promise<
    ResourceResult<
      Operation221["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
}

export class WorkspacesWorkspaceIdTraceBackendResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/trace-backend. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation222Options = {},
  ): Promise<
    ResourceResult<
      Operation222["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
}

export class WorkspacesWorkspaceIdTracesResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/traces. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation223Options = {},
  ): Promise<
    ResourceResult<
      Operation223["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation223Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation223Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
  ref(
    value: operations["get_trace_api_v1_workspaces__workspace_id__traces__trace_id__get"]["parameters"]["path"]["trace_id"],
  ): WorkspacesWorkspaceIdTracesTraceIdResource {
    return new WorkspacesWorkspaceIdTracesTraceIdResource(
      this.transport,
      this.path + "/" + encodeURIComponent(selector(String(value))),
    );
  }
}

export class WorkspacesWorkspaceIdTracesTraceIdResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/traces/{trace_id}. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation224Options = {},
  ): Promise<
    ResourceResult<
      Operation224["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
  get spans(): WorkspacesWorkspaceIdTracesTraceIdSpansResource {
    return new WorkspacesWorkspaceIdTracesTraceIdSpansResource(
      this.transport,
      this.path + "/spans",
    );
  }
}

export class WorkspacesWorkspaceIdTracesTraceIdSpansResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/traces/{trace_id}/spans. Preserves response metadata; mutations are not replayed. */
  list(
    options: Operation225Options = {},
  ): Promise<
    ResourceResult<
      Operation225["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
      query: options.query,
    });
  }
  pages(options: Operation225Options = {}) {
    const query = snapshot(options.query ?? {});
    return new PageIterator(
      query.cursor,
      (cursor) => this.list({ ...options, query: withCursor(query, cursor) }),
      (value) => value,
    );
  }
  items(options: Operation225Options = {}) {
    return flattenPages(this.pages(options), (value) => value);
  }
}

export class WorkspacesWorkspaceIdUploadsResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** POST /api/v1/workspaces/{workspace_id}/uploads. Preserves response metadata; mutations are not replayed. */
  create(
    body: NonNullable<
      Operation226["requestBody"]
    >["content"]["multipart/form-data"],
    options: Operation226Options,
  ): Promise<
    ResourceResult<
      Operation226["responses"][200]["content"]["application/json"]
    >
  > {
    return uploadRequest(
      this.transport,
      "POST",
      this.path,
      multipartBody(body),
      undefined,
      Object.fromEntries(
        Object.entries({ "Idempotency-Key": options.idempotencyKey })
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
      { signal: options.signal },
    );
  }
}

export class WorkspacesWorkspaceIdUsageResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /api/v1/workspaces/{workspace_id}/usage. Preserves response metadata; mutations are not replayed. */
  get(
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
}

export class HealthzResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /healthz. Preserves response metadata; mutations are not replayed. */
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
}

export class ReadyzResource {
  constructor(
    private readonly transport: Transport,
    private readonly path: string,
  ) {}
  /** GET /readyz. Preserves response metadata; mutations are not replayed. */
  get(
    options: Operation229Options = {},
  ): Promise<
    ResourceResult<
      Operation229["responses"][200]["content"]["application/json"]
    >
  > {
    return jsonRequest(this.transport, "GET", this.path, undefined, undefined, {
      signal: options.signal,
    });
  }
}
