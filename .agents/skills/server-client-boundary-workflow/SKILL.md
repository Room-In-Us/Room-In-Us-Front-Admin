---
name: server-client-boundary-workflow
description: Use this when deciding or reviewing Next.js Server and Client Component boundaries, including App Router pages, layouts, providers, React Query usage, browser APIs, third-party interactive libraries, serializable props, and long-term bundle or maintainability risks from 'use client' placement.
---

# Server Client Boundary Workflow

## Purpose

Decide where Roominus Admin should use Server Components and where it should introduce a Client Component boundary.

The goal is durable boundaries: small client islands, server-owned data, predictable imports, and client bundles that do not grow just because one nested interaction exists.

## Read First

- `AGENTS.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
- Nearby route, component, provider, hook, and API files
- `.agents/skills/page-feature-workflow/SKILL.md` when changing a route

## Default Rule

Keep pages, layouts, and non-interactive UI as Server Components by default. Add `'use client'` only at the smallest component boundary that needs client-only behavior.

## Decision Order

Apply these checks in order. Start from the smallest browser-only behavior, not from whether the page feels interactive.

1. Keep the route shell server-rendered unless the route file itself must own client state or browser APIs.
2. Fetch route data on the server when the data can be known before interaction and does not depend on client-only session state.
3. Pass server-fetched data into interactive children as serializable props.
4. Isolate event handlers, local state, effects, browser APIs, React Query hooks, and providers into the smallest client component that owns them.
5. Keep reusable presentational components server-compatible unless their public API is explicitly interactive.
6. Use a small client wrapper for third-party components that require the browser.
7. Review imports after adding `'use client'`; every imported module now has to be safe for the client bundle.

## Use A Client Component When

- The component uses React state, such as `useState` or `useReducer`.
- The component has event handlers, such as `onClick`, `onChange`, or form submit handlers.
- The component uses lifecycle or effect hooks, such as `useEffect`.
- The component reads browser-only APIs, such as `window`, `document`, `localStorage`, or geolocation.
- The component uses custom hooks that depend on client state, effects, browser APIs, or React Query.
- The component provides React context.
- A third-party component requires client-only features and does not already declare its own client boundary.

## Prefer A Server Component When

- The component fetches data on the server or can receive server-fetched data as props.
- The component needs secrets, private environment variables, tokens, cookies, or server-only APIs.
- The component mainly renders static or data-driven markup.
- Keeping it server-side reduces client JavaScript without hurting interaction.
- It composes a small interactive child component inside a larger static shell.
- It is a shared presentational component that should stay usable from either Server or Client Components.

## Boundary Placement Rules

- Put `'use client'` in a leaf or narrow wrapper component, not in a whole page or layout unless the whole surface truly needs it.
- Once a file has `'use client'`, its imports and child components join the client bundle, so avoid importing server-only modules from it.
- Pass serializable props from Server Components to Client Components.
- Pass Server Components as `children` into Client Components when an interactive shell needs server-rendered content inside it.
- Render providers as deep as practical so static layout pieces can remain server-rendered.
- For feature pages with multiple client concerns, prefer a server page/shell plus a feature-local client provider or controller that owns search, filters, pagination, modal state, geolocation, maps, and React Query orchestration.
- Keep section components under that provider focused on rendering and user events. Let them read the smallest needed state through selector-style hooks or narrow contexts instead of forcing the page/shell to become client-only.
- Keep TanStack Query hooks, browser storage, and event-heavy behavior behind a client boundary.
- Keep server-only modules out of any file that might be imported by a Client Component.
- Do not move a component to the client only to satisfy one child; move that child or a wrapper instead.
- Do not make a shared component client-only for styling, layout, icons, class merging, or static composition.

## Long-Term Guardrails

- Treat `'use client'` as a bundle boundary, not a convenience flag.
- Prefer server shells with client islands: one form, modal, table controller, provider, or button group can be client-rendered inside a server-rendered page.
- Keep Client Components thin: own interaction and call client hooks, but avoid embedding data shaping, route policy, or backend contract details there.
- When a client provider is needed, split memoized context values by concern, such as `search`, `table`, `pagination`, `map`, or `marketList`, so one state update does not unnecessarily churn unrelated consumers.
- Keep Server Components explicit about data ownership: fetch, normalize, and pass stable props rather than leaking transport shapes through the tree.
- When a shared component grows event-heavy behavior, split a server-compatible presentational component from a client controller component.
- If a boundary decision is unclear, choose the option that keeps fewer modules in the client bundle and revisit after real interaction requirements appear.

## Red Flags

- A `page.tsx` or `layout.tsx` starts with `'use client'` only because one nested component needs `onClick`.
- A Client Component imports API helpers that read private environment variables, server cookies, filesystem, database clients, or token-bearing server logic.
- A shared UI primitive becomes client-only because one usage needed state.
- React Query is used for data that could be fetched by the route before first render without losing required interactivity.
- A server-fetched object with functions, class instances, non-normalized Dates, Maps, Sets, or other non-serializable values is passed to a Client Component.
- A provider wraps the entire document when only a route section needs the context.

## Review Severity

- Critical: server secrets or server-only modules can enter a client bundle; build/runtime failure from an invalid boundary; non-serializable props cross the boundary.
- Warning: a page, layout, or large shared shell is marked client-only without a route-level need; React Query replaces simple server data fetching; a provider is much higher than needed.
- Suggestion: a smaller client wrapper or server-compatible presentational split would reduce future bundle growth.

## Review Checklist

1. Identify the first line that requires client-only behavior.
2. Move that behavior into the smallest component that owns it.
3. Keep data fetching and secret-bearing logic on the server when possible.
4. Check that props crossing from server to client are serializable.
5. Check that client files do not import server-only helpers, private environment logic, filesystem code, database code, or token-bearing API helpers.
6. Check whether a third-party client-only component needs a small wrapper.
7. Check that shared components remain server-compatible unless their purpose is interaction.
8. Check that imports use concrete paths when a broad barrel import would pull unrelated shared component modules into a client graph.
9. Verify with `pnpm build` when boundary changes affect routes, providers, or imports.

## Done Criteria

- Server and Client Component boundaries are intentional and minimal.
- Client bundles are not expanded by marking large static shells as client code.
- Server-only data, secrets, and private environment variables do not cross into client files.
- Client Components receive serializable props.
- Shared presentational components stay server-compatible by default.
- Verification is run or the skipped check is explained.
