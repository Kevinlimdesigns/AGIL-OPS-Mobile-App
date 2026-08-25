import { useCallback, useMemo, useState } from 'react'
import {
  actionState,
  isSelectable,
  selectedInOrder,
  selectionTitle,
  toggleSelection,
} from './selection.js'

/**
 * Selection-mode state machine.
 *
 * Whole-screen state: while `active` the header is replaced by the contextual
 * action bar and the composer is suppressed. Exit deselects everything and
 * restores both.
 */
export function useSelectionMode(messages) {
  const [active, setActive] = useState(false)
  const [selectedIds, setSelectedIds] = useState(() => new Set())

  /** Entered from the Option Context menu's "Select" item (reserved 7th slot). */
  const enter = useCallback((seedMessage) => {
    if (!isSelectable(seedMessage)) return
    setActive(true)
    setSelectedIds(new Set([seedMessage.id]))
  }, [])

  /** Back / × — deselect all, restore header + composer. */
  const exit = useCallback(() => {
    setActive(false)
    setSelectedIds(new Set())
  }, [])

  const toggle = useCallback((message) => {
    setSelectedIds((prev) => toggleSelection(prev, message))
  }, [])

  const selected = useMemo(
    () => selectedInOrder(messages, selectedIds),
    [messages, selectedIds],
  )
  const actions = useMemo(() => actionState(selected), [selected])

  return {
    active,
    selectedIds,
    selected,
    count: selected.length,
    title: selectionTitle(selected.length),
    actions,
    enter,
    exit,
    toggle,
    isSelected: useCallback((id) => selectedIds.has(id), [selectedIds]),
  }
}
