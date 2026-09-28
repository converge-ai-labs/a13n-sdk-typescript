import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createClient, ProtocolError, ApiError } from "../dist/index.js";
import { resourceModel } from "../resources.mjs";

const document = JSON.parse(
  await readFile(new URL("../contract/openapi.json", import.meta.url), "utf8"),
);
const model = resourceModel(document);
const camel = (value) =>
  value.replace(/[-_]([a-z])/g, (_, letter) => letter.toUpperCase());
const selection = (name) =>
  name === "seq" ? 7 : name === "kind" ? "memory" : "part /雪%";
const options = (fetch) => ({
  baseUrl: "https://service.test/proxy",
  auth: { type: "bearer", token: "test" },
  maxReadRetries: 0,
  fetch,
});
function bound(client, segments) {
  let resource = client.resources;
  for (const segment of segments)
    resource = segment.startsWith("{")
      ? resource.ref(selection(segment.slice(1, -1)))
      : resource[camel(segment)];
  return resource;
}

test("every pinned operation and successful status is callable through static resources", async () => {
  const expected = Object.entries(document.paths).flatMap(([path, item]) =>
    Object.entries(item)
      .filter(([, op]) => op.operationId)
      .map(([verb]) => `${verb} ${path}`),
  );
  assert.deepEqual(
    model.operations.map((op) => `${op.verb} ${op.path}`).sort(),
    expected.sort(),
  );
  let count = 0;
  for (const op of model.operations) {
    for (const [status, response] of op.success) {
      let called = 0;
      const json = response.content?.["application/json"];
      const hasContent = Object.keys(response.content ?? {}).length > 0;
      const client = createClient(
        options(async (request) => {
          called++;
          assert.equal(request.method, op.verb.toUpperCase(), op.operationId);
          const url = new URL(request.url);
          const path = op.path.replace(/\{([^}]+)\}/g, (_, key) =>
            encodeURIComponent(String(selection(key))),
          );
          assert.equal(url.pathname, `/proxy${path}`, op.operationId);
          assert.equal(request.headers.get("authorization"), "Bearer test");
          for (const header of op.parameters.filter((p) => p.in === "header"))
            assert.equal(request.headers.get(header.name), "example-header");
          for (const parameter of op.parameters.filter((p) => p.in === "query"))
            assert.equal(url.searchParams.get(parameter.name), "example-query");
          const media = Object.keys(op.requestBody?.content ?? {});
          if (media.includes("application/json"))
            assert.deepEqual(await request.json(), { explicit: null });
          else if (media.includes("multipart/form-data")) {
            const form = await request.formData();
            assert.equal(await form.get("file").text(), "upload");
            assert.match(
              request.headers.get("content-type"),
              /^multipart\/form-data; boundary=/,
            );
          } else if (media.length) {
            assert.equal(request.headers.get("content-type"), media[0]);
            assert.equal(await request.text(), "upload");
          } else assert.equal(await request.text(), "");
          return new Response(
            hasContent
              ? json
                ? JSON.stringify({ operation: op.operationId, nullable: null })
                : "bytes"
              : null,
            {
              status: Number(status),
              headers: {
                "Content-Type": json
                  ? "application/json"
                  : (Object.keys(response.content ?? {})[0] ??
                    "application/octet-stream"),
                ETag: '"v1"',
                "X-Request-ID": "req-test",
              },
            },
          );
        }),
      );
      const resource = bound(client, (op.owner ?? op.node).segments);
      assert.equal(called, 0, "binding is local");
      const callOptions = {
        query: Object.fromEntries(
          op.parameters
            .filter((p) => p.in === "query")
            .map((p) => [p.name, "example-query"]),
        ),
        ...Object.fromEntries(
          op.parameters
            .filter((p) => p.in === "header")
            .map((p) => [camel(p.name.toLowerCase()), "example-header"]),
        ),
      };
      const media = Object.keys(op.requestBody?.content ?? {});
      const args = [];
      if (media.includes("application/json"))
        args.push({ explicit: null, omitted: undefined });
      else if (media.includes("multipart/form-data"))
        args.push({ file: new Blob(["upload"]) });
      else if (media.length) {
        args.push(new Blob(["upload"]));
        callOptions.contentType = media[0];
      }
      args.push(callOptions);
      const result = await resource[op.method](...args);
      assert.equal(called, 1, `${op.operationId} dispatches once`);
      assert.equal(result.response.status, Number(status));
      assert.equal(result.response.headers.get("ETag"), '"v1"');
      if (json)
        assert.deepEqual(result.data, {
          operation: op.operationId,
          nullable: null,
        });
      else if (hasContent) {
        assert.equal(await new Response(result.body).text(), "bytes");
        await result.close();
        assert.equal(result.closed, true);
      } else assert.equal(result.data, undefined);
      client.close();
      count++;
    }
  }
  assert.ok(count >= expected.length);
});

