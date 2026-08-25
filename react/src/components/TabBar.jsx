/** Figma: Tab bar (52:1173) / Nav / Tab Item (68:1219). 80dp. */
import React from 'react'

const TABS = ['Chat', 'Incidents', 'Comms', 'Map', 'Resources']

export default function TabBar({ active = 'Chat' }) {
  return (
    <nav className="tab-bar" aria-label="Primary">
      {TABS.map((t) => (
        <button key={t} type="button" data-active={t === active} data-center={t === 'Comms'}>
          <span className="tab-bar__glyph" aria-hidden="true" />
          <span className="tab-bar__label">{t}</span>
        </button>
      ))}
    </nav>
  )
}
