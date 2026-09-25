import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** Execute the real Service acceptance from an isolated installed npm consumer. */
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const temporary = mkdtempSync(join(tmpdir(), "a13n-sdk-service-"));
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
try {
  const [{ filename }] = JSON.parse(
    execFileSync(npm, ["pack", "--json", "--pack-destination", temporary], {
      cwd: root,
      encoding: "utf8",
    }),
  );
  writeFileSync(
    join(temporary, "package.json"),
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
      join(temporary, filename),
    ],
    { cwd: temporary, stdio: "inherit" },
  );
  for (const name of [
    "accept-service.mjs",
    "accept-interaction.mjs",
    "accept-memory.mjs",
    "accept-resources.mjs",
  ]) {
    const acceptance = readFileSync(join(root, "scripts", name), "utf8");
    if (!acceptance.includes('from "../dist/index.js"'))
      throw new Error(
        "Acceptance importer changed; update installed-consumer adaptation.",
      );
    writeFileSync(
      join(temporary, name),
      acceptance.replace('from "../dist/index.js"', 'from "@converge.ai/a13n"'),
    );
    const result = spawnSync(process.execPath, [join(temporary, name)], {
      cwd: temporary,
      env: process.env,
      stdio: "inherit",
      timeout: 180_000,
    });
    if (result.error) throw result.error;
    if (result.status !== 0) {
      process.exitCode = result.status ?? 1;
      break;
    }
  }
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
