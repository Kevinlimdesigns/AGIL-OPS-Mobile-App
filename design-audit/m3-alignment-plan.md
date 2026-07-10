# M3 Alignment Plan — AGIL Mobile component library (PLAN ONLY, no changes yet)

**Reference:** Material 3 Design Kit (Community) `ZYlzCHpDJ057CUzQVFN7zd` (node `11:1833`).
**Goal:** align **values only** — dimensions, spacing, corner radius, elevation, state layers, touch
targets, icon sizes — so the build maps cleanly to **Jetpack Compose Material 3** components.
**Explicitly out of scope (do NOT change):** colour and typography. AOH stays the source of truth for
`color-*`/`severity/*` and `text-*/font-*`; M3 governs geometry/ergonomics only.

## M3 system values to standardise on
- **Grid:** 4 dp base (use multiples of 4; 8/12/16/24 common).
- **Shape scale (radius):** none 0 · XS **4** · S **8** · M **12** · L **16** · XL **28** · full/pill.
- **Touch target:** ≥ **48 dp** (AGIL already enforces; keep 56/64 for critical/PTT — a justified field deviation).
- **Icon sizes:** **24** standard · 18 dense · 40/48 large.
- **State layers:** hover **8%** · focus **10%** · pressed **10%** · drag 16% (over the on-color role).
- **Elevation:** levels 0–5 (0 flat, 1 card/bar, 3 menu/FAB, 5 modal). Map to AOH surface tokens, not M3 colours.

## Component-by-component plan (AGIL → M3 target → action)
Priority: **P1** = build-blocking / touch or dimension mismatch · **P2** = polish/consistency · **P3** = nicety.

### Navigation — ✅ already done
Nav/Tab Item (`68:1219`) aligned 2026-07-01 (pill 56×32 r16, icon 24, item 64, pressed state). See
`m3-navigation-benchmark.md`. **Remaining:** bump Tab bar *instances* from 48→64 item height if strict.

### Buttons — `Mobile / Button` (439:261)
- M3: height 40 (baseline) → AGIL uses 48 / 56 (critical). **Keep** (field ergonomics), but treat as M3
  Expressive sizes M/L. **Radius = full/pill** (M3 Expressive default) or L(16) if you want the softer rect.
  Confirm which. **State layers** 8/10% (P2 — ties to the open "no state-layer token" item). **PTT/SOS 64** (P1, per benchmark).
- **Action:** verify radius token = full or `Radius/large`; add pressed/focus state layer; confirm 64 for PTT/SOS.

### Chips — `Filter Chip` (127:109), `Chat / Quick Replies` (187:3)
- M3 chip: **height 32**, radius **8**, leading icon 18, label label-large. AGIL raised chips to 48 for gloves.
- **Action (P2):** keep 32 dp **visual** pill but inside a **48 dp tap target** (M3-faithful pattern) instead of
  a 48 dp pill; radius → `Radius/8`. This matches Compose `FilterChip` while preserving the touch target.

### Cards — `Incident / Card` (49:6)
- M3 card: radius **12** (M), elevation level 1, content padding **16**. **Action (P2):** confirm radius 12 + 16 padding.

### List items — `Responder Row` (113:85), `Checklist / Item` (114:71), `Detail / Field` (112:67), `PTT Log Row` (522:411)
- M3 list item: **1-line 56 / 2-line 72 / 3-line 88**, L/R padding **16**, leading icon 24 / avatar 40, gap 16.
- AGIL rows are ~48–60. **Action (P1/P2):** set row heights to the 56/72/88 ladder by line count; padding 16; avatar 40.

### Tabs — `Incident / Tabs` (101:87)
- M3 primary tab: **height 48**, indicator **3 dp** (full-width or fitted), label title-small, state layers.
- **Action (P2):** confirm 48 height + 3 dp indicator; add pressed state layer.

### Top app bar — `Header` (53:1027), `Incident / Detail Header` (126:70), `Comms / Header` (514:262)
- M3 small top app bar: **height 64**, L/R padding **16** (nav icon 4 inset), title title-large, icon buttons 48.
- **Action (P2):** normalise bar height to 64 and icon-button targets to 48.

### Bottom sheets — `Attachment/File Picker/Gallery Sheet` (131:155, 187:4027/4071)
- M3 bottom sheet: **top radius 28**, **drag handle 32×4** centered (top ~22 region), content padding 16.
- **Action (P2):** confirm top radius 28 + add the 32×4 drag handle where missing.

### Dialog / modal — `Biometric Modal / Android` (428:7981)
- M3 dialog: radius **28**, padding **24**, action row gap 8, buttons right-aligned.
- **Action (P2):** confirm radius 28 + 24 padding.

### Menus — `Context menu` (469:262), `Incident / Status Menu` (111:66)
- M3 menu: radius **4** (XS)… (M3 Expressive uses larger; pick one), item height **48**, min-width 112, elevation 2–3.
- **Action (P2):** item height 48; radius token consistent.

### Status / banners / badges
- `Priority / Pill` (77:251), `Incident / Status Banner` (187:3981): display-only chips — M3 badge/label; keep
  colour+icon+label. `badge` (in Nav/Tab Item): M3 small dot **6**, large **16** r8 — AGIL 16 matches "large". OK.
- `Parts/Divider`: M3 divider **1 dp** — confirm thickness 1.

### Inputs — `Chat / Input Bar` (131:133), `Comms / Search Field` (522:416)
- M3 text field: **height 56**, radius (filled top 4 / outlined 4), padding 16, leading/trailing icon 24.
- **Action (P2):** confirm field height 56 + icon 24.

### FAB / large actions — `Action Tile` (124:72), PTT control
- M3 FAB: standard **56 r16**, small 40 r12, large 96 r28. AGIL PTT/SOS = 64 (field). **Keep**; note as deviation.

## Suggested sequencing
- **P1 batch:** list-item height ladder (56/72/88), PTT/SOS 64, any interactive < 48.
- **P2 batch:** chips 32-in-48, cards r12, tabs 48 + indicator 3, app bars 64, sheets r28 + handle, dialog r28,
  menus item 48, inputs 56, button radius + state layers.
- **P3 batch:** elevation levels mapped to AOH surfaces; divider 1 dp; badge dot sizes.

## How this maps to Compose
Each target above is a stock Compose M3 component default (`NavigationBar`, `FilterChip`, `Card`,
`ListItem`, `TabRow`, `TopAppBar`, `ModalBottomSheet`, `AlertDialog`, `DropdownMenu`, `TextField`,
`FloatingActionButton`), so aligning the Figma values means the design maps 1:1 to Compose defaults —
devs override only colour/type via the AOH theme. **No colour/type changes in this plan.**

> Next step: confirm which batches to execute; each component change is applied per AOH-ADHERENCE.md,
> instances swept for overrides (per the SOS/nav lessons), and re-audited.
