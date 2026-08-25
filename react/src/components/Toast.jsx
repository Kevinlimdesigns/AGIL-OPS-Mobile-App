import React from 'react'

export default function Toast({ toast }) {
  if (!toast) return null
  return (
    <div className="toast" data-tone={toast.tone || 'neutral'} role="status">
      {toast.text}
    </div>
  )
}
