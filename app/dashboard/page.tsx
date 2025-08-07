'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/organisms/Sidebar'
import Topbar from '@/components/organisms/Topbar'
import KanbanColumn from '@/components/organisms/KanbanColumn'
import AddColumnForm from '@/components/molecules/AddColumnForm'
import { motion } from 'framer-motion'
import type { Task } from '@/components/organisms/KanbanColumn'
import { Menu } from 'lucide-react'

interface Column {
  id: number
  name: 'in-progress' | 'reviewed' | 'completed'
}

export default function DashboardPage() {
  const router = useRouter()
  const [columns, setColumns] = useState<Column[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [showModal, setShowModal] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('kanban-user')
    if (!user) router.push('/login')
  }, [router])

  const fetchColumns = () => {
    fetch('https://kanban-api-production-a195.up.railway.app/api/columns')
      .then((res) => res.json())
      .then(setColumns)
      .catch(console.error)
  }

  useEffect(() => {
    fetchColumns()

    fetch('https://kanban-api-production-a195.up.railway.app/api/tasks')
      .then((res) => res.json())
      .then((data) => {
        const rawTasks = Array.isArray(data) ? data : data.tasks || []

        const parsed: Task[] = rawTasks.map((t: any) => ({
          ...t,
          id: t.id?.toString() || crypto.randomUUID(),
          priority: t.priority || 'Important',
          comments: t.comments ?? 0,
          views: t.views ?? 0,
          users: Array.isArray(t.users) ? t.users : ['https://i.pravatar.cc/40?img=12'],
          status: t.status || 'in-progress',
          fileName: t.fileName ?? null,
        }))

        setTasks(parsed)
      })
      .catch(console.error)
  }, [])

  const getTasksForColumn = (columnId: number) =>
    tasks.filter((task: any) => task.column_id === columnId)

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-gradient-to-tr from-gray-100 to-gray-200">
      {/* Sidebar para móvil */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden" onClick={() => setShowSidebar(false)}>
          <div className="w-64 bg-white h-full" onClick={(e) => e.stopPropagation()}>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Sidebar oculto en móvil */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <section className="flex-1 px-4 sm:px-6 py-4 overflow-y-auto relative">
        {/* Botón de menú solo en móvil */}
        <div className="md:hidden flex justify-end mb-2">
          <button onClick={() => setShowSidebar(true)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Topbar />
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 mb-4 gap-4 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-700 text-center sm:text-left">
            Kanban Dashboard
          </h1>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="w-full sm:w-auto bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition"
            onClick={() => setShowModal(true)}
          >
            + Nueva lista
          </motion.button>
        </div>

        <motion.div
          id="kanban-board"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {columns.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="rounded-xl"
            >
              <KanbanColumn
                title={col.name}
                status={col.name}
                columnId={col.id}
                tasks={getTasksForColumn(col.id)}
                onAdd={() => {}}
                onClose={() => {}}
              />
            </motion.div>
          ))}
        </motion.div>

        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <AddColumnForm
              onAdd={fetchColumns}
              onClose={() => setShowModal(false)}
            />
          </div>
        )}
      </section>
    </main>
  )
}
