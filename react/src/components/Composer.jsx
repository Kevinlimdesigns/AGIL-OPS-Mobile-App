/** Figma: Chat / Input Bar (131:133). Suppressed entirely while selection mode is on. */
import React from 'react'
import { IcoMic, IcoPlus, IcoSend } from './icons.jsx'

export default function Composer() {
  return (
    <div className="composer">
      <button type="button" className="icon-btn" aria-label="Attach">
        <IcoPlus size={22} />
      </button>
      <input placeholder="Message #1042 Warehouse fire" aria-label="Message" />
      <button type="button" className="icon-btn" aria-label="Record voice note">
        <IcoMic size={22} />
      </button>
      <button type="button" className="icon-btn icon-btn--send" aria-label="Send">
        <IcoSend size={22} />
      </button>
    </div>
  )
}
