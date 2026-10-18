import assert from "node:assert/strict";
import test from "node:test";
import {
  createClient,
  ApiError,
  ProtocolError,
  sessionStream,
  returned,
} from "../dist/index.js";
import { sessionThread, sessionRun } from "./session-fixtures.mjs";
const options = (fetch) => ({
  baseUrl: "https://service.test",
  auth: { type: "session", workspaceId: "workspace", csrfToken: "test-only" },
  fetch,
  maxReadRetries: 0,
});
const view = {
  id: "assistance",
  run_id: "run_one",
  tool_call_id: null,
  cause: "user",
  environment_id: "environment",
  mount: "desktop",
  reason: "Inspect",
  state: "awaiting_user",
  epoch: 0,
  controller_id: null,
  deadline: "2026-10-18T00:00:00Z",
  lease_expires_at: null,
  failure: null,
  outcome: null,
};
const control = { session_id: "browser_session_00000001", epoch: 0 };
const encode = (type, data) =>
  `event: ${type}\ndata: ${JSON.stringify(data)}\n\n`;

test("nine follow-up operations preserve native selectors, scope, no-store metadata and nullable reads", async () => {
  const seen = [];
  const client = createClient(
    options(async (request) => {
      const url = new URL(request.url);
      const path = url.pathname;
      assert.equal(request.headers.get("X-Workspace-ID"), "workspace");
      const body =
        request.method === "POST" && request.body
          ? await request.json()
          : undefined;
      seen.push({
        method: request.method,
        path,
        query: [...url.searchParams],
        body,
      });
      const data = path.endsWith("/context")
        ? null
        : path.endsWith("/desktop-control") && request.method === "GET"
          ? null
          : path.endsWith("/control") || path.endsWith("/view")
            ? {
                assistance: view,
                mode: path.endsWith("/view") ? "view" : "control",
                websocket_url: "wss://desktop.test/direct",
                password: "test-only",
                expires_in_seconds: 60,
              }
            : view;
      return Response.json(data, {
        headers: {
          "Cache-Control": "no-store",
          "X-Request-Id": "desktop-read",
        },
      });
    }),
  );
  try {
    const run = client.api.runs.ref("run /雪");
    assert.equal((await run.desktopControl.get()).data, null);
    assert.deepEqual(
      (await run.desktopControl.create({ mount: "desktop", reason: "Inspect" }))
        .data,
      view,
    );
    await run.desktopAssistance.ref("call /雪").get();
    const assistance = client.api.desktopAssistance.ref("assist /雪");
    await assistance.requestControl();
    const access = await assistance.view(control, { query: { renew: false } });
    assert.equal(access.response.headers.get("Cache-Control"), "no-store");
    assert.equal(access.response.headers.get("X-Request-Id"), "desktop-read");
    assert.equal(access.data.password, "test-only");
    await assistance.control(control, { query: { renew: true } });
    await assistance.disconnect(control);
    await assistance.complete({ ...control, outcome: "abandoned", note: "" });
    assert.equal(
      (
        await client.api.usage.context.get({
          query: { record_id: "record /雪" },
        })
      ).data,
      null,
    );
    assert.equal(seen.length, 9);
    assert.equal(
      seen[0].path,
      "/api/v1/runs/run%20%2F%E9%9B%AA/desktop-control",
    );
    assert.ok(seen[2].path.endsWith("/desktop-assistance/call%20%2F%E9%9B%AA"));
    assert.ok(seen[3].path.endsWith("/assist%20%2F%E9%9B%AA/request-control"));
    assert.equal(seen[3].body, undefined);
    assert.deepEqual(seen[4].query, [["renew", "false"]]);
    assert.deepEqual(seen[5].query, [["renew", "true"]]);
    for (const index of [4, 5, 6]) assert.deepEqual(seen[index].body, control);
    assert.deepEqual(seen[7].body, {
      ...control,
      outcome: "abandoned",
      note: "",
    });
    assert.deepEqual(seen[8].query, [["record_id", "record /雪"]]);
  } finally {
    client.close();
  }
});

test("desktop mutation errors retain Service authority evidence without lease retry or implicit resume", async () => {
  const seen = [];
  const client = createClient(
    options(async (request) => {
      seen.push(request.url);
      return Response.json(
        {
          error: {
            code: "conflict",
            message: "Preparation is unresolved",
            details: { reason: "desktop_not_ready" },
            request_id: "desktop-conflict",
          },
        },
        { status: 409 },
      );
    }),
  );
  try {
    await assert.rejects(
      client.api.desktopAssistance.ref("assistance").control(control),
      (error) =>
        error instanceof ApiError &&
        error.status === 409 &&
        error.details.reason === "desktop_not_ready" &&
        error.requestId === "desktop-conflict",
    );
    assert.equal(seen.length, 1);
  } finally {
    client.close();
  }
});

