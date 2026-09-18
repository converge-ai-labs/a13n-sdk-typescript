import type { components } from "../src/schema.js";

type Schema = components["schemas"];

// Wire defaults remain omittable, including nested request defaults.
export const ordinaryInput: Schema["AgentInput"] = { schema_version: "2" };
export const agentConfig: Schema["AgentConfig-Input"] = {
  model: { model_key: "example" },
  input_adapter: { adapter_key: "native" },
  protocol: { public_name: "Example" },
};
export const runSubmission: Schema["ThreadRunSubmissionRequest"] = {
  expected_thread_version: 1,
  input: ordinaryInput,
};

export const searchSelection: Schema["ToolSelection"] = {
  config: { provider_id: "wprov_test" },
};
export const searchOverrides: Schema["AgentRunOverride-Input"][] = [
  {},
  { toolsets: null },
  { toolsets: { web: { tools: { search: searchSelection } } } },
];
export const searchableAgent: Schema["AgentConfig-Input"] = {
  ...agentConfig,
  toolsets: { web: { tools: { search: searchSelection } } },
};
export const searchProviderRequest: Schema["CreateWebProviderRequest"] = {
  type: "brave",
  name: "Research",
  credential: { api_key: "test-secret" },
};
// @ts-expect-error Credentials are not a readable resource field.
export type ReadableSearchCredential = Schema["WebProvider"]["credential"];
import type { Client } from "../src/client.js";

export async function scopedHttpContract(client: Client) {
  const http = await client.workspaceHttp();
  await http.GET("/agents");
  await http.GET("/web-providers");
  await http.POST("/web-providers/{provider_id}/test", {
    params: { path: { provider_id: "wprov_test" } },
  });
  await http.GET("/agents/{agent}", {
    params: { path: { agent: "reviewer" } },
  });
  await http.PATCH("/agents/{agent}", {
    params: { path: { agent: "reviewer" }, header: { "If-Match": '"v1"' } },
    body: { key: "assistant" },
  });
  // @ts-expect-error Workspace is supplied by the credential, never by this caller.
  await http.GET("/agents", { params: { path: { workspace: "other" } } });
}

export const actor: Schema["ActorRef"] = {
  principal_id: "system",
  principal_type: "system",
};
export const environment: Schema["EnvironmentSelection"] = {
  template_id: "etpl_example",
  version: null,
};
export const patchStates: Schema["UpdateAgentRequest"][] = [
  {},
  { name: null },
  { name: "new" },
];
// @ts-expect-error Structured patch fields cannot degrade to arbitrary JSON.
export const invalidPatch: Schema["UpdateAgentRequest"] = { name: 42 };
// @ts-expect-error Message content is a typed string-or-multimodal union.
export const invalidMessage: Schema["UserMessage"] = { id: "m1", content: 42 };

export async function resourceTypeContract(client: Client) {
  const workspace = client.workspaces.ref("ws_example");
  const agent = workspace.agents.ref("reviewer");
  const accepted = await agent.start("hello", {
    idempotencyKey: "start",
    body: { environment: null },
  });
  accepted.run.stream({ after: "1-0", maxReconnects: 5 });
  await accepted.run.cancel(
    { expected_run_version: 1, expected_thread_version: 2 },
    { idempotencyKey: "cancel" },
  );
  const submission = await accepted.thread.submit(ordinaryInput, {
    idempotencyKey: "submit",
    body: { expected_thread_version: 2 },
  });
  if (submission.outcome === "queued") {
    void submission.queuedSubmission;
    // @ts-expect-error A queued disposition has no Run reference.
    void submission.run;
  } else {
    void submission.run;
    // @ts-expect-error An accepted disposition has no queued entry reference.
    void submission.queuedSubmission;
  }
  await agent.start("bad", {
    idempotencyKey: "bad",
    // @ts-expect-error agent_id is bound by the Agent reference.
    body: { agent_id: "agent_other" },
  });
  await accepted.thread.submit("bad", {
    idempotencyKey: "bad",
    // @ts-expect-error input is bound by the convenience argument.
    body: { expected_thread_version: 2, input: ordinaryInput },
  });
  await accepted.thread.submit("bad", {
    idempotencyKey: "bad",
    // @ts-expect-error expected_thread_version remains required.
    body: {},
  });
  // @ts-expect-error timeoutMs is a required bounded-wait argument.
  await accepted.run.wait({});
  // @ts-expect-error TypeScript exact optional fields do not accept explicit undefined.
  accepted.run.stream({ after: undefined });
}

export async function managementTypeContract(
  client: Client,
  modelBody: Schema["CreateModelRequest"],
  modelPatch: Schema["UpdateModelRequest"],
  revisionBody: Schema["CreateAgentRevisionRequest"],
  defaultRevisionBody: Schema["SetDefaultAgentRevisionRequest"],
  memoryWrite: Schema["MemoryWrite"],
  connectionCommand: Schema["ConnectionCommandRequest"],
) {
  const workspace = client.workspaces.ref("ws_example");
  const organization = client.organizations.ref("org_example");
  await workspace.models.create(modelBody);
  await organization.models.create(modelBody);
  await workspace.models.ref("model_example").update(modelPatch, {
    ifMatch: '"model-v1"',
  });
  workspace.models.pages({ limit: 10, cursor: null });
  workspace.models.iterate({ query: "example" });

  const agent = workspace.agents.ref("reviewer");
  await agent.revisions.create(revisionBody, {
    idempotencyKey: "revision",
    ifMatch: '"agent-v1"',
  });
  await agent.revisions.setDefault("rev_example", defaultRevisionBody, {
    idempotencyKey: "default-revision",
    ifMatch: '"agent-v2"',
  });

  const memories = workspace.memoryProviders.ref("mem_example").memories;
  await memories?.add(memoryWrite, {
    scope: "agent",
    subject_id: "agent_example",
  });
  memories?.pages({ scope: "agent", subject_id: "agent_example" });
  // @ts-expect-error Memory scope is explicit and required.
  memories?.list();

  await workspace.connections.ref("conn_example").enable(connectionCommand, {
    idempotencyKey: "enable",
  });
  await workspace.assets.ref("asset_example").delete();
  // @ts-expect-error Asset bytes are immutable; replacement is not exported.
  workspace.assets.ref("asset_example").replace(new Blob());
  // @ts-expect-error Actual Environments are Workspace-owned, not Organization-owned.
  void organization.environments;
  // @ts-expect-error No direct EIP resource client is exported.
  void workspace.environmentInstances;
  // @ts-expect-error Model updates require an If-Match precondition.
  await workspace.models.ref("model_example").update(modelPatch);
  // @ts-expect-error Connection commands require an explicit command body.
  await workspace.connections.ref("conn_example").enable({
    idempotencyKey: "enable",
  });
}
