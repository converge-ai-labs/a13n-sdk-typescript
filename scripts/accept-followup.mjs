import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { ApiError, createClient } from "../dist/index.js";

/** Explicit caller for a frozen installed SDK and an authorized disposable Service. */
export async function acceptFollowup(client, settings) {
  const head = await client.api.agents.ref(settings.agentId).get();
  assert.ok(head.data.default_revision_id);
  const original = await client.api.agents
    .ref(settings.agentId)
    .revisions.ref(head.data.default_revision_id)
    .get();
  const config = {
    model: original.data.config.model,
    instructions: "Reply briefly for SDK acceptance.",
  };
  const created = await client.api.agents.create({
    name: `TypeScript followup ${randomUUID()}`,
    config,
  });
  const agent = client.api.agents.ref(created.data.id);
  for (const tool_search of [
    {
      config: {
        mode: "proxy",
        search_name: "search_proxy_tools",
        call_name: "call_proxy_tool",
        max_results: 10,
        max_search_bytes: 32768,
      },
      groups: {},
    },
    { config: { mode: "native", strategy: null }, groups: {} },
  ]) {
    const current = await agent.get();
    const ifMatch = current.response.headers.get("ETag");
    assert.ok(ifMatch);
    const revision = await agent.revisions.create(
      { config: { ...config, tool_search } },
      { ifMatch },
    );
    const saved = await agent.revisions.ref(revision.data.id).get();
    assert.deepEqual(saved.data.config.tool_search, tool_search);
  }
  const current = await agent.get();
  const ifMatch = current.response.headers.get("ETag");
  assert.ok(ifMatch);
  await assert.rejects(
    agent.revisions.create(
      {
        config: {
          ...config,
          tool_search: { config: { mode: "native", max_results: 10 } },
        },
      },
      { ifMatch },
    ),
    (error) => error instanceof ApiError && error.status === 400,
  );
  const report = {
    agentId: created.data.id,
    toolSearch: "passed: proxy/native revision roundtrip and mixed shape 400",
    context:
      "not_run: set A13N_MODEL_RECORD to a completed main-Agent contribution",
    failedContext:
      "not_run: set A13N_FAILURE_PROMPT for a fresh Run without completed contribution",
    desktopExecution:
      "not_run: requires an authorized capable disposable desktop",
  };
  await assert.rejects(
    client.api.usage.context.get({ query: {} }),
    (error) => error instanceof ApiError && error.status === 400,
  );
  await assert.rejects(
    client.api.usage.context.get({
      query: { record_id: `missing-${randomUUID()}` },
    }),
    (error) => error instanceof ApiError && error.status === 404,
  );
  if (settings.usageRecord) {
    const record = await client.api.usage.context.get({
      query: { record_id: settings.usageRecord },
    });
    assert.notEqual(record.data, null);
    assert.equal(record.data.record_id, settings.usageRecord);
    const run = await client.api.runs.ref(record.data.run_id).get();
    const byRun = await client.api.usage.context.get({
      query: { run_id: record.data.run_id },
    });
    const byThread = await client.api.usage.context.get({
      query: { thread_id: run.data.thread_id },
    });
    assert.deepEqual(byRun.data, record.data);
    assert.deepEqual(byThread.data, record.data);
    for (const name of [
      "input_tokens",
      "output_tokens",
      "context_window_tokens",
    ]) {
      assert.ok(name in record.data);
      assert.ok(
        record.data[name] === null || typeof record.data[name] === "number",
      );
    }
    if (settings.expectUnknownCapacity)
      assert.equal(record.data.context_window_tokens, null);
    const control = await client.api.runs.ref(run.data.id).desktopControl.get();
    assert.equal(control.response.status, 200);
    assert.equal(control.data, null);
    await assert.rejects(
      client.api.usage.context.get({
        query: { run_id: run.data.id, thread_id: run.data.thread_id },
      }),
      (error) => error instanceof ApiError && error.status === 400,
    );
    report.context = {
      status: "passed",
      runId: run.data.id,
      threadId: run.data.thread_id,
      contribution: record.data,
      desktopControl: "passed: 200 null",
    };
  }
  if (settings.failurePrompt) {
    // The original runnable Agent remains unchanged; native discovery is configuration-only above.
    const interaction = await client.agents
      .ref(settings.agentId)
      .start(settings.failurePrompt, {
        idempotencyKey: `typescript-followup-${randomUUID()}`,
      });
    try {
      const result = await interaction.result();
      assert.equal(result.status, "failed");
      for (const query of [
        { run_id: result.runId },
        { thread_id: result.threadId },
      ]) {
        const usage = await client.api.usage.context.get({ query });
        assert.equal(usage.response.status, 200);
        assert.equal(usage.data, null);
      }
      const control = await client.api.runs
        .ref(result.runId)
        .desktopControl.get();
      assert.equal(control.response.status, 200);
      assert.equal(control.data, null);
      report.failedContext = {
        status: "passed: 200 null",
        runId: result.runId,
        threadId: result.threadId,
      };
    } finally {
      await interaction.close();
    }
  }
  return report;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  for (const name of ["A13N_SERVICE_URL", "A13N_API_TOKEN", "A13N_AGENT"])
    if (!process.env[name]) throw new Error(`${name} is required`);
  const client = createClient({
    baseUrl: process.env.A13N_SERVICE_URL,
    auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
  });
  try {
    console.log(
      JSON.stringify(
        await acceptFollowup(client, {
          agentId: process.env.A13N_AGENT,
          usageRecord: process.env.A13N_MODEL_RECORD,
          failurePrompt: process.env.A13N_FAILURE_PROMPT,
          expectUnknownCapacity:
            process.env.A13N_EXPECT_UNKNOWN_CAPACITY === "1",
        }),
        null,
        2,
      ),
    );
  } finally {
    client.close();
  }
}
