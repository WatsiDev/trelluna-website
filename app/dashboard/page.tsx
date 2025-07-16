'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/organisms/Sidebar'
import Topbar from '@/components/organisms/Topbar'
import KanbanColumn from '@/components/organisms/KanbanColumn'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('kanban-user')
    if (!user) router.push('/login')
  }, [router])

  return (
    <main className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <section className="flex-1 p-6 overflow-x-auto">
        <Topbar />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <KanbanColumn title="In Progress" status="in-progress" />
          <KanbanColumn title="Reviewed" status="reviewed" />
          <KanbanColumn title="Completed" status="completed" />
        </div>
      </section>
    </main>
  )
}