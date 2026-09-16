import { existsSync, readFileSync, statSync } from "node:fs";
import {
  component,
  tagPrefix,
  releaseTag,
  previousTag,
  collectChanges,
  loadLabels,
  renderNotes,
  releaseCommand,
  run,
} from "./release.mjs";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const [selected, version, title, ...assets] = args.filter(
  (arg) => arg !== "--dry-run",
);
if (selected !== component || !version || !title)
  throw new Error(
    `Usage: node scripts/create-github-release.mjs ${component} <version> <title> [assets...] [--dry-run]`,
  );
const repository = process.env.GITHUB_REPOSITORY;
if (!repository) throw new Error("Missing GITHUB_REPOSITORY");
const tag = releaseTag(version);
if (!dryRun && process.env.GITHUB_REF_NAME !== tag)
  throw new Error(`Expected release tag ${tag}`);
const tags = run("git", [
  "tag",
  "--merged",
  tag,
  "--list",
  `${tagPrefix}*`,
]).split("\n");
if (!tags.includes(tag)) throw new Error(`Missing release tag ${tag}`);
for (const asset of assets)
  if (!statSync(asset).isFile())
    throw new Error(`Not a release asset: ${asset}`);
const previous = previousTag(version, tags);
const path = `.github/release-notes/${component}/${version}.md`;
const manual = existsSync(path) ? readFileSync(path, "utf8").trim() : null;
const changes = loadLabels(
  previous ? collectChanges(process.cwd(), previous, tag) : [],
  repository,
);
const notes = renderNotes({ version, repository, previous, manual, changes });
if (dryRun) process.stdout.write(notes);
else
  process.stdout.write(
    run("gh", releaseCommand(version, repository, title, assets), {
      input: notes,
    }),
  );
