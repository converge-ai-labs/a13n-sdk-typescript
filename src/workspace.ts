import createFetchClient from "openapi-fetch";
import type { paths } from "./schema.js";
import type { Transport } from "./transport.js";

type ScopedParameters<P> = P extends { path: infer Path }
  ? Omit<P, "path"> &
      (keyof Omit<Path, "workspace_id"> extends never
        ? { path?: never }
        : { path: Omit<Path, "workspace_id"> })
  : P;
type ScopedOperation<O> = O extends { parameters: infer P }
  ? Omit<O, "parameters"> & { parameters: ScopedParameters<P> }
  : O;
type WorkspacePaths = {
  [
    P in keyof paths as P extends `/api/v1/workspaces/{workspace_id}${infer Tail}`
      ? Tail
      : never
  ]: { [M in keyof paths[P]]: ScopedOperation<paths[P][M]> };
};

/** Bind workspace routes to an explicitly selected workspace; Service still authorizes each request. */
export function workspaceHttp(transport: Transport, workspaceId: string) {
  if (
    !workspaceId ||
    workspaceId.includes("/") ||
    workspaceId === "." ||
    workspaceId === ".."
  )
    throw new TypeError("workspaceId must be a workspace ID or key.");
  return createFetchClient<WorkspacePaths>(
    transport.httpOptions(
      `${transport.baseUrl}/api/v1/workspaces/${encodeURIComponent(workspaceId)}`,
    ),
  );
}
