import { useState } from 'react'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import { useAdminData } from '../../hooks/useAdminData'
import type { Machine } from '../../hooks/useVenueData'

const STATUS_STYLES = {
  active:      'bg-green-100 text-green-700',
  maintenance: 'bg-yellow-100 text-yellow-700',
  inactive:    'bg-slate-100 text-slate-500',
}


export default function AdminMachines() {
  const { machines, venues, loading, refresh } = useAdminData()
  const [removingMachine, setRemovingMachine] = useState<string | null>(null)
  const [updatingStatus,  setUpdatingStatus]  = useState<string | null>(null)

  const handleRemove = async (id: string) => {
    await deleteDoc(doc(db, 'machines', id))
    setRemovingMachine(null)
    refresh()
  }

  const handleStatusChange = async (m: Machine, status: Machine['status']) => {
    setUpdatingStatus(m.id)
    await updateDoc(doc(db, 'machines', m.id), { status })
    setUpdatingStatus(null)
    refresh()
  }

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-brand-700 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6">Machines</h1>

      {machines.length === 0 ? (
        <div className="card rounded-2xl p-12 text-center">
          <p className="text-slate-400 text-sm">No machines yet. Add them from a venue's detail page.</p>
        </div>
      ) : (
        <div className="card rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
                <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Model</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 hidden sm:table-cell">Venue</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 hidden md:table-cell">Serial</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Status</th>
                <th className="text-right px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 hidden lg:table-cell">Placed</th>
                <th className="px-6 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {machines.map(m => {
                const venue = venues.find(v => v.id === m.venueId)
                return (
                  <>
                    <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">{m.model}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300 hidden sm:table-cell">{venue?.name ?? '—'}</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 hidden md:table-cell">{m.serialNumber || '—'}</td>
                      <td className="px-6 py-4">
                        <select
                          value={m.status}
                          disabled={updatingStatus === m.id}
                          onChange={e => handleStatusChange(m, e.target.value as Machine['status'])}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-700 ${STATUS_STYLES[m.status]}`}
                        >
                          <option value="active">Active</option>
                          <option value="maintenance">Maintenance</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right text-slate-400 dark:text-slate-500 hidden lg:table-cell">
                        {m.placedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {removingMachine !== m.id && (
                          <button
                            onClick={() => setRemovingMachine(m.id)}
                            className="text-xs font-semibold text-red-400 hover:text-red-600 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                    {removingMachine === m.id && (
                      <tr key={`${m.id}-confirm`} className="bg-red-50 dark:bg-red-900/20">
                        <td colSpan={6} className="px-6 py-3">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-sm text-red-700 dark:text-red-400 font-medium">
                              Remove <strong>{m.model}</strong>? This cannot be undone.
                            </span>
                            <button
                              onClick={() => handleRemove(m.id)}
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
