# Roominus Admin Agent Setup

This directory explains the repo-local agent setup for Roominus Admin.

The setup is intentionally small:

- Root guide: `AGENTS.md`
- Skills: `.agents/skills/*/SKILL.md`
- Skill metadata: optional `.agents/skills/*/agents/openai.yaml`

## Included Skills

| Skill                             | Purpose                                                                    |
| --------------------------------- | -------------------------------------------------------------------------- |
| `frontend-task-orchestrator`      | Classify a frontend task and choose the right workflow.                    |
| `project-conventions-workflow`    | Apply code naming, asset, style unit, branch, and commit conventions.      |
| `page-feature-workflow`           | Add or change pages, layouts, and route-local UI in `src/app`.             |
| `server-client-boundary-workflow` | Decide durable Next Server and Client Component boundaries.                |
| `shared-component-workflow`       | Add or change reusable shared UI components.                               |
| `form-flow-workflow`              | Implement validation and submit state for forms.                           |
| `api-integration-workflow`        | Add API helpers, TanStack Query hooks, query keys, and cache behavior.     |
| `frontend-fundamentals-review`    | Review frontend diffs for maintainability risks.                           |
| `issue-workflow`                  | Draft or refine GitHub issues using the repo templates and label prefixes. |
| `pr-prep-workflow`                | Prepare PR summaries, issue links, screenshots notes, and test checklists. |
| `frontend-quality-verification`   | Pick and run the smallest useful verification set.                         |

## Excluded From The Light Setup

Jira, Figma, Turbo generator, monorepo, design-system package, performance budget, project monitoring, and browser PR review workflows are intentionally not included because this repository is currently a single Next.js Admin app.

Add those only when the matching workflow becomes part of everyday work.
