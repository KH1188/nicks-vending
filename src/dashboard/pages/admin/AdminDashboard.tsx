import { Link } from 'react-router-dom'
import { useAdminData } from '../../hooks/useAdminData'

export default function AdminDashboard() {
  const { venues, machines, statements, loading } = useAdminData()

  if (loading) {
    return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-brand-700 border-t-transparent rounded-full animate-spin" /></div>
  }

  const recent = statements.slice(0, 5)

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900 mb-8">Overview</h1>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="card rounded-2xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Venues</p>
          <p className="text-3xl font-extrabold text-slate-900">{venues.length}</p>
        </div>
        <div className="card rounded-2xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Machines</p>
          <p className="text-3xl font-extrabold text-slate-900">{machines.length}</p>
        </div>
        <div className="card rounded-2xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Total Statements</p>
          <p className="text-3xl font-extrabold text-slate-900">{statements.length}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-widest">Recent Statements</h2>
        <Link to="/dashboard/admin/statements/new" className="btn-primary text-sm py-2 px-4">
          Upload Statement
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="card rounded-2xl p-10 text-center">
          <p className="text-slate-400 text-sm">No statements uploaded yet.</p>
        </div>
      ) : (
        <div className="card rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400">Venue</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400">Period</th>
                <th className="text-right px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400">Venue Share</th>
                <th className="text-right px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400">Uploaded</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recent.map(s => {
                const venue = venues.find(v => v.id === s.venueId)
                return (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">{venue?.name ?? '—'}</td>
                    <td className="px-6 py-4 text-slate-600">{s.periodLabel}</td>
                    <td className="px-6 py-4 text-right font-semibold text-green-600">${s.venueShare.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right text-slate-400">
                      {s.uploadedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
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
