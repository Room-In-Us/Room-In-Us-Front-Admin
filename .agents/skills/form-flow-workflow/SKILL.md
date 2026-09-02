---
name: form-flow-workflow
description: Use this when implementing form validation, submit flows, mutations, and loading/error/success states.
---

# Form Flow Workflow

## Purpose

Implement predictable form behavior for Roominus Admin screens, including validation, submit state, server errors, and success handling.

Use this with `api-integration-workflow` when a form submits to an API or uses a React Query mutation.

## Read First

- `AGENTS.md`
- `.agents/skills/page-feature-workflow/SKILL.md` for route ownership
- `.agents/skills/api-integration-workflow/SKILL.md` when submit calls an API
- Existing forms or input patterns in `src/app`, `src/features`, and `src/shared`

## Required Inputs

- Fields and input types
- Validation rules and user-facing error messages
- Submit behavior
- Loading, disabled, failure, and success behavior
- API request and error shape when server-backed

If validation or submit behavior is unclear and cannot be inferred from nearby code, ask before inventing business rules.

## Rules

- Keep field state, validation, submit orchestration, and transport concerns separated enough to read.
- Do not hide server errors silently.
- Disable submit only for intentional conditions such as invalid input, unchanged state, or in-flight submission.
- Keep validation messages close to the relevant field when possible.
- Ensure labels, focus-visible states, keyboard submission, and error association are usable.
- Keep API payload mapping near the API boundary when it protects UI code.

## Implementation Flow

1. Decide whether the form belongs in the page, a route-local component, a feature component, or shared UI.
2. Map each field to its source of truth, validation rule, and displayed error.
3. Separate client validation from server error handling.
4. Add mutation or submit logic with explicit loading and failure states.
5. Handle success intentionally: refetch, invalidate, navigate, close dialog, or show feedback.
6. Check keyboard flow, disabled behavior, and layout stability.
7. Run targeted verification.

## Done Criteria

- Validation matches the requested behavior.
- Submit state and disabled state are intentional.
- Server errors are visible or otherwise handled deliberately.
- Loading, failure, and success states are consistent.
- Accessibility basics are covered for labels, focus, and error text.
- Verification is run or the skipped check is explained.
