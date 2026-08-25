/**
 * Delete fork — existing for-me / for-everyone confirmation, reused as-is.
 * In multi-select the same fork applies to all N selected messages and the
 * headline names the count.
 */
import React from 'react'
import { deleteConfirmText } from '../chat/selection.js'

export default function DeleteFork({ open, count, canDeleteForEveryone, onConfirm, onDismiss }) {
  if (!open) return null
  const noun = count === 1 ? 'message' : 'messages'

  return (
    <div className="scrim scrim--bottom" onClick={onDismiss} role="presentation">
      <div
        className="sheet sheet--compact"
        role="alertdialog"
        aria-modal="true"
        aria-label={deleteConfirmText(count, canDeleteForEveryone ? 'everyone' : 'me')}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="sheet__title">
          Delete {count} {noun}?
        </h2>
        <p className="sheet__body">
          Deleting for everyone replaces {count === 1 ? 'it' : 'them'} with{' '}
          {count === 1 ? 'a tombstone' : `${count} tombstones`} in this thread. This cannot be
          undone.
        </p>

        <div className="fork">
          {canDeleteForEveryone && (
            <button
              type="button"
              className="btn btn--destructive"
              onClick={() => onConfirm('everyone')}
            >
              {deleteConfirmText(count, 'everyone').replace(/\?$/, '')}
            </button>
          )}
          <button type="button" className="btn btn--secondary" onClick={() => onConfirm('me')}>
            {deleteConfirmText(count, 'me').replace(/\?$/, '')}
          </button>
          <button type="button" className="btn btn--ghost" onClick={onDismiss}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
