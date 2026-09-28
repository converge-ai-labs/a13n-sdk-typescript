# Handle a waiting Run

A waiting Run has not finished the conversation. Its `pending.items` identify the calls that need external work or human decisions; `resume()` creates a different, successor Run. Use the Service URL and API key from [setup](01-setup-and-conversations.md), and an existing Agent ID. The examples below make different choices for client tools and approvals—do not treat them as interchangeable.

## Execute a known client tool

Set `A13N_AGENT_ID` to an Agent whose configured model can select tools. Save this as `client-tool.mjs`. It defines a `lookup_policy` client tool **for this one Run**, rather than presuming the prompt registers a tool. The local policy table represents application-owned data: replace it with your authorized lookup, not an unvalidated dispatch on the model's tool name. The example handles exactly one pending call so other calls cannot be silently defaulted.

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
    const pending = outcome.pending?.items ?? [];
    if (pending.length !== 1)
      throw new Error("Review the complete pending batch.");
    const call = pending[0];
    if (
      call.kind !== "client_tool" ||
      call.tool_name !== "lookup_policy" ||
      call.arguments.policy_id !== "travel-policy" ||
      Object.keys(call.arguments).length !== 1
    )
      throw new Error("Unexpected client tool or arguments; do not execute.");
    // Replace this application-owned lookup with your authorized implementation.
    const policy = { currency: "USD", daily_limit: 75 };
    const successor = await outcome.run.resume(
      {
        answers: [
          {
            action: "complete",
            tool_call_id: call.tool_call_id,
            result: policy,
          },
        ],
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

Run `node client-tool.mjs` with `A13N_SERVICE_URL`, `A13N_API_TOKEN` and `A13N_AGENT_ID`. If the model requests the expected tool, the local result is supplied under its actual `tool_call_id`; if it calls a different tool, passes different arguments, or asks for multiple calls, the script fails **before** executing or resuming. A single-Run `client_tools` override replaces the revision's client-tool list, not appends to it. Production integrations should validate arguments against their own policy, execute the real tool, persist the resume key before mutation, and handle every item in a legitimate multi-call batch.

## Ask a person to approve or reject

An approval may concern a consequential action, so the human must review the displayed call and choose explicitly. Set `A13N_WAITING_RUN_ID` to the Run ID from an earlier `waiting` result; this example does not itself create an approval. Save this as `approval.mjs` and run it in an interactive terminal with `A13N_SERVICE_URL` and `A13N_API_TOKEN`. Confirm the application's authorization to decide this particular call before entering a response.

```js
import { randomUUID } from "node:crypto";
import { createInterface } from "node:readline/promises";
import { createClient } from "@converge.ai/a13n";

if (!process.env.A13N_WAITING_RUN_ID)
  throw new Error("Set the Run ID of a waiting approval.");
const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
try {
  const run = client.runs.ref(process.env.A13N_WAITING_RUN_ID);
  const snapshot = await run.get();
  const pending = snapshot.data.pending?.items ?? [];
  if (snapshot.data.status !== "waiting" || pending.length !== 1)
    throw new Error(
      "Expected exactly one pending approval; review the full batch.",
    );
  const call = pending[0];
  if (call.kind !== "approval")
    throw new Error("The pending call is not a human approval.");
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
    decision = (await terminal.question("Type approve or reject: ")).trim();
  } finally {
    terminal.close();
  }
  if (decision !== "approve" && decision !== "reject")
    throw new Error("No decision submitted.");
  const successor = await run.resume(
    {
      answers: [
        decision === "approve"
          ? { action: "approve", tool_call_id: call.tool_call_id }
          : {
              action: "reject",
              tool_call_id: call.tool_call_id,
              reason: "Rejected by reviewer",
            },
      ],
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

The script displays the exact pending call and has no default approval. For a real approval UI, persist the review decision and one resume idempotency key before submitting it; a competing decision may cause a state conflict, in which case reread the waiting head. `resume()` only applies to the exact idle waiting head. Omitting an approval from a resume batch **rejects** it; omitting a client result or question yields `no_response`. Never submit a partial batch unintentionally.

A `user_input` item accepts **no structured resume answer**. At a question-only wait, use an ordinary `agent.send(threadId, answer, {idempotencyKey})` after the person responds; that message starts the successor. It does not approve a pending approval or complete a client tool. See [recovery](07-errors-and-recovery.md) when a submission or resume has an uncertain network outcome.
