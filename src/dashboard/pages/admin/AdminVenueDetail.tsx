import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { doc, getDoc, getDocs, collection, query, where, orderBy, addDoc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
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
  const [removeStep, setRemoveStep] = useState(0) // 0=idle, 1=first confirm, 2=deleting
  const [removingMachine, setRemovingMachine] = useState<string | null>(null)
  const [editingLicense, setEditingLicense] = useState<string | null>(null) // machineId being edited
  const [licenseForm, setLicenseForm] = useState({ operatorLicenseNumber: '', operatorLicenseExpiry: '', machineLicenseNumber: '', machineLicenseExpiry: '' })
  const [savingLicense, setSavingLicense] = useState(false)
  const [machineForm, setMachineForm] = useState({ model: 'Slim Wall', serialNumber: '', status: 'active', notes: '' })
  const [assigningOwner, setAssigningOwner] = useState(false)
  const [selectedOwnerUid, setSelectedOwnerUid] = useState('')
  const [savingOwner, setSavingOwner] = useState(false)
  const [editingDocs, setEditingDocs] = useState(false)
  const [docsForm, setDocsForm] = useState({ contractUrl: '', operatorPermitUrl: '', retailDealerPermitUrl: '', vendingMachinePermitUrl: '' })
  const [savingDocs, setSavingDocs] = useState(false)

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
    setRemoveStep(2)
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
      // Clear old owner's venueId if they were pointing to this venue
      if (oldUid && oldUid !== newUid) {
        const oldUser = users.find(u => u.id === oldUid)
        if (oldUser?.venueId === venueId) {
          await updateDoc(doc(db, 'users', oldUid), { venueId: null })
        }
      }
      // Set new owner's venueId
      if (newUid) {
        await updateDoc(doc(db, 'users', newUid), { venueId: venueId })
      }
      // Update venue's ownerUid
      await updateDoc(doc(db, 'venues', venueId), { ownerUid: newUid || null })
      setVenue(v => v ? { ...v, ownerUid: newUid || null } : v)
      setAssigningOwner(false)
    } finally {
      setSavingOwner(false)
    }
  }

  const handleSaveDocs = async () => {
    if (!venueId) return
    setSavingDocs(true)
    const updates = {
      contractUrl:           docsForm.contractUrl.trim() || null,
      operatorPermitUrl:     docsForm.operatorPermitUrl.trim() || null,
      retailDealerPermitUrl: docsForm.retailDealerPermitUrl.trim() || null,
      vendingMachinePermitUrl: docsForm.vendingMachinePermitUrl.trim() || null,
    }
    await updateDoc(doc(db, 'venues', venueId), updates)
    setVenue(v => v ? { ...v, contractUrl: updates.contractUrl ?? undefined, operatorPermitUrl: updates.operatorPermitUrl ?? undefined, retailDealerPermitUrl: updates.retailDealerPermitUrl ?? undefined, vendingMachinePermitUrl: updates.vendingMachinePermitUrl ?? undefined } : v)
    setEditingDocs(false)
    setSavingDocs(false)
  }

  const handleAddMachine = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await addDoc(collection(db, 'machines'), { ...machineForm, venueId, placedAt: serverTimestamp() })
    setShowMachineForm(false)
    setSaving(false)
    window.location.reload()
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

          {/* Remove venue — two-step confirmation */}
          <div className="flex items-center gap-2">
            {removeStep === 0 && (
              <button
                onClick={() => setRemoveStep(1)}
                className="text-sm font-semibold text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition-colors"
              >
                Remove Venue
              </button>
            )}
            {removeStep === 1 && (
              <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg px-3 py-2">
                <span className="text-sm text-red-700 dark:text-red-400 font-medium">Are you sure? This cannot be undone.</span>
                <button
                  onClick={handleRemoveVenue}
                  className="text-sm font-bold text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg transition-colors"
                >
                  Yes, remove
                </button>
                <button
                  onClick={() => setRemoveStep(0)}
                  className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 px-2 py-1 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
            {removeStep === 2 && (
              <span className="text-sm text-slate-400">Removing…</span>
            )}
          </div>
        </div>
      </div>

      {/* Venue info */}
      <div className="card rounded-2xl p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">Contact</p>
        <dl className="grid sm:grid-cols-3 gap-3 text-sm">
          <div><dt className="text-slate-500 dark:text-slate-400">Name</dt><dd className="font-semibold text-slate-900 dark:text-slate-100">{venue.contactName || '—'}</dd></div>
          <div><dt className="text-slate-500 dark:text-slate-400">Phone</dt><dd className="font-semibold text-slate-900 dark:text-slate-100">{venue.contactPhone || '—'}</dd></div>
          <div><dt className="text-slate-500 dark:text-slate-400">Commission Rate</dt><dd className="font-semibold text-slate-900 dark:text-slate-100">{venue.commissionRate ?? '—'}%</dd></div>
        </dl>

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

        {venue.notes && <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">{venue.notes}</p>}

        {/* Compliance Documents */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between gap-4 mb-3">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Compliance Documents</p>
            {!editingDocs && (
              <button
                onClick={() => { setDocsForm({ contractUrl: venue.contractUrl ?? '', operatorPermitUrl: venue.operatorPermitUrl ?? '', retailDealerPermitUrl: venue.retailDealerPermitUrl ?? '', vendingMachinePermitUrl: venue.vendingMachinePermitUrl ?? '' }); setEditingDocs(true) }}
                className="text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors flex-shrink-0"
              >
                Edit
              </button>
            )}
          </div>
          {editingDocs ? (
            <div className="space-y-3">
              {[
                { label: 'Contract', key: 'contractUrl' },
                { label: 'Operator Permit', key: 'operatorPermitUrl' },
                { label: 'Retail Dealer Permit', key: 'retailDealerPermitUrl' },
                { label: 'Vending Machine Permit', key: 'vendingMachinePermitUrl' },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{label}</label>
                  <input
                    type="url"
                    value={docsForm[key as keyof typeof docsForm]}
                    onChange={e => setDocsForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder="https://drive.google.com/..."
                    className={INPUT}
                  />
                </div>
              ))}
              <div className="flex gap-2 pt-1">
                <button onClick={handleSaveDocs} disabled={savingDocs} className="btn-primary text-sm py-1.5 px-4">
                  {savingDocs ? 'Saving…' : 'Save'}
                </button>
                <button onClick={() => setEditingDocs(false)} className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 px-2 py-1.5">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-2 text-sm">
              {[
                { label: 'Contract', url: venue.contractUrl },
                { label: 'Operator Permit', url: venue.operatorPermitUrl },
                { label: 'Retail Dealer Permit', url: venue.retailDealerPermitUrl },
                { label: 'Vending Machine Permit', url: venue.vendingMachinePermitUrl },
              ].map(({ label, url }) => (
                <div key={label}>
                  <span className="text-slate-500 dark:text-slate-400">{label}: </span>
                  {url
                    ? <a href={url} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 hover:text-brand-900 transition-colors">View</a>
                    : <span className="text-slate-400 dark:text-slate-500">Not linked</span>
                  }
                </div>
              ))}
            </div>
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
            <div className="grid sm:grid-cols-2 gap-3">
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
                  <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="px-5 py-3.5 font-semibold text-slate-900 dark:text-slate-100">{formatPeriod(s.periodLabel)}</td>
                    <td className="px-5 py-3.5 text-right text-slate-600 dark:text-slate-300">${s.totalSales.toFixed(2)}</td>
                    <td className="px-5 py-3.5 text-right font-semibold text-green-600">${s.venueShare.toFixed(2)}</td>
                    <td className="px-5 py-3.5 text-right">
                      {s.pdfUrl && <a href={s.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-brand-700 font-semibold hover:text-brand-900">PDF</a>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
