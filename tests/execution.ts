import {
  createClient,
  type ExecutionOverride,
  type ToolExecutionOverride,
  type RunOptions,
  type components,
} from "../src/index.js";
const tools: ToolExecutionOverride = {
  mode: "auto",
  foreground_wait_seconds: 0,
};
const execution: ExecutionOverride = {
  tools,
  steering: "immediate",
  environment: { APP_ENV: "test", EMPTY: "" },
};
const options: RunOptions = { execution };
const agent: components["schemas"]["AgentConfig-Input"] = {
  model: "model",
  execution,
};
const update: components["schemas"]["ThreadUpdate"] = { execution };
const client = createClient({
  baseUrl: "https://example.test",
  auth: { type: "bearer", token: "test" },
});
void client.agents.ref("agent").start("x", { execution, options });
void client.agents.ref("agent").send("thread", "x", { options });
void agent;
void update;
// @ts-expect-error Environment values remain strings.
const bad: ExecutionOverride = { environment: { COUNT: 1 } };
// @ts-expect-error Execution belongs to Run options, not AgentOverride.
const misplaced: RunOptions = { overrides: { execution } };
void bad;
void misplaced;
