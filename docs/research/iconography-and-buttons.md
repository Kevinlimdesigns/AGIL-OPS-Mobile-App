# Research — Iconography, Symbology & Buttons

**AGIL Ops Hub — Responder App** · Android (Kotlin/Jetpack Compose), dark-first,
field / public-safety use.

> **What this doc is.** A comprehensive, source-backed reference for the app's
> **icons, symbology (including public-security map & hazard conventions), and
> buttons — including the mission-critical PTT and SOS controls**. Iconography is
> the **least-documented area** of the current design system, so this doc both
> establishes conventions and validates what the prototype already does.
>
> **Read with:** [`DESIGN.md`](../../DESIGN.md) (canonical tokens),
> [`typography-and-components.md`](./typography-and-components.md) (sizing/targets),
> [`industry-benchmark.md`](../../design-audit/industry-benchmark.md) (status-color
> benchmark), [`docs/responder-app-flow-map.md`](../responder-app-flow-map.md)
> (where these controls appear).

---

## 1. Icon system foundations

### 1.1 What the prototype uses
The prototype's icon set is **stroke (outline) line icons** — `viewBox="0 0 24
24"`, **2 px stroke**, round caps/joins, `currentColor` fill — i.e. a
**Feather / Lucide-family** style. Sizes seen in samples: search **16**, list
pin **14**, talk-bar mic **20** inside a **40** button, nav-tab icons **≥ 22**.
There is currently **no documented icon size scale, named library, stroke
standard, or grid** — this is the biggest gap in the design system.

