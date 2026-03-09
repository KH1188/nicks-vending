import { useVenueData } from '../../hooks/useVenueData'

const STATUS_STYLES = {
  active:      'bg-green-100 text-green-700',
  maintenance: 'bg-yellow-100 text-yellow-700',
  inactive:    'bg-slate-100 text-slate-500',
}

const MODEL_URLS: Record<string, string> = {
  'Slim Wall':           '/machines/slim-wall',
  'Mega Wall':           '/machines/mega-wall',
  'Slim Tower':          '/machines/slim-tower',
  'Mini Wall':           '/machines/mini-wall',
  'Slim Wall – Tin Lift': '/machines/slim-wall-tin-lift',
  'WeatherWall':         '/machines/weather-wall',
}

export default function VenueMachines() {
  const { machines, loading } = useVenueData()

  if (loading) {
    return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-brand-700 border-t-transparent rounded-full animate-spin" /></div>
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900 mb-6">My Machine</h1>

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
                  <h2 className="text-xl font-bold text-slate-900">{m.model}</h2>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_STYLES[m.status]}`}>
                  {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
                </span>
              </div>

              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Serial Number</dt>
                  <dd className="font-semibold text-slate-900">{m.serialNumber || '—'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Placed</dt>
                  <dd className="font-semibold text-slate-900">
                    {m.placedAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </dd>
                </div>
              </dl>

              {MODEL_URLS[m.model] && (
                <a href={MODEL_URLS[m.model]}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors">
                  View machine details
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