test("context usage preserves null and required nullable counters without aggregate or selector rewriting", async () => {
  const values = [
    null,
    {
      run_id: "run",
      record_id: "record",
      input_tokens: null,
      output_tokens: 0,
      context_window_tokens: null,
    },
    {
      run_id: "run",
      record_id: "record",
      input_tokens: 24,
      output_tokens: null,
      context_window_tokens: 100,
    },
  ];
  const queries = [];
  let index = 0;
  const client = createClient(
    options(async (request) => {
      queries.push([...new URL(request.url).searchParams]);
      return Response.json(values[index++]);
    }),
  );
  try {
    for (const query of [
      { record_id: "record" },
      { run_id: "run" },
      { thread_id: "thread" },
    ])
      assert.deepEqual(
        (await client.api.usage.context.get({ query })).data,
        values[index - 1],
      );
    assert.deepEqual(queries, [
      [["record_id", "record"]],
      [["run_id", "run"]],
      [["thread_id", "thread"]],
    ]);
  } finally {
    client.close();
  }
});
for (const query of [
  {},
  { thread_id: "thread", run_id: "run" },
  { record_id: "missing" },
])
  test(`context invalid/missing selector reaches Service unchanged: ${JSON.stringify(query)}`, async () => {
    let calls = 0;
    const status = query.record_id ? 404 : 400;
    const client = createClient(
      options(async (request) => {
        calls++;
        assert.deepEqual(
          Object.fromEntries(new URL(request.url).searchParams),
          query,
        );
        return Response.json(
          {
            error: {
              code: status === 404 ? "not_found" : "invalid_request",
              message: "Native rejection",
              details: {},
              request_id: "selector",
            },
          },
          { status },
        );
      }),
    );
    try {
      await assert.rejects(
        client.api.usage.context.get({ query }),
        (error) => error instanceof ApiError && error.status === status,
      );
      assert.equal(calls, 1);
    } finally {
      client.close();
    }
  });

test("tool_search omission/null/empty/native/proxy selections pass unchanged through revision and Run boundaries", async () => {
  const values = [
    undefined,
    null,
    {},
    { groups: {} },
    { config: { mode: "native" } },
    { config: { mode: "native", strategy: null } },
    { config: { mode: "native", strategy: "bm25" } },
    { config: { mode: "native", strategy: "regex" } },
    {
      config: {
        mode: "proxy",
        search_name: "find",
        call_name: "invoke",
        max_results: 1,
        max_search_bytes: 1024,
      },
      groups: {
        selected: {
          description: "Available tools",
          platform: true,
          plugins: ["research"],
          connections: ["conn_00000000000000000000"],
        },
      },
    },
  ];
  const seen = [];
  const client = createClient(
    options(async (request) => {
      const body = await request.json();
      seen.push(body);
      return Response.json(
        request.url.endsWith("/threads")
          ? {
              thread: sessionThread,
              entry: { id: "entry", thread_id: sessionThread.id },
              run: null,
            }
          : body,
        { status: 201 },
      );
    }),
  );
  try {
    for (const value of values) {
      const fields = value === undefined ? {} : { tool_search: value };
      const revision = await client.api.agents
        .ref("agent")
        .revisions.create({ config: fields }, { ifMatch: '"v0"' });
      assert.deepEqual(revision.data, { config: fields });
      const invocation = await client.agents
        .ref("agent")
        .start("Inspect", { options: { overrides: fields } });
      await invocation.close();
      assert.deepEqual(seen.at(-1).options.overrides, fields);
      assert.equal(
        Object.hasOwn(seen.at(-1).options.overrides, "tool_search"),
        value !== undefined,
      );
    }
  } finally {
    client.close();
  }
});

