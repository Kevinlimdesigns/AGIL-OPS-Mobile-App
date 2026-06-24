# Audit — Incident List Screen

**Date:** 2026-06-24
**Surface:** Incident List (`FLOW/52:965`, "All incidents") — AGIL Mobile App, Slice 1 Incident Module
**Source:** Figma design (`e6RBhSWdLlLinhceozYLYe`, node `194:4529`)
**Basis:** No implementation yet — this audits the Figma design. Contrast computed from real token hex values; touch targets from frame geometry. Code-only dimensions (keyboard/ARIA, render perf) marked not-yet-assessable.

## Health Score

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 3/4 | One AA contrast fail (search placeholder); status correctly word+color |
| 2 | Performance | N/A | No implementation to measure |
| 3 | Responsive Design | 3/4 | Mobile-only by design; some sub-44px tap targets (pills, header icons) |
| 4 | Theming | 4/4 | Full token system, native dark mode, zero hard-coded values |
| 5 | Anti-Patterns | 4/4 | No AI slop tells — distinctive, intentional |
| **Total** | | **14/16** assessable | **Good** |

## Anti-Patterns Verdict — PASS

Does not look AI-generated. No gradient text, no glassmorphism (talk bar is a solid slate surface), no hero-metric template, no identical decorative card grid (list rows with 1px hairline dividers), no side-stripe borders, single typeface (Geist), status colors meaningful and word-paired. Strongest dimension.

## Measured Contrast (WCAG AA)

| Element | Pair | Ratio | Need | Result |
|---|---|---|---|---|
| Screen title "Incidents" | `#fafafa` on `#09090b` | 19.06 | 3 | PASS |
| Card title (#1042 …) | `#fafafa` on `#09090b` | 19.06 | 4.5 | PASS |
| Muted location/metadata | `#a1a1aa` on `#09090b` | 7.76 | 4.5 | PASS |
| **Search placeholder** | `#71717a` on `#18181b` | **3.67** | 4.5 | **FAIL** |
| Active tab text | `#030712` on `#0ea5e9` | 7.26 | 4.5 | PASS |
| Inactive tab text | `#a1a1aa` on `#27272a` | 5.81 | 4.5 | PASS |
| CRITICAL pill | `#f87171` on `#450a0a` | 5.84 | 4.5 | PASS |
| HIGH pill | `#fde047` on `#422006` | 11.06 | 4.5 | PASS |
| Status "Active" (green) | `#6ee7b7` on `#09090b` | 13.05 | 4.5 | PASS |
| Active nav tab | `#38bdf8` on `#09090b` | 9.29 | 3 | PASS |
| Talk bar secondary (white 70%) | `#b9bec5` on `#15263d` | 8.16 | 4.5 | PASS |

## Findings

### [P1] Search placeholder fails WCAG AA contrast
- **Location:** Incident list → search field placeholder ("Search incidents…")
- **Category:** Accessibility · **WCAG:** 1.4.3
- **Measured:** `#71717a` on `#18181b` = **3.67:1** (placeholder needs 4.5:1).
- **Impact:** Hard to read, especially in sunlight (field-use context).
- **Fix:** Bump placeholder token. `#a1a1aa` → 6.91:1; `#8a8a93` → 5.18:1 (quieter than muted body). Token-level fix — propagates app-wide.
- **Command:** `/impeccable colorize`

### [P2] Filter pills likely below 44px touch target
- **Location:** Header → All / Active / Closed / Declined pills
- **Category:** Responsive/A11y · **WCAG:** 2.5.8 (24px min AA) / 2.5.5 (44px AAA)
- **Measured:** ~28–32px tall; clears 24px AA floor, misses the 44px comfortable target in PRODUCT.md.
- **Fix:** Keep visual size, extend tap area to ≥44px tall via padding/hit-slop.
- **Command:** `/impeccable adapt`

### [P2] Header icon buttons (add-incident, avatar) likely sub-44px
- **Location:** Header top row — add-incident icon, avatar (avatar token 32px)
- **Category:** Responsive/A11y · **WCAG:** 2.5.8
- **Fix:** Wrap in ≥44×44px tap targets (`radius-iconButton` already defined).
- **Command:** `/impeccable adapt`

### [P2] "Resolved" status reads as muted gray, not a status color
- **Location:** Incident card status line (#1041 → "Resolved")
- **Category:** Accessibility/Anti-pattern
- **Impact:** "Active" gets green but "Resolved" appears muted gray — inconsistent with the Status-Is-Sacred rule, easy to overlook when scanning.
- **Fix:** Assign every status its own semantic token + word (Active/Resolved/Closed/Declined); never fall back to plain muted.
- **Command:** `/impeccable colorize`

### [P3] No defined focus-visible treatment
- **Category:** Accessibility · **WCAG:** 2.4.7
- DESIGN.md prescribes a sky focus ring; ensure it's in the component set for keyboard/switch access.
- **Command:** `/impeccable harden`

### [P3] Single breakpoint only
- **Category:** Responsive
- Designed at 375px. Confirm 320px / large-phone / landscape behavior (text scaling, talk bar + tab bar stacking). Coverage note, not a defect.
- **Command:** `/impeccable adapt`

## Patterns & Systemic Issues
- **Placeholder color is a single token** — one fix resolves the only AA failure app-wide.
- **Touch targets** — visual sizing correct, but several interactive elements need explicit hit-area expansion to meet the 44px field bar. Address as a consistent pattern.

## Positive Findings
- Token discipline is exemplary — nothing hard-coded.
- Status semantics accessible — color + word (color-blind / low-light safe).
- Strong contrast where it counts (body 19:1, muted 7.76:1, status pills 5.8–13:1).
- Slop-free, distinctive control-room aesthetic.

## Recommended Actions (priority order)
1. **[P1] `/impeccable colorize`** — fix placeholder token to clear AA; audit status colors for full coverage.
2. **[P2] `/impeccable adapt`** — expand tap targets (filter pills, header icons) to ≥44px.
3. **[P3] `/impeccable harden`** — add focus-visible states and edge-case/empty handling.
4. **`/impeccable polish`** — final pass once the above land.
