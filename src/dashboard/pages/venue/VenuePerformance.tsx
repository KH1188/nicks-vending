import { useVenueData, formatPeriod } from '../../hooks/useVenueData'

export default function VenuePerformance() {
  const { venue, statements, loading } = useVenueData()

  if (loading) {
    return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-brand-700 border-t-transparent rounded-full animate-spin" /></div>
  }

  const totalGross    = statements.reduce((sum, s) => sum + s.totalSales, 0)
  const totalEarned   = statements.reduce((sum, s) => sum + s.venueShare, 0)
  const avgMonthly    = statements.length ? totalEarned / statements.length : 0
  const commissionRate = venue?.commissionRate ?? null

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6">Revenue</h1>

      {/* Summary stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card rounded-2xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Total Earned</p>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">${totalEarned.toFixed(2)}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">All time</p>
        </div>
        <div className="card rounded-2xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Gross Revenue</p>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">${totalGross.toFixed(2)}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">All time</p>
        </div>
        <div className="card rounded-2xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Avg Monthly Payout</p>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">${avgMonthly.toFixed(2)}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Over {statements.length} {statements.length === 1 ? 'month' : 'months'}</p>
        </div>
        <div className="card rounded-2xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Your Commission</p>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{commissionRate !== null ? `${commissionRate}%` : '—'}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Of gross revenue</p>
        </div>
      </div>

      {/* Statement history */}
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Monthly Breakdown</h2>
      {statements.length === 0 ? (
        <div className="card rounded-2xl p-12 text-center">
          <p className="text-slate-400 text-sm">No statements yet. Check back after your first payout.</p>
        </div>
      ) : (
        <div className="card rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
                <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Period</th>
                <th className="text-right px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Gross Revenue</th>
                <th className="text-right px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 hidden sm:table-cell">Nick's Cut</th>
                <th className="text-right px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Your Share</th>
                <th className="px-6 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {statements.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">{formatPeriod(s.periodLabel)}</td>
                  <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300">${s.totalSales.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right text-slate-500 dark:text-slate-400 hidden sm:table-cell">${(s.totalSales - s.venueShare).toFixed(2)}</td>
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
