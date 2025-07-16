'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  const user = JSON.parse(localStorage.getItem('kanban-user') || '{}')

  const isActive = (path: string) =>
    pathname === path ? 'text-purple-600 font-semibold' : 'text-gray-700'

  const logout = () => {
    localStorage.removeItem('kanban-user')
    window.location.href = '/login'
  }

  return (
    <aside className="w-64 bg-white shadow-md p-5 flex flex-col justify-between min-h-screen">
      <div>
        <div className="flex items-center gap-2 text-2xl font-bold mb-6">
          <div className="bg-purple-600 text-white rounded-full h-8 w-8 flex items-center justify-center">S</div>
          <span>slothui</span>
        </div>

        <input
          type="text"
          placeholder="Buscar..."
          className="w-full mb-5 px-4 py-2 border rounded-lg bg-gray-100"
        />

        <nav className="space-y-4 text-sm">
          <Link href="/dashboard" className={`flex justify-between items-center ${isActive('/dashboard')}`}>
            <span className="flex items-center gap-2">🏠 Home</span>
            <span className="bg-purple-100 text-purple-600 text-xs px-2 rounded-full">10</span>
          </Link>

          <Link href="/dashboard?tab=tasks" className={`flex items-center gap-2 ${isActive('/dashboard?tab=tasks')}`}>
            📋 Tasks
          </Link>

          <Link href="/users" className={`flex justify-between items-center ${isActive('/users')}`}>
            <span className="flex items-center gap-2">👥 Users</span>
            <span className="bg-purple-100 text-purple-600 text-xs px-2 rounded-full">2</span>
          </Link>

          <Link href="/apis" className={`flex items-center gap-2 ${isActive('/apis')}`}>📦 APIs</Link>
          <Link href="/subscription" className={`flex items-center gap-2 ${isActive('/subscription')}`}>💳 Subscription</Link>
          <Link href="/settings" className={`flex items-center gap-2 ${isActive('/settings')}`}>⚙️ Settings</Link>
          <Link href="/help" className={`flex items-center gap-2 ${isActive('/help')}`}>❓ Help & Support</Link>
        </nav>
      </div>

      <div className="space-y-6 mt-6">
        <div className="relative bg-gray-100 p-4 rounded-xl text-sm text-gray-600">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2">
              <div className="text-xl">⚠️</div>
              <p className="leading-tight">
                Enjoy unlimited access to our app with only a small price monthly.
              </p>
            </div>
            <button className="text-xl text-gray-400 hover:text-gray-600">✖</button>
          </div>
          <div className="mt-2 text-right">
            <a href="#" className="text-purple-600 font-semibold hover:underline">Go Pro</a>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://i.pravatar.cc/40?img=11" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold text-sm">{user.email || 'Usuario'}</p>
              <p className="text-xs text-gray-500">Basic Member</p>
            </div>
          </div>
          <button
            onClick={logout}
            title="Cerrar sesión"
            className="text-gray-400 hover:text-red-500 text-xl"
          >↗</button>
        </div>
      </div>
    </aside>
  )
}