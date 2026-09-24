import {
  createClient,
  type Client,
  type components,
  type ResourceResult,
} from "../src/index.js";

type Schema = components["schemas"];
const client: Client = createClient({
  baseUrl: "https://service.example.test",
  auth: { type: "bearer", token: "test" },
});
const workspace = client.workspaces.ref("ws_example");
const organization = client.organizations.ref("org_example");
const message: Schema["MessagePayload"] = {
  content: [{ type: "text", text: "hello" }],
};
// @ts-expect-error Message content cannot be a plain string.
const invalidMessage: Schema["MessagePayload"] = { content: "hello" };
void invalidMessage;

export async function acceptedServiceTypes() {
  const submitted = await workspace.threads.create(
    { agent_id: "agent_example", payload: message },
    { idempotencyKey: "start" },
  );
  const thread = workspace.threads.ref(submitted.data.thread.id);
  const receipt: ResourceResult<Schema["Submitted"]> = await thread.submit(
    message,
    { body: { agent_id: "agent_example" }, idempotencyKey: "submit" },
  );
  if (receipt.data.run !== null)
    await workspace.runs.ref(receipt.data.run.id).wait({ timeoutMs: 1000 });
  for await (const event of thread.stream()) {
    if (event.cursor) void event.frame;
    break;
  }
  await thread.inbox.list({ status: "pending" });
  await workspace.agents.ref("agent_example").revisions.list();
  await workspace.assets.list({ limit: 10 });
  await organization.models.list({ limit: 10 });
  const createdSubscription = await workspace.subscriptions.create({
    name: "alerts",
    url: "https://example.test/hook",
    kinds: ["run.completed"],
  });
  const signingSecret: string = createdSubscription.data.signing_secret;
  void signingSecret;
  await workspace.environments.create({ template_id: "template_example" });
  // @ts-expect-error Environment creation must match a managed or external target request.
  await workspace.environments.create({ arbitrary: true });
  // @ts-expect-error Assets have no PATCH operation.
  await workspace.assets.ref("asset_example").update({}, { ifMatch: '"v1"' });
  // @ts-expect-error Organizations have no collection POST operation.
  await client.organizations.create({ name: "not-supported" });
  await client.workspaceHttp(workspace.id).GET("/threads");
  await client.workspaceHttp(workspace.id).GET("/threads", {
    // @ts-expect-error Workspace ID is bound locally, not supplied as a URL path parameter.
    params: { path: { workspace_id: "other" } },
  });
  await workspace.threads.create(
    // @ts-expect-error A new Thread requires the agent identity.
    { payload: message },
    { idempotencyKey: "invalid" },
  );
}