for (const raw of [false, true])
  test(`desktop-only waiting ends finite exact Run and explicit empty resume is preserved (raw=${raw})`, async () => {
    const waiting = {
      ...sessionRun,
      status: "waiting",
      wait_reason: "desktop_control",
      pending: { approvals: [], calls: [], desktop_control_id: "assistance" },
    };
    let reads = 0,
      cancelled = 0;
    let streamStarted;
    const started = new Promise((resolve) => {
      streamStarted = resolve;
    });
    const requests = [];
    const client = createClient(
      options(async (request) => {
        const path = new URL(request.url).pathname;
        requests.push(request.method + " " + path);
        if (path === "/api/v1/runs/run_one" && request.method === "GET") {
          if (++reads === 1) return Response.json({ ...sessionRun });
          if (raw) await started;
          return Response.json(waiting);
        }
        if (path.endsWith("/stream")) {
          streamStarted();
          return new Response(
            new ReadableStream({
              cancel() {
                cancelled++;
              },
            }),
            { headers: { "Content-Type": "text/event-stream" } },
          );
        }
        if (path.endsWith("/complete")) {
          assert.deepEqual(await request.json(), {
            ...control,
            outcome: "completed",
          });
          return Response.json({
            ...view,
            state: "ready_to_resume",
            outcome: { status: "completed" },
          });
        }
        if (path.endsWith("/resume")) {
          assert.deepEqual(await request.json(), { approvals: {}, calls: {} });
          return Response.json(
            {
              ...sessionRun,
              id: "run_successor",
              parent_run_id: "run_one",
              status: "accepted",
            },
            { status: 201 },
          );
        }
        throw new Error(`Unexpected ${path}`);
      }),
    );
    try {
      const interaction = client.runs
        .ref("run_one")
        .observe({ pollIntervalMs: 1, timeoutMs: 1000 });
      if (raw) assert.deepEqual(await Array.fromAsync(interaction), []);
      const outcome = await interaction.result();
      assert.equal(outcome.runId, "run_one");
      assert.equal(outcome.status, "waiting");
      assert.deepEqual(outcome.pending, waiting.pending);
      assert.deepEqual(outcome.pendingCalls, []);
      assert.deepEqual(outcome.pendingApprovals, []);
      assert.equal(outcome.snapshot.data.wait_reason, "desktop_control");
      assert.equal(
        requests.some((x) => x.startsWith("POST")),
        false,
      );
      if (raw) assert.equal(cancelled, 1);
      await client.api.desktopAssistance
        .ref("assistance")
        .complete({ ...control, outcome: "completed" });
      assert.equal(
        requests.some((x) => x.endsWith("/resume")),
        false,
      );
      const next = await outcome.run.resume(
        {},
        { idempotencyKey: "explicit-desktop-resume" },
      );
      assert.equal(next.identity.runId, "run_successor");
      await next.close();
      await interaction.close();
      assert.equal(requests.filter((x) => x.endsWith("/resume")).length, 1);
    } finally {
      client.close();
    }
  });

test("agent assistance resumes only the caller's exact persisted outcome plus other pending answers", async () => {
  const outcome = { status: "completed", note: "Human fixed the screen" };
  let calls = 0;
  const client = createClient(
    options(async (request) => {
      calls++;
      assert.equal(
        new URL(request.url).pathname,
        "/api/v1/runs/waiting/resume",
      );
      assert.deepEqual(await request.json(), {
        approvals: {},
        calls: {
          assistance_call: { status: "returned", value: outcome },
          other_call: { status: "returned", value: null },
        },
      });
      return Response.json({ ...sessionRun, id: "successor" }, { status: 201 });
    }),
  );
  try {
    const next = await client.runs.ref("waiting").resume({
      assistance_call: returned(outcome),
      other_call: returned(null),
    });
    await next.close();
    assert.equal(calls, 1);
  } finally {
    client.close();
  }
});

test("Session validates desktop waiting, optional nullable pending ID and tool_search unions without changing native data", async () => {
  for (const pending of [
    { approvals: [], calls: [] },
    { approvals: [], calls: [], desktop_control_id: null },
    { approvals: [], calls: [], desktop_control_id: "assistance" },
  ]) {
    const data = {
      thread: sessionThread,
      current_run: {
        ...sessionRun,
        status: "waiting",
        wait_reason: "desktop_control",
        pending,
        options: {
          overrides: {
            tool_search: {
              config: { mode: "native", strategy: null },
              groups: {},
            },
          },
        },
      },
      last_run: null,
      entries: [],
    };
    const client = createClient(
      options(
        async () =>
          new Response(encode("thread", data), {
            headers: { "Content-Type": "text/event-stream" },
          }),
      ),
    );
    try {
      const raw = await client.api.sessions.ref("session_one").stream.get();
      assert.deepEqual(await Array.fromAsync(sessionStream(raw)), [
        { type: "thread", data },
      ]);
      assert.equal(raw.body.locked, false);
    } finally {
      client.close();
    }
  }
});
for (const invalid of [
  { pending: { approvals: [], calls: [], desktop_control_id: 1 } },
  { pending: { approvals: [], desktop_control_id: "assistance" } },
  {
    options: {
      overrides: {
        tool_search: { config: { mode: "native", max_results: 1 } },
      },
    },
  },
  {
    options: {
      overrides: {
        tool_search: { config: { mode: "proxy", strategy: "regex" } },
      },
    },
  },
  {
    options: { overrides: { tool_search: { config: { strategy: "regex" } } } },
  },
  { options: { overrides: { tool_search: { config: null } } } },
])
  test(`Session rejects invalid desktop/search projection: ${JSON.stringify(invalid)}`, async () => {
    const data = {
      thread: sessionThread,
      current_run: {
        ...sessionRun,
        status: "waiting",
        wait_reason: "desktop_control",
        pending: { approvals: [], calls: [], desktop_control_id: "assistance" },
        ...invalid,
      },
      last_run: null,
      entries: [],
    };
    const client = createClient(
      options(
        async () =>
          new Response(encode("thread", data), {
            headers: { "Content-Type": "text/event-stream" },
          }),
      ),
    );
    try {
      const raw = await client.api.sessions.ref("session_one").stream.get();
      await assert.rejects(Array.fromAsync(sessionStream(raw)), ProtocolError);
      assert.equal(raw.closed, true);
      assert.equal(raw.body.locked, false);
    } finally {
      client.close();
    }
  });
