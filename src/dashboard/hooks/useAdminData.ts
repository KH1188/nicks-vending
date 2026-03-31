import { useState, useEffect } from 'react'
import { collection, getDocsFromServer, orderBy, query } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import type { Venue, Machine, Statement } from './useVenueData'

export interface VenueUser {
  id:          string
  uid:         string
  email:       string
  displayName: string
  venueIds:    string[]
  createdAt:   Date
}

export function useAdminData() {
  const [venues,     setVenues]     = useState<Venue[]>([])
  const [machines,   setMachines]   = useState<Machine[]>([])
  const [statements, setStatements] = useState<Statement[]>([])
  const [users,      setUsers]      = useState<VenueUser[]>([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState<string | null>(null)
  const [tick,       setTick]       = useState(0)

  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      try {
        const [venuesSnap, machinesSnap, statementsSnap, usersSnap] = await Promise.all([
          getDocsFromServer(query(collection(db, 'venues'), orderBy('name'))),
          getDocsFromServer(collection(db, 'machines')),
          getDocsFromServer(query(collection(db, 'statements'), orderBy('uploadedAt', 'desc'))),
          getDocsFromServer(collection(db, 'users')),
        ])

        setVenues(venuesSnap.docs.map(d => ({ id: d.id, ...d.data() } as Venue)))
        setMachines(machinesSnap.docs.map(d => ({
          id: d.id, ...d.data(),
          placedAt: d.data().placedAt?.toDate() ?? new Date(),
        } as Machine)))
        setStatements(statementsSnap.docs.map(d => ({
          id: d.id, ...d.data(),
          uploadedAt: d.data().uploadedAt?.toDate() ?? new Date(),
        } as Statement)))
        setUsers(usersSnap.docs
          .filter(d => d.data().role === 'venue_owner')
          .map(d => {
            const data = d.data()
            // Backward-compat: old docs have venueId (string), new docs have venueIds (array)
            const venueIds: string[] =
              data.venueIds ?? (data.venueId ? [data.venueId] : [])
            return {
              id: d.id, uid: d.id,
              email:       data.email       ?? '',
              displayName: data.displayName ?? '',
              venueIds,
              createdAt: data.createdAt?.toDate() ?? new Date(),
            } as VenueUser
          }))

      } catch (e) {
        setError('Failed to load data.')
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [tick])

  const refresh = () => setTick(t => t + 1)

  return { venues, machines, statements, users, loading, error, refresh }
}
