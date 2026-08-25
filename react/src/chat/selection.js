/**
 * Multi-select mode — selection model.
 *
 * Pure, UI-free logic so the mixed-type enablement rules are testable and can be
 * ported 1:1 to Kotlin. Nothing here renders; ChatThread / SelectionActionBar
 * consume it.
 */

/** Bubble kinds that Save (to device) operates on. */
export const MEDIA_KINDS = Object.freeze(['image', 'video', 'audio', 'file'])
/** Bubble kinds that Copy operates on. */
export const TEXT_KINDS = Object.freeze(['text'])

/**
 * No cap on selection size for now.
 * NOTE (product): a cap may become necessary — bulk delete of a very large
 * selection is irreversible for-everyone, and Save writes N files to device.
 * If one is introduced, enforce it in `toggleSelection` and surface it as a
 * "Maximum N messages" hint on the action bar rather than silently dropping taps.
 */
export const MAX_SELECTION = null

/* ---------------------------------------------------------------- eligibility */

export const isSystem = (m) => m?.kind === 'system'
/** A deleted message renders as a tombstone ("This message was deleted"). */
export const isTombstone = (m) => Boolean(m?.deleted)
/** Not yet acknowledged by the server — nothing to forward, delete or save yet. */
export const isInFlight = (m) => m?.status === 'sending' || m?.status === 'failed'

/**
 * System messages, tombstones and in-flight (sending/failed) bubbles cannot be
 * selected. They render with no checkbox at all; if a checkbox slot is kept for
 * alignment it is rendered disabled and is not a tap target.
 */
export function isSelectable(m) {
  return Boolean(m) && !isSystem(m) && !isTombstone(m) && !isInFlight(m)
}

export const isTextItem = (m) => isSelectable(m) && TEXT_KINDS.includes(m.kind)
export const isMediaItem = (m) => isSelectable(m) && MEDIA_KINDS.includes(m.kind)

/* ------------------------------------------------------------------ selection */

/** Tap toggles. Ineligible bubbles are inert — the set comes back unchanged. */
export function toggleSelection(selectedIds, message) {
  if (!isSelectable(message)) return selectedIds
  const next = new Set(selectedIds)
  if (next.has(message.id)) next.delete(message.id)
  else {
    if (MAX_SELECTION != null && next.size >= MAX_SELECTION) return selectedIds
    next.add(message.id)
  }
  return next
}

/** Selected messages, always in thread order — Copy and Forward depend on it. */
export function selectedInOrder(messages, selectedIds) {
  return messages.filter((m) => selectedIds.has(m.id) && isSelectable(m))
}

export function summarize(selected) {
  return {
    count: selected.length,
    textCount: selected.filter(isTextItem).length,
    mediaCount: selected.filter(isMediaItem).length,
  }
}

/* ---------------------------------------------------- mixed-type enablement */

/**
 * Which bulk actions the contextual action bar offers for the current selection.
 *
 *   Forward — any type, any count. Multi-message, SINGLE target (invariant 12).
 *   Delete  — any type, any count. Forks for-me / for-everyone across all N.
 *   Copy    — enabled when >= 1 text item is selected; copies the text items only.
 *   Save    — enabled when >= 1 media item is selected; saves the media items only.
 *
 * Disabled actions stay in the bar, greyed — never hidden, so the bar does not
 * reflow as the selection changes.
 */
export function actionState(selected) {
  const { count, textCount, mediaCount } = summarize(selected)
  const any = count > 0
  return {
    forward: {
      enabled: any,
      reason: any ? null : 'Select at least one message',
    },
    copy: {
      enabled: textCount > 0,
      appliesTo: textCount,
      reason: textCount > 0 ? null : 'No text messages selected',
    },
    save: {
      enabled: mediaCount > 0,
      appliesTo: mediaCount,
      reason: mediaCount > 0 ? null : 'No media selected',
    },
    delete: {
      enabled: any,
      reason: any ? null : 'Select at least one message',
    },
  }
}

/**
 * When a mixed selection is acted on, the action bar says what will actually be
 * touched ("Copies 2 of 5") so a partial operation is never a surprise.
 */
export function partialHint(selected, action) {
  const { count } = summarize(selected)
  const state = actionState(selected)[action]
  if (!state?.enabled || state.appliesTo == null) return null
  if (state.appliesTo === count) return null
  const verb = action === 'copy' ? 'Copies' : 'Saves'
  return `${verb} ${state.appliesTo} of ${count}`
}

/* -------------------------------------------------------------------- actions */

/** Copy: text items only, concatenated in thread order. */
export function buildCopyPayload(selected) {
  return selected.filter(isTextItem).map((m) => m.text).join('\n')
}

/** Save: media items only. Device permission is requested by the caller. */
export function mediaToSave(selected) {
  return selected.filter(isMediaItem)
}

/**
 * Forward: N messages -> exactly ONE target (invariant 12). The picker is opened
 * in single-select mode; passing more than one target is a programming error.
 */
export function buildForwardPayload(selected, target) {
  if (!target) throw new Error('Forward requires a target')
  if (Array.isArray(target)) throw new Error('Forward is single-target only (invariant 12)')
  return { targetId: target.id, messageIds: selected.map((m) => m.id) }
}

/** Confirmation copy always names the count. Destructive => bad-outcome styling. */
export function deleteConfirmText(count, scope) {
  const noun = count === 1 ? 'message' : 'messages'
  return scope === 'everyone'
    ? `Delete ${count} ${noun} for everyone?`
    : `Delete ${count} ${noun} for me?`
}

/**
 * Delete: applies the existing for-me / for-everyone fork to all N selected,
 * producing N tombstones in place (the thread keeps its shape).
 */
export function applyDelete(messages, selectedIds, scope) {
  return messages.map((m) => {
    if (!selectedIds.has(m.id) || !isSelectable(m)) return m
    return { ...m, deleted: true, deletedFor: scope, text: null, attachment: null }
  })
}

/** "3 selected" — the contextual action bar title. */
export function selectionTitle(count) {
  return `${count} selected`
}
