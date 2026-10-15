import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { createClient } from "../dist/index.js";

/** Creates a Run only on an authorized disposable matching Service; never manages the fixture. */
for (const name of [
  "A13N_SERVICE_URL",
  "A13N_API_TOKEN",
  "A13N_AGENT",
  "A13N_CONTENT_PROMPT",
  "A13N_EXPECTED_CONTENT",
]) {
  if (!process.env[name]) throw new Error(`${name} is required`);
}
const history = [
  {
    kind: "response",
    parts: [
      {
        part_kind: "tool-call",
        tool_name: "historical_lookup",
        tool_call_id: "historical_call",
        args: {
          zebra: { second: false, first: null },
          alpha: { later: 0, earlier: "" },
        },
      },
    ],
  },
  {
    kind: "request",
    parts: [
      {
        part_kind: "tool-return",
        tool_name: "historical_lookup",
        tool_call_id: "historical_call",
        content: { zebra: { second: null, first: false }, alpha: [0, ""] },
      },
    ],
  },
];
const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
const overrides = {
  lazy_environment: false,
  skill_sync: { mode: "isolated", cache_count: 0 },
};
const idempotencyKey = `typescript-catchup-${randomUUID()}`;
let interaction;
try {
  const agent = client.agents.ref(process.env.A13N_AGENT);
  const nativeAgent = await client.api.agents.ref(agent.id).get();
  assert.equal(nativeAgent.data.id, agent.id);
  interaction = await agent.start(process.env.A13N_CONTENT_PROMPT, {
    idempotencyKey,
    messageHistory: history,
    options: { overrides },
  });
  assert.equal(interaction.receipt.response.status, 201);
  const replay = await client.api.threads.create(
    {
      agent_id: agent.id,
      message_history: history,
      payload: {
        content: [{ type: "text", text: process.env.A13N_CONTENT_PROMPT }],
      },
      options: { overrides },
    },
    { idempotencyKey },
  );
  assert.equal(replay.response.status, 200);
  assert.equal(replay.data.thread.id, interaction.thread.id);
  assert.equal(replay.data.entry.id, interaction.entry.id);
  const outcome = await interaction.result();
  assert.equal(outcome.status, "completed");
  assert.equal(outcome.snapshot.data.options.overrides.lazy_environment, false);
  assert.deepEqual(
    outcome.snapshot.data.options.overrides.skill_sync,
    overrides.skill_sync,
  );
  const thread = (await interaction.thread.get()).data;
  assert.equal("message_history" in thread, false);
  const authors = await client.api.sessions
    .ref(thread.session_id)
    .messageAuthors.list({
      query: { entry_id: [interaction.entry.id] },
    });
  assert.equal(authors.data.items.length, 1);
  assert.equal(authors.data.items[0].entry_id, interaction.entry.id);
  assert.equal(typeof authors.data.items[0].principal_id, "string");
  const display = (await outcome.run.items()).data;
  const userItem = display.items.find(
    (item) =>
      item.kind === "text_message" &&
      item.content.role === "user" &&
      item.content_refs?.text,
  );
  assert.ok(userItem, "Large user text must have a committed text ContentRef");
  const reference = userItem.content_refs.text;
  assert.equal(reference.media_type, "text/plain");
  assert.equal(
    reference.size_bytes,
    Buffer.byteLength(process.env.A13N_EXPECTED_CONTENT, "utf8"),
  );
  assert.ok(Buffer.byteLength(reference.preview, "utf8") <= 4096);
  const saved = await client.api.runs
    .ref(outcome.runId)
    .contents.ref(reference.id)
    .get();
  assert.equal(saved.data.id, reference.id);
  assert.equal(saved.data.media_type, "text/plain");
  assert.equal(saved.data.truncated, false);
  assert.equal(saved.data.value, process.env.A13N_EXPECTED_CONTENT);
  console.log(
    `Catch-up Service acceptance passed: thread=${thread.id} entry=${interaction.entry.id} run=${outcome.runId} contentBytes=${reference.size_bytes}; native/authored scope, explicit replay, history order, saved content, authors and accepted overrides.`,
  );
} finally {
  await interaction?.close();
  client.close();
}
