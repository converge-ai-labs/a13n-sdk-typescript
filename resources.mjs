/** Generate static resource navigation from the pinned OpenAPI document. */
const verbs = {
  get: "get",
  post: "create",
  put: "replace",
  patch: "update",
  delete: "delete",
  head: "head",
  options: "options",
};
const camel = (value) =>
  value.replace(/[-_]([a-z])/g, (_, letter) => letter.toUpperCase());
const pascal = (value) => {
  const name = camel(value);
  return name[0].toUpperCase() + name.slice(1);
};
const quote = JSON.stringify;
const runPath = "/api/v1/runs/{run_id}";
// contract/semantics/api.md: Preconditions requires every declared If-Match,
// except restoring a Memory file that may not currently exist (Memories).
const optionalMatch = new Set([
  "post /api/v1/memories/{memory_id}/revisions/{seq}/restore",
]);

export function resourceModel(document) {
  const root = {
    segments: [],
    children: new Map(),
    operations: [],
    name: "ServiceResources",
  };
  const nodes = [root];
  const operations = [];
  const resolve = (schema) =>
    schema?.$ref
      ? document.components.schemas[schema.$ref.split("/").at(-1)]
      : schema;
  for (const [path, item] of Object.entries(document.paths)) {
    const segments = path.startsWith("/api/v1/")
      ? path.slice(8).split("/")
      : [path.slice(1)];
    if (!path.startsWith("/api/v1/") && !["/healthz", "/readyz"].includes(path))
      throw new Error(`Unsupported resource path: ${path}`);
    let node = root;
    for (const segment of segments) {
      const key = segment.startsWith("{") ? "{}" : segment;
      if (!node.children.has(key)) {
        const child = {
          segments: [...node.segments, segment],
          children: new Map(),
          operations: [],
          name:
            [...node.segments, segment]
              .map((s) => pascal(s.replace(/[{}]/g, "")))
              .join("") + "Resource",
        };
        node.children.set(key, child);
        nodes.push(child);
      }
      node = node.children.get(key);
    }
    node.path = path;
    for (const [verb, operation] of Object.entries(item)) {
      if (!(verb in verbs)) continue;
      const parameters = [
        ...(item.parameters ?? []),
        ...(operation.parameters ?? []),
      ];
      const success = Object.entries(operation.responses).filter(([code]) =>
        /^2\d\d$/.test(code),
      );
      if (!operation.operationId || !success.length)
        throw new Error(
          `Missing operation identity or success response: ${verb} ${path}`,
        );
      const schemas = success.flatMap(([, response]) =>
        Object.values(response.content ?? {}).map((content) =>
          resolve(content.schema),
        ),
      );
      const collection =
        path !== `${runPath}/items` &&
        schemas.some((schema) => schema?.properties?.items);
      const paged =
        parameters.some((p) => p.in === "query" && p.name === "cursor") &&
        schemas.length === 1 &&
        schemas[0]?.properties?.next_cursor &&
        schemas[0]?.properties?.items;
      const op = {
        ...operation,
        verb,
        path,
        parameters,
        success,
        collection,
        paged,
        method: verb === "get" && collection ? "list" : verbs[verb],
        node,
      };
      node.operations.push(op);
      operations.push(op);
    }
  }
  // Only a literal, POST-only leaf is an action. Collections and selectors stay navigable.
  const flattened = (node) =>
    node.segments.length &&
    !node.segments.at(-1).startsWith("{") &&
    !node.children.size &&
    node.operations.length === 1 &&
    node.operations[0].verb === "post" &&
    !node.segments.at(-1).endsWith("s");
  for (const node of nodes) node.flattened = flattened(node);
  for (const node of nodes) {
    for (const [key, child] of node.children) {
      if (key === "{}") {
        const index = child.segments.length - 1;
        const descendant = operations.find(
          (op) =>
            op.node.segments.slice(0, index + 1).join("/") ===
            child.segments.join("/"),
        );
        const parameter = descendant?.parameters.find(
          (p) =>
            p.in === "path" &&
            p.name === descendant.node.segments[index].slice(1, -1),
        );
        if (!parameter)
          throw new Error(`Missing selector declaration: ${child.name}`);
        child.selector = {
          operation: descendant.operationId,
          parameter: parameter.name,
        };
      } else if (child.flattened) {
        child.operations[0].owner = node;
        child.operations[0].method = camel(key);
      }
    }
  }
  return { root, nodes, operations };
}

