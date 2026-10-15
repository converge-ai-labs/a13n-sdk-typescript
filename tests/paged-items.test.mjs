import assert from "node:assert/strict";
import test from "node:test";
import { ApiError, createClient } from "../dist/index.js";

const run = {
  id: "run_paged",
  thread_id: "thread_one",
  status: "running",
};
const item = (ordinal) => ({
  id: `item_${ordinal}`,
  ordinal,
  kind: "text_message",
  state: "in_progress",
  content: { text: `Part ${ordinal}` },
  first_stream_id: `2-${ordinal}`,
  last_stream_id: `2-${ordinal}`,
  started_at: "2026-10-06T00:00:00Z",
});
function fixture(fetch) {
  return createClient({
    baseUrl: "https://service.example.test",
    auth: { type: "bearer", token: "key" },
    fetch,
  });
}

test("native Items forwards ordinal queries and preserves whole mutable tail without stream coverage", async () => {
  const calls = [];
  // The Service owns window selection. This recent read has three mutable Items even with limit=1.
  const baseline = {
    run,
    items: [item(17), item(18), item(19)],
    complete: false,
  };
  const history = {
    run: { ...run, status: "completed" },
    items: [{ ...item(16), state: "completed" }],
    complete: true,
  };
  const client = fixture(async (request) => {
    const url = new URL(request.url);
    calls.push({
      method: request.method,
      path: url.pathname,
      query: [...url.searchParams],
    });
    return Response.json(
      url.searchParams.has("before") || url.searchParams.has("after")
        ? history
        : baseline,
      { headers: { "X-Request-Id": "paged-read" } },
    );
  });
  try {
    const signal = new AbortController().signal;
    const live = await client.runs
      .ref(run.id)
      .items({ query: { limit: 1 }, signal });
    assert.deepEqual(live.data, baseline);
    assert.equal(live.response.headers.get("X-Request-Id"), "paged-read");
    assert.equal(live.data.items.length, 3);
    assert.deepEqual(Object.keys(live.data).sort(), [
      "complete",
      "items",
      "run",
    ]);
    const older = await client.runs
      .ref(run.id)
      .items({ query: { before: 17, limit: 1 } });
    assert.deepEqual(older.data, history);
    assert.equal(older.data.complete, true); // Sealed, but ordinal 16 is not all history.
    assert.deepEqual(Object.keys(older.data).sort(), [
      "complete",
      "items",
      "run",
    ]);
    const newer = await client.api.runs
      .ref(run.id)
      .items.get({ query: { after: 0, limit: 500 } });
    assert.deepEqual(newer.data, history);
    assert.deepEqual(calls, [
      {
        method: "GET",
        path: "/api/v1/runs/run_paged/items",
        query: [["limit", "1"]],
      },
      {
        method: "GET",
        path: "/api/v1/runs/run_paged/items",
        query: [
          ["before", "17"],
          ["limit", "1"],
        ],
      },
      {
        method: "GET",
        path: "/api/v1/runs/run_paged/items",
        query: [
          ["after", "0"],
          ["limit", "500"],
        ],
      },
    ]);
  } finally {
    client.close();
  }
});

test("invalid native bounds and mutually exclusive windows reach Service and preserve API errors", async () => {
  const cases = [
    { before: 0 },
    { after: -1 },
    { limit: 0 },
    { limit: 501 },
    { before: 3, after: 0 },
  ];
  const calls = [];
  const client = fixture(async (request) => {
    const url = new URL(request.url);
    calls.push(Object.fromEntries(url.searchParams));
    return Response.json(
      {
        error: {
          code: "invalid_argument",
          message: "Invalid ordinal window",
          details: {
            field: url.searchParams.has("before") ? "before" : "window",
          },
        },
      },
      { status: 400, headers: { "X-Request-Id": "invalid-window" } },
    );
  });
  try {
    for (const query of cases) {
      await assert.rejects(
        client.runs.ref(run.id).items({ query }),
        (error) =>
          error instanceof ApiError &&
          error.status === 400 &&
          error.code === "invalid_argument" &&
          error.requestId === "invalid-window",
      );
    }
    assert.deepEqual(
      calls,
      cases.map((query) =>
        Object.fromEntries(
          Object.entries(query).map(([key, value]) => [key, String(value)]),
        ),
      ),
    );
  } finally {
    client.close();
  }
});
