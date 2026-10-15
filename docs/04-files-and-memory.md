# Send files and make stored notes available

An Agent can receive an uploaded Asset as a message part, or read a mounted Memory when it runs. These serve different purposes: Assets accompany a particular message; a Memory is stored content selected by ID. Both require access to the same workspace as your API key. Use Node.js 22.14+ so `Blob` and Fetch are available, and set the Service URL, key and Agent ID as in [setup](01-setup-and-conversations.md).

The example creates a small text Asset and a file Memory, then sends both in one new Thread:

```js
import { randomUUID } from "node:crypto";
import { createClient, asset as assetPart, text } from "@converge.ai/a13n";

const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
try {
  const upload = await client.api.uploads.create(
    { file: new Blob(["Revenue grew in Q2."], { type: "text/plain" }) },
    { idempotencyKey: randomUUID() },
  );
  const asset = await client.api.assets.create({
    upload_id: upload.data.upload_id,
    name: "report.txt",
  });
  console.log("Asset ID:", asset.data.id);
  const memory = await client.api.memories.create({
    name: `Review notes ${randomUUID()}`,
  });
  console.log("Memory ID:", memory.data.id);
  await client.api.memories.ref(memory.data.id).files.create({
    path: "context.md",
    content: "Pay particular attention to quarter-over-quarter changes.",
  });

  const agent = client.agents.ref(process.env.A13N_AGENT_ID);
  const interaction = await agent.start(
    [
      text("Summarize the attached report using the notes."),
      assetPart(asset.data.id),
    ],
    {
      idempotencyKey: randomUUID(),
      memories: [{ name: "notes", memory_id: memory.data.id, access: "read" }],
    },
  );
  const result = await interaction.result();
  console.log("Status:", result.status, "Thread:", interaction.thread.id);
  if (result.status === "completed") {
    console.log(result.text ?? result.output);
  } else console.log(result.pending ?? result.failure);
} finally {
  client.close();
}
```

A successful call reports the new Thread and Run state; a completed Run's output is authoritative without an Items request. Items remain available for advanced committed display. The Asset part is referenced by `asset_id`, not by embedding binary data in JSON. New Thread and continuation inputs both support a full message payload; `agent.send(threadId, payload, {idempotencyKey})` uses the same shape. Remember that creating content here persists resources—use disposable workspace data for experiments and manage its lifecycle explicitly.

## Download the Asset you just created

Set `A13N_ASSET_ID` to the printed ID from the first example and save this as `download.mjs`. This bounded text example decodes bytes from the SDK's unbuffered body. For large or non-text files, stream chunks to a destination instead of accumulating a string. Always close the download, including if reading fails:

```js
import { createClient } from "@converge.ai/a13n";

if (!process.env.A13N_ASSET_ID) throw new Error("Set A13N_ASSET_ID.");
const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
try {
  const download = await client.api.assets
    .ref(process.env.A13N_ASSET_ID)
    .content.get();
  try {
    const reader = download.body.getReader();
    const decoder = new TextDecoder();
    let text = "";
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
      }
      text += decoder.decode();
    } finally {
      reader.releaseLock();
    }
    console.log("Downloaded report:", text);
  } finally {
    await download.close();
  }
} finally {
  client.close();
}
```

You should see `Revenue grew in Q2.`. The download returns a `body`, HTTP `response` and `close()`; it is not a buffered JSON result. Closing it locally does not delete the Asset.

## Read and conditionally edit the Memory file

Set `A13N_MEMORY_ID` to the ID printed earlier and save this as `edit-memory.mjs`. The file's ETag from the **read response** is the precondition for `replace()`; the Memory object's ETag is not interchangeable. This example changes stored content, so run it against a disposable Memory.

```js
import { createClient } from "@converge.ai/a13n";

if (!process.env.A13N_MEMORY_ID) throw new Error("Set A13N_MEMORY_ID.");
const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
try {
  const file = client.api.memories
    .ref(process.env.A13N_MEMORY_ID)
    .files.ref("context.md");
  const current = await file.get();
  const ifMatch = current.response.headers.get("ETag");
  if (!ifMatch) throw new Error("File read did not include an ETag.");
  console.log("Current notes:", current.data.content);
  const updated = await file.replace(
    { content: `${current.data.content}\nCheck unusual one-time charges.` },
    { ifMatch },
  );
  console.log("Updated notes:", updated.data.content);
} finally {
  client.close();
}
```

If another writer has changed the file, Service returns HTTP `412`; reread and decide whether your intended edit still applies instead of overwriting it blindly. A repeat execution adds the note again unless you adapt this example for your actual edit. File Memory revisions use integer sequence selectors, and restoring a creation can remove the file (`file: null`). Provider-backed Memory records instead support search/create/replace/delete, not these file-path operations. See [resource management and CAS](06-generated-resources.md).

## Share Memory through a Session Space binding

