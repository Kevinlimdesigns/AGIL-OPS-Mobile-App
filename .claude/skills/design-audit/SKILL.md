---
name: design-audit
description: Audit a UI design (web dashboard, app screen, or flow) for what is missing and what can be improved — covering UX, accessibility (WCAG), and visual/design-system consistency. Use when the user asks to review, audit, critique, or find gaps in a design, a Figma frame, or a set of screenshots. Produces a prioritized, evidence-backed findings report; it does NOT modify the design.
---

# Design Audit

Audit a UI design and report what is missing and what can be improved. This is an
**advisory** skill: produce findings and recommendations, never silently change the
design. The human stays in the loop and decides what to act on.

## When to use
- "Audit / review / critique this design"
- "What's missing in this dashboard?"
- "Find UX or accessibility problems in this Figma frame / these screenshots"

## Inputs (in order of preference)
1. **Figma frame** — the design source of truth. Use the Figma MCP tools:
   - `get_metadata` — structure/hierarchy of the frame (cheap; get this first to scope)
   - `get_design_context` — layers, text, components, layout, variables
   - `get_screenshot` — the rendered pixels (audit visual issues against this)
   - `get_variable_defs` — design tokens (colors, spacing, type) to check consistency
   Ask the user for the Figma URL if they have not provided one.
2. **Screenshots / image exports** — Read them directly.
3. **Description or spec** — audit against it, but flag that no visual was available.

If you have neither a Figma URL nor an image, ask for one before auditing. Do not
audit from memory.

## Process
1. **Scope.** Confirm what is being audited (which screen/flow) and who the user is
   (e.g. a dispatcher monitoring live operations). Audit findings must be judged
   against that user's goals, not generic prettiness.
2. **Gather** the design via the inputs above.
3. **Walk the checklist** below. For every finding, capture: the area, the specific
   evidence (which element / what you observed), why it matters for this user, and a
   concrete recommendation.
4. **Prioritize.** Rank each finding P1 (blocks the user / accessibility violation),
   P2 (meaningful friction or inconsistency), or P3 (polish / nice-to-have).
5. **Report** using the output format below. Then STOP and let the user decide —
   do not open Figma to make edits unless they explicitly ask.

## Checklist

### A. Completeness — what's missing
- Empty states: is there a designed state for no data / first run?
- Loading states: how does a slow query or live feed render before data arrives?
- Error states: failed load, lost connection, permission denied, no results.
- Edge data: very long text, large numbers, many rows, zero rows, stale data.
- Confirmation / undo for destructive or high-stakes dispatcher actions.
- Feedback after an action (success/failure toast, status change).
- Required-but-absent screens in the flow (e.g. detail view, filters, search).

### B. UX & information architecture
- Is the primary task obvious within 5 seconds? For a dispatcher: situational
  awareness — what needs attention right now?
- Information hierarchy: is the most operationally critical data the most prominent?
- Density vs. clarity: ops dashboards run hot — is critical signal buried in noise?
- Navigation: can the user always tell where they are and get back?
- Real-time data: is freshness/staleness shown? Is auto-refresh vs. manual clear?
- Number of steps/clicks for frequent tasks — any avoidable friction?
- Consistency of interaction patterns across screens.

### C. Accessibility (WCAG 2.2 AA)
- Color contrast: text and meaningful UI ≥ 4.5:1 (≥ 3:1 for large text / UI components).
- Color is not the *only* signal (status by color alone fails — add icon/label/text).
- Touch/click targets ≥ 24×24px (≥ 44px recommended for primary actions).
- Text legibility: minimum sizes, line length, line height.
- Focus order and visible focus states implied by the design.
- Labels on all inputs; icons that act as buttons have text or accessible names.
- Motion / flashing content concerns for live-updating feeds.

### D. Visual & design-system consistency
- Colors, type ramp, spacing match the defined tokens/variables (use `get_variable_defs`).
- Reused components vs. one-off detached copies.
- Alignment, spacing rhythm, and grid adherence.
- Iconography style and sizing consistency.
- Brand/voice consistency in microcopy.

## Output format

```
# Design Audit — <screen/flow name>
Source: <Figma URL or screenshot> · User: <role> · Date: <date>

## Summary
<2–3 sentences: overall state, biggest risks.>

## Findings
| # | Pri | Area | Finding | Recommendation |
|---|-----|------|---------|----------------|
| 1 | P1  | A11y | <evidence> | <fix> |
...

## Missing (gaps to design next)
- <state/screen> — why it's needed

## Open questions for you
- <anything that needs the designer's intent before judging>
```

## Guardrails
- Advisory only — never edit the Figma file or generate replacement designs unless
  explicitly asked in a separate instruction.
- Cite evidence for every finding (element name, observed value, contrast ratio).
  Do not invent measurements; if you cannot verify (e.g. exact hex), say so.
- Separate objective violations (WCAG, missing states) from subjective opinion, and
  label opinion as such.
