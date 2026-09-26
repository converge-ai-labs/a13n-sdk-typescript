import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { ApiError, createClient } from "../dist/index.js";

const baseUrl = "https://service.example.test";
const memoryBase = "/api/v1/workspaces/ws_one/memories/mem_one";
const match = { ifMatch: '"file:2"' };

function mockClient(fetch) {
  return createClient({
    baseUrl,
    auth: { type: "bearer", token: "test" },
    fetch,
  });
}

test("all added Memory, provider and bootstrap operations are reachable through supported SDK surfaces", async () => {
  const document = JSON.parse(
    readFileSync(new URL("../contract/openapi.json", import.meta.url)),
  );
  const seen = new Set();
  const client = mockClient(async (request) => {
    const actual = decodeURIComponent(new URL(request.url).pathname);
    const candidates = Object.entries(document.paths).filter(
      ([path, methods]) => {
        const pattern = path.replace(/\{[^}]+\}/g, "[^/]+");
        return (
          new RegExp(`^${pattern}$`).test(actual) &&
          methods[request.method.toLowerCase()]
        );
      },
    );
    assert.equal(candidates.length, 1, `${request.method} ${actual}`);
    const [path, operations] = candidates[0];
    seen.add(`${request.method} ${path}`);
    const status = Number(
      Object.keys(operations[request.method.toLowerCase()].responses).find(
        (s) => s.startsWith("2"),
      ),
    );
    return status === 204
      ? new Response(null, { status })
      : Response.json({ items: [], next_cursor: null }, { status });
  });
  try {
    const memories = client.resources.workspaces.ref("ws_one").memories;
    await memories.list();
    await memories.create({ key: "notes", name: "Notes" });
    const memory = memories.ref("mem_one");
    await memory.get();
    await memory.update({ guide: null }, match);
    await memory.delete(match);
    await memory.files.list();
    await memory.files.create({ path: "notes.md", content: "hello" });
    const file = memory.files.ref("notes.md");
    await file.get();
    await file.replace({ content: "updated" }, match);
    await file.delete(match);
    await memory.files.move(
      { source: "notes.md", destination: "moved.md" },
      match,
    );
    await memory.revisions.list();
    await memory.revisions.ref(1).get();
    await memory.revisions.ref(1).restore();
    await memory.revisions.delete({ query: { path: "notes.md" } });
    await memory.records.list();
    await memory.records.create({ text: "remember this" });
    await memory.records.search({ query: "this" });
    await memory.records.ref("rec_one").replace({ text: "updated" });
    await memory.records.ref("rec_one").delete();
    const mounts = client.resources.workspaces
      .ref("ws_one")
      .threads.ref("thr_one").memories;
    await mounts.list();
    await mounts.create(
      { name: "notes", memory_id: "mem_one", access: "write" },
      match,
    );
    await mounts.ref("notes").update({ access: "read", recall: false }, match);
    await mounts.ref("notes").delete(match);
    const providers =
      client.resources.organizations.ref("org_one").memoryProviders;
    await providers.list();
    await providers.create({
      key: "mem0",
      name: "Memory",
      type: "mem0_oss",
      config: {},
    });
    await providers.ref("prv_one").get();
    await providers.ref("prv_one").update({ enabled: false }, match);
    await providers.ref("prv_one").test();
    await client.http.POST("/api/v1/auth/bootstrap", {
      body: { email: "owner@example.test", password: "test-only" },
    });
    const expected = Object.entries(document.paths).flatMap(
      ([path, methods]) =>
        path.includes("/memories") ||
        path.includes("/memory-providers") ||
        path === "/api/v1/auth/bootstrap"
          ? Object.keys(methods).map(
              (method) => `${method.toUpperCase()} ${path}`,
            )
          : [],
    );
    assert.equal(expected.length, 30);
    assert.deepEqual([...seen].sort(), expected.sort());
  } finally {
    client.close();
  }
});

