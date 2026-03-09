import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import { useVenueData } from '../../hooks/useVenueData'

const STATUS_STYLES = {
  active:      'bg-green-100 text-green-700',
  maintenance: 'bg-yellow-100 text-yellow-700',
  inactive:    'bg-slate-100 text-slate-500',
}

function licenseStatus(expiry: string): 'valid' | 'expiring' | 'expired' | 'none' {
  if (!expiry) return 'none'
  const days = Math.floor((new Date(expiry).getTime() - Date.now()) / 86400000)
  if (days < 0)   return 'expired'
  if (days <= 60) return 'expiring'
  return 'valid'
}

const LICENSE_BADGE: Record<string, string> = {
  valid:    'bg-green-100 text-green-700',
  expiring: 'bg-yellow-100 text-yellow-700',
  expired:  'bg-red-100 text-red-600',
  none:     'bg-slate-100 text-slate-400',
}
const LICENSE_LABEL: Record<string, string> = {
  valid: 'Valid', expiring: 'Expiring Soon', expired: 'Expired', none: 'Not on file',
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
  const [rvLicenseUrl, setRvLicenseUrl] = useState<string | null>(null)

  useEffect(() => {
    getDoc(doc(db, 'settings', 'licenses')).then(snap => {
      if (snap.exists()) setRvLicenseUrl(snap.data().responsibleVendorLicenseUrl ?? null)
    })
  }, [])

  if (loading) {
    return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-brand-700 border-t-transparent rounded-full animate-spin" /></div>
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6">My Machine</h1>

      {rvLicenseUrl && (
        <div className="card rounded-2xl p-5 mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Responsible Vendor License</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">Operator license on file — available for your records.</p>
          </div>
          <a href={rvLicenseUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2 px-4 flex-shrink-0">
            View PDF
          </a>
        </div>
      )}

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

              {/* Compliance */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Compliance</p>
                {(['operator', 'machine'] as const).map(type => {
                  const num    = type === 'operator' ? m.operatorLicenseNumber  : m.machineLicenseNumber
                  const expiry = type === 'operator' ? m.operatorLicenseExpiry  : m.machineLicenseExpiry
                  const status = licenseStatus(expiry)
                  return (
                    <div key={type}>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">{type === 'operator' ? 'Operator License' : 'Machine License'}</p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{num || '—'}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${LICENSE_BADGE[status]}`}>{LICENSE_LABEL[status]}</span>
                        {expiry && <span className="text-xs text-slate-400">Expires {new Date(expiry).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
                      </div>
                    </div>
                  )
                })}
              </div>

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
