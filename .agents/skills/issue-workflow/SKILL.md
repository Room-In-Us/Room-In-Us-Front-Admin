---
name: issue-workflow
description: Use this when drafting, refining, splitting, or reviewing GitHub issues for Roominus Admin, including bug reports, feature requests, custom tasks, labels, title prefixes, acceptance criteria, TODO lists, reproduction steps, and references.
---

# Issue Workflow

## Purpose

Create concise GitHub issues that match this repo's templates and are ready to implement.

## Read First

- `AGENTS.md`
- Matching template under `.github/ISSUE_TEMPLATE/`
- `.github/labeler.yml` when choosing a title prefix
- Nearby source files only when issue scope depends on current implementation

## Template Selection

| Issue Type           | Template                                    | Title Prefix |
| -------------------- | ------------------------------------------- | ------------ |
| New feature          | `.github/ISSUE_TEMPLATE/feature_request.md` | `[FEAT]`     |
| Bug fix              | `.github/ISSUE_TEMPLATE/bug_report.md`      | `[FIX]`      |
| API work             | `.github/ISSUE_TEMPLATE/custom.md`          | `[API]`      |
| Refactor             | `.github/ISSUE_TEMPLATE/custom.md`          | `[REFACTOR]` |
| Docs                 | `.github/ISSUE_TEMPLATE/custom.md`          | `[DOCS]`     |
| Style/UI-only polish | `.github/ISSUE_TEMPLATE/custom.md`          | `[STYLE]`    |
| Test work            | `.github/ISSUE_TEMPLATE/custom.md`          | `[TEST]`     |
| Config/setup         | `.github/ISSUE_TEMPLATE/custom.md`          | `[SETTING]`  |

Use another labeler prefix from `.github/labeler.yml` only when it clearly fits better.

## Writing Rules

- State the problem or goal in observable product terms.
- Keep TODO items implementation-sized and checkable.
- Include acceptance criteria when the requested behavior could be ambiguous.
- For bugs, include current behavior, expected behavior, and reproduction steps.
- For UI work, mention target route, state, and viewport if known.
- For API work, mention endpoint, method, request inputs, response shape, and error behavior if known.
- Do not invent screenshots, links, owners, labels, or timelines.
- Ask only when missing information would make the issue misleading.

## Output Shape

Use this structure when the user asks for issue text:

```markdown
Title: [PREFIX] Short concrete title

## Summary

## Details

## TODO

- [ ] ...

## Acceptance Criteria

- [ ] ...

## References
```

For bug reports, replace `Details` with:

```markdown
## Current Behavior

## Steps To Reproduce

## Expected Behavior
```

## Done Criteria

- Title prefix matches intended label.
- The issue can be implemented without rereading the conversation.
- TODO and acceptance criteria are testable.
- Unknowns are clearly marked instead of guessed.
