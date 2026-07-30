---
name: frontend-quality-verification
description: Use this after Roominus Admin frontend changes to choose and run the smallest useful verification commands.
---

# Frontend Quality Verification

## Purpose

Pick checks that match the actual change. Keep verification light, but do enough to prove the work.

## Read First

- `package.json`
- Changed files from `git status --short` or `git diff --name-only`

## Verification Ladder

| Change Type | Checks |
| --- | --- |
| Docs or agent files only | `git diff --check` |
| Formatting-sensitive docs or code | `pnpm format:check` |
| TypeScript, React, or shared UI changes | `pnpm lint` |
| Next route, config, build, or Server/Client Component boundary changes | `pnpm build` |

Use `npm run ...` only if pnpm is not available in the environment.

## Rules

- Do not claim a check passed unless it was run successfully.
- If a check fails, separate failures caused by the current change from pre-existing failures when possible.
- If a check cannot run because dependencies or environment are missing, report that plainly.
- For UI changes, mention any manual browser check that still matters.

## Output Shape

```markdown
Verification:
- `command`: pass/fail/not run
- Notes:
```
