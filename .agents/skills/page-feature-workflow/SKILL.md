---
name: page-feature-workflow
description: Use this when adding or changing Roominus Admin pages, layouts, route-local components, or App Router behavior.
---

# Page Feature Workflow

## Purpose

Implement page, layout, and route-local UI changes in this Next.js App Router project.

## Read First

- `AGENTS.md`
- `.agents/skills/project-conventions-workflow/SKILL.md` for naming, assets, and styling units
- `.agents/skills/server-client-boundary-workflow/SKILL.md` when Server/Client Component boundaries matter
- Nearby files in `src/app`, `src/features`, and `src/shared`
- For Next route behavior:
  - `node_modules/next/dist/docs/01-app/01-getting-started/02-project-structure.md`
  - `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
  - `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md`
  - `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/layout.md`
  - `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`

## Rules

- `src/app` owns routes and route shell files.
- Keep required Next file names as `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, and `route.ts`.
- Use PascalCase for extracted page/component modules, such as `LoginPage.tsx` or `UserTable.tsx`.
- Keep route-only UI close to the route or feature. Move code to `src/shared` only when reuse is proven.
- Pages and layouts are Server Components by default.
- Add `'use client'` only where state, event handlers, effects, browser APIs, or client hooks are required.
- Keep `'use client'` at the smallest practical interactive component boundary.
- In App Router pages, `params` and `searchParams` are promises. Use `async/await` or React `use`.
- Preserve Korean UX text where the surrounding UI is Korean.
- Use lucide icons for icon buttons when available.
- Use camelCase for local asset filenames, SVG for icons, and PNG for raster images.
- Prefer `em` and `%` for scalable sizing, with `px` allowed for border width, border radius, and small fixed formatting details.
- Keep admin UI dense, clear, and task-focused.

## Implementation Flow

1. Find the closest existing page or layout pattern.
2. Decide route ownership and whether the change belongs in `src/app`, `src/features`, or `src/shared`.
3. Decide Server/Client Component boundaries before adding hooks, handlers, providers, or browser APIs.
4. Model loading, empty, error, disabled, and success states when the workflow needs them.
5. Keep API calls and query hooks out of presentational components.
6. Check responsive behavior for common admin widths.
7. Run targeted verification.

## Done Criteria

- Route behavior matches the requested URL and navigation.
- Server/Client Component boundaries are intentional.
- Route params and search params follow Next 16 conventions.
- UI state is readable and does not hide failures.
- Verification is run or the skipped check is explained.