test("files preserve nested Unicode paths, ETags, history bodies and nullable restore results", async () => {
  const calls = [];
  const path = "projects/计划 #1%.md";
  const client = mockClient(async (request) => {
    calls.push({
      url: new URL(request.url),
      method: request.method,
      match: request.headers.get("If-Match"),
      body: await request.text(),
    });
    return request.method === "DELETE"
      ? new Response(null, { status: 204 })
      : Response.json(
          request.url.endsWith("/restore")
            ? { path, file: null }
            : { path, content: "text", version: 2 },
          { headers: { ETag: '"file:3"' } },
        );
  });
  try {
    const memory = client.resources.workspaces
      .ref("ws_one")
      .memories.ref("mem_one");
    const result = await memory.files.ref(path).get();
    assert.equal(result.data.content, "text");
    assert.equal(result.response.headers.get("ETag"), '"file:3"');
    await memory.files.ref(path).replace({ content: "new text" }, match);
    await memory.files.move(
      { source: path, destination: "other/note.md" },
      match,
    );
    await memory.files.ref(path).delete(match);
    assert.equal(
      (await memory.revisions.ref(5).restore(match)).data.file,
      null,
    );
    await memory.revisions.ref(6).restore();
    assert.equal(
      calls[0].url.pathname,
      `${memoryBase}/files/${encodeURIComponent(path)}`,
    );
    assert.deepEqual(
      calls.map((c) => c.match),
      [null, match.ifMatch, match.ifMatch, match.ifMatch, match.ifMatch, null],
    );
    assert.deepEqual(JSON.parse(calls[1].body), { content: "new text" });
    assert.deepEqual(JSON.parse(calls[2].body), {
      source: path,
      destination: "other/note.md",
    });
    assert.equal(calls[4].body, "");
    assert.equal(calls[5].body, "");
  } finally {
    client.close();
  }
});

test("record search stays in the body; record and mount handles do not invent GET or PATCH", async () => {
  const calls = [];
  const client = mockClient(async (request) => {
    calls.push([
      new URL(request.url),
      request.method,
      request.headers.get("If-Match"),
      await request.text(),
    ]);
    return request.method === "DELETE"
      ? new Response(null, { status: 204, headers: { ETag: '"thr:4"' } })
      : Response.json({
          items: [
            { id: "r1", text: "secret phrase", score: null, updated_at: null },
          ],
          next_cursor: null,
        });
  });
  try {
    const workspace = client.resources.workspaces.ref("ws_one");
    const records = workspace.memories.ref("mem_one").records;
    const found = await records.search({ query: "private query", limit: 3 });
    assert.equal(found.data.items[0].score, null);
    await records.ref("record #1").replace({ text: "new" });
    await records.ref("record #1").delete();
    const mount = workspace.threads.ref("thr_one").memories.ref("notes");
    assert.equal(
      (await mount.delete({ ifMatch: '"thr:3"' })).response.headers.get("ETag"),
      '"thr:4"',
    );
    assert.equal(records.ref("r1").get, undefined);
    assert.equal(records.ref("r1").update, undefined);
    assert.equal(mount.get, undefined);
    assert.equal(calls[0][0].search, "");
    assert.deepEqual(JSON.parse(calls[0][3]), {
      query: "private query",
      limit: 3,
    });
    assert.deepEqual(
      calls.map((c) => c[1]),
      ["POST", "PUT", "DELETE", "DELETE"],
    );
    assert.deepEqual(
      calls.map((c) => c[2]),
      [null, null, null, '"thr:3"'],
    );
  } finally {
    client.close();
  }
});

test("memory collection pages snapshot repeated labels and preserve opaque record cursors", async () => {
  const urls = [];
  const client = mockClient(async (request) => {
    const url = new URL(request.url);
    urls.push(url);
    return Response.json({
      items: [],
      next_cursor: url.searchParams.has("cursor") ? null : "opaque +/=",
    });
  });
  try {
    const memories = client.resources.workspaces.ref("ws_one").memories;
    const filters = { label: ["team:a", "scope:b"], kind: "file" };
    const pages = memories.pages({ query: filters });
    filters.label.push("later");
    assert.equal(urls.length, 0);
    for await (const page of pages) assert.deepEqual(page.data.items, []);
    assert.equal(urls.length, 2);
    assert.deepEqual(urls[0].searchParams.getAll("label"), [
      "team:a",
      "scope:b",
    ]);
    assert.equal(urls[1].searchParams.get("cursor"), "opaque +/=");
    const recordPages = [];
    for await (const page of memories.ref("mem_one").records.pages())
      recordPages.push(page);
    assert.equal(recordPages.length, 2);
    assert.equal(urls[3].searchParams.get("cursor"), "opaque +/=");
  } finally {
    client.close();
  }
});

test("memory stale and unconfirmed writes preserve Service errors without replay", async () => {
  let count = 0;
  const client = mockClient(async () => {
    count++;
    return Response.json(
      {
        error: {
          code: "conflict",
          message: "unknown result",
          details: { reason: "write_unconfirmed" },
          request_id: "req_one",
        },
      },
      { status: 409 },
    );
  });
  try {
    await assert.rejects(
      client.resources.workspaces
        .ref("ws_one")
        .memories.ref("mem_one")
        .records.create({ text: "one attempt" }),
      (error) =>
        error instanceof ApiError &&
        error.details.reason === "write_unconfirmed",
    );
    assert.equal(count, 1);
  } finally {
    client.close();
  }
});
