# Send files and make stored notes available

An Agent can receive an uploaded Asset as a message part, or read a mounted Memory when it runs. These serve different purposes: Assets accompany a particular message; a Memory is stored content selected by ID. Both require access to the same workspace as your API key. Use Node.js 22.14+ so `Blob` and Fetch are available, and set the Service URL, key and Agent ID as in [setup](01-setup-and-conversations.md).

The example creates a small text Asset and a file Memory, then sends both in one new Thread:

```js
import { randomUUID } from "node:crypto";
import { createClient } from "@converge.ai/a13n";

const client = createClient({
  baseUrl: process.env.A13N_SERVICE_URL,
  auth: { type: "bearer", token: process.env.A13N_API_TOKEN },
});
try {
  const upload = await client.resources.uploads.create(
    { file: new Blob(["Revenue grew in Q2."], { type: "text/plain" }) },
    { idempotencyKey: randomUUID() },
  );
  const asset = await client.resources.assets.create({
    upload_id: upload.data.upload_id,
    name: "report.txt",
  });
  console.log("Asset ID:", asset.data.id);
  const memory = await client.resources.memories.create({
    name: `Review notes ${randomUUID()}`,
  });
  console.log("Memory ID:", memory.data.id);
  await client.resources.memories.ref(memory.data.id).files.create({
    path: "context.md",
    content: "Pay particular attention to quarter-over-quarter changes.",
  });

  const agent = client.agents.ref(process.env.A13N_AGENT_ID);
  const interaction = await agent.start(
    {
      content: [
        {
          type: "text",
          text: "Summarize the attached report using the notes.",
        },
        { type: "asset", asset_id: asset.data.id },
      ],
    },
    {
      idempotencyKey: randomUUID(),
      memories: [{ name: "notes", memory_id: memory.data.id, access: "read" }],
    },
  );
  const result = await interaction.result();
  console.log("Status:", result.status, "Thread:", interaction.thread.id);
  if (result.status === "completed") {
    console.log((await result.run.items()).data.items);
  } else console.log(result.pending ?? result.failure);
} finally {
  client.close();
}
```

A successful call reports the new Thread and Run state; a completed Run's Items are the saved display record. The Asset part is referenced by `asset_id`, not by embedding binary data in JSON. New Thread and continuation inputs both support a full message payload; `agent.send(threadId, payload, {idempotencyKey})` uses the same shape. Remember that creating content here persists resources—use disposable workspace data for experiments and manage its lifecycle explicitly.

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
  const download = await client.resources.assets
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
  const file = client.resources.memories
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
