# Contributing

Write code, documentation, commit messages, Issues and pull requests in English. Use Issues for unresolved product, architecture, compatibility and scope decisions; `spec/` contains accepted contracts, not proposals or progress. Make reviewed changes through PRs on descriptive short-lived branches from `main` with Conventional Commit titles. Draft PRs run the full CI gate; mark ready after compatibility review and resolving failures. Resolve review threads before merging. Repository governance retains the parent's squash-only merge, protected main and immutable release-tag policies.

## Development

Use Node.js 24, npm and Make. `make install` uses the committed npm lockfile. `make generate` consumes only the local pinned Service snapshot. `make check` verifies Prettier, ESLint, and TypeScript, including negative type examples. `make test` builds and runs transport, stream, notification, wire and generator tests. `make check-all` combines the full gate and npm package-content checks. No Python, Service or sibling SDK checkout is needed.

### Quality gates

After `make install`, run `make hooks-install` once to select the tracked `.githooks/` directory as this checkout's local `core.hooksPath`. This replaces any existing local hook-path setting; integrate the hook into an existing custom setup instead when needed. The executable pre-commit hook runs `npm run check` without modifying files, installing packages, or running full tests/builds. No Python or extra hook framework is required.

| Command            | Purpose                                                                 |
| ------------------ | ----------------------------------------------------------------------- |
| `make format`      | Apply Prettier formatting                                               |
| `make lint`        | Check formatting and moderate ESLint recommended rules                  |
| `make typecheck`   | Run strict no-emit tsc, including generated types and negative examples |
| `make check`       | Run the same fast checks as the commit hook                             |
| `make hooks-check` | Exercise the tracked hook without installing it                         |
| `make check-all`   | Run static checks, tests, and package-content checks                    |

ESLint covers handwritten TypeScript and JavaScript tooling/tests; Prettier alone owns style. Generated `src/schema.ts` is excluded only from ESLint, not compilation, formatting, or tests. Keep the existing NodeNext compiler settings rather than copying browser-app configuration. CI uses the same full gate independently of local hook installation. Formatters must retain the vendored-contract exclusions in `.prettierignore`; never rewrite upstream evidence to satisfy a style check.

Keep changes direct and scoped. Preserve omission/null, bounded read retries, non-replayed mutations and shared shutdown. Change generators rather than generated output. Streaming delivery does not own durable Run execution; tests must retain replay-gap and best-effort notification reconciliation behavior. Report exact results and reuse valid checks.

Generation replaces generator-owned output directly. Validation exercises the committed bindings through language-native checks and behavior tests, rather than regenerating them for byte comparison or rechecking snapshot hashes. Run `make generate` after changing inputs, templates, or generator code, review the diff, then run `make check-all`. Commit hooks remain a local convenience and are not rerun by the full gate.

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

Contract synchronization requires Git, Bash and jq. Ordinary generation and builds read the committed local inputs directly and need no Service checkout or credentials. `contract/source.json` records the source repository, full commit SHA and original paths; it is attribution, not a checksum manifest. `contract/README.md` is local guidance, not upstream evidence.

From a clean SDK branch, with the Service repository's full `origin/main` history fetched:

```bash
bash scripts/sync-contract.sh /path/to/agent-foundation FULL_40_CHARACTER_SERVICE_SHA
make generate
make check-all
```

Sync copies Git blobs, never working-tree files or executable Service code. It requires a complete main-line SHA and forward ancestry from the old pin. Missing/malformed inputs fail before writes; same-SHA retries do nothing. Inspect any interrupted local write and restore only the affected snapshot before retrying. The snapshot includes OpenAPI, both wire schemas, fixtures, API conventions, Native streaming and queue semantics. The source compare exposes runtime-only changes too. Follow recorded upstream paths for related specifications; accepted specs take precedence over inconsistent implementation.

`sync-service-contract.yml` receives Service dispatches or a manual full SHA, prepares the SDK toolchain and invokes `open-contract-pr.sh` in an ephemeral checkout. The script selects the existing rolling proposal (or current SDK `main`), copies the requested snapshot and runs `make generate`, then creates or updates a **draft PR** containing the snapshot, generated HTTP types and published OpenAPI. Only `contract/`, `src/schema.ts` and root `openapi.json` are staged. HTTP execution still uses `openapi-fetch` and local adapters. It never merges, tags or releases.

Generation failure stops before committing or pushing; discard the ephemeral checkout and retry after fixing the cause. There is no contract-only fallback. Full SDK CI runs on drafts, so compilation/test failures remain visible for maintainer adaptation. Review compatibility and generated changes, fix the generator or handwritten code as needed, regenerate and resolve CI failures before marking ready.

Each repository has at most one open automatic update PR on `sync/service-contract`. Its snapshot still records the complete immutable Service SHA. The workflow serializes updates; the script additionally compares incoming ancestry against both the accepted `main` pin and the pending proposal, so equal or older notifications never regenerate or rewind newer work. A newer source merges current SDK `main` into the proposal and appends the snapshot/generated changes without force-updating the branch. Handwritten code, templates and reviewer commits are retained; merge conflicts, failed generation and concurrent pushes stop before replacing remote work. Generated files remain generator-owned, not a place for handwritten adaptation.

The marked source block and PR title track the proposed SHA and its range from the accepted pin. Notes outside that block are preserved. New source revisions return ready PRs to draft and require fresh review; same-SHA retries preserve readiness and only reconcile metadata. If push succeeded before PR creation/editing failed, retry reuses the remote snapshot without regenerating it. Closing an unmerged rolling PR pauses automatic proposals until a maintainer reopens it.

After merge, the next update starts from SDK `main`. Normally GitHub deletes the merged branch; if it remains at exactly the recorded merged head, automation removes it with an exact-head lease only after generation succeeds, then creates the next branch without replacing a concurrently created ref. Any commits added after merge are instead retained and reviewed. A missing branch for an open PR is an error, not permission to discard reviewer work. During migration, inspect old `sync/service-contract-<SHA>` PRs for manual work and close superseded proposals only after the rolling replacement is verified.

### Setup

Install both repositories' workflows on their default branches first. Use a dedicated GitHub App installed only on Service and the four SDK repos, with Contents and Pull requests read/write. Configure variable `SERVICE_CONTRACT_APP_CLIENT_ID` and secret `SERVICE_CONTRACT_APP_PRIVATE_KEY` in those repos (or restrict an organization secret to them). Never copy a developer's OAuth token. Workflows request separate Service-read and destination-write tokens and do not persist checkout credentials. Without a client ID the job is skipped; configuration enables it without another feature flag.

Verify one known main SHA end to end before relying on notifications: dispatch, generation, draft contents, provenance and draft CI. Successful generation is not compatibility acceptance. Offline tests use temporary Git repos and fake GitHub responses; they do not prove App installation or delivery. Registry credentials and release authorization remain separate.
