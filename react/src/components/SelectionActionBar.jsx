/**
 * Contextual action bar — REPLACES the chat header while selection mode is on.
 *
 * Layout: [×] "N selected" ......... [Forward] [Copy] [Save] [Delete]
 * Disabled actions stay in place, greyed, so the bar never reflows as the
 * selection changes type.
 */
import React from 'react'
import { IcoClose, IcoCopy, IcoForward, IcoSave, IcoTrash } from './icons.jsx'
import { partialHint } from '../chat/selection.js'

const ACTIONS = [
  { id: 'forward', label: 'Forward', Icon: IcoForward },
  { id: 'copy', label: 'Copy', Icon: IcoCopy },
  { id: 'save', label: 'Save', Icon: IcoSave },
  { id: 'delete', label: 'Delete', Icon: IcoTrash, tone: 'bad' },
]

export default function SelectionActionBar({ title, count, selected, actions, onExit, onAction }) {
  return (
    <header className="sel-bar" role="toolbar" aria-label={title}>
      <button type="button" className="icon-btn" onClick={onExit} aria-label="Exit selection mode">
        <IcoClose size={22} />
      </button>

      <span className="sel-bar__count" aria-live="polite">
        {title}
      </span>

      <div className="sel-bar__actions">
        {ACTIONS.map(({ id, label, Icon, tone }) => {
          const state = actions[id]
          const hint = partialHint(selected, id)
          return (
            <button
              key={id}
              type="button"
              className="icon-btn"
              data-tone={tone}
              disabled={!state.enabled}
              aria-disabled={!state.enabled}
              onClick={() => onAction(id)}
              title={state.enabled ? hint || label : state.reason}
              aria-label={
                state.enabled ? `${label} ${count} selected${hint ? ` — ${hint}` : ''}` : `${label} — ${state.reason}`
              }
            >
              <Icon size={22} />
            </button>
          )
        })}
      </div>
    </header>
  )
}
