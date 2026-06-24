# AGIL Ops Hub — Responder App: Flow & Screen Map

> Reference doc reverse-engineered from the Claude-design interactive prototype
> (`Responder_App_offline.html`). Use this as the source of truth when
> replicating screens in Figma and when briefing the Kotlin developers.
> Claude-design React export is **on hold** — Kotlin is the build target.

---

## 1. What this app is

**AGIL Ops Hub (AOH) — Responder App** is the **field/mobile companion** to a
larger command-and-control platform. It is a **public-security / emergency
response app** for first responders (Fire, EMS/Medical, Traffic, Hazmat, Flood).
The user carrying it is a frontline operator (the demo persona is **"Sasha Coen,
Firefighter • Engine 7"**, internal id `r1`).

- **Context:** ST Engineering "AGIL" smart-city / ops platform. Scenarios are
  set in **Singapore** (Bugis MRT, Tiong Bahru, SG postal codes). There is a
  separate **Dispatch/Command** side (HQ) — this app is the *responder* view.
- **Core job:** receive incident assignments, coordinate over voice + chat,
  navigate to scene, maintain situational awareness (units/cameras/drones/
  geofences on a map), and raise/receive emergency (SOS) signals — all while
  potentially **offline** or on a **weak radio link**.
- **Design language:** dark-first (light theme exists), tokenized to the AOH
  design system (zinc/slate surfaces, sky-500 primary, semantic status colors).
- **Defining trait: PTT-first.** Push-to-Talk radio is the *center* of the app,
  not a feature buried in chat. The center tab IS the comms/PTT surface.

---

## 2. Design system / tokens

Two themes (`dark` default, `light`), accessed via a `C` proxy so every call
site is theme-agnostic. Key semantic tokens (dark values):

| Token | Dark | Meaning |
|---|---|---|
| `bg` | `#09090B` (zinc-950) | App background |
| `surface` | `#18181B` (zinc-900) | Cards |
| `surfaceRaised` | `#1E293B` (slate-800) | Elevated panels, bars |
| `text / textSec / textMuted` | `#FAFAFA / #A1A1AA / #71717A` | Text hierarchy |
| `accent` | `#0EA5E9` (sky-500) | **Primary**; route lines, selection |
| `green` | `#10B981` | Success / available / confirm (e.g. "Arrived") |
| `orange` | `#F59E0B` | Warning / hazard / medium priority |
| `red` | `#EF4444` | Destructive / SOS / critical |
| `purple` | `#8B5CF6` | Cameras / accent-3 |
| `ptt` | `#0EA5E9` | PTT live state |

- **Priority colors:** critical=red, high=orange, medium=accent(blue), low=muted.
- **Blue is reserved** for route + guidance + selection; green = confirm/arrival.
- Tap targets ≥ 48dp; nav bar 56dp; icons ≥ 22dp.
- Icon set is custom inline SVG (`Ico.*`): Chat, Incident, Map, Tasks,
  Resources, Mic, etc.

---

## 3. Global chrome (persistent across screens)

1. **Status bar** — faux iOS bar (9:41, signal, battery).
2. **Bottom Tab Bar (5 tabs)** — center tab protrudes (PTT-first):
   - **Comms** *(center, Mic icon)* — PTT home. Shows **"LIVE"** + ptt color when transmitting.
   - **Chat** — unread badge (count of chats with ≥1 unread).
   - **Incidents**
   - **Map**
   - **Resources**
   - *(Note: a `Tasks` icon exists in the icon set but Tasks is NOT a top-level tab — checklists live inside Incident Detail.)*
3. **Persistent comms / "Talk Group Bar"** — a 64dp bar above the tab bar that
   shows the active/selected talk group and PTT state. Has states:
   `empty` → `selected` → `live` (transmitting) and `incoming`. Collapses to
   32dp when an SOS banner is showing. Can render on any tab.
4. **Profile button** — top-right avatar; opens Profile sheet. Reflects user
   presence (silent/offline) and live-status alerts.
5. **SOS banner** — when YOUR OWN SOS is active, an ~84dp red banner pins to the
   very top on *every* screen and pushes content down.
6. **PTT sound cues** (`FlowSounds`, Web Audio) — radio-style tones tuned to
   TIA-603 / P25 / 3GPP MCPTT conventions. Cues only on Comms PTT *events*
   (granted/busy/offline/weak/preempt/SOS/incoming). No sound on auth, map,
   incident, profile flows.

---

## 4. Primary tabs & their screens

### 4.1 COMMS (PTT) — `tab: 'comms'` — the home/center surface
The push-to-talk radio surface. Layout iterations explored: top signal banner →
**Pinned** talk groups (2×4 grid) → **Recent** targets → big PTT button cluster.

- **Pinned favorites** (`pttFavoritesInit`): channels (Alpha Team, HQ Command,
  Fire) + contacts (Capt. Chen, Lt. Torres, Dispatch-Lena). Long-press to
  pin/unpin/mute.
- **PTT button cluster** — configurable 3-button layout (left/middle/right) from
  `pttSettings`: any of `ptt` / `ptv` (push-to-video) / `sos` / `none`.
- **PTT outcomes (with sound cues):**
  - `broadcasting` → **granted** (talk-permit tone)
  - target **busy** / target **offline** / you are **offline**
  - **weak signal** warning during broadcast
  - **preempt** (your transmission overridden by SOS or Dispatch priority)
  - **channel busy** (someone else holds the floor)
  - **missed PTT queue** (missed transmissions while away)
- **Incoming PTT** — banner/card; can tap or swipe to reply.
- **Unified LIVE + signal banner** redesign: states `good` / `weak` / `critical`
  / `none(idle)`.
- **PTV (Push-to-Video)** — `ptv-comms`, minimized PiP, incoming PTV.
- **PTT Call Log** — `ptt-log` with filter (in/out) and search.

### 4.2 CHAT — `tab: 'chat'`, `chatView: 'list' | 'detail' | 'video'`
Telegram-style secure messaging, tightly linked to incidents and PTT.

- **Chat List** — Channels (often `#<incidentId> <title>`) + DMs. Filter
  (groups), search, unread badges, status (urgent/active/resolved). Long-press
  context menu: pin / mute.
- **Channels** are frequently **incident channels** (`incidentId` links a channel
  to an incident). Members shown.
- **Chat Detail** — messages incl. **system messages** ("Dispatch assigned X to
  this incident"), typing indicator, quick-reply suggestion strip (standard /
  contextual), audio bubbles with **transcript**, "view linked incident".
  - Composer: attach selector → **image picker** (multi-select + caption) /
    **file picker**; **voice recording / playback**; inline PTT mini-button.
  - **Read-only** state when the incident is closed.
- **Group management** — Group Info sheet (tabbed: members / media / links / ptt
  / settings), add members, member menu, edit group, leave / delete confirms,
  **Create Group** (name → pick members → landing).
- **DM** — ellipsis menu, **contact profile sheet** (PTT / Message / Locate /
  Mute + media/links/settings; HQ contacts suppress Remove/Block).
- **Video Call** — full screen + minimize/PiP + controls.

### 4.3 INCIDENTS — `tab: 'incidents'`, `incView: 'detail'`
The operator's assigned-work surface.

- **Incident List** — filters: **Active / Closed / Declined / All**; search;
  per-filter empty states; "incident closed" neutral notification banner.
- **Incident card fields** (`incidentsData`): id, title, type (Fire/Traffic/
  Flood/Hazmat/Medical + emoji), priority (critical/high/medium/low), status
  (active/pending/resolved), time, assigned(bool), distance, responder count,
  update count, location + locDetail, description, reporter, `assignedResp[]`
  (each with `dispatchStatus`: Assigned → Accepted → On the Way → In Progress →
  Declined), `checklists[]`.
- **Incident Detail** — **tabbed** (Overview / Responders / Checklist) OR a
  **V-stack** layout variant (5 sections: Incident Details / Location / Priority
  / Report Info / Assignment) shared by View/Edit/Create.
  - **Sticky status bar** + "Update your status" sheet picker.
  - Actions: Navigate, open incident **Channel** (chat), **PTT to channel** or
    **PTT to a responder**, view **on Map**, Edit, Delete, change **status**
    (active → in-progress → resolved, with reopen), Close.
  - **Closed state**: muted green banner, dimmed body, actions at 40%, chips
    "Done", linked chat goes read-only.
- **Create Incident** form — type, severity, location (+ map locate), assign
  responders, checklist (+ add item), dispatch; filled/created toasts.
- **Incoming Assignment** (`assignment: true`) — modal to **Accept / Decline**
  (decline asks for reason). Can appear on Comms or Incidents tab. Accepting a
  new assignment routes to its detail.
- **In-detail comms interruptions** — live audio takes over the talk bar;
  incoming PTV card / minimized PiP while working the incident; own-SOS banner
  squeeze test.

### 4.4 MAP — `tab: 'map'`
Live situational-awareness map.

- **Pin types:** responders (`resp-`), incidents (`inc-`), cameras (`cam-`),
  drones (`drone-`), POIs (`poi-`), geofences/zones (`geo-`). Clustering when
  crowded. Self/"YOU" marker (blue dot + accuracy ring). Selecting a pin opens a
  context card with actions (open incident, chat, navigate, track).
- **Create flows from the map FAB:**
  - **Create Incident** (map-pinned).
  - **Create POI** — POIForm; includes an **exposure/visibility** setting
    (Only me / Everyone).
  - **Create Geofence** — multi-step: plot points → place → shift → remove →
    done → configure form (applied-to / **alerts** / **proximity** thresholds) →
    submit → created toast. Edit / **reshape** / delete geofence later.
- Drone glyph hint, camera pins, map context menu.

### 4.5 RESOURCES — `tab: 'resources'`
Directory of field assets, with sub-tabs.

- Sub-tabs: **Responders / Cameras / Drones** (search within).
- **Responders** (`resData.responders`): name, role, status (available/off-duty),
  online, assigned incidents + dispatchStatus, live-alert (alone/at-risk).
- **Cameras** (`resData.cameras`): Fixed CCTV / PTZ / Body Cam (BWC); status
  online/offline/recording/standby; battery; **live feed** (fullscreen).
- **Drones** (`resData.drones`): Recon/Thermal/Delivery UAV; status airborne/
  docked/returning; battery; altitude; live feed.
- Detail sheets per asset; "track on map"; offline/empty states.

---

## 5. Cross-cutting flows

### 5.1 Authentication (pre-login)
`login` → variants: filled, loading, **error**, **forgot-password** (modal +
sending + loop), and **biometric** (prompt → ok / fail / locked-out). Plus
contextual hints (forgot, biometric).

### 5.2 SOS (emergency)
Two generations in the prototype:
- **Profile-launched SOS** — section in Profile with confirm.
- **Revised SOS (5.5.1)** — long-press + countdown on Comms PTT cluster:
  `idle` → **countdown** (hold + animated fill) → **active** (broadcasting
  distress; red top banner everywhere) → **cancel**. Has dedicated banners
  (Countdown / Active / Cancel) with designer annotations.
- When active: red top banner on every screen; SOS preempts/overrides PTT.

### 5.3 Navigation (responder → scene) — flow node 3.5.x
1. **Route Preview** (3.5) — map with route, unit ETA chips, incident pin,
   Zone Bravo geofence.
2. **Navigate — Turn** (3.5.1, `NavigateTurnScreen`) — active turn-by-turn:
   slim header, blue maneuver banner, map (route bright-ahead/dim-behind, YOU
   marker, unit ETA chips, SA layer of units/drones/cameras, geofence zones,
   arrival ring), ETA bar with **End Navigation** (red) + **Arrived** (green,
   auto-enabled inside arrival geofence radius). Mute voice guidance toggle.
3. **Navigate — Spatial** (3.5.2, `NavigateSpatialScreen`) — on-scene
   situational awareness: medium incident header, **"You have arrived on scene"**
   banner, map with YOU + pulsing ring, unit ETA chips (JP/CS/LM), incident pin,
   Zone Bravo, **hazard chip** ("Blocked Road"), recenter. No route line.
   Action cluster: Chat / PTV / Navigate.

### 5.4 Presence & status (Profile)
Profile sheet sections: **Presence** (Active / **Silent** / **Offline** — silent
needs confirm), **Live status** (self-report **Alone** / **At-risk** — broadcasts
a live-alert that others see as a ring on the avatar), **Silent scheduler**
(scheduled silent windows: new/edit, earpiece, weekend, saved), **SOS**,
**Preferences** (language, home tab, PTT button layout), **Notifications**,
**Appearance** (theme), **Sign out**. Presence/live-status propagate to avatars
across the app.

### 5.5 Offline / degraded comms
First-class state (`offlineMode`, `userStatus: 'offline'`, `weakSignal`). Offline
changes PTT outcomes (offline tone, "you are offline" banner), and surfaces
critical banners. The whole prototype is the **"offline"** build — resilience on
poor networks is a core product concern.

---

## 6. Key interaction patterns (for Kotlin + Figma)

- **Press-and-hold PTT** (talk-permit tone on grant; release = roger beep).
- **Long-press context menus** on chat rows and pinned talk groups (pin/mute).
- **Drag sheets / half-sheets** (`DragSheet`) for forms, pickers, profiles.
- **Swipe-to-reply** on incoming PTT.
- **Geofence proximity alerts** + arrival auto-detection (geofence radius).
- **Inline annotations/hints** — the prototype overlays designer hint bubbles
  (`hint*` flags); these are NOT app UI, they're explainer callouts. Strip them
  when replicating real screens (the prototype has a `hideAnnot` mode).
- **Marker shape encoding** on maps: unit=circle, drone=diamond, camera=square,
  each with type tint — readable without tapping.
- **Avatar status encoding:** online dot, silent glyph, live-alert ring
  (alone/at-risk).

---

## 7. Data model entities (observed)

- **Incident** — id, title, type, priority, status, assigned, distance,
  responders(count), updates, location, locDetail, desc, reporter,
  assignedResp[{id,name,color,dispatchStatus}], checklists[{id,text,done}].
- **Channel** — id, name (often `#<incidentId> <title>`), lastMsg, time, unread,
  status, incidentId?, members[].
- **DM** — id, name, lastMsg, time, unread, online, color.
- **Contact / Responder** — id, name, role (`Rank • Unit`), online, silent?,
  color, liveAlert?(alone/at-risk), status, assigned incidents[].
- **Message** — id, sender, text, time, isMe; or `type:'system'`; audio bubbles
  carry a transcript; images/files attachments.
- **Camera** — id, name, type (Fixed CCTV/PTZ/Body Cam), status, location,
  battery, feed(bool).
- **Drone** — id, name, type (Recon/Thermal/Delivery UAV), status, location,
  battery, altitude.
- **POI** — name, type, location, exposure (only-me / everyone).
- **Geofence/Zone** — name, polygon points, alerts, proximity thresholds.
- **dispatchStatus lifecycle:** Assigned → Accepted → On the Way → In Progress
  → (Declined / Done).

---

## 8. The complete state catalog (the prototype's "Flow Explorer" seeds)

The prototype is driven by a single seed map (`MainApp`'s `M`) of **~260 named
states** — each is one Figma artboard / one screen-state. They are the
authoritative checklist for what to draw. Grouped:

- **Auth:** login, login-filled/loading/error, login-forgot(+modal/loop/loading),
  biometric(+ok/fail/lock).
- **Comms/PTT:** comms, broadcasting (+offline/target-busy/target-offline/
  preempt-sos/preempt-dispatch/blocked-by-active/missed-queue), banner-live-*,
  banner-warn-*, banner-critical-*, banner-info-*, comms-live-{good/weak/
  critical}, pinned redesigns, talkbar-* (per tab), ptt-log(+filter/search),
  ptv-*, presence/livestatus on comms.
- **Chat:** comms-chats, chat-detail, chat-dm, typing, attach/image-picker/
  file-picker, voice-rec/play, group-info(+redesign tabs), group-add/edit/
  create, member-menu, confirm-leave/delete, dm-menu/profile, contact-profile,
  quick-reply variants, audio-transcript, video-call/controls, chat-ctx pin/mute.
- **Incidents:** incidents, inc-list (active/closed/declined/search/empty),
  inc-detail (tabbed/vstack/status-bar/status-sheet/responders/checklist),
  inc-detail-closed(+tabs), inc-edit/delete/status-pick/status-ip/res/reopen,
  inc-nav/inc-nav-turn/inc-nav-spatial, inc-form(+severity/type/location/locate/
  resp/checklist/dispatch/add-check/filled/created), assignment accept/decline,
  inc-detail comms interruptions (live-audio/ptv-incoming/ptv-min/sos/bar-*).
- **Map:** map, map-sel-{resp/geo/poi/inc/cam/drone}, map-fab, map-ctx,
  map-create-inc/poi, map-poi (exposure/created/edit/delete),
  map-geo (pts/place/shift/remove/done/applied/alerts/prox/filled/created/edit/
  reshape/delete), self-marker/drone-glyph hints.
- **Resources:** resources, resources-search, -cameras(+cam-detail/offline/feed),
  -drones(+drone-detail/docked/feed), -responders.
- **Profile:** profile, presence (silent confirm/silent/offline), live status
  (alone/risk), scheduler (edit/earpiece/weekend/saved), sos (section/confirm),
  preferences (lang/home/btn-layout A/B), notifications, sign out, appearance.
- **SOS revised:** sos-rev-{idle/countdown/active/cancel}.
- **Global:** offline.

> To regenerate the exact list, decode the bundle's manifest (gzip+base64 JS in
> the `__bundler/manifest` script tag) and read the `M = {…}` seed map in the
> `MainApp` function of the main app file.

---

## 9. Recommendations & gaps (things to confirm before Figma/Kotlin build)

These are things worth deciding now so the Figma set and Kotlin handoff don't
miss them:

1. **Component inventory first, then screens.** With ~260 states, build a Figma
   **component library** (TabBar, TalkGroupBar, PTT cluster, banners×tiers,
   incident card, chat bubble set, map pins, drag-sheet, status chips, avatars
   with presence rings) and compose artboards from instances. Otherwise 260
   hand-drawn frames will drift.
2. **Define the real navigation graph, not just the state list.** The prototype's
   seed map is a flat list of *states*, not *transitions*. For Kotlin you need
   the actual nav graph (what tab/back-stack each screen sits in, what gestures
   move between them). Worth producing a proper flow diagram (I can generate a
   FigJam diagram from this doc).
3. **Strip designer annotation hints.** Many states (`hint*`) only exist to
   explain the prototype. Don't ship them as UI; mirror the prototype's
   `hideAnnot` mode for the "clean" Figma frames.
4. **PTT is the hardest engineering piece — flag it early.** Press-and-hold
   floor control, talk-permit/deny/busy/preempt, channel arbitration, missed
   queue, and SOS preemption are a real MCPTT-style state machine. Kotlin devs
   need a **PTT state-machine spec** + the audio-cue mapping (Section 3). This
   is not a UI-only concern.
5. **Offline/weak-signal is a product requirement, not an edge case.** Specify
   what's cached, what queues, and how each screen degrades. The bundle name is
   literally "offline."
6. **Presence model needs a backend contract.** Active/Silent/Offline + live
   alerts (alone/at-risk) + silent scheduler must sync with the Dispatch/Command
   side. Define the data + push model.
7. **Map layer is its own subsystem.** Real maps (likely Google Maps / Mapbox on
   Android), live asset telemetry (drones: battery/altitude, cameras: feeds),
   geofence authoring + proximity alerts, clustering. Decide the map SDK and
   whether geofence editing ships in v1.
8. **Live video (PTV + camera/drone feeds + video calls).** Pick the streaming
   stack (WebRTC?) and decide which feeds are v1 vs later.
9. **Theming:** ship both dark + light from day one (tokens already defined) —
   responders work in varied lighting. Map tokens → Figma variables → Kotlin
   theme.
10. **Accessibility / glove + sunlight use:** ≥48dp targets, high contrast,
    large tap zones for PTT/SOS, audio + haptic confirmation. The prototype
    already encodes ≥48dp and audio cues — preserve these.
11. **Decide v1 scope.** The prototype explores *many* iterations of the same
    surface (e.g. multiple Comms layouts, two SOS generations, tabbed vs vstack
    incident detail). Pick the canonical one per surface before handing Kotlin
    devs a moving target.
12. **Singapore/locale specifics:** SG addresses, MRT, postal codes, possibly
    multilingual (language preference exists). Confirm i18n needs.

---

*Last updated: 2026-06-24. Derived from `Responder_App_offline.html`
(React/Babel prototype). Kotlin is the build target; this doc + the prototype
together define intended behavior.*
