# Contributing

Write code, documentation, commit messages, Issues and pull requests in English. Use Issues for unresolved product, architecture, compatibility and scope decisions; `spec/` contains accepted contracts, not proposals or progress. Make reviewed changes through PRs on descriptive short-lived branches from `main` with Conventional Commit titles. Draft PRs skip code CI; ready PRs receive checks. Resolve review threads before merging. Repository governance retains the parent's squash-only merge, protected main and immutable release-tag policies.

## Development

Use Node.js 24, npm and Make. `make install` uses the committed npm lockfile. `make generate` consumes only the local pinned Service snapshot; `make generated-check` compares generated types and the published OpenAPI without updating them. `make check` verifies formatting and TypeScript, including negative type examples. `make test` builds and runs transport, stream, notification, wire and generator tests. `make check-all` combines the full gate and npm package-content checks. No Python, Service or sibling SDK checkout is needed.

Keep changes direct and scoped. Preserve omission/null, bounded read retries, non-replayed mutations and shared shutdown. Change generators rather than generated output. Streaming delivery does not own durable Run execution; tests must retain replay-gap and best-effort notification reconciliation behavior. Report exact results and reuse valid checks.

## Releases

Source versions remain `0.0.0`. Tag a main-line commit whose required CI passed with `release/a13n/typescript/<version>`. Versions use stable `X.Y.Z` or `X.Y.Z-rc.N` (positive N, no leading zeroes). Release preparation injects the version only into the ephemeral checkout; do not commit release-only bumps. Release tags are immutable.

The package remains `@converge.ai/a13n`. RC versions publish to the npm `rc` dist-tag and never advance `latest`. Stable publication must not regress an existing stable latest version. The `sdk-typescript-npm` environment and npm trusted publisher must authorize this repository and `release-a13n-typescript.yml`; copying GitHub rules does not transfer npm trust. Actual publication requires separate maintainer authorization; a local pack is not a remote release.

### Release operations

The release workflow verifies that the tagged commit is an ancestor of `origin/main` and that its latest push-triggered `ci.yml` run on `main` completed successfully. It fails rather than waiting for CI or silently using an older successful attempt. Rerun a blocked release only after CI succeeds. This read-only check uses `actions: read`; it does not replace branch protection or rerun the full test suite. Local tests for this boundary require Git, Bash and jq and use a fake GitHub CLI response, not production credentials.

Version preparation and artifact builds operate in ephemeral checkouts. Do not commit their modified manifests/lockfiles. Release tags are immutable, and a retry must retain the same tag and source commit. Publication is not transactional across registry and GitHub: an earlier job may have published before a later job failed. Inspect the registry, tags, artifacts and workflow result before rerunning; do not move tags or assume every publish step is idempotent.

Changelogs use first-parent history scoped to this repository and select only ancestor tags from the same release channel. RCs compare against an earlier RC for the same target, otherwise the preceding stable; stable releases compare against the preceding stable. PR labels classify and omit entries with a Conventional Commit fallback. Curated `.github/release-notes/COMPONENT/VERSION.md` notes are optional. Preview an existing, locally fetched tag without publishing (GitHub PR-label reads still require `gh` authentication):

```bash
GITHUB_REPOSITORY=converge-ai-labs/a13n-sdk-typescript \
  node scripts/create-github-release.mjs a13n-typescript 1.2.3 "a13n SDK 1.2.3" --dry-run
```

The first channel release uses initial or curated notes rather than attributing extracted monorepo history to this repository's PR numbers. RC GitHub Releases explicitly avoid `latest`. Repository privacy is separate from package visibility: registry publication can expose the package even when its source repository remains private.

Trusted Publishing must bind the `@converge.ai/a13n` package to `converge-ai-labs/a13n-sdk-typescript`, workflow `release-a13n-typescript.yml`, and environment `sdk-typescript-npm`. Configure this connection in the package's npm settings; copying GitHub Actions settings does not configure npm trust. The stable guard reads npm dist-tags, rejects equal/older latest versions, and fails on registry/auth/network uncertainty; only an explicit missing-package response or an absent latest tag permits first stable publication. RC publication always uses `--tag rc`.

## Service contract updates

Contract tooling requires Git, Bash, jq and `shasum`. Ordinary builds need no Service checkout or credentials. Generation verifies the local manifest and hashes before reading the snapshot; `contract/README.md` is local guidance, not upstream evidence.

From a clean SDK branch, with the Service repository's full `origin/main` history fetched:

```bash
bash scripts/sync-contract.sh /path/to/agent-foundation FULL_40_CHARACTER_SERVICE_SHA
make generate
make check-all
```

Sync copies Git blobs, never working-tree files or executable Service code. It requires a complete main-line SHA, forward ancestry from the old pin, and byte-accurate old provenance. Missing/malformed inputs fail before writes; same-SHA retries do nothing. Inspect any interrupted local write and restore only the affected snapshot before retrying. The snapshot includes OpenAPI, both wire schemas, fixtures, API conventions, Native streaming and queue semantics. The source compare exposes runtime-only changes too. Follow recorded upstream paths for related specifications; accepted specs take precedence over inconsistent implementation.

`sync-service-contract.yml` receives Service dispatches or a manual full SHA and opens a **draft PR** containing the snapshot. Maintainers generate, adapt and test, then mark it ready for ordinary CI and review. It never merges, tags or releases. Each SHA has one branch; retries preserve existing open/closed PRs and reviewer edits. If push succeeded before PR creation failed, a retry creates the missing draft without rewriting the branch. Run `open-contract-pr.sh` only in an ephemeral CI checkout.

### Setup

Install both repositories' workflows on their default branches first. Use a dedicated GitHub App installed only on Service and the four SDK repos, with Contents and Pull requests read/write. Configure variable `SERVICE_CONTRACT_APP_CLIENT_ID` and secret `SERVICE_CONTRACT_APP_PRIVATE_KEY` in those repos (or restrict an organization secret to them). Never copy a developer's OAuth token. Workflows request separate Service-read and destination-write tokens and do not persist checkout credentials. Without a client ID the job is skipped; configuration enables it without another feature flag.

Verify one known main SHA end to end before relying on notifications: dispatch, draft, provenance, adaptation and ready-PR CI. Source import is not compatibility acceptance. Offline tests use temporary Git repos and fake GitHub responses; they do not prove App installation or delivery. Registry credentials and release authorization remain separate.
