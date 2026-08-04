---
name: shared-component-workflow
description: Use this when adding or changing reusable Roominus Admin components under src/shared/components.
---

# Shared Component Workflow

## Purpose

Create or update reusable UI components without promoting route-specific code too early.

Use this for components that are already needed by more than one page, layout, or feature. If the component is only used by one route, keep it route-local and use `page-feature-workflow` instead.

## Read First

- `AGENTS.md`
- `.agents/skills/project-conventions-workflow/SKILL.md`
- Existing components in `src/shared/components`
- Usage sites that will import the component

## Required Inputs

- Component name in PascalCase
- Intended usage sites
- Props and states: default, loading, disabled, empty, error, invalid, or selected
- Accessibility expectations: label, role, keyboard behavior, focus behavior

If the reuse case is unclear, keep the component local until another real usage appears.

## Rules

- Put shared UI under `src/shared/components`.
- Use local route or feature components when copy, route behavior, analytics, or API details are specific to one screen.
- Keep public props small and predictable.
- Prefer composition over boolean props when variants would multiply quickly.
- Use lucide icons for generic UI actions when available.
- Preserve existing shadcn/Radix-style primitives and Tailwind patterns.
- Use `cva` for repeated variant, size, or state class sets, and `cn`/`tailwind-merge` when merging caller-provided `className`.
- Do not introduce Vanilla Extract or `*.css.ts`; this project uses Tailwind CSS 4, shadcn/Radix-style primitives, and global CSS only where needed.
- Avoid nested cards and layout abstractions that hide page structure.

## Implementation Flow

1. Confirm the component has more than one real usage or a near-certain reuse path.
2. Read the closest existing component pattern.
3. Define props around user-visible state and behavior, not backend shape.
4. Implement the component with stable layout dimensions and responsive constraints.
5. Wire exports only where the project already uses barrel exports or direct imports.
6. Update all usage sites and run targeted verification.

## Done Criteria

- The component belongs in `src/shared/components`.
- Props are narrow, named clearly, and do not expose route-specific details.
- Loading, disabled, error, and focus states are handled when relevant.
- Text fits at common admin viewport widths.
- Verification is run or the skipped check is explained.
