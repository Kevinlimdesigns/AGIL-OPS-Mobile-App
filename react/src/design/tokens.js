/**
 * Design tokens — mirrored from DESIGN.md (the single source of truth).
 * Components must never hard-code hex; they read these tokens (as CSS vars).
 *
 * PROTECTED VALUES — do not change, ever:
 *   --color-chat-bubble-out  #1f4a55   outbound chat bubble fill
 *   --color-ptt-live         #CCFF00   PTT/PTV live-transmit accent
 */

export const PROTECTED = Object.freeze({
  chatBubbleOut: '#1f4a55',
  pttLive: '#CCFF00',
})

/** Dark is the shipping default; light ships alongside it (responders work in varied lighting). */
export const dark = {
  'color-bg': '#09090b',
  'color-bg-subtle': '#18181b',
  'color-bg-secondary': '#27272a',
  'color-bg-elevated': '#1e293b',
  'color-border': '#27272a',
  'color-text': '#fafafa',
  'color-text-muted': '#a1a1aa',
  'color-text-placeholder': '#71717a',
  'color-text-on-color': '#030712',
  'color-primary': '#0ea5e9',
  'color-interactive': '#38bdf8',
  'color-text-success': '#6ee7b7',
  'color-text-warning': '#fde047',
  'color-text-error': '#f87171',
  'color-text-info': '#60a5fa',
  'color-bg-error-muted': '#450a0a',
  'color-bg-warning-muted': '#422006',
  'color-bg-info-muted': '#172554',
  'color-comms-bar-surface': '#15263d',
  'color-comms-avatar-surface': '#2a3f5c',
  'color-chat-bubble-out': PROTECTED.chatBubbleOut,
  'color-chat-bubble-in': '#27272a',
  'color-chat-receipt': '#7dd3fc',
  'color-ptt-live': PROTECTED.pttLive,
  /* Selection surfaces — blue is the reserved selection voice (CLAUDE.md). */
  'color-selected-row': 'rgba(14, 165, 233, 0.14)',
  'color-selected-row-pressed': 'rgba(14, 165, 233, 0.22)',
  'color-scrim': 'rgba(3, 7, 18, 0.66)',
  'color-disabled-fg': '#52525b',
}

export const light = {
  ...dark,
  'color-bg': '#ffffff',
  'color-bg-subtle': '#f4f4f5',
  'color-bg-secondary': '#e4e4e7',
  'color-bg-elevated': '#ffffff',
  'color-border': '#d4d4d8',
  'color-text': '#09090b',
  'color-text-muted': '#52525b',
  'color-text-placeholder': '#71717a',
  'color-text-on-color': '#ffffff',
  'color-primary': '#0369a1',
  'color-interactive': '#0284c7',
  'color-text-success': '#047857',
  'color-text-warning': '#854d0e',
  'color-text-error': '#b91c1c',
  'color-text-info': '#1d4ed8',
  'color-bg-error-muted': '#fee2e2',
  'color-bg-warning-muted': '#fef3c7',
  'color-bg-info-muted': '#dbeafe',
  'color-chat-bubble-in': '#e4e4e7',
  'color-selected-row': 'rgba(3, 105, 161, 0.12)',
  'color-selected-row-pressed': 'rgba(3, 105, 161, 0.20)',
  'color-scrim': 'rgba(9, 9, 11, 0.44)',
  'color-disabled-fg': '#a1a1aa',
}

/** Geometry / ergonomics — benchmarked against Material 3, per CLAUDE.md. */
export const metrics = {
  'radius-sm': '4px',
  'radius-md': '6px',
  'radius-round': '9999px',
  'space-2xs': '4px',
  'space-sm': '8px',
  'space-md': '12px',
  'space-lg': '16px',
  'frame-w': '360px',
  'frame-h': '780px',
  'header-h': '56px',
  'talkbar-h': '64px',
  'talkbar-h-collapsed': '32px',
  'navbar-h': '80px',
  'tap-min': '48px',
  'tap-min-compact': '44px',
  'ptt-size': '64px',
}

export const font = {
  'font-family': 'Geist, system-ui, sans-serif',
  'text-title': '700 20px/32px var(--font-family)',
  'text-body': '400 16px/24px var(--font-family)',
  'text-body-medium': '500 16px/24px var(--font-family)',
  'text-label': '500 14px/20px var(--font-family)',
  'text-label-regular': '400 14px/20px var(--font-family)',
  'text-caption': '700 12px/16px var(--font-family)',
  'text-caption-light': '300 12px/16px var(--font-family)',
}

const toCss = (obj) =>
  Object.entries(obj)
    .map(([k, v]) => `  --${k}: ${v};`)
    .join('\n')

export const rootCss = `
:root[data-theme='dark'], :root {
${toCss(dark)}
}
:root[data-theme='light'] {
${toCss(light)}
}
:root {
${toCss(metrics)}
${toCss(font)}
}
`
