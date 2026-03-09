import { useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import { useAdminData } from '../../hooks/useAdminData'

export default function AdminVenues() {
  const { venues, machines, loading, refresh } = useAdminData()
  const [showForm, setShowForm] = useState(false)
  const [saving,   setSaving]   = useState(false)
  const [form, setForm] = useState({ name: '', address: '', contactName: '', contactPhone: '', notes: '' })

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await addDoc(collection(db, 'venues'), { ...form, ownerUid: '', createdAt: serverTimestamp() })
      setForm({ name: '', address: '', contactName: '', contactPhone: '', notes: '' })
      setShowForm(false)
      refresh()
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-brand-700 border-t-transparent rounded-full animate-spin" /></div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Venues</h1>
        <button onClick={() => setShowForm(v => !v)} className="btn-primary text-sm py-2 px-4">
          {showForm ? 'Cancel' : 'Add Venue'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="card rounded-2xl p-6 mb-6 space-y-4">
          <h2 className="font-bold text-slate-900">New Venue</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { key: 'name',         label: 'Venue Name',    placeholder: 'The Rusty Nail' },
              { key: 'address',      label: 'Address',       placeholder: '123 Bourbon St, New Orleans, LA' },
              { key: 'contactName',  label: 'Contact Name',  placeholder: 'Jane Smith' },
              { key: 'contactPhone', label: 'Contact Phone', placeholder: '(504) 555-1234' },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
                <input
                  value={form[key as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700"
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notes (internal)</label>
            <textarea
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700"
            />
          </div>
          <button type="submit" disabled={saving} className="btn-primary text-sm py-2 px-5">
            {saving ? 'Saving…' : 'Save Venue'}
          </button>
        </form>
      )}

      {venues.length === 0 ? (
        <div className="card rounded-2xl p-12 text-center">
          <p className="text-slate-400 text-sm">No venues yet. Add your first one above.</p>
        </div>
      ) : (
        <div className="card rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400">Venue</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400 hidden sm:table-cell">Address</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400 hidden md:table-cell">Contact</th>
                <th className="text-center px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400">Machines</th>
                <th className="px-6 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {venues.map(v => (
                <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">{v.name}</td>
                  <td className="px-6 py-4 text-slate-500 hidden sm:table-cell">{v.address}</td>
                  <td className="px-6 py-4 text-slate-500 hidden md:table-cell">{v.contactName}</td>
                  <td className="px-6 py-4 text-center text-slate-700 font-semibold">
                    {machines.filter(m => m.venueId === v.id).length}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/dashboard/admin/venues/${v.id}`}
                      className="text-brand-700 hover:text-brand-900 font-semibold transition-colors">
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
