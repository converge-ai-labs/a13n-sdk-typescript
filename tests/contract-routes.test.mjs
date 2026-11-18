import assert from "node:assert/strict";
import test from "node:test";
import { createClient } from "../dist/index.js";

test("new operation families preserve route, body, query, status, CAS and no mutation replay", async () => {
  const calls = [];
  const client = createClient({
    baseUrl: "https://service.example.test",
    auth: { type: "bearer", token: "test" },
    fetch: async (request) => {
      const url = new URL(request.url);
      calls.push({
        method: request.method,
        url,
        body: await request.text(),
        match: request.headers.get("if-match"),
      });
      if (url.pathname.endsWith("/value"))
        return Response.json(
          { error: { code: "conflict", message: "stale", details: {} } },
          { status: 412 },
        );
      if (url.pathname.endsWith("/rotate-credential"))
        return Response.json(
          {
            client: {},
            connection_path: "/connect",
            token: "one-time-fixture",
          },
          { status: 200 },
        );
      return Response.json({ result: "fixture" }, { status: 200 });
    },
  });
  try {
    const pairing = await client.api.clientEnvironments.pairings
      .ref("pair/one")
      .approve({ verification_code: "ABC" });
    assert.equal(pairing.response.status, 200);
    await assert.rejects(
      client.api.egressCredentials
        .ref("cred_one")
        .value.replace({ value: "fixture-only" }, { ifMatch: '"v:1"' }),
    );
    await client.api.environments.ref("env_one").kubernetes.logs.get({
      query: { container: "worker", previous: true, tail_lines: 2 },
    });
    await client.api.environments
      .ref("env_one")
      .debugHold.replace({ seconds: 60 }, { ifMatch: '"env:1"' });
    await client.api.memoryOrganizations.ref("org_one").candidate.file.get({
      query: { path: "notes/计划.md", candidate_seq: 3 },
    });
    await client.api.threads
      .ref("thr_one")
      .sessionBindings.ref("env_one")
      .ref("work")
      .replace({ configuration: { commands: false } }, { ifMatch: '"thr:1"' });
    const rotated = await client.api.clientEnvironments
      .ref("env_one")
      .rotateCredential({ ifMatch: '"env:1"' });
    assert.equal(rotated.data.token, "one-time-fixture");
    assert.equal(calls[6].match, '"env:1"');
    assert.equal(calls.length, 7);
    assert.equal(
      calls[0].url.pathname,
      "/api/v1/client-environments/pairings/pair%2Fone/approve",
    );
    assert.deepEqual(JSON.parse(calls[0].body), { verification_code: "ABC" });
    assert.equal(calls[1].method, "PUT");
    assert.equal(calls[1].match, '"v:1"');
    assert.deepEqual(JSON.parse(calls[1].body), { value: "fixture-only" });
    assert.equal(calls[2].url.searchParams.get("previous"), "true");
    assert.equal(calls[2].url.searchParams.get("tail_lines"), "2");
    assert.equal(calls[3].match, '"env:1"');
    assert.equal(calls[4].url.searchParams.get("path"), "notes/计划.md");
    assert.equal(calls[4].url.searchParams.get("candidate_seq"), "3");
    assert.equal(
      calls[5].url.pathname,
      "/api/v1/threads/thr_one/session-bindings/env_one/work",
    );
    assert.equal(calls[5].match, '"thr:1"');
    assert.deepEqual(JSON.parse(calls[5].body), {
      configuration: { commands: false },
    });
  } finally {
    client.close();
  }
});
