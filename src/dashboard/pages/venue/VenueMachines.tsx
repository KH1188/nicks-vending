import { Link } from 'react-router-dom'
import { useVenueData, formatPeriod } from '../../hooks/useVenueData'

const STATUS_STYLES = {
  active:      'bg-green-100 text-green-700',
  maintenance: 'bg-yellow-100 text-yellow-700',
  inactive:    'bg-slate-100 text-slate-500',
}

export default function VenueMachines() {
  const { machines, statements, loading } = useVenueData()

  if (loading) {
    return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-brand-700 border-t-transparent rounded-full animate-spin" /></div>
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6">My Machine</h1>

      {machines.length === 0 ? (
        <div className="card rounded-2xl p-12 text-center">
          <p className="text-slate-400 text-sm">No machines on record yet.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {machines.map(m => (
            <div key={m.id} className="card rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-700 mb-1">Smart Machine</p>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{m.model}</h2>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_STYLES[m.status]}`}>
                  {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
                </span>
              </div>

              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500 dark:text-slate-400">Serial Number</dt>
                  <dd className="font-semibold text-slate-900 dark:text-slate-100">{m.serialNumber || '—'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500 dark:text-slate-400">Placed</dt>
                  <dd className="font-semibold text-slate-900 dark:text-slate-100">
                    {m.placedAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </dd>
                </div>
              </dl>

              <Link to="/dashboard/venue/performance"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors">
                View revenue & statements
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      )}
      {/* Statement history */}
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-10 mb-3">Statement History</h2>
      {statements.length === 0 ? (
        <div className="card rounded-2xl p-10 text-center">
          <p className="text-slate-400 text-sm">No statements yet. Check back after your first payout.</p>
        </div>
      ) : (
        <div className="card rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
                <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Period</th>
                <th className="text-right px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 hidden sm:table-cell">Gross Revenue</th>
                <th className="text-right px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Your Share</th>
                <th className="px-6 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {statements.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">{formatPeriod(s.periodLabel)}</td>
                  <td className="px-6 py-4 text-right text-slate-500 dark:text-slate-400 hidden sm:table-cell">${s.totalSales.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right font-semibold text-green-600">${s.venueShare.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    {s.pdfUrl && (
                      <a href={s.pdfUrl} target="_blank" rel="noopener noreferrer"
                        className="text-brand-700 hover:text-brand-900 font-semibold transition-colors">
                        PDF
                      </a>
                    )}
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
