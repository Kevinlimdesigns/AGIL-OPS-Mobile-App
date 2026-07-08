# AGIL Mobile — Typography Audit · 2026-07-01

## ✅ RESOLVED (2026-07-01) — auto-bind complete
All raw typography was bound to ShadCN `text-*/font-*` styles. Re-scan after the fix (library grew to **433**
text nodes): **433/433 styled, font family Geist only (0 Poppins), 0 off-ramp sizes, 0 unstyled.**
- Bound **158 raw nodes** (count had grown from 145 as more Resource components were added) to the mapped
  `text-*/font-*` style — this also corrected the 11/13/17px off-ramp sizes (the style dictates size:
  11→12, 13→14, 17→16).
- Fixed the **Poppins** "Nav bar" node (`1112:12210`) → Geist `text-lg/font-semiBold`.
- Weight preserved to the same `font-*` where the style exists; 3 combos with no in-file style fell back to
  nearest weight (12 SemiBold→xs/bold, 18 Bold→lg/semiBold, 20 SemiBold→xl/bold).
- Spot-checked A5 Dispatch Brief, Contact chip (+ others) — no layout breakage.
- Left as-is: Description Flow `ShadCN typography/h1·h2` (valid ShadCN heading styles).

*(Original audit below, for reference.)*

---



**Scope:** all **420** text nodes in the component library (`34:995`). Question: is all typography using the
ShadCN library (Geist font + the `text-*/font-*` type styles)? Read-only.

## Headline
- **Font — essentially all Geist:** **419 / 420** Geist. **1 non-Geist** (Poppins).
- **ShadCN text styles — partial:** **275 bound (66%)** to `text-*/font-*`; **145 (34%) use raw font** (Geist
  but *not* bound to a style). Per AOH-ADHERENCE ("typography via styles; never set a raw font size"), those
  145 are adherence gaps.
- **Off-ramp sizes present:** `13px` ×16, `17px` ×13, `11px` ×1 — none are in the ShadCN ramp
  (12/14/16/18/20/24). The **`11px` breaks the 12 sp floor**.

## 1. Font family
| Family | Count | |
|---|---|---|
| Geist | 419 | ✓ |
| **Poppins** | **1** | ⚠️ node `1112:12210` — a loose "Nav bar" label (not inside a component; also uses a non-ShadCN "Typography/Heading3" style). Convert to Geist or delete. |

## 2. Text-style bindings (ShadCN type ramp)
275 bound. Styles in use are the correct ramp — `text-xs/sm/base/lg/xl · font-regular/medium/semiBold/bold`
(e.g. `text-sm/font-medium` ×64, `text-sm/font-regular` ×48, `text-lg/font-regular` ×27, `text-base/font-regular` ×17).
**Two off-ramp style families** also appear:
- `ShadCN typography/h1` + `h2` (Description Flow `97:2004`/`97:2005`) — ShadCN, but a different naming from
  the `text-*` ramp. Normalise to `text-xl/2xl` (or keep if intentional).
- `Typography/Heading3` (the loose Nav bar `1112:12210`) — a **non-ShadCN** style. Remove.

## 3. Raw typography (145 nodes — Geist but no bound style) — top offenders
| Component | Raw text nodes |
|---|---|
| Contact chip | 23 |
| Context menu | 12 |
| Comms / Recent Row | 12 |
| Comms / Pinned Row | 12 |
| Comms / PTT Controls | 12 |
| PTT Log Row | 9 |
| Mobile / Button (labels) | 8 |
| A5 · Dispatch Brief | 7 |
| (loose / not in component) | 6 |
| Talk bar — States | 6 |
| PTV / Incoming Banner | 5 |
| Resource / Responder·Camera·Drone Rows | 5 + 5 + 4 |
| Biometric Modal / Android | 4 |
| PTV / PiP, Control Button, Comms Header/Target/Sub-header/Search, Content, Live Badge | 1–4 each |

Most of these are on-ramp sizes (12/14/16/18) just not *bound* to the style; binding them to the matching
`text-*/font-*` style makes them governed and dev-mappable to Compose.

## 4. Off-ramp sizes to correct (raw nodes)
- **`13px` ×16** → 12 or 14 (e.g. Context menu "Channel/Contact" meta; A5 Dispatch Brief subtitle).
- **`17px` ×13** → 16 or 18 (e.g. A5 Dispatch Brief title).
- **`11px` ×1** → **≥12** (violates the 12 sp floor).

## Verdict
Font is effectively standardised on **Geist** (one stray Poppins label). Typography is **not fully** on the
ShadCN **styles** — a third of text nodes set raw Geist, and there are `13/17/11px` off-ramp sizes plus a
stray non-ShadCN style. To be fully compliant: (1) rebind the 145 raw nodes to `text-*/font-*`; (2) fix the
13/17/11px sizes onto the ramp; (3) convert the Poppins/`Typography/Heading3` node to Geist + a `text-*` style
(or delete); (4) normalise `ShadCN typography/h1·h2` to the `text-*` ramp.

*Note:* "Resource / Camera Row" + "Resource / Drone Row" appeared here but weren't in the 2026-07-01 component
list (73) — component count is likely >73; the next full component audit will reconcile.