A Memory Space owns a managed PostgreSQL file Memory. Select it through `Session.memory`, then start the business Thread in that Session. This fragment creates persistent resources using the configured client and Agent:

```js
const space = await client.api.memorySpaces.create({
  name: "Team notes",
  organization: { enabled: false },
});
const session = await client.api.sessions.create({
  memory: {
    enabled: true,
    spaces: [{ name: "team", space_id: space.data.id, access: "read" }],
  },
});
const interaction = await agent.start("Use the team notes when relevant.", {
  sessionId: session.data.id,
});
try {
  const result = await interaction.result();
  console.log(result.snapshot.data.memory_mounts);
} finally {
  await interaction.close();
}
```

The first accepted business Run settles omitted Agent Memory defaults on the Session; later Agent changes and child/fork execution keep that selection. An explicit `{enabled:false,spaces:[]}` disables it. Session edits require the Session ETag. For an enabled Space, Service freezes `global/` and `sessions/{sessionId}/` roots in `RunView.memory_mounts`; the typed union retains optional `roots` and `space_id`. These are host-resolved readback fields, not request `MemoryMount` fields. Subsequent Space or Session edits do not change the accepted Run's mounts. Managed backing memories are accessed through their Space and existing file/revision APIs; select the Space rather than mounting its backing Memory directly. Space deletion requires no Session bindings and no unsealed Run retaining its mount.

Organization has its own status and execution lifecycle:

```js
const space = client.api.memorySpaces.ref(spaceId);
const current = await space.organization.get();
console.log(current.data.pending, current.data.active_run_id);
// Explicitly request organization after configuring an authorized Model key.
const requested = await space.organizations.create();
console.log(requested.response.status, requested.data.pending); // HTTP 202
for await (const page of space.organizations.pages()) {
  console.log(page.data.items);
  break;
}
```

Use an authorized `spaceId` whose organization policy has a Model configured. HTTP 202 accepts/coalesces a request; a Run might not exist yet. Read `organization.get()` for progress and observe an exact Run only when `active_run_id` or `last_run_id` names one. Organization executes in a separate `memory_organization` Session using the built-in `memory_organizer` Agent. Its status changes independently of the Space configuration ETag. Automatic `check_interval_seconds` (minimum 10) and `cooldown_seconds` (minimum 0) are minimum delays, and `change_count` counts external saved mutations, excluding no-ops and organizer writes. Manual requests bypass these timing/threshold checks and still require current authority. Service owns scheduling, completion and progress; the SDK sends the native action once.

## Native image and video input

Use root public constructors for media: `url(sourceUrl)` for a URL or `asset(assetId)` for uploaded content. Strings, `text(value)` and `json(value)` can share the same ordered input array; a structural native MessagePayload remains supported. `start()`, `send()` and atomic resume `input` preserve the whole payload, including order and duplicates. These are Service input parts, not AG-UI output `ImagePart`/`VideoPart` values.

A Model's `config.characteristics` selects native preparation policy. This fragment conditionally updates an existing Model; `modelId` and `ifMatch` must come from your authorized Model selection and current ETag:

```js
await client.api.models.ref(modelId).update(
  {
    config: {
      model_name: "your-native-model",
      model_api: "openai.responses",
      characteristics: {
        image_input: {
          max_images: 20,
          support_gif: false,
          split_large_images: false,
        },
        video_input: { max_video_bytes: 10485760 },
        url_input: { video: [] },
      },
    },
  },
  { ifMatch },
);
```

Select the calling API and limits for your actual model rather than copying these values blindly. Omitted `image_input` uses native defaults; `image_input:null` disables automatic preparation. `max_images:0` removes image input, while zero image byte/dimension limits disable those specific limits. Video's positive byte budget applies to both one video and the aggregate Base64-after request; native URL subtype support currently includes `youtube` and is not a promise that any URL is usable. Service/Harness owns downloads, redirects, image transformations, video materialization, MIME checks, hostname/TLS enforcement and byte budgets. The SDK neither downloads submitted URLs nor coerces unsupported media into text.

## Interpret Memory source evidence

Raw assistant message-END ItemRefs can carry optional nullable `memory_sources`; committed reply Items expose the same evidence in `content.memory_sources`. Sources identify automatic record recall or file-context delivery, not proven answer citations or content snapshots. END is provisional until the ordinary checkpoint boundary. Lists preserve omission, null, empty arrays, cursors, per-source status and truncation; old snapshots receive no invented defaults. Full source content remains in the Memory or execution archive.

Provider-backed record list/search/create/replace responses expose nullable `provenance` with `created`, `last_write` and `content_matches`. The sources identify platform-confirmed writes with nullable Run/attempt/tool-call and current principal-name fields. Creation can be unknown even when a later write is known. Attribution is best-effort and separate from provider content: a mismatch means the indexed source may no longer describe current text, while a match does not rule out external edits. It is not extraction rationale, source-message citation or a record version/ETag. Validate source interpretation in the application and retain the provider's native content.
