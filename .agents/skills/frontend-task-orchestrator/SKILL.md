---
name: frontend-task-orchestrator
description: Use this to classify Roominus Admin frontend work, pick the smallest relevant skill, and decide what context and verification are needed.
---

# Frontend Task Orchestrator

## Purpose

Use this before non-trivial frontend work. Decide the task type, gather only the context needed, and route the work to the right lightweight workflow.

## Read First

- `AGENTS.md`
- Relevant files found with `rg` or `rg --files`
- For Next-specific changes, the closest matching file under `node_modules/next/dist/docs/01-app/`

## Task Routing

| Work Type | Use |
| --- | --- |
| Naming, assets, styling units, branch names, commit messages | `project-conventions-workflow` |
| New or changed App Router page, layout, route-local UI | `page-feature-workflow` |
| API helper, request/response type, query key, query/mutation hook | `api-integration-workflow` |
| GitHub issue drafting, issue refinement, issue breakdown | `issue-workflow` |
| Pull request summary, checklist, issue link, review-ready description | `pr-prep-workflow` |
| Verification after docs or code changes | `frontend-quality-verification` |

Do not invoke heavier workflows for Jira, Turbo, monorepos, design-system packages, PR monitoring, or browser PR review unless they are explicitly introduced to this repo.

## Checklist

1. Identify the user-visible goal and success criteria.
2. Confirm the affected route, feature, shared component, or API surface.
3. Read nearby existing code before choosing structure.
4. Apply `project-conventions-workflow` when naming files/components/assets, suggesting branches, or drafting commits.
5. Keep route-local code local until reuse is real.
6. Choose verification before finishing.

## Output Shape

When a plan is useful, keep it short:

```markdown
## Frontend Work Plan

- Task type:
- Target files:
- Skill:
- Missing context:
- Verification:
```
