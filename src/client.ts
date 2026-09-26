import createFetchClient from "openapi-fetch";
import type { paths } from "./schema.js";
import { Transport, type ClientOptions } from "./transport.js";
import { ServiceResources } from "./resources/generated.js";

/** One complete resource tree, sharing authentication and lifetime with the raw HTTP escape hatch. */
export function createClient(options: ClientOptions) {
  const transport = new Transport(options);
  return {
    resources: new ServiceResources(transport),
    /** Advanced request headers, middleware and response parsing; ordinary calls use resources. */
    http: createFetchClient<paths>(transport.httpOptions()),
    setCsrfToken: (token: string | undefined) => transport.setCsrfToken(token),
    close: () => transport.close(),
  };
}
export type Client = ReturnType<typeof createClient>;
