/**
 * Selection layer around a bubble.
 *
 * Out of selection mode this is a transparent pass-through: the bubble renders
 * and behaves exactly as it always has, long-press opens the Option Context
 * menu. In selection mode the row grows a leading AOH `checkbox` instance and a
 * selected-row highlight, and a tap toggles instead of opening.
 */
import React, { useRef } from 'react'
import AohCheckbox from './AohCheckbox.jsx'
import MessageBubble from './MessageBubble.jsx'
import SystemMessage from './SystemMessage.jsx'
import { isSelectable } from '../chat/selection.js'

const LONG_PRESS_MS = 450

export default function MessageRow({
  message,
  selectionMode,
  selected,
  onToggle,
  onLongPress,
  onOpen,
}) {
  const timer = useRef(null)
  const fired = useRef(false)

  if (message.kind === 'system') {
    /* System messages are never selectable and carry no checkbox at all. */
    return <SystemMessage message={message} />
  }

  const selectable = isSelectable(message)

  const startPress = () => {
    if (selectionMode) return
    fired.current = false
    timer.current = setTimeout(() => {
      fired.current = true
      onLongPress(message)
    }, LONG_PRESS_MS)
  }
  const endPress = () => clearTimeout(timer.current)

  const handleClick = () => {
    if (fired.current) return
    if (selectionMode) {
      if (selectable) onToggle(message)
      return
    }
    onOpen?.(message)
  }

  const interactive = selectionMode ? selectable : true

  return (
    <div
      className="msg-row"
      data-side={message.isMe ? 'out' : 'in'}
      data-selection={selectionMode ? 'on' : 'off'}
      data-selected={selected ? 'true' : 'false'}
      data-selectable={selectable ? 'true' : 'false'}
      role={selectionMode ? 'checkbox' : undefined}
      aria-checked={selectionMode ? (selectable ? selected : undefined) : undefined}
      aria-disabled={selectionMode && !selectable ? 'true' : undefined}
      tabIndex={interactive ? 0 : -1}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      onPointerDown={startPress}
      onPointerUp={endPress}
      onPointerLeave={endPress}
      onPointerCancel={endPress}
      onContextMenu={(e) => {
        e.preventDefault()
        if (!selectionMode) onLongPress(message)
      }}
    >
      {selectionMode && (
        /* Leading edge, same position on every row regardless of bubble side.
           Unselectable rows show the component's Disabled variant and are inert. */
        <span className="msg-row__check">
          <AohCheckbox
            checked={selectable && selected}
            disabled={!selectable}
            label={`Select message from ${message.sender || 'you'} at ${message.time}`}
          />
        </span>
      )}

      <div className="msg-row__bubble">
        <MessageBubble message={message} inert={selectionMode} />
      </div>
    </div>
  )
}
