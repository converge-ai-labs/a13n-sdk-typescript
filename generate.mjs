import fs from "node:fs/promises";
import { pathToFileURL } from "node:url";
import openapiTS, { astToString } from "openapi-typescript";
import ts from "typescript";
import prettier from "prettier";

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
  const outputs = [
    [new URL("src/schema.ts", root), content],
    [new URL("openapi.json", root), snapshot],
  ];
  for (const [file, expected] of outputs) await fs.writeFile(file, expected);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  await generate();
