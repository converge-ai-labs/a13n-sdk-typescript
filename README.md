# @converge.ai/a13n

Start an Agent, continue its conversation, or follow its output from a Node.js application. The SDK talks to an existing a13n Service; it does not run Agents locally.

## Get ready

You need Node.js 22.14+, a Service URL, a workspace API key, and the **ID** of an Agent you can run. Get the URL, key, and Agent ID from your Service administrator or Console. The key selects its workspace automatically; there is no workspace setting in the example. The Agent also needs a configured Model and provider access to produce a response. Keep the key out of source control and browser bundles.

**Install from this checkout during pre-release development:**

```bash
cd /path/to/a13n-sdk-typescript
npm ci --ignore-scripts
npm run build
npm pack
cd /path/to/your-node-app
npm install /path/to/a13n-sdk-typescript/converge.ai-a13n-0.0.0.tgz
```

The source version is `0.0.0`; a published registry package is **not** implied. After a release, install that published version with `npm install @converge.ai/a13n` instead.

## Ask your Agent

Save this as `hello.mjs` in your Node.js app:

```js
import { randomUUID } from "node:crypto";
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
  const interaction = await agent.start("Say hello in one sentence.", {
    idempotencyKey: randomUUID(),
  });
  const result = await interaction.result();
  console.log(result.status);
  if (result.status === "completed") {
    const messages = await result.run.items();
    console.log(JSON.stringify(messages.data.items, null, 2));
  } else if (result.status === "waiting") console.log(result.pending);
  else console.log(result.failure);
  console.log("Thread ID:", interaction.thread.id);
} finally {
  client.close();
}
```

Set the variables in your shell, then run the file:

```bash
export A13N_SERVICE_URL="https://your-service.example"
export A13N_API_TOKEN="your-workspace-api-key"
export A13N_AGENT_ID="ap_your-agent-id"
node hello.mjs
```

The example prints saved messages and tool activity as JSON. `result.output` is the Run's optional output value, not necessarily its conversation text.

Each **new logical request** needs its own idempotency key. The example generates one. If a network failure leaves the outcome uncertain, save and reuse the **same key and request** when reconciling or retrying; generating a fresh key may submit a second message. `result()` waits for this submission to finish or pause without opening a streaming connection. It returns `completed`, `waiting`, `failed`, or `cancelled`—check the status before using the output. The default local wait limit is five minutes; see [timeouts and recovery](docs/README.md#timeouts-and-recovery).

## Continue the conversation

To send another message, retain the Thread ID printed above. In the same `try` block, after the first result, use:

```js
const followUp = await agent.send(interaction.thread.id, "What did you mean?", {
  idempotencyKey: randomUUID(),
});
const nextResult = await followUp.result();
console.log(nextResult.status, nextResult.output);
```

Store the Thread ID if the conversation must survive process restarts. A Thread can receive messages from different Agents; `send` always uses the Agent you selected.

## Watch output as it arrives

For a **new** interaction, iterate the returned object before asking it for the final result:

```js
const live = await agent.start("Explain your answer step by step.", {
  idempotencyKey: randomUUID(),
});
for await (const event of live) {
  if (event.frame.type === "delta") console.log(event.frame.data.event);
  if (event.frame.type === "gap" || event.frame.type === "reset") {
    console.log("Some live updates may be missing; use committed readback.");
  }
}
const finalResult = await live.result();
console.log(finalResult.status, finalResult.output);
```

This finite stream stops when that interaction finishes or pauses, even if the connection is idle. Live events may be incomplete; for committed display state use `await finalResult.run.items()`. Do not break out of the loop if you still need `live.result()`: an early break closes this interaction's local observation. Closing or cancelling locally does **not** interrupt the remote Run. See [streaming and committed output](docs/README.md#streaming-and-committed-output).

## Go further

- [Create an Agent and choose a Model](docs/README.md#create-an-agent)
- [Send structured messages and mount Memory](docs/README.md#structured-input-and-memory)
- [Handle a waiting Run and resume](docs/README.md#waiting-and-resuming)
- [Use session authentication in a browser](docs/README.md#browser-sessions)
- [Use generated resources for management, files, and administration](docs/README.md#generated-resources)
- [Work with timeouts and uncertain requests](docs/README.md#timeouts-and-recovery)

For the complete wire contract, see the [pinned OpenAPI](openapi.json) and [SDK specification](spec/README.md). Contributors can use [CONTRIBUTING.md](CONTRIBUTING.md) for generation, validation, and release procedures.
