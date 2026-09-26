import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { createClient, textPayload } from "../dist/index.js";

for (const name of [
  "A13N_SERVICE_URL",
  "A13N_API_TOKEN",
  "A13N_WORKSPACE",
  "A13N_AGENT",
  "A13N_CLIENT_TOOL_AGENT",
])
  if (!process.env[name]) throw new Error(`${name} is required`);
const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
const workspace = client.resources.workspaces.ref(process.env.A13N_WORKSPACE);
const waitFor = async (check, timeout = 30_000) => {
  const deadline = Date.now() + timeout;
  do {
    const result = await check();
    if (result) return result;
    await new Promise((resolve) => setTimeout(resolve, 250));
  } while (Date.now() < deadline);
  throw new Error("Timed out waiting for Service state");
};
try {
  const key = `ts-managed-${randomUUID()}`;
  const body = {
    agent_id: process.env.A13N_AGENT,
    payload: textPayload("Reply briefly to the resource SDK acceptance probe."),
  };
  const first = await workspace.threads.create(body, { idempotencyKey: key });
  assert.equal(first.response.status, 201);
  assert.equal(first.data.entry.status, "assigned");
  assert.ok(first.data.run?.id);
  const replay = await workspace.threads.create(body, { idempotencyKey: key });
  assert.equal(replay.response.status, 200);
  assert.equal(replay.data.entry.id, first.data.entry.id);
  const thread = workspace.threads.ref(first.data.thread.id);
  assert.equal((await thread.get()).data.id, first.data.thread.id);
  const events = [];
  const signal = AbortSignal.timeout(20_000);
  for await (const event of thread.events({ signal })) {
    events.push(event.frame.type);
    if (event.frame.type === "boundary") break;
  }
  assert.ok(events.includes("delta") && events.includes("boundary"));
  const run = workspace.runs.ref(first.data.run.id);
  assert.equal(
    (await run.wait({ timeoutMs: 30_000, pollIntervalMs: 250 })).data.status,
    "completed",
  );
  assert.ok(Array.isArray((await run.items.get()).data.items));
  assert.ok(
    (await thread.runs.list()).data.items.some(
      (item) => item.id === first.data.run.id,
    ),
  );
  const tool = await workspace.threads.create(
    {
      agent_id: process.env.A13N_CLIENT_TOOL_AGENT,
      payload: textPayload("[client] Run local_review on this request."),
    },
    {
      idempotencyKey: `ts-managed-tool-${randomUUID()}`,
    },
  );
  assert.ok(tool.data.run?.id);
  const toolRun = workspace.runs.ref(tool.data.run.id);
  const pending = await waitFor(async () => {
    const value = (await toolRun.get()).data;
    return value.status === "waiting" ? value : null;
  });
  const action = pending.pending?.items.find(
    (item) => item.kind === "client_tool",
  );
  assert.ok(action?.tool_call_id);
  const queuedKey = `ts-managed-next-${randomUUID()}`;
  const inbox = workspace.threads.ref(tool.data.thread.id).inbox;
  const message = {
    agent_id: process.env.A13N_CLIENT_TOOL_AGENT,
    delivery: "next_run",
    payload: { content: [{ type: "text", text: "Summarize that review." }] },
  };
  const queued = await inbox.create(message, { idempotencyKey: queuedKey });
  assert.equal(queued.response.status, 201);
  assert.equal(queued.data.run, null);
  assert.equal(
    (await inbox.ref(queued.data.entry.id).get()).data.id,
    queued.data.entry.id,
  );
  const queuedReplay = await inbox.create(message, {
    idempotencyKey: queuedKey,
  });
  assert.equal(queuedReplay.response.status, 200);
  assert.equal(queuedReplay.data.entry.id, queued.data.entry.id);
  const answers = {
    answers: [
      {
        tool_call_id: action.tool_call_id,
        action: "complete",
        result: { reviewed: true },
      },
    ],
  };
  const resumeKey = `ts-managed-resume-${randomUUID()}`;
  const resumed = await toolRun.resume(answers, { idempotencyKey: resumeKey });
  assert.equal(resumed.response.status, 201);
  const resumedReplay = await toolRun.resume(answers, {
    idempotencyKey: resumeKey,
  });
  assert.equal(resumedReplay.response.status, 200);
  assert.equal(resumedReplay.data.id, resumed.data.id);
  assert.equal(
    (
      await workspace.runs
        .ref(resumed.data.id)
        .wait({ timeoutMs: 30_000, pollIntervalMs: 250 })
    ).data.status,
    "completed",
  );

  const bytes = new Uint8Array([0, 255, 17, 3, 39, 100]);
  const upload = (
    await workspace.uploads.create(
      { file: new Blob([bytes], { type: "application/octet-stream" }) },
      { idempotencyKey: `ts-upload-${randomUUID()}` },
    )
  ).data;
  assert.equal(upload.size, bytes.length);
  const asset = await workspace.assets.create({
    upload_id: upload.upload_id,
    name: `typescript-${randomUUID()}.bin`,
  });
  assert.equal(asset.response.status, 201);
  assert.equal(
    (await workspace.assets.ref(asset.data.id).get()).data.digest,
    upload.digest,
  );
  const content = await workspace.assets.ref(asset.data.id).content.get();
  try {
    assert.deepEqual(
      new Uint8Array(await new Response(content.body).arrayBuffer()),
      bytes,
    );
  } finally {
    await content.close();
  }
  console.log(
    `Resource interaction installed acceptance passed: thread=${first.data.thread.id} run=${first.data.run.id} queued=${queued.data.entry.id} resumed=${resumed.data.id} asset=${asset.data.id}`,
  );
} finally {
  client.close();
}
