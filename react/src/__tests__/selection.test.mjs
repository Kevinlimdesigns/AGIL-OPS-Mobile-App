import test from 'node:test'
import assert from 'node:assert/strict'

import {
  actionState,
  applyDelete,
  buildCopyPayload,
  buildForwardPayload,
  deleteConfirmText,
  isSelectable,
  mediaToSave,
  partialHint,
  selectedInOrder,
  selectionTitle,
  toggleSelection,
} from '../chat/selection.js'

const text = (id, t) => ({ id, kind: 'text', text: t, status: 'read' })
const image = (id) => ({ id, kind: 'image', status: 'read' })
const audio = (id) => ({ id, kind: 'audio', status: 'read' })
const file = (id) => ({ id, kind: 'file', status: 'read' })

const thread = [
  { id: 's1', kind: 'system', text: 'Dispatch assigned Sasha' },
  text('t1', 'first'),
  image('i1'),
  text('t2', 'second'),
  { id: 'd1', kind: 'text', text: 'gone', deleted: true },
  { id: 'p1', kind: 'text', text: 'pending', status: 'sending' },
  { id: 'f1', kind: 'text', text: 'nope', status: 'failed' },
  audio('a1'),
  file('fl1'),
]

const pick = (...ids) => selectedInOrder(thread, new Set(ids))

test('system messages, tombstones and in-flight bubbles are unselectable', () => {
  assert.equal(isSelectable(thread[0]), false, 'system')
  assert.equal(isSelectable(thread.find((m) => m.id === 'd1')), false, 'tombstone')
  assert.equal(isSelectable(thread.find((m) => m.id === 'p1')), false, 'sending')
  assert.equal(isSelectable(thread.find((m) => m.id === 'f1')), false, 'failed')
  assert.equal(isSelectable(thread[1]), true)
})

test('tap toggles selection; ineligible taps are inert', () => {
  let sel = new Set()
  sel = toggleSelection(sel, thread[1])
  assert.deepEqual([...sel], ['t1'])
  sel = toggleSelection(sel, thread[1])
  assert.deepEqual([...sel], [])

  const before = new Set(['t1'])
  assert.equal(toggleSelection(before, thread[0]), before, 'system tap changes nothing')
  assert.equal(toggleSelection(before, thread.find((m) => m.id === 'p1')), before, 'in-flight inert')
})

test('selection is always returned in thread order', () => {
  assert.deepEqual(pick('t2', 'i1', 't1').map((m) => m.id), ['t1', 'i1', 't2'])
})

test('count bar title names the count', () => {
  assert.equal(selectionTitle(3), '3 selected')
})

test('all-text selection: Copy on, Save greyed', () => {
  const a = actionState(pick('t1', 't2'))
  assert.equal(a.copy.enabled, true)
  assert.equal(a.copy.appliesTo, 2)
  assert.equal(a.save.enabled, false)
  assert.equal(a.save.reason, 'No media selected')
  assert.equal(a.forward.enabled, true)
  assert.equal(a.delete.enabled, true)
})

test('all-media selection: Save on, Copy greyed', () => {
  const a = actionState(pick('i1', 'a1', 'fl1'))
  assert.equal(a.save.enabled, true)
  assert.equal(a.save.appliesTo, 3)
  assert.equal(a.copy.enabled, false)
  assert.equal(a.copy.reason, 'No text messages selected')
  assert.equal(a.forward.enabled, true)
  assert.equal(a.delete.enabled, true)
})

test('mixed selection: both enabled, each scoped to its own items', () => {
  const selected = pick('t1', 'i1', 't2', 'a1')
  const a = actionState(selected)
  assert.equal(a.copy.enabled, true)
  assert.equal(a.copy.appliesTo, 2)
  assert.equal(a.save.enabled, true)
  assert.equal(a.save.appliesTo, 2)
  assert.equal(partialHint(selected, 'copy'), 'Copies 2 of 4')
  assert.equal(partialHint(selected, 'save'), 'Saves 2 of 4')
})

test('empty selection greys everything', () => {
  const a = actionState([])
  for (const k of ['forward', 'copy', 'save', 'delete']) assert.equal(a[k].enabled, false, k)
})

test('Copy concatenates text items only, in thread order', () => {
  assert.equal(buildCopyPayload(pick('t2', 'i1', 't1')), 'first\nsecond')
})

test('Save collects media items only', () => {
  assert.deepEqual(mediaToSave(pick('t1', 'i1', 'a1', 'fl1')).map((m) => m.id), ['i1', 'a1', 'fl1'])
})

test('Forward is multi-message, single-target (invariant 12)', () => {
  const payload = buildForwardPayload(pick('t1', 'i1', 't2'), { id: 'ch-9' })
  assert.deepEqual(payload, { targetId: 'ch-9', messageIds: ['t1', 'i1', 't2'] })
  assert.throws(() => buildForwardPayload(pick('t1'), [{ id: 'a' }, { id: 'b' }]), /single-target/)
  assert.throws(() => buildForwardPayload(pick('t1'), null), /requires a target/)
})

test('Delete confirmation names the count and the fork', () => {
  assert.equal(deleteConfirmText(3, 'everyone'), 'Delete 3 messages for everyone?')
  assert.equal(deleteConfirmText(1, 'everyone'), 'Delete 1 message for everyone?')
  assert.equal(deleteConfirmText(3, 'me'), 'Delete 3 messages for me?')
})

test('Delete produces N tombstones and leaves the rest of the thread intact', () => {
  const ids = new Set(['t1', 'i1', 't2'])
  const after = applyDelete(thread, ids, 'everyone')
  const tombstoned = after.filter((m) => ids.has(m.id))
  assert.equal(tombstoned.length, 3)
  for (const m of tombstoned) {
    assert.equal(m.deleted, true)
    assert.equal(m.deletedFor, 'everyone')
    assert.equal(m.text, null)
  }
  assert.equal(after.length, thread.length)
  assert.equal(after.find((m) => m.id === 'a1').deleted, undefined)
})

test('Delete never tombstones an unselectable message even if its id leaks in', () => {
  const after = applyDelete(thread, new Set(['s1', 'p1']), 'everyone')
  assert.equal(after.find((m) => m.id === 's1').deleted, undefined)
  assert.equal(after.find((m) => m.id === 'p1').deleted, undefined)
})
