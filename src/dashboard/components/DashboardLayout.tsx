import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from './DashboardSidebar'
import DashboardTopbar from './DashboardTopbar'
import { useDarkMode } from '../hooks/useDarkMode'
import logo from '../../assets/logo.png'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isDark, toggleDark } = useDarkMode()

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — fixed on desktop, slide-over on mobile */}
      <div className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-200 lg:relative lg:translate-x-0 lg:flex lg:shrink-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <DashboardSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <DashboardTopbar
          onMenuClick={() => setSidebarOpen(true)}
          isDark={isDark}
          toggleDark={toggleDark}
        />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 relative">
          <img
            src={logo}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain opacity-70 dark:invert blur-[2px] pointer-events-none select-none"
          />
          <div className="relative z-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
