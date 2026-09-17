// Repository-local implementation of the parent release rules; no runtime dependency.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const component = "a13n-typescript";
export const tagPrefix = "release/a13n/typescript/";

export function parseVersion(version) {
  const match =
    /^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(?:-rc\.([1-9][0-9]*))?$/.exec(
      version,
    );
  if (!match || match[0] !== version) {
    throw new Error(
      `Release version must use X.Y.Z or X.Y.Z-rc.N syntax: ${version}`,
    );
  }
  return {
    version,
    parts: match.slice(1, 4).map(BigInt),
    rc: match[4] ? BigInt(match[4]) : null,
  };
}

export function compareVersions(left, right) {
  const a = typeof left === "string" ? parseVersion(left) : left;
  const b = typeof right === "string" ? parseVersion(right) : right;
  for (let index = 0; index < 3; index++) {
    if (a.parts[index] !== b.parts[index])
      return a.parts[index] < b.parts[index] ? -1 : 1;
  }
  if (a.rc === b.rc) return 0;
  if (a.rc === null) return 1;
  if (b.rc === null) return -1;
  return a.rc < b.rc ? -1 : 1;
}

export function releaseTag(version) {
  parseVersion(version);
  return `${tagPrefix}${version}`;
}

export function prepareVersion(root, version) {
  parseVersion(version);
  const planned = ["package.json", "package-lock.json"].map((name) => {
    const path = join(root, name);
    const original = readFileSync(path, "utf8");
    const value = JSON.parse(original);
    if (typeof value?.version !== "string")
      throw new Error(`Missing version in ${name}`);
    let changed = value.version !== version;
    value.version = version;
    if (name === "package-lock.json") {
      if (typeof value.packages?.[""]?.version !== "string")
        throw new Error("Missing npm lock root version");
      changed ||= value.packages[""].version !== version;
      value.packages[""].version = version;
    }
    return {
      path,
      name,
      changed,
      content: JSON.stringify(value, null, 2) + "\n",
    };
  });
  // Validate both documents before writing either; no dependency updates.
  for (const file of planned)
    if (file.changed) writeFileSync(file.path, file.content);
  return planned.filter((file) => file.changed).map((file) => file.name);
}

export function previousTag(version, tags) {
  const current = parseVersion(version);
  const stable = [];
  const sameTargetRCs = [];
  for (const tag of tags) {
    if (!tag.startsWith(tagPrefix)) continue;
    let candidate;
    try {
      candidate = parseVersion(tag.slice(tagPrefix.length));
    } catch {
      continue;
    }
    if (compareVersions(candidate, current) >= 0) continue;
    if (candidate.rc === null) stable.push(candidate);
    else if (
      current.rc !== null &&
      candidate.parts.every((part, index) => part === current.parts[index])
    )
      sameTargetRCs.push(candidate);
  }
  const candidates = sameTargetRCs.length ? sameTargetRCs : stable;
  candidates.sort(compareVersions);
  return candidates.length ? releaseTag(candidates.at(-1).version) : null;
}

export function run(command, args, options = {}) {
  return execFileSync(command, args, {
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
    ...options,
  });
}

export function collectChanges(root, previous, current) {
  const fields = run(
    "git",
    [
      "log",
      "--first-parent",
      "--diff-merges=first-parent",
      "--no-renames",
      "--format=%H%x00%s%x00%b",
      "-z",
      `${previous}..${current}`,
      "--",
      ".",
    ],
    { cwd: root },
  )
    .split("\0")
    .slice(0, -1);
  const changes = [];
  for (let index = 0; index < fields.length; index += 3)
    changes.push({
      commit: fields[index],
      subject: fields[index + 1],
      body: fields[index + 2],
      labels: [],
    });
  return changes;
}

export function pullRequest(change) {
  return (
    /\s+\(#(\d+)\)$/.exec(change.subject)?.[1] ??
    /^Merge pull request #(\d+)\b/.exec(change.subject)?.[1] ??
    null
  );
}

export function loadLabels(changes, repository, execute = run) {
  const cache = new Map();
  return changes.map((change) => {
    const number = pullRequest(change);
    if (!number) return change;
    if (!cache.has(number)) {
      const text = execute(
        "gh",
        [
          "pr",
          "view",
          number,
          "--repo",
          repository,
          "--json",
          "labels",
          "--jq",
          ".labels[].name",
        ],
        { timeout: 30_000 },
      );
      cache.set(number, text.split("\n").filter(Boolean));
    }
    return { ...change, labels: cache.get(number) };
  });
}

const categories = [
  "Breaking changes",
  "Features",
  "Bug fixes",
  "Performance",
  "Documentation",
  "Other changes",
];
const labelCategories = [
  ["breaking-change", "Breaking changes"],
  ["enhancement", "Features"],
  ["bug", "Bug fixes"],
  ["documentation", "Documentation"],
];

function changeEntry(change, repository) {
  let subject = change.subject.replace(/\s+\(#\d+\)$/, "");
  if (/^Merge pull request #\d+\b/.test(subject) && change.body.trim())
    subject = change.body.trim().split("\n")[0];
  const conventional =
    /^([a-z]+)(?:\([^\r\n()]+\))?(!)?:[ \t]+([^\r\n]+)$/.exec(subject);
  let category = "Other changes";
  if (conventional) {
    category =
      {
        feat: "Features",
        fix: "Bug fixes",
        perf: "Performance",
        docs: "Documentation",
      }[conventional[1]] ?? category;
    subject = conventional[3];
  }
  if (conventional?.[2] || /^BREAKING[ -]CHANGE:/m.test(change.body))
    category = "Breaking changes";
  category =
    labelCategories.find(([label]) => change.labels.includes(label))?.[1] ??
    category;
  subject = subject.replace(/([\\`*_{}[\]<>])/g, "\\$1");
  const pr = pullRequest(change);
  const link = pr
    ? `[#${pr}](https://github.com/${repository}/pull/${pr})`
    : `[${change.commit.slice(0, 7)}](https://github.com/${repository}/commit/${change.commit})`;
  return [category, `- ${subject} (${link})`];
}

export function renderNotes({
  version,
  repository,
  previous,
  changes = [],
  manual = null,
}) {
  const current = releaseTag(version);
  if (!previous)
    return (
      (manual || "Initial release for the a13n SDK for TypeScript.") + "\n"
    );
  const sections = manual ? [manual] : [];
  sections.push("## What's Changed");
  const groups = new Map(categories.map((category) => [category, []]));
  for (const change of changes) {
    if (
      !change.labels.includes("breaking-change") &&
      change.labels.some((label) => ["chore", "skip-changelog"].includes(label))
    )
      continue;
    const [category, entry] = changeEntry(change, repository);
    groups.get(category).push(entry);
  }
  for (const [category, entries] of groups)
    if (entries.length)
      sections.push(`### ${category}\n\n${entries.join("\n")}`);
  if (![...groups.values()].some((entries) => entries.length))
    sections.push("No component-scoped changelog entries in this release.");
  sections.push(
    `**Full Changelog** (repository comparison): https://github.com/${repository}/compare/${encodeURIComponent(previous)}...${encodeURIComponent(current)}`,
  );
  return sections.join("\n\n") + "\n";
}

export function releaseCommand(version, repository, title, assets) {
  return [
    "release",
    "create",
    releaseTag(version),
    ...assets,
    "--repo",
    repository,
    "--verify-tag",
    "--title",
    title,
    ...(parseVersion(version).rc === null
      ? []
      : ["--prerelease", "--latest=false"]),
    "--notes-file",
    "-",
  ];
}
