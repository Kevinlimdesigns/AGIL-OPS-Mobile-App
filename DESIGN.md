---
name: AGIL Ops Mobile App
description: Dark, status-driven incident-response console for mixed operations roles.
colors:
  bg: "#09090b"
  bg-subtle: "#18181b"
  bg-secondary: "#27272a"
  bg-elevated: "#1e293b"
  border: "#27272a"
  text: "#fafafa"
  text-muted: "#a1a1aa"
  text-placeholder: "#71717a"
  text-onColor: "#030712"
  primary: "#0ea5e9"
  interactive: "#38bdf8"
  text-success: "#6ee7b7"
  text-warning: "#fde047"
  text-error: "#f87171"
  text-info: "#60a5fa"
  bg-success-strong: "#6ee7b7"
  bg-warning-muted: "#422006"
  bg-error-muted: "#450a0a"
  bg-info-muted: "#172554"
  comms-bar-surface: "#15263d"
  comms-avatar-surface: "#2a3f5c"
  chat-bubble-out: "#1f4a55"
  chat-receipt: "#7dd3fc"
typography:
  title:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: "32px"
    letterSpacing: "0"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
    letterSpacing: "0"
  label:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: "20px"
    letterSpacing: "0"
  caption:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: "16px"
    letterSpacing: "0"
rounded:
  sm: "4px"
  md: "6px"
  round: "9999px"
spacing:
  "2xs": "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-onColor}"
    rounded: "{rounded.md}"
    height: "48px"
    padding: "0 16px"
  button-secondary:
    backgroundColor: "{colors.bg-secondary}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    height: "44px"
    padding: "0 16px"
  input-field:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    height: "44px"
    padding: "0 12px"
  pill-critical:
    backgroundColor: "{colors.bg-error-muted}"
    textColor: "{colors.text-error}"
    rounded: "{rounded.round}"
    padding: "2px 8px"
  pill-high:
    backgroundColor: "{colors.bg-warning-muted}"
    textColor: "{colors.text-warning}"
    rounded: "{rounded.round}"
    padding: "2px 8px"
  tab-pill-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-onColor}"
    rounded: "{rounded.round}"
    padding: "4px 12px"
  incident-card:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
---

# Design System: AGIL Ops Mobile App

## 1. Overview

**Creative North Star: "The Instrument Panel"**

This is the cockpit of an incident, not a brochure for one. The interface behaves
like instrumentation: a calm, near-black field on which a small number of
meaning-carrying signals — severity, status, who's online, what to do next —
light up with precision. Lifted directly from the AGIL Operations Hub web console
(a ShadCN dark theme), the mobile app mirrors that system so an operator moving
between the control-room desk and the field never re-learns the language. Density
is deliberate: every screen earns its space by surfacing the current state of an
incident and the one action that advances it.

The palette is a zinc-black neutral ramp with **sky blue as the single
interactive voice** and a tight set of semantic status colors (red/amber/green)
that are *never* decorative. Typography is one family — Geist — worked across
weights, so hierarchy comes from size and weight, not from font-mixing. The feel
is sharp and high-signal: control-room energy, legible at a glance, trustworthy
under pressure.

This system explicitly rejects the **generic SaaS dashboard** (no gradient-accent
hero metrics, no decorative card chrome), the **cluttered legacy enterprise** look
(no gray walls of controls), and **overstyled flash** (no glassmorphism, no neon,
no motion that competes with the data). A planned dashboard audit holds the design
to exactly these standards.

