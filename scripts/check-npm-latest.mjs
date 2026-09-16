import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { compareVersions, parseVersion } from "./release.mjs";

export function checkLatest(version, execute = spawnSync) {
  if (parseVersion(version).rc !== null) return;
  const result = execute(
    "npm",
    ["view", "@converge.ai/a13n", "dist-tags", "--json"],
    { encoding: "utf8" },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) {
    // Only a definite missing package permits first publication. Network/auth
    // errors must not silently bypass the latest regression check.
    let error;
    try {
      error = JSON.parse(result.stdout).error;
    } catch {
      /* Fail below. */
    }
    if (error?.code === "E404") return;
    throw new Error(
      `Cannot inspect npm dist-tags: ${result.stderr || result.stdout}`,
    );
  }
  const tags = JSON.parse(result.stdout);
  if (!tags || typeof tags !== "object" || Array.isArray(tags))
    throw new Error("Invalid npm dist-tags response");
  if (!("latest" in tags)) return;
  if (typeof tags.latest !== "string")
    throw new Error("Invalid npm latest version");
  if (compareVersions(version, tags.latest) <= 0)
    throw new Error(`Refusing to publish ${version} after ${tags.latest}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  checkLatest(process.env.VERSION);
