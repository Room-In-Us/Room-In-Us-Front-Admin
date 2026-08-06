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
- `.agents/skills/project-conventions-workflow/SKILL.md`
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

- Treat the selected repository issue template as the source of truth for the final body structure.
- Preserve the template's headings, heading levels, order, and checklist structure.
- Do not replace template headings with generic sections such as `Summary`, `Details`, or `Acceptance Criteria`.
- Remove instructional blockquotes from the completed copy-ready draft.
- State the problem or goal in observable product terms.
- Keep TODO items implementation-sized and checkable.
- Include acceptance conditions when the requested behavior could be ambiguous.
- When the selected template has no acceptance-criteria section, express acceptance conditions as checkable items inside an existing TODO or detail section.
- For bugs, include current behavior, expected behavior, and reproduction steps using the bug-report template's existing sections.
- For UI work, mention target route, state, and viewport if known.
- For API work, mention endpoint, method, request inputs, response shape, and error behavior if known.
- Do not invent screenshots, links, owners, labels, assignees, or timelines.
- When a template contains an estimated-duration section and no duration was provided, leave it blank or mark it as `미정`.
- Add no new section unless the user explicitly requests it or the selected template cannot express required information.
- Ask only when missing information would make the issue misleading.

## Output Shape

When the user asks for issue text:

1. Select the matching template.
2. Keep the selected template's existing headings, heading levels, order, and checklist structure.
3. Fill the existing sections without replacing them with a generic issue format.
4. Remove instructional comments and blockquotes from the final copy-ready body.
5. Add no new section unless the user explicitly requests it or the template cannot express required information.

Provide:

1. Selected template
2. Issue title
3. Copy-ready Markdown body using the exact selected template structure

## Done Criteria

- Title prefix matches intended label.
- The issue can be implemented without rereading the conversation.
- TODO and acceptance criteria are testable.
- Unknowns are clearly marked instead of guessed.
