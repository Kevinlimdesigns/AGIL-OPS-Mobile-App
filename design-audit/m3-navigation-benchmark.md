# M3 Navigation Benchmark — reference for AGIL nav/tab components

**Reference file:** Material 3 Design Kit (Community) `ZYlzCHpDJ057CUzQVFN7zd`, node `55141:14251` (Navigation).
**Purpose:** Reference Material 3 *philosophy* (sizing, spacing, indicator, states) for AGIL's own nav/tab
components. **AOH remains the single source of truth** — we adopt M3 *structure/ergonomics*, NOT M3 color/type
tokens. All AGIL colour stays on `color-*`/`severity/*`, type on `text-*/font-*` (per AOH-ADHERENCE.md).

## Measured M3 values (Navigation bar — vertical nav item, the phone pattern)
Source nodes: nav item `58016:37058` (Selected), nav bar `58016:37236`.
- **Icon:** 24 dp.
- **Active indicator:** pill **56 × 32**, radius **16**, fill = `secondary-container` (soft tonal), sits *behind the icon*.
- **Label:** `label-medium` — Roboto **Medium, 12 sp**, line-height **16**, letter-spacing **+0.5**.
- **Item:** flex-col, vertical padding **6**, gap icon→label **4**; width flexes (104 in kit).
- **Bar height:** **64** (M3 Expressive compact) / 80 (classic M3).
- **States:** Enabled / Hovered / Focused / Pressed, each × Selected(true/false).
  State layers: hover 8 %, focus/press **10 %** of `on-secondary-container` / `on-surface`.
- **Badge:** small (6 dp dot) / large (numbered, ~16 dp).
- **Grid:** 4 dp base rhythm throughout.

## AGIL values today (Nav / Tab Item `68:1219`, Tab bar `52:1173`)
- **Icon:** navicon 22 dp inside a 24 holder.
- **Active indicator:** *top underline* **28 × 2.5**, radius 4, `color-bg-primary`.
- **Label:** `text-xs/font-medium` (Geist Medium 12/16), tracking **0**. Active `color-text-interactive`, inactive `color-text`.
- **Item:** flex-col gap-4, fixed **73 × 56**.
- **States:** Active / Inactive only (no pressed/focus/hover, no state layer).
- **Badge:** 16 × 16 numbered dot, `color-bg-primary`, 2 dp `color-bg` ring — matches M3 "large badge".

## Gaps & recommendations (AOH-compliant)
| # | Area | M3 | AGIL | Recommendation |
|---|------|-----|------|----------------|
| 1 | **Active indicator** | pill 56×32 r16 behind icon (tonal container) | 28×2.5 top underline | **Adopt the M3 pill.** Fill with a *subtle* AOH interactive-container token (not the strong `color-bg-primary`); if none exists, add `color-bg-primary-subtle` or use `color-bg-primary` @ low opacity. Biggest identity change — confirm before applying. |
| 2 | Icon size | 24 | 22 | Bump navicon 22→**24**. |
| 3 | Label tracking | +0.5 | 0 | Add **+0.5** letter-spacing on nav labels (M3 small-label legibility). Keep Geist + `text-xs`. |
| 4 | Item / bar height | item ~64, bar 64–80 | item 56, bar ~91 | Grow item to **64** (indicator 32 + gap 4 + label 16 + py 6·2). Keep bar ≥ 64 above the gesture inset. |
| 5 | **States** | +Hover/Focus/Pressed, 8/10 % state layers | Active/Inactive | Add a **Pressed** state with an AOH state-layer token (ties to the open "no state-layer token" item). Focus/hover optional on touch. |
| 6 | Grid | 4 dp | 4/8 | Already aligned — keep multiples of 4. |

## Applied — 2026-07-01 (Nav / Tab Item `68:1219`, full M3 alignment)
Adopted M3 *structure/ergonomics*, kept AOH tokens:
- **Active indicator → M3 pill.** Removed the 28×3 top underline; added a **56×32 r16 pill behind the icon**.
  Fill = `color-bg-primary` @ **0.15 opacity** (frosted — no subtle interactive-container token exists in AOH,
  so bound token + reduced opacity, same pattern as the SOS button). Inactive pill = transparent.
- **Icon** 22 → **24 dp**.
- **Label** +**0.5 px** letter-spacing (M3 label-medium legibility). *One intentional deviation from the
  AOH `text-xs` style (tracking 0); size/weight/family/line-height stay on the AOH style.*
- **Item height** 56 → **64** (pill 32 + gap 4 + label 16, centered = M3 py-6).
- **Pressed state** added as two non-breaking variants — `State=Active-Pressed` / `State=Inactive-Pressed` —
  each with a **10 % `color-text` state layer** over the pill (existing instances stay on Active/Inactive).
- **Instance sweep:** the pill fill baked opacity 1 as an instance override on creation (same shadowing as the
  SOS fix) — swept every page and set active pills to 0.15: 2 (components) + 27 Comms + 30 Incident + 23 Flows
  + 29 Prototype = **111** pills. Verified on the Tab bar (52:1173) + Comms State screen.
- **Not changed:** existing Tab bar instances keep a 48 dp item-height override (touch target ≥ 48, content not
  clipped, renders correctly). Bump bar instances to 64 only if strict M3 item height is wanted.

## Notes
- M3 nav bars carry 3–6 destinations — AGIL's 5 (Comms/Chat/Incidents/Map/Resources) is in range.
- Keep status/severity encoding = colour + icon + label (AGIL rule) even where M3 relies on the indicator alone.
- This doc is *reference only*; component edits are applied separately per AOH-ADHERENCE.md and re-audited.
