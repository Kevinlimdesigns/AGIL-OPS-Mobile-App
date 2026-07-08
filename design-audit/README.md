# Figma Component Watch — AGIL Mobile

A **read-only** AI agent that audits the Figma "Mobile Component" section every
weekday at 4pm and reports what's **new**, what's **duplicated**, what needs
**flagging**, and **what could change** — measured against the **AOH UI/ShadCN**
design system. It never edits the Figma file.

## What it produces each run
- A dated report at `reports/<YYYY-MM-DD>.md` (committed to the repo) and a short
  summary in the chat session.
- An updated `baseline/inventory.json` so the next run can detect what's new/removed.

## Files
| File | Purpose |
|------|---------|
| `config.json` | Figma file key, watched node, AOH library key, schedule, mobile/M3 refs. |
| `AUDIT_PROMPT.md` | The exact instructions the scheduled session runs. |
| `mobile-rules.md` | M3-benchmarked thresholds mobile components are checked against (touch targets, spacing, type, safe zones, grid, radius, states). One system (AOH); M3 is the ruler only. |
| `baseline/inventory.json` | Last known component snapshot (diff source). |
| `reports/_TEMPLATE.md` | Report layout. |
| `reports/<date>.md` | One report per run. |

## How to turn on the 4pm weekday schedule (Claude Code web)
The scheduling is set up **once** in the Claude Code web UI — this repo holds
everything the run needs.

1. Go to **claude.ai/code** → open this repo / environment
   (`kevinlimdesigns/agil-ops-mobile-app`).
2. Create a **Scheduled session** (recurring trigger) with:
   - **Cadence:** Weekdays, **16:00** your local time (Mon–Fri). Cron equivalent:
     `3 16 * * 1-5` (a minute off the hour on purpose).
   - **Branch:** `claude/intelligent-lovelace-wnqhrw`
   - **Prompt:** `Run the audit in design-audit/AUDIT_PROMPT.md`
3. Make sure the session has the **Figma MCP** connected (same Figma account that
   can open the file) and **GitHub** write access to this repo so it can commit
   the report.

That's it — each weekday at 4pm a fresh session wakes, runs the prompt, commits
the report, and summarizes in chat.

> **Why not an in-chat timer?** A chat session's container is ephemeral and the
> in-session scheduler expires; only a scheduled web session (or a CI cron) gives
> you durable weekday-after-weekday runs.

## Guardrails
- **Read-only on Figma.** No edits, ever. Output is advisory.
- Writes only under `design-audit/`. Never opens a PR on its own.
- Every finding cites a Figma node id as evidence; unverifiable items are marked
  "needs verification".
