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
  fetch: async (request) => {
    const url = new URL(request.url);
    assert.equal(url.pathname, "/api/v1/runs/run_example/items");
    assert.equal(url.searchParams.get("limit"), "1");
    const historical = url.searchParams.has("before");
    if (historical) assert.equal(url.searchParams.get("before"), "3");
    return Response.json({
      run: { id: "run_example", status: "completed", display_position: null },
      items: historical ? [{ ordinal: 2 }] : [{ ordinal: 3 }, { ordinal: 4 }],
      baseline: !historical,
      continuation: historical ? null : { run_id: "run_example", next_ordinal: 5, position: { attempt: 1, sequence: 4 }, fragments: { pending: { fragment: { count: 2, parts: ["partial"] } } }, observer: { state: { children: { child: { children: { grandchild: { request_index: 3 } } } } } } },
      position: historical ? null : "1-4", resume_after: null, complete: true,
    });
  },
});
const baseline = (await client.runs.ref("run_example").items({ query: { limit: 1 } })).data;
assert.equal(baseline.baseline, true);
assert.equal(baseline.items.length, 2);
assert.equal(baseline.continuation.observer.state.children.child.children.grandchild.request_index, 3);
const history = (await client.runs.ref("run_example").items({ query: { before: 3, limit: 1 } })).data;
assert.equal(history.baseline, false);
assert.equal(history.position, null);
assert.equal(history.continuation, null);
assert.equal(history.complete, true);
assert.equal(typeof client.agents.ref("agt_example").start, "function");
assert.equal(typeof client.agents.ref("agt_example").send, "function");
assert.equal(typeof client.resources.threads.create, "function");
assert.equal(typeof client.resources.organizations.ref("org_example").get, "function");
assert.equal(typeof client.resources.healthz.get, "function");
assert.equal(typeof client.resources.uploads.create, "function");
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
  type components,
} from "@converge.ai/a13n";

const client: Client = createClient({
  baseUrl: "https://service.example.test",
  auth: { type: "bearer", token: "test-token" },
});
const organization = client.resources.organizations.ref("org_example");
void client.resources.runs.ref("run_example").get;
void client.resources.threads.pages({ query: { limit: 10 } });
void organization.get;
void client.resources.modelProviders.list;
void client.resources.memories.pages({ query: { label: ["a"] } });
void client.resources.assets.ref("asset").content.get;
// @ts-expect-error Revision selectors retain their numeric contract in the published package.
client.resources.memories.ref("memory").revisions.ref("1");
async function example() {
  const agent = client.agents.ref("agt_example");
  const interaction = await agent.start("Hello", { idempotencyKey: "start-1", options: { configuration: { allowed_hosts: null, extensions: { "app.example/sdk": { enabled: false, nested: [null, {}, []] } } }, overrides: { model_settings: { extra_body: {}, extra_headers: {} } } } });
  for await (const event of interaction) {
    if (event.frame.type === "delta" && event.frame.data.item) {
      const ordinal: number | null | undefined = event.frame.data.item.ordinal;
      const group: string | null | undefined = event.frame.data.item.response_group;
      const failure: Record<string, unknown> | null | undefined = event.frame.data.item.failure;
      void ordinal; void group; void failure;
    }
    if (event.frame.type === "gap") {
      const target: string | null | undefined = event.frame.data.position;
      void target;
    }
  }
  const outcome = await interaction.result();
  void outcome.output;
  const display = (await outcome.run.items({ query: { limit: 1 } })).data;
  await outcome.run.items({ query: { before: 3, limit: 20 } });
  await client.resources.runs.ref(outcome.run.id).items.get({ query: { after: 0, limit: 500 } });
  const continuation: components["schemas"]["DisplayContinuation"] = {
    run_id: "run_example", next_ordinal: 3, position: { attempt: 1, sequence: 2 },
    fragments: { pending: { fragment: { count: 2, parts: ["partial"] } } },
    observer: { state: { children: { child: { children: { grandchild: { parts: { part: { kind: "text", part_id: "message" } } } } } } } },
  };
  void continuation;
  // @ts-expect-error Items ordinal windows are not generic cursor collections.
  await outcome.run.items({ query: { cursor: "opaque" } });
  // @ts-expect-error Removed display-loss field is not part of the new contract.
  void display.dropped;
  // @ts-expect-error The Thread has a last seal, not an earlier successful head.
  void (await interaction.thread.get()).data.head_run_id;
  const hint: string | null | undefined = display.resume_after;
  void hint;
  if (display.baseline && display.position !== null) {
    const raw = await client.resources.threads.ref(interaction.thread.id).stream.get({
      query: { run: outcome.run.id, position: display.position },
      ...(display.resume_after ? { lastEventId: display.resume_after } : {}),
    });
    await raw.close();
  }
  const config: components["schemas"]["ModelConfig-Input"] = {
    model_name: "native", model_api: "openai.responses",
    settings: { reasoning_effort: "high", native: { values: [1, null, false] } },
  };
  config.characteristics = { image_input: null, video_input: { max_video_bytes: 1048576 }, url_input: { video: ["youtube"] } };
  void config;
  const provider = client.resources.modelProviders.ref("provider");
  const status: ResourceResult<components["schemas"]["AuthorizationStatus"]> = await provider.authorization.get();
  const started: ResourceResult<components["schemas"]["AuthorizationStart"]> = await provider.authorize({ new_registration: false });
  await provider.authorization.callback({ attempt_id: started.data.attempt_id, callback_url: "https://service.example.test/operator/callback?code=opaque" });
  const disconnected: ResourceResult<components["schemas"]["AuthorizationDisconnect"]> = await provider.authorization.delete();
  const models: ResourceResult<components["schemas"]["ChatGPTModel"][]> = await provider.models.get();
  void status; void disconnected; void models;
  // @ts-expect-error Native configuration is nested in Run options, not a new SDK parameter.
  await agent.start("Wrong", { idempotencyKey: "wrong", configuration: {} });
  const followup = await agent.send(interaction.thread.id, "Next", { idempotencyKey: "next-1", options: { configuration: {} } });
  followup.close();
}
void example;
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
