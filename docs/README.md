# TypeScript SDK guide

The [quickstart](../README.md) gets an existing Agent responding from Node.js. These chapters are independent routes into the next task; start with what your application needs. Examples use the npm ESM package built from this pre-release checkout unless a published version is available. They call an existing Service, not an embedded Agent runtime.

| Task                                                           | Guide                                                     |
| -------------------------------------------------------------- | --------------------------------------------------------- |
| Configure a client, send a message, and continue its Thread    | [Client and conversations](01-setup-and-conversations.md) |
| Follow live events and reconcile saved output                  | [Streaming and readback](02-streaming-and-readback.md)    |
| Supply a real client-tool answer after a waiting Run           | [Waiting and tools](03-waiting-and-tools.md)              |
| Attach a file or mount stored notes                            | [Files and Memory](04-files-and-memory.md)                |
| Authenticate a same-origin browser without bundling an API key | [Browser sessions](05-browser-sessions.md)                |
| Create/manage Agents, page results, and update with ETags      | [Generated resources](06-generated-resources.md)          |
| Handle timeouts, HTTP failures, and uncertain submissions      | [Errors and recovery](07-errors-and-recovery.md)          |

Each Node.js chapter states the environment variables it needs and includes its own imports and client setup. Browser snippets assume an npm-compatible bundler and a same-origin Service. Any example that creates Agents, Assets or Memory persists real resources; use a disposable workspace while learning.

The [pinned Service OpenAPI](../openapi.json) and [SDK specification](../spec/README.md) cover the complete wire contract. [CONTRIBUTING.md](../CONTRIBUTING.md) owns generation, local checks and opt-in HTTPS/browser acceptance. Local package tests do not prove compatibility with a particular deployed Service or provider.
