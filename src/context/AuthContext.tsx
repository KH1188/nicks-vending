import { createContext, useContext, useEffect, useState } from 'react'
import { signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'

export type UserRole = 'admin' | 'venue_owner'

export interface UserProfile {
  uid:         string
  email:       string
  displayName: string
  role:        UserRole
  venueIds:    string[]   // all venues this owner manages
}

interface AuthContextValue {
  user:             UserProfile | null
  loading:          boolean
  activeVenueId:    string | null
  setActiveVenueId: (id: string) => void
  signIn:           (email: string, password: string) => Promise<void>
  signOut:          () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user,          setUser]          = useState<UserProfile | null>(null)
  const [loading,       setLoading]       = useState(true)
  const [activeVenueId, setActiveVenueId] = useState<string | null>(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const snap = await getDoc(doc(db, 'users', firebaseUser.uid))
        if (snap.exists()) {
          const data = snap.data()
          // Backward-compat: old docs have venueId (string), new docs have venueIds (array)
          const venueIds: string[] =
            data.venueIds ?? (data.venueId ? [data.venueId] : [])
          setUser({
            uid:         firebaseUser.uid,
            email:       firebaseUser.email ?? '',
            displayName: data.displayName ?? '',
            role:        data.role,
            venueIds,
          })
          setActiveVenueId(prev => venueIds.includes(prev ?? '') ? prev : (venueIds[0] ?? null))
        } else {
          setUser(null)
          setActiveVenueId(null)
        }
      } else {
        setUser(null)
        setActiveVenueId(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signOut = async () => {
    await firebaseSignOut(auth)
    setUser(null)
    setActiveVenueId(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, activeVenueId, setActiveVenueId, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
