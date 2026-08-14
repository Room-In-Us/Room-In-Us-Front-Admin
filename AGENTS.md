# Roominus Admin Agent Guide

<!-- BEGIN:nextjs-agent-rules -->

## This Is Not The Next.js You Know

This project uses Next.js 16. APIs, conventions, and file structure may differ from older Next.js knowledge. Before changing Next-specific code, read the relevant guide in `node_modules/next/dist/docs/` and follow deprecation notices.

Useful local docs:

- `node_modules/next/dist/docs/01-app/01-getting-started/02-project-structure.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/layout.md`

<!-- END:nextjs-agent-rules -->

## Project Shape

- Product: Roominus Admin
- Framework: Next.js App Router under `src/app`
- Runtime scripts: `package.json`
- Package manager source of truth: `package.json` `packageManager` (`pnpm@10.33.0`), existing lockfile, and scripts. This repo currently uses `pnpm-lock.yaml`.
- UI stack: React 19, Tailwind CSS 4, shadcn/Radix-style primitives, lucide icons, `class-variance-authority`, `tailwind-merge`
- Data stack: `axios`, `@tanstack/react-query`
- Path alias: `@/*` maps to project root.

## Agent Skill Set

This repo intentionally keeps agent setup light. Use only the skills below unless a task clearly needs a new one.

| Task Type                                          | Skill                                                      |
| -------------------------------------------------- | ---------------------------------------------------------- |
| Decide work type and scope                         | `.agents/skills/frontend-task-orchestrator/SKILL.md`       |
| Apply project code, branch, and commit conventions | `.agents/skills/project-conventions-workflow/SKILL.md`     |
| Evolve App Router/domain folder structure          | `.agents/skills/app-structure-evolution-workflow/SKILL.md` |
| Add or change App Router pages                     | `.agents/skills/page-feature-workflow/SKILL.md`            |
| Decide Server/Client Component boundaries          | `.agents/skills/server-client-boundary-workflow/SKILL.md`  |
| Add or change reusable shared UI components        | `.agents/skills/shared-component-workflow/SKILL.md`        |
| Add form validation and submit flows               | `.agents/skills/form-flow-workflow/SKILL.md`               |
| Add API helpers or React Query hooks               | `.agents/skills/api-integration-workflow/SKILL.md`         |
| Review non-trivial frontend diffs                  | `.agents/skills/frontend-fundamentals-review/SKILL.md`     |
| Draft or refine GitHub issues                      | `.agents/skills/issue-workflow/SKILL.md`                   |
| Prepare pull request content                       | `.agents/skills/pr-prep-workflow/SKILL.md`                 |
| Verify frontend changes                            | `.agents/skills/frontend-quality-verification/SKILL.md`    |

Do not add Jira, Turbo generator, monorepo, design-system package, PR monitoring, browser review, or performance skills until the repo actually needs them.

## Working Rules

- Prefer existing project structure over introducing new folders.
- Keep `src/app` focused on routing. Put reusable UI and utilities under `src/shared`, and domain-specific work under `src/features` when the feature has enough substance to justify it.
- Use `.agents/skills/app-structure-evolution-workflow/SKILL.md` before adopting DONGCHIMI-style route groups or domain-oriented folders.
- Use PascalCase for project-owned page/component modules, but keep required Next route files as `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, and `route.ts`.
- Use camelCase for icon/image asset filenames.
- Use SVG for icons and PNG for raster images unless a concrete need says otherwise.
- Use Tailwind CSS 4 with existing shadcn/Radix-style primitives, `class-variance-authority`, `tailwind-merge`, and `src/app/globals.css`; do not introduce Vanilla Extract or `*.css.ts`.
- Prefer `em`, `%`, or relative units for scalable layout and sizing; use `px` for border width, border radius, hairlines, and small fixed formatting details.
- Pages and layouts are Server Components by default. Add `'use client'` only to components that need state, event handlers, effects, browser APIs, or client hooks.
- Keep `'use client'` at the smallest practical boundary so static shells and server-fetched data stay server-rendered.
- In Next 16 App Router pages, treat `params` and `searchParams` as promises.
- Keep route-specific components close to the route until reuse is real.
- For API work, keep request/response types near the API boundary and include response-changing inputs in React Query keys.
- Use `rg` or `rg --files` first when searching.
- Use `apply_patch` for manual file edits.
- Do not broaden refactors beyond the requested change.

## Issue And PR Rules

- Use `.github/ISSUE_TEMPLATE/*` and `.github/pull_request_template.md` as the source of truth.
- Keep issue and PR text concise, concrete, and tied to observable behavior.
- Prefer these title prefixes so `.github/labeler.yml` can apply labels: `[FEAT]`, `[FIX]`, `[REFACTOR]`, `[API]`, `[DOCS]`, `[STYLE]`, `[TEST]`, `[SETTING]`, `[DEVELOP]`, `[CROSSBROWSING]`.
- Link related issues in the PR `ISSUE` section when one exists.
- Fill the PR test checklist with commands or manual checks actually performed or still required.
- Do not claim screenshots, tests, deployments, or CI results exist unless they were actually produced or checked.
- CodeRabbit review behavior is configured in `.coderabbit.yaml`; treat its comments as review input, not as a substitute for local verification.

## Branch And Commit Rules

- Use `.agents/skills/project-conventions-workflow/SKILL.md` as the single detailed source of truth for branch names, commit formats, commit types, character restrictions, and commit body rules.

## Verification

Choose the lightest check that proves the change:

- Docs or agent-only changes: `git diff --check`
- Formatting-sensitive changes: `pnpm format:check`
- Code changes: `pnpm lint`
- Next or type-sensitive changes: `pnpm build`

If a command cannot be run, report why and note the remaining risk.
