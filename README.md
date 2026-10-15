# @converge.ai/a13n

Start an Agent, get its authoritative reply, continue its conversation, or preview text from a Node.js application. The SDK talks to an existing a13n Service; it does not run Agents locally.

## Get ready

You need Node.js 22.14+, a Service URL, a workspace API key, and the **ID** of an Agent you can run. Obtain them from your Service administrator or Console. The key selects its workspace automatically. The Agent needs a configured Model and provider access. Keep API keys out of source control and browser bundles.

**Install from this checkout during pre-release development:**

```bash
cd /path/to/a13n-sdk-typescript
npm ci --ignore-scripts
npm run build
npm pack
cd /path/to/your-node-app
npm install /path/to/a13n-sdk-typescript/converge.ai-a13n-0.0.0.tgz
```

The source version is `0.0.0`; this does not imply a published registry package. After a release, install that published version with `npm install @converge.ai/a13n` instead. This checkout targets the pinned Service contract, not unverified newer endpoints.

## Ask your Agent

Save this as `hello.mjs`:

```js
import { createClient } from "@converge.ai/a13n";

for (const name of ["A13N_SERVICE_URL", "A13N_API_TOKEN", "A13N_AGENT_ID"]) {
  if (!process.env[name]) throw new Error(`${name} is required`);
}
const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
try {
  const agent = client.agents.ref(process.env.A13N_AGENT_ID);
  const interaction = await agent.start("Say hello in one sentence.");
  try {
    const result = await interaction.result();
    if (result.status === "completed")
      console.log(result.text ?? result.output);
    else if (result.status === "waiting")
      console.log(result.pendingCalls, result.pendingApprovals);
    else console.log(result.status, result.failure);
    console.log("Thread ID:", result.threadId, "Run ID:", result.runId);
  } finally {
    await interaction.close();
  }
} finally {
  client.close();
}
```

```bash
export A13N_SERVICE_URL="https://your-service.example"
export A13N_API_TOKEN="your-workspace-api-key"
export A13N_AGENT_ID="ap_your-agent-id"
node hello.mjs
```

The first reply comes directly from exact Run output—no Items scan, reducer or extra display request. `output` preserves structured JSON including null, false, zero and empty containers. Optional `text` exists only for string output, including the empty string. Check `status`: completed, waiting, failed and cancelled are distinct. `snapshot` retains the original HTTP response evidence.

Each logical request needs one key. When omitted, the SDK chooses a random key once before dispatch and exposes `interaction.idempotencyKey`; it **never retries mutations**. Durable jobs must persist their own key and identical body before sending. A generated key is not promised recoverable from a cancelled invocation that never returns. See [uncertain submissions and recovery](docs/07-errors-and-recovery.md).

`result()` opens no SSE and observes only this submission's consumed Entry and exact incorporating Run. The default local deadline is five minutes, not a remote execution timeout. An initial assigned receipt Run is only `receiptRun` evidence; `interaction.run` becomes authoritative after incorporation.

## Continue the conversation

Retain `result.threadId`. Inside the same client lifetime, after inspecting a completed, failed or cancelled result:

```js
const followUp = await agent.send(result.threadId, "What did you mean?");
try {
  const next = await followUp.result();
  console.log(next.status, next.text ?? next.output);
} finally {
  await followUp.close();
}
```

A waiting Run needs its pending batch resolved first; a premature send can remain queued. `Thread.last_run_id` is the latest seal of any outcome. Failed/cancelled Runs retain checkpoint history for the next explicit send without automatic retry or fork. A Thread can receive messages from different Agents; send uses the selected Agent.

## Preview text as it arrives

For a new interaction, consume the lazy string-chunk preview and then read the authoritative result:

```js
import { PreviewInterruptedError } from "@converge.ai/a13n";

const live = await agent.start("Explain your answer step by step.");
try {
  try {
    for await (const chunk of live.textStream()) process.stdout.write(chunk);
  } catch (error) {
    if (!(error instanceof PreviewInterruptedError)) throw error;
    console.error("Preview stopped:", error.message);
  }
  const final = await live.result();
  console.log("\nFinal:", final.status, final.text ?? final.output);
} finally {
  await live.close();
}
```

