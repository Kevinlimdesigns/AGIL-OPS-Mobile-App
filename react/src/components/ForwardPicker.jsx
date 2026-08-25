/**
 * Forward picker — existing sheet, reused as-is.
 *
 * INVARIANT 12: single target. The picker never accumulates targets; picking a
 * row forwards the whole payload to that one destination. Multi-message is a
 * property of the payload, not of the picker.
 */
import React, { useState } from 'react'
import { IcoClose, IcoSearch } from './icons.jsx'

export default function ForwardPicker({ open, messageCount, targets, onForward, onDismiss }) {
  const [query, setQuery] = useState('')
  if (!open) return null

  const rows = targets.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()))
  const noun = messageCount === 1 ? 'message' : 'messages'

  return (
    <div className="scrim scrim--bottom" onClick={onDismiss} role="presentation">
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label={`Forward ${messageCount} ${noun}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="sheet__head">
          <button type="button" className="icon-btn" onClick={onDismiss} aria-label="Close">
            <IcoClose size={22} />
          </button>
          <div>
            <h2>Forward</h2>
            <p>
              {messageCount} {noun} · choose one destination
            </p>
          </div>
        </header>

        <label className="search">
          <IcoSearch size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search channels and people"
          />
        </label>

        <ul className="picker-list">
          {rows.map((t) => (
            <li key={t.id}>
              {/* Single-target: this is a button, not a checkbox. */}
              <button type="button" className="picker-row" onClick={() => onForward(t)}>
                <span className="avatar" style={{ background: t.tone }}>
                  {t.initials}
                </span>
                <span className="picker-row__meta">
                  <b>{t.name}</b>
                  <em>{t.sub}</em>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
