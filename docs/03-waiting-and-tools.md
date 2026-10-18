# Resolve a waiting Run with complete results

A Run in `waiting` has not finished its conversation. Its `pending.approvals` and `pending.calls` identify different obligations: approvals authorize or deny Service-side work; calls need an external result (including client tools and built-in questions). `resume()` submits results for the **entire** pending batch, optionally accompanied by new user content, and returns an Interaction for a distinct successor Run. A queued ordinary `send()` does not resolve a wait. Use the Service URL and API key from [setup](01-setup-and-conversations.md).

## Execute a known client tool

Set `A13N_AGENT_ID` to an existing Agent whose model can select client tools. Save as `client-tool.mjs`. This example defines a `lookup_policy` tool for one Run and handles only the exact requested ID in the application's own policy table. A prompt alone does not register a tool.

```js
import { randomUUID } from "node:crypto";
import {
  createClient,
  approve,
  deny,
  returned,
  failed,
} from "@converge.ai/a13n";

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
      console.log(outcome.text ?? outcome.output);
  } else {
    const approvals = outcome.pendingApprovals;
    const calls = outcome.pendingCalls;
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
      { [call.tool_call_id]: returned(policy) },
      { idempotencyKey: randomUUID(), input: "Also mention any caveats." },
    );
    const resumed = await successor.result();
    await successor.close();
    console.log("Successor status:", resumed.status);
    if (resumed.status === "completed")
      console.log(resumed.text ?? resumed.output);
    else console.log(resumed.pending ?? resumed.failure);
  }
} finally {
  client.close();
}
```

Run `node client-tool.mjs` with `A13N_SERVICE_URL`, `A13N_API_TOKEN` and `A13N_AGENT_ID`. Only the expected tool and arguments produce a result; unexpected or multiple pending calls fail before local execution or resume. The single-Run `client_tools` override replaces, rather than extends, the Agent revision's client-tool list. Replace the illustrative policy object with a real, authorized lookup. A failed external operation can instead use `failed("...")`; `returned({error:"..."})` is still a successful tool return. `returned(value)` requires an explicit JSON value, including null. The optional `input` is ordinary message content **in the same resume request**, after deferred results; it neither answers a call nor creates an inbox Entry. To attach an existing Asset, include `{type:"asset",asset_id:"..."}` as another `input.content` part. Persist the complete request and its idempotency key if retrying after an uncertain network outcome.

## Ask a person to approve or deny

Set `A13N_WAITING_RUN_ID` to the ID of a Run already waiting on an approval. Save this as `approval.mjs` and use an interactive terminal. The script displays the exact call and accepts **no default approval**; the human must have authority to decide the action before typing a choice.

```js
import { randomUUID } from "node:crypto";
import { createInterface } from "node:readline/promises";
import {
  createClient,
  approve,
  deny,
  returned,
  failed,
} from "@converge.ai/a13n";

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
      [call.tool_call_id]:
        decision === "approve" ? approve() : deny("Denied by reviewer"),
    },
    { idempotencyKey: randomUUID() },
  );
  const result = await successor.result();
  await successor.close();
  console.log("Successor status:", result.status);
  if (result.status === "completed") console.log(result.text ?? result.output);
  else console.log(result.pending ?? result.failure);
} finally {
  client.close();
}
```

For a real approval UI, store the reviewed decision and one resume idempotency key before submitting; a competing decision may cause a conflict, requiring a fresh read of the waiting head. The public answer map must cover **every** pending ID without extras. Decisions and results are partitioned into native `approvals` and `calls` in one atomic POST; Service validates complete coverage. Missing, mismatched or duplicate IDs reject the whole request rather than silently denying an omitted approval. Do not infer a category from the tool name when `pending.approvals` versus `pending.calls` already states it.

A built-in `ask_user_question` appears among `pending.calls`, not as an approval. Its returned `value` follows the Harness question response shape, for example `{answers:{"Which region?":"US"}}`; inspect the actual question and choices in `call.arguments` and collect the person's response before returning `returned(value)` in the answer map under that call's ID. Service validates question responses against the exact pending arguments. To intentionally skip a question, submit a native failed call result with a nonblank message. Ordinary `agent.send(...)` does not answer it. See [recovery](07-errors-and-recovery.md) for handling uncertain submissions.