Only trusted root assistant string content is projected; child/hidden events are excluded. Gaps, missing starts, unsupported root custom fragments and other discontinuities interrupt preview explicitly rather than silently constructing a partial answer. Preview interruption is sticky, but the final result remains available and deliberate sequential raw access is allowed while open. No concurrent raw/text or multiple preview consumers are supported. Preview break leaves a local lifetime to close in `finally`; raw iterator break closes observation. `await close()` joins cleanup even if an iterator is paused. Local close never interrupts remote execution.

For native events use `for await (const event of interaction)`. For full application-owned presentation, generated operations preserve raw AG-UI, HTTP status/ETags, binary ownership and display Items. See [streaming and readback](docs/02-streaming-and-readback.md).

## Public input and options

```js
import { text, json, url, asset } from "@converge.ai/a13n";

const request = await agent.start(
  [
    text("Inspect these"),
    json({ enabled: false }),
    url("https://example.test/report"),
    asset("ast_uploaded"),
  ],
  {
    agentRevisionId: null,
    options: {
      configuration: { allowed_hosts: null, extensions: {} },
      overrides: { model_settings: { native: [null, 0, false] } },
      labels: { purpose: "review" },
      max_usage: { requests: 3 },
    },
  },
);
await request.close();
```

Top-level submission selectors are camelCase; nested native options stay grouped. Root structural types include `RunOptions`, `RunConfiguration`, `AgentOverride`, `MessageHistory`, mount/header types and pending/status/failure primitives. Every supported uncommon override remains available without a generated-schema import. Output is native structured JSON: validate it in your application rather than asserting an Agent generic type.

## Native Service API

Use `client.api.agents.ref(agentId).get()` to read a stored Agent with its HTTP metadata, and `client.agents.ref(agentId).start(input)` to run it. Both layers share the same client, authentication and lifetime; the complete generated API is available under `client.api`.

The pinned native graph includes Memory Spaces and Session bindings, explicit organization status/action, Computer permission/probe and retained PNG/JPEG reads, executed Agent/attempt readback, per-Run usage and model-request metrics, Findings/analyses, explicit Run content reads, and Session message-author lookup. Use the [Memory Space guide](docs/04-files-and-memory.md#share-memory-through-a-session-space-binding) and [native execution/Computer readback](docs/06-generated-resources.md#read-executed-configuration-and-request-metrics) for their distinct authority and completion boundaries. `Item.content_refs` provides bounded previews; load saved values explicitly with `client.api.runs.ref(runId).contents.ref(contentId).get()`. Raw stream memory sources and Memory record provenance retain their native evidence. See [generated resources](docs/06-generated-resources.md#findings-and-analyses).

**Migration:** replace `client.resources` with `client.api`, and use generated `ProviderModel` in place of the retired `ChatGPTModel`. Authored Agent, Thread and Run workflows are unchanged. Omitted Skill policy now uses shared mode; select isolated caching explicitly when that layout is required. See [environment and Skill policy](docs/01-setup-and-conversations.md#select-environment-and-skill-preparation).

## Go further

- [Configure conversations and continue across calls](docs/01-setup-and-conversations.md)
- [Stream updates and reconcile committed output](docs/02-streaming-and-readback.md)
- [Resolve waiting Runs with one public answer map](docs/03-waiting-and-tools.md)
- [Attach files and mount Memory](docs/04-files-and-memory.md)
- [Use a same-origin browser session](docs/05-browser-sessions.md)
- [Manage generated resources with ETags](docs/06-generated-resources.md)
- [Recover saved Entry/Run identities without resubmitting](docs/07-errors-and-recovery.md)

The complete wire contract is in the [pinned OpenAPI](openapi.json) and [SDK specification](spec/README.md). [CONTRIBUTING.md](CONTRIBUTING.md) owns generation, validation and release procedures.
