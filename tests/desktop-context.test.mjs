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
const encode = (type, data) =>
  `event: ${type}\ndata: ${JSON.stringify(data)}\n\n`;

test("environment desktop operations preserve paths, fences, metadata and no mutation replay", async () => {
  const seen = [];
  const client = createClient(
    options(async (request) => {
      seen.push({
        method: request.method,
        path: new URL(request.url).pathname,
        match: request.headers.get("If-Match"),
        workspace: request.headers.get("X-Workspace-ID"),
        body: request.body ? await request.json() : undefined,
      });
      return Response.json(
        { ok: true },
        {
          headers: {
            "Cache-Control": "no-store",
            "X-Request-Id": "desktop-read",
          },
        },
      );
    }),
  );
  try {
    const environment = client.api.environments.ref("env /雪");
    const metadata = await environment.desktopControl.get();
    assert.equal(metadata.response.headers.get("Cache-Control"), "no-store");
    await environment.desktopControl.takeover(
      { thread_id: "thread", lease_seconds: 60 },
      { ifMatch: '"v1"' },
    );
    await environment.desktopControl.renew({
      episode: 1,
      generation: 2,
      lease_seconds: 60,
    });
    await environment.desktopViewer({
      mode: "control",
      episode: 1,
      generation: 2,
    });
    await environment.desktopControl.handback({ ifMatch: '"v2"' });
    assert.deepEqual(
      seen.map(({ method, path, match, body, workspace }) => ({
        method,
        path,
        match,
        body,
        workspace,
      })),
      [
        {
          method: "GET",
          path: "/api/v1/environments/env%20%2F%E9%9B%AA/desktop-control",
          match: null,
          body: undefined,
          workspace: "workspace",
        },
        {
          method: "POST",
          path: "/api/v1/environments/env%20%2F%E9%9B%AA/desktop-control/takeover",
          match: '"v1"',
          body: { thread_id: "thread", lease_seconds: 60 },
          workspace: "workspace",
        },
        {
          method: "POST",
          path: "/api/v1/environments/env%20%2F%E9%9B%AA/desktop-control/renew",
          match: null,
          body: { episode: 1, generation: 2, lease_seconds: 60 },
          workspace: "workspace",
        },
        {
          method: "POST",
          path: "/api/v1/environments/env%20%2F%E9%9B%AA/desktop-viewer",
          match: null,
          body: { mode: "control", episode: 1, generation: 2 },
          workspace: "workspace",
        },
        {
          method: "POST",
          path: "/api/v1/environments/env%20%2F%E9%9B%AA/desktop-control/handback",
          match: '"v2"',
          body: undefined,
          workspace: "workspace",
        },
      ],
    );
  } finally {
    client.close();
  }
});

test("desktop conflict preserves authority evidence without retry", async () => {
  let calls = 0;
  const client = createClient(
    options(async () => {
      calls++;
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
      client.api.environments
        .ref("environment")
        .desktopControl.takeover({ thread_id: "thread" }, { ifMatch: '"v1"' }),
      (error) =>
        error instanceof ApiError &&
        error.status === 409 &&
        error.details.reason === "desktop_not_ready" &&
        error.requestId === "desktop-conflict",
    );
    assert.equal(calls, 1);
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

test("tool_search omission/null/empty/proxy selections pass unchanged through revision and Run boundaries", async () => {
  const values = [
    undefined,
    null,
    {},
    { groups: {} },
    { config: {} },
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
  test(`historical desktop waiting ends finite exact Run without implicit mutation (raw=${raw})`, async () => {
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
      await interaction.close();
      assert.equal(
        requests.some((x) => x.endsWith("/resume")),
        false,
      );
    } finally {
      client.close();
    }
  });

test("explicit deferred call answers preserve caller values alongside other pending answers", async () => {
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

test("Session validates desktop waiting, optional nullable pending ID and tool_search configuration without changing native data", async () => {
  for (const pending of [
    { approvals: [], calls: [] },
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
              config: { mode: "proxy", max_results: 7 },
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
  { pending: { approvals: [], calls: [], desktop_control_id: null } },
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
