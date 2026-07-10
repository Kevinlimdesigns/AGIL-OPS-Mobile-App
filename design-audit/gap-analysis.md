# AGIL Mobile — Competitive Gap Analysis & Roadmap

**Date:** 2026-06-30 · **Benchmark:** public-safety / first-responder app category — Motorola CommandCentral
Responder, FirstNet apps, CivicEye, Versaterm, Axon. ("SYNCH" wasn't found as a public product; benchmarked
the category — confirm if it's a specific/internal tool.)

## What AGIL has today
Incidents (list, detail, assignment, responders, checklist, status), **Chat** (threads, media, camera/files),
**Comms** (PTT + PTV), **Login/Biometric**, status banners. Strong incident + comms coverage.

## Gaps vs the category (what's missing / underbuilt)
| # | Gap | Why it matters (public-safety) | Evidence |
|---|-----|--------------------------------|----------|
| 1 | **Live Map & location** — units/calls/responder GPS, routing, geofencing | Situational awareness is core; the **Map tab exists but has no screens** | Motorola/Versaterm/CivicEye all centre on real-time maps |
| 2 | **Field reporting / case reports** — structured forms, voice-to-text narrative, AI auto-fill | Officers file reports from the field, not the station | CommandCentral Responder, CivicEye |
| 3 | **Evidence capture / BWC + DEMS** — tag photo/video/audio, upload to evidence mgmt | Chain-of-custody; AGIL has chat media but no evidence/tagging flow | Axon, CommandCentral |
| 4 | **BOLO / alerts / officer-safety feed** — proactive, geofenced warnings | Pushed safety notices/BOLOs to personnel | Motorola officer-safety alerts |
| 5 | **Records / NCIC-style lookup** — person / vehicle / plate | Field queries during a stop | 365Labs, Versaterm |
| 6 | **Offline / degraded-connectivity mode** | Field coverage is unreliable; app must degrade gracefully | FirstNet field guidance |
| 7 | **Onboarding & permissions** — location/camera/mic/notifications | Android runtime permissions + first-run | Platform requirement |
| 8 | **Profile / duty status / settings** — on/off duty, availability, prefs | Presence drives dispatch | category-standard |
| 9 | **Resources tab content** | Tab exists; content undefined | AGIL tab bar |
| 10 | **Systematic empty / error / offline / loading states** | Reliability under stress; loading partly done (skeletons) | WCAG/UX baseline |

## Roadmap (plan of action)
- **P0 — Governance (in progress):** enforce AOH adherence (CLAUDE.md + AOH-ADHERENCE.md), fix Comms/PTV
  raw-hex → tokens, finish status-component severity rebinds, button unification (Type + 64 dp PTT/SOS).
- **P1 — Core operational gaps:** ① **Live Map** (incident/unit/responder locations, geofence) · ② **Field
  Reporting** (report form + voice-to-text) · ④ **Officer-safety/BOLO alerts**.
- **P2 — Field depth:** ③ Evidence/BWC capture + tagging · ⑤ Records lookup · ⑥ Offline mode.
- **P3 — Completeness:** ⑦ Onboarding/permissions · ⑧ Profile/duty status/settings · ⑨ Resources ·
  ⑩ full empty/error/offline state coverage.

Every new screen/component above is built per `AOH-ADHERENCE.md` (AOH tokens/styles/components, 360×780,
48/56/64 targets, status = colour+icon+label).

## Sources
- [Motorola CommandCentral Responder](https://www.motorolasolutions.com/en_us/products/command-center-software/public-safety-software/field-response-and-reporting/commandcentralresponder.html) · [CommandCentral CAD](https://www.motorolasolutions.com/en_us/products/command-center-software/public-safety-software/voice-and-computer-aided-dispatch/commandcentral-cad.html)
- [CivicEye — Mobile Public Safety](https://www.civiceye.com/mobile-public-safety-software/) · [Versaterm CAD](https://www.versaterm.com/solution/cad/) · [365Labs CAD/NCIC](https://365labs.com/law-enforcement/cad/)
- [FirstNet — Apps for First Responders](https://firstnet.gov/network/TT/apps-first-responders)
