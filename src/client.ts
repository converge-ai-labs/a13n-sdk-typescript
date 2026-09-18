import {
  notifications,
  type NotificationOptions,
} from "./streams/notifications.js";
import createFetchClient from "openapi-fetch";
import type { paths } from "./schema.js";
import { workspaceHttp } from "./workspace.js";
import { Transport, type ClientOptions } from "./transport.js";
import { runStream, type RunStreamOptions } from "./streams/run-stream.js";
import { Workspaces } from "./resources/interaction.js";
import { Organizations } from "./resources/management.js";

/** One typed HTTP boundary; resource operations stay defined by Service OpenAPI. */
export function createClient(options: ClientOptions) {
  const transport = new Transport(options);
  return {
    http: createFetchClient<paths>(transport.httpOptions()),
    workspaces: new Workspaces(transport),
    organizations: new Organizations(transport),
    workspaceHttp: () => workspaceHttp(transport),
    setCsrfToken: (token: string | undefined) => transport.setCsrfToken(token),
    streamRun: (runId: string, streamOptions?: RunStreamOptions) =>
      runStream(transport, runId, streamOptions),
    notifications: (notificationOptions: NotificationOptions) =>
      notifications(options, transport.signal, notificationOptions),
    close: () => transport.close(),
  };
}
export type Client = ReturnType<typeof createClient>;
