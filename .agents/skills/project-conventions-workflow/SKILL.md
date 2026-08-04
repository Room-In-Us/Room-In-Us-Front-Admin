---
name: project-conventions-workflow
description: Use this when applying, checking, or explaining Roominus Admin project conventions for code naming, Next.js pages/components, assets, CSS units, branch names, commit messages, PR preparation, or implementation review.
---

# Project Conventions Workflow

## Purpose

Apply Roominus Admin conventions consistently while keeping them compatible with this Next.js 16 App Router project.

## Read First

- `AGENTS.md`
- Nearby files for local naming/style patterns
- `package.json` for available checks
- For Next-specific pages/layouts, the relevant local docs in `node_modules/next/dist/docs/01-app/`

## Code Naming

- Name page and component files/components with PascalCase when creating project-owned UI modules.
  - Examples: `LoginPage.tsx`, `UserTable.tsx`, `RoomInUsCard.tsx`
  - Keep required Next route convention files lowercase: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`.
  - Prefer route entries that render PascalCase page components when the page becomes non-trivial.
- Name icon and image asset files with camelCase.
  - Icons: `plusIcon.svg`, `userMenuIcon.svg`
  - Images: `roomInUs.png`, `loginBanner.png`
- Use SVG for icons and PNG for raster images unless an external source or optimization need clearly requires another format.
- Import SVGs as React components through the existing SVGR webpack setup when component control is needed.
- Use lucide icons for generic UI actions when a suitable icon exists; use local SVG assets for brand/product-specific icons.

## Next.js Structure

- Keep `src/app` for routing files and route shell composition.
- Put reusable components under `src/shared/components`.
- Put reusable utilities under `src/shared/lib`, hooks under `src/shared/hooks`, and types under `src/shared/types`.
- Put domain-specific code under `src/features` only when it has enough logic or reuse to justify a feature folder.
- Keep route-local components close to their route until reuse is proven.
- Pages and layouts are Server Components by default. Add `'use client'` only for state, handlers, effects, browser APIs, or client hooks.
- In Next 16 App Router pages, treat `params` and `searchParams` as promises.

## Styling

- Prefer the project's existing Tailwind/shadcn/Radix patterns over introducing `styled-components`.
- Use `em`, `%`, or other relative/container-based units for layout and scalable sizing when practical.
- Use `px` for format-like constants such as `border-width`, `border-radius`, hairlines, and tiny fixed offsets.
- Keep admin screens dense, readable, and task-focused.
- Avoid making a reusable abstraction only because two styles look similar once.

## Branch Naming

- Production branch: `main`
- Development branch: `develop`
- Work branches: `<type>/<issue-number>-<english-slug>`
  - Example: `feature/3-login-layout`
- Branch names must never include `#`, Korean characters, spaces, underscores, or camelCase.
- The issue number segment is digits only, without `#`; use `feature/5-login-layout`, not `feature/#5-login-layout`.
- The slug after the issue number must use only English lowercase letters, numbers, and hyphens.
- Use lowercase branch types such as `feature`, `fix`, `refactor`, `docs`, `style`, `test`, `setting`, `chore`.
- When no issue number exists, ask whether to create/link one or use a short English no-issue branch name.

## Commit Messages

Use this format:

```text
Type: 한글 변경 요약 (#issue)
```

Example:

```text
Feat: 카카오 로그인 기능 구현 (#9)
```

Allowed commit types:

| Type       | Meaning                                      |
| ---------- | -------------------------------------------- |
| `Feat`     | New feature                                  |
| `Fix`      | Bug fix                                      |
| `Remove`   | File, code, or feature removal               |
| `Chore`    | Build or maintenance changes                 |
| `Test`     | Test changes                                 |
| `Refactor` | Refactoring                                  |
| `Docs`     | Documentation                                |
| `Style`    | Style or formatting without behavior changes |
| `Setting`  | Environment/config setup                     |

Rules:

- Use the English type exactly as shown.
- Write the summary in Korean when possible.
- Do not end the subject with a period.
- Keep the subject short; aim for 50 English characters or similar visual length.
- Separate subject and body with a blank line when adding a body.
- In the body, explain what changed and why, not every mechanical detail.
- Use bullets for multiple body points.

## PR And Issue Alignment

- Match commit type and PR/issue title prefix when practical:
  - `Feat` -> `[FEAT]`
  - `Fix` -> `[FIX]`
  - `Refactor` -> `[REFACTOR]`
  - `Docs` -> `[DOCS]`
  - `Style` -> `[STYLE]`
  - `Test` -> `[TEST]`
  - `Setting` -> `[SETTING]`
- Keep issue TODO items and PR test checklist checkable.
- Do not claim screenshots, tests, CI, or deployment evidence unless it exists.

## Done Criteria

- New code follows naming and asset conventions.
- Next.js required file names are not renamed to PascalCase.
- Styling unit choices follow the relative-unit preference while preserving practical `px` use.
- Branch suggestions omit `#`, Korean characters, spaces, underscores, and camelCase.
- Any deviation is intentional and explained.