test("generated pagination is lazy, snapshots repeated filters and retains response evidence", async () => {
  const urls = [];
  const client = createClient(
    options(async (request) => {
      urls.push(new URL(request.url));
      return Response.json(
        {
          items: [{ id: `item-${urls.length}` }],
          next_cursor: urls.length === 1 ? "next" : null,
        },
        { headers: { "X-Request-ID": `req-${urls.length}` } },
      );
    }),
  );
  const query = { label: ["team:a", "scope:b"] };
  const pages = client.resources.memories.pages({ query });
  query.label.push("changed");
  assert.equal(urls.length, 0);
  const first = await pages.next();
  assert.equal(first.value.response.headers.get("X-Request-ID"), "req-1");
  assert.deepEqual(urls[0].searchParams.getAll("label"), ["team:a", "scope:b"]);
  assert.equal((await pages.next()).done, false);
  assert.equal(urls[1].searchParams.get("cursor"), "next");
  assert.equal((await pages.next()).done, true);
  assert.equal(urls.length, 2);
  client.close();
});

test("generated pages reject repeated cursors and item iteration closes early", async () => {
  let calls = 0;
  const client = createClient(
    options(async () => {
      calls++;
      return Response.json({ items: [{ id: "item" }], next_cursor: "same" });
    }),
  );
  const memories = client.resources.memories;
  const pages = memories.pages();
  await pages.next();
  await assert.rejects(pages.next(), ProtocolError);
  for await (const item of memories.items()) {
    assert.equal(item.id, "item");
    break;
  }
  assert.equal(calls, 3);
  client.close();
});

test("generated raw SSE retains Last-Event-ID; explicit close cancels its body", async () => {
  let cancelled = false;
  const client = createClient(
    options(async (request) => {
      assert.equal(request.headers.get("Last-Event-ID"), "2-0");
      assert.equal(request.headers.get("Accept"), "text/event-stream");
      return new Response(
        new ReadableStream({
          cancel() {
            cancelled = true;
          },
        }),
        { headers: { "Content-Type": "text/event-stream" } },
      );
    }),
  );
  const response = await client.resources.threads
    .ref("thr")
    .stream.get({ lastEventId: "2-0" });
  await response.close();
  assert.equal(cancelled, true);
  client.close();
});

test("generated resources share CSRF, shutdown, errors and non-replayed writes", async () => {
  let calls = 0;
  const client = createClient({
    ...options(async (request) => {
      calls++;
      assert.equal(request.headers.get("X-CSRF-Token"), "csrf");
      return Response.json(
        {
          error: {
            code: "write_unconfirmed",
            message: "Unknown outcome",
            details: {},
          },
        },
        { status: 503 },
      );
    }),
    auth: { type: "session", workspaceId: "ws" },
    maxReadRetries: 2,
  });
  client.setCsrfToken("csrf");
  await assert.rejects(
    client.resources.memories.create({ key: "notes", name: "Notes" }),
    ApiError,
  );
  assert.equal(calls, 1);
  client.close();
  await assert.rejects(client.resources.healthz.get());
  assert.equal(calls, 1);
});

test("each declared image media type supports Blob and streaming bytes without JSON or replay", async () => {
  const imageOperations = model.operations.filter((op) =>
    Object.keys(op.requestBody?.content ?? {}).some((media) =>
      media.startsWith("image/"),
    ),
  );
  assert.equal(imageOperations.length, 4);
  for (const op of imageOperations) {
    for (const contentType of Object.keys(op.requestBody.content)) {
      for (const streaming of [false, true]) {
        const bytes = new Uint8Array([0, 1, 2, 255]);
        let calls = 0;
        const client = createClient(
          options(async (request) => {
            calls++;
            assert.equal(request.headers.get("Content-Type"), contentType);
            assert.deepEqual(
              new Uint8Array(await request.arrayBuffer()),
              bytes,
            );
            return Response.json({ accepted: true });
          }),
        );
        const body = streaming
          ? new ReadableStream({
              start(controller) {
                controller.enqueue(bytes);
                controller.close();
              },
            })
          : new Blob([bytes]);
        await bound(client, op.node.segments)[op.method](body, {
          contentType,
          ifMatch: '"v1"',
        });
        assert.equal(calls, 1);
        client.close();
      }
    }
  }
});
