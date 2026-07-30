# Roominus Admin Agent Setup

This directory explains the repo-local agent setup for Roominus Admin.

The setup is intentionally small:

- Root guide: `AGENTS.md`
- Skills: `.agents/skills/*/SKILL.md`
- Skill metadata: optional `.agents/skills/*/agents/openai.yaml`

## Included Skills

| Skill | Purpose |
| --- | --- |
| `frontend-task-orchestrator` | Classify a frontend task and choose the right workflow. |
| `project-conventions-workflow` | Apply code naming, asset, style unit, branch, and commit conventions. |
| `page-feature-workflow` | Add or change pages, layouts, and route-local UI in `src/app`. |
| `api-integration-workflow` | Add API helpers, TanStack Query hooks, query keys, and cache behavior. |
| `issue-workflow` | Draft or refine GitHub issues using the repo templates and label prefixes. |
| `pr-prep-workflow` | Prepare PR summaries, issue links, screenshots notes, and test checklists. |
| `frontend-quality-verification` | Pick and run the smallest useful verification set. |

## Excluded From The Light Setup

The DONGCHIMI-CLIENT reference repo includes useful but heavier workflows for Jira, Figma, Turbo generators, monorepos, design-system packages, performance budgets, project monitoring, and browser PR review. They are not copied here because this repo is currently a single Next admin app.

Add those only when the matching workflow becomes part of everyday work.
