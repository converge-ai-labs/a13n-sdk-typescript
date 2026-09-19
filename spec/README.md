# TypeScript SDK Contract

## Definition and ownership

This repository owns `@converge.ai/a13n`: its TypeScript public API, generated HTTP types, transport and handwritten streaming adapters, tests, and independent package lifecycle. Service owns resource meaning, authorization, durable state, HTTP semantics and notification/Run wire contracts. Pinned inputs and source identity live in `contract/`; development and generation do not execute Service or depend on another SDK. Console owns a separate private client, not an implementation dependency of this package.

These documents define the SDK contract, not an inventory of already shipped capabilities. Release documentation and exported package declarations describe delivered availability. Shared Service SDK semantics remain upstream-owned; this repository chooses the TypeScript-native API rather than translating another SDK's object model.

## Contract catalog

| Contract                                                                  | Owns                                                                           |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [00 — Overview](00-overview.md)                                           | Architecture, dependency direction and main flow                               |
| [01 — Resources and client lifetime](01-resources-and-client-lifetime.md) | References, explicit scopes/authentication, values and request fidelity        |
| [02 — Interaction and control](02-interaction-and-control.md)             | Acceptance, submission, queueing, exact-Run commands and waits                 |
| [03 — Observation and data access](03-observation-and-data-access.md)     | RunStream lifetime/recovery, applied cursors and retained Items                |
| [04 — Resource management](04-resource-management.md)                     | Capability-specific collections, pagination and binary transfer                |
| [05 — Protocol and compatibility](05-protocol-and-compatibility.md)       | Pinned protocol ownership, compatibility, errors, notifications and acceptance |

Read the overview first, then resources and interaction for the managed-Agent flow. Observation owns local attachment semantics; it does not replace the durable command contract. Contribution, generation, validation and release procedures live in [CONTRIBUTING.md](../CONTRIBUTING.md).
