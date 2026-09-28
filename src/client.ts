import { Transport, type ClientOptions } from "./transport.js";
import { ServiceResources } from "./resources/generated.js";
import {
  AgentCollection,
  RunCollection,
  ThreadCollection,
} from "./semantic.js";

/** One transport for the authored Agent workflow and complete generated resources. */
export function createClient(options: ClientOptions) {
  const transport = new Transport(options);
  const resources = new ServiceResources(transport);
  return {
    agents: new AgentCollection(resources, transport.signal),
    threads: new ThreadCollection(resources),
    runs: new RunCollection(resources, transport.signal),
    resources,
    setCsrfToken: (token: string | undefined) => transport.setCsrfToken(token),
    setWorkspaceId: (id: string | undefined) => transport.setWorkspaceId(id),
    close: () => transport.close(),
  };
}
export type Client = ReturnType<typeof createClient>;
