# Use a same-origin browser session

Browser applications should use a signed-in Service session, not embed a workspace API key in JavaScript. Your application must be served from the **same origin** as Service (or through a correctly configured same-origin reverse proxy), have a login form, and know the workspace and Agent IDs selected for this user. Bundle the npm ESM package for your browser app; a bare package import in an unbundled HTML script will not resolve by itself.

The function below accepts login form values and selected IDs. Call it from your own UI; never hardcode the password in a source file:

```js
import { createClient } from "@converge.ai/a13n";

export async function askFromBrowser({
  email,
  password,
  workspaceId,
  agentId,
}) {
  const client = createClient({
    baseUrl: location.origin,
    auth: { type: "session", workspaceId },
  });
  try {
    const login = await client.resources.auth.login({ email, password });
    client.setCsrfToken(login.data.csrf_token);
    const interaction = await client.agents.ref(agentId).start("Hello", {
      idempotencyKey: crypto.randomUUID(),
    });
    const result = await interaction.result();
    if (result.status !== "completed") {
      return {
        status: result.status,
        pending: result.pending,
        failure: result.failure,
      };
    }
    const committed = await result.run.items();
    return { status: result.status, items: committed.data.items };
  } finally {
    client.close();
  }
}
```

A signed-in user with permission should see a `completed` status and committed Items, or a distinct `waiting`/failure state to display appropriately. The SDK sends session cookies with same-origin requests and attaches `X-CSRF-Token` to protected mutations after `setCsrfToken`. It attaches `X-Workspace-ID` only to operations declaring workspace scope. A session caller must select a workspace; `client.setWorkspaceId(id)` can change that selection, while a conflicting explicitly supplied workspace header is rejected instead of silently overwritten.

Do not assume a login makes organization administration available. Public and organization-wide routes are not automatically given a workspace header; grants are still enforced by Service. Node.js session configuration does not create a browser cookie jar, and `client.close()` does not sign the user out of Service—it only closes SDK-local work. If your app needs logout, call the declared `client.resources.auth.logout()` route and handle its session lifecycle intentionally. For HTTP permissions and errors, see [recovery](07-errors-and-recovery.md).