### 1.2 What the standards say
| Topic | Guidance | Source |
|---|---|---|
| Baseline grid & size | Material system icons are drawn on a **24×24 dp** grid (with keylines); tab-bar/action icons render at **24 dp** | [Material Symbols / icons](https://m3.material.io/styles/icons) |
| Apple | **SF Symbols** — weight/scale that matches text; align optical size to adjacent label | [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/) |
| Icon-in-target | 24 dp icon centered in a **48 dp** touch target (icon button) | [M3 — Accessibility](https://m3.material.io/foundations/designing/structure) |

### 1.3 Recommendations
1. **Name a canonical icon library** — the prototype is Lucide/Feather-style;
   standardize on **one** (e.g. Lucide) so icons are consistent and dev-mappable.
2. **Define an icon size scale:** **16 / 20 / 24 dp** (with 24 dp as the baseline
   grid), plus **28–32 dp** for the PTT/SOS hero glyphs. Icon **stroke 2 dp**,
   round caps, `currentColor`.
3. **Icons live in ≥ 48 dp targets** even when the glyph is 16–24 dp (transparent
   padding). See the components doc §3.
4. **Bind icon size to tokens**, not hardcoded per-instance (the same governance
   the type ramp now has).

---

## 2. Icon usability best practice

Icons are inherently **ambiguous** — recognition must be earned, not assumed.
(Source: [NN/g — Icon Usability](https://www.nngroup.com/articles/icon-usability/).)

- **Pair every navigation / action icon with a text label.** A label removes
  ambiguity; the app's bottom tabs already do icon-over-label — keep that
  everywhere it matters. Standalone icon buttons (e.g. kebab, mute) are
  acceptable only for well-established glyphs.
- **Use universal, familiar glyphs** — don't invent metaphors for common actions
  (chat, map, back, search, mic). Familiarity beats cleverness.
- **Test recognition out of context:** show the icon with no label; if users
  can't name its meaning in **~5 seconds**, redesign it.
  ([NN/g — Icon testing](https://www.nngroup.com/articles/icon-testing/).)
- **Simplicity scales:** minimal detail so the glyph reads at 16 dp.
- **One cohesive set** — consistent style, weight, corner treatment.
- **Accessibility:** never encode meaning by **icon color alone**; provide
  `contentDescription` for screen readers; keep the ≥ 48 dp target.

---

## 3. Public-security symbology (the differentiator)

Public-safety systems don't use decorative icons — they use **standardized
symbol grammars** where **shape + color are redundant** so meaning survives
monochrome displays, night vision, and color-blindness. AGIL should *echo these
grammars* rather than invent its own.

### 3.1 ISO 7010 — safety-sign grammar (hazard & safe-condition semantics)
Shape and color are fixed by category:

| Category | Shape + color | Meaning |
|---|---|---|
| **Warning** | Yellow triangle, black border/symbol | Potential hazard — take caution |
| **Prohibition** | Red circle + diagonal slash | Do not do X |
| **Mandatory** | Blue circle, white symbol | Required action |
| **Safe condition / emergency** | Green square, white symbol | First aid, emergency exit, muster |
| **Fire equipment** | Red square, white symbol | Fire exit / equipment |

Source: [ISO 7010 (ISO)](https://www.iso.org/standard/72424.html) ·
[overview](https://www.clarionsafety.com/iso-7010-symbol-safety-signs).
**Use:** hazard chips/markers (the prototype's "Blocked Road" hazard chip),
evacuation/muster points, first-aid on the map — adopt the yellow-triangle /
green-square conventions responders already recognize.

### 3.2 NFPA 704 + GHS — Hazmat incidents
For Hazmat incident types, responders read the **NFPA 704 "fire diamond"**:
four quadrants — **blue = health, red = flammability, yellow = reactivity,
white = special** (OX, W̶, SA) — each rated **0–4**. Shipped containers use the
**GHS red-diamond pictograms**. If the app ever surfaces material hazard data on
a Hazmat incident, present it in this established form, not a custom scheme.
Sources: [NFPA 704 (Fire Engineering)](https://www.fireengineering.com/technical-rescue/understanding-nfpa-704-placarding-life-safety-first-responders/) ·
[GHS vs NFPA](https://www.safetydecals.com/blogs/news/hazard-sign-symbol).

### 3.3 MIL-STD-2525 / NATO APP-6 — map symbology (units & assets)
The military/emergency map standard encodes an object's **affiliation via frame
shape + color, redundantly** (so it reads on a monochrome red night display):
friend = **blue rectangle**, hostile = **red diamond**, neutral = **green
square**, unknown = **yellow quatrefoil**. Battle dimension and the icon inside
carry type. The key principle: **shape + color are redundant**, deliberately, for
degraded conditions. Source:
[NATO Joint Military Symbology](https://en.wikipedia.org/wiki/NATO_Joint_Military_Symbology) ·
[MIL-STD-2525D](http://www.mapsymbs.com/MilStd2525D.pdf).

**AGIL already applies this principle** on the map: **unit = circle, drone =
diamond, camera = square**, each with a type tint — readable without tapping.
✅ Validate & keep this. Recommendation: document the marker grammar formally
(shape = asset type; tint = category; state ring = presence/alert) and ensure it
holds in grayscale (the redundancy test).

### 3.4 Priority / severity color semantics
The app's priority scale — **critical = red, high = orange, medium = blue (accent),
low = muted** — matches command-and-control convention. The **Astro UXDS status
"temperature" scale** (Critical `#FF2A04`, Serious `#FFAF3D`, Caution `#FAD800`,
Normal `#00E200`, Standby `#64D9FF`) pairs **color + shape/symbol + label** and
is the closest published analog; the app's talk-bar states map almost 1:1.
Source: [Astro — Status System](https://www.astrouxds.com/patterns/status-system/).
**Requirement (WCAG 1.4.1 + Astro):** status must be **color + icon + label**,
never color alone. Blue is reserved for route/guidance/selection; green means
confirm/arrival — do not swap.

---

## 4. Buttons

### 4.1 Current specs (`DESIGN.md`) & validation
| Type | Spec | Verdict |
|---|---|---|
| button-primary | primary fill, onColor text, radius 6, **h 48**, pad 0/16 | ✅ meets 48 dp target |
| button-secondary | bg-secondary, radius 6, **h 44**, pad 0/16 | ⚠️ raise to **48 dp** |
| input-field | radius 6, **h 44**, pad 0/12 | ⚠️ consider 48–56 dp |

### 4.2 Conventions & best practice
- **One obvious next action.** Per [`PRODUCT.md`](../../PRODUCT.md), the primary
  action on any screen must be unmistakable — one filled primary button; others
  secondary/ghost. Under time pressure, hierarchy prevents mis-taps.
- **Destructive actions** (Delete, End, Decline) read as red/ghost, separated
  from the confirm action — never the default focus. (The prototype's Navigate
  screen already does this: red ghost "End Navigation" vs. green "Arrived".)
- **Label + icon pairing** on action buttons; icon-only buttons only for
  established glyphs, always with `contentDescription` and a ≥ 48 dp target.
- **States:** Default · Pressed · Disabled · **Loading** (spinner + non-
  interactive). Use pressed/ripple, not hover. (See
  [`mobile-rules.md`](../../design-audit/mobile-rules.md) §7.)

---

## 5. Mission-critical controls — PTT & SOS

These are the app's defining controls and follow **land-mobile-radio (LMR) /
MCPTT conventions**, not generic mobile-button patterns.

### 5.1 Push-to-Talk (PTT)
- **One-button, press-and-hold.** MCPTT (3GPP TS 22.179 / 24.379) mirrors the LMR
  single-button PTT; connection is expected in **< 0.3 s**. The soft PTT control
  should be **the largest tappable element on its screen** and easy to hit
  one-handed / gloved. Sources:
  [FirstNet — MCPTT](https://firstnet.gov/tags/key-technologyissue/mcptt) ·
  [Airbus — MCPTT explainer](https://www.criticalcommunications.airbus.com/en/newsroom/web-story/answered-23-questions-about-push-to-talk-and-mission-critical-ptt).
- **Audible floor feedback is required.** A tone on **floor-grant** ("you may
  speak") vs. **floor-deny / busy** is a mission-critical expectation — the
  operator must know the channel is theirs before speaking, especially in heavy
  traffic. The prototype's `FlowSounds` (talk-permit / busy / offline / weak /
  preempt / SOS / incoming) implements exactly this — tuned to TIA-603 / P25 /
  3GPP MCPTT conventions. ✅ Keep and preserve the mapping.
  Source: [DHS S&T — FirstNet PTT field testing](https://www.dhs.gov/science-and-technology/news/2021/09/28/feature-article-st-tests-firstnet-push-talk-app-real-world-scenarios).
- **Distinct visual LIVE state** — the center Comms tab turns to the `ptt`/LIVE
  color while transmitting; keep the redundant color + "LIVE" label.

### 5.2 SOS / emergency
- **Dedicated, unambiguous emergency affordance**, distinct from routine PTT —
  mission-critical devices ship a **separate SOS button**. In-app this is the
  red **long-press → countdown → active** flow (guards against accidental
  trigger) with a persistent red banner on every screen while active, and SOS
  **preempts** routine PTT.
  Source: [Airbus — MCPTT/SOS](https://www.criticalcommunications.airbus.com/en/newsroom/web-story/answered-23-questions-about-push-to-talk-and-mission-critical-ptt).
- **Size ≥ 56–64 dp** (critical-action tier) with audio + haptic confirmation.

### 5.3 Recommendation
Spec the PTT cluster and SOS control formally (sizes, states, audio-cue map,
haptics, preemption behavior) — they're referenced by the flow-map but not yet in
`DESIGN.md`. They are the highest-stakes controls in the product.

---

## 6. Summary table

| Element | Established standard | Current app | Verdict | Recommendation |
|---|---|---|---|---|
| Icon grid/size | M3 24 dp grid; 16/20/24 tiers | undocumented; 14–24 mixed | ❌ gap | Name library (Lucide); scale 16/20/24 + 28–32 hero |
| Icon + label | NN/g: labels remove ambiguity | tabs labeled ✅ | ✅ | Label all nav/action icons; 5-sec test |
| Hazard/safe symbols | ISO 7010 shape+color | ad-hoc hazard chip | ⚠️ | Adopt ISO 7010 grammar |
| Hazmat data | NFPA 704 / GHS | none | ➕ | Use fire-diamond if surfaced |
| Map markers | MIL-STD-2525 redundant shape+color | circle/diamond/square + tint ✅ | ✅ | Document grammar; grayscale-test |
| Severity color | Astro temperature + icon+label | critical/high/med/low ✅ | ✅ | Never color-alone; add severity tokens |
| Buttons | one primary; 48 dp; states | 48 / 44, states defined | ⚠️ | Raise secondary/input to 48 |
| PTT | one-button hold, <0.3 s, floor tone | FlowSounds + LIVE ✅ | ✅ | Spec cluster; largest target |
| SOS | dedicated, guarded, preempts | long-press→countdown ✅ | ✅ | Spec size ≥56–64, haptics |

---

*Sources are primary standards bodies and public-safety design systems where
possible (Material, Apple HIG, WCAG, ISO 7010, NFPA 704, MIL-STD-2525 / NATO
APP-6, 3GPP MCPTT, FirstNet, Astro UXDS, NN/g). Last updated 2026-07-02.*
