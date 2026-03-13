import { useVenueData } from '../../hooks/useVenueData'

const DOCS = [
  { label: 'Responsible Vendor License', staticUrl: '/rv-license.pdf', key: null },
  { label: 'Contract',                   staticUrl: null, key: 'contractUrl' },
  { label: 'Operator Permit',            staticUrl: null, key: 'operatorPermitUrl' },
  { label: 'Retail Dealer Permit',       staticUrl: null, key: 'retailDealerPermitUrl' },
  { label: 'Vending Machine Permit',     staticUrl: null, key: 'vendingMachinePermitUrl' },
] as const

export default function VenueCompliance() {
  const { venue, loading } = useVenueData()

  if (loading) {
    return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-brand-700 border-t-transparent rounded-full animate-spin" /></div>
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6">Compliance</h1>

      <div className="card rounded-2xl divide-y divide-slate-100 dark:divide-slate-700 overflow-hidden">
        {DOCS.map(({ label, staticUrl, key }) => {
          const url = staticUrl ?? (key ? venue?.[key] : null)
          return (
            <div key={label} className="flex items-center justify-between px-6 py-4 gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{label}</p>
                {!url && <p className="text-xs text-slate-400 mt-0.5">Not on file yet</p>}
              </div>
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
