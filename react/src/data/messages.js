/** Seed thread for #1042 Warehouse fire — covers every bubble kind plus all
 *  three unselectable cases (system, tombstone, in-flight). */

export const channel = {
  id: 'ch-1042',
  name: '#1042 Warehouse fire',
  presence: '6 members · 4 online',
  initials: 'WF',
  tone: 'var(--color-comms-avatar-surface)',
}

export const talkGroup = { name: 'Fire Alpha', status: '3/3 online · Ready to talk' }

export const forwardTargets = [
  { id: 't1', name: '#1043 Tuas hazmat', sub: 'Incident channel · 9 members', initials: 'TH', tone: 'var(--color-comms-avatar-surface)' },
  { id: 't2', name: 'Sasha Coen', sub: 'Firefighter · SCDF 4th Div', initials: 'SC', tone: 'var(--color-comms-avatar-surface)' },
  { id: 't3', name: 'Dispatch HQ', sub: 'Command · always on', initials: 'HQ', tone: 'var(--color-comms-bar-surface)' },
  { id: 't4', name: 'Fire Alpha', sub: 'Talk group · 3 online', initials: 'FA', tone: 'var(--color-comms-avatar-surface)' },
  { id: 't5', name: 'Marcus Tan', sub: 'Paramedic · EMS 12', initials: 'MT', tone: 'var(--color-comms-avatar-surface)' },
]

export const seedMessages = [
  { id: 'm1', kind: 'system', text: 'Dispatch assigned Sasha Coen to this incident' },
  {
    id: 'm2', kind: 'text', sender: 'Dispatch HQ', senderColor: 'var(--color-text-info)',
    time: '08:14', status: 'read',
    text: 'Structure fire at 21 Tuas Ave 8. Two appliances en route, ETA 6 min.',
  },
  {
    id: 'm3', kind: 'text', sender: 'Marcus Tan', senderColor: 'var(--color-text-success)',
    time: '08:15', status: 'read',
    text: 'EMS 12 staging at the north gate. Triage point marked on the map.',
  },
  {
    id: 'm4', kind: 'image', sender: 'Marcus Tan', senderColor: 'var(--color-text-success)',
    time: '08:16', status: 'read', caption: 'Smoke from loading bay 3',
    tone: 'var(--color-bg-secondary)',
  },
  {
    id: 'm5', kind: 'text', isMe: true, time: '08:17', status: 'read',
    text: 'Copy. Entry through bay 3 is blocked — routing crew to the west stair.',
  },
  {
    id: 'm6', kind: 'audio', sender: 'Dispatch HQ', senderColor: 'var(--color-text-info)',
    time: '08:18', status: 'read', duration: '0:24',
    transcript: 'Water supply confirmed at hydrant H-14, west side.',
  },
  {
    id: 'm7', kind: 'file', sender: 'Dispatch HQ', senderColor: 'var(--color-text-info)',
    time: '08:19', status: 'read', fileName: 'tuas-ave-8-floorplan.pdf', fileSize: '2.4 MB',
  },
  { id: 'm8', kind: 'text', sender: 'Marcus Tan', senderColor: 'var(--color-text-success)', time: '08:20', status: 'read', text: 'Retracted — wrong hydrant.', deleted: true, deletedFor: 'everyone' },
  {
    id: 'm9', kind: 'video', isMe: true, time: '08:21', status: 'delivered',
    duration: '0:12', caption: 'West stair clear', tone: 'var(--color-bg-secondary)',
  },
  {
    id: 'm10', kind: 'text', isMe: true, time: '08:22', status: 'delivered',
    text: 'Crew 2 making entry now. Will confirm when the floor is clear.',
  },
  { id: 'm11', kind: 'system', text: 'Weak signal — messages will send when the link recovers' },
  { id: 'm12', kind: 'text', isMe: true, time: '08:23', status: 'sending', text: 'Second line charged.' },
  { id: 'm13', kind: 'text', isMe: true, time: '08:23', status: 'failed', text: 'Need a thermal drone over the roof.' },
]
