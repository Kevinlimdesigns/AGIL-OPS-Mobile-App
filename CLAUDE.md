# CLAUDE.md — AGIL Ops Hub Responder App

Guidance for Claude when working in this repo. Read this first, every session.

## What this project is

This repo holds **design work** for the **AGIL Ops Hub (AOH) — Responder App**:
the field/mobile companion to a command-and-control platform. It is a
**public-security / emergency-response app** for frontline responders (Fire,
EMS/Medical, Traffic, Hazmat, Flood), scenarios set in **Singapore**. The
carrying persona is a frontline operator (e.g. "Sasha Coen, Firefighter").
There is a separate **Dispatch / Command (HQ)** side — this app is the
**responder** view.

**The app is not final** — screens and flows are still changing. Treat
everything here as a living reference, not a frozen spec.

### Defining traits (do not lose these)
- **PTT-first.** Push-to-Talk radio is the *center* of the app. The center tab
  IS the Comms/PTT surface — not a feature buried inside chat.
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
- **Figma board (flow diagram + screens):**
  https://www.figma.com/board/3vZlTyuEzH00cXb2yhlpbl/AGIL-Mobile-App
- **Full flow, screen & data-model map:** [`docs/responder-app-flow-map.md`](docs/responder-app-flow-map.md)
  — read this before doing any flow/screen work. It contains the ~260-state
  catalog, entity models, and cross-cutting flows.

## Design system — adhere to these tokens

Dark-first (light theme also exists). Tokenized to the AOH design system. Use
these semantic tokens, never raw hex, so work stays theme-agnostic.

| Token | Dark | Light | Use |
|---|---|---|---|
| `bg` | `#09090B` | `#eef1f6` | App background |
| `surface` | `#18181B` | `#f7f9fc` | Cards |
| `surfaceRaised` | `#1E293B` | `#e3e8ef` | Elevated panels / bars |
| `text` | `#FAFAFA` | `#0f1a2e` | Primary text |
| `textSec` | `#A1A1AA` | `#3a4861` | Secondary text |
| `textMuted` | `#71717A` | `#5d6b82` | Muted / low priority |
| `accent` | `#0EA5E9` | `#0a6c8a` | **Primary**: routes, selection, links |
| `green` | `#10B981` | `#1f8a55` | Success / available / confirm / arrival |
| `orange` | `#F59E0B` | `#d68410` | Warning / hazard / medium priority |
| `red` | `#EF4444` | `#d6494e` | Destructive / SOS / critical |
| `purple` | `#8B5CF6` | `#7b6cd9` | Cameras / accent-3 |
| `ptt` | `#0EA5E9` | `#0a6c8a` | PTT live state |

### Design rules (enforce when reviewing or producing work)
- **Color semantics are fixed:** priority → critical=red, high=orange,
  medium=accent(blue), low=muted. **Blue is reserved** for route/guidance/
  selection; **green** means confirm/arrival — do not swap them.
- **Status banners have tiers:** good / weak / critical / idle — keep them
  consistent across Comms, incident, and map surfaces.
- **Sizing:** tap targets ≥ **48dp**; bottom nav bar **56dp**; icons ≥ **22dp**;
  Talk Group Bar **64dp** (collapses to 32dp under an active SOS banner).
- **Both themes ship** (responders work in varied lighting). Every screen must
  work in dark AND light.
- **Accessibility for field use:** high contrast, large PTT/SOS targets, audio +
  (where relevant) haptic confirmation. PTT events have radio-style audio cues
  (talk-permit / busy / offline / weak / preempt / SOS / incoming).
- **Marker/status encoding on maps:** unit=circle, drone=diamond, camera=square,
  each with a type tint (readable without tapping). Avatars encode presence:
  online dot, silent glyph, live-alert ring (alone / at-risk).
- **Strip designer hint bubbles** (`hint*` states in the prototype) — they
  explain the prototype and are NOT app UI.

## When I ask you to work here
- Check work against the tokens and rules above; **flag anything off-system**
  (raw colors, swapped semantics, undersized targets, missing dark/light,
  missing offline behavior).
- Keep the flow map (`docs/responder-app-flow-map.md`) and the Figma board in
  mind as the canonical structure; note when a request diverges from them.
- Do **not** build a component library or write dev specs unless explicitly
  asked.

## Git
- Develop on the designated feature branch; commit with clear messages; push
  when work is complete. Do not open PRs unless explicitly asked.
