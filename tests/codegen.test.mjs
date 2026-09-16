import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  mkdtemp,
  mkdir,
  readFile,
  readdir,
  writeFile,
  rm,
  stat,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";
import { generate } from "../generate.mjs";

const root = new URL("../", import.meta.url);

test("contract bytes match their pinned Service provenance", async () => {
  const source = JSON.parse(
    await readFile(new URL("contract/source.json", root), "utf8"),
  );
  assert.equal(source.repository, "converge-ai-labs/agent-foundation");
  assert.match(source.commit, /^[a-f0-9]{40}$/);
  const vendored = (
    await readdir(new URL("contract/", root), { recursive: true })
  )
    .filter(
      (name) =>
        (name.endsWith(".json") || name.endsWith(".md")) &&
        !["source.json", "README.md"].includes(name),
    )
    .map((name) => name.replaceAll("\\", "/"));
  assert.deepEqual(Object.keys(source.files).sort(), vendored.sort());
  for (const [name, entry] of Object.entries(source.files)) {
    const bytes = await readFile(new URL(`contract/${name}`, root));
    assert.equal(
      createHash("sha256").update(bytes).digest("hex"),
      entry.sha256,
    );
  }
});

test("every pinned Native operation has a generated type", async () => {
  const document = JSON.parse(
    await readFile(new URL("contract/openapi.json", root), "utf8"),
  );
  const generated = await readFile(new URL("src/schema.ts", root), "utf8");
  for (const path of Object.values(document.paths)) {
    for (const [method, operation] of Object.entries(path)) {
      if (
        ["get", "post", "patch", "put", "delete", "head", "options"].includes(
          method,
        )
      )
        assert.ok(
          generated.includes(operation.operationId),
          operation.operationId,
        );
    }
  }
});

test("drift checks are non-mutating for stale and missing outputs", async () => {
  const directory = await mkdtemp(join(tmpdir(), "a13n-codegen-test-"));
  const root = pathToFileURL(`${directory}/`);
  try {
    await mkdir(new URL("contract/", root));
    await mkdir(new URL("src/", root));
    const input = JSON.stringify({
      openapi: "3.1.0",
      info: { title: "test", version: "1" },
      paths: {},
    });
    await writeFile(new URL("contract/openapi.json", root), input);
    await writeFile(new URL("src/schema.ts", root), "stale");
    await assert.rejects(
      generate({ root, check: true }),
      /Stale generated files/,
    );
    assert.equal(
      await readFile(new URL("src/schema.ts", root), "utf8"),
      "stale",
    );
    await assert.rejects(stat(new URL("openapi.json", root)), {
      code: "ENOENT",
    });
    await generate({ root });
    await generate({ root, check: true });
    assert.equal(
      await readFile(new URL("contract/openapi.json", root), "utf8"),
      input,
    );
    await writeFile(new URL("openapi.json", root), "stale snapshot");
    await assert.rejects(
      generate({ root, check: true }),
      /Stale generated files/,
    );
    assert.equal(
      await readFile(new URL("openapi.json", root), "utf8"),
      "stale snapshot",
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
