'use client'

import { useEffect, useState } from 'react'
import TaskCard from '@/components/molecules/TaskCard'
import AddTaskForm from '@/components/molecules/AddTaskForm'

interface KanbanColumnProps {
  title: string
  status: 'in-progress' | 'reviewed' | 'completed'
}

export default function KanbanColumn({ title, status }: KanbanColumnProps) {
  const [showForm, setShowForm] = useState(false)
  const [tasks, setTasks] = useState<any[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('kanban-tasks') || '[]')
    setTasks(stored.filter((t: any) => t.status === status))
  }, [showForm])

  const colorMap = {
    'in-progress': 'bg-purple-600',
    reviewed: 'bg-yellow-500',
    completed: 'bg-green-500'
  }[status]

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className={`${colorMap} text-white px-3 py-1 rounded-full text-xs`}>
            {tasks.length}
          </span>
          <h2 className="font-bold text-lg">{title}</h2>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="text-xl font-bold text-gray-400 hover:text-gray-600">
          {showForm ? '-' : '+'}
        </button>
      </div>

      {showForm && (
        <AddTaskForm
          status={status}
          onClose={() => setShowForm(false)}
          onAdd={() => {
            const stored = JSON.parse(localStorage.getItem('kanban-tasks') || '[]')
            setTasks(stored.filter((t: any) => t.status === status))
          }}
        />
      )}

      {tasks.length === 0 ? (
        <p className="text-sm text-gray-400">No hay tareas</p>
      ) : (
        tasks.map((task: any) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  )
}
