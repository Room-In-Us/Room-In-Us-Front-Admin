---
name: api-integration-workflow
description: Use this when adding API helpers, request/response types, TanStack Query hooks, query keys, or cache behavior.
---

# API Integration Workflow

## Purpose

Implement predictable API boundaries and React Query usage for Roominus Admin.

## Read First

- `AGENTS.md`
- `.agents/skills/project-conventions-workflow/SKILL.md` for file naming and commit conventions when relevant
- Existing API/client/query patterns in `src/features` and `src/shared`
- Endpoint docs or backend contract supplied by the user

## Required Inputs

- HTTP method and path
- Request params, search params, or body
- Response shape
- Expected error shape, if known
- Usage site or page

If the API contract is unclear and cannot be inferred from local code, ask before inventing fields.

## Rules

- Keep request/response types close to the API boundary.
- Include every response-changing input in the query key.
- Prefer domain-local API helpers first. Promote to `src/shared` only when multiple real users exist.
- Do not add optimistic updates, retries, or broad invalidation unless the UX needs them.
- Surface errors explicitly enough for the page to render useful states.
- Keep mapping/normalization near the boundary when it protects the UI from backend shape changes.

## Implementation Flow

1. Find existing `axios` and `@tanstack/react-query` usage.
2. Add or reuse a typed API helper.
3. Add query keys before hooks when caching is involved.
4. Add query or mutation hooks with narrow inputs and readable return values.
5. Wire the hook into the page or component without mixing transport details into UI.
6. Verify lint/build according to change risk.

## Done Criteria

- Types describe the API boundary.
- Query keys include response-changing inputs.
- Cache invalidation or update behavior is intentional.
- Errors are not silently swallowed.
- Verification is run or the skipped check is explained.
