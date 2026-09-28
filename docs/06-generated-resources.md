# Manage resources with ETags and pages

The Agent workflow handles ordinary conversations; `client.resources` exposes the complete typed Service API for administration, files, providers and specialized actions. Business collections such as `agents`, `threads`, `models` and `memories` live at the root. `workspaces.ref(id)` and `organizations.ref(id)` manage those entities specifically—they do not wrap every business request. Each call still needs suitable Service grants.

## Create an Agent

Obtain an enabled **Model key** and Agent-creation permission from your administrator or Console. An Agent is subsequently addressed by **ID**. This example creates an Agent, reads its ETag, conditionally renames it, then reads one page of Agents:

```js
import { randomUUID } from "node:crypto";
import { createClient } from "@converge.ai/a13n";

if (!process.env.A13N_MODEL_KEY)
  throw new Error("Set an enabled A13N_MODEL_KEY.");
const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
try {
  const created = await client.resources.agents.create({
    name: `Reviewer ${randomUUID()}`,
    config: {
      model: process.env.A13N_MODEL_KEY,
      instructions: "Review clearly.",
    },
  });
  const agent = client.resources.agents.ref(created.data.id);
  const current = await agent.get();
  const ifMatch = current.response.headers.get("ETag");
  if (!ifMatch) throw new Error("Agent read did not include an ETag.");
  const updated = await agent.update({ name: "Reviewer II" }, { ifMatch });
  console.log("Agent ID:", updated.data.id, "HTTP:", updated.response.status);

  for await (const page of client.resources.agents.pages({
    query: { limit: 10 },
  })) {
    console.log(
      "Agent IDs:",
      page.data.items.map((item) => item.id),
    );
    break; // Remove this line to visit every page.
  }
} finally {
  client.close();
}
```

Run it with `A13N_SERVICE_URL`, `A13N_API_TOKEN` and `A13N_MODEL_KEY`; it creates a real Agent. A successful update returns an Agent representation and HTTP metadata; pages retain their response metadata and cursor, while `.items()` would flatten item records. Agent/Skill references use IDs, but `config.model` uses a Model **key**. Persist the Agent ID if you want to run it with [Agent.start](01-setup-and-conversations.md). Use a disposable workspace for examples that create resources.

Conditional writes need the **ETag of the object being changed**. A stale precondition raises HTTP `412`; read the current state and reconcile, rather than automatically overwriting another writer. Memory files use file ETags; Thread inbox and mount changes use the Thread ETag. File Memory revisions use integer sequence selectors, and restoring a creation can return `file: null`. See [files and Memory](04-files-and-memory.md).

JSON calls return `{data,response}` for status, headers and request IDs. Binary downloads and raw SSE calls instead own an unbuffered `{body,response,close()}`: consume or close it in `finally`. For example, `client.resources.assets.ref(assetId).content.get()` returns a body you can stream without buffering the entire file. The raw Thread-wide stream at `threads.ref(threadId).stream.get({lastEventId,signal})` is lower-level than [finite Agent streaming](02-streaming-and-readback.md); the caller owns cursor application and committed readback.

Generated request bodies retain wire names and omission-versus-null behavior. For a typed per-Run configuration change, see the [instructions override in the conversation example](01-setup-and-conversations.md#limit-a-configuration-change-to-one-run); a replacement override differs from editing a stored Agent revision. The SDK does not infer provider policy from submitted options. The [pinned OpenAPI](../openapi.json) and [SDK specification](../spec/README.md) describe the remaining specialized routes. The removed Service secret resource is not available, although provider credentials and authentication still exist.
