/**
 * Persistent PTT / PTV bar (Talk Group Bar, 64dp).
 *
 * INVARIANT 10: selection mode never gates audio. This bar stays mounted, live
 * and interactive through the whole selection flow; when a transmission is live
 * its banner renders ABOVE the contextual action bar and the bar collapses to
 * 32dp — exactly as it does under an SOS banner.
 */
import React from 'react'
import { IcoMic } from './icons.jsx'

export function LiveBanner({ live }) {
  if (!live) return null
  return (
    <div className="live-banner" data-tier={live.tier} role="status">
      <span className="live-banner__dot" aria-hidden="true" />
      <span>
        {live.label} · {live.detail}
      </span>
    </div>
  )
}

export default function TalkBar({ group, live, onPttDown, onPttUp }) {
  return (
    <div className="talk-bar" data-collapsed={live ? 'true' : 'false'}>
      <span className="talk-bar__meta">
        <b>{group.name}</b>
        <em>{group.status}</em>
      </span>
      <button
        type="button"
        className="ptt"
        data-live={live ? 'true' : 'false'}
        aria-label="Push to talk"
        onPointerDown={onPttDown}
        onPointerUp={onPttUp}
        onPointerLeave={onPttUp}
      >
        <IcoMic size={26} />
      </button>
    </div>
  )
}
