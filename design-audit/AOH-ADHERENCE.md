# AOH Design-System Adherence — Rules for Every Design

**Read this before creating or editing ANY design in Figma.** AOH UI/ShadCN is the single source of
truth — the **source** components live in file `IQxwVUqzckYn7u7nNhX6lF` (read-only; bring components FROM
here). All mobile work is created/edited ONLY in the **AGIL Mobile App** file `e6RBhSWdLlLinhceozYLYe`, node
`34:995`. Material 3 (`ZfL0m57nIO3j86Yfr5IoDG`) is a read-only mobile-ergonomics benchmark only. The app is
Android (Kotlin/Jetpack Compose), dark theme, public-safety.

> **Numeric tokens live in [`../DESIGN.md`](../DESIGN.md)** — the single source of truth for colour/type/
> radius/spacing/component values (e.g. bottom nav bar **80dp**). This file states the *rules*; DESIGN.md
> states the *numbers*. If a value is needed, pull it from DESIGN.md — do not restate a divergent number here.

## Hard rules (must pass)
1. **No raw colour.** Never use raw hex/rgba. Bind every fill/stroke/text colour to an AOH variable:
   `color-bg`, `color-bg-subtle`, `color-bg-elevated`, `color-border`, `color-text`, `color-text-muted`,
   `color-text-interactive`, `color-bg-primary`, semantic `color-text-error/warning/success/info`, and the
   `severity/info|normal|caution|serious|critical` tokens for status.
2. **Typography via styles.** Apply AOH text styles `text-*/font-*` (e.g. `text-base/font-regular`). Never set
   a raw font size. Body/primary content ≥ `text-base` (16 sp); secondary `text-sm` (14); labels `text-xs`
   (12) — **12 sp is the floor**, never smaller. Titles `text-lg`/`xl`/`2xl`.
3. **Tokens for geometry.** Radius → `Radius/*`; spacing/padding/gap → `Spacing/*` (4/8 grid); sizes → `Size/*`.
4. **Reuse AOH components.** If AOH has the component (button, chip, badge, tabs, input, avatar…), build from it
   — don't redraw. New mobile components live in the "Mobile Component" section, built from AOH tokens/styles.
5. **Mobile sizing.** Frames **360 × 780 dp**; full-width content fills 360. Touch targets **≥ 48 dp**
   (**56** critical actions, **64** PTT/SOS). 8 dp min spacing between targets.
6. **Status encoding.** Always colour **+ icon + label** (color-blind / glance / WCAG). Contrast ≥ 4.5:1.
7. **States.** Buttons: Default/Pressed/Disabled/Loading; toggles add Selected. Loading: skeleton for content,
   spinner for actions (see `mobile-rules.md`).

## Quick self-check before finishing a design
- [ ] Zero raw hex/rgba — every colour is an AOH variable
- [ ] Every text node uses a `text-*/font-*` style (no raw sizes); body ≥ 16 sp, nothing < 12 sp
- [ ] Radius/spacing/size are tokens; components reused from AOH where available
- [ ] Frame 360×780; interactive targets ≥ 48 dp (56/64 for critical/PTT)
- [ ] Status uses colour + icon + label; contrast ≥ 4.5:1

## Known offenders to fix / avoid repeating
The **Comms/PTV suite** (e.g. node 713:39118) was built with raw values — `#71717a` labels (use
`color-text-muted`), `text-white`/`rgba(255,255,255,…)` (use `color-text*`), `#fafafa`/`#ef4444` raw
(use `color-text`/`severity-critical`), `#1e293b/#27272a/#1f2735` bg (use `color-bg-elevated/strong/subtle`),
white-alpha borders (use `color-border`). Rebind these to tokens; do not copy this pattern into new work.

## Sanctioned exception — on-colour overlays (talk bars)
Elements that sit **on a saturated severity-colour bar** (the Comms "Talk bar — States" Live/Incoming/Weak/
Critical variants) need overlay surfaces/icons that read on any background. AOH `color-*` tokens don't cover
this, so use the purpose-built `comms/avatar-surface` (cutout circle), `comms/mic-surface` (white 15% frosted
holder) and `comms/bar-text-primary` (white glyph/label) — the pattern the `State=Selected` variant uses.
**Do NOT rebind these to `color-bg-elevated`/`color-border`** — that turns the icons dark-on-dark and they
disappear on the coloured bars (regression fixed 2026-06-30). Keep raw hex out; use these comms/* tokens.
