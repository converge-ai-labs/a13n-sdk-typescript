import {
  createClient,
  type components,
  type SessionStreamSchemas,
  type AgentOverride,
} from "../src/index.js";
type Schema = components["schemas"];
const client = createClient({
  baseUrl: "https://service.test",
  auth: { type: "bearer", token: "test" },
});

const proxy: Schema["ToolSearchConfig"] = {
  mode: "proxy",
  search_name: "find_tools",
  max_results: 1,
};
const searches: Array<Schema["ToolSearch"] | null> = [
  null,
  {},
  { groups: {} },
  { config: {} },
  {
    config: proxy,
    groups: {
      research: {
        description: "Selected sources",
        platform: true,
        plugins: ["research"],
        connections: ["conn_00000000000000000000"],
      },
    },
  },
];
for (const tool_search of searches) {
  const override: AgentOverride = { tool_search };
  void client.agents
    .ref("agent")
    .start("Inspect", { options: { overrides: override } });
  const projection: SessionStreamSchemas["AgentOverride"] = { tool_search };
  void projection;
}
// @ts-expect-error Native tool search is no longer part of the Service contract.
const badNative: Schema["ToolSearchConfig"] = { mode: "native" };
const badProxy: Schema["ToolSearchConfig"] = {
  mode: "proxy",
  // @ts-expect-error Discovery configuration has no native strategy.
  strategy: "regex",
};
const badSession: SessionStreamSchemas["ToolSearchConfig"] = {
  // @ts-expect-error Session uses the same proxy-only discovery contract.
  mode: "native",
};
const defaultMode: Schema["ToolSearchConfig"] = {};
// @ts-expect-error Config itself is optional, not nullable.
const nullConfig: Schema["ToolSearch"] = { config: null };
const missingDescription: Schema["ToolSearch"] = {
  // @ts-expect-error A selected group requires its description.
  groups: { research: { platform: true } },
};
void [
  badNative,
  badProxy,
  badSession,
  defaultMode,
  nullConfig,
  missingDescription,
];
const control: Schema["Control"] = {
  session_id: "browser_session_00000001",
  epoch: 0,
};
void client.api.runs
  .ref("run")
  .desktopControl.create({ mount: "desktop", reason: "Inspect" });
void client.api.runs
  .ref("run")
  .desktopControl.get()
  .then(({ data }) => {
    const value: Schema["View"] | null = data;
    void value;
  });
void client.api.runs.ref("run").desktopAssistance.ref("call").get();
const assistance = client.api.desktopAssistance.ref("assistance");
void assistance.requestControl();
void assistance.view(control, { query: { renew: false } });
void assistance.control(control, { query: { renew: true } });
void assistance.disconnect(control);
void assistance.complete({ ...control, outcome: "completed", note: "Done" });
void assistance.control({
  session_id: "browser_session_00000001",
  // @ts-expect-error A fenced epoch is required; null is not an epoch.
  epoch: null,
});
// @ts-expect-error Completion is bounded to native outcomes.
void assistance.complete({ ...control, outcome: "success" });
// @ts-expect-error Open control has its own Request body, not browser credentials.
void client.api.runs.ref("run").desktopControl.create(control);
const wait: Schema["Pending"] = {
  approvals: [],
  calls: [],
  desktop_control_id: "control",
};
void wait;
void client.runs.ref("waiting").resume({});
void client.api.usage.context.get({ query: { thread_id: "thread" } });
void client.api.usage.context.get({ query: { run_id: "run" } });
void client.api.usage.context.get({ query: { record_id: "record" } });
void client.api.usage.context.get({
  query: { thread_id: "thread", run_id: "run" },
}); // Service validates exactly-one selection.
void client.api.usage.context.get().then(({ data }) => {
  const usage: Schema["ContextUsage"] | null = data;
  if (usage) {
    const capacity: number | null = usage.context_window_tokens;
    void capacity;
  }
});
const usage: Schema["ContextUsage"] = {
  run_id: "run",
  record_id: "record",
  input_tokens: null,
  output_tokens: 0,
  context_window_tokens: null,
};
// @ts-expect-error Nullable counts are still required in a successful ContextUsage record.
const missingCount: Schema["ContextUsage"] = {
  run_id: "run",
  record_id: "record",
  input_tokens: null,
  output_tokens: null,
};
void [usage, missingCount];
