import { useState } from 'react'
import { Link } from 'react-router-dom'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import { useAdminData } from '../../hooks/useAdminData'

export default function AdminUsers() {
  const { users, venues, loading, refresh } = useAdminData()
  const [showForm, setShowForm] = useState(false)
  const [saving,   setSaving]   = useState(false)
  const [form, setForm] = useState({ uid: '', email: '', displayName: '', venueId: '' })
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await setDoc(doc(db, 'users', form.uid), {
        email:       form.email,
        displayName: form.displayName,
        role:        'venue_owner',
        venueId:     form.venueId || null,
        createdAt:   serverTimestamp(),
      })
      setForm({ uid: '', email: '', displayName: '', venueId: '' })
      setShowForm(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 4000)
      refresh()
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-brand-700 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Users</h1>
        <button onClick={() => setShowForm(v => !v)} className="btn-primary text-sm py-2 px-4">
          {showForm ? 'Cancel' : 'Add User'}
        </button>
      </div>

      {success && (
        <div className="bg-green-50 text-green-700 text-sm font-medium px-4 py-3 rounded-xl mb-4">
          User linked successfully.
        </div>
      )}

      {showForm && (
        <div className="card rounded-2xl p-6 mb-6 space-y-4">
          <h2 className="font-bold text-slate-900">Link Venue Owner Account</h2>
          <p className="text-sm text-slate-500">
            First create the account in{' '}
            <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-brand-700 underline">
              Firebase Console
            </a>
            {' '}→ Authentication → Add user. Then paste their UID and details below.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { key: 'uid',         label: 'Firebase UID',  placeholder: 'Paste from Firebase Console' },
                { key: 'email',       label: 'Email',         placeholder: 'owner@example.com' },
                { key: 'displayName', label: 'Display Name',  placeholder: 'The Rusty Nail' },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
                  <input
                    required
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Linked Venue</label>
                <select
                  value={form.venueId}
                  onChange={e => setForm(f => ({ ...f, venueId: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700"
                >
                  <option value="">— No venue yet —</option>
                  {venues.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                </select>
              </div>
            </div>
            <button type="submit" disabled={saving} className="btn-primary text-sm py-2 px-5">
              {saving ? 'Saving…' : 'Link Account'}
            </button>
          </form>
        </div>
      )}

      {users.length === 0 ? (
        <div className="card rounded-2xl p-12 text-center">
          <p className="text-slate-400 text-sm">No venue owner accounts yet.</p>
        </div>
      ) : (
        <div className="card rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400">Name</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400 hidden sm:table-cell">Email</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400">Venue</th>
                <th className="text-right px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(u => {
                const venue = venues.find(v => v.id === u.venueId)
                return (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">{u.displayName}</td>
                    <td className="px-6 py-4 text-slate-500 hidden sm:table-cell">{u.email}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {venue ? (
                        <Link to={`/dashboard/admin/venues/${venue.id}`} className="text-brand-700 hover:underline">{venue.name}</Link>
                      ) : <span className="text-slate-400">—</span>}
                    </td>
                    <td className="px-6 py-4 text-right text-slate-400">
                      {u.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
