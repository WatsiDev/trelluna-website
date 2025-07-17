'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  ListTodo,
  Users,
  Package,
  CreditCard,
  Settings,
  HelpCircle,
  AlertCircle,
  LogOut,
  X
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Sidebar() {
  const pathname = usePathname()
  const [user, setUser] = useState<{ email?: string }>({})

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('kanban-user') || '{}')
    setUser(storedUser)
  }, [])

  const isActive = (path: string) =>
    pathname === path ? 'text-purple-600 font-semibold' : 'text-gray-700'

  const logout = () => {
    localStorage.removeItem('kanban-user')
    window.location.href = '/login'
  }

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-64 bg-white shadow-md p-5 flex flex-col justify-between min-h-screen"
    >
      <div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-2xl font-bold mb-6"
        >
          <div className="bg-purple-600 text-white rounded-full h-8 w-8 flex items-center justify-center">T</div>
          <span>trelluna</span>
        </motion.div>

        <input
          type="text"
          placeholder="Buscar..."
          className="w-full mb-5 px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
        />

        <nav className="space-y-4 text-sm">
          <SidebarLink href="/dashboard" label="Home" icon={<Home size={16} />} badge="10" active={isActive('/dashboard')} />
          <SidebarLink href="/dashboard?tab=tasks" label="Tasks" icon={<ListTodo size={16} />} active={isActive('/dashboard?tab=tasks')} />
          <SidebarLink href="/users" label="Users" icon={<Users size={16} />} badge="2" active={isActive('/users')} />
          <SidebarLink href="/apis" label="APIs" icon={<Package size={16} />} active={isActive('/apis')} />
          <SidebarLink href="/subscription" label="Subscription" icon={<CreditCard size={16} />} active={isActive('/subscription')} />
          <SidebarLink href="/settings" label="Settings" icon={<Settings size={16} />} active={isActive('/settings')} />
          <SidebarLink href="/help" label="Help & Support" icon={<HelpCircle size={16} />} active={isActive('/help')} />
        </nav>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-6 mt-6"
      >
        <div className="relative bg-gray-100 p-4 rounded-xl text-sm text-gray-600 hover:shadow-md transition">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2">
              <AlertCircle size={20} />
              <p className="leading-tight">
                Enjoy unlimited access to our app with only a small price monthly.
              </p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 text-sm">
              <X size={14} />
            </button>
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
            className="text-gray-400 hover:text-red-500 transition"
          >
            <LogOut size={18} />
          </button>
        </div>
      </motion.div>
    </motion.aside>
  )
}

function SidebarLink({
  href,
  label,
  icon,
  active,
  badge
}: {
  href: string
  label: string
  icon: React.ReactNode
  active: string
  badge?: string
}) {
  return (
    <Link href={href} className={`flex justify-between items-center ${active}`}>
      <span className="flex items-center gap-2">
        {icon} {label}
      </span>
      {badge && (
        <span className="bg-purple-100 text-purple-600 text-xs px-2 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  )
}
