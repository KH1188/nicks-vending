import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { doc, getDoc, getDocs, collection, query, where, orderBy, addDoc, deleteDoc, updateDoc, serverTimestamp, Timestamp, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import type { Venue, Machine, Statement } from '../../hooks/useVenueData'
import { formatPeriod } from '../../hooks/useVenueData'
import type { VenueUser } from '../../hooks/useAdminData'

const MACHINE_MODELS = ['Slim Wall', 'Mega Wall', 'Slim Tower', 'Mini Wall', 'Slim Wall – Tin Lift', 'WeatherWall']
const INPUT = "w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-700"

function licenseStatus(expiry: string): 'valid' | 'expiring' | 'expired' | 'none' {
  if (!expiry) return 'none'
  const days = Math.floor((new Date(expiry).getTime() - Date.now()) / 86400000)
  if (days < 0)   return 'expired'
  if (days <= 60) return 'expiring'
  return 'valid'
}

const STATUS_BADGE: Record<string, string> = {
  valid:    'bg-green-100 text-green-700',
  expiring: 'bg-yellow-100 text-yellow-700',
  expired:  'bg-red-100 text-red-600',
  none:     'bg-slate-100 text-slate-400',
}
const STATUS_LABEL: Record<string, string> = {
  valid: 'Valid', expiring: 'Expiring Soon', expired: 'Expired', none: 'Not set',
}

export default function AdminVenueDetail() {
  const { venueId } = useParams<{ venueId: string }>()
  const navigate = useNavigate()
  const [venue,      setVenue]      = useState<Venue | null>(null)
  const [machines,   setMachines]   = useState<Machine[]>([])
  const [statements, setStatements] = useState<Statement[]>([])
  const [users,      setUsers]      = useState<VenueUser[]>([])
  const [loading,    setLoading]    = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [showMachineForm, setShowMachineForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showRemoveDialog, setShowRemoveDialog] = useState(false)
  const [removeConfirmText, setRemoveConfirmText] = useState('')
  const [removing, setRemoving] = useState(false)
  const [removingMachine, setRemovingMachine] = useState<string | null>(null)
  const [editingLicense, setEditingLicense] = useState<string | null>(null) // machineId being edited
  const [licenseForm, setLicenseForm] = useState({ operatorLicenseNumber: '', operatorLicenseExpiry: '', machineLicenseNumber: '', machineLicenseExpiry: '' })
  const [savingLicense, setSavingLicense] = useState(false)
  const [machineForm, setMachineForm] = useState({ model: 'Slim Wall', serialNumber: '', status: 'active', notes: '', placedAt: new Date().toISOString().split('T')[0] })
  const [removingStatement, setRemovingStatement] = useState<string | null>(null)
  const [assigningOwner, setAssigningOwner] = useState(false)
  const [selectedOwnerUid, setSelectedOwnerUid] = useState('')
  const [savingOwner, setSavingOwner] = useState(false)
  const [editingSlug, setEditingSlug] = useState(false)
  const [slugInput, setSlugInput] = useState('')
  const [savingSlug, setSavingSlug] = useState(false)
  const [editingContact, setEditingContact] = useState(false)
  const [contactForm, setContactForm] = useState({ contactName: '', contactPhone: '', commissionRate: '', shareType: 'revenue' as 'revenue' | 'profit' })
  const [savingContact, setSavingContact] = useState(false)
  const [editingRdp, setEditingRdp] = useState(false)
  const [rdpInput, setRdpInput] = useState('')
  const [savingRdp, setSavingRdp] = useState(false)
  const [editingRdpDates, setEditingRdpDates] = useState(false)
  const [rdpDatesForm, setRdpDatesForm] = useState({ parish: '', rdpIssueDate: '', rdpExpiryDate: '' })
  const [savingRdpDates, setSavingRdpDates] = useState(false)
  const [editingNotes, setEditingNotes] = useState(false)
  const [notesInput, setNotesInput] = useState('')
  const [savingNotes, setSavingNotes] = useState(false)

  useEffect(() => {
    if (!venueId) return
    async function fetch() {
      const [venueSnap, machinesSnap, statementsSnap, usersSnap] = await Promise.all([
        getDoc(doc(db, 'venues', venueId!)),
        getDocs(query(collection(db, 'machines'), where('venueId', '==', venueId))),
        getDocs(query(collection(db, 'statements'), where('venueId', '==', venueId), orderBy('uploadedAt', 'desc'))),
        getDocs(collection(db, 'users')),
      ])
      if (venueSnap.exists()) setVenue({ id: venueSnap.id, ...venueSnap.data() } as Venue)
      setMachines(machinesSnap.docs.map(d => ({ id: d.id, ...d.data(), placedAt: d.data().placedAt?.toDate() ?? new Date() } as Machine)))
      setStatements(statementsSnap.docs.map(d => ({ id: d.id, ...d.data(), uploadedAt: d.data().uploadedAt?.toDate() ?? new Date() } as Statement)))
      setUsers(usersSnap.docs
        .filter(d => d.data().role === 'venue_owner')
        .map(d => ({ id: d.id, uid: d.id, ...d.data(), createdAt: d.data().createdAt?.toDate() ?? new Date() } as VenueUser)))
      setLoading(false)
    }
    fetch().catch(err => {
      console.error('AdminVenueDetail fetch error:', err)
      setFetchError(err.message ?? 'Failed to load venue.')
      setLoading(false)
    })
  }, [venueId])

  const handleRemoveVenue = async () => {
    if (!venue || removeConfirmText !== venue.name) return
    setRemoving(true)
    // Cascade-delete all machines at this venue
    await Promise.all(machines.map(m => deleteDoc(doc(db, 'machines', m.id))))
    await deleteDoc(doc(db, 'venues', venueId!))
    navigate('/dashboard/admin/venues')
  }

  const handleRemoveMachine = async (machineId: string) => {
    await deleteDoc(doc(db, 'machines', machineId))
    setMachines(ms => ms.filter(m => m.id !== machineId))
    setRemovingMachine(null)
  }

  const handleSaveLicense = async (machineId: string) => {
    setSavingLicense(true)
    await updateDoc(doc(db, 'machines', machineId), licenseForm)
    setMachines(ms => ms.map(m => m.id === machineId ? { ...m, ...licenseForm } : m))
    setEditingLicense(null)
    setSavingLicense(false)
  }

  const handleAssignOwner = async (newUid: string) => {
    if (!venueId) return
    setSavingOwner(true)
    try {
      const oldUid = venue?.ownerUid ?? null
      // Remove this venue from the old owner's venueIds array
      if (oldUid && oldUid !== newUid) {
        await updateDoc(doc(db, 'users', oldUid), { venueIds: arrayRemove(venueId) })
      }
      // Add this venue to the new owner's venueIds array
      if (newUid) {
        await updateDoc(doc(db, 'users', newUid), { venueIds: arrayUnion(venueId) })
      }
      // Update venue's ownerUid
      await updateDoc(doc(db, 'venues', venueId), { ownerUid: newUid || null })
      setVenue(v => v ? { ...v, ownerUid: newUid || null } : v)
      setAssigningOwner(false)
    } finally {
      setSavingOwner(false)
    }
  }

  const handleSaveSlug = async () => {
    if (!venueId) return
    setSavingSlug(true)
    const slug = slugInput.trim().toLowerCase().replace(/\s+/g, '-') || null
    await updateDoc(doc(db, 'venues', venueId), { complianceSlug: slug })
    setVenue(v => v ? { ...v, complianceSlug: slug ?? undefined } : v)
    setEditingSlug(false)
    setSavingSlug(false)
  }

  const handleSaveRdp = async () => {
    if (!venueId) return
    setSavingRdp(true)
    const url = rdpInput.trim() || null
    await updateDoc(doc(db, 'venues', venueId), { retailDealerPermitUrl: url })
    setVenue(v => v ? { ...v, retailDealerPermitUrl: url ?? undefined } : v)
    setEditingRdp(false)
    setSavingRdp(false)
  }

  const handleSaveRdpDates = async () => {
    if (!venueId) return
    setSavingRdpDates(true)
    const updates = {
      parish:        rdpDatesForm.parish || null,
      rdpIssueDate:  rdpDatesForm.rdpIssueDate || null,
      rdpExpiryDate: rdpDatesForm.rdpExpiryDate || null,
    }
    await updateDoc(doc(db, 'venues', venueId), updates)
    setVenue(v => v ? { ...v, parish: updates.parish ?? undefined, rdpIssueDate: updates.rdpIssueDate ?? undefined, rdpExpiryDate: updates.rdpExpiryDate ?? undefined } : v)
    setEditingRdpDates(false)
    setSavingRdpDates(false)
  }

  const handleSaveNotes = async () => {
    if (!venueId) return
    setSavingNotes(true)
    await updateDoc(doc(db, 'venues', venueId), { notes: notesInput.trim() })
    setVenue(v => v ? { ...v, notes: notesInput.trim() } : v)
    setEditingNotes(false)
    setSavingNotes(false)
  }

  const handleSaveContact = async () => {
    if (!venueId) return
    setSavingContact(true)
    const updates = {
      contactName:    contactForm.contactName.trim(),
      contactPhone:   contactForm.contactPhone.trim(),
      commissionRate: parseFloat(contactForm.commissionRate) || 0,
      shareType:      contactForm.shareType,
    }
    await updateDoc(doc(db, 'venues', venueId), updates)
    setVenue(v => v ? { ...v, ...updates } : v)
    setEditingContact(false)
    setSavingContact(false)
  }

  const handleAddMachine = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const { placedAt, ...rest } = machineForm
    const placedAtTimestamp = placedAt ? Timestamp.fromDate(new Date(placedAt + 'T12:00:00')) : serverTimestamp()
    await addDoc(collection(db, 'machines'), { ...rest, venueId, placedAt: placedAtTimestamp })
    setShowMachineForm(false)
    setSaving(false)
    window.location.reload()
  }

  const handleRemoveStatement = async (statementId: string) => {
    await deleteDoc(doc(db, 'statements', statementId))
    setStatements(ss => ss.filter(s => s.id !== statementId))
    setRemovingStatement(null)
  }

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-brand-700 border-t-transparent rounded-full animate-spin" /></div>
  if (fetchError) return <p className="text-red-500 bg-red-50 rounded-lg px-4 py-3 text-sm">{fetchError}</p>
  if (!venue)  return <p className="text-slate-500 dark:text-slate-400">Venue not found.</p>

  return (
    <div className="space-y-8">
      <div>
        <Link to="/dashboard/admin/venues" className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-700 transition-colors">
          ← Back to Venues
        </Link>
        <div className="flex items-start justify-between mt-2 gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{venue.name}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">{venue.address}</p>
          </div>

          {/* Remove venue — type-to-confirm */}
          <div className="flex items-center gap-2">
            {!showRemoveDialog && (
              <button
                onClick={() => { setShowRemoveDialog(true); setRemoveConfirmText('') }}
                className="text-sm font-semibold text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition-colors"
              >
                Remove Venue
              </button>
            )}
            {showRemoveDialog && !removing && (
              <div className="flex flex-col gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg px-4 py-3 min-w-[280px]">
                <p className="text-sm text-red-700 dark:text-red-400 font-medium">
                  This will permanently delete the venue and all its machines.
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Type <span className="font-bold text-slate-800 dark:text-slate-200">{venue.name}</span> to confirm:
                </p>
                <input
                  autoFocus
                  value={removeConfirmText}
                  onChange={e => setRemoveConfirmText(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-red-300 dark:border-red-600 dark:bg-slate-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder={venue.name}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleRemoveVenue}
                    disabled={removeConfirmText !== venue.name}
                    className="text-sm font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed px-3 py-1 rounded-lg transition-colors"
                  >
                    Delete permanently
                  </button>
                  <button
                    onClick={() => { setShowRemoveDialog(false); setRemoveConfirmText('') }}
                    className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 px-2 py-1 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            {removing && (
              <span className="text-sm text-slate-400">Removing…</span>
            )}
          </div>
        </div>
      </div>

      {/* Venue info */}
      <div className="card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Contact</p>
          {!editingContact && (
            <button
              onClick={() => { setContactForm({ contactName: venue.contactName ?? '', contactPhone: venue.contactPhone ?? '', commissionRate: String(venue.commissionRate ?? ''), shareType: venue.shareType ?? 'revenue' }); setEditingContact(true) }}
              className="text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors"
            >
              Edit
            </button>
          )}
        </div>
        {editingContact ? (
          <div className="space-y-3">
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Name</label>
                <input value={contactForm.contactName} onChange={e => setContactForm(f => ({ ...f, contactName: e.target.value }))} className={INPUT} placeholder="Jane Smith" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Phone</label>
                <input value={contactForm.contactPhone} onChange={e => setContactForm(f => ({ ...f, contactPhone: e.target.value }))} className={INPUT} placeholder="(504) 555-1234" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Venue Share (%)</label>
                <input value={contactForm.commissionRate} onChange={e => setContactForm(f => ({ ...f, commissionRate: e.target.value }))} className={INPUT} placeholder="10" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Share Based On</label>
                <select value={contactForm.shareType} onChange={e => setContactForm(f => ({ ...f, shareType: e.target.value as 'revenue' | 'profit' }))} className={INPUT}>
                  <option value="revenue">Revenue</option>
                  <option value="profit">Profit</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleSaveContact} disabled={savingContact} className="btn-primary text-sm py-1.5 px-4">
                {savingContact ? 'Saving…' : 'Save'}
              </button>
              <button onClick={() => setEditingContact(false)} className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 px-2 py-1.5">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <dl className="grid sm:grid-cols-3 gap-3 text-sm">
            <div><dt className="text-slate-500 dark:text-slate-400">Name</dt><dd className="font-semibold text-slate-900 dark:text-slate-100">{venue.contactName || '—'}</dd></div>
            <div><dt className="text-slate-500 dark:text-slate-400">Phone</dt><dd className="font-semibold text-slate-900 dark:text-slate-100">{venue.contactPhone || '—'}</dd></div>
            <div><dt className="text-slate-500 dark:text-slate-400">Venue Share</dt><dd className="font-semibold text-slate-900 dark:text-slate-100">{venue.commissionRate ?? '—'}% of {venue.shareType === 'profit' ? 'Profit' : 'Revenue'}</dd></div>
          </dl>
        )}

        {/* Owner assignment */}
        {(() => {
          const currentOwner = users.find(u => u.id === venue.ownerUid)
          return (
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm">
                  <dt className="text-slate-500 dark:text-slate-400 mb-0.5">Portal Owner</dt>
                  {currentOwner ? (
                    <dd className="font-semibold text-slate-900 dark:text-slate-100">
                      {currentOwner.displayName}
                      <span className="ml-2 text-xs text-slate-400 dark:text-slate-500 font-normal">{currentOwner.email}</span>
                    </dd>
                  ) : (
                    <dd className="text-slate-400 dark:text-slate-500">Unassigned</dd>
                  )}
                </div>
                {!assigningOwner && (
                  <button
                    onClick={() => { setSelectedOwnerUid(venue.ownerUid ?? ''); setAssigningOwner(true) }}
                    className="text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors flex-shrink-0"
                  >
                    {currentOwner ? 'Change' : 'Assign'}
                  </button>
                )}
              </div>
              {assigningOwner && (
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <select
                    value={selectedOwnerUid}
                    onChange={e => setSelectedOwnerUid(e.target.value)}
                    className={`${INPUT} max-w-xs`}
                  >
                    <option value="">— Unassigned —</option>
                    {users.map(u => (
                      <option key={u.id} value={u.id}>{u.displayName} ({u.email})</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleAssignOwner(selectedOwnerUid)}
                    disabled={savingOwner}
                    className="btn-primary text-sm py-1.5 px-4"
                  >
                    {savingOwner ? 'Saving…' : 'Save'}
                  </button>
                  <button
                    onClick={() => setAssigningOwner(false)}
                    className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 px-2 py-1.5"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )
        })()}

        {/* Notes */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between gap-4 mb-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Notes (internal)</p>
            {!editingNotes && (
              <button
                onClick={() => { setNotesInput(venue.notes ?? ''); setEditingNotes(true) }}
                className="text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors flex-shrink-0"
              >
                Edit
              </button>
            )}
          </div>
          {editingNotes ? (
            <div className="space-y-2 mt-2">
              <textarea
                rows={3}
                value={notesInput}
                onChange={e => setNotesInput(e.target.value)}
                className={INPUT}
                placeholder="Internal notes about this venue…"
              />
              <div className="flex gap-2">
                <button onClick={handleSaveNotes} disabled={savingNotes} className="btn-primary text-sm py-1.5 px-4">
                  {savingNotes ? 'Saving…' : 'Save'}
                </button>
                <button onClick={() => setEditingNotes(false)} className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 px-2 py-1.5">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{venue.notes || <span className="italic text-slate-400">No notes.</span>}</p>
          )}
        </div>

        {/* Compliance Folder */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm">
              <p className="text-slate-500 dark:text-slate-400 mb-0.5">Compliance Folder</p>
              {venue.complianceSlug
                ? <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">public/compliance/{venue.complianceSlug}/</span>
                : <span className="text-slate-400 dark:text-slate-500">Not set</span>
              }
            </div>
            {!editingSlug && (
              <button
                onClick={() => { setSlugInput(venue.complianceSlug ?? ''); setEditingSlug(true) }}
                className="text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors flex-shrink-0"
              >
                {venue.complianceSlug ? 'Change' : 'Set'}
              </button>
            )}
          </div>
          {editingSlug && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <input
                value={slugInput}
                onChange={e => setSlugInput(e.target.value)}
                placeholder="e.g. mcgintys or rusty-nail"
                className={`${INPUT} max-w-xs`}
              />
              <button onClick={handleSaveSlug} disabled={savingSlug} className="btn-primary text-sm py-1.5 px-4">
                {savingSlug ? 'Saving…' : 'Save'}
              </button>
              <button onClick={() => setEditingSlug(false)} className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 px-2 py-1.5">
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Retail Dealer Permit — owner handles this, stored here for admin records */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm">
              <p className="text-slate-500 dark:text-slate-400 mb-0.5">Retail Dealer Permit <span className="text-xs font-normal text-slate-400">(owner's copy, for your records)</span></p>
              {venue.retailDealerPermitUrl
                ? <a href={venue.retailDealerPermitUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 hover:text-brand-900 transition-colors">View</a>
                : <span className="text-slate-400 dark:text-slate-500">Not on file</span>
              }
            </div>
            {!editingRdp && (
              <button
                onClick={() => { setRdpInput(venue.retailDealerPermitUrl ?? ''); setEditingRdp(true) }}
                className="text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors flex-shrink-0"
              >
                {venue.retailDealerPermitUrl ? 'Change' : 'Add'}
              </button>
            )}
          </div>
          {editingRdp && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <input
                type="url"
                value={rdpInput}
                onChange={e => setRdpInput(e.target.value)}
                placeholder="https://drive.google.com/..."
                className={`${INPUT} max-w-sm`}
              />
              <button onClick={handleSaveRdp} disabled={savingRdp} className="btn-primary text-sm py-1.5 px-4">
                {savingRdp ? 'Saving…' : 'Save'}
              </button>
              <button onClick={() => setEditingRdp(false)} className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 px-2 py-1.5">
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* RDP Parish & Dates */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between gap-4 mb-3">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Retail Dealer Permit — Dates</p>
            {!editingRdpDates && (
              <button
                onClick={() => { setRdpDatesForm({ parish: venue.parish ?? '', rdpIssueDate: venue.rdpIssueDate ?? '', rdpExpiryDate: venue.rdpExpiryDate ?? '' }); setEditingRdpDates(true) }}
                className="text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors flex-shrink-0"
              >
                Edit
              </button>
            )}
          </div>
          {editingRdpDates ? (
            <div className="space-y-3">
              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Parish</label>
                  <select value={rdpDatesForm.parish} onChange={e => setRdpDatesForm(f => ({ ...f, parish: e.target.value }))} className={INPUT}>
                    <option value="">— Select —</option>
                    {['East Baton Rouge', 'Orleans', 'Jefferson', 'St. Tammany', 'Tangipahoa'].map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Issue Date</label>
                  <input type="date" value={rdpDatesForm.rdpIssueDate} onChange={e => setRdpDatesForm(f => ({ ...f, rdpIssueDate: e.target.value }))} className={INPUT} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Expiry Date</label>
                  <input type="date" value={rdpDatesForm.rdpExpiryDate} onChange={e => setRdpDatesForm(f => ({ ...f, rdpExpiryDate: e.target.value }))} className={INPUT} />
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={handleSaveRdpDates} disabled={savingRdpDates} className="btn-primary text-sm py-1.5 px-4">
                  {savingRdpDates ? 'Saving…' : 'Save'}
                </button>
                <button onClick={() => setEditingRdpDates(false)} className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 px-2 py-1.5">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <dl className="grid sm:grid-cols-3 gap-3 text-sm">
              <div><dt className="text-slate-500 dark:text-slate-400">Parish</dt><dd className="font-semibold text-slate-900 dark:text-slate-100">{venue.parish || '—'}</dd></div>
              <div><dt className="text-slate-500 dark:text-slate-400">Issue Date</dt><dd className="font-semibold text-slate-900 dark:text-slate-100">{venue.rdpIssueDate ? new Date(venue.rdpIssueDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</dd></div>
              <div>
                <dt className="text-slate-500 dark:text-slate-400">Expiry Date</dt>
                <dd className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  {venue.rdpExpiryDate ? (
                    <>
                      {new Date(venue.rdpExpiryDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      {(() => {
                        const days = Math.floor((new Date(venue.rdpExpiryDate).getTime() - Date.now()) / 86400000)
                        const badge = days < 0 ? 'bg-red-100 text-red-600' : days <= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                        const label = days < 0 ? 'Expired' : days <= 60 ? 'Expiring Soon' : 'Valid'
                        return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badge}`}>{label}</span>
                      })()}
                    </>
                  ) : '—'}
                </dd>
              </div>
            </dl>
          )}
        </div>
      </div>

      {/* Machines */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-slate-900 dark:text-white">Machines</h2>
          <button onClick={() => setShowMachineForm(v => !v)} className="btn-secondary text-sm py-1.5 px-4">
            {showMachineForm ? 'Cancel' : 'Add Machine'}
          </button>
        </div>
        {showMachineForm && (
          <form onSubmit={handleAddMachine} className="card rounded-2xl p-5 mb-4 space-y-3">
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Model</label>
                <select value={machineForm.model} onChange={e => setMachineForm(f => ({ ...f, model: e.target.value }))}
                  className={INPUT}>
                  {MACHINE_MODELS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Serial Number</label>
                <input value={machineForm.serialNumber} onChange={e => setMachineForm(f => ({ ...f, serialNumber: e.target.value }))}
                  className={INPUT} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Placement Date</label>
                <input type="date" value={machineForm.placedAt} onChange={e => setMachineForm(f => ({ ...f, placedAt: e.target.value }))}
                  className={INPUT} />
              </div>
            </div>
            <button type="submit" disabled={saving} className="btn-primary text-sm py-2 px-5">
              {saving ? 'Saving…' : 'Add Machine'}
            </button>
          </form>
        )}
        {machines.length === 0 ? (
          <p className="text-sm text-slate-400">No machines at this venue yet.</p>
        ) : (
          <div className="space-y-3">
            {machines.map(m => (
              <div key={m.id} className="card rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{m.model}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{m.serialNumber ? `S/N: ${m.serialNumber}` : 'No serial number'}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      m.status === 'active' ? 'bg-green-100 text-green-700' :
                      m.status === 'maintenance' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
                    </span>
                    {removingMachine !== m.id && (
                      <button
                        onClick={() => setRemovingMachine(m.id)}
                        className="text-xs font-semibold text-red-400 hover:text-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
                {removingMachine === m.id && (
                  <div className="mt-3 flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg px-3 py-2">
                    <span className="text-sm text-red-700 dark:text-red-400 font-medium">Remove this machine? This cannot be undone.</span>
                    <button
                      onClick={() => handleRemoveMachine(m.id)}
                      className="text-sm font-bold text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg transition-colors"
                    >
                      Yes, remove
                    </button>
                    <button
                      onClick={() => setRemovingMachine(null)}
                      className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 px-2 py-1 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Compliance */}
      <div>
        <h2 className="font-bold text-slate-900 dark:text-white mb-3">Compliance</h2>

        {/* Responsible Vendor License — served as static file */}
        <div className="card rounded-2xl p-5 mb-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Responsible Vendor License</p>
          <div className="flex items-center gap-3 flex-wrap mt-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">On file</span>
            <a href="/rv-license.pdf" target="_blank" rel="noopener noreferrer"
              className="text-xs font-semibold text-brand-700 hover:text-brand-900 transition-colors">
              View PDF
            </a>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Visible to all venue owners in their portal. To update, replace <code className="font-mono">public/rv-license.pdf</code> and redeploy.</p>
        </div>

        {machines.length === 0 ? (
          <p className="text-sm text-slate-400">No machines — add a machine to manage licenses.</p>
        ) : (
          <div className="space-y-4">
            {machines.map(m => {
              const opStatus  = licenseStatus(m.operatorLicenseExpiry)
              const mchStatus = licenseStatus(m.machineLicenseExpiry)
              const isEditing = editingLicense === m.id
              return (
                <div key={m.id} className="card rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{m.model}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{m.serialNumber ? `S/N: ${m.serialNumber}` : 'No serial number'}</p>
                    </div>
                    {!isEditing && (
                      <button
                        onClick={() => {
                          setLicenseForm({
                            operatorLicenseNumber: m.operatorLicenseNumber ?? '',
                            operatorLicenseExpiry: m.operatorLicenseExpiry ?? '',
                            machineLicenseNumber:  m.machineLicenseNumber  ?? '',
                            machineLicenseExpiry:  m.machineLicenseExpiry  ?? '',
                          })
                          setEditingLicense(m.id)
                        }}
                        className="text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors"
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Operator License #</label>
                          <input value={licenseForm.operatorLicenseNumber} onChange={e => setLicenseForm(f => ({ ...f, operatorLicenseNumber: e.target.value }))} className={INPUT} placeholder="LA-OP-12345" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Operator License Expiry</label>
                          <input type="date" value={licenseForm.operatorLicenseExpiry} onChange={e => setLicenseForm(f => ({ ...f, operatorLicenseExpiry: e.target.value }))} className={INPUT} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Machine License #</label>
                          <input value={licenseForm.machineLicenseNumber} onChange={e => setLicenseForm(f => ({ ...f, machineLicenseNumber: e.target.value }))} className={INPUT} placeholder="LA-MCH-67890" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Machine License Expiry</label>
                          <input type="date" value={licenseForm.machineLicenseExpiry} onChange={e => setLicenseForm(f => ({ ...f, machineLicenseExpiry: e.target.value }))} className={INPUT} />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleSaveLicense(m.id)} disabled={savingLicense} className="btn-primary text-sm py-1.5 px-4">
                          {savingLicense ? 'Saving…' : 'Save'}
                        </button>
                        <button onClick={() => setEditingLicense(null)} className="text-sm font-semibold text-slate-500 hover:text-slate-700 px-3 py-1.5">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Operator License</p>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{m.operatorLicenseNumber || '—'}</p>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_BADGE[opStatus]}`}>{STATUS_LABEL[opStatus]}</span>
                          {m.operatorLicenseExpiry && <span className="text-xs text-slate-400">Expires {new Date(m.operatorLicenseExpiry).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Machine License</p>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{m.machineLicenseNumber || '—'}</p>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_BADGE[mchStatus]}`}>{STATUS_LABEL[mchStatus]}</span>
                          {m.machineLicenseExpiry && <span className="text-xs text-slate-400">Expires {new Date(m.machineLicenseExpiry).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Statements */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-slate-900 dark:text-white">Statements</h2>
          <Link to={`/dashboard/admin/statements/new?venueId=${venueId}`} className="btn-secondary text-sm py-1.5 px-4">
            Upload Statement
          </Link>
        </div>
        {statements.length === 0 ? (
          <p className="text-sm text-slate-400">No statements yet.</p>
        ) : (
          <div className="card rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Period</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Sales</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Share</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {statements.map(s => (
                  <Fragment key={s.id}>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                      <td className="px-5 py-3.5 font-semibold text-slate-900 dark:text-slate-100">{formatPeriod(s.periodLabel)}</td>
                      <td className="px-5 py-3.5 text-right text-slate-600 dark:text-slate-300">${s.totalSales.toFixed(2)}</td>
                      <td className="px-5 py-3.5 text-right font-semibold text-green-600">${s.venueShare.toFixed(2)}</td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-3">
                          {s.pdfUrl && <a href={s.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-brand-700 font-semibold hover:text-brand-900">PDF</a>}
                          {removingStatement !== s.id && (
                            <button onClick={() => setRemovingStatement(s.id)} className="text-xs font-semibold text-red-400 hover:text-red-600 transition-colors">
                              Remove
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    {removingStatement === s.id && (
                      <tr className="bg-red-50 dark:bg-red-900/20">
                        <td colSpan={4} className="px-5 py-3">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-sm text-red-700 dark:text-red-400 font-medium">Remove this statement? This cannot be undone.</span>
                            <button onClick={() => handleRemoveStatement(s.id)} className="text-sm font-bold text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg transition-colors">
                              Yes, remove
                            </button>
                            <button onClick={() => setRemovingStatement(null)} className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 px-2 py-1 transition-colors">
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
