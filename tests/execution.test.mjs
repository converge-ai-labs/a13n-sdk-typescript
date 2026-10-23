import assert from "node:assert/strict";
import test from "node:test";
import { createClient, ProtocolError } from "../dist/index.js";

const receipt = {
  thread: { id: "thread" },
  entry: { id: "entry", thread_id: "thread" },
  run: null,
};
for (const execution of [
  undefined,
  null,
  {},
  { environment: null },
  { environment: {} },
  {
    tools: { mode: "auto", foreground_wait_seconds: 0 },
    steering: "boundary",
    environment: { APP_ENV: "test", EMPTY: "" },
  },
]) {
  test(`execution presence ${JSON.stringify(execution)}`, async () => {
    const bodies = [];
    const client = createClient({
      baseUrl: "https://service.example",
      auth: { type: "bearer", token: "test" },
      fetch: async (request) => {
        bodies.push(await request.json());
        if (request.method === "PATCH") {
          assert.equal(request.headers.get("if-match"), '"v1"');
          return Response.json({ id: "thread" });
        }
        return Response.json(receipt, { status: 201 });
      },
    });
    try {
      const options = { execution };
      const first = await client.agents
        .ref("agent")
        .start("x", { execution, options });
      const next = await client.agents
        .ref("agent")
        .send("thread", "x", { options });
      await client.api.threads
        .ref("thread")
        .update({ execution }, { ifMatch: '"v1"' });
      const expected = execution === undefined ? {} : { execution };
      assert.deepEqual(
        Object.fromEntries(
          Object.entries(bodies[0]).filter(([key]) => key === "execution"),
        ),
        expected,
      );
      assert.deepEqual(bodies[0].options, expected);
      assert.deepEqual(bodies[1].options, expected);
      assert.equal("execution" in bodies[1], false);
      assert.deepEqual(bodies[2], expected);
      await first.close();
      await next.close();
    } finally {
      await client.close();
    }
  });
}

test("Thread defaults and per-Run choices remain independent", async () => {
  const client = createClient({
    baseUrl: "https://service.example",
    auth: { type: "bearer", token: "test" },
    fetch: async (request) => {
      const body = await request.json();
      assert.deepEqual(body.execution, { environment: { APP_ENV: "thread" } });
      assert.deepEqual(body.options.execution, {
        environment: { APP_ENV: "run" },
        steering: "immediate",
        tools: { mode: "inline" },
      });
      return Response.json(receipt, { status: 201 });
    },
  });
  try {
    const interaction = await client.agents.ref("agent").start("x", {
      execution: { environment: { APP_ENV: "thread" } },
      options: {
        execution: {
          environment: { APP_ENV: "run" },
          steering: "immediate",
          tools: { mode: "inline" },
        },
      },
    });
    await interaction.close();
  } finally {
    await client.close();
  }
});

test("high-level execution reads select detailed and reject compact or fragment results", async () => {
  for (const body of [
    { view: "compact", id: "record", thread_id: "thread" },
    { representation: "fragment", text: "partial" },
  ]) {
    const client = createClient({
      baseUrl: "https://service.example",
      auth: { type: "bearer", token: "test" },
      fetch: async (request) => {
        assert.equal(new URL(request.url).searchParams.get("view"), "detailed");
        return Response.json(body);
      },
    });
    try {
      await assert.rejects(client.runs.ref("record").get(), ProtocolError);
      await assert.rejects(
        client.threads.ref("thread").entry("record").get(),
        ProtocolError,
      );
    } finally {
      await client.close();
    }
  }
});
