# Research — Typography, Text Sizing & Components

**AGIL Ops Hub — Responder App** · Android (Kotlin/Jetpack Compose), dark-first,
field / public-safety use.

> **What this doc is.** A comprehensive, source-backed reference for the app's
> **typography, text sizing, spacing, touch targets, and component dimensions**.
> For each area it states the established standard, cites credible sources,
> gives a verdict on where AGIL aligns vs. diverges, and recommends fixes.
>
> **How it relates to the other docs (read together):**
> - [`DESIGN.md`](../../DESIGN.md) — **canonical** token spec (Geist type scale,
>   colors, radius, spacing, component dims). This doc does **not** redefine
>   tokens; it explains *why* they're right and where they fall short.
> - [`design-audit/mobile-rules.md`](../../design-audit/mobile-rules.md) — the
>   **operative** M3-benchmarked ergonomic rules used by the audit.
> - [`design-audit/research-sources.md`](../../design-audit/research-sources.md)
>   and [`industry-benchmark.md`](../../design-audit/industry-benchmark.md) —
>   the source index and public-safety benchmark this doc consolidates and deepens.
> - [`PRODUCT.md`](../../PRODUCT.md) — principles & accessibility target.

---

## 0. Governing model

The team maintains **one** design system — **AOH UI / ShadCN** (Geist type,
neutral dark tokens). **Material 3 is used only as the ruler for ergonomics** —
sizing, spacing, targets, type comfort — because the build target is
**Kotlin + Jetpack Compose**, where M3 defines what is correct on-device.

> **Mental model:** AOH = *how it looks* · Material 3 = *how big it is / where it
> sits.* Borrow M3's measurements, not its visual identity.
> (Source: [`mobile-rules.md`](../../design-audit/mobile-rules.md).)

Units: **dp** for size/spacing, **sp** for type (Compose). In Figma, 1px = 1dp/sp.

---

## 1. Typography

### 1.1 Current system (from `DESIGN.md`)
One typeface — **Geist** (`Geist, system-ui, sans-serif`) — hierarchy from weight
(300–700) + size. Operative ShadCN ramp: **12 / 14 / 16 / 18 / 20 / 24 sp**.

| Style | Size / Line | Weight | Use |
|---|---|---|---|
| Title | 20 / 32 | 700 | Screen titles ("Incidents") |
| Body | 16 / 24 | 400 (500/700 for emphasis) | Reading text, inputs, messages |
| Label | 14 / 20 | 500 | Buttons, tabs, list-row primary, field labels |
| Caption | 12 / 16 | 700 | Pills (CRITICAL/HIGH), eyebrows, counts |

