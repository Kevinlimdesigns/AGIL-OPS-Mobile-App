# CLAUDE.md — AGIL Ops Hub Responder App

Guidance for Claude when working in this repo. **Read this first, every session.**
This is the single front door: `main` carries the one authoritative governance set
(token source of truth + component inventory + reuse rules). Every chat references
these files — do not fork them onto a branch (see **Single governance set**, below).

## Canonical governance files (the ONE authoritative set — never duplicate)
- **[`DESIGN.md`](DESIGN.md)** — the **single source of truth for design tokens**
  (colors, typography, radius, spacing, component specs). Never redefine tokens
  elsewhere; pull exact values from here.
- **[`PRODUCT.md`](PRODUCT.md)** — users, product purpose, brand personality,
  design principles, accessibility target (WCAG 2.1 AA).
- **[`design-audit/AOH-ADHERENCE.md`](design-audit/AOH-ADHERENCE.md)** — the hard
  design-system rules (no raw hex, Geist `text-*/font-*` styles, tokens for
  colour/radius/spacing/size). Read before creating or editing any design.
- **[`design-audit/baseline/inventory.json`](design-audit/baseline/inventory.json)**
  — the **component inventory**: the existing library to reuse (do not re-create).
- **[`design-audit/config.json`](design-audit/config.json)** — the canonical Figma
  file keys (source / target / benchmark) and library key.
- **[`docs/responder-app-flow-map.md`](docs/responder-app-flow-map.md)** — the full
  flow, screen & data-model map. Read before any flow/screen work.
- **Figma board (flow diagram + screens):**
  https://www.figma.com/board/3vZlTyuEzH00cXb2yhlpbl/AGIL-Mobile-App

## Reference Figma files & the golden rule (MANDATORY)
Three files, three roles. **ALL changes are made ONLY in the AGIL Mobile App
(`34:995`). Never edit the AOH ShadCN or Material 3 files — they are read-only
references.**

| File | Key | Entry node | Role | Editable? |
|------|-----|-----------|------|-----------|
| **AOH UI/ShadCN component library** | `IQxwVUqzckYn7u7nNhX6lF` | `3280:6182` | **Source** — design-system components are brought FROM here | ❌ read-only |
| **AGIL Mobile App** | `e6RBhSWdLlLinhceozYLYe` | `34:995` ("Mobile Component") | **Target** — the ONLY file where mobile components are created/edited | ✅ edit here only |
| **Material 3 Design Kit (Community)** | `ZfL0m57nIO3j86Yfr5IoDG` | `11:1833` | **Benchmark** — compare AGIL mobile components for mobile-friendliness (sizing/spacing/touch/ergonomics) | ❌ read-only |

**Workflow:** pull a component from the **AOH ShadCN** library → build/adapt it in
the **AGIL Mobile App** (`34:995`) → **benchmark against Material 3** for
mobile-friendliness. Colour and typography stay AOH (`color-*`/`severity/*`,
`text-*/font-*`); **Material 3 governs geometry/ergonomics only** (never adopt its
colours or type).

## Reuse first — never invent duplicates (MANDATORY)
Before creating ANY component, check the existing library first:
1. **`design-audit/baseline/inventory.json`** and Figma **`34:995`** — is there
   already a component (button, chip, badge, tabs, input, avatar, card, row…)?
2. The **AOH ShadCN source** (`IQxwVUqzckYn7u7nNhX6lF`) — bring it FROM there.

**Reuse or extend an existing component; do not redraw or invent a duplicate.** The
library already exists (73+ components) — build on it. This is the rule that stops
"random new components" from appearing.

## Single governance set — do NOT create parallel rule files (MANDATORY)
This repo has **ONE** governance set: the canonical files listed above, all on
`main`. **Do NOT** create new rule / spec / design / token markdown files, and do
**NOT** start a parallel governance set on a feature branch. If a rule or token
needs to change, **edit the canonical file in place**. All chats reference these
files on `main` — that is how every session stays consistent. (Fresh sessions
auto-load this `CLAUDE.md` from the default branch; keeping the rules here, and
only here, is what guarantees every chat follows the same set.)

## What this project is
Design work for the **AGIL Ops Hub (AOH) — Responder App**: the field/mobile
companion to a command-and-control platform. A **public-security /
emergency-response app** for frontline responders (Fire, EMS/Medical, Traffic,
Hazmat, Flood), scenarios set in **Singapore**. Carrying persona is a frontline
operator (e.g. "Sasha Coen, Firefighter"). A separate **Dispatch / Command (HQ)**
side exists — this app is the **responder** view.

**The app is not final** — screens and flows are still changing. Treat everything
here as a living reference, not a frozen spec.

### Defining traits (do not lose these)
- **PTT-first.** Push-to-Talk radio is the *center* of the app. The center tab IS
  the Comms/PTT surface — not a feature buried inside chat.
- **Offline / weak-signal is a first-class state**, not an edge case (the source
  prototype is literally the "offline" build). Every screen should have a
  degraded-comms behavior.
- **5 bottom tabs:** Comms (center, PTT) · Chat · Incidents · Map · Resources.
  (`Tasks` is NOT a top-level tab — checklists live inside Incident Detail.)

## Workflow / build target
- Source of truth for behavior is the Claude-design **interactive prototype**
  (`Responder_App_offline.html`, a bundled React/JSX app). The **JSX export was
  used to convert designs into Figma.**
- **Kotlin (native Android) is the build target.** The React/JSX export is
  reference only — developers do not build from it.

## Design rules to enforce (in addition to PRODUCT.md / DESIGN.md / AOH-ADHERENCE.md)
- **Use semantic tokens from `DESIGN.md`, never raw hex.** Flag any raw color.
- **Color semantics are fixed:** priority → critical=red, high=orange,
  medium=primary(blue), low=muted. **Blue is reserved** for route/guidance/
  selection; **green** means confirm/arrival — do not swap them.
- **Status never by color alone** — pair with icon/label/shape (per PRODUCT.md
  accessibility). Status banners have tiers: good / weak / critical / idle — keep
  consistent across Comms, incident, and map surfaces.
- **Sizing:** tap targets ≥ **48dp** (56 critical, 64 PTT/SOS); bottom nav bar
  **80dp**; icons ≥ **22dp**; Talk Group Bar **64dp** (collapses to 32dp under an
  active SOS banner). Mobile frames **360 × 780 dp**.
- **Both themes ship** (responders work in varied lighting). Every screen must work
  in dark AND light.
- **Field accessibility:** high contrast, large PTT/SOS targets, audio + (where
  relevant) haptic confirmation. PTT events have radio-style audio cues
  (talk-permit / busy / offline / weak / preempt / SOS / incoming).
- **Marker/status encoding on maps:** unit=circle, drone=diamond, camera=square,
  each with a type tint (readable without tapping). Avatars encode presence: online
  dot, silent glyph, live-alert ring (alone / at-risk).
- **Strip designer hint bubbles** (`hint*` states in the prototype) — they explain
  the prototype and are NOT app UI.

## When I ask you to work here
- Check work against `PRODUCT.md`, `DESIGN.md`, `design-audit/AOH-ADHERENCE.md`, and
  the rules above; **flag anything off-system** (raw colors, swapped semantics,
  undersized targets, status-by-color-only, missing dark/light, missing offline
  behavior).
- **Reuse the existing component library** — check the inventory and Figma `34:995`
  before building anything new (see **Reuse first**, above).
- Keep the flow map and Figma board in mind as the canonical structure; note when a
  request diverges from them.

## Git
- Develop on the designated feature branch; commit with clear messages; push when
  work is complete. Do not open PRs unless explicitly asked.
