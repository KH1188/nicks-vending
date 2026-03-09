import { Navigate } from 'react-router-dom'
import { useAuth, UserRole } from '../../context/AuthContext'

interface Props {
  children: React.ReactNode
  requiredRole: UserRole
}

export default function ProtectedRoute({ children, requiredRole }: Props) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-brand-700 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  if (user.role !== requiredRole) {
    return <Navigate to={user.role === 'admin' ? '/dashboard/admin' : '/dashboard/venue'} replace />
  }

  return <>{children}</>
}
