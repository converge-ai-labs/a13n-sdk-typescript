import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import Ajv from "ajv";
import { createClient, ProtocolError, sessionStream } from "../dist/index.js";
import { sessionThread, sessionRun } from "./session-fixtures.mjs";

test("MCP object-reference rules preserve boolean values and absent versus empty", async () => {
  const bodies = [];
  const client = createClient({
    baseUrl: "https://service.example.test",
    auth: { type: "bearer", token: "test" },
    fetch: async (req) => {
      assert.equal(req.method, "POST");
      assert.equal(new URL(req.url).pathname, "/api/v1/connections");
      bodies.push(await req.json());
      return Response.json({ id: "connection" }, { status: 201 });
    },
  });
  try {
    const rules = { "*": true, "private*": false, private_read: true };
    for (const object_ref_tools of [rules, undefined, {}]) {
      await client.api.connections.create({
        name: "mcp fixture",
        type: "mcp",
        config: { url: "https://mcp.example.test", object_ref_tools },
      });
    }
    assert.deepEqual(bodies[0].config.object_ref_tools, rules);
    assert.equal("object_ref_tools" in bodies[1].config, false);
    assert.deepEqual(bodies[2].config.object_ref_tools, {});
  } finally {
    client.close();
  }
});

test("Session validates object_store capability and rejects an unknown value", async () => {
  for (const valid of [true, false]) {
    const capability = valid ? "object_store" : "not_a_capability";
    const frame = {
      thread: sessionThread,
      current_run: {
        ...sessionRun,
        options: {
          overrides: {
            tool_search: { automatic: { capabilities: [capability] } },
          },
        },
      },
      last_run: null,
      entries: [],
    };
    const body = `event: thread\ndata: ${JSON.stringify(frame)}\n\n`;
    const client = createClient({
      baseUrl: "https://service.example.test",
      auth: { type: "bearer", token: "test" },
      fetch: async () =>
        new Response(body, {
          headers: { "Content-Type": "text/event-stream" },
        }),
    });
    try {
      const raw = await client.api.sessions.ref("session").stream.get();
      if (valid) {
        const got = await Array.fromAsync(sessionStream(raw));
        assert.deepEqual(
          got[0].data.current_run.options.overrides.tool_search.automatic
            .capabilities,
          ["object_store"],
        );
      } else {
        await assert.rejects(
          Array.fromAsync(sessionStream(raw)),
          ProtocolError,
        );
      }
    } finally {
      client.close();
    }
  }
});

test("pinned MCP rule schema has boolean values and bounded keys and count", () => {
  const doc = JSON.parse(
    readFileSync(new URL("../contract/openapi.json", import.meta.url)),
  );
  const schema = doc.components.schemas.McpConfig.properties.object_ref_tools;
  const check = new Ajv({ strict: false }).compile(schema);
  assert.equal(check({ "*": true, secret: false }), true);
  assert.equal(check({ "": true }), false);
  assert.equal(check({ ["x".repeat(129)]: true }), false);
  assert.equal(check({ read: "true" }), false);
  assert.equal(
    check(
      Object.fromEntries(
        Array.from({ length: 129 }, (_, i) => [`key${i}`, true]),
      ),
    ),
    false,
  );
});
