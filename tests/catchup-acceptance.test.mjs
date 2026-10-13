import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import test from "node:test";

// Exercises the real-Service caller locally; it is not live-Service evidence.
test("catch-up acceptance caller selects large user content and exact Entry authors through public APIs", async () => {
  const source = await readFile(
    new URL("../scripts/accept-catchup.mjs", import.meta.url),
    "utf8",
  );
  const installedEntry = new URL("../dist/index.js", import.meta.url).href;
  const prelude = `
const expected = "Saved display Unicode evidence: " + "語".repeat(16000);
process.env.A13N_SERVICE_URL = "https://service.example.test";
process.env.A13N_API_TOKEN = "test";
process.env.A13N_AGENT = "agent";
process.env.A13N_CONTENT_PROMPT = expected;
process.env.A13N_EXPECTED_CONTENT = expected;
let submitted;
let creates = 0;
const run = { id: "run", thread_id: "thread", status: "completed", output: "Short reply", pending: null, failure: null, options: { overrides: { lazy_environment: false, skill_sync: { mode: "isolated", cache_count: 0 } } } };
const thread = () => ({ id: "thread", session_id: "session", message_history: submitted.message_history });
const receipt = () => ({ thread: thread(), entry: { id: "entry", thread_id: "thread", status: "consumed", assigned_run_id: "run" }, run });
globalThis.fetch = async (request) => {
  assert.equal(request.headers.get("Authorization"), "Bearer test");
  const target = new URL(request.url);
  const path = target.pathname;
  if (path === "/api/v1/agents/agent") return Response.json({ id: "agent" });
  if (path === "/api/v1/threads") {
    const body = await request.json();
    assert.equal(body.payload.content[0].text, expected);
    if (submitted) {
      assert.deepEqual(body, submitted);
      assert.equal(JSON.stringify(body.message_history), JSON.stringify(submitted.message_history));
    }
    submitted = body;
    return Response.json(receipt(), { status: ++creates === 1 ? 201 : 200 });
  }
  if (path === "/api/v1/threads/thread/inbox/entry") return Response.json(receipt().entry);
  if (path === "/api/v1/runs/run") return Response.json(run);
  if (path === "/api/v1/threads/thread") return Response.json(thread());
  if (path === "/api/v1/sessions/session/message-authors") {
    assert.deepEqual(target.searchParams.getAll("entry_id"), ["entry"]);
    return Response.json({ items: [{ entry_id: "entry", principal_id: "principal", principal: null, submitted_at: "2026-10-13T00:00:00Z" }] });
  }
  if (path === "/api/v1/runs/run/items") return Response.json({ run, items: [{ kind: "text_message", content: { role: "assistant", text: "Short reply" } }, { kind: "text_message", content: { role: "user", text: "preview" }, content_refs: { text: { id: "content", media_type: "text/plain", size_bytes: Buffer.byteLength(expected), preview: "preview", truncated: false } } }], baseline: true, continuation: null, position: "1-1", resume_after: null, complete: true });
  if (path === "/api/v1/runs/run/contents/content") return Response.json({ id: "content", media_type: "text/plain", value: expected, truncated: false });
  throw new Error("Unexpected caller request: " + path);
};
`;
  const result = spawnSync(process.execPath, ["--input-type=module"], {
    input:
      prelude +
      source.replace(
        'from "../dist/index.js"',
        `from ${JSON.stringify(installedEntry)}`,
      ),
    encoding: "utf8",
    timeout: 10_000,
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Catch-up Service acceptance passed/);
  assert.match(result.stdout, /contentBytes=48032/);
});
