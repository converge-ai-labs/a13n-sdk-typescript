import fs from "node:fs/promises";
import { pathToFileURL } from "node:url";
import openapiTS, { astToString } from "openapi-typescript";
import ts from "typescript";
import prettier from "prettier";
import { generateResources } from "./resources.mjs";

/** Generate only from this repository's pinned input; never execute Service. */
export async function generate({ root = new URL("./", import.meta.url) } = {}) {
  const source = new URL("contract/openapi.json", root);
  const ast = await openapiTS(source, {
    defaultNonNullable: false,
    transform(schema) {
      if (schema.format === "binary")
        return ts.factory.createTypeReferenceNode("Binary");
      if (schema.contentMediaType === "application/octet-stream")
        return ts.factory.createTypeReferenceNode("Blob");
    },
  });
  const content = await prettier.format(
    astToString(ast) +
      "\nexport type Binary = Blob | ReadableStream<Uint8Array>;\n",
    { parser: "typescript" },
  );
  const snapshot = await prettier.format(await fs.readFile(source, "utf8"), {
    parser: "json",
  });
  const document = JSON.parse(snapshot);
  const resources = generateResources(document);
  const scopedRoutes = Object.entries(document.paths).flatMap(([path, item]) =>
    Object.entries(item)
      .filter(
        ([method, operation]) =>
          ["get", "post", "put", "patch", "delete"].includes(method) &&
          [...(item.parameters ?? []), ...(operation.parameters ?? [])].some(
            (parameter) =>
              parameter.in === "header" && parameter.name === "X-Workspace-ID",
          ),
      )
      .map(([method]) => {
        const pattern = path
          .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
          .replace(/\\\{[^/]+\\\}/g, "[^/]+");
        return `[${JSON.stringify(method.toUpperCase())}, new RegExp(${JSON.stringify(`^${pattern}$`)})]`;
      }),
  );
  const scope = await prettier.format(
    `/** Generated workspace-scoped routes from the pinned Service contract. */\nconst routes: ReadonlyArray<readonly [string, RegExp]> = [${scopedRoutes.join(",")}];\nexport function isWorkspaceScopedRoute(method: string, path: string): boolean { return routes.some(([verb, pattern]) => verb === method && pattern.test(path)); }\n`,
    { parser: "typescript" },
  );
  await fs.mkdir(new URL("src/resources/", root), { recursive: true });
  const outputs = [
    [new URL("src/workspace-scope.ts", root), scope],
    [
      new URL("src/resources/generated.ts", root),
      await prettier.format(resources.source, { parser: "typescript" }),
    ],
    [new URL("src/schema.ts", root), content],
    [new URL("openapi.json", root), snapshot],
  ];
  for (const [file, expected] of outputs) await fs.writeFile(file, expected);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  await generate();
