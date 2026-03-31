import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { collection, getDocs, query, where, documentId } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useAuth } from '../../context/AuthContext'

const adminLinks = [
  { label: 'Overview',          href: '/dashboard/admin' },
  { label: 'Venues',            href: '/dashboard/admin/venues' },
  { label: 'Machines',          href: '/dashboard/admin/machines' },
  { label: 'Upload Statement',  href: '/dashboard/admin/statements/new' },
]

const venueLinks = [
  { label: 'Overview',    href: '/dashboard/venue' },
  { label: 'Statements',  href: '/dashboard/venue/statements' },
  { label: 'My Machine',  href: '/dashboard/venue/machines' },
  { label: 'Compliance',  href: '/dashboard/venue/compliance' },
]

interface Props { onClose?: () => void }

export default function DashboardSidebar({ onClose }: Props) {
  const { user, activeVenueId, setActiveVenueId } = useAuth()
  const links = user?.role === 'admin' ? adminLinks : venueLinks

  // Venue names for the switcher — only fetched when owner has multiple venues
  const [venueNames, setVenueNames] = useState<{ id: string; name: string }[]>([])

  useEffect(() => {
    if (!user || user.role !== 'venue_owner' || user.venueIds.length <= 1) return
    getDocs(query(collection(db, 'venues'), where(documentId(), 'in', user.venueIds)))
      .then(snap => setVenueNames(snap.docs.map(d => ({ id: d.id, name: d.data().name as string }))))
      .catch(() => {})
  }, [user])

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white w-64">
      <div className="px-6 py-5 border-b border-slate-700">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-0.5">
          Nick's Vending
        </p>
        <p className="text-sm font-bold text-white">
          {user?.role === 'admin' ? 'Admin Panel' : 'Owner Portal'}
        </p>
      </div>

      {/* Venue switcher — only shown when owner has multiple venues */}
      {user?.role === 'venue_owner' && user.venueIds.length > 1 && venueNames.length > 0 && (
        <div className="px-4 py-3 border-b border-slate-700">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5">Active Venue</p>
          <select
            value={activeVenueId ?? ''}
            onChange={e => { setActiveVenueId(e.target.value); onClose?.() }}
            className="w-full bg-slate-800 text-white text-sm rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-700"
          >
            {venueNames.map(v => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </div>
      )}

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {links.map(({ label, href }) => (
          <NavLink
            key={href}
            to={href}
            end={href.split('/').length === 3}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-700 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-slate-700">
        <a href="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
          ← Back to website
        </a>
      </div>
    </div>
  )
}
