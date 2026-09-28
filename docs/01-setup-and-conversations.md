# Configure a client and continue a conversation

Your server-side Node.js application needs a Service URL, a workspace API key, and the ID of an Agent it may run. The [quickstart](../README.md#get-ready) covers pre-release installation from this checkout. Node.js 22.14+ and an existing Service are required; the SDK does not launch Service or create an Agent for you. Obtain the URL, key, and Agent ID from your administrator or Console. The key selects its workspace, so there is no separate workspace argument.

## Start and continue a Thread

Save the following as `conversation.mjs` in the application where you installed the package. Supply `A13N_SERVICE_URL`, `A13N_API_TOKEN`, and `A13N_AGENT_ID` in your environment as shown in the [quickstart](../README.md#ask-your-agent).

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
  const first = await agent.start("Summarize the release plan.", {
    idempotencyKey: randomUUID(),
    options: {
      overrides: {
        instructions:
          "Summarize the release plan in three bullets; name unknowns.",
      },
    },
  });
  const result = await first.result();
  console.log("Thread:", first.thread.id, "status:", result.status);
  if (result.status === "completed") {
    const committed = await result.run.items();
    console.log(JSON.stringify(committed.data.items, null, 2));

    const next = await agent.send(first.thread.id, "What are the risks?", {
      idempotencyKey: randomUUID(),
    });
    const followUp = await next.result();
    console.log("Follow-up status:", followUp.status);
    if (followUp.status === "completed") {
      console.log(
        JSON.stringify((await followUp.run.items()).data.items, null, 2),
      );
    } else console.log(followUp.pending ?? followUp.failure);
  } else if (result.status === "waiting") console.log(result.pending);
  else console.log(result.failure);
} finally {
  client.close();
}
```

Run `node conversation.mjs`. You should see a Thread ID, a status for each message, and committed Items for completed Runs. Save the Thread ID if another process needs to continue later. The follow-up is submitted **only after the first Run completes**: submitting while it waits for a tool or approval could leave the new message queued until that wait is resolved. A Thread is not owned by the first Agent: `send(threadId, input, ...)` always names the Agent that sends. A string input is enough for ordinary text; [files and Memory](04-files-and-memory.md) shows structured input.

## Limit a configuration change to one Run

The first `start()` supplies a typed `options.overrides.instructions` field. It replaces the Agent revision's instructions **for that Run** to request a three-bullet release summary; the later `send()` omits the override and uses its normal configuration. This is replacement, not concatenation: do not use an instructions override to accidentally remove required Agent-level guidance. For a narrow limit that does not replace instructions, `options.max_usage: { requests: 3 }` bounds model requests for the started Run. These choices are forwarded to Service; they do not guarantee that a particular model will follow a style request.

For a chat transcript, read `result.run.items()` rather than assuming `result.output` is text or a `waiting` Run is completed. Each logical request needs a distinct explicit idempotency key; after an uncertain network failure, **reuse** its original key and body rather than generating another. See [streaming](02-streaming-and-readback.md), [Agent creation](06-generated-resources.md#create-an-agent), [waiting Runs](03-waiting-and-tools.md) or [recovery](07-errors-and-recovery.md).
