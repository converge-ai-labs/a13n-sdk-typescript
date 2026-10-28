import assert from "node:assert/strict";
import test from "node:test";
import { createClient } from "../dist/index.js";

test("Apps, catalogs, provider deletion and navigation preserve native wire boundaries", async () => {
  const requests = [];
  const native = { nested: [null, false, 0, "", { value: "中文" }] };
  const client = createClient({
    baseUrl: "https://service.example.test",
    auth: { type: "session", csrfToken: "csrf", workspaceId: "workspace" },
    fetch: async (request) => {
      const url = new URL(request.url);
      const body = await request.text();
      requests.push({ url, method: request.method, body });
      assert.equal(request.headers.get("X-Workspace-ID"), "workspace");
      assert.equal(
        request.headers.get("X-CSRF-Token"),
        request.method === "GET" ? null : "csrf",
      );
      if (request.method === "DELETE") {
        assert.equal(request.headers.get("If-Match"), '"version"');
        return new Response(null, { status: 204 });
      }
      if (url.pathname.endsWith("/content")) {
        assert.equal(request.headers.get("Accept"), "application/zip");
        assert.equal(url.searchParams.get("package_digest"), "a".repeat(64));
        return new Response(new Uint8Array([80, 75, 3, 4]), {
          headers: { "Content-Type": "application/zip" },
        });
      }
      if (url.pathname === "/api/v1/usage/runs") {
        assert.equal(url.searchParams.get("thread_id"), "thread");
        return Response.json({
          items: [],
          next_cursor: url.searchParams.has("cursor") ? null : "next/+",
        });
      }
      return Response.json(native);
    },
  });
  try {
    await client.api.builtinSkills.list();
    const skill = client.api.builtinSkills.ref("platform-operations");
    await skill.get();
    const zip = await skill.content.get({
      query: { package_digest: "a".repeat(64) },
    });
    try {
      assert.deepEqual(
        new Uint8Array(await new Response(zip.body).arrayBuffer()),
        new Uint8Array([80, 75, 3, 4]),
      );
    } finally {
      await zip.close();
    }
    assert.deepEqual((await client.api.plugins.list()).data, native);
    for (const resource of [
      "connectorProviders",
      "memoryProviders",
      "modelProviders",
      "webProviders",
    ]) {
      assert.equal(
        (
          await client.api[resource]
            .ref("provider")
            .delete({ ifMatch: '"version"' })
        ).response.status,
        204,
      );
    }
    const app = client.api.runs.ref("run").apps.ref("app/中文");
    assert.deepEqual((await app.open()).data, native);
    await app.resources.read({ uri: "ui://chart" });
    await app.tools.call({ name: "chart", arguments: native });
    await client.api.sessions.ref("session").threads.list({
      query: { origin: ["new", "child"], thread_id: ["one", "two"] },
    });
    await client.api.usage.members.list({
      query: {
        start: "2026-10-01",
        end: "2026-10-28",
        principal_id: "principal",
      },
    });
    assert.equal(
      (
        await Array.fromAsync(
          client.api.usage.runs.pages({ query: { thread_id: "thread" } }),
        )
      ).length,
      2,
    );
    assert.equal(requests.length, 15);
    const appRequests = requests.slice(8, 11);
    assert.ok(
      appRequests.every(
        (r) =>
          r.method === "POST" &&
          r.url.pathname.includes("app%2F%E4%B8%AD%E6%96%87"),
      ),
    );
    assert.equal(appRequests[0].body, "");
    assert.deepEqual(JSON.parse(appRequests[1].body), { uri: "ui://chart" });
    assert.deepEqual(JSON.parse(appRequests[2].body), {
      name: "chart",
      arguments: native,
    });
    assert.deepEqual(requests[11].url.searchParams.getAll("origin"), [
      "new",
      "child",
    ]);
    assert.deepEqual(requests[11].url.searchParams.getAll("thread_id"), [
      "one",
      "two",
    ]);
    assert.equal(
      requests[12].url.searchParams.get("principal_id"),
      "principal",
    );
    assert.equal(requests[14].url.searchParams.get("cursor"), "next/+");
  } finally {
    client.close();
  }
});
