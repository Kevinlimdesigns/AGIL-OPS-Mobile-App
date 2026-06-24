# Product

## Register

product

## Users

Mixed roles across the operations chain, sharing one app with role-appropriate
views:

- **Field / on-site staff** — responders and crews acting on incidents in the
  field, often on the go, one-handed, in variable lighting.
- **Operations control room** — operators and supervisors monitoring and
  dispatching during longer, focused sessions.
- **Managers / oversight** — periodic check-ins for status, approvals, and
  reporting.

Their shared context is time pressure: an incident is unfolding and the app has
to make the current state legible and the next action obvious.

## Product Purpose

The AGIL Ops mobile app is the operational surface for **monitoring and
responding to incidents**. It exists to give every role a fast, trustworthy read
on what's happening right now and to move an incident from detection to
resolution without friction. Success looks like: an operator grasps the
situation at a glance, the right person is dispatched quickly, and status stays
accurate as the incident evolves — under stress, on a phone, with no time to
hunt for information.

## Brand Personality

**Sharp & high-signal.** Fast, dense, control-room energy. Status and severity
carry meaning through color and hierarchy, not decoration. Voice is direct and
unembellished — every label, number, and state earns its place. The interface
should feel like instrumentation: precise, scannable, and calm because it is
clear, not because it is sparse.

Three words: **precise, urgent-ready, trustworthy.**

## Anti-references

- **Generic SaaS dashboard** — no gradient-accent hero metrics, no
  identical-card grids, no decorative chrome that reads as template/AI slop.
- **Cluttered legacy enterprise** — no dense gray walls of controls that are
  hard to scan under pressure.
- **Overstyled / flashy** — no heavy animation, glassmorphism, or neon that
  distracts during an incident. Motion and color are functional, never
  ornamental.

(A formal audit of the dashboard is planned; treat these as the standard to
hold the design to.)

## Design Principles

- **Situational awareness first** — the current state of an incident is the
  hero of every screen; everything else is secondary.
- **Status is the signal** — color, severity, and state communicate meaning
  consistently; never use status color decoratively.
- **One obvious next action** — under time pressure, the primary action on any
  screen should be unmistakable.
- **Legible under stress** — high contrast, generous touch targets, no reliance
  on memory or hidden affordances; built to be read fast on a phone.
- **Honest state** — show real, current data including loading, stale, and
  error states; never imply certainty the system doesn't have.

## Accessibility & Inclusion

Target **WCAG 2.1 AA**: body text ≥4.5:1 contrast (≥3:1 for large text),
touch targets sized for on-the-go one-handed use, full reduced-motion support,
and status never conveyed by color alone (pair with icon/label/shape) so it
holds for color-blind users and in poor lighting.
