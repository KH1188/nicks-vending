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

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6">Compliance</h1>

      <div className="card rounded-2xl divide-y divide-slate-100 dark:divide-slate-700 overflow-hidden">
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
    </div>
  )
}
