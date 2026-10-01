import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { ApiError, createClient } from "../dist/index.js";

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
const configuration = {
  allowed_hosts: null,
  extensions: {
    "app.example/sdk": {
      enabled: false,
      count: 0,
      title: "",
      values: [null, {}, []],
    },
  },
};
const nextConfiguration = {
  allowed_hosts: null,
  extensions: {
    "app.example/sdk": { phase: "next_run", nested: { enabled: false } },
  },
};
try {
  const agent = client.agents.ref(process.env.A13N_AGENT);
  const prompt = "Reply briefly to the managed SDK acceptance probe.";
  const firstKey = key();
  const message_history = [
    {
      kind: "request",
      parts: [{ part_kind: "user-prompt", content: "What is the SDK?" }],
    },
    {
      kind: "response",
      parts: [{ part_kind: "text", content: "An Agent Service client." }],
    },
  ];
  const interaction = await agent.start(prompt, {
    idempotencyKey: firstKey,
    message_history,
    options: { configuration },
  });
  assert.equal(interaction.receipt.response.status, 201);
  const replay = await resources.threads.create(
    {
      agent_id: agent.id,
      message_history,
      options: { configuration },
      payload: { content: [{ type: "text", text: prompt }] },
    },
    { idempotencyKey: firstKey },
  );
  assert.equal(replay.response.status, 200);
  assert.equal(replay.data.entry.id, interaction.entry.id);
  assert.deepEqual(
    (await interaction.thread.get()).data.message_history,
    message_history,
  );
  const events = [];
  for await (const event of interaction) events.push(event.frame.type);
  const outcome = await interaction.result();
  assert.equal(outcome.status, "completed");
  assert.deepEqual(outcome.snapshot.data.options.configuration, configuration);
  assert.deepEqual(
    (await outcome.run.get()).data.options.configuration,
    configuration,
  );
  assert.ok(Array.isArray((await outcome.run.items()).data.items));
  // Omission, null and an explicit empty snapshot all reach Service without an SDK merge.
  for (const fields of [{}, { configuration: null }, { configuration: {} }]) {
    const started = await agent.start(
      "Reply briefly to the native configuration probe.",
      {
        idempotencyKey: key(),
        options: fields,
      },
    );
    const result = await started.result();
    assert.equal(result.status, "completed");
    assert.deepEqual(result.snapshot.data.options.configuration, {
      allowed_hosts: null,
      extensions: {},
    });
  }
  assert.ok(
    (
      await resources.threads.ref(interaction.thread.id).runs.list()
    ).data.items.some((item) => item.id === outcome.run.id),
  );

  // The scripted fixture holds this independent Run open. A waiting seal is
  // not active: it clears Thread.current_run_id and cannot prove steering rejection.
  const active = await agent.start(
    "[interruptible] [slow] [long] Probe immutable native Run configuration.",
    { idempotencyKey: key(), options: { configuration } },
  );
  assert.ok(active.run, "the independent probe must accept a Run");
  const activeRun = active.run;
  const runningDeadline = Date.now() + 30_000;
  let activeSnapshot = await activeRun.get();
  while (activeSnapshot.data.status === "accepted") {
    assert.ok(Date.now() < runningDeadline, "probe did not enter running");
    await new Promise((resolve) => setTimeout(resolve, 50));
    activeSnapshot = await activeRun.get();
  }
  assert.equal(activeSnapshot.data.status, "running");
  assert.deepEqual(activeSnapshot.data.options.configuration, configuration);
  assert.equal((await active.thread.get()).data.current_run_id, activeRun.id);
  await assert.rejects(
    agent.send(active.thread.id, "Do not alter this active snapshot.", {
      idempotencyKey: key(),
      delivery: "steer",
      options: { configuration: nextConfiguration },
    }),
    (error) =>
      error instanceof ApiError &&
      error.status === 409 &&
      error.details.reason === "run_configuration_immutable",
  );
  const activeOutcome = await active.result({
    timeoutMs: 60_000,
    pollIntervalMs: 100,
  });
  assert.equal(activeOutcome.status, "completed");
  assert.equal(activeOutcome.run.id, activeRun.id);
  assert.deepEqual(
    activeOutcome.snapshot.data.options.configuration,
    configuration,
  );

  const toolAgent = client.agents.ref(process.env.A13N_CLIENT_TOOL_AGENT);
  const tool = await toolAgent.start(
    "[client] Run local_review on this request.",
    { idempotencyKey: key(), options: { configuration } },
  );
  const pending = await tool.result();
  assert.equal(pending.status, "waiting");
  assert.deepEqual(pending.snapshot.data.options.configuration, configuration);
  assert.equal((await tool.thread.get()).data.current_run_id, null);
  const calls = pending.pending?.calls ?? [];
  assert.equal(pending.pending?.approvals.length, 0);
  assert.equal(calls.length, 1);
  const action = calls[0];
  assert.equal(action.tool_name, "local_review");
  assert.ok(action.tool_call_id);
  const queuedKey = key();
  const inbox = resources.threads.ref(tool.thread.id).inbox;
  const message = {
    agent_id: toolAgent.id,
    delivery: "next_run",
    options: { configuration: nextConfiguration },
    payload: { content: [{ type: "text", text: "Summarize that review." }] },
  };
  const queued = await toolAgent.send(tool.thread.id, message.payload, {
    idempotencyKey: queuedKey,
    delivery: "next_run",
    options: message.options,
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
    approvals: {},
    calls: {
      [action.tool_call_id]: { status: "returned", value: { reviewed: true } },
    },
    input: {
      content: [{ type: "text", text: "Include one caveat in this review." }],
    },
  };
  const resumeKey = key();
  const resumed = await pending.run.resume(answers, {
    idempotencyKey: resumeKey,
  });
  assert.equal(resumed.receipt.response.status, 201);
  assert.deepEqual(resumed.receipt.data.options.configuration, configuration);
  const resumedReplay = await resources.runs
    .ref(pending.run.id)
    .resume(answers, { idempotencyKey: resumeKey });
  assert.equal(resumedReplay.response.status, 200);
  assert.equal(resumedReplay.data.id, resumed.id);
  assert.equal((await resumed.wait({ timeoutMs: 30_000 })).status, "completed");
  const queuedOutcome = await queued.result();
  assert.equal(queuedOutcome.status, "completed");
  assert.deepEqual(
    queuedOutcome.snapshot.data.options.configuration,
    nextConfiguration,
  );
  assert.deepEqual(
    (await resumed.get()).data.options.configuration,
    configuration,
  );
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
    `Installed interaction acceptance passed: native_configuration=passed immutable_steering=passed next_run_snapshot=passed resume_snapshot=passed thread=${interaction.thread.id} run=${outcome.run.id} frames=${events.join(",")} queued=${queued.entry.id} resumed=${resumed.id} asset=${asset.data.id}`,
  );
} finally {
  client.close();
}
