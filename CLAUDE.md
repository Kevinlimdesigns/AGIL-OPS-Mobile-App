# CLAUDE.md — AGIL Ops Hub Responder App

Guidance for Claude when working in this repo. Read this first, every session.

## Read these first (authoritative sources)
- **[`PRODUCT.md`](PRODUCT.md)** — users, product purpose, brand personality,
  design principles, accessibility target (WCAG 2.1 AA).
- **[`DESIGN.md`](DESIGN.md)** — the **single source of truth for design tokens**
  (colors, typography, radius, spacing). Never redefine tokens elsewhere; pull
  exact values from here.
- **[`docs/responder-app-flow-map.md`](docs/responder-app-flow-map.md)** — the
  full flow, screen & data-model map (~260-state catalog, entity models,
  cross-cutting flows). Read before any flow/screen work.
- **Figma board (flow diagram + screens):**
  https://www.figma.com/board/3vZlTyuEzH00cXb2yhlpbl/AGIL-Mobile-App

This file adds the **responder-app-specific context** those docs don't fully
cover, and the rules to enforce when producing or reviewing work.

## What this project is

Design work for the **AGIL Ops Hub (AOH) — Responder App**: the field/mobile
companion to a command-and-control platform. A **public-security /
emergency-response app** for frontline responders (Fire, EMS/Medical, Traffic,
Hazmat, Flood), scenarios set in **Singapore**. Carrying persona is a frontline
operator (e.g. "Sasha Coen, Firefighter"). A separate **Dispatch / Command (HQ)**
side exists — this app is the **responder** view.

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

## Design rules to enforce (in addition to PRODUCT.md / DESIGN.md)
- **Use semantic tokens from `DESIGN.md`, never raw hex.** Flag any raw color.
- **Color semantics are fixed:** priority → critical=red, high=orange,
  medium=primary(blue), low=muted. **Blue is reserved** for route/guidance/
  selection; **green** means confirm/arrival — do not swap them.
- **Status never by color alone** — pair with icon/label/shape (per PRODUCT.md
  accessibility). Status banners have tiers: good / weak / critical / idle —
  keep consistent across Comms, incident, and map surfaces.
- **Sizing:** tap targets ≥ **48dp**; bottom nav bar **56dp**; icons ≥ **22dp**;
  Talk Group Bar **64dp** (collapses to 32dp under an active SOS banner).
- **Both themes ship** (responders work in varied lighting). Every screen must
  work in dark AND light.
- **Field accessibility:** high contrast, large PTT/SOS targets, audio +
  (where relevant) haptic confirmation. PTT events have radio-style audio cues
  (talk-permit / busy / offline / weak / preempt / SOS / incoming).
- **Marker/status encoding on maps:** unit=circle, drone=diamond, camera=square,
  each with a type tint (readable without tapping). Avatars encode presence:
  online dot, silent glyph, live-alert ring (alone / at-risk).
- **Strip designer hint bubbles** (`hint*` states in the prototype) — they
  explain the prototype and are NOT app UI.

## When I ask you to work here
- Check work against `PRODUCT.md`, `DESIGN.md`, and the rules above; **flag
  anything off-system** (raw colors, swapped semantics, undersized targets,
  status-by-color-only, missing dark/light, missing offline behavior).
- Keep the flow map and Figma board in mind as the canonical structure; note
  when a request diverges from them.
- Do **not** build a component library or write dev specs unless explicitly
  asked.

## Git
- Develop on the designated feature branch; commit with clear messages; push
  when work is complete. Do not open PRs unless explicitly asked.
