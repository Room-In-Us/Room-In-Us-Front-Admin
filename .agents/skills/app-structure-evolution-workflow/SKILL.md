---
name: app-structure-evolution-workflow
description: Use this when deciding whether Roominus Admin should evolve from route-local pages into a domain-oriented Next.js App Router structure, especially when referencing the DONGCHIMI client folder structure, adding multiple related admin pages, creating route groups, or moving code between src/app, src/features, src/domains, and src/shared.
---

# App Structure Evolution Workflow

## Purpose

Guide structural decisions for Roominus Admin as it grows. Use DONGCHIMI client as a reference pattern, but adapt it conservatively to this repo's current size, stack, and admin product needs.

## Read First

- `AGENTS.md`
- `.agents/skills/frontend-task-orchestrator/SKILL.md`
- `.agents/skills/page-feature-workflow/SKILL.md`
- `.agents/skills/server-client-boundary-workflow/SKILL.md`
- Nearby files in `src/app`, `src/features`, `src/shared`, and `src/assets`
- When comparing against DONGCHIMI, inspect `C:\DONGCHIMI-CLIENT\apps\client\src\app`, `src\domains`, and `src\shared`

## Current Baseline

- Keep `src/app` as the routing layer.
- Keep small route-only UI close to the route while the app is still shallow.
- Use `src/shared` only for code reused by more than one page or clearly app-wide primitives.
- Use `src/features` for domain-specific code only when a feature has enough substance to justify the folder.
- Do not introduce Vanilla Extract, a monorepo package, generators, or DONGCHIMI-only infrastructure unless the user explicitly asks and the repo has the need.

## Reference Pattern From DONGCHIMI

DONGCHIMI client uses this dependency direction:

```text
app -> domains -> shared
```

Its main idea is:

- `src/app`: Next route entries, route groups, layouts, metadata, providers, route handlers.
- `src/domains/{domain}`: real page composition, domain APIs, hooks, models, query keys.
- `src/shared`: app-wide API clients, reusable UI, auth helpers, constants, query setup, hooks, utilities.

Treat this as a growth target, not an immediate migration plan.

## When To Stay Route-Local

Keep code inside `src/app/{route}` or a nearby route-local component when:

- The page is one screen with little logic.
- Components are not reused elsewhere.
- There is no domain API, query key, mutation, or shared model yet.
- Moving files would create ceremony without reducing complexity.

Example:

```text
src/app/login/page.tsx
```

## When To Introduce A Domain Folder

Introduce a domain folder when at least two of these are true:

- A route has several sections, components, hooks, or utilities.
- Multiple pages share one business domain.
- API helpers, query hooks, request/response models, or query keys appear.
- Page logic is becoming hard to scan inside `src/app`.
- A route group or admin shell separates auth pages from authenticated pages.

Prefer this shape:

```text
src/app/(auth)/login/page.tsx
src/features/auth/login/LoginPage.tsx
src/features/auth/login/components/
src/features/auth/login/sections/
```

If this repo later standardizes on `src/domains`, update `AGENTS.md` and this skill first, then migrate intentionally.

## App Router Rules

- Keep route files thin: parse `params` and `searchParams`, connect layouts, then render page composition.
- Keep pages and layouts as Server Components by default.
- Put `'use client'` only in the smallest component that needs state, events, browser APIs, effects, providers, or TanStack Query hooks.
- Use route groups only when they clarify layout or access boundaries, such as `(auth)` and `(admin)`.
- Put route constants in `src/shared/constants/routes.ts` once paths are referenced in multiple places.

## API And State Placement

- Keep request/response types near the API boundary.
- Put shared API helpers under `src/shared/api` only when more than one feature needs them.
- Put feature-specific API helpers and hooks under `src/features/{domain}` when they are not broadly reusable.
- Include response-changing inputs in React Query keys.
- Keep transport and mutation logic out of presentational components.

## Migration Flow

1. Identify the route or feature that is becoming large.
2. List the code that is route-only, feature/domain-level, and shared.
3. Move only the code whose new owner is clear.
4. Keep the route entry thin and Server Component compatible.
5. Update imports without renaming public routes unless requested.
6. Run the lightest useful verification, usually `pnpm lint`; use `pnpm build` for route, layout, or boundary changes.

## Done Criteria

- `src/app` remains focused on routing and Next conventions.
- New folders have a clear owner and are not speculative.
- Shared code is actually shared or obviously app-wide.
- Server/Client boundaries are still minimal.
- The result is easier to navigate than the previous structure.
