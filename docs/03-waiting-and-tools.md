# Resolve a waiting Run with complete results

A Run in `waiting` has not finished its conversation. Its `pending.approvals` and `pending.calls` identify different obligations: approvals authorize or deny Service-side work; calls need an external result (including client tools and built-in questions). `resume()` submits results for the **entire** pending batch, optionally accompanied by new user content, and returns a distinct successor Run. A queued ordinary `send()` does not resolve a wait. Use the Service URL and API key from [setup](01-setup-and-conversations.md).

## Execute a known client tool

Set `A13N_AGENT_ID` to an existing Agent whose model can select client tools. Save as `client-tool.mjs`. This example defines a `lookup_policy` tool for one Run and handles only the exact requested ID in the application's own policy table. A prompt alone does not register a tool.

```js
import { randomUUID } from "node:crypto";
import { createClient } from "@converge.ai/a13n";

const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
try {
  const interaction = await client.agents
    .ref(process.env.A13N_AGENT_ID)
    .start(
      "Use lookup_policy to find travel-policy, then state its daily limit.",
      {
        idempotencyKey: randomUUID(),
        options: {
          overrides: {
            client_tools: [
              {
                name: "lookup_policy",
                description: "Look up an approved internal policy by ID.",
                parameters_json_schema: {
                  type: "object",
                  properties: { policy_id: { type: "string" } },
                  required: ["policy_id"],
                  additionalProperties: false,
                },
              },
            ],
          },
        },
      },
    );
  const outcome = await interaction.result();
  if (outcome.status !== "waiting") {
    console.log("Run status:", outcome.status);
    if (outcome.status === "completed")
      console.log((await outcome.run.items()).data.items);
  } else {
    const approvals = outcome.pending?.approvals ?? [];
    const calls = outcome.pending?.calls ?? [];
    if (approvals.length !== 0 || calls.length !== 1)
      throw new Error("Review the complete pending batch before resuming.");
    const call = calls[0];
    if (
      call.tool_name !== "lookup_policy" ||
      call.arguments.policy_id !== "travel-policy" ||
      Object.keys(call.arguments).length !== 1
    )
      throw new Error("Unexpected tool or arguments; do not execute.");
    const policy = { currency: "USD", daily_limit: 75 };
    const successor = await outcome.run.resume(
      {
        approvals: {},
        calls: {
          [call.tool_call_id]: { status: "returned", value: policy },
        },
        input: {
          content: [{ type: "text", text: "Also mention any caveats." }],
        },
      },
      { idempotencyKey: randomUUID() },
    );
    const resumed = await successor.wait();
    console.log("Successor status:", resumed.status);
    if (resumed.status === "completed")
      console.log((await resumed.run.items()).data.items);
    else console.log(resumed.pending ?? resumed.failure);
  }
} finally {
  client.close();
}
```

Run `node client-tool.mjs` with `A13N_SERVICE_URL`, `A13N_API_TOKEN` and `A13N_AGENT_ID`. Only the expected tool and arguments produce a result; unexpected or multiple pending calls fail before local execution or resume. The single-Run `client_tools` override replaces, rather than extends, the Agent revision's client-tool list. Replace the illustrative policy object with a real, authorized lookup. A failed external operation can instead use `{status:"failed",message:"..."}` in `calls`; returning `{status:"returned",value:{error:"..."}}` is still a successful tool return. The optional `input` is ordinary message content **in the same resume request**, after deferred results; it neither answers a call nor creates an inbox Entry. To attach an existing Asset, include `{type:"asset",asset_id:"..."}` as another `input.content` part. Persist the complete request and its idempotency key if retrying after an uncertain network outcome.

## Ask a person to approve or deny

Set `A13N_WAITING_RUN_ID` to the ID of a Run already waiting on an approval. Save this as `approval.mjs` and use an interactive terminal. The script displays the exact call and accepts **no default approval**; the human must have authority to decide the action before typing a choice.

```js
import { randomUUID } from "node:crypto";
import { createInterface } from "node:readline/promises";
import { createClient } from "@converge.ai/a13n";

if (!process.env.A13N_WAITING_RUN_ID)
  throw new Error("Set the waiting approval Run ID.");
const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
try {
  const run = client.runs.ref(process.env.A13N_WAITING_RUN_ID);
  const snapshot = await run.get();
  const approvals = snapshot.data.pending?.approvals ?? [];
  const calls = snapshot.data.pending?.calls ?? [];
  if (
    snapshot.data.status !== "waiting" ||
    approvals.length !== 1 ||
    calls.length !== 0
  )
    throw new Error(
      "Expected exactly one approval and no other pending calls.",
    );
  const call = approvals[0];
  console.log("Review before deciding:", {
    thread_id: snapshot.data.thread_id,
    run_id: run.id,
    tool_call_id: call.tool_call_id,
    tool_name: call.tool_name,
    arguments: call.arguments,
    presentation: call.presentation,
  });
  const terminal = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let decision;
  try {
    decision = (await terminal.question("Type approve or deny: ")).trim();
  } finally {
    terminal.close();
  }
  if (decision !== "approve" && decision !== "deny")
    throw new Error("No decision submitted.");
  const successor = await run.resume(
    {
      approvals: {
        [call.tool_call_id]:
          decision === "approve"
            ? { action: "approve" }
            : { action: "deny", reason: "Denied by reviewer" },
      },
      calls: {},
    },
    { idempotencyKey: randomUUID() },
  );
  const result = await successor.wait();
  console.log("Successor status:", result.status);
  if (result.status === "completed")
    console.log((await result.run.items()).data.items);
  else console.log(result.pending ?? result.failure);
} finally {
  client.close();
}
```

For a real approval UI, store the reviewed decision and one resume idempotency key before submitting; a competing decision may cause a conflict, requiring a fresh read of the waiting head. `approvals` and `calls` must each cover **every** pending ID of their respective category, without extras. Missing, mismatched or duplicate IDs reject the whole request rather than silently denying an omitted approval. Do not infer a category from the tool name when `pending.approvals` versus `pending.calls` already states it.

A built-in `ask_user_question` appears among `pending.calls`, not as an approval. Its returned `value` follows the Harness question response shape, for example `{answers:{"Which region?":"US"}}`; inspect the actual question and choices in `call.arguments` and collect the person's response before returning it through the `calls` map under that call's ID. Service validates question responses against the exact pending arguments. To intentionally skip a question, submit a native failed call result with a nonblank message. Ordinary `agent.send(...)` does not answer it. See [recovery](07-errors-and-recovery.md) for handling uncertain submissions.
