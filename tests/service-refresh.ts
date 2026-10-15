import {
  createClient,
  type components,
  type AgentOverride,
  type MemoryMount,
  type ResourceResult,
  type BinaryResult,
} from "../src/index.js";
type Schema = components["schemas"];
const client = createClient({
  baseUrl: "https://service.example.test",
  auth: { type: "bearer", token: "type-example" },
});
const override: AgentOverride = {
  builtin_skills: ["platform-operations"],
  platform_tools: {
    groups: ["execution", "models"],
    read_permission: "allow",
    write_permission: "ask",
  },
};
const emptyOverride: AgentOverride = {
  builtin_skills: [],
  platform_tools: null,
};
const memory: Schema["SessionMemorySettings"] = {
  enabled: false,
  spaces: [{ name: "team", space_id: "space", access: "read" }],
};
const minimalMemory: Schema["SessionMemorySettings"] = {};
const defaultComputerCheck: Schema["ComputerCheck"] = { status: "not_ready" };
const hostMount: Schema["FrozenMemoryMount"] = {
  name: "shared",
  memory_id: "memory",
  access: "read",
  roots: [],
  space_id: null,
};
const policy: Schema["OrganizationPolicy"] = {
  enabled: false,
  cooldown_seconds: 0,
  check_interval_seconds: 10,
  model: null,
  trigger: { type: "change_count", count: 1 },
};
const changeTrigger: Schema["ChangeCountTrigger"] = {
  count: 1,
  type: "change_count",
};
// @ts-expect-error A counted trigger requires its count.
const badTrigger: Schema["ChangeCountTrigger"] = { type: "change_count" };
// @ts-expect-error Builtin Skill identities are Service-defined, not arbitrary strings.
const badBuiltin: AgentOverride = { builtin_skills: ["private-script"] };
// @ts-expect-error Platform groups use the native catalog.
const badGroup: Schema["PlatformSelection"] = { groups: ["memory_spaces"] };
const badPermission: Schema["EnvironmentPermissionSet-Input"] = {
  // @ts-expect-error Environment actions are exact native authorization values.
  operations: ["computer.click"],
};
const badRequest: MemoryMount = {
  name: "shared",
  memory_id: "memory",
  access: "read",
  // @ts-expect-error Frozen host roots are not accepted request MemoryMount fields.
  roots: [],
};
const nullRoots: Schema["FrozenMemoryMount"] = {
  name: "shared",
  memory_id: "memory",
  access: "read",
  // @ts-expect-error roots can be omitted or an array, not null.
  roots: null,
};
const metric: Schema["ModelRequestMetrics"] = {
  time_to_first_chunk_seconds: null,
  request_duration_seconds: 0,
  output_tokens_per_second: null,
};
// @ts-expect-error Metrics are required nullable fields, not omitted measurements.
const missingMetric: Schema["ModelRequestMetrics"] = {};
const summary: Schema["UsageSummary"] = { models: [], runs: [] };
// @ts-expect-error UsageSummary includes the per-Run breakdown.
const missingRuns: Schema["UsageSummary"] = { models: [] };
const minimalCreate: Schema["MemorySpaceCreate"] = { name: "Notes" };
void override;
void emptyOverride;
void memory;
void minimalMemory;
void defaultComputerCheck;
void hostMount;
void policy;
void changeTrigger;
void badTrigger;
void badBuiltin;
void badGroup;
void badPermission;
void badRequest;
void nullRoots;
void metric;
void missingMetric;
void summary;
void missingRuns;
void minimalCreate;
export async function refreshTypes() {
  const space = await client.api.memorySpaces.create({
    name: "Notes",
    organization: policy,
  });
  const ref = client.api.memorySpaces.ref(space.data.id);
  await ref.update(
    { enabled: false, guide: null, always_load: [] },
    { ifMatch: "etag" },
  );
  await ref.delete({ ifMatch: "etag" });
  const pending: ResourceResult<Schema["SpaceOrganizationStatus"]> =
    await ref.organizations.create();
  const state: ResourceResult<Schema["SpaceOrganizationStatus"]> =
    await ref.organization.get();
  await ref.organizations.list();
  await ref.sessions.list();
  // @ts-expect-error Memory Space edits use an ETag.
  await ref.update({ enabled: false });
  // @ts-expect-error Organization action has no payload or idempotency-key facade.
  await ref.organizations.create({ enabled: true });
  const run = client.api.runs.ref("run");
  const agent: ResourceResult<Schema["RunAgent"]> = await run.agent.get();
  const frozenConfig: Schema["AgentConfig-Output"] = agent.data.config;
  const view = await run.get();
  for (const mount of view.data.memory_mounts) {
    if ("roots" in mount) {
      const roots: string[] | undefined = mount.roots;
      void roots;
    }
    if ("space_id" in mount) {
      const id: string | null | undefined = mount.space_id;
      void id;
    }
    const access: Schema["MemoryAccess"] = mount.access;
    void access;
  }
  const image: BinaryResult = await run.images.ref("image").get();
  await image.close();
  const check: ResourceResult<Schema["ComputerCheck"]> =
    await client.api.environments.ref("environment").computer.check();
  await client.api.threads
    .ref("thread")
    .environments.ref("desk")
    .update(
      { permission_ceiling: { operations: ["environment.computer.observe"] } },
      { ifMatch: "etag" },
    );
  const mount = client.api.threads.ref("thread").environments.ref("desk");
  // @ts-expect-error Updating a mount replaces the explicit permission ceiling.
  await mount.update({}, { ifMatch: "etag" });
  // @ts-expect-error Native mount permission sets are non-null.
  await mount.update({ permission_ceiling: null }, { ifMatch: "etag" });
  await client.api.environmentProviders.ref("provider").references.get();
  await client.api.environmentProviders
    .ref("provider")
    .delete({ ifMatch: "etag" });
  // @ts-expect-error Provider deletion requires the provider ETag.
  await client.api.environmentProviders.ref("provider").delete();
  const metrics: ResourceResult<Schema["ModelRequestMetrics"]> =
    await client.api.usage.records.ref("record").metrics.get();
  await client.api.runs.list({
    query: { principal_id: "principal", status: "waiting" },
  });
  await client.api.modelCatalog.list({
    query: { provider: "openrouter", model: "Provider/ExactCase" },
  });
  await client.api.agents.list({ query: { preset_kind: "memory_organizer" } });
  await client.api.sessions.create({ memory });
  await client.api.sessions
    .ref("session")
    .update({ memory: null }, { ifMatch: "etag" });
  const started = await client.agents.ref("agent").start("Inspect", {
    options: { overrides: override },
    environments: [
      {
        name: "desk",
        environment_id: "environment",
        permission_ceiling: { operations: [] },
      },
    ],
  });
  await started.close();
  void pending;
  void state;
  void frozenConfig;
  void check;
  void metrics;
}
