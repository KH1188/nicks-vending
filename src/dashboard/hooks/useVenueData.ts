import { useState, useEffect } from 'react'
import { collection, doc, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useAuth } from '../../context/AuthContext'

export interface Venue {
  id:           string
  name:         string
  address:      string
  contactName:  string
  contactPhone: string
  notes:        string
}

export interface Machine {
  id:           string
  venueId:      string
  model:        string
  serialNumber: string
  placedAt:     Date
  status:       'active' | 'inactive' | 'maintenance'
  notes:        string
}

export interface Statement {
  id:          string
  venueId:     string
  periodLabel: string
  totalSales:  number
  venueShare:  number
  pdfUrl:      string
  pdfPath:     string
  uploadedAt:  Date
  notes:       string
}

export function useVenueData() {
  const { user } = useAuth()
  const [venue,      setVenue]      = useState<Venue | null>(null)
  const [machines,   setMachines]   = useState<Machine[]>([])
  const [statements, setStatements] = useState<Statement[]>([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState<string | null>(null)

  useEffect(() => {
    if (!user?.venueId) return

    async function fetchData() {
      try {
        const venueId = user!.venueId!

        const venueSnap = await getDoc(doc(db, 'venues', venueId))
        if (venueSnap.exists()) {
          setVenue({ id: venueSnap.id, ...venueSnap.data() } as Venue)
        }

        const machinesSnap = await getDocs(
          query(collection(db, 'machines'), where('venueId', '==', venueId))
        )
        setMachines(machinesSnap.docs.map(d => ({
          id: d.id,
          ...d.data(),
          placedAt: d.data().placedAt?.toDate() ?? new Date(),
        } as Machine)))

        const statementsSnap = await getDocs(
          query(collection(db, 'statements'), where('venueId', '==', venueId), orderBy('uploadedAt', 'desc'))
        )
        setStatements(statementsSnap.docs.map(d => ({
          id: d.id,
          ...d.data(),
          uploadedAt: d.data().uploadedAt?.toDate() ?? new Date(),
        } as Statement)))

      } catch (e) {
        setError('Failed to load data.')
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user?.venueId])

  return { venue, machines, statements, loading, error }
}
