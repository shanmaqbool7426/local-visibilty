---
name: OpenAPI numeric schemas
description: Compatibility note for OpenAPI-to-Zod generation in this workspace.
---

Use `number` for numeric OpenAPI fields in API contracts when they need to flow through the generated Zod package.

**Why:** The workspace currently uses a Zod 3 runtime, while the generator emits `z.int()` for OpenAPI `integer` fields; generated library typechecking then fails.

**How to apply:** If the Zod dependency or generator changes, verify whether `integer` is supported before restoring integer schemas.