**Key Characteristics:**
- Near-black canvas (#09090b); depth via tonal layering, not heavy shadow.
- One interactive color (sky blue); status colors reserved for status only.
- Single typeface (Geist) across weights; hierarchy by size/weight.
- 6px radius on controls; full-round only on pills and avatars.
- Glanceable: severity and status readable in under a second.

## 2. Colors

A zinc-black neutral foundation, one sky-blue interactive accent, and a strict
semantic status set. Color is information; spend it carefully.

### Primary
- **Signal Sky** (#0ea5e9): The single interactive voice. Active tab pills,
  primary buttons, the selected nav item, and the incident-count emphasis. Its
  lighter sibling **Sky Interactive** (#38bdf8) carries links, interactive icons,
  and inline actions ("Forgot password?").

### Secondary
- **Comms Slate** (#15263d): The talk-bar surface — a distinct blue-slate that
  sets the always-on "push-to-talk" zone apart from the black content field.
  Paired with **Avatar Slate** (#2a3f5c) for team avatars and
  **Chat Outbound** (#1f4a55) for the user's own message bubbles, with
  **Receipt Cyan** (#7dd3fc) for read receipts.

### Tertiary — Semantic Status
The status ramp. Each role has a saturated foreground and a deep muted background
for badges/alerts. Never used for anything but its meaning.
- **Critical Red** (#f87171 on #450a0a): CRITICAL priority, errors, destructive state.
- **High Amber** (#fde047 on #422006): HIGH priority, warnings.
- **Active Green** (#6ee7b7): live/active incident status, success, "online".
- **Info Blue** (#60a5fa on #172554): informational banners and system notes.

### Neutral
- **True Black** (#09090b): The base canvas — body background, input fields.
- **Subtle** (#18181b) / **Secondary Surface** (#27272a): Raised rows, secondary
  buttons, search field, sheets.
- **Elevated Slate** (#1e293b): Overlays, menus, and elevated cards.
- **Border** (#27272a): Hairline dividers and control strokes; one pixel only.
- **Ink** (#fafafa): Primary text and icons.
- **Muted Ink** (#a1a1aa): Secondary text, metadata, muted icons.
- **Placeholder** (#71717a): Input placeholders only.
- **On-Color Ink** (#030712): Text/icons on sky-blue or bright status fills.

### Named Rules
**The One Voice Rule.** Sky blue (#0ea5e9 / #38bdf8) is the *only* interactive
color. If something is tappable and primary, it is sky; if it is sky, it is
interactive. Never use sky decoratively.

**The Status-Is-Sacred Rule.** Red, amber, and green appear *only* to convey
severity or state. A green that means "active incident" must never also be a
"submit" button. Spend status color on meaning, nothing else.

## 3. Typography

**Display / Body / Label Font:** Geist (with `system-ui, sans-serif` fallback)

**Character:** One geometric-humanist sans worked across five weights (Light 300
→ Bold 700). A single family keeps the interface quiet and instrument-like;
hierarchy is built from size and weight, never from contrasting typefaces. Numbers
and IDs (incident #1042, timestamps) sit comfortably in the same family.

### Hierarchy
- **Title** (Bold 700, 20px / 32px line): Screen titles ("Incidents"), the top of
  a view.
- **Body** (Regular 400, 16px / 24px line): Primary reading text, input values,
  message bodies. Also Medium 500 and Bold 700 at 16px for emphasis within rows.
- **Label** (Medium 500, 14px / 20px line): Buttons, tab pills, list-row primary
  text, field labels. Also Regular/SemiBold/Bold 14px variants for row metadata
  and emphasis.
- **Caption** (Bold 700, 12px / 16px line): Pills (CRITICAL, HIGH), section
  eyebrows (INCIDENT, LOCATION), counts. Light 300 / 12px for the quietest
  helper text.

### Named Rules
**The One Family Rule.** Geist only. Do not introduce a second typeface for
"display" or "mono"; lean on weight (300–700) and size for every level of
hierarchy.

## 4. Elevation

This is a tonal-layering system, not a shadow system. Depth is read primarily
from the neutral ramp — black (#09090b) recedes, subtle (#18181b) and secondary
(#27272a) lift, elevated slate (#1e293b) floats. Shadows exist but are restrained
and reserved for genuinely floating surfaces (menus, sheets, toasts) over a dim
background overlay.

### Shadow Vocabulary
- **sm** (`box-shadow: 0 1px 2px rgba(16,24,40,0.05)`): Resting lift for buttons
  and small controls.
- **sm-strong** (`box-shadow: 0 1px 3px rgba(16,24,40,0.10), 0 1px 2px -1px rgba(0,0,0,0.10)`):
  Cards and inputs that need a touch more separation.
- **lg** (`box-shadow: 0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(16,24,40,0.10)`):
  Floating surfaces only — status menus, attachment sheets, dialogs.

### Named Rules
**The Layer-First Rule.** Reach for a lighter neutral surface before reaching for
a shadow. Shadows are for things that genuinely float above the page (sheets,
menus, toasts), paired with a dim background overlay — never to decorate a resting
card.

## 5. Components

### Buttons
- **Shape:** Gently rounded (6px radius).
- **Primary:** Signal Sky fill (#0ea5e9) with On-Color Ink (#030712), 48px tall,
  full-width in forms. The unmistakable primary action.
- **Secondary:** Secondary Surface (#27272a) with Ink text (#fafafa), 44px tall.
  Used for alternate auth and paired actions.
- **Hover / Focus:** Subtle background shift one step along the neutral ramp; a
  sky focus ring (#38bdf8) on keyboard focus. No transforms, no bounce.

### Chips & Pills
- **Priority pills:** Full-round (9999px), Caption type (Bold 12px), 2px×8px
  padding. CRITICAL = Critical Red on #450a0a; HIGH = High Amber on #422006.
  Always paired with a word, never color alone.
- **Filter tabs (All / Active / Closed / Declined):** Full-round pills. Active =
  Signal Sky fill with On-Color Ink; inactive = Secondary Surface (#27272a) with
  Muted Ink. Counts shown inline ("All (3)").

### Cards / Containers — Incident Card (signature)
- **Corner Style:** 6px radius; rows separated by 1px Border (#27272a) hairlines.
- **Background:** True Black (#09090b), flat at rest.
- **Anatomy:** Incident ID + title (Body Bold) on the left, priority pill on the
  right; second line is a location row (pin icon + address, Muted Ink); third line
  pairs "Reported HH:MM" with a status word in its semantic color (Active = green)
  and a responder count with avatar-group icon.
- **Internal Padding:** 12px vertical, 16px horizontal.

### Inputs / Fields
- **Style:** True Black fill (#09090b), 1px Border (#27272a) stroke, 6px radius,
  44px tall, 12px horizontal padding. Placeholder in #71717a.
- **Focus:** Border shifts to Sky Interactive (#38bdf8); no glow.
- **Error:** Border and helper text in Critical Red (#f87171); field background may
  use #450a0a for emphasis. Trailing affordances (eye-off toggle) in Muted Ink.

### Navigation — Bottom Tab Bar
- **Style:** Five tabs (Comms, Chat, Incidents, Map, Resources) on a near-black
  bar with a top hairline. Icon over Caption label.
- **Height:** **80dp** (the bar container). Comfortable field/glove tap targets and
  room for the icon-over-label stack; reuse the existing Figma nav component
  (`34:995`) rather than building a new one.
- **States:** Active tab uses Signal Sky icon + label; inactive uses Muted Ink.
  Badges (unread) sit as small sky/red dots on the icon.

### Talk Bar (signature)
- A persistent push-to-talk strip above the tab bar on Comms Slate (#15263d).
  Shows the active team, an avatar cluster on Avatar Slate (#2a3f5c), an online
  count + readiness line ("3/3 online · Ready to talk"), and a circular mic
  control. This is the always-available voice channel — distinct surface, always
  reachable, never competing with content.

### Chat Bubbles
- Outbound bubbles use Chat Outbound (#1f4a55); inbound use a neutral surface.
  Voice notes, images, files, and system messages each have a dedicated bubble
  shape. Read receipts in Receipt Cyan (#7dd3fc).

## 6. Do's and Don'ts

### Do:
- **Do** keep sky blue (#0ea5e9 / #38bdf8) as the *only* interactive color — the One Voice Rule.
- **Do** reserve red/amber/green strictly for severity and status, always paired with a word or icon (WCAG: never color alone).
- **Do** build hierarchy from Geist weights (300–700) and size, not from a second typeface.
- **Do** convey depth with the neutral ramp first (black → subtle → secondary → elevated slate); add shadow only for floating surfaces.
- **Do** keep controls at 6px radius and pills/avatars full-round; honor 44–48px touch targets for one-handed field use.
- **Do** lead each screen with the current incident state and one obvious next action.

### Don't:
- **Don't** ship a **generic SaaS dashboard**: no gradient-accent hero metrics, no `background-clip: text` gradient text, no identical decorative card grids.
- **Don't** drift into **cluttered legacy enterprise**: no dense gray walls of controls or tiny low-contrast metadata.
- **Don't** add **overstyled flash**: no glassmorphism, no neon, no heavy or bouncy motion that distracts during an incident.
- **Don't** use a `border-left`/`border-right` colored side-stripe on cards, rows, or alerts — use full hairline borders and status pills instead.
- **Don't** spend status color decoratively (a green "submit" button reads as an active incident).
- **Don't** let muted text (#a1a1aa) carry body copy where it drops below 4.5:1 — bump toward Ink (#fafafa).
