import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('dashboard-dark') === 'true')

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('dashboard-dark', String(isDark))
    return () => { document.documentElement.classList.remove('dark') }
  }, [isDark])

  return { isDark, toggleDark: () => setIsDark(d => !d) }
}
