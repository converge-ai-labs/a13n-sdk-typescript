# TypeScript SDK Contract

This repository owns `@converge.ai/a13n`: typed HTTP and selected resource conveniences over Service `/api/v1`, transport, Thread SSE, tests, and independent npm lifecycle. Service owns identities, authorization, durable state, receipt semantics, and streaming protocol. Generated types and adapters derive from the pinned Service revision in `contract/`; generation is offline. The Console client is not an implementation dependency.

| Contract                                                       | Responsibility                                       |
| -------------------------------------------------------------- | ---------------------------------------------------- |
| [Overview](00-overview.md)                                     | Architecture and execution path                      |
| [Resources and lifetime](01-resources-and-client-lifetime.md)  | Authentication, scope, response and handle lifetimes |
| [Interaction and control](02-interaction-and-control.md)       | Thread submission, inbox, exact-Run commands         |
| [Observation](03-observation-and-data-access.md)               | Thread SSE, cursor application, retained Run items   |
| [Resource management](04-resource-management.md)               | Collections and management boundaries                |
| [Protocol and compatibility](05-protocol-and-compatibility.md) | Pinned contracts, errors, validation and migration   |

This is the current SDK contract. Service semantics are upstream-owned; see `contract/semantics/` for pinned normative inputs. Contribution and release workflow lives in [CONTRIBUTING.md](../CONTRIBUTING.md).
