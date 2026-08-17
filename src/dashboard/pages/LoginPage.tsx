import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import circleTransparent from '../../assets/logos/circle-transparent.webp'

const ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-credential':   'Incorrect email or password.',
  'auth/user-not-found':       'Incorrect email or password.',
  'auth/wrong-password':       'Incorrect email or password.',
  'auth/too-many-requests':    'Too many attempts. Please wait a moment.',
  'auth/invalid-email':        'Please enter a valid email address.',
}

export default function LoginPage() {
  const { user, signIn } = useAuth()
  const navigate = useNavigate()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState<string | null>(null)
  const [loading,  setLoading]  = useState(false)

  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/dashboard/admin' : '/dashboard/venue', { replace: true })
    }
  }, [user, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signIn(email, password)
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? ''
      setError(ERROR_MESSAGES[code] ?? 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4 relative overflow-hidden">
      {/* Neon glow backdrop */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-neon-violet/20 blur-[120px]" />
      <div className="absolute -bottom-40 -right-20 w-[420px] h-[420px] rounded-full bg-neon-blue/20 blur-[120px]" />

      <div className="w-full max-w-sm relative z-10">
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src={circleTransparent}
            alt="Nick's Vending"
            className="h-28 w-auto object-contain mb-6 [filter:drop-shadow(0_0_20px_rgba(139,92,246,0.4))]"
          />
          <p className="text-xs font-semibold uppercase tracking-widest text-neon-violet mb-1">
            Nick's Vending
          </p>
          <h1 className="text-2xl font-brand font-black text-white">Owner Portal</h1>
          <p className="text-sm text-white/50 mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-ink-border bg-ink-elevated p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-2.5 rounded-lg border border-ink-border bg-ink text-white text-sm
                focus:outline-none focus:ring-2 focus:ring-neon-violet focus:border-transparent
                placeholder:text-white/30"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-2.5 rounded-lg border border-ink-border bg-ink text-white text-sm
                focus:outline-none focus:ring-2 focus:ring-neon-violet focus:border-transparent
                placeholder:text-white/30"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-neon-gradient hover:shadow-neon text-white inline-flex items-center gap-2 rounded-lg font-semibold transition-all duration-200 w-full justify-center py-3 text-sm disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-neon-violet transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Nick's Vending
          </Link>
        </div>
      </div>
    </div>
  )
}
