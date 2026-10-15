import assert from "node:assert/strict";
import test from "node:test";
import { createClient } from "../dist/index.js";
import { acceptRefresh } from "../scripts/accept-refresh.mjs";

for (const optional of [false, true]) {
  test(`refresh Service caller exercises exact identities and reports optional coverage (${optional})`, async () => {
    const calls = [];
    let instructions;
    let memory;
    const client = createClient({
      baseUrl: "https://service.example.test",
      auth: { type: "bearer", token: "caller-test" },
      fetch: async (request) => {
        const url = new URL(request.url);
        const path = url.pathname.slice("/api/v1".length);
        const key = `${request.method} ${path}`;
        calls.push(key);
        const json = (body, status = 200) =>
          Response.json(body, { status, headers: { ETag: '"v1"' } });
        if (path === "/memory-spaces") {
          const body = await request.json();
          assert.equal(body.organization.enabled, false);
          assert.equal(body.organization.model, optional ? "model" : null);
          return json({ ...body, id: "space", memory_id: "memory" }, 201);
        }
        if (path === "/memory-spaces/space") {
          if (request.method === "PATCH") {
            assert.equal(request.headers.get("If-Match"), '"v1"');
            assert.deepEqual(await request.json(), { guide: null });
          }
          return json({ id: "space", memory_id: "memory" });
        }
        if (path === "/sessions") {
          memory = (await request.json()).memory;
          return json({ id: "session", memory }, 201);
        }
        if (path === "/sessions/session") {
          if (request.method === "PATCH") {
            assert.equal(request.headers.get("If-Match"), '"v1"');
            memory = (await request.json()).memory;
          }
          return json({ id: "session", memory });
        }
        if (path === "/memory-spaces/space/sessions")
          return json({ items: [{ id: "session" }], next_cursor: null });
        if (path === "/threads") {
          const body = await request.json();
          instructions = body.options.overrides.instructions;
          assert.equal(body.session_id, "session");
          assert.equal("memories" in body, false);
          return json(
            {
              thread: { id: "thread" },
              entry: { id: "entry", thread_id: "thread" },
              run: null,
            },
            201,
          );
        }
        if (path === "/threads/thread/inbox/entry")
          return json({
            id: "entry",
            status: "consumed",
            assigned_run_id: "run",
            thread_id: "thread",
          });
        if (path === "/runs/run")
          return json({
            id: "run",
            status: "completed",
            thread_id: "thread",
            output: "OK",
            agent_revision_id: "revision",
            memory_mounts: [
              {
                name: "team",
                memory_id: "memory",
                space_id: "space",
                roots: ["global/", "sessions/session/"],
                access: "read",
              },
            ],
          });
        if (path === "/runs/run/agent")
          return json({
            revision: { id: "revision" },
            config: { instructions, builtin_skills: [] },
          });
        if (path === "/runs/run/attempts")
          return json({ items: [{ id: "attempt" }] });
        if (path === "/runs/run/attempts/attempt")
          return json({ id: "attempt" });
        if (path === "/runs") {
          assert.equal(url.searchParams.get("thread_id"), "thread");
          assert.equal(url.searchParams.get("session_id"), "session");
          return json({ items: [{ id: "run" }], next_cursor: null });
        }
        if (path === "/usage") {
          assert.equal(url.searchParams.get("run_id"), "run");
          return json({
            models: [
              {
                average_time_to_first_chunk_seconds: null,
                output_tokens_per_second: 0,
              },
            ],
            runs: [],
          });
        }
        if (path === "/memory-spaces/space/organizations") {
          assert.equal(optional, true);
          assert.equal(await request.text(), "");
          return request.method === "POST"
            ? json({ pending: true, active_run_id: null }, 202)
            : json({ items: [], next_cursor: null });
        }
        if (path === "/memory-spaces/space/organization")
          return json({ pending: true, active_run_id: null });
        if (path === "/usage/records/record/metrics")
          return json({
            time_to_first_chunk_seconds: null,
            request_duration_seconds: 0,
            output_tokens_per_second: 0,
          });
        if (path === "/environments/environment/computer/check")
          return json({ status: "unsupported" });
        if (path === "/runs/image-run/images/image")
          return new Response(new Uint8Array([0, 255, 128]), {
            headers: { "Content-Type": "image/jpeg" },
          });
        throw new Error(`Unexpected caller request ${key}`);
      },
    });
    try {
      const report = await acceptRefresh(client, {
        agentId: "agent",
        ...(optional
          ? {
              organizerModel: "model",
              usageRecord: "record",
              computerEnvironment: "environment",
              imageRun: "image-run",
              imageId: "image",
            }
          : {}),
      });
      assert.equal(report.runId, "run");
      assert.equal(report.memory, "passed");
      if (optional) {
        assert.equal(report.organization.admission, "passed");
        assert.match(report.organization.completion, /^not_run:/);
        assert.equal(report.computer.status, "unsupported");
        assert.equal(report.image.bytes, 3);
        assert.equal(report.metrics, "passed");
      } else {
        for (const key of ["organization", "computer", "image", "metrics"])
          assert.match(report[key], /^not_run:/);
      }
      assert.equal(calls.filter((key) => key === "POST /threads").length, 1);
      assert.equal(
        calls.filter((key) => key === "POST /memory-spaces/space/organizations")
          .length,
        optional ? 1 : 0,
      );
    } finally {
      client.close();
    }
  });
}
