# Map Module — Figma Replication

**File:** AGIL Mobile App (`e6RBhSWdLlLinhceozYLYe`)
**Page:** `Map` (`808:6171`) → section **Map Module** (`815:10830`)
**Source:** `630cac26-8._responderapp.jsx` (map flows 4.1–4.8 + 3.5 Navigate)
**Branch:** `claude/map-figma-replication-2rcdri`

Replicates the app's map screens into Figma as a component-driven module,
matching the existing Incident/Chat/Comms convention: **360×780 artboards**
built from reusable component instances, one subflow per row with a
**Description Flow** card, pinned to the design system's **Dark** variable mode.

## Conventions

- **Artboard size:** 360×780; **grid:** one subflow per row (4.1 → 4.8 → 3.5),
  ~420px column pitch, 1000px row pitch, Description Flow card at the row's left.
- **Tokens:** colours bound to the remote **Semantic colors** collection
  (`color-bg`, `color-bg-subtle`, `color-bg-elevated`, `color-bg-primary`,
  `color-text`, `color-text-muted`, `color-text-error`, `color-text-success`,
  `color-border`, …); spacing/radius via `Spacing/*` and `Radius/*`. Only the
  bespoke map-canvas palette is literal (matches the JSX `MapBg`).
- **Dark mode:** the Semantic colors collection defaults to Light; the section
  and every artboard set `explicitVariableModes → Dark (93:0)` (same as the
  Incident module). This is the file's main gotcha.
- **Type:** Geist ramp. **Icons:** imported from JSX SVGs; the white wrapper
  fill `createNodeFromSvg` adds is cleared after every import.
- Every map screen reuses `Mobile / Status Bar`, `Tab bar` (Map tab active via
  per-instance override), and `Talk bar — States / Selected`.

## Map component block (Components page `39:17` → section `Map block` `871:614`)

| Component | ID | Notes |
|---|---|---|
| Map / Canvas | `871:615` | Stylized dark map from `MapBg` |
| Map / Search Bar | `872:614` | "Search location…" field |
| Map / Control Button | `872:636` | Layers / Crosshair / Layers-Active |
| Map / Pin | `874:620` | Incident, POI, Camera, Drone, Responder, Cluster, Self (heading cone), LongPress |
| Map / FAB | `876:644` | Collapsed / Expanded |
| Map / Layers Panel | `876:645` | 6 layer toggles |
| Map / Context Menu | `877:614` | Create Incident / Geofence / POI |
| Map / Geofence Shape | `877:634` | Dashed amber polygon + ZONE BRAVO label |
| Map / Detail Drawer | `1412:508` | Variants: POI, Responder, Incident, Geofence, Camera, Drone |
| Map / POI Form | `1466:455` | Create/Edit POI |
| Map / Geofence Form | `1476:31900` | Fields + dropdowns + proximity/group-chat toggles |
| Map / Create Incident Form | `1485:455` | Title, type, severity, location, description |
| Map / Delete Dialog | `1470:455` | Destructive confirm (POI/Geofence) |
| Map / Snackbar | `1470:472` | Saved confirmation |

Point-editor overlays (header + polygon + vertex handles + action bar) are
composed per-artboard over the map substrate.

## Artboards (40 across 9 rows)

**4.1 Map Browse (12):** map `878:3`, map-fab `887:215`, map-ctx `887:256`,
layers-panel `887:295`, sel-poi `896:866`, sel-resp `1413:1000`,
sel-inc `1413:1228`, sel-geo `1413:1463`, sel-cam `1413:32088`,
sel-drone `1413:32309`, self-marker-hint `1413:32534`, drone-glyph-hint `1413:32729`.

**4.2 Create Incident on map (1):** map-create-inc `1485:6196`.

**4.3 Create POI (3):** create-poi `1468:2355`, exposure-hint `1473:3263`,
poi-created `1472:2745`.

**4.4 Edit POI (2):** sel-poi-edit `1472:2495`, edit-poi `1468:2428`.

**4.5 Delete POI (2):** sel-poi-delete `1472:2513`, delete-poi `1472:2531`.

**4.6 Create Geofence (10):** geo-pts `1480:3608`, geo-place `1480:3834`,
geo-shift `1480:4062`, geo-remove `1480:4293`, geo-done `1482:34988`,
geo-applied `1478:3333`, geo-alerts `1478:3400`, geo-prox `1478:3467`,
geo-filled `1478:3525`, geo-created `1483:4944`.

**4.7 Edit Geofence (5):** sel-geo-edit `1483:5143`, edit-geo `1478:3583`,
reshape-geo `1482:35213`, reshape-geo-selected `1482:35436`,
reshape-geo-dismissed `1482:35659`.

**4.8 Delete Geofence (2):** sel-geo-delete `1483:5160`, delete-geo `1483:5177`.

**3.5 Navigate (3):** inc-nav (route preview) `1486:5792`,
inc-nav-turn `1486:6011`, inc-nav-spatial `1488:6130`.

Each row is fronted by a `Description Flow` card (9 total).

## Status

**Complete** — every map + navigate flow state from the JSX catalog is
replicated as a Dark-mode, token-bound, component-driven artboard in the Map
Module section.

## Slice 3 — Situational Awareness (SA row)

Basic SA layered on top of Slice 2, vetted against the Slice 3 checklist and
built into the Map Module as a dedicated **SA row**. Vet outcome: the Map tab's
view/entity + in-context requirements were already covered by 4.1; the gaps
(mini-maps, PTV, view-on-map menus) are net-new (absent from the source
prototype) and are built here.

