import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const temporaryRoot = mkdtempSync(join(tmpdir(), "a13n-sdk-package-"));
const packedDirectory = join(temporaryRoot, "packed");
const npm = process.platform === "win32" ? "npm.cmd" : "npm";

try {
  mkdirSync(packedDirectory);
  const packOutput = execFileSync(
    npm,
    ["pack", "--json", "--pack-destination", packedDirectory],
    { cwd: packageRoot, encoding: "utf8" },
  );
  const [{ filename }] = JSON.parse(packOutput);
  assert.equal(typeof filename, "string");
  const tarball = join(packedDirectory, filename);

  writeFileSync(
    join(temporaryRoot, "package.json"),
    JSON.stringify({ private: true, type: "module" }),
  );
  execFileSync(
    npm,
    [
      "install",
      "--ignore-scripts",
      "--no-audit",
      "--no-fund",
      "--no-package-lock",
      tarball,
    ],
    { cwd: temporaryRoot, stdio: "inherit" },
  );

  writeFileSync(
    join(temporaryRoot, "consumer.mjs"),
    `import assert from "node:assert/strict";
import { ApiError, createClient } from "@converge.ai/a13n";

assert.equal(typeof createClient, "function");
assert.equal(typeof ApiError, "function");
const client = createClient({
  baseUrl: "https://service.example.test",
  auth: { type: "bearer", token: "test-token" },
});
assert.equal(typeof client.resources.workspaces.ref("ws_example").threads.create, "function");
assert.equal(typeof client.resources.organizations.ref("org_example").get, "function");
assert.equal(typeof client.resources.healthz.get, "function");
assert.equal(typeof client.resources.workspaces.ref("ws_example").uploads.create, "function");
client.close();
`,
  );
  execFileSync(process.execPath, [join(temporaryRoot, "consumer.mjs")], {
    cwd: temporaryRoot,
    stdio: "inherit",
  });

  writeFileSync(
    join(temporaryRoot, "consumer.ts"),
    `import {
  createClient,
  type Client,
  type ResourceResult,
} from "@converge.ai/a13n";

const client: Client = createClient({
  baseUrl: "https://service.example.test",
  auth: { type: "bearer", token: "test-token" },
});
const workspace = client.resources.workspaces.ref("ws_example");
const organization = client.resources.organizations.ref("org_example");
void workspace.runs.ref("run_example").get;
void workspace.threads.pages({ query: { limit: 10 } });
void organization.modelProviders;
void client.resources.workspaces.ref("ws").memories.pages({ query: { label: ["a"] } });
void client.resources.workspaces.ref("ws").assets.ref("asset").content.get;
// @ts-expect-error Revision selectors retain their numeric contract in the published package.
client.resources.workspaces.ref("ws").memories.ref("memory").revisions.ref("1");
const result: ResourceResult<{ ok: true }> = {
  data: { ok: true },
  response: new Response(),
};
void result;
client.close();
`,
  );
  writeFileSync(
    join(temporaryRoot, "tsconfig.json"),
    JSON.stringify({
      compilerOptions: {
        exactOptionalPropertyTypes: true,
        module: "NodeNext",
        moduleResolution: "NodeNext",
        noEmit: true,
        skipLibCheck: false,
        strict: true,
        target: "ES2023",
      },
      include: ["consumer.ts"],
    }),
  );
  const typescriptPackage = JSON.parse(
    readFileSync(
      join(packageRoot, "node_modules/typescript/package.json"),
      "utf8",
    ),
  );
  assert.equal(typeof typescriptPackage.version, "string");
  execFileSync(
    process.execPath,
    [
      join(packageRoot, "node_modules/typescript/bin/tsc"),
      "--project",
      join(temporaryRoot, "tsconfig.json"),
    ],
    { cwd: temporaryRoot, stdio: "inherit" },
  );

  console.log(
    `Installed ${filename} in an isolated consumer; Node ESM import and TypeScript ${typescriptPackage.version} resolution passed.`,
  );
} finally {
  rmSync(temporaryRoot, { recursive: true, force: true });
}
