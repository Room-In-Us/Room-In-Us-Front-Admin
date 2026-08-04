---
name: frontend-fundamentals-review
description: Use this when reviewing frontend diffs for readability, predictability, cohesion, coupling, and logic composition.
---

# Frontend Fundamentals Review

## Purpose

Review frontend changes for maintainability risks beyond formatter, lint, and build results.

Use this for non-trivial React, page, component, hook, or API wiring changes. Skip it for docs-only or formatting-only edits.

## Read First

- `AGENTS.md`
- The current diff or requested files
- Nearby components, hooks, API helpers, and usage sites
- Relevant workflow skills for the changed area, such as `page-feature-workflow`, `shared-component-workflow`, `form-flow-workflow`, or `api-integration-workflow`

## Review Criteria

- Readability: names, control flow, component shape, and JSX structure are easy to scan.
- Predictability: props, state, effects, keys, memoization, and return values behave as callers expect.
- Cohesion: responsibilities stay close to the code that owns them.
- Coupling: route, copy, API, analytics, and styling details do not leak into generic code.
- Logic composition: extracted helpers or hooks have a real responsibility and stable usage sites.

## Common Checks

- Avoid render-time side effects.
- Avoid copying props into state without a clear synchronization rule.
- Avoid conditional hook calls, unstable list keys, and unnecessary `useMemo` or `useCallback`.
- Keep presentational components free of transport details.
- Keep route-only behavior out of shared components.
- Do not extract a hook only because a component is long.
- Prefer pure helpers for mapping, formatting, grouping, and validation that do not need React state.

## Output Shape

When reviewing, lead with findings:

```markdown
Findings:

- [Severity] `path/to/file.tsx:line` - Issue.
  Fix: Suggested change.

Open questions:

- Question, if any.

Residual risk:

- Anything not checked.
```

If no issues are found, say that clearly and mention any remaining verification gap.

## Done Criteria

- Findings are tied to files and lines when possible.
- Suggestions are actionable and scoped.
- Taste-only preferences are separated from correctness or maintainability risks.
- Lint/build results are not treated as a substitute for review judgment.
