import { component, prepareVersion } from "./release.mjs";

const [selected, version, ...extra] = process.argv.slice(2);
if (selected !== component || !version || extra.length)
  throw new Error(
    `Usage: node scripts/prepare-release-version.mjs ${component} <version>`,
  );
const changed = prepareVersion(process.cwd(), version);
console.log(
  `Prepared ${selected} version ${version}: ${changed.join(", ") || "no files changed"}`,
);
