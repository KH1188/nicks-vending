import { useAuth } from '../../../context/AuthContext'
import { useVenueData, formatPeriod } from '../../hooks/useVenueData'

export default function VenueDashboard() {
  const { user } = useAuth()
  const { venue, machines, statements, loading } = useVenueData()

  if (loading) {
    return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-brand-700 border-t-transparent rounded-full animate-spin" /></div>
  }

  const latest = statements[0] ?? null
  const machine = machines[0] ?? null

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Welcome back, {user?.displayName}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{venue?.name}</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="card rounded-2xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Total Statements</p>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{statements.length}</p>
        </div>
        <div className="card rounded-2xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Latest Payout</p>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {latest ? `$${latest.venueShare.toFixed(2)}` : '—'}
          </p>
          {latest && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{formatPeriod(latest.periodLabel)}</p>}
          {venue?.commissionRate != null && (
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              {venue.commissionRate}% of {venue.shareType === 'profit' ? 'Profit' : 'Revenue'}
            </p>
          )}
        </div>
        <div className="card rounded-2xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Machine</p>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{machine ? machine.model : '—'}</p>
          {machine && (
            <span className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
              machine.status === 'active'      ? 'bg-green-100 text-green-700' :
              machine.status === 'maintenance' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-slate-100 text-slate-500'
            }`}>
              {machine.status.charAt(0).toUpperCase() + machine.status.slice(1)}
            </span>
          )}
        </div>
      </div>

      {latest && (
        <div className="card rounded-2xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">Most Recent Statement</p>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="font-bold text-slate-900 dark:text-white">{formatPeriod(latest.periodLabel)}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Total sales: <span className="font-semibold text-slate-700 dark:text-slate-200">${latest.totalSales.toFixed(2)}</span>
                {' · '}
                Your share: <span className="font-semibold text-green-600">${latest.venueShare.toFixed(2)}</span>
              </p>
            </div>
            {latest.pdfUrl && (
              <a href={latest.pdfUrl} target="_blank" rel="noopener noreferrer"
                className="btn-primary text-sm py-2 px-5">
                Download PDF
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
