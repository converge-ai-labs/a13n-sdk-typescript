import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { createClient } from "../dist/index.js";

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
const resources = client.resources;
const key = () => `ts-managed-${randomUUID()}`;
try {
  const agent = client.agents.ref(process.env.A13N_AGENT);
  const prompt = "Reply briefly to the managed SDK acceptance probe.";
  const firstKey = key();
  const interaction = await agent.start(prompt, { idempotencyKey: firstKey });
  assert.equal(interaction.receipt.response.status, 201);
  const replay = await resources.threads.create(
    {
      agent_id: agent.id,
      payload: { content: [{ type: "text", text: prompt }] },
    },
    { idempotencyKey: firstKey },
  );
  assert.equal(replay.response.status, 200);
  assert.equal(replay.data.entry.id, interaction.entry.id);
  const events = [];
  for await (const event of interaction) events.push(event.frame.type);
  const outcome = await interaction.result();
  assert.equal(outcome.status, "completed");
  assert.ok(Array.isArray((await outcome.run.items()).data.items));
  assert.ok(
    (
      await resources.threads.ref(interaction.thread.id).runs.list()
    ).data.items.some((item) => item.id === outcome.run.id),
  );

  const toolAgent = client.agents.ref(process.env.A13N_CLIENT_TOOL_AGENT);
  const tool = await toolAgent.start(
    "[client] Run local_review on this request.",
    { idempotencyKey: key() },
  );
  const pending = await tool.result();
  assert.equal(pending.status, "waiting");
  const action = pending.pending?.items.find(
    (item) => item.kind === "client_tool",
  );
  assert.ok(action?.tool_call_id);
  const queuedKey = key();
  const inbox = resources.threads.ref(tool.thread.id).inbox;
  const message = {
    agent_id: toolAgent.id,
    delivery: "next_run",
    payload: { content: [{ type: "text", text: "Summarize that review." }] },
  };
  const queued = await toolAgent.send(tool.thread.id, message.payload, {
    idempotencyKey: queuedKey,
    delivery: "next_run",
  });
  assert.equal(queued.receipt.response.status, 201);
  assert.equal(queued.run, null);
  assert.equal((await queued.entry.get()).data.id, queued.entry.id);
  const queuedReplay = await inbox.create(message, {
    idempotencyKey: queuedKey,
  });
  assert.equal(queuedReplay.response.status, 200);
  assert.equal(queuedReplay.data.entry.id, queued.entry.id);

  const answers = {
    answers: [
      {
        tool_call_id: action.tool_call_id,
        action: "complete",
        result: { reviewed: true },
      },
    ],
  };
  const resumeKey = key();
  const resumed = await pending.run.resume(answers, {
    idempotencyKey: resumeKey,
  });
  assert.equal(resumed.receipt.response.status, 201);
  const resumedReplay = await resources.runs
    .ref(pending.run.id)
    .resume(answers, { idempotencyKey: resumeKey });
  assert.equal(resumedReplay.response.status, 200);
  assert.equal(resumedReplay.data.id, resumed.id);
  assert.equal((await resumed.wait({ timeoutMs: 30_000 })).status, "completed");
  const queuedOutcome = await queued.result();
  assert.equal(queuedOutcome.status, "completed");
  const incorporated = await queued.entry.get();
  assert.equal(incorporated.data.status, "consumed");
  assert.equal(incorporated.data.assigned_run_id, queuedOutcome.run.id);

  const bytes = new Uint8Array([0, 255, 17, 3, 39, 100]);
  const upload = (
    await resources.uploads.create(
      { file: new Blob([bytes], { type: "application/octet-stream" }) },
      { idempotencyKey: key() },
    )
  ).data;
  assert.equal(upload.size, bytes.length);
  const asset = await resources.assets.create({
    upload_id: upload.upload_id,
    name: `typescript-${randomUUID()}.bin`,
  });
  assert.equal(asset.response.status, 201);
  assert.equal(
    (await resources.assets.ref(asset.data.id).get()).data.digest,
    upload.digest,
  );
  const content = await resources.assets.ref(asset.data.id).content.get();
  try {
    assert.deepEqual(
      new Uint8Array(await new Response(content.body).arrayBuffer()),
      bytes,
    );
  } finally {
    await content.close();
  }
  console.log(
    `Installed interaction acceptance passed: thread=${interaction.thread.id} run=${outcome.run.id} frames=${events.join(",")} queued=${queued.entry.id} resumed=${resumed.id} asset=${asset.data.id}`,
  );
} finally {
  client.close();
}
