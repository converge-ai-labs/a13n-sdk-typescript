import fs from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import standaloneCode from "ajv/dist/standalone/index.js";
import { build } from "esbuild";
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
  // Session frames own continuation types independently of the HTTP schemas.
  const session = JSON.parse(
    await fs.readFile(
      new URL("contract/session-stream.schema.json", root),
      "utf8",
    ),
  );
  const definitions = JSON.parse(
    JSON.stringify(session.$defs).replaceAll(
      "#/$defs/",
      "#/components/schemas/",
    ),
  );
  const sessionAst = await openapiTS(
    {
      openapi: "3.1.0",
      info: { title: session.title, version: "1" },
      paths: {},
      components: { schemas: definitions },
    },
    { defaultNonNullable: false },
  );
  const sessionUnion = Object.entries(session.frames)
    .map(([name, schema]) => {
      const model = schema.$ref.replace("#/$defs/", "");
      return `{ type: ${JSON.stringify(name)}; data: components["schemas"][${JSON.stringify(model)}] }`;
    })
    .join(" | ");
  const sessionContent = await prettier.format(
    astToString(sessionAst) +
      `\nexport type SessionStreamSchemas = components["schemas"];\nexport type SessionStreamFrame = ${sessionUnion};\n`,
    { parser: "typescript" },
  );
  // Compile pinned schemas at generation time: no runtime compiler, eval or dependencies.
  const schemaId = "a13n:session-stream";
  const validator = new Ajv2020({
    strict: false,
    inlineRefs: false,
    code: { source: true, esm: true },
  });
  addFormats(validator);
  validator.addSchema({ $id: schemaId, $defs: session.$defs });
  const validation = standaloneCode(
    validator,
    Object.fromEntries(
      Object.entries(session.frames).map(([name, schema]) => [
        name,
        `${schemaId}${schema.$ref}`,
      ]),
    ),
  );
  const bundled = await build({
    stdin: {
      contents: validation,
      sourcefile: "session-stream-validation.js",
      resolveDir: fileURLToPath(new URL("./", import.meta.url)),
    },
    bundle: true,
    platform: "neutral",
    format: "esm",
    target: "es2022",
    write: false,
  });
  const sessionValidation = await prettier.format(
    "// @ts-nocheck\n/** Generated standalone Session JSON Schema validators. Do not edit.\n * Bundled runtime notices: THIRD_PARTY_NOTICES.txt. */\n" +
      bundled.outputFiles[0].text,
    { parser: "typescript" },
  );
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
    [new URL("src/session-stream-schema.ts", root), sessionContent],
    [new URL("src/session-stream-validation.ts", root), sessionValidation],
    [new URL("openapi.json", root), snapshot],
  ];
  for (const [file, expected] of outputs) await fs.writeFile(file, expected);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  await generate();
