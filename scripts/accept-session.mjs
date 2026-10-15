import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { pathToFileURL } from "node:url";
import { createClient, sessionStream } from "../dist/index.js";

/** Opt-in matching-Service acceptance; all mutation is explicit input submission. */
export async function acceptSession(
  client,
  agentId,
  prompt = "Session stream SDK acceptance.",
) {
  const interaction = await client.agents.ref(agentId).start(prompt, {
    idempotencyKey: `session-${randomUUID()}`,
    messageHistory: [],
  });
  const threadId = interaction.thread.id;
  const sessionId = interaction.receipt.data.thread.session_id;
  assert.equal(typeof sessionId, "string");
  const observed = [];
  for (let connection = 0; connection < 2; connection++) {
    const signal = AbortSignal.timeout(20_000);
    const response = await client.api.sessions
      .ref(sessionId)
      .stream.get({ signal });
    assert.match(
      response.response.headers.get("Content-Type"),
      /text\/event-stream/,
    );
    assert.equal(response.response.headers.get("Cache-Control"), "no-store");
    let first = true;
    let current = null;
    try {
      for await (const frame of sessionStream(response, { signal })) {
        observed.push(frame.type);
        if (first) {
          assert.equal(frame.type, "thread");
          assert.equal(frame.data.thread.id, threadId);
          assert.equal("message_history" in frame.data.thread, false);
          assert.ok(Array.isArray(frame.data.entries));
          current = frame.data.current_run?.id ?? null;
          first = false;
          // Every explicit reconnect begins with a fresh Thread snapshot.
          if (connection === 1 || current === null) break;
        } else if (frame.type === "items" && frame.data.run_id === current) {
          assert.equal(frame.data.thread_id, threadId);
          assert.ok(frame.data.first >= 1);
          assert.ok(Array.isArray(frame.data.items));
          assert.equal(typeof frame.data.complete, "boolean");
          assert.equal("resume_after" in frame.data, false);
          break;
        }
      }
      assert.equal(first, false, "Session ended before its initial snapshot");
    } finally {
      await response.close();
    }
    assert.equal(response.closed, true);
    assert.equal(response.body.locked, false);
  }
  const outcome = await interaction.result({
    timeoutMs: 60_000,
    pollIntervalMs: 100,
  });
  const display = (await outcome.run.items()).data;
  assert.deepEqual(Object.keys(display).sort(), ["complete", "items", "run"]);
  assert.equal(display.run.id, outcome.run.id);
  assert.equal(display.complete, true);
  assert.equal("display_position" in (await outcome.run.get()).data, false);
  assert.equal(
    "message_history" in (await interaction.thread.get()).data,
    false,
  );
  return {
    session_acceptance: "passed",
    sdk: "typescript",
    connections: 2,
    fresh_snapshot: true,
    observed,
    exact_run_status: outcome.status,
    local_close_only: true,
    items_without_stream_progress: true,
  };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
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
        await acceptSession(
          client,
          process.env.A13N_AGENT,
          process.env.A13N_SESSION_PROMPT,
        ),
      ),
    );
  } finally {
    client.close();
  }
}
