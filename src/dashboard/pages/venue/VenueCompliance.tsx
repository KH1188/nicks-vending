import { useVenueData } from '../../hooks/useVenueData'

const DOCS = [
  { label: 'Responsible Vendor License', file: null, staticUrl: '/rv-license.pdf' },
  { label: 'Contract',                   file: 'contract.pdf',               staticUrl: null },
  { label: 'Operator Permit',            file: 'operator-permit.pdf',        staticUrl: null },
  { label: 'Vending Machine Permit',     file: 'vending-machine-permit.pdf', staticUrl: null },
]

export default function VenueCompliance() {
  const { venue, loading } = useVenueData()

  if (loading) {
    return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-brand-700 border-t-transparent rounded-full animate-spin" /></div>
  }

  const rdpExpiry = venue?.rdpExpiryDate
  const rdpDays = rdpExpiry ? Math.floor((new Date(rdpExpiry).getTime() - Date.now()) / 86400000) : null
  const rdpBadge = rdpDays === null ? null
    : rdpDays < 0   ? { label: 'Expired',       cls: 'bg-red-100 text-red-600' }
    : rdpDays <= 60 ? { label: 'Expiring Soon',  cls: 'bg-yellow-100 text-yellow-700' }
    :                 { label: 'Valid',           cls: 'bg-green-100 text-green-700' }

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6">Compliance</h1>

      {/* Documents */}
      <div className="card rounded-2xl divide-y divide-slate-100 dark:divide-slate-700 overflow-hidden mb-6">
        {DOCS.map(({ label, file, staticUrl }) => {
          const url = staticUrl ?? (venue?.complianceSlug && file ? `/compliance/${venue.complianceSlug}/${file}` : null)
          return (
            <div key={label} className="flex items-center justify-between px-6 py-4 gap-4">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{label}</p>
              {url
                ? <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors flex-shrink-0">View PDF</a>
                : <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400">Pending</span>
              }
            </div>
          )
        })}
      </div>

      {/* Retail Dealer Permit status */}
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Retail Dealer Permit</h2>
      <div className="card rounded-2xl p-6">
        <dl className="grid sm:grid-cols-3 gap-4 text-sm">
          <div>
            <dt className="text-slate-500 dark:text-slate-400 mb-0.5">Parish</dt>
            <dd className="font-semibold text-slate-900 dark:text-slate-100">{venue?.parish || '—'}</dd>
          </div>
          <div>
            <dt className="text-slate-500 dark:text-slate-400 mb-0.5">Issue Date</dt>
            <dd className="font-semibold text-slate-900 dark:text-slate-100">
              {venue?.rdpIssueDate ? new Date(venue.rdpIssueDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—'}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500 dark:text-slate-400 mb-0.5">Expiry Date</dt>
            <dd className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {rdpExpiry ? new Date(rdpExpiry + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—'}
              </span>
              {rdpBadge && (
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${rdpBadge.cls}`}>{rdpBadge.label}</span>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
