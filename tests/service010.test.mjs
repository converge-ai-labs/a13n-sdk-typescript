import assert from "node:assert/strict";
import test from "node:test";
import { createClient, sessionStream } from "../dist/index.js";
import { sessionThread, sessionRun } from "./session-fixtures.mjs";

test("organization app policy list and replace use scoped paths and CAS", async () => {
  const requests = [];
  const client = createClient({
    baseUrl: "https://service.example.test",
    auth: { type: "bearer", token: "test" },
    fetch: async (request) => {
      requests.push({
        method: request.method,
        path: new URL(request.url).pathname,
        ifMatch: request.headers.get("If-Match"),
        workspace: request.headers.get("X-Workspace-ID"),
        body: request.method === "PUT" ? await request.json() : undefined,
      });
      return Response.json({});
    },
  });
  try {
    const apps = client.api.organizations.ref("org_example").appPlugins;
    await apps.list();
    await apps
      .ref("example.app")
      .replace({ enabled: false }, { ifMatch: '"app:1"' });
    assert.deepEqual(requests, [
      {
        method: "GET",
        path: "/api/v1/organizations/org_example/app-plugins",
        ifMatch: null,
        workspace: null,
        body: undefined,
      },
      {
        method: "PUT",
        path: "/api/v1/organizations/org_example/app-plugins/example.app",
        ifMatch: '"app:1"',
        workspace: null,
        body: { enabled: false },
      },
    ]);
  } finally {
    client.close();
  }
});

test("Session preserves the optional finding analysis identifier", async () => {
  for (const finding_analysis_id of ["fan_01234567890123456789", null]) {
    const frame = {
      thread: sessionThread,
      current_run: { ...sessionRun, finding_analysis_id },
      last_run: null,
      entries: [],
    };
    const client = createClient({
      baseUrl: "https://service.example.test",
      auth: { type: "bearer", token: "test" },
      fetch: async () =>
        new Response(`event: thread\ndata: ${JSON.stringify(frame)}\n\n`, {
          headers: { "Content-Type": "text/event-stream" },
        }),
    });
    try {
      const raw = await client.api.sessions.ref("session").stream.get();
      const events = await Array.fromAsync(sessionStream(raw));
      assert.equal(
        events[0].data.current_run.finding_analysis_id,
        finding_analysis_id,
      );
    } finally {
      client.close();
    }
  }
});
