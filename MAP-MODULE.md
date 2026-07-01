# Map Module — Figma Replication

**File:** AGIL Mobile App (`e6RBhSWdLlLinhceozYLYe`)
**Page:** `Map` (`808:6171`) → section **Map Module** (`815:10830`)
**Source:** `630cac26-8._responderapp.jsx` (map flows 4.1–4.8 + 3.5 Navigate)
**Branch:** `claude/map-figma-replication-2rcdri`
**Started:** 2026-07-01

Replicates the app's map screens into Figma as a component-driven module,
matching the existing Incident/Chat/Comms module convention: **360×780
artboards** built from reusable component instances, laid out one subflow per
row with a **Description Flow** card, and pinned to the design system's **Dark**
variable mode.

## Conventions locked in

- **Artboard size:** 360×780.
- **Tokens:** all colours bound to the remote **Semantic colors** collection
  (`color-bg`, `color-bg-subtle`, `color-text`, `color-border`, `color-bg-primary`,
  `color-text-error`, …), spacing/radius to `Spacing/*` and `Radius/*`. No
  hard-coded hex except the bespoke map-canvas palette (matches the JSX `MapBg`).
- **Dark mode:** the Semantic colors collection defaults to **Light**. The Map
  Module section and every artboard set `explicitVariableModes → Dark (93:0)`,
  exactly as the Incident artboards do. (Without this, every token resolves to a
  light value — the main gotcha of this file.)
- **Type:** Geist ramp via the shared text styles.
- **Icon wrappers:** `createNodeFromSvg` frames ship an opaque white fill —
  cleared to transparent after every import.

## Map component block (Components page `39:17` → section `Map block` `871:614`)

| Component | ID | Notes |
|---|---|---|
| Map / Canvas | `871:615` | Stylized dark map (roads/water/parks/buildings) from `MapBg` |
| Map / Search Bar | `872:614` | "Search location…" field |
| Map / Control Button | `872:636` | Variants: Layers, Crosshair, Layers-Active |
| Map / Pin | `874:620` | Variants: Incident, POI, Camera, Drone, Responder, Cluster, Self (heading cone), LongPress |
| Map / FAB | `876:644` | Variants: Collapsed, Expanded (Create Incident/Geofence/POI) |
| Map / Layers Panel | `876:645` | 6 layer toggles |
| Map / Context Menu | `877:614` | "Create at this location" → Incident/Geofence/POI |
| Map / Geofence Shape | `877:634` | Dashed amber polygon + ZONE BRAVO label |
| Map / Detail Drawer | `895:614` | Bottom sheet — handle, identity, action row, body (POI variant) |

Reused shared components: `Mobile / Status Bar` (`42:25`), `Tab bar` (`52:1173`,
Map tab set active via per-instance override), `Talk bar — States / Selected`
(`831:11162`), `Description Flow` (`97:2007`).

## Artboards built — 4.1 Map Browse (validation batch)

| Artboard | ID | State |
|---|---|---|
| map — Map Browse | `878:3` | Default map: pins, search, controls, geofence, talk bar, Map tab active |
| map-fab — FAB expanded | `887:215` | FAB open with 3 create actions |
| map-ctx — Long-press menu | `887:256` | Dropped pin + "Create at this location" menu |
| map — Layers panel | `887:295` | Layers panel open, layers button active |
| map-sel-poi — POI detail | `896:866` | POI selected + bottom detail drawer |

Description Flow card for the row: `898:1027`.

## Status

**Validation batch delivered** — shared Map component block + core 4.1 browse
screens, all rendering faithfully in Dark mode with bound tokens. Paused here
for review of look & convention before the full pass.

## Remaining (full pass, after review)

- **4.1 finish:** drawer states for responder / incident / geofence / camera /
  drone (Detail Drawer needs those variants added); `map-self-marker-hint`,
  `map-drone-glyph-hint`.
- **4.2** Create Incident on map · **4.3** Create POI (+ exposure hint, created
  snackbar) · **4.4** Edit POI · **4.5** Delete POI · **4.6** Create Geofence
  (10 states inc. point editor) · **4.7** Edit Geofence (+ reshape) · **4.8**
  Delete Geofence · **3.5** Navigate (Route Preview / Turn-by-turn / Spatial).
- Additional components: POI Form, Geofence Form (+ dropdowns), Geofence Point
  Editor, Delete Dialog, Snackbar, Navigate cards; expand Detail Drawer to all
  six pin types.
- Per-subflow Description Flow cards and full grid layout.
