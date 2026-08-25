/** Figma: Chat Header (2723:28132). Replaced by SelectionActionBar in selection mode. */
import React from 'react'
import { IcoBack, IcoMic, IcoSearch } from './icons.jsx'

export default function ChatHeader({ channel }) {
  return (
    <header className="chat-head">
      <button type="button" className="icon-btn" aria-label="Back">
        <IcoBack size={22} />
      </button>
      <span className="avatar" style={{ background: channel.tone }}>
        {channel.initials}
      </span>
      <span className="chat-head__meta">
        <b>{channel.name}</b>
        <em>{channel.presence}</em>
      </span>
      <button type="button" className="icon-btn" aria-label="Push to talk to this channel">
        <IcoMic size={22} />
      </button>
      <button type="button" className="icon-btn" aria-label="Search in conversation">
        <IcoSearch size={22} />
      </button>
    </header>
  )
}
