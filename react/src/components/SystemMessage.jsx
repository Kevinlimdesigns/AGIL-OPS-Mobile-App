/** Figma: Chat / System Message (129:124). Never selectable. */
import React from 'react'

export default function SystemMessage({ message }) {
  return (
    <div className="system-msg" role="note">
      <span>{message.text}</span>
    </div>
  )
}
