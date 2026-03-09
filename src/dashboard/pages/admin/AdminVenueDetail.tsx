import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { doc, getDoc, getDocs, collection, query, where, orderBy, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import type { Venue, Machine, Statement } from '../../hooks/useVenueData'

const MACHINE_MODELS = ['Slim Wall', 'Mega Wall', 'Slim Tower', 'Mini Wall', 'Slim Wall – Tin Lift', 'WeatherWall']

export default function AdminVenueDetail() {
  const { venueId } = useParams<{ venueId: string }>()
  const [venue,      setVenue]      = useState<Venue | null>(null)
  const [machines,   setMachines]   = useState<Machine[]>([])
  const [statements, setStatements] = useState<Statement[]>([])
  const [loading,    setLoading]    = useState(true)
  const [showMachineForm, setShowMachineForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [machineForm, setMachineForm] = useState({ model: 'Slim Wall', serialNumber: '', status: 'active', notes: '' })

  useEffect(() => {
    if (!venueId) return
    async function fetch() {
      const [venueSnap, machinesSnap, statementsSnap] = await Promise.all([
        getDoc(doc(db, 'venues', venueId!)),
        getDocs(query(collection(db, 'machines'), where('venueId', '==', venueId))),
        getDocs(query(collection(db, 'statements'), where('venueId', '==', venueId), orderBy('uploadedAt', 'desc'))),
      ])
      if (venueSnap.exists()) setVenue({ id: venueSnap.id, ...venueSnap.data() } as Venue)
      setMachines(machinesSnap.docs.map(d => ({ id: d.id, ...d.data(), placedAt: d.data().placedAt?.toDate() ?? new Date() } as Machine)))
      setStatements(statementsSnap.docs.map(d => ({ id: d.id, ...d.data(), uploadedAt: d.data().uploadedAt?.toDate() ?? new Date() } as Statement)))
      setLoading(false)
    }
    fetch()
  }, [venueId])

  const handleAddMachine = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await addDoc(collection(db, 'machines'), { ...machineForm, venueId, placedAt: serverTimestamp() })
    setShowMachineForm(false)
    setSaving(false)
    window.location.reload()
  }

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-brand-700 border-t-transparent rounded-full animate-spin" /></div>
  if (!venue)  return <p className="text-slate-500">Venue not found.</p>

  return (
    <div className="space-y-8">
      <div>
        <Link to="/dashboard/admin/venues" className="text-sm text-slate-500 hover:text-brand-700 transition-colors">
          ← Back to Venues
        </Link>
        <h1 className="text-2xl font-extrabold text-slate-900 mt-2">{venue.name}</h1>
        <p className="text-sm text-slate-500">{venue.address}</p>
      </div>

      {/* Venue info */}
      <div className="card rounded-2xl p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Contact</p>
        <dl className="grid sm:grid-cols-2 gap-3 text-sm">
          <div><dt className="text-slate-500">Name</dt><dd className="font-semibold text-slate-900">{venue.contactName || '—'}</dd></div>
          <div><dt className="text-slate-500">Phone</dt><dd className="font-semibold text-slate-900">{venue.contactPhone || '—'}</dd></div>
        </dl>
        {venue.notes && <p className="text-sm text-slate-500 mt-3 pt-3 border-t border-slate-100">{venue.notes}</p>}
      </div>

      {/* Machines */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-slate-900">Machines</h2>
          <button onClick={() => setShowMachineForm(v => !v)} className="btn-secondary text-sm py-1.5 px-4">
            {showMachineForm ? 'Cancel' : 'Add Machine'}
          </button>
        </div>
        {showMachineForm && (
          <form onSubmit={handleAddMachine} className="card rounded-2xl p-5 mb-4 space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Model</label>
                <select value={machineForm.model} onChange={e => setMachineForm(f => ({ ...f, model: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700">
                  {MACHINE_MODELS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Serial Number</label>
                <input value={machineForm.serialNumber} onChange={e => setMachineForm(f => ({ ...f, serialNumber: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700" />
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
              <div key={m.id} className="card rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{m.model}</p>
                  <p className="text-xs text-slate-500">{m.serialNumber ? `S/N: ${m.serialNumber}` : 'No serial number'}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  m.status === 'active' ? 'bg-green-100 text-green-700' :
                  m.status === 'maintenance' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Statements */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-slate-900">Statements</h2>
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
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Period</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Sales</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Share</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {statements.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3.5 font-semibold text-slate-900">{s.periodLabel}</td>
                    <td className="px-5 py-3.5 text-right text-slate-600">${s.totalSales.toFixed(2)}</td>
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
