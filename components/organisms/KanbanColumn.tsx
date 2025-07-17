'use client'

import { useEffect, useState } from 'react'
import AddTaskForm from '../molecules/AddTaskForm'
import TaskCard from '../molecules/TaskCard'

export interface Task {
  id: string
  title: string
  description: string
  priority: string
  comments: number
  views: number
  users: string[]
  riesgo?: string
  dueDate?: string
  fileName?: string | null
  status: string
}




export interface KanbanColumnProps {
  title: string
  status: 'in-progress' | 'reviewed' | 'completed'
  columnId: number
  tasks: Task[]
  onAdd: () => void
  onClose: () => void
}


export default function KanbanColumn({
  title,
  status,
  columnId,
  onClose,
  onAdd,
}: KanbanColumnProps) {
  const [showForm, setShowForm] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])

  const loadTasks = () => {
    fetch(`https://kanban-api-production-3916.up.railway.app/api/tasks?column_id=${columnId}`)
      .then((res) => res.json())
      .then(setTasks)
      .catch(console.error)
  }

  useEffect(() => {
    loadTasks()
  }, [columnId])

  return (
    <div className="bg-gray-100 p-4 rounded-lg w-full max-w-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-gray-500 hover:text-black"
        >
          {showForm ? '-' : '+'}
        </button>
      </div>

      {showForm && (
        <AddTaskForm
          columnId={columnId}
          onClose={() => setShowForm(false)}
          onAdd={() => {
            loadTasks()
            onAdd()
          }}
        />
      )}

      {tasks.length === 0 ? (
        <p className="text-sm text-gray-400">No hay tareas pendientes por ahora</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} onTaskUpdate={loadTasks} />
        ))
      )}
    </div>
  )
}//ultima vvizualizacion
