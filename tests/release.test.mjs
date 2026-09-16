import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import {
  chmodSync,
  copyFileSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import {
  collectChanges,
  compareVersions,
  loadLabels,
  parseVersion,
  prepareVersion,
  previousTag,
  releaseCommand,
  releaseTag,
  renderNotes,
} from "../scripts/release.mjs";
import { checkLatest } from "../scripts/check-npm-latest.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
function temporary(t) {
  const directory = mkdtempSync(join(tmpdir(), "a13n-release-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  return directory;
}
function git(directory, ...args) {
  return execFileSync("git", args, {
    cwd: directory,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}
function repository(t) {
  const directory = temporary(t);
  git(directory, "init", "-b", "main");
  git(directory, "config", "user.name", "Release Test");
  git(directory, "config", "user.email", "release@example.test");
  writeFileSync(join(directory, "README.md"), "Initial\n");
  git(directory, "add", ".");
  git(directory, "commit", "-qm", "Initial source");
  return directory;
}

test("versions preserve canonical stable and RC identities", () => {
  for (const version of ["0.0.0", "1.2.3", "12.30.40-rc.21"])
    assert.equal(parseVersion(version).version, version);
  for (const version of [
    "v1.2.3",
    "01.2.3",
    "1.2",
    "1.2.3rc1",
    "1.2.3-rc.0",
    "1.2.3-rc.01",
    "1.2.3+build",
    "1.2.3\n",
    "../1.2.3",
  ])
    assert.throws(() => parseVersion(version));
  assert(compareVersions("1.10.0", "1.9.0") > 0);
  assert(compareVersions("1.0.0", "1.0.0-rc.99") > 0);
});

for (const version of ["1.2.3", "1.2.3-rc.4"])
  test(`ephemeral ${version} changes only npm root versions`, (t) => {
    const directory = temporary(t);
    const originals = new Map();
    for (const name of ["package.json", "package-lock.json"]) {
      copyFileSync(join(root, name), join(directory, name));
      originals.set(name, readFileSync(join(directory, name), "utf8"));
    }
    assert.deepEqual(prepareVersion(directory, version), [
      "package.json",
      "package-lock.json",
    ]);
    for (const name of originals.keys())
      assert.equal(
        JSON.parse(readFileSync(join(directory, name))).version,
        version,
      );
    assert.equal(
      JSON.parse(readFileSync(join(directory, "package-lock.json"))).packages[
        ""
      ].version,
      version,
    );
    assert.deepEqual(prepareVersion(directory, version), []);
    prepareVersion(directory, "0.0.0");
    for (const [name, original] of originals)
      assert.equal(readFileSync(join(directory, name), "utf8"), original);
  });

test("malformed lock or invalid version cannot partially modify the manifest", (t) => {
  const directory = temporary(t);
  copyFileSync(join(root, "package.json"), join(directory, "package.json"));
  const original = readFileSync(join(directory, "package.json"), "utf8");
  writeFileSync(join(directory, "package-lock.json"), '{"version":"0.0.0"}');
  assert.throws(() => prepareVersion(directory, "1.2.3"));
  assert.throws(() => prepareVersion(directory, "v1.2.3"));
  assert.equal(readFileSync(join(directory, "package.json"), "utf8"), original);
});

test("comparison uses same-channel stable or same-target RC ancestry candidates", () => {
  const tags = [
    "1.9.0",
    "1.10.0",
    "1.11.0-rc.8",
    "2.0.0-rc.1",
    "2.0.0-rc.2",
    "2.0.0",
  ].map(releaseTag);
  tags.push("release/unrelated/9.0.0", releaseTag("1.0.0") + "invalid");
  assert.equal(previousTag("2.0.0", tags), releaseTag("1.10.0"));
  assert.equal(previousTag("2.0.0-rc.2", tags), releaseTag("2.0.0-rc.1"));
  assert.equal(previousTag("2.0.0-rc.1", tags), releaseTag("1.10.0"));
  assert.equal(previousTag("1.0.0", tags), null);
  const rc = releaseCommand("1.0.0-rc.1", "owner/repo", "Release", []);
  assert(rc.includes("--prerelease") && rc.includes("--latest=false"));
  assert(
    !releaseCommand("1.0.0", "owner/repo", "Release", []).includes(
      "--prerelease",
    ),
  );
});

test("notes retain labels, exclusions, escaping, manual notes and PR references", () => {
  const changes = [
    {
      commit: "a".repeat(40),
      subject: "feat: [untrusted](url) (#12)",
      body: "",
      labels: ["bug"],
    },
    {
      commit: "b".repeat(40),
      subject: "chore: omit",
      body: "",
      labels: ["chore"],
    },
    {
      commit: "c".repeat(40),
      subject: "feat!: upgrade",
      body: "",
      labels: ["breaking-change", "skip-changelog"],
    },
  ];
  const notes = renderNotes({
    version: "2.0.0",
    repository: "owner/repo",
    previous: releaseTag("1.0.0"),
    changes,
    manual: "## Highlights",
  });
  assert(notes.includes("### Bug fixes") && notes.includes("\\[untrusted\\]"));
  assert(notes.includes("### Breaking changes") && !notes.includes("omit"));
  assert(
    notes.includes("https://github.com/owner/repo/pull/12") &&
      notes.includes("repository comparison"),
  );
  assert(notes.startsWith("## Highlights\n"));
  assert.equal(
    renderNotes({
      version: "1.0.0",
      repository: "owner/repo",
      previous: null,
      manual: "First",
    }),
    "First\n",
  );
  let queries = 0;
  assert.deepEqual(
    loadLabels([changes[0], changes[0]], "owner/repo", () => {
      queries++;
      return "bug\n";
    }).map((change) => change.labels),
    [["bug"], ["bug"]],
  );
  assert.equal(queries, 1);
});

test("first-parent root scope excludes branch details and unreachable comparison tags", (t) => {
  const directory = repository(t);
  git(directory, "tag", releaseTag("1.0.0"));
  git(directory, "checkout", "-qb", "unmerged");
  writeFileSync(join(directory, "other.txt"), "other\n");
  git(directory, "add", ".");
  git(directory, "commit", "-qm", "Unmerged");
  git(directory, "tag", releaseTag("1.9.0"));
  git(directory, "checkout", "-q", "main");
  git(directory, "checkout", "-qb", "feature");
  writeFileSync(join(directory, "README.md"), "Feature\n");
  git(directory, "add", ".");
  git(directory, "commit", "-qm", "feat: branch detail");
  git(directory, "checkout", "-q", "main");
  git(
    directory,
    "merge",
    "--no-ff",
    "-qm",
    "feat: reviewed root change",
    "feature",
  );
  git(directory, "tag", releaseTag("2.0.0"));
  assert.deepEqual(
    collectChanges(directory, releaseTag("1.0.0"), releaseTag("2.0.0")).map(
      (change) => change.subject,
    ),
    ["feat: reviewed root change"],
  );
  const tags = git(directory, "tag", "--merged", releaseTag("2.0.0")).split(
    "\n",
  );
  assert(!tags.includes(releaseTag("1.9.0")));
  assert.equal(previousTag("2.0.0", tags), releaseTag("1.0.0"));
  const preview = spawnSync(
    process.execPath,
    [
      join(root, "scripts/create-github-release.mjs"),
      "a13n-typescript",
      "2.0.0",
      "Release",
      "--dry-run",
    ],
    {
      cwd: directory,
      env: { ...process.env, GITHUB_REPOSITORY: "owner/repo" },
      encoding: "utf8",
    },
  );
  assert.equal(preview.status, 0, preview.stderr);
  assert(preview.stdout.includes("reviewed root change"));
});

test("npm guard rejects regression and uncertainty but allows missing latest and definite first publish", () => {
  const success = (value) => () => ({
    status: 0,
    stdout: JSON.stringify(value),
    stderr: "",
  });
  checkLatest("1.1.0", success({ latest: "1.0.0" }));
  checkLatest("1.0.0", success({ rc: "1.0.0-rc.1" }));
  checkLatest("1.0.0", () => ({
    status: 1,
    stdout: JSON.stringify({ error: { code: "E404" } }),
  }));
  for (const latest of ["1.1.0", "2.0.0", "broken", 123])
    assert.throws(() => checkLatest("1.1.0", success({ latest })));
  for (const code of ["E401", "E503", "EAI_AGAIN"])
    assert.throws(() =>
      checkLatest("1.1.0", () => ({
        status: 1,
        stdout: JSON.stringify({ error: { code } }),
      })),
    );
  assert.throws(() => checkLatest("1.1.0", success([])));
  checkLatest("1.0.0-rc.1", () => {
    throw new Error("RC must not inspect latest");
  });
});

for (const state of [
  "success",
  "failure",
  "in_progress",
  "missing",
  "other-sha",
  "older-success",
  "off-main",
  "api-failure",
])
  test(`release source gate: ${state}`, (t) => {
    const directory = repository(t);
    const commit = git(directory, "rev-parse", "HEAD");
    git(directory, "update-ref", "refs/remotes/origin/main", commit);
    if (state === "off-main") {
      writeFileSync(join(directory, "README.md"), "off main\n");
      git(directory, "add", ".");
      git(directory, "commit", "-qm", "Off main");
    }
    const run = {
      head_sha: commit,
      head_branch: "main",
      event: "push",
      run_number: 1,
      run_attempt: 1,
      status: "completed",
      conclusion: "success",
    };
    let runs = [run];
    if (state === "failure") run.conclusion = "failure";
    if (state === "in_progress") run.status = "in_progress";
    if (state === "missing") runs = [];
    if (state === "other-sha") run.head_sha = "0".repeat(40);
    if (state === "older-success")
      runs.push({ ...run, run_attempt: 2, conclusion: "failure" });
    const fixture = join(directory, "runs.json");
    writeFileSync(fixture, JSON.stringify([{ workflow_runs: runs }]));
    const bin = join(directory, "bin");
    mkdirSync(bin);
    writeFileSync(
      join(bin, "gh"),
      state === "api-failure"
        ? "#!/bin/sh\nexit 1\n"
        : '#!/bin/sh\ncat "$CI_FIXTURE"\n',
    );
    chmodSync(join(bin, "gh"), 0o755);
    const result = spawnSync(
      "bash",
      [join(root, "scripts/verify-release-source.sh")],
      {
        cwd: directory,
        env: {
          ...process.env,
          PATH: `${bin}:${process.env.PATH}`,
          CI_FIXTURE: fixture,
          GITHUB_REPOSITORY: "owner/repo",
        },
        encoding: "utf8",
      },
    );
    assert.equal(result.status === 0, state === "success", result.stderr);
  });
