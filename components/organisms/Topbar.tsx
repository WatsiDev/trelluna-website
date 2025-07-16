'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Topbar() {
  const pathname = usePathname()

  const tabStyle = (path: string) =>
    pathname === path
      ? 'pb-2 border-b-2 border-purple-600 text-purple-600 font-medium'
      : 'pb-2 text-gray-500 hover:text-purple-600'

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">Kanban Dashboard 🐌</h1>
        <div className="flex space-x-4 mt-2 border-b">
          <Link href="/dashboard">
            <button className={tabStyle('/dashboard')}>By Total Tasks</button>
          </Link>
          <Link href="/dashboard?tab=status">
            <button className={tabStyle('/dashboard?tab=status')}>By Status</button>
          </Link>
          <Link href="/dashboard?tab=due">
            <button className={tabStyle('/dashboard?tab=due')}>Tasks Due</button>
          </Link>
          <Link href="/dashboard?tab=extra">
            <button className={tabStyle('/dashboard?tab=extra')}>Extra Tasks</button>
          </Link>
          <Link href="/dashboard?tab=completed">
            <button className={tabStyle('/dashboard?tab=completed')}>Tasks Completed</button>
          </Link>
          <Link href="/risk">
            <button className="pb-2 text-red-600 hover:underline">Ver Matriz de Riesgo</button>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">Share</button>
        <button className="bg-gray-100 px-4 py-2 rounded-lg">+</button>
      </div>
    </div>
  )
}
