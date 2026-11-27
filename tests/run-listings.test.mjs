import assert from "node:assert/strict";
import test from "node:test";
import { createClient } from "../dist/index.js";

test("thread run history preserves metadata and only anchors the first lazy page", async () => {
  const requests = [];
  const preview = { text: "😀".repeat(200), truncated: true };
  const client = createClient({
    baseUrl: "https://service.test",
    auth: { type: "bearer", token: "test" },
    fetch: async (request) => {
      const query = new URL(request.url).searchParams;
      requests.push(query);
      assert.equal(query.get("limit"), "2");
      assert.equal(query.has("view"), false);
      assert.equal(
        query.get("anchor"),
        requests.length === 1 ? "run_one" : null,
      );
      assert.equal(query.get("cursor"), requests.length === 1 ? null : "older");
      return Response.json({
        items: [
          {
            id: "run_one",
            input_preview: preview,
            number: 501,
            cost: null,
            model_calls: 0,
            unpriced_requests: 0,
          },
        ],
        total: 10000,
        previous_cursor: "newer",
        next_cursor: requests.length === 1 ? "older" : null,
      });
    },
  });
  try {
    const pages = client.api.threads
      .ref("thread")
      .runs.pages({ query: { anchor: "run_one", limit: 2 } });
    assert.equal(requests.length, 0);
    const first = (await pages.next()).value.data;
    assert.equal(first.total, 10000);
    assert.equal(first.items[0].number, 501);
    assert.equal(first.items[0].cost, null);
    assert.equal(first.items[0].model_calls, 0);
    assert.equal(first.items[0].unpriced_requests, 0);
    assert.equal(first.previous_cursor, "newer");
    assert.deepEqual(first.items[0].input_preview, preview);
    assert.equal(requests.length, 1);
    await pages.next();
    assert.equal(requests.length, 2);
    await pages.return();
  } finally {
    client.close();
  }
});

test("metric ranking retains sort and direction across lazy pages", async () => {
  const requests = [];
  const client = createClient({
    baseUrl: "https://service.test",
    auth: { type: "bearer", token: "test" },
    fetch: async (request) => {
      const query = new URL(request.url).searchParams;
      requests.push(query);
      assert.equal(query.get("sort"), "cost");
      assert.equal(query.get("direction"), "asc");
      assert.equal(query.has("anchor"), false);
      assert.equal(query.get("cursor"), requests.length % 2 ? null : "ranked");
      return Response.json({
        items: [],
        total: 0,
        previous_cursor: null,
        next_cursor: requests.length % 2 ? "ranked" : null,
      });
    },
  });
  try {
    const pages = client.api.threads
      .ref("thread")
      .runs.pages({ query: { sort: "cost", direction: "asc" } });
    assert.equal(requests.length, 0);
    assert.equal((await Array.fromAsync(pages)).length, 2);
    const sessions = client.api.sessions.pages({
      query: { sort: "cost", direction: "asc" },
    });
    assert.equal(requests.length, 2);
    assert.equal((await Array.fromAsync(sessions)).length, 2);
  } finally {
    client.close();
  }
});

test("App filters preserve strings and omit null across all six list routes", async () => {
  const requests = [];
  const client = createClient({
    baseUrl: "https://service.test",
    auth: { type: "bearer", token: "test" },
    fetch: async (request) => {
      requests.push(new URL(request.url));
      return Response.json({ items: [], next_cursor: null });
    },
  });
  try {
    for (const name of [
      "browsers",
      "egressCredentials",
      "environments",
      "memorySpaces",
      "schedules",
      "sessions",
    ]) {
      const resource = client.api[name];
      for (const app_id of ["demo.app", null, undefined, ""]) {
        await resource.list({ query: { app_id } });
        const query = requests.at(-1).searchParams;
        assert.equal(query.has("app_id"), app_id != null);
        if (app_id != null) assert.equal(query.get("app_id"), app_id);
      }
    }
  } finally {
    client.close();
  }
});

test("App filters stay omitted or unchanged across browser pages", async () => {
  const requests = [];
  const client = createClient({
    baseUrl: "https://service.test",
    auth: { type: "bearer", token: "test" },
    fetch: async (request) => {
      requests.push(new URL(request.url));
      return Response.json({
        items: [],
        next_cursor: requests.length % 2 ? "next" : null,
      });
    },
  });
  try {
    for (const app_id of [null, "demo.app"]) {
      await Array.fromAsync(client.api.browsers.pages({ query: { app_id } }));
      for (const url of requests.slice(-2)) {
        assert.equal(url.searchParams.get("app_id"), app_id);
      }
      assert.equal(requests.at(-1).searchParams.get("cursor"), "next");
    }
  } finally {
    client.close();
  }
});

test("logout preserves 200 JSON and 204 empty responses without navigation", async () => {
  for (const status of [200, 204]) {
    const requests = [];
    const client = createClient({
      baseUrl: "https://service.test",
      auth: { type: "bearer", token: "test" },
      fetch: async (request) => {
        requests.push(request);
        return status === 200
          ? Response.json(
              { logout_url: "https://identity.example/logout" },
              { headers: { "X-Request-ID": "logout" } },
            )
          : new Response(null, {
              status: 204,
              headers: { "X-Request-ID": "logout" },
            });
      },
    });
    try {
      const result = await client.api.auth.logout();
      assert.equal(result.response.status, status);
      assert.equal(result.response.headers.get("X-Request-ID"), "logout");
      assert.deepEqual(
        result.data,
        status === 200
          ? { logout_url: "https://identity.example/logout" }
          : undefined,
      );
      assert.equal(requests.length, 1);
      assert.equal(new URL(requests[0].url).pathname, "/api/v1/auth/logout");
      assert.equal(requests[0].method, "POST");
    } finally {
      client.close();
    }
  }
});
