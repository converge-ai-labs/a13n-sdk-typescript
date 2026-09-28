# TypeScript SDK Contract

This repository owns `@converge.ai/a13n`: an authored Agent-first finite Interaction, complete generated typed resource bindings over Service `/api/v1`, one authenticated transport, tests and an independent npm lifecycle. Service owns identities, authorization, durable state, receipts and stream protocol. The pinned `contract/` is generated offline from one Service revision. The Console client is not an implementation dependency.

| Contract                                                       | Responsibility                                           |
| -------------------------------------------------------------- | -------------------------------------------------------- |
| [Overview](00-overview.md)                                     | Two layers, one transport and ordinary execution journey |
| [Resources and lifetime](01-resources-and-client-lifetime.md)  | Authentication, scope, response and handle lifetimes     |
| [Interaction and control](02-interaction-and-control.md)       | Agent start/send, exact Entry/Run result and commands    |
| [Observation](03-observation-and-data-access.md)               | Finite stream, raw SSE, cursor and committed readback    |
| [Resource management](04-resource-management.md)               | Generated collections, administration and Memory         |
| [Protocol and compatibility](05-protocol-and-compatibility.md) | Pin, errors, validation and breaking cutover             |

This is the current SDK contract. Service semantics remain upstream-owned; `contract/semantics/` contains pinned normative inputs. Contribution and release workflow lives in [CONTRIBUTING.md](../CONTRIBUTING.md).
