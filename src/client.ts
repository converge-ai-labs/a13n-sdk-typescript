import createFetchClient from "openapi-fetch";
import type { paths } from "./schema.js";
import { workspaceHttp } from "./workspace.js";
import { Transport, type ClientOptions } from "./transport.js";
import {
  threadStream,
  type ThreadStreamOptions,
} from "./streams/thread-stream.js";
import { Workspaces } from "./resources/interaction.js";
import { Organizations } from "./resources/management.js";

/** Typed OpenAPI operations and workspace/organization-bound resource conveniences. */
export function createClient(options: ClientOptions) {
  const transport = new Transport(options);
  return {
    http: createFetchClient<paths>(transport.httpOptions()),
    workspaces: new Workspaces(transport),
    organizations: new Organizations(transport),
    workspaceHttp: (workspaceId: string) =>
      workspaceHttp(transport, workspaceId),
    setCsrfToken: (token: string | undefined) => transport.setCsrfToken(token),
    streamThread: (
      workspaceId: string,
      threadId: string,
      streamOptions?: ThreadStreamOptions,
    ) => threadStream(transport, workspaceId, threadId, streamOptions),
    close: () => transport.close(),
  };
}
export type Client = ReturnType<typeof createClient>;
