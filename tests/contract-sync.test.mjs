import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

test("contract sync and reviewed-PR recovery use offline Git fixtures", () => {
  const result = spawnSync(
    "bash",
    [
      fileURLToPath(
        new URL("../scripts/tests/contract-sync.sh", import.meta.url),
      ),
    ],
    { encoding: "utf8" },
  );
  assert.equal(result.status, 0, result.stdout + result.stderr);
});
