/**
 * WS4 — consolidated chat bubble.
 *
 * One bubble component for every kind (text / image / video / audio / file /
 * location), plus the tombstone and in-flight renderings. Selection mode wraps
 * this component; it does not modify or re-implement it.
 *
 * Figma: Chat / Bubble (129:142), Chat / Bubbles (185:4365),
 *        Chat / Video Bubble (3365:58368), Chat/ File/File Bubble (171:3),
 *        Chat / Location Bubble (3917:5922).
 */
import React from 'react'
import { IcoAlert, IcoCheck, IcoFile, IcoImage, IcoPlay, IcoVideo } from './icons.jsx'

function Receipt({ status }) {
  if (status === 'sending') return <span className="bubble__receipt is-pending">Sending…</span>
  if (status === 'failed')
    return (
      <span className="bubble__receipt is-failed">
        <IcoAlert size={12} /> Failed
      </span>
    )
  if (status === 'read')
    return (
      <span className="bubble__receipt is-read">
        <IcoCheck size={12} />
        <IcoCheck size={12} />
      </span>
    )
  return (
    <span className="bubble__receipt">
      <IcoCheck size={12} />
    </span>
  )
}

function Body({ message }) {
  switch (message.kind) {
    case 'image':
      return (
        <div className="bubble__media">
          <div className="bubble__thumb" style={{ background: message.tone }}>
            <IcoImage size={26} />
          </div>
          {message.caption && <p className="bubble__caption">{message.caption}</p>}
        </div>
      )
    case 'video':
      return (
        <div className="bubble__media">
          <div className="bubble__thumb" style={{ background: message.tone }}>
            <IcoVideo size={26} />
            <span className="bubble__duration">{message.duration}</span>
          </div>
          {message.caption && <p className="bubble__caption">{message.caption}</p>}
        </div>
      )
    case 'audio':
      return (
        <div className="bubble__audio">
          <span className="bubble__audio-play">
            <IcoPlay size={16} />
          </span>
          <span className="bubble__wave" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, i) => (
              <i key={i} style={{ height: `${6 + ((i * 7) % 14)}px` }} />
            ))}
          </span>
          <span className="bubble__duration">{message.duration}</span>
        </div>
      )
    case 'file':
      return (
        <div className="bubble__file">
          <span className="bubble__file-icon">
            <IcoFile size={20} />
          </span>
          <span className="bubble__file-meta">
            <b>{message.fileName}</b>
            <em>{message.fileSize}</em>
          </span>
        </div>
      )
    default:
      return <p className="bubble__text">{message.text}</p>
  }
}

export default function MessageBubble({ message, inert = false }) {
  const mine = Boolean(message.isMe)

  if (message.deleted) {
    return (
      <div className="bubble bubble--tombstone" data-side={mine ? 'out' : 'in'}>
        <p className="bubble__text">This message was deleted</p>
        <span className="bubble__time">{message.time}</span>
      </div>
    )
  }

  return (
    <div
      className="bubble"
      data-side={mine ? 'out' : 'in'}
      data-kind={message.kind}
      data-status={message.status}
      /* In selection mode the bubble stops handling its own taps — the row owns
         them — but it renders exactly as it always does. */
      style={inert ? { pointerEvents: 'none' } : undefined}
    >
      {!mine && message.sender && (
        <span className="bubble__sender" style={{ color: message.senderColor }}>
          {message.sender}
        </span>
      )}
      <Body message={message} />
      <span className="bubble__meta">
        <span className="bubble__time">{message.time}</span>
        {mine && <Receipt status={message.status} />}
      </span>
    </div>
  )
}
