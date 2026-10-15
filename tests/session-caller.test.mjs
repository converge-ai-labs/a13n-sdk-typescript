import { sessionThread, sessionRun } from "./session-fixtures.mjs";
import assert from "node:assert/strict";
import test from "node:test";
import { createClient } from "../dist/index.js";
import { acceptSession } from "../scripts/accept-session.mjs";

test("matching-Service Session caller consumes fresh snapshots and reads the sealed exact Run", async () => {
  const calls = [];
  const thread = {
    ...sessionThread,
    id: "thread",
    session_id: "session",
    current_run_id: "run",
  };
  const run = {
    ...sessionRun,
    id: "run",
    thread_id: "thread",
    status: "completed",
    output: "OK",
  };
  const client = createClient({
    baseUrl: "https://service.example",
    auth: { type: "bearer", token: "key" },
    fetch: async (request) => {
      const path = new URL(request.url).pathname;
      calls.push(path);
      if (path === "/api/v1/threads" && request.method === "POST") {
        assert.deepEqual((await request.json()).message_history, []);
        return Response.json(
          {
            thread,
            entry: {
              id: "entry",
              thread_id: "thread",
              status: "consumed",
              assigned_run_id: "run",
            },
            run,
          },
          { status: 201 },
        );
      }
      if (path === "/api/v1/sessions/session/stream") {
        assert.equal(request.headers.get("Last-Event-ID"), null);
        const frames = [
          ["thread", { thread, current_run: run, last_run: null, entries: [] }],
          [
            "items",
            {
              thread_id: "thread",
              run_id: "run",
              first: 1,
              items: [],
              continuation: null,
              complete: true,
            },
          ],
        ];
        return new Response(
          frames
            .map(
              ([name, data]) =>
                `event: ${name}\ndata: ${JSON.stringify(data)}\n\n`,
            )
            .join(""),
          {
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-store",
            },
          },
        );
      }
      if (path === "/api/v1/runs/run") return Response.json(run);
      if (path === "/api/v1/runs/run/items")
        return Response.json({ run, items: [], complete: true });
      if (path === "/api/v1/threads/thread") return Response.json(thread);
      if (path === "/api/v1/threads/thread/inbox/entry")
        return Response.json({
          id: "entry",
          thread_id: "thread",
          status: "consumed",
          assigned_run_id: "run",
        });
      throw new Error(`Unexpected ${request.method} ${path}`);
    },
  });
  try {
    const result = await acceptSession(client, "agent");
    assert.equal(result.session_acceptance, "passed");
    assert.deepEqual(result.observed, ["thread", "items", "thread"]);
    assert.equal(calls.filter((path) => path.endsWith("/stream")).length, 2);
    assert.equal(calls.filter((path) => path === "/api/v1/threads").length, 1);
  } finally {
    client.close();
  }
});