New component: **`Map / Mini Map`** (`2736:1566`) — non-interactive SA snapshot
(responder dot + incident pin + dashed connector + distance·ETA chip).
Also: the `Map / Detail Drawer` **Responder** variant (`1411:31062`) gained a
**PTV** action (row is now Message · Locate · PTT · PTV).

| Requirement | Artboard | ID |
|---|---|---|
| Mini-map on Incident Dispatch Assgt (responder, incident, distance, ETA) | SA — Dispatch Assignment | `2746:67580` |
| Mini-map on Incident Detail | SA — Incident Detail | `2763:6474` |
| Map in-context PTV responder (+ Message/Locate/PTT) | SA — Map responder (PTV) | `2778:6610` |
| Main page (Comms) context menu → View on map | SA — Comms 'View on map' | `2779:6817` |
| Contacts context menu → view entity on map (Locate) | SA — Contact profile (Locate) | `2780:6878` |

SA-row Description Flow card: `2782:68153`.

Already covered by 4.1 (no new work): view Incidents / Responders / Cameras on
the Map tab (pins + layers); in-context Create Incident, Message, PTT, and View
camera feed.

Note: ETA is a new data element (the source models `distance` only); mini-maps
show synthesized ETA values ("ETA 4 min" / "ETA 8 min") alongside distance.

## Slice 3 · Requirement A — Dispatch Alert mini-map (BUILT)

New section **"Slice 3 - Map Module"** (`2958:37291`, Map page). Adds a
non-interactable mini-map to the incoming dispatch alert per ratified spec
(A1–A3, S3.1, S2.2). Kept as a **scoped SA component** — the shared Dispatch
Modal (`713:38347`, used by the Slice-2 Incident module) was left untouched.

Components:
- `Map / Dispatch Mini Map` set `2968:1794` — `State=Available` `2968:1640`
  (self dot + dashed **direct-line** connector + incident pin + km chip) and
  `State=Location Unavailable` `2968:1719` (incident pin only, no self dot, no
  connector, "Your location unavailable" chip).
- `Dispatch Modal (SA) — State=Available` `2969:1772` — dispatch card with the
  mini-map + a labelled **"Direct-line · 3.8 km · ETA ~8 min"** row; REPORTED in km.
- `Dispatch Modal (SA) — Location Unavailable` `3004:1857` — same card with the
  unavailable mini-map + "Direct-line distance unavailable · Enable location"
  (no 0/blank, no fabricated connector — S2.2).

Frames:
- `Incident — Incoming Assignment` `2958:47126` — default (GPS available); modal
  swapped to the SA Available component.
- `Incident — Incoming Assignment — Location Unavailable` `3004:71656`.
- `Map Tab — Focused on Incident` `3006:8617` — tap-through target (A2/S3.1):
  full map centred on the incident pin (pulse-ring emphasis + focus chip), Map
  tab active, **no auto-callout**.

Units: km (Singapore). ETA labelled direct-line (spec S1.3/A1); no routed figure.

## Map callout freshness + feed-state (BUILT — reuse-only, no new components)

Added freshness/feed status to the shared `Map/ Bottom Sheet Menu`
(`3316:43247`) callouts by **reusing the existing `status chip`
(`3498:98437`)** — no new component, no new variant axis (the set stays
single-axis on `Context`). Decisions ratified with Kevin before any write.

- **Responder callout freshness (PART 1)** — `Context=Responder`
  (`3403:153811`) header gained a `status chip` instance (`3534:3`),
  token-bound `color-text-success`, label **"Live"**, mirroring the Camera/Drone
  header layout (`Frame 4` → FILL). Two-state model per Kevin ("just live and
  dead — **no Stale**"): callout `Live` chip ↔ `Map Pin/ Responder`
  (`3329:58536`) **Live** variant; dead ↔ **Lost** variant (chip instance
  overridden to Inactive/"Lost"). No `Stale` pin variant created (a canvas note
  — `3388:95036` — explicitly says not to).
- **Camera/Drone feed-state (PART 3)** — both callouts already consumed the
  `status chip`; relabelled the shared 3 states to feed vocabulary:
  `State=Default` → **Live** (success), `State=Inactive` → **No transmission**
  (muted), `State=Error` → **No access** (unchanged). Camera (`3498:98451`) and
  Drone (`3498:98444`) chips now read "Live" by inheritance. **Label-only** per
  Kevin (no dot, no lock glyph — colour + label already satisfies "never status
  by colour alone").

**PART 2 (Req 19 — disabled-with-reason Menu Item) DEFERRED.** The referenced
Comms "Bottom Sheet Menu / Locate-on-map row" does not exist: `3450:79802` and
`3450:95236` are both `Comms Module/ Drawer` frames built from **Comms Cards**,
the `Menu Item` sets (`3098:19`, `3072:1879`) carry only Kind=Default/Destructive,
and no "Locate on map" row is present. Revisit once the correct target is
confirmed.

Findings (pre-existing, not introduced here):
- `Parts/Divider > Frame 8` uses raw `#ffffff` @ opacity 1 across all callout
  contexts — shared Divider component; flag per AOH-ADHERENCE.
- Close button (`x`) sits at a fixed x=300 and overlaps the header chip's
  trailing edge (right=320) identically on Camera/Drone/Responder — pre-existing
  family layout; matched rather than diverged.
- `Live Badge` (`524:406`) dot binds to `severity/critical` (red), not a
  presence/success green — worth a semantics check.

## Notes / possible follow-ups

- The form artboards are static (no scroll); on a few, lower fields sit close to
  the footer button — revisit spacing if pixel-exact scroll position matters.
- The point-editor and Navigate overlays are composed per-artboard; if they'll
  be reused elsewhere, promote them to `Map / Geofence Editor` and
  `Map / Navigate` components.
