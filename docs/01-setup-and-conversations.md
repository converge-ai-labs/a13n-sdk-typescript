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

Run `node conversation.mjs`. You should see a Thread ID, a status for each message, and committed Items for completed Runs. Save the Thread ID if another process needs to continue later. This example submits the follow-up after completion. A normal explicit `send()` is also valid after inspecting failed/cancelled outcomes: `Thread.last_run_id` is the latest seal of any outcome and its nearest checkpoint supplies continuation history. Those outcomes pause automatic queue advancement; they do not erase history or require a retry/fork. Resume is only for the exact idle last waiting Run with complete pending results. In contrast, submitting while it waits for a tool or approval could leave the new message queued until that wait is resolved. A Thread is not owned by the first Agent: `send(threadId, input, ...)` always names the Agent that sends. A string input is enough for ordinary text; [files and Memory](04-files-and-memory.md) shows structured input.

## Import a completed conversation into a new Thread

To continue context originally produced outside Service, pass native Pydantic AI model-message JSON objects as `message_history` **only on `start()`**. The imported history is not an array of display Items or OpenAI chat-role records. Save this example as `import-history.mjs`; set the same Service URL, key and Agent ID used above.

```js
import { randomUUID } from "node:crypto";
import { createClient } from "@converge.ai/a13n";

const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
try {
  const history = [
    {
      kind: "request",
      parts: [
        { part_kind: "user-prompt", content: "What is the deployment window?" },
      ],
    },
    {
      kind: "response",
      parts: [{ part_kind: "text", content: "It has not been decided." }],
    },
  ];
  const interaction = await client.agents
    .ref(process.env.A13N_AGENT_ID)
    .start("What information is still needed to choose a window?", {
      idempotencyKey: randomUUID(),
      message_history: history,
    });
  const result = await interaction.result();
  console.log("Thread:", interaction.thread.id, "status:", result.status);
  console.log(
    "Imported JSON:",
    (await interaction.thread.get()).data.message_history,
  );
  if (result.status === "completed")
    console.log((await result.run.items()).data.items);
} finally {
  client.close();
}
```

The imported JSON is immutable Thread provenance, readable on the Thread, and not historical Service Runs, Entries, Items or usage. Only completed user text, model text and _closed_ tool-call/JSON-result exchanges are accepted. The Service validates the Pydantic AI message format and the limits (256 messages and 256 KiB of normalized JSON); the SDK does not build a second type hierarchy or independently revalidate it. A tool call must be paired with its return before another prompt. On first execution Service seeds native context and then incorporates the new payload; a subsequent `send()` continues the stored checkpoint rather than importing the history again. Preserve the original history and idempotency key for an uncertain retry. See the [pinned Runs contract](../contract/semantics/runs.md#imported-model-context) for supported parts and ordering.

## Limit a configuration change to one Run

The first `start()` supplies a typed `options.overrides.instructions` field. It replaces the Agent revision's instructions **for that Run** to request a three-bullet release summary; the later `send()` omits the override and uses its normal configuration. This is replacement, not concatenation: do not use an instructions override to accidentally remove required Agent-level guidance. For a narrow limit that does not replace instructions, `options.max_usage: { requests: 3 }` bounds model requests for the started Run. These choices are forwarded to Service; they do not guarantee that a particular model will follow a style request.

For a recent committed display window, read `result.run.items()` and [page earlier ordinals](02-streaming-and-readback.md#page-earlier-display-items) explicitly rather than assuming `result.output` is text or a `waiting` Run is completed. Each logical request needs a distinct explicit idempotency key; after an uncertain network failure, **reuse** its original key and body rather than generating another. See [streaming](02-streaming-and-readback.md), [Agent creation](06-generated-resources.md#create-an-agent), [waiting Runs](03-waiting-and-tools.md) or [recovery](07-errors-and-recovery.md).

## Select a native Run configuration snapshot

Run configuration is distinct from an Agent revision override. Inside the client lifetime above, pass it in native Run options:

```js
const interaction = await client.agents
  .ref(process.env.A13N_AGENT_ID)
  .start("Review without changing the Agent definition.", {
    idempotencyKey: randomUUID(),
    options: {
      configuration: {
        allowed_hosts: null,
        extensions: {
          "app.example/presentation": {
            compact: false,
            title: "",
            sections: [],
          },
        },
      },
    },
  });
const result = await interaction.result();
console.log(
  "Accepted configuration:",
  result.snapshot.data.options.configuration,
);
```

Omission or `configuration:null` selects defaults for a new Run and retains an active Run's snapshot when steering. An explicit object is a **complete snapshot**, not a merge with the previous configuration: `{}` selects the empty default value, `allowed_hosts:null` is unrestricted, and `allowed_hosts:[]` denies every destination. Exact host rules and `regex:` patterns are normalized/validated by Service, not by the SDK. Restrictive policy can reject provider transports that cannot enforce it; it is not an SDK network sandbox. Keep namespaced extensions as native JSON, including false, zero, empty strings/arrays/objects and nested nulls.

Use the same `options.configuration` shape in `send()`. While steering an active Run, a different explicit snapshot raises `ApiError` with conflict reason `run_configuration_immutable`; the SDK neither retries it nor silently queues it as a later Run. Choose `delivery:"next_run"` explicitly to request a new snapshot for later execution. Recovery, child execution and `resume()` successors retain their accepted configuration; resume accepts no replacement configuration field. See [streaming](02-streaming-and-readback.md) for separate execution and observation lifetimes.
