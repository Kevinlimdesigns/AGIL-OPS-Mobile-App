/**
 * Chat detail — hosts normal mode and multi-select mode.
 *
 * Whole-screen state machine:
 *   normal     header + thread + composer + talk bar + tab bar
 *   selection  contextual action bar (replaces header) + thread with checkboxes
 *              + NO composer + talk bar (still live) + tab bar
 */
import React, { useCallback, useState } from 'react'

import ChatHeader from '../components/ChatHeader.jsx'
import Composer from '../components/Composer.jsx'
import DeleteFork from '../components/DeleteFork.jsx'
import ForwardPicker from '../components/ForwardPicker.jsx'
import MessageRow from '../components/MessageRow.jsx'
import OptionContextMenu from '../components/OptionContextMenu.jsx'
import SelectionActionBar from '../components/SelectionActionBar.jsx'
import TabBar from '../components/TabBar.jsx'
import TalkBar, { LiveBanner } from '../components/TalkBar.jsx'
import Toast from '../components/Toast.jsx'

import { channel, forwardTargets, seedMessages, talkGroup } from '../data/messages.js'
import { useSelectionMode } from './useSelectionMode.js'
import { applyDelete, buildCopyPayload, buildForwardPayload, mediaToSave } from './selection.js'

export default function ChatThread() {
  const [messages, setMessages] = useState(seedMessages)
  const [menuFor, setMenuFor] = useState(null)
  const [forwardOpen, setForwardOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [live, setLive] = useState(null)

  const sel = useSelectionMode(messages)

  const flash = useCallback((text, tone) => {
    setToast({ text, tone })
    setTimeout(() => setToast(null), 2600)
  }, [])

  /* ------------------------------------------------ enter the mode */
  const handleMenuPick = (action, message) => {
    setMenuFor(null)
    if (action === 'select') {
      /* The long-pressed message becomes the first selected item. */
      sel.enter(message)
      return
    }
    if (action === 'forward') {
      sel.enter(message)
      setForwardOpen(true)
      return
    }
    if (action === 'delete') {
      sel.enter(message)
      setDeleteOpen(true)
      return
    }
    flash(`${action[0].toUpperCase()}${action.slice(1)} — not wired in this prototype`)
  }

  /* ------------------------------------------------ bulk actions */
  const runAction = (id) => {
    if (id === 'forward') return setForwardOpen(true)
    if (id === 'delete') return setDeleteOpen(true)

    if (id === 'copy') {
      const payload = buildCopyPayload(sel.selected)
      navigator.clipboard?.writeText(payload).catch(() => {})
      const n = payload ? payload.split('\n').length : 0
      flash(`Copied ${n} text ${n === 1 ? 'message' : 'messages'}`)
      sel.exit()
      return
    }

    if (id === 'save') {
      const media = mediaToSave(sel.selected)
      /* Device permission is requested here in the native build. */
      flash(`Saved ${media.length} ${media.length === 1 ? 'item' : 'items'} to device`)
      sel.exit()
    }
  }

  const handleForward = (target) => {
    /* Single target only — the picker returns one row, never a list. */
    const payload = buildForwardPayload(sel.selected, target)
    setForwardOpen(false)
    flash(
      `Forwarded ${payload.messageIds.length} ${
        payload.messageIds.length === 1 ? 'message' : 'messages'
      } to ${target.name}`,
    )
    sel.exit()
  }

  const handleDelete = (scope) => {
    const n = sel.count
    setMessages((prev) => applyDelete(prev, sel.selectedIds, scope))
    setDeleteOpen(false)
    flash(
      `${n} ${n === 1 ? 'message' : 'messages'} deleted ${scope === 'everyone' ? 'for everyone' : 'for me'}`,
      'bad',
    )
    sel.exit()
  }

  /* Back exits selection mode before it leaves the thread. */
  const handleBack = () => {
    if (forwardOpen) return setForwardOpen(false)
    if (deleteOpen) return setDeleteOpen(false)
    if (sel.active) return sel.exit()
  }

  return (
    <div className="phone" data-mode={sel.active ? 'selection' : 'normal'}>
      {/* Live PTT/PTV banner sits above the action bar — audio is never gated. */}
      <LiveBanner live={live} />

      {sel.active ? (
        <SelectionActionBar
          title={sel.title}
          count={sel.count}
          selected={sel.selected}
          actions={sel.actions}
          onExit={sel.exit}
          onAction={runAction}
        />
      ) : (
        <ChatHeader channel={channel} />
      )}

      <main className="thread" aria-label="Messages">
        {messages.map((m) => (
          <MessageRow
            key={m.id}
            message={m}
            selectionMode={sel.active}
            selected={sel.isSelected(m.id)}
            onToggle={sel.toggle}
            onLongPress={setMenuFor}
          />
        ))}
      </main>

      {/* Composer is suppressed for the whole of selection mode. */}
      {!sel.active && <Composer />}

      <TalkBar
        group={talkGroup}
        live={live}
        onPttDown={() => setLive({ tier: 'good', label: 'Transmitting', detail: talkGroup.name })}
        onPttUp={() => setLive(null)}
      />
      <TabBar active="Chat" />

      <OptionContextMenu
        message={menuFor}
        onPick={handleMenuPick}
        onDismiss={() => setMenuFor(null)}
      />
      <ForwardPicker
        open={forwardOpen}
        messageCount={sel.count}
        targets={forwardTargets}
        onForward={handleForward}
        onDismiss={() => setForwardOpen(false)}
      />
      <DeleteFork
        open={deleteOpen}
        count={sel.count}
        canDeleteForEveryone={sel.selected.every((m) => m.isMe)}
        onConfirm={handleDelete}
        onDismiss={() => setDeleteOpen(false)}
      />
      <Toast toast={toast} />

      <button type="button" className="a11y-back" onClick={handleBack}>
        Back
      </button>
    </div>
  )
}
