import assert from "node:assert/strict";
import test from "node:test";
import { createClient } from "../dist/index.js";
import { acceptFollowup } from "../scripts/accept-followup.mjs";

for (const optional of [false, true])
  test(`followup caller preserves native selectors, revision shapes and optional fixture coverage (${optional})`, async () => {
    const seen = [];
    let saved;
    let revisionNumber = 0;
    const contribution = {
      run_id: "run",
      record_id: "record",
      input_tokens: 0,
      output_tokens: 3,
      context_window_tokens: null,
    };
    const client = createClient({
      baseUrl: "https://service.example.test",
      auth: { type: "bearer", token: "test-only" },
      fetch: async (request) => {
        const url = new URL(request.url);
        const path = url.pathname.slice("/api/v1".length);
        seen.push(`${request.method} ${path}`);
        const json = (value, status = 200) =>
          Response.json(value, { status, headers: { ETag: '"v1"' } });
        const error = (status) =>
          json(
            { error: { code: "fixture", message: "Rejected", details: {} } },
            status,
          );
        if (path === "/agents/original")
          return json({
            id: "original",
            default_revision_id: "original-revision",
          });
        if (path === "/agents/original/revisions/original-revision")
          return json({ config: { model: "model" } });
        if (path === "/agents" && request.method === "POST") {
          assert.equal((await request.json()).config.model, "model");
          return json({ id: "created" }, 201);
        }
        if (path === "/agents/created") return json({ id: "created" });
        if (path === "/agents/created/revisions") {
          assert.equal(request.headers.get("If-Match"), '"v1"');
          const body = await request.json();
          if (
            body.config.tool_search.config.mode === "native" &&
            "max_results" in body.config.tool_search.config
          )
            return error(400);
          saved = body.config;
          return json({ id: `revision-${++revisionNumber}` }, 201);
        }
        if (path.startsWith("/agents/created/revisions/revision-"))
          return json({ config: saved });
        if (path === "/usage/context") {
          const keys = [...url.searchParams.keys()];
          if (keys.length !== 1) return error(400);
          assert.ok(["run_id", "record_id", "thread_id"].includes(keys[0]));
          const selector = url.searchParams.get(keys[0]);
          if (selector.startsWith("missing-")) return error(404);
          if (["failure-run", "failure-thread"].includes(selector))
            return json(null);
          assert.ok(["run", "record", "thread"].includes(selector));
          return json(contribution);
        }
        if (path === "/runs/run")
          return json({ id: "run", thread_id: "thread" });
        if (
          [
            "/runs/run/desktop-control",
            "/runs/failure-run/desktop-control",
          ].includes(path)
        ) {
          assert.equal(request.method, "GET");
          return json(null);
        }
        if (path === "/threads") {
          const body = await request.json();
          assert.equal(body.agent_id, "original");
          assert.deepEqual(body.payload, {
            content: [{ type: "text", text: "fail-current-input" }],
          });
          return json(
            {
              thread: { id: "failure-thread" },
              entry: { id: "entry", thread_id: "failure-thread" },
              run: null,
            },
            201,
          );
        }
        if (path === "/threads/failure-thread/inbox/entry")
          return json({
            id: "entry",
            thread_id: "failure-thread",
            status: "consumed",
            assigned_run_id: "failure-run",
          });
        if (path === "/runs/failure-run")
          return json({
            id: "failure-run",
            thread_id: "failure-thread",
            status: "failed",
            output: null,
            failure: { code: "fixture", message: "Fixture failure" },
          });
        throw new Error(`Unexpected request ${request.method} ${path}`);
      },
    });
    try {
      const report = await acceptFollowup(client, {
        agentId: "original",
        ...(optional
          ? {
              usageRecord: "record",
              failurePrompt: "fail-current-input",
              expectUnknownCapacity: true,
            }
          : {}),
      });
      assert.equal(report.agentId, "created");
      assert.match(report.toolSearch, /^passed:/);
      assert.match(report.desktopExecution, /^not_run:/);
      if (optional) {
        assert.equal(report.context.status, "passed");
        assert.deepEqual(report.context.contribution, contribution);
        assert.match(report.failedContext.status, /^passed:/);
      } else {
        assert.match(report.context, /^not_run:/);
        assert.match(report.failedContext, /^not_run:/);
      }
      assert.equal(
        seen.filter((key) => key === "POST /threads").length,
        optional ? 1 : 0,
      );
      assert.equal(
        seen.filter((key) => key === "POST /agents/created/revisions").length,
        3,
      );
      assert.equal(
        seen.some((key) => /POST .*desktop/.test(key)),
        false,
      );
    } finally {
      client.close();
    }
  });
