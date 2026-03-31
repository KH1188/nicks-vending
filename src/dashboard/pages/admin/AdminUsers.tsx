import { useState } from 'react'
import { Link } from 'react-router-dom'
import { initializeApp, deleteApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db, firebaseConfig } from '../../../lib/firebase'
import { useAdminData } from '../../hooks/useAdminData'

const INPUT = "w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-700"

const AUTH_ERRORS: Record<string, string> = {
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/invalid-email':        'Please enter a valid email address.',
  'auth/weak-password':        'Password must be at least 6 characters.',
}

export default function AdminUsers() {
  const { users, venues, loading, refresh } = useAdminData()
  const [showForm,     setShowForm]     = useState(false)
  const [saving,       setSaving]       = useState(false)
  const [error,        setError]        = useState<string | null>(null)
  const [success,      setSuccess]      = useState(false)
  const [removingUser, setRemovingUser] = useState<string | null>(null)
  const [form, setForm] = useState({ displayName: '', email: '', password: '', venueId: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    // Use a secondary Firebase app so the admin doesn't get signed out
    const secondaryApp = initializeApp(firebaseConfig, `create-user-${Date.now()}`)
    const secondaryAuth = getAuth(secondaryApp)

    try {
      // 1. Create the Firebase Auth account
      const { user: newUser } = await createUserWithEmailAndPassword(
        secondaryAuth, form.email, form.password
      )

      // 2. Create the Firestore user doc with venueIds array
      await setDoc(doc(db, 'users', newUser.uid), {
        email:       form.email,
        displayName: form.displayName,
        role:        'venue_owner',
        venueIds:    form.venueId ? [form.venueId] : [],
        createdAt:   serverTimestamp(),
      })

      // 3. Link the venue's ownerUid back to this user
      if (form.venueId) {
        await updateDoc(doc(db, 'venues', form.venueId), { ownerUid: newUser.uid })
      }

      setForm({ displayName: '', email: '', password: '', venueId: '' })
      setShowForm(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 4000)
      refresh()
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? ''
      setError(AUTH_ERRORS[code] ?? 'Something went wrong. Please try again.')
    } finally {
      await secondaryAuth.signOut().catch(() => {})
      await deleteApp(secondaryApp).catch(() => {})
      setSaving(false)
    }
  }

  const handleRemoveUser = async (uid: string) => {
    const userToRemove = users.find(u => u.id === uid)
    // Clear ownerUid on every venue this user was linked to
    await Promise.all(
      (userToRemove?.venueIds ?? []).map(vid =>
        updateDoc(doc(db, 'venues', vid), { ownerUid: null })
      )
    )
    await deleteDoc(doc(db, 'users', uid))
    setRemovingUser(null)
    refresh()
  }

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-brand-700 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Users</h1>
        <button onClick={() => { setShowForm(v => !v); setError(null) }} className="btn-primary text-sm py-2 px-4">
          {showForm ? 'Cancel' : 'Add User'}
        </button>
      </div>

      {success && (
        <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium px-4 py-3 rounded-xl mb-4">
          Account created and linked successfully.
        </div>
      )}

      {showForm && (
        <div className="card rounded-2xl p-6 mb-6 space-y-4">
          <h2 className="font-bold text-slate-900 dark:text-white">Create Venue Owner Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Display Name</label>
                <input
                  required
                  value={form.displayName}
                  onChange={e => setForm(f => ({ ...f, displayName: e.target.value }))}
                  placeholder="e.g. Swamp Room Bar"
                  className={INPUT}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="owner@example.com"
                  className={INPUT}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
                <input
                  required
                  type="password"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Min 6 characters"
                  className={INPUT}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Initial Venue (optional)</label>
                <select
                  value={form.venueId}
                  onChange={e => setForm(f => ({ ...f, venueId: e.target.value }))}
                  className={INPUT}
                >
                  <option value="">— No venue yet —</option>
                  {venues.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                </select>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">More venues can be added from each venue's detail page.</p>
              </div>
            </div>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-4 py-2.5 rounded-lg">{error}</p>
            )}
            <button type="submit" disabled={saving} className="btn-primary text-sm py-2 px-5">
              {saving ? 'Creating account…' : 'Create Account'}
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
              <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
                <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Name</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Email</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Venues</th>
                <th className="text-right px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Created</th>
                <th className="px-6 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {users.map(u => {
                const userVenues = venues.filter(v => u.venueIds.includes(v.id))
                return (
                  <>
                    <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">{u.displayName}</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{u.email}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                        {userVenues.length === 0 ? (
                          <span className="text-slate-400 dark:text-slate-500">—</span>
                        ) : (
                          <div className="flex flex-wrap gap-x-2 gap-y-1">
                            {userVenues.map(v => (
                              <Link key={v.id} to={`/dashboard/admin/venues/${v.id}`} className="text-brand-700 hover:underline">
                                {v.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right text-slate-400 dark:text-slate-500">
                        {u.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {removingUser !== u.id && (
                          <button
                            onClick={() => setRemovingUser(u.id)}
                            className="text-xs font-semibold text-red-400 hover:text-red-600 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                    {removingUser === u.id && (
                      <tr key={`${u.id}-confirm`} className="bg-red-50 dark:bg-red-900/20">
                        <td colSpan={5} className="px-6 py-3">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-sm text-red-700 dark:text-red-400 font-medium">
                              Remove <strong>{u.displayName}</strong>? This removes their portal access
                              {userVenues.length > 0 && ` and unlinks ${userVenues.length === 1 ? '1 venue' : `${userVenues.length} venues`}`}.
                            </span>
                            <button
                              onClick={() => handleRemoveUser(u.id)}
                              className="text-sm font-bold text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg transition-colors"
                            >
                              Yes, remove
                            </button>
                            <button
                              onClick={() => setRemovingUser(null)}
                              className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 px-2 py-1 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
