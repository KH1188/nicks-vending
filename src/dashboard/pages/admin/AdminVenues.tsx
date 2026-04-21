import { useState } from 'react'
import { Link } from 'react-router-dom'
import { initializeApp, deleteApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc, doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db, firebaseConfig } from '../../../lib/firebase'
import { useAdminData } from '../../hooks/useAdminData'

const INPUT = "w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-700"

const AUTH_ERRORS: Record<string, string> = {
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/invalid-email':        'Please enter a valid email address.',
  'auth/weak-password':        'Password must be at least 6 characters.',
}

const PARISHES = ['East Baton Rouge', 'Orleans', 'Jefferson', 'St. Tammany', 'Tangipahoa']

const EMPTY_FORM = {
  name: '', address: '', contactName: '', contactPhone: '', notes: '', commissionRate: '10',
  shareType: 'revenue' as 'revenue' | 'profit',
  parish: '', rdpIssueDate: '', rdpExpiryDate: '',
  ownerName: '', ownerEmail: '', ownerPassword: '',
}

export default function AdminVenues() {
  const { venues, machines, users, loading, refresh } = useAdminData()
  const [showForm, setShowForm] = useState(false)
  const [saving,   setSaving]   = useState(false)
  const [error,    setError]    = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value })),
  })

  const hasOwnerFields = form.ownerEmail.trim() !== '' || form.ownerPassword.trim() !== '' || form.ownerName.trim() !== ''

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (hasOwnerFields && (!form.ownerName || !form.ownerEmail || !form.ownerPassword)) {
      setError('Please fill in all owner account fields, or clear them to skip.')
      return
    }
    setSaving(true)
    setError(null)

    try {
      // 1. Create the venue
      const venueRef = await addDoc(collection(db, 'venues'), {
        name:           form.name,
        address:        form.address,
        contactName:    form.contactName,
        contactPhone:   form.contactPhone,
        notes:          form.notes,
        commissionRate: parseFloat(form.commissionRate) || 10,
        shareType:      form.shareType,
        parish:         form.parish || null,
        rdpIssueDate:   form.rdpIssueDate || null,
        rdpExpiryDate:  form.rdpExpiryDate || null,
        ownerUid:       null,
        createdAt:      serverTimestamp(),
      })

      // 2. If owner fields provided, create Auth + Firestore user and link both
      if (hasOwnerFields) {
        const secondaryApp  = initializeApp(firebaseConfig, `create-user-${Date.now()}`)
        const secondaryAuth = getAuth(secondaryApp)
        try {
          const { user: newUser } = await createUserWithEmailAndPassword(
            secondaryAuth, form.ownerEmail, form.ownerPassword
          )
          await setDoc(doc(db, 'users', newUser.uid), {
            email:       form.ownerEmail,
            displayName: form.ownerName,
            role:        'venue_owner',
            venueId:     venueRef.id,
            createdAt:   serverTimestamp(),
          })
          await updateDoc(venueRef, { ownerUid: newUser.uid })
        } catch (authErr: unknown) {
          const code = (authErr as { code?: string }).code ?? ''
          setError(AUTH_ERRORS[code] ?? 'Venue created, but owner account failed. You can assign one from the venue page.')
          refresh()
          return
        } finally {
          await secondaryAuth.signOut().catch(() => {})
          await deleteApp(secondaryApp).catch(() => {})
        }
      }

      setForm(EMPTY_FORM)
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
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Venues</h1>
        <button onClick={() => { setShowForm(v => !v); setError(null) }} className="btn-primary text-sm py-2 px-4">
          {showForm ? 'Cancel' : 'Add Venue'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="card rounded-2xl p-6 mb-6 space-y-6">

          {/* Venue details */}
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white mb-4">Venue Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Venue Name</label>
                <input required placeholder="The Rusty Nail" className={INPUT} {...field('name')} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Address</label>
                <input placeholder="123 Bourbon St, New Orleans, LA" className={INPUT} {...field('address')} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Contact Name</label>
                <input placeholder="Jane Smith" className={INPUT} {...field('contactName')} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Contact Phone</label>
                <input placeholder="(504) 555-1234" className={INPUT} {...field('contactPhone')} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Venue Share (%)</label>
                <input placeholder="10" className={INPUT} {...field('commissionRate')} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Share Based On</label>
                <select className={INPUT} value={form.shareType} onChange={e => setForm(f => ({ ...f, shareType: e.target.value as 'revenue' | 'profit' }))}>
                  <option value="revenue">Revenue</option>
                  <option value="profit">Profit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Parish</label>
                <select className={INPUT} value={form.parish} onChange={e => setForm(f => ({ ...f, parish: e.target.value }))}>
                  <option value="">— Select parish —</option>
                  {PARISHES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">RDP Issue Date</label>
                <input type="date" className={INPUT} {...field('rdpIssueDate')} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">RDP Expiry Date</label>
                <input type="date" className={INPUT} {...field('rdpExpiryDate')} />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Notes (internal)</label>
              <textarea rows={2} className={INPUT} {...field('notes')} />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100 dark:border-slate-700" />

          {/* Owner account */}
          <div>
            <div className="mb-4">
              <h2 className="font-bold text-slate-900 dark:text-white">Owner Portal Account</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Optional — creates a login for this venue's owner. You can also add one later from the venue page.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Display Name</label>
                <input placeholder="e.g. Swamp Room Bar" className={INPUT} {...field('ownerName')} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                <input type="email" placeholder="venuename@nicksvending.com" className={INPUT} {...field('ownerEmail')} />
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Convention: venuename@nicksvending.com (owner never needs to know this)</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
                <input type="password" placeholder="Min 6 characters" className={INPUT} {...field('ownerPassword')} />
              </div>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-4 py-2.5 rounded-lg">{error}</p>
          )}

          <button type="submit" disabled={saving} className="btn-primary text-sm py-2 px-5">
            {saving ? 'Saving…' : hasOwnerFields ? 'Save Venue & Create Account' : 'Save Venue'}
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
              <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
                <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Venue</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 hidden sm:table-cell">Address</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 hidden md:table-cell">Owner</th>
                <th className="text-center px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Machines</th>
                <th className="px-6 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {venues.map(v => {
                const owner = users.find(u => u.id === v.ownerUid)
                return (
                  <tr key={v.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">{v.name}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 hidden sm:table-cell">{v.address}</td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      {owner
                        ? <span className="text-slate-700 dark:text-slate-300">{owner.displayName}</span>
                        : <span className="text-slate-400 dark:text-slate-500 text-xs">No owner</span>
                      }
                    </td>
                    <td className="px-6 py-4 text-center text-slate-700 dark:text-slate-300 font-semibold">
                      {machines.filter(m => m.venueId === v.id).length}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/dashboard/admin/venues/${v.id}`}
                        className="text-brand-700 hover:text-brand-900 font-semibold transition-colors">
                        View →
                      </Link>
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
