import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { createClient } from "../dist/index.js";

/** Acceptance against an independently managed disposable Service. Never starts/stops Service. */
for (const name of [
  "A13N_SERVICE_URL",
  "A13N_API_TOKEN",
  "A13N_AGENT",
  "A13N_CLIENT_TOOL_AGENT",
])
  if (!process.env[name]) throw new Error(`${name} is required`);
const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
const key = () => `typescript-accept-${randomUUID()}`;
const wait = async (check, timeout = 30_000) => {
  const deadline = Date.now() + timeout;
  do {
    const value = await check();
    if (value) return value;
    await new Promise((resolve) => setTimeout(resolve, 200));
  } while (Date.now() < deadline);
  throw new Error("Timed out waiting for Service state");
};
try {
  const prompt = "Reply briefly to this SDK acceptance probe.";
  const firstKey = key();
  const agent = client.agents.ref(process.env.A13N_AGENT);
  const interaction = await agent.start(prompt, { idempotencyKey: firstKey });
  assert.equal(interaction.receipt.response.status, 201);
  const replay = await client.resources.threads.create(
    {
      agent_id: agent.id,
      payload: { content: [{ type: "text", text: prompt }] },
    },
    { idempotencyKey: firstKey },
  );
  assert.equal(replay.response.status, 200);
  assert.equal(replay.data.entry.id, interaction.entry.id);
  assert.equal(replay.data.thread.id, interaction.thread.id);

  const frames = [];
  for await (const event of interaction) frames.push(event.frame.type);
  const outcome = await interaction.result();
  assert.equal(outcome.status, "completed", `Run sealed as ${outcome.status}`);
  assert.equal((await interaction.thread.get()).data.id, interaction.thread.id);
  assert.ok(Array.isArray((await outcome.run.items()).data.items));

  const clientToolAgent = client.agents.ref(process.env.A13N_CLIENT_TOOL_AGENT);
  const toolInteraction = await clientToolAgent.start(
    "[client] Run local_review on this request.",
    { idempotencyKey: key() },
  );
  const pending = await toolInteraction.result();
  assert.equal(pending.status, "waiting");
  assert.equal(pending.snapshot.data.wait_reason, "client_tool");
  const request = pending.pending?.items.find(
    (item) => item.kind === "client_tool",
  );
  assert.ok(request?.tool_call_id, "Expected a client-tool pending action");

  const queuedKey = key();
  const queuedBody = {
    agent_id: clientToolAgent.id,
    delivery: "next_run",
    payload: { content: [{ type: "text", text: "Summarize that review." }] },
  };
  const queuedFirst = await client.resources.threads
    .ref(toolInteraction.thread.id)
    .inbox.create(queuedBody, { idempotencyKey: queuedKey });
  assert.equal(queuedFirst.response.status, 201);
  assert.equal(queuedFirst.data.run, null);
  assert.equal(queuedFirst.data.entry.status, "pending");
  const queuedReplay = await client.resources.threads
    .ref(toolInteraction.thread.id)
    .inbox.create(queuedBody, { idempotencyKey: queuedKey });
  assert.equal(queuedReplay.response.status, 200);
  assert.equal(queuedReplay.data.entry.id, queuedFirst.data.entry.id);

  const answers = {
    answers: [
      {
        tool_call_id: request.tool_call_id,
        action: "complete",
        result: { reviewed: true },
      },
    ],
  };
  const resumeKey = key();
  const successor = await pending.run.resume(answers, {
    idempotencyKey: resumeKey,
  });
  assert.equal(successor.receipt.response.status, 201);
  const resumedReplay = await client.resources.runs
    .ref(pending.run.id)
    .resume(answers, { idempotencyKey: resumeKey });
  assert.equal(resumedReplay.response.status, 200);
  assert.equal(resumedReplay.data.id, successor.id);
  const completed = await successor.wait();
  assert.equal(completed.status, "completed");
  await wait(async () => {
    const current = await client.resources.threads
      .ref(toolInteraction.thread.id)
      .inbox.ref(queuedFirst.data.entry.id)
      .get();
    return current.data.status === "consumed" ? current : null;
  });
  console.log(
    `Service acceptance passed: thread=${interaction.thread.id} run=${outcome.run.id} frames=${frames.join(",")} queued=${queuedFirst.data.entry.id} resumed=${completed.run.id}`,
  );
} finally {
  client.close();
}
