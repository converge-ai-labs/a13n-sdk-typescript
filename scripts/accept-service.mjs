import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { createClient, data } from "../dist/index.js";

/** Integration acceptance against a separately managed disposable Service (never starts or stops it). */
const required = [
  "A13N_SERVICE_URL",
  "A13N_API_TOKEN",
  "A13N_WORKSPACE",
  "A13N_AGENT",
  "A13N_CLIENT_TOOL_AGENT",
];
for (const name of required)
  if (!process.env[name]) throw new Error(`${name} is required`);
const workspaceId = process.env.A13N_WORKSPACE;
const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
const key = `typescript-accept-${randomUUID()}`;
const payload = {
  agent_id: process.env.A13N_AGENT,
  payload: {
    content: [
      { type: "text", text: "Reply briefly to this SDK acceptance probe." },
    ],
  },
};
const submit = () =>
  client.http.POST("/api/v1/workspaces/{workspace_id}/threads", {
    params: {
      path: { workspace_id: workspaceId },
      header: { "Idempotency-Key": key },
    },
    body: payload,
  });
const wait = async (check, timeout = 30_000) => {
  const deadline = Date.now() + timeout;
  do {
    const value = await check();
    if (value) return value;
    await new Promise((resolve) => setTimeout(resolve, 200));
  } while (Date.now() < deadline);
  throw new Error("Timed out waiting for a sealed run");
};
try {
  const first = await submit();
  assert.equal(first.response.status, 201);
  const created = data(first);
  assert.ok(created.thread?.id && created.entry?.id && created.run?.id);
  const replay = await submit();
  assert.equal(replay.response.status, 200);
  assert.equal(data(replay).entry.id, created.entry.id);
  assert.equal(data(replay).thread.id, created.thread.id);
  const scope = client.workspaceHttp(workspaceId);
  const threadId = created.thread.id;
  const runId = created.run.id;
  const thread = data(
    await scope.GET("/threads/{thread_id}", {
      params: { path: { thread_id: threadId } },
    }),
  );
  assert.equal(thread.id, threadId);

  const deadline = AbortSignal.timeout(20_000);
  const output = [];
  try {
    for await (const { cursor, frame } of client.streamThread(
      workspaceId,
      threadId,
      { signal: deadline },
    )) {
      output.push(frame.type);
      assert.equal(
        cursor === null,
        ["changed", "reset", "gap"].includes(frame.type),
      );
      if (frame.type === "boundary") break;
    }
  } catch (error) {
    if (deadline.aborted)
      throw new Error(`Thread SSE timed out after: ${output.join(", ")}`, {
        cause: error,
      });
    throw error;
  }
  assert.ok(
    output.includes("boundary"),
    `No checkpoint boundary: ${output.join(", ")}`,
  );
  const run = await wait(async () => {
    const current = data(
      await scope.GET("/runs/{run_id}", {
        params: { path: { run_id: runId } },
      }),
    );
    return ["completed", "failed", "cancelled", "waiting"].includes(
      current.status,
    )
      ? current
      : null;
  });
  assert.equal(run.status, "completed", `Run sealed as ${run.status}`);
  const items = data(
    await scope.GET("/runs/{run_id}/items", {
      params: { path: { run_id: runId } },
    }),
  );
  assert.ok(Array.isArray(items.items));

  const clientTool = data(
    await client.http.POST("/api/v1/workspaces/{workspace_id}/threads", {
      params: {
        path: { workspace_id: workspaceId },
        header: { "Idempotency-Key": `typescript-client-${randomUUID()}` },
      },
      body: {
        agent_id: process.env.A13N_CLIENT_TOOL_AGENT,
        payload: {
          content: [
            {
              type: "text",
              text: "[client] Run local_review on this request.",
            },
          ],
        },
      },
    }),
  );
  assert.ok(clientTool.run?.id && clientTool.thread?.id);
  const pending = await wait(async () => {
    const current = data(
      await scope.GET("/runs/{run_id}", {
        params: { path: { run_id: clientTool.run.id } },
      }),
    );
    return ["waiting", "completed", "failed", "cancelled"].includes(
      current.status,
    )
      ? current
      : null;
  });
  assert.equal(pending.status, "waiting");
  assert.equal(pending.wait_reason, "client_tool");
  const request = pending.pending?.items.find(
    (item) => item.kind === "client_tool",
  );
  assert.ok(request?.tool_call_id, "Expected a client-tool pending action");
  const queuedKey = `typescript-queue-${randomUUID()}`;
  const queuedRequest = () =>
    scope.POST("/threads/{thread_id}/inbox", {
      params: {
        path: { thread_id: clientTool.thread.id },
        header: { "Idempotency-Key": queuedKey },
      },
      body: {
        agent_id: process.env.A13N_CLIENT_TOOL_AGENT,
        delivery: "next_run",
        payload: {
          content: [{ type: "text", text: "Summarize that review." }],
        },
      },
    });
  const queuedFirst = await queuedRequest();
  assert.equal(queuedFirst.response.status, 201);
  assert.equal(data(queuedFirst).run, null);
  assert.equal(data(queuedFirst).entry.status, "pending");
  const queuedReplay = await queuedRequest();
  assert.equal(queuedReplay.response.status, 200);
  assert.equal(data(queuedReplay).entry.id, data(queuedFirst).entry.id);

  const resumeKey = `typescript-resume-${randomUUID()}`;
  const resumeRequest = () =>
    scope.POST("/runs/{run_id}/resume", {
      params: {
        path: { run_id: pending.id },
        header: { "Idempotency-Key": resumeKey },
      },
      body: {
        answers: [
          {
            tool_call_id: request.tool_call_id,
            action: "complete",
            result: { reviewed: true },
          },
        ],
      },
    });
  const resumedFirst = await resumeRequest();
  assert.equal(resumedFirst.response.status, 201);
  const resumedReplay = await resumeRequest();
  assert.equal(resumedReplay.response.status, 200);
  assert.equal(data(resumedFirst).id, data(resumedReplay).id);
  const completed = await wait(async () => {
    const current = data(
      await scope.GET("/runs/{run_id}", {
        params: { path: { run_id: data(resumedFirst).id } },
      }),
    );
    return ["completed", "failed", "cancelled", "waiting"].includes(
      current.status,
    )
      ? current
      : null;
  });
  assert.equal(completed.status, "completed");
  console.log(
    `Service acceptance passed: thread=${threadId} run=${runId} frames=${output.join(",")} queued=${data(queuedFirst).entry.id} resumed=${completed.id}`,
  );
} finally {
  client.close();
}
