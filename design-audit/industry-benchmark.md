# Public-Safety Mobile — Industry Benchmark vs AGIL Components

**Date:** 2026-06-26 · **Benchmarked against:** Astro UXDS (command-&-control / mission-ops design system), Priority Dispatch (911) brand system, Apple HIG, Google Material 3, WCAG 2.2, FirstNet/first-responder UX guidance. · **Target:** Android (Kotlin/Compose), field/public-safety use.

> Method: vendor apps (Motorola CommandCentral / APX NEXT, SYNC-class) don't publish full design specs, so this benchmarks the **public, authoritative** standards those products themselves follow (Astro, Material, HIG, WCAG, dispatch-color conventions) and checks AGIL's actual token/component values against them.

## TL;DR
AGIL is **on-standard** for typography baseline, spacing, dark theme, and — notably — **status color semantics**. The main public-safety-specific gaps are: **critical-action touch targets should exceed 48 dp**, **body text could go larger for glance/field use**, and **base surface is near-pure-black** (best practice = soft dark gray).

---

## 1. Touch targets / buttons
| Standard | Value | AGIL | Verdict |
|---|---|---|---|
| Apple HIG min | 44×44 pt | — | — |
| Material / Android min | **48×48 dp** | Buttons & controls now **48 dp** (fixed this session) | ✅ meets baseline |
| Emergency/critical actions | **60×60+** recommended | 48 dp | ⚠️ **gap** |
| Spacing between targets | ≥ 8 dp | 8 dp | ✅ |

**Recommendation:** add a **"critical / field" button size ≥ 56–64 dp** for high-stakes, one-handed, gloved, in-motion actions — **Accept incident, PTT talk, End call, SOS**. The PTT control especially should be the largest tappable element on its screen. Keep 48 dp as the standard size.

## 2. Typography
| Standard | Value | AGIL | Verdict |
|---|---|---|---|
| Min legible size (HIG) | ≥ 11 pt | body **14 sp** | ✅ above min |
| Field/glance reading | 16 sp body preferred | 14 sp | ⚠️ consider 16 |
| Typeface | Astro: Open Sans / Roboto / system | **Geist** | ✅ acceptable (clean grotesque; Roboto is the Compose-native fallback) |
| Hierarchy | defined ramp | text-xs 12 → xl + h1/h2, Medium/SemiBold | ✅ |

**Recommendation:** bump **primary content (incident title, status, key values) to 16–20 sp**; keep 14 for secondary/meta, 12 only for labels/badges (never body). Field apps are read at arm's length, in sunlight, under stress — err larger.

## 3. Color scheme
**Dispatch convention (Priority Dispatch):** blues + gunmetal gray dominant, **red reserved for response/urgent**, accent colors sparingly. → AGIL's blue-primary + neutral-gray system **matches** ✅.

**Dark mode (Material / PDC / LogRocket):** avoid pure black; use soft dark grays (Gray 800/900); use surface variants for depth; contrast ≥ 4.5:1 text, 3:1 large/UI.
| Check | AGIL | Verdict |
|---|---|---|
| Soft dark base (not pure black) | base `#09090b` (near-pure-black) | ⚠️ nudge toward `#0E1116`-ish |
| Surface variants for depth | bg / elevated `#1e293b` / strong / border `#27272a` | ✅ |
| Text contrast | text `#fafafa`, muted `#a1a1aa` on dark | ✅ (verify muted on elevated) |

## 4. Status colors — STRONG MATCH ✅
Astro UXDS uses a severity "temperature" scale, each level = **color + shape/symbol** (redundant, color-blind-safe). AGIL's `Talk bar — States` maps almost exactly:

| Severity | Astro fill | AGIL state | Match |
|---|---|---|---|
| Standby / info | `#64D9FF` cyan | **Live** (blue) | ✅ |
| Normal | `#00E200` green | **Receiving** (green) | ✅ |
| Caution | `#FAD800` yellow | **Warning** (yellow) | ✅ |
| Serious | `#FFAF3D` orange | **Live-weak** (orange) | ✅ |
| Critical / Alert | `#FF2A04` red | **Critical** (red) | ✅ |

- AGIL already pairs **color + icon + text label** on status (e.g. "LIVE", "RECEIVING") — meets the Astro/PDC redundant-encoding requirement. ✅
- **Correction to a prior flag:** the orange "Live-weak" token I'd flagged as "no AOH orange" is actually the legitimate **Serious** severity level — *keep it*, and **add an AOH `severity/serious` (orange) token** rather than remove it.
- **Verify:** green/yellow on the dark base meet **4.5:1**; industry palettes use *very vivid* values (Astro greens/yellows are near-fluorescent) precisely so they read on dark in daylight. AGIL's may be too muted — check and brighten if needed.

---

## Action list (prioritised)
1. **P1 — Critical-action button tier (≥56–64 dp):** Accept / PTT / End / SOS. (Public-safety-specific; not covered by the generic 48 dp pass.)
2. **P2 — Body type to 16 sp** for primary content; reserve 12 sp for labels only.
3. **P2 — Add severity tokens** (`info/normal/caution/serious/critical`) to AOH so the talk-bar/status colors are governed, not local. Validate each meets 4.5:1 on dark.
4. **P3 — Nudge base surface** off pure black (`#09090b → ~#0E1116`).
5. **P3 — Consider a sunlight/high-contrast mode** (APX NEXT ships a night/glance mode; you're dark-only).

## Sources
- [Astro UXDS — Status System](https://www.astrouxds.com/patterns/status-system/) · [GitHub source](https://github.com/RocketCommunicationsInc/astro-www/blob/main/src/pages/patterns/status-system.md) · [Typography](https://cms.astrouxds.com/design-guidelines/typography)
- [Priority Dispatch — Color (911 brand standard)](https://brand.prioritydispatch.net/foundations/color)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) · [Improving Tap Targets (target sizes / emergency 60px)](https://blog.openreplay.com/improving-tap-targets-mobile-ux/) · [Target size guidance](https://www.flexy.global/resources/digital-product-design/master-digital-product-design-ux-tips-for-target-size)
- [Dark mode best practices (LogRocket)](https://blog.logrocket.com/ux-design/dark-mode-ui-design-best-practices-and-examples/)
- [Motorola APX NEXT (night mode, large touch targets, glanceable display)](https://www.motorolasolutions.com/en_us/products/p25-products/apx-next-story.html) · [FirstNet apps for first responders](https://firstnet.gov/network/TT/apps-first-responders)