## Observe desktop waiting and explicitly hand back control

`wait_reason:"desktop_control"` is a normal finite waiting result. User-origin takeover can have no pending calls or approvals; `pending.desktop_control_id` identifies its separate control record. This read-only program observes one exact Run and reads control metadata. Save as `desktop-wait.mjs` and set `A13N_RUN_ID` to an authorized Run:

```js
import { createClient } from "@converge.ai/a13n";

const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
try {
  const interaction = client.runs.ref(process.env.A13N_RUN_ID).observe();
  try {
    const outcome = await interaction.result();
    console.log(outcome.status, outcome.snapshot.data.wait_reason);
    if (outcome.status === "waiting") {
      console.log("Desktop control ID:", outcome.pending?.desktop_control_id);
      console.log(
        "Other obligations:",
        outcome.pendingApprovals,
        outcome.pendingCalls,
      );
      const control = await client.api.runs
        .ref(outcome.runId)
        .desktopControl.get();
      console.log("User-origin control:", control.data);
    }
  } finally {
    await interaction.close();
  }
} finally {
  client.close();
}
```

The nullable `desktopControl.get()` selects **user-origin** control. An authorized application can explicitly open a viewing context with `.create({mount:"desk",reason:"Inspect the current task"})`, then call `client.api.desktopAssistance.ref(id).requestControl()` to request safe suspension. Request admission returns metadata, not input authority. Service seals at a complete model boundary and enforces mount permissions, provider support and target fences. A completed Run can allow idle control without creating another Run on handback.

An interactive viewer separately calls `view({session_id,epoch})` for read-only access or `control({session_id,epoch})` for the admitted controller. Here `session_id` is a browser-session token of 20–72 letters/digits/underscore/hyphen, **not** a Service `sess_` resource; epoch is a nonnegative integer. Access responses contain sensitive viewer credentials: retain them only for the viewer, respect `Cache-Control:no-store`, and keep passwords and URLs out of logs. Renewal is an explicit `{query:{renew:true}}` option on view/control, never an SDK timer. `disconnect({session_id,epoch})` revokes that browser's grants without answering a tool or resuming execution.

After the human finishes and explicitly confirms handback, the application calls `complete({session_id,epoch,outcome:"completed",note:"Finished the requested action"})`. Completion revokes grants, confirms cleanup and stores the outcome; it does not start execution. Once user-origin control reports `ready_to_resume`, an explicit desktop-only continuation can use this fragment with the existing client and reviewed Run ID:

```js
const run = client.runs.ref(runId);
const snapshot = await run.get();
const control = await client.api.runs.ref(runId).desktopControl.get();
if (
  snapshot.data.status !== "waiting" ||
  snapshot.data.wait_reason !== "desktop_control" ||
  snapshot.data.pending === null ||
  snapshot.data.pending.desktop_control_id !== control.data?.id ||
  control.data?.state !== "ready_to_resume" ||
  snapshot.data.pending.approvals.length !== 0 ||
  snapshot.data.pending.calls.length !== 0
)
  throw new Error("Review the stored handback and complete pending batch.");
const successor = await run.resume({});
try {
  console.log((await successor.result()).status);
} finally {
  await successor.close();
}
```

`resume({})` sends `{approvals:{},calls:{}}`; Service validates idle-last-waiting eligibility and stored completion. Mixed waits still need all ordinary answers. Agent-requested `request_desktop_assistance` is a deferred call instead: read it with `runs.ref(runId).desktopAssistance.ref(callId).get()`, complete its assistance lifecycle, then submit its exact persisted `outcome` with `returned(outcome)` under that tool-call ID alongside every other pending answer. Never fabricate that outcome. Local observation close, browser disconnect, lease expiry or uncertain cleanup does not authorize handback. The SDK never acquires, renews, resumes, retries control or follows a successor automatically.
