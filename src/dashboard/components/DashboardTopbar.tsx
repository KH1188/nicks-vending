import { useAuth } from '../../context/AuthContext'

interface Props { onMenuClick: () => void }

export default function DashboardTopbar({ onMenuClick }: Props) {
  const { user, signOut } = useAuth()

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 shrink-0">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
        aria-label="Open menu"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex items-center gap-4 ml-auto">
        <span className="text-sm text-slate-600 font-medium">{user?.displayName}</span>
        <button
          onClick={signOut}
          className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          Sign out
        </button>
      </div>
    </header>
  )
}
