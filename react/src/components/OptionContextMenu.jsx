/**
 * Option Context menu — long-press on a bubble.
 * Figma: Option Context menu (469:262) + Menu Item (3098:19, Kind=Default|Destructive).
 *
 * Six message actions plus the reserved 7th slot, "Select", which is the only
 * entry point into multi-select mode.
 */
import React from 'react'
import {
  IcoCopy, IcoForward, IcoInfo, IcoPin, IcoReply, IcoSelect, IcoStar, IcoTrash,
} from './icons.jsx'

export const MENU_ITEMS = [
  { id: 'reply', label: 'Reply', Icon: IcoReply },
  { id: 'forward', label: 'Forward', Icon: IcoForward },
  { id: 'copy', label: 'Copy', Icon: IcoCopy, textOnly: true },
  { id: 'pin', label: 'Pin', Icon: IcoPin },
  { id: 'star', label: 'Star', Icon: IcoStar },
  { id: 'info', label: 'Info', Icon: IcoInfo },
  /* 7th slot — enters multi-select mode with this message as the first item. */
  { id: 'select', label: 'Select', Icon: IcoSelect },
  { id: 'delete', label: 'Delete', Icon: IcoTrash, kind: 'destructive' },
]

export default function OptionContextMenu({ message, onPick, onDismiss }) {
  if (!message) return null
  return (
    <div className="scrim" onClick={onDismiss} role="presentation">
      <div
        className="ctx-menu"
        data-component="Option Context menu"
        role="menu"
        aria-label="Message options"
        onClick={(e) => e.stopPropagation()}
      >
        {MENU_ITEMS.map(({ id, label, Icon, kind, textOnly }) => {
          const disabled = textOnly && message.kind !== 'text'
          return (
            <button
              key={id}
              type="button"
              role="menuitem"
              className="menu-item"
              data-kind={kind === 'destructive' ? 'Destructive' : 'Default'}
              disabled={disabled}
              onClick={() => onPick(id, message)}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