### 1.2 What the standards say
| Standard | Guidance | Source |
|---|---|---|
| Material 3 type scale | Body Large **16**, Body Medium **14**, Body Small **12**; Label Large **14**, Title Medium **16** | [M3 type scale](https://m3.material.io/styles/typography/type-scale-tokens) |
| Apple HIG | System font (SF Pro); **11 pt absolute legibility floor**; supports Dynamic Type | [Apple HIG — Typography](https://developer.apple.com/design/human-interface-guidelines/typography) |
| Min body size | **14 sp minimum, 16 sp preferred** for mobile reading (25–35 cm hold distance) | [M3 type scale](https://m3.material.io/styles/typography/type-scale-tokens) · [M3 text resizing](https://m3.material.io/foundations/writing/text-resizing) |
| Command-&-control type | Clean grotesque / system (Astro: Open Sans, Roboto) | [Astro UXDS — Typography](https://cms.astrouxds.com/design-guidelines/typography) |

### 1.3 Verdict
- **Geist ✅** — a clean grotesque; on-standard for command-and-control. Roboto is
  the Compose-native fallback.
- **Ramp maps cleanly to M3 ✅** — Body 16/Label 14/Caption 12 line up with Body
  Large / Label Large / Body Small.
- **Caption at 12 sp is fine for labels/badges only** — never for body text
  (M3/HIG both put comfortable reading at 14–16 sp).

### 1.4 Gaps & recommendations
1. **Bump primary content toward 16–20 sp for field/glance reading.** Incident
   title, status, and key values are read at arm's length, in sunlight, under
   stress — err larger. Keep 14 for secondary/meta, 12 for labels only.
   (See [`industry-benchmark.md`](../../design-audit/industry-benchmark.md) §2.)
2. **No Dynamic Type / responsive scaling documented.** Both M3 and HIG expect
   text to honor the OS text-size setting. In Compose this means **`sp` (not
   `dp`) for all text** and testing at large font scales. Add a rule.
   Source: [Apple HIG — Typography](https://developer.apple.com/design/human-interface-guidelines/typography),
   [M3 text resizing](https://m3.material.io/foundations/writing/text-resizing).
3. **12 sp floor must hold.** The typography audit found stray `11px`/`13px`/`17px`
   off-ramp sizes; `11px` breaks the floor. Keep everything on the
   12/14/16/18/20/24 ramp. (See
   [typography report](../../design-audit/reports/2026-07-01-typography.md).)
4. **Undocumented:** line-length guidance, tabular/monospaced figures for
   numeric fields (timers, ETAs, counts — the app uses tabular numerals in the
   prototype), letter-spacing rationale (currently all `0`), and **Geist
   licensing/loading on Android** (bundle the font; confirm license).

---

## 2. Spacing & grid

**Current:** AOH `Spacing/*` = **4 / 8 / 12 / 16 dp**; 4 dp base grid, 8 dp
preferred; screen side margins 16 dp; min card/row padding 16 dp horizontal.
Compact phone grid: 4 columns, 16 dp margins/gutters.
(Source: [`mobile-rules.md`](../../design-audit/mobile-rules.md) §2, §5.)

**Standard:** the **8-point grid** — spacing in multiples of 8 (with 4 as the
half-step) for consistent rhythm, clean scaling across densities, and smoother
design→Compose handoff. Source: [8-point grid](https://spec.fm/specifics/8-pt-grid).

**Verdict / gap:** the 4/8/12/16 base ✅ aligns with the 8-pt grid, **but the
scale is truncated** — there's no 20/24/32/40/48 step for section gaps and larger
layouts. **Recommend extending** `Spacing/*` to `4 / 8 / 12 / 16 / 24 / 32 / 48`
so large vertical rhythm is also token-governed, not hardcoded.

---

## 3. Touch targets & sizing

### 3.1 The numbers (and the conflict to reconcile)
Three docs currently state target sizes slightly differently:
- `DESIGN.md`: button-primary **48px**, button-secondary/input **44px**.
- `mobile-rules.md`: minimum interactive target **48×48 dp**, 8 dp gaps.
- `docs/responder-app-flow-map.md`: ≥ **48dp** targets, nav **56dp**, Talk Group
  Bar **64dp**.
- Audit found real offenders: **32 dp avatars**, **28–32 dp filter pills**.

### 3.2 What the standards say
| Standard | Value | Source |
|---|---|---|
| WCAG 2.5.8 Target Size (Minimum), AA | **24×24 CSS px** (or adequate spacing) | [WCAG 2.2](https://www.w3.org/TR/WCAG22/) |
| WCAG 2.5.5 Target Size (Enhanced), AAA | **44×44 CSS px** | [WCAG 2.2](https://www.w3.org/TR/WCAG22/) |
| Apple HIG | **44×44 pt** | [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/) |
| Material / Android | **48×48 dp**, ≥ 8 dp between targets | [M3 — Accessibility](https://m3.material.io/foundations/designing/structure) |
| Emergency / gloved / critical | **56–64 dp** recommended | [Improving tap targets (emergency 60px+)](https://blog.openreplay.com/improving-tap-targets-mobile-ux/) · [Target size guidance](https://www.flexy.global/resources/digital-product-design/master-digital-product-design-ux-tips-for-target-size) |

### 3.3 Verdict & recommendations
1. **Adopt 48 dp as the single documented floor** (Android baseline; a control
   may *look* 40 dp but its target must extend to 48 dp with transparent
   padding). Reconcile the 44px references to 48 dp — the 44px comes from the
   iOS pt figure; the Compose target is 48 dp.
2. **Add a "critical / field" tier of ≥ 56–64 dp** for high-stakes, one-handed,
   gloved, in-motion actions: **Accept incident, PTT talk, End call, SOS**. The
   PTT control should be the **largest tappable element on its screen**.
   (Aligns with [`industry-benchmark.md`](../../design-audit/industry-benchmark.md) P1.)
3. **Fix the sub-target offenders:** 32 dp avatars and 28–32 dp filter pills must
   carry a ≥ 48 dp touch target even if the visual is smaller.
4. **Document the px ↔ dp ↔ sp mapping.** Currently undocumented and a source of
   the 44-vs-48 confusion. State the baseline: in Figma/spec **1 px = 1 dp
   (size/space) = 1 sp (type)** at mdpi; Compose scales by device density.

---

## 4. Component dimensions

Current specs (from `DESIGN.md`), validated against M3 ergonomics:

| Component | Current | Standard check | Verdict |
|---|---|---|---|
| button-primary | h **48**, radius 6, pad 0/16 | ≥ 48 dp target ✅ | ✅ |
| button-secondary | h **44** | should be **48 dp** | ⚠️ raise to 48 |
| input-field | h **44**, radius 6, pad 0/12 | 48–56 dp comfortable | ⚠️ consider 48–56 |
| pill (critical/high) | full-round, Caption 12/700, pad 2/8 | label chip (not a target) | ✅ (ensure host row is tappable ≥48) |
| tab-pill-active | primary fill, full-round, pad 4/12 | toggle target ≥ 48 | ✅ if target extends |
| bottom tab bar | 5 tabs | M3 bottom nav **80 dp** | ✅ ref |
| top app bar | — | M3 **64 dp** | ✅ ref |
| incident-card | radius 6, pad 12/16, hairline dividers | 16 dp content pad ✅ | ✅ |

**Undocumented components** the flow-map references only by dp size — spec these
next with sourced sizing + states: **banners/alerts by tier** (good/weak/
critical/idle), **drag-sheets**, **toasts**, the **PTT button cluster**, the
**SOS banner** (~84 dp, collapses the Talk Group Bar to 32 dp), and
**avatar-with-presence** (online dot / silent glyph / live-alert ring).

**States (required, per `mobile-rules.md` §7):** standard buttons need Default ·
Pressed · Disabled · **Loading**; toggles need Default · **Selected** · Pressed ·
Disabled. Replace desktop hover with pressed/ripple. Loading = spinner + non-
interactive; for real-time comms keep last-known state, never blank actionable
info.

---

## 5. Public-security & field context

Field responders read under stress, in sunlight, one-handed, sometimes gloved —
so the ergonomic bar is **higher than generic mobile**.

- **NIST — Voices of First Responders** (nationwide public-safety survey) distilled
  **six user-centered design guidelines** for responder technology; field UX must
  be trustworthy, glanceable, and low-friction under time pressure.
  Sources: [NIST — Usability & Public Safety Communications Research](https://www.nist.gov/programs-projects/usability-and-public-safety-communications-research),
  [NISTIR 8400](https://nvlpubs.nist.gov/nistpubs/ir/2021/NIST.IR.8400.pdf).
- **Contrast beyond AA for outdoor.** Meet WCAG **4.5:1** text / **3:1** large &
  UI (per [`PRODUCT.md`](../../PRODUCT.md)), but push primary content higher for
  sunlight; use the **grayscale test** (design still readable desaturated).
  Sources: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), industry field-UX guidance.
- **Status never by color alone** — pair color + icon + label (see the
  iconography doc and Astro status system).
- **Dark base:** avoid pure black; the near-`#09090b` base is flagged to nudge
  toward a soft dark gray for depth and reduced smearing on OLED in motion.
  Source: [Dark-mode best practices](https://blog.logrocket.com/ux-design/dark-mode-ui-design-best-practices-and-examples/).

---

## 6. Conflicts flagged for reconciliation

These are **not** resolved here — surfaced for a decision:
1. **WCAG version:** `PRODUCT.md` says **2.1 AA**; the design-audit skill says
   **2.2 AA**. → Standardize on **WCAG 2.2 AA** (superset; adds target-size 2.5.8).
2. **Two token lineages describe the same app:** `DESIGN.md` / `.impeccable/
   design.json` (px units, `text-success #6ee7b7`, Geist — the rigorous one) vs.
   `CLAUDE.md` / flow-map (dp units, `accent #0EA5E9`). → Treat **`DESIGN.md` as
   canonical**; migrate the flow-map's token names to match.
3. **Target size 44 vs 48:** reconcile to **48 dp** floor (see §3.3).

---

## 7. Summary table

| Area | Current (AGIL) | Established standard | Verdict | Recommendation |
|---|---|---|---|---|
| Body text | 16 sp | M3 16, HIG ≥11 pt | ✅ | Consider 16–20 for primary field content |
| Type floor | 12 sp ramp | ≥ 14 comfortable, 12 min | ⚠️ | Kill stray 11/13/17 px; hold 12 floor |
| Dynamic Type | not documented | M3 + HIG expect it | ❌ gap | Use `sp`; test large font scales |
| Spacing | 4/8/12/16 | 8-pt grid | ⚠️ | Extend to 24/32/48 |
| Touch target | 44–48 (mixed) | M3 48 / WCAG 44 AAA / 24 AA | ⚠️ | One 48 dp floor |
| Critical actions | 48 | 56–64 for emergency | ❌ gap | Add ≥56–64 tier (PTT/SOS/Accept/End) |
| Buttons | 48 / 44 | ≥ 48 | ⚠️ | Raise secondary/input to 48 |
| Contrast | 4.5:1 / 3:1 | WCAG 2.2 AA | ✅ | Push higher for sunlight |
| Font | Geist | grotesque/system | ✅ | Bundle + confirm Android license |

---

*Sources gathered from primary standards bodies where possible (m3.material.io,
developer.apple.com, w3.org/WAI, nist.gov) plus the public-safety design systems
those field products follow (Astro UXDS, Priority Dispatch). Last updated
2026-07-02.*
