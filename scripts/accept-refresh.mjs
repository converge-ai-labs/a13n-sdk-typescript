import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { createClient } from "../dist/index.js";

/** Runs only against an authorized disposable matching Service; fixture lifetime belongs to its owner. */
export async function acceptRefresh(client, settings) {
  assert.equal(
    Boolean(settings.imageRun),
    Boolean(settings.imageId),
    "Supply both retained image selectors",
  );
  const space = await client.api.memorySpaces.create({
    name: `TypeScript refresh ${randomUUID()}`,
    enabled: true,
    organization: { enabled: false, model: settings.organizerModel ?? null },
  });
  assert.equal(space.response.status, 201);
  const spaceRef = client.api.memorySpaces.ref(space.data.id);
  const storedSpace = await spaceRef.get();
  const spaceETag = storedSpace.response.headers.get("ETag");
  assert.ok(spaceETag);
  await spaceRef.update({ guide: null }, { ifMatch: spaceETag });
  const binding = { name: "team", space_id: space.data.id, access: "read" };
  const session = await client.api.sessions.create({
    memory: { enabled: false, spaces: [binding] },
  });
  assert.equal(session.data.memory.enabled, false);
  const sessionRef = client.api.sessions.ref(session.data.id);
  const storedSession = await sessionRef.get();
  const sessionETag = storedSession.response.headers.get("ETag");
  assert.ok(sessionETag);
  const selected = await sessionRef.update(
    { memory: { enabled: true, spaces: [binding] } },
    { ifMatch: sessionETag },
  );
  assert.equal(selected.data.memory.enabled, true);
  const attached = await spaceRef.sessions.list();
  assert.ok(attached.data.items.some((item) => item.id === session.data.id));

  const instructions = "Reply briefly for the authorized SDK acceptance check.";
  const interaction = await client.agents
    .ref(settings.agentId)
    .start(settings.prompt ?? "Confirm the SDK acceptance check.", {
      sessionId: session.data.id,
      idempotencyKey: `typescript-refresh-${randomUUID()}`,
      options: {
        overrides: { instructions, builtin_skills: [], platform_tools: null },
      },
    });
  let result;
  try {
    result = await interaction.result();
    assert.equal(result.status, "completed");
    const frozen = result.snapshot.data.memory_mounts.find(
      (mount) => mount.space_id === space.data.id,
    );
    assert.ok(frozen, "Space binding must survive typed Run readback");
    assert.equal(frozen.memory_id, space.data.memory_id);
    assert.equal(frozen.access, "read");
    assert.deepEqual(frozen.roots, ["global/", `sessions/${session.data.id}/`]);
    const run = client.api.runs.ref(result.runId);
    const executed = await run.agent.get();
    assert.equal(
      executed.data.revision.id,
      result.snapshot.data.agent_revision_id,
    );
    assert.equal(executed.data.config.instructions, instructions);
    assert.deepEqual(executed.data.config.builtin_skills, []);
    const attempts = await run.attempts.list();
    assert.ok(attempts.data.items.length > 0);
    const attempt = await run.attempts.ref(attempts.data.items[0].id).get();
    assert.equal(attempt.data.id, attempts.data.items[0].id);
    const listed = await client.api.runs.list({
      query: { thread_id: result.threadId, session_id: session.data.id },
    });
    assert.ok(listed.data.items.some((item) => item.id === result.runId));
    const usage = await client.api.usage.get({
      query: { run_id: result.runId },
    });
    assert.ok(Array.isArray(usage.data.runs));
    for (const model of usage.data.models) {
      for (const key of [
        "average_time_to_first_chunk_seconds",
        "output_tokens_per_second",
      ]) {
        assert.ok(key in model);
        assert.ok(model[key] === null || typeof model[key] === "number");
      }
    }
  } finally {
    await interaction.close();
  }

  const report = {
    spaceId: space.data.id,
    sessionId: session.data.id,
    threadId: result.threadId,
    runId: result.runId,
    memory: "passed",
    executedAgent: "passed",
    attempts: "passed",
    runs: "passed",
    usage: "passed",
    organization: "not_run: set A13N_ORGANIZER_MODEL to request admission",
    metrics:
      "not_run: set A13N_MODEL_RECORD to a persisted model-request record ID",
    computer:
      "not_run: set A13N_COMPUTER_ENVIRONMENT to an owned fixture Environment",
    image:
      "not_run: set both A13N_IMAGE_RUN and A13N_IMAGE_ID to a committed fixture reference",
  };
  if (settings.organizerModel) {
    const requested = await spaceRef.organizations.create();
    assert.equal(requested.response.status, 202);
    assert.ok(requested.data.pending || requested.data.active_run_id);
    const status = await spaceRef.organization.get();
    const history = await spaceRef.organizations.list();
    assert.ok(Array.isArray(history.data.items));
    report.organization = {
      admission: "passed",
      completion: "not_run: HTTP 202 is admission only",
      status: status.data,
    };
  }
  if (settings.usageRecord) {
    const metrics = await client.api.usage.records
      .ref(settings.usageRecord)
      .metrics.get();
    for (const key of [
      "time_to_first_chunk_seconds",
      "request_duration_seconds",
      "output_tokens_per_second",
    ]) {
      assert.ok(key in metrics.data);
      assert.ok(
        metrics.data[key] === null || typeof metrics.data[key] === "number",
      );
    }
    report.metrics = "passed";
  }
  if (settings.computerEnvironment) {
    const check = await client.api.environments
      .ref(settings.computerEnvironment)
      .computer.check();
    assert.ok(
      ["checked", "unsupported", "not_ready"].includes(check.data.status),
    );
    report.computer = {
      probe: "passed",
      status: check.data.status,
      actions: "not_run: probe does not execute a Computer action",
    };
  }
  if (settings.imageRun) {
    const image = await client.api.runs
      .ref(settings.imageRun)
      .images.ref(settings.imageId)
      .get();
    try {
      assert.ok(
        ["image/png", "image/jpeg"].includes(
          image.response.headers.get("Content-Type"),
        ),
      );
      const bytes = new Uint8Array(
        await new Response(image.body).arrayBuffer(),
      );
      assert.ok(bytes.byteLength > 0);
      report.image = { download: "passed", bytes: bytes.byteLength };
    } finally {
      await image.close();
    }
  }
  return report;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  for (const name of ["A13N_SERVICE_URL", "A13N_API_TOKEN", "A13N_AGENT"]) {
    if (!process.env[name]) throw new Error(`${name} is required`);
  }
  const client = createClient({
    baseUrl: process.env.A13N_SERVICE_URL,
    auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
  });
  try {
    console.log(
      JSON.stringify(
        await acceptRefresh(client, {
          agentId: process.env.A13N_AGENT,
          prompt: process.env.A13N_REFRESH_PROMPT,
          organizerModel: process.env.A13N_ORGANIZER_MODEL,
          usageRecord: process.env.A13N_MODEL_RECORD,
          computerEnvironment: process.env.A13N_COMPUTER_ENVIRONMENT,
          imageRun: process.env.A13N_IMAGE_RUN,
          imageId: process.env.A13N_IMAGE_ID,
        }),
        null,
        2,
      ),
    );
  } finally {
    client.close();
  }
}