export function generateResources(document) {
  const { nodes, operations } = resourceModel(document);
  const aliases = [];
  const classes = [];
  const coverage = [];
  const opType = (op) => `operations[${quote(op.operationId)}]`;
  function emit(op) {
    const index = operations.indexOf(op);
    const type = `Operation${index}`;
    if (
      op.parameters.some((p) => p.in === "query" || p.in === "header") ||
      op.requestBody ||
      op.success.some(([, r]) => r.content?.["application/json"])
    )
      aliases.push(`type ${type} = ${opType(op)};`);
    const query = op.parameters.filter((p) => p.in === "query");
    const headers = op.parameters
      .filter((p) => p.in === "header")
      .map((p) => ({
        ...p,
        required:
          p.required ||
          (p.name === "If-Match" &&
            !optionalMatch.has(`${op.verb} ${op.path}`)),
      }));
    const bodyContent = op.requestBody?.content ?? {};
    const media = Object.keys(bodyContent);
    const json = media.includes("application/json");
    const multipart = media.includes("multipart/form-data");
    const binary = media.length && !json && !multipart;
    if (
      binary &&
      !media.every(
        (m) => m.startsWith("image/") || m === "application/octet-stream",
      )
    )
      throw new Error(`Unsupported request media: ${op.path}`);
    const responseMedia = [
      ...new Set(op.success.flatMap(([, r]) => Object.keys(r.content ?? {}))),
    ];
    const stream =
      responseMedia.length > 0 && !responseMedia.includes("application/json");
    if (stream && op.verb !== "get")
      throw new Error(`Unsupported streaming method: ${op.path}`);
    const result = stream
      ? "BinaryResult"
      : `ResourceResult<${[...new Set(op.success.map(([code, r]) => (r.content?.["application/json"] ? `${type}["responses"][${code}]["content"]["application/json"]` : "undefined")))].join(" | ")}>`;
    const optionFields = ["signal?: AbortSignal"];
    if (query.length)
      optionFields.push(
        `query${query.some((p) => p.required) ? "" : "?"}: NonNullable<${type}["parameters"]["query"]>`,
      );
    for (const header of headers)
      optionFields.push(
        `${camel(header.name.toLowerCase())}${header.required ? "" : "?"}: ${header.required ? "NonNullable<" : ""}NonNullable<${type}["parameters"]["header"]>[${quote(header.name)}]${header.required ? ">" : ""}`,
      );
    if (binary)
      optionFields.push(`contentType: ${media.map(quote).join(" | ")}`);
    const requiredOptions =
      binary || [...query, ...headers].some((p) => p.required);
    aliases.push(`type ${type}Options = { ${optionFields.join("; ")} };`);
    let body = "undefined";
    const args = [];
    if (media.length) {
      const content = json
        ? "application/json"
        : multipart
          ? "multipart/form-data"
          : media[0];
      const bodyType = binary
        ? "Binary"
        : `NonNullable<${type}["requestBody"]>["content"][${quote(content)}]`;
      args.push(
        `body: ${bodyType}${op.requestBody.required ? "" : " | undefined"}`,
      );
      body = "body";
    }
    args.push(`options: ${type}Options${requiredOptions ? "" : " = {}"}`);
    const headerObject = headers.length
      ? `Object.fromEntries(Object.entries({${headers.map((p) => `${quote(p.name)}: options.${camel(p.name.toLowerCase())}`).join(",")}}).filter(([, value]) => value !== undefined && value !== null).map(([key, value]) => [key, String(value)]))`
      : "undefined";
    const owner = op.owner ?? op.node;
    const suffix = op.owner ? ` + ${quote("/" + op.node.segments.at(-1))}` : "";
    const path = owner === nodes[0] ? quote(op.path) : `this.path${suffix}`;
    const requestOptions = `{ signal: options.signal${query.length ? ", query: options.query" : ""} }`;
    let request;
    if (stream)
      request = `binaryRequest(this.transport, ${path}, { ...${requestOptions}, headers: ${headerObject}, accept: ${quote(responseMedia.join(", "))} })`;
    else if (multipart)
      request = `uploadRequest(this.transport, ${quote(op.verb.toUpperCase())}, ${path}, multipartBody(body), undefined, ${headerObject}, ${requestOptions})`;
    else if (binary)
      request = `uploadRequest(this.transport, ${quote(op.verb.toUpperCase())}, ${path}, body, options.contentType, ${headerObject}, ${requestOptions})`;
    else
      request = `jsonRequest(this.transport, ${quote(op.verb.toUpperCase())}, ${path}, ${body}, ${headerObject}, ${requestOptions})`;
    const lines = [
      `/** ${op.verb.toUpperCase()} ${op.path}. ${stream ? "Caller owns and closes the unbuffered body." : "Preserves response metadata; mutations are not replayed."} */`,
      `${op.method}(${args.join(", ")}): Promise<${result}> { return ${request}; }`,
    ];
    if (op.paged && op.method === "list") {
      lines.push(
        `pages(options: ${type}Options${requiredOptions ? "" : " = {}"}) { const query = snapshot(options.query ?? {}); return new PageIterator(query.cursor, cursor => this.list({ ...options, query: withCursor(query, cursor) }), value => value); }`,
      );
      lines.push(
        `items(options: ${type}Options${requiredOptions ? "" : " = {}"}) { return flattenPages(this.pages(options), value => value); }`,
      );
    }
    coverage.push({
      operationId: op.operationId,
      path: op.path,
      verb: op.verb,
      owner: owner.name,
      method: op.method,
    });
    return lines;
  }
  for (const node of nodes.filter((n) => !n.flattened)) {
    const members = new Set(["transport", "path"]);
    const lines = [];
    const add = (name, source) => {
      if (members.has(name))
        throw new Error(`Resource member collision: ${node.name}.${name}`);
      members.add(name);
      lines.push(...source);
    };
    for (const op of node.operations) {
      add(op.method, emit(op));
      if (op.paged && op.method === "list") {
        members.add("pages");
        members.add("items");
      }
    }
    for (const [key, child] of node.children) {
      if (key === "{}") {
        const type = `operations[${quote(child.selector.operation)}]["parameters"]["path"][${quote(child.selector.parameter)}]`;
        add("ref", [
          `ref(value: ${type}): ${child.name} { return new ${child.name}(this.transport, this.path + "/" + encodeURIComponent(selector(String(value)))); }`,
        ]);
      } else if (child.flattened) add(camel(key), emit(child.operations[0]));
      else
        add(camel(key), [
          `get ${camel(key)}(): ${child.name} { return new ${child.name}(this.transport, ${node.segments.length ? `this.path + ${quote("/" + key)}` : quote(child.path?.startsWith("/api/v1/") || !["healthz", "readyz"].includes(key) ? "/api/v1/" + key : "/" + key)}); }`,
        ]);
    }
    classes.push(
      `export class ${node.name} { constructor(private readonly transport: Transport${node.segments.length ? ", private readonly path: string" : ""}) {}\n${lines.join("\n")}\n}`,
    );
  }
  return {
    source: `/** Generated resource bindings. Do not edit; run npm run generate. */
import type { operations, Binary } from '../schema.js';
import type { Transport } from '../transport.js';
import { jsonRequest, uploadRequest, binaryRequest, multipartBody, selector, snapshot, withCursor, PageIterator, flattenPages, type ResourceResult, type BinaryResult } from './base.js';
${aliases.join("\n")}
${classes.join("\n\n")}
`,
    coverage,
  };
}
