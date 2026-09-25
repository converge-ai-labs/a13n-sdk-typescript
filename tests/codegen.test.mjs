import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";
import { generate } from "../generate.mjs";

test("changed HTTP contract regenerates types and published snapshot", async () => {
  const directory = await mkdtemp(join(tmpdir(), "a13n-autogen-test-"));
  const root = pathToFileURL(`${directory}/`);
  try {
    await mkdir(new URL("contract/", root));
    await mkdir(new URL("src/", root));
    const document = {
      openapi: "3.1.0",
      info: { title: "Autogen fixture", version: "1" },
      paths: {
        "/api/v1/autogen-probe": {
          get: {
            operationId: "autogen_probe",
            responses: { 204: { description: "No content" } },
          },
        },
      },
    };
    const source = new URL("contract/openapi.json", root);
    await writeFile(source, JSON.stringify(document));
    await generate({ root });
    const before = await readFile(new URL("src/schema.ts", root), "utf8");
    const beforeResources = await readFile(
      new URL("src/resources/generated.ts", root),
      "utf8",
    );
    assert.match(beforeResources, /get autogenProbe\(\)/);
    assert.match(beforeResources, /GET \/api\/v1\/autogen-probe/);
    document.paths["/api/v1/autogen-probe"].get.parameters = [
      { name: "autogen_probe_value", in: "query", schema: { type: "string" } },
    ];
    const input = JSON.stringify(document);
    await writeFile(source, input);
    await generate({ root });
    const after = await readFile(new URL("src/schema.ts", root), "utf8");
    assert.notEqual(before, after);
    assert.ok(!before.includes("autogen_probe_value"));
    assert.ok(after.includes("autogen_probe_value"));
    const afterResources = await readFile(
      new URL("src/resources/generated.ts", root),
      "utf8",
    );
    assert.notEqual(beforeResources, afterResources);
    assert.match(afterResources, /options.query/);
    assert.equal(await readFile(source, "utf8"), input);
    assert.deepEqual(
      JSON.parse(await readFile(new URL("openapi.json", root), "utf8")),
      document,
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
