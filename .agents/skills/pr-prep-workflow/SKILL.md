---
name: pr-prep-workflow
description: Use this when preparing, drafting, updating, or reviewing pull request descriptions for Roominus Admin, including issue links, PR titles, summaries, screenshots, test checklists, changed files, verification results, and review readiness.
---

# PR Prep Workflow

## Purpose

Prepare PR text that follows this repo's template and accurately reflects the local diff.

## Read First

- `AGENTS.md`
- `.agents/skills/project-conventions-workflow/SKILL.md` as the single source of truth for branch and commit conventions
- `.github/pull_request_template.md`
- `.github/labeler.yml` when choosing a title prefix
- `package.json` and `.github/workflows/ci.yml` when choosing verification
- Current diff with `git status --short`, `git diff --name-only`, and focused file reads

## Title Prefixes

Prefer the same prefixes used by the labeler:

- `[FEAT]` new feature
- `[FIX]` bug fix
- `[REFACTOR]` refactor
- `[API]` API integration
- `[DOCS]` documentation
- `[STYLE]` UI/style-only polish
- `[TEST]` tests
- `[SETTING]` config/setup
- `[DEVELOP]` deploy/development workflow
- `[CROSSBROWSING]` browser compatibility

## Branch And Commit Conventions

Use `.agents/skills/project-conventions-workflow/SKILL.md` for branch names, commit formats, examples, commit types, and commit body rules. Do not restate those rules here.

## PR Body Rules

- Base the summary on the actual diff, not intent alone.
- Link issues in the `ISSUE` section with `close #123` or `refs #123` only when a real issue number is known.
- Keep `What is this PR?` focused on user-visible behavior and key implementation decisions.
- In `Screenshot`, add screenshots or GIF notes only if they exist. Otherwise write `N/A` with a short reason.
- Fill `Test Checklist` with actual checks, such as `pnpm format:check`, `pnpm lint`, `pnpm build`, or manual route checks.
- Mark unchecked items for checks that still need to be run.
- Do not claim CI, deployment, screenshots, or tests passed without evidence.
- If CodeRabbit, Copilot, or teammate review already covered a finding, do not repeat the same comment; summarize only unresolved review risk or the PR point reviewers should focus on.
- For non-trivial frontend PRs, include a short reviewer focus such as Server/Client Component boundary, query key/cache behavior, shared component ownership, or verification gap.

## Suggested Body

```markdown
## ISSUE

close #<issue-number>

<br><br>

## What is this PR?

- ...

<br><br>

## Screenshot

N/A

<br><br>

## Test Checklist

- [x] `pnpm lint`
- [ ] `pnpm build`
```

## Verification Guidance

Use `frontend-quality-verification` after code changes. CI currently runs:

- `pnpm format:check`
- `pnpm lint`
- `pnpm build`

For docs-only PRs, `git diff --check` is usually enough locally unless the user wants CI parity.

CodeRabbit is configured by `.coderabbit.yaml` to review `develop` and `main` PRs, skip draft PRs, and use `AGENTS.md` plus `.agents/skills/**/SKILL.md` as code guidelines. Treat its output as review input, not as proof that local verification passed.

## Done Criteria

- PR title and body match the actual change.
- Related issue is linked when known.
- Screenshot section is honest.
- Test checklist distinguishes completed and pending checks.
- CodeRabbit or teammate review comments are not duplicated without new evidence.
- Residual risk is stated when verification is incomplete.
