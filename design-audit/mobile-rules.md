# AGIL Mobile — Mobile Component Rules (M3-benchmarked)

**Purpose.** We maintain **one** design system — **AOH UI/ShadCN** — and build our mobile
components inside it (they live on the **Mobile Components** page). AOH stays the source of the
**look** (Geist type, radii, neutral palette, dark tokens). We do **not** adopt Material 3 as a
system; we use it only as the **ruler** for mobile ergonomics — sizing, padding, type, safe zones,
grid — because the Android app is built in **Kotlin + Jetpack Compose**, where M3 defines what's
correct on-device.

> **Mental model:** AOH = how it looks · Material 3 = how big it is / where it sits.
> Borrow M3's measurements, not its visual identity.

**M3 reference file:** Material 3 Design Kit (Community) — fileKey `ZfL0m57nIO3j86Yfr5IoDG`
(https://www.figma.com/design/ZfL0m57nIO3j86Yfr5IoDG/Material-3-Design-Kit--Community-).
Units below are **dp** (sizes/spacing) and **sp** (type), matching Compose. In Figma, 1px = 1dp/sp.

---

## 1. Touch targets  *(auto-checkable)*
- **Minimum interactive target: 48 × 48 dp.** Applies to buttons, icon buttons, tabs, list rows,
  chips, switches, checkboxes, FAB, and any tappable cell.
- A control may *look* smaller (e.g. a 40 dp button container) but its **touch target must still be
  ≥ 48 dp** (extend with transparent padding / a min-height wrapper).
- **Minimum 8 dp gap** between adjacent targets.
- Reference M3: icon button target 48 dp (icon 24 dp); FAB 56 dp; standard button container 40 dp.

**Audit check:** flag any interactive component/instance whose height OR width < 48 dp.

## 2. Spacing & padding  *(auto-checkable)*
- Use the **4 dp base grid**; prefer 8 dp increments. AOH `Spacing/*` already aligns
  (4 / 8 / 12 / 16) — mobile components must use these tokens, not hardcoded values.
- Screen side margins: **16 dp** (compact phones).
- Min content padding inside cards/sheets/rows: **16 dp** horizontal.

**Audit check:** flag paddings/gaps not bound to an AOH `Spacing/*` token, or not a multiple of 4.

## 3. Typography  *(auto-checkable)*
- **Body text ≥ 14 sp** (16 sp preferred for primary reading). Never below **12 sp**.
- Map mobile type to comfortable mobile sizes; keep Geist + AOH `text-*` tokens.
- M3 type-scale reference (sp, size/line):
  | Role | Size/Line | Weight |
  |---|---|---|
  | Headline S | 24 / 32 | 400 |
  | Title L | 22 / 28 | 400 |
  | Title M | 16 / 24 | 500 |
  | Body L | 16 / 24 | 400 |
  | Body M | 14 / 20 | 400 |
  | Label L (buttons) | 14 / 20 | 500 |
  | Label M | 12 / 16 | 500 |

**Audit check:** flag any text node < 14 sp in body/content roles (note < 12 sp as P1).

## 4. Safe zones / system insets  *(partial-auto / manual)*
- Full-screen mobile frames must reserve **Android window insets**: status bar (top, ~24 dp+),
  navigation/gesture bar (bottom, ~24–48 dp). In Compose: `WindowInsets.safeDrawing` /
  `systemBars` — never hardcode.
- No interactive element inside the gesture-nav zone or under the status bar.
- Top app bar reference height **64 dp**; bottom navigation bar **80 dp**.

**Audit check:** flag screen frames whose top/bottom content has no status-bar / nav-bar inset
allowance; verify the status bar + bottom bar components are present on full screens.

## 5. Layout grid  *(manual / spot-check)*
- Compact (phone, < 600 dp wide): **4-column grid, 16 dp margins, 16 dp gutters.**
- Content max line length and alignment follow the 4-col grid.

**Audit check:** spot-check a sample of screens for 16 dp margins and 4-col alignment; report
deviations (not exhaustively measurable from metadata).

## 6. Shape / radius  *(auto-checkable)*
- Use AOH `Radius/*` tokens. M3 shape-scale reference for sanity: XS 4 · S 8 · M 12 · L 16 · XL 28.
- Buttons/inputs typically S–M; sheets/dialogs M–L; FAB/full = large/pill.

**Audit check:** flag radii not bound to an AOH `Radius/*` token.

## 7. States  *(manual)*
- Replace desktop **hover** with **pressed / ripple** on mobile (Compose adds ripple, but the
  design must still show a pressed state). Drop hover-only states.
- Required states by component type:
  | Component | States |
  |---|---|
  | **Standard button** | Default · Pressed · Disabled · **Loading** (+ Focused for a11y/HW keyboard) |
  | **Toggle controls** (chip, segmented, tab item, nav item) | Default (unselected) · **Selected** · Pressed · Disabled |
- **Loading** = swap label for a spinner AND make non-interactive (a product pattern, not a core
  M3 state). **"Selected" applies only to toggles**, not standard push buttons.

**Audit check:** flag standard buttons missing Pressed/Disabled/Loading; flag toggles missing
Selected/Pressed/Disabled.

---

## 8. Loading states  *(spec)*
- **Skeleton** for initial load of known layouts; **spinner** for button/action/auth (Mobile/Button has a
  Loading state); **inline spinner + keep last-known state** for real-time comms (PTT/live) — never blank
  out actionable info in an emergency.
- **3 skeleton archetypes** (built in the "Loading State" section 671:34972), reused across screens by type:
  **List** (Incidents List — card placeholders), **Detail** (Incident Detail — avatar+line row placeholders),
  **Comms/roster** (pinned/recent contact placeholders + PTT block). Keep chrome (status bar, header, tab bar,
  talk bar) solid; skeletonize only dynamic content. Placeholder blocks use a muted surface (color-bg-elevated).
- The **shimmer animation is implemented in Compose**; Figma holds the static skeleton spec.

## Severity mapping for the audit
- **P1** — touch target materially small (< 40 dp), body text < 12 sp, missing safe-area on a
  full screen.
- **P2** — target 40–47 dp, body text 12–13 sp, off-grid spacing/padding, hardcoded radius/spacing.
- **P3** — hover-only states, grid/margin deviations, naming/namespace issues.

> These thresholds are **M3-derived references for ergonomics only**. Visual styling continues to
> follow AOH UI/ShadCN. When in doubt about a number, confirm against the M3 reference file above.
