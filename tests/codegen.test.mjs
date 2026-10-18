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
    await writeFile(
      new URL("contract/session-stream.schema.json", root),
      JSON.stringify({
        title: "Session fixture",
        $defs: {
          Gap: {
            type: "object",
            properties: { run_id: { type: "string" } },
            required: ["run_id"],
          },
        },
        frames: { gap: { $ref: "#/$defs/Gap" } },
      }),
    );
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

test("all pinned generated outputs, including Session types, are byte-exact and deterministic", async () => {
  const directory = await mkdtemp(join(tmpdir(), "a13n-pinned-generation-"));
  const root = pathToFileURL(`${directory}/`);
  const outputs = [
    "src/schema.ts",
    "src/session-stream-schema.ts",
    "src/session-stream-validation.ts",
    "src/resources/generated.ts",
    "src/workspace-scope.ts",
    "openapi.json",
  ];
  try {
    await mkdir(new URL("contract/", root));
    for (const name of ["openapi.json", "session-stream.schema.json"])
      await writeFile(
        new URL(`contract/${name}`, root),
        await readFile(new URL(`../contract/${name}`, import.meta.url)),
      );
    await generate({ root });
    for (const name of outputs)
      assert.equal(
        await readFile(new URL(name, root), "utf8"),
        await readFile(new URL(`../${name}`, import.meta.url), "utf8"),
        `${name} drifted`,
      );
    const before = await Promise.all(
      outputs.map((name) => readFile(new URL(name, root), "utf8")),
    );
    await generate({ root });
    assert.deepEqual(
      await Promise.all(
        outputs.map((name) => readFile(new URL(name, root), "utf8")),
      ),
      before,
    );
    const sessionPath = new URL("contract/session-stream.schema.json", root);
    const session = JSON.parse(await readFile(sessionPath, "utf8"));
    session.$defs.Gap.properties.native_probe = { type: "boolean" };
    await writeFile(sessionPath, JSON.stringify(session));
    await generate({ root });
    assert.match(
      await readFile(new URL("src/session-stream-schema.ts", root), "utf8"),
      /native_probe\?: boolean/,
    );
    assert.equal(
      await readFile(new URL("src/schema.ts", root), "utf8"),
      before[0],
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("closed discriminated unions exclude sibling fields in HTTP and Session without closing open variants", async () => {
  const directory = await mkdtemp(join(tmpdir(), "a13n-closed-union-"));
  const root = pathToFileURL(`${directory}/`);
  const branch = (mode, field, closed) => ({
    type: "object",
    ...(closed ? { additionalProperties: false } : {}),
    required: ["mode"],
    properties: {
      mode: { const: mode, type: "string" },
      [field]: { type: "string" },
    },
  });
  const schemas = {
    Left: branch("left", "left_only", true),
    Right: branch("right", "right_only", true),
    OpenLeft: branch("left", "open_left", false),
    OpenRight: branch("right", "open_right", true),
    Closed: {
      discriminator: {
        propertyName: "mode",
        mapping: {
          left: "#/components/schemas/Left",
          right: "#/components/schemas/Right",
        },
      },
      oneOf: [
        { $ref: "#/components/schemas/Right" },
        { $ref: "#/components/schemas/Left" },
      ],
    },
    Open: {
      discriminator: {
        propertyName: "mode",
        mapping: {
          left: "#/components/schemas/OpenLeft",
          right: "#/components/schemas/OpenRight",
        },
      },
      oneOf: [
        { $ref: "#/components/schemas/OpenLeft" },
        { $ref: "#/components/schemas/OpenRight" },
      ],
    },
  };
  try {
    await mkdir(new URL("contract/", root));
    await writeFile(
      new URL("contract/openapi.json", root),
      JSON.stringify({
        openapi: "3.1.0",
        info: { title: "Closed fixture", version: "1" },
        paths: {},
        components: { schemas },
      }),
    );
    await writeFile(
      new URL("contract/session-stream.schema.json", root),
      JSON.stringify({
        title: "Closed Session fixture",
        $defs: JSON.parse(
          JSON.stringify(schemas).replaceAll(
            "#/components/schemas/",
            "#/$defs/",
          ),
        ),
        frames: { probe: { $ref: "#/$defs/Closed" } },
      }),
    );
    await generate({ root });
    for (const name of ["src/schema.ts", "src/session-stream-schema.ts"]) {
      const source = await readFile(new URL(name, root), "utf8");
      assert.match(
        source,
        /Left: \{[\s\S]*?left_only\?: string;\s+right_only\?: never;/,
      );
      assert.match(
        source,
        /Right: \{[\s\S]*?right_only\?: string;\s+left_only\?: never;/,
      );
      assert.doesNotMatch(source, /open_(left|right)\?: never/);
    }
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
