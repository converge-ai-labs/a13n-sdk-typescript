import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** A real Chromium session on the disposable Service origin, importing actual built SDK modules. */
for (const name of [
  "A13N_SERVICE_URL",
  "A13N_WORKSPACE",
  "A13N_AGENT",
  "A13N_BROWSER_EMAIL",
  "A13N_BROWSER_PASSWORD",
])
  if (!process.env[name]) throw new Error(`${name} is required`);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const email = process.env.A13N_BROWSER_EMAIL;
const password = process.env.A13N_BROWSER_PASSWORD;
const command = (args, input) => {
  const result = spawnSync(
    "agent-browser",
    ["--session", "ts-sdk-browser", "--ignore-https-errors", ...args],
    {
      input,
      encoding: "utf8",
      timeout: 60_000,
    },
  );
  if (result.error) throw result.error;
  if (result.status !== 0)
    throw new Error(`Browser operation failed: ${result.stderr.trim()}`);
  return result.stdout.trim();
};
// Import URLs are self-contained so Chrome loads the actual emitted ESM without CDN, proxy or test doubles.
const modules = new Map();
function moduleUrl(filename) {
  if (modules.has(filename)) return modules.get(filename);
  const source = readFileSync(filename, "utf8");
  const transformed = source.replace(
    /\bfrom\s+"([^"]+)"/g,
    (_match, specifier) => {
      const dependency =
        specifier === "openapi-fetch"
          ? join(root, "node_modules/openapi-fetch/dist/index.mjs")
          : resolve(dirname(filename), specifier);
      return `from ${JSON.stringify(moduleUrl(dependency))}`;
    },
  );
  const value = `data:text/javascript;base64,${Buffer.from(transformed).toString("base64")}`;
  modules.set(filename, value);
  return value;
}
try {
  command([
    "open",
    `${process.env.A13N_SERVICE_URL}/api/v1/auth/configuration`,
  ]);
  const code = `(async () => { const result = await (async () => {
    const { createClient } = await import(${JSON.stringify(moduleUrl(join(root, "dist/index.js")))});
    const login = await fetch('/api/v1/auth/login', {
      method: 'POST', credentials: 'same-origin', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: ${JSON.stringify(email)}, password: ${JSON.stringify(password)}}),
    });
    if (login.status !== 200) throw new Error('Browser login HTTP ' + login.status);
    const csrf = (await login.json()).csrf_token;
    if (typeof csrf !== 'string') throw new Error('Browser login missing CSRF token');
    const client = createClient({baseUrl: location.origin, auth: {type: 'session'}});
    try {
      client.setCsrfToken(csrf);
      const session = await client.http.GET('/api/v1/auth/session');
      if (session.response.status !== 200) throw new Error('Browser session unavailable');
      const workspace = client.workspaces.ref(${JSON.stringify(process.env.A13N_WORKSPACE)});
      const result = await workspace.agents.ref(${JSON.stringify(process.env.A13N_AGENT)}).start(
        'Reply briefly to this browser SDK probe.', {idempotencyKey: ${JSON.stringify(`ts-browser-${randomUUID()}`)}}
      );
      if (result.response.status !== 201 || !result.data.run) throw new Error('Browser managed submission failed');
      const run = await workspace.runs.ref(result.data.run.id).wait({timeoutMs: 30000, pollIntervalMs: 250});
      if (run.data.status !== 'completed') throw new Error('Browser Run did not complete: ' + run.data.status);
      const items = await workspace.runs.ref(result.data.run.id).items();
      if (!Array.isArray(items.data.items)) throw new Error('Browser Run Items unavailable');
      return {login: login.status, session: session.response.status, submission: result.response.status, run: run.data.status, items: items.data.items.length};
    } finally { client.close(); }
  })(); return result; })()`;
  const response = command(["eval", "--stdin"], code);
  assert.match(response, /"submission"\s*:\s*201/);
  assert.match(response, /"run"\s*:\s*"completed"/);
  console.log(`Browser session acceptance passed: ${response}`);
} finally {
  try {
    command(["close"]);
  } catch {
    /* Browser may have failed before startup. */
  }
}
