import { useState, useEffect } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import type { Venue, Machine, Statement } from './useVenueData'

export interface VenueUser {
  id:          string
  uid:         string
  email:       string
  displayName: string
  venueId:     string | null
  createdAt:   Date
}

export function useAdminData() {
  const [venues,     setVenues]     = useState<Venue[]>([])
  const [machines,   setMachines]   = useState<Machine[]>([])
  const [statements, setStatements] = useState<Statement[]>([])
  const [users,      setUsers]      = useState<VenueUser[]>([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [venuesSnap, machinesSnap, statementsSnap, usersSnap] = await Promise.all([
          getDocs(query(collection(db, 'venues'), orderBy('name'))),
          getDocs(collection(db, 'machines')),
          getDocs(query(collection(db, 'statements'), orderBy('uploadedAt', 'desc'))),
          getDocs(collection(db, 'users')),
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
          .map(d => ({
            id: d.id,
            uid: d.id,
            ...d.data(),
            createdAt: d.data().createdAt?.toDate() ?? new Date(),
          } as VenueUser)))

      } catch (e) {
        setError('Failed to load data.')
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const refresh = () => {
    setLoading(true)
    setError(null)
  }

  return { venues, machines, statements, users, loading, error, refresh }
}
