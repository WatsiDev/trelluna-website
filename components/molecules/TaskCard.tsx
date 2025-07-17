'use client'

import { useState } from 'react'

interface TaskCardProps {
  task: {
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
  onTaskUpdate?: () => void
}

const riesgoColor = {
  bajo: 'bg-green-100 text-green-700',
  medio: 'bg-yellow-100 text-yellow-700',
  alto: 'bg-orange-100 text-orange-700',
  crítico: 'bg-red-100 text-red-700'
}

export default function TaskCard({ task, onTaskUpdate }: TaskCardProps) {
  const [showCommit, setShowCommit] = useState(false)
  const [commitText, setCommitText] = useState('')

  const handleComplete = () => {
    const tasks = JSON.parse(localStorage.getItem('kanban-tasks') || '[]')
    const updatedTasks = tasks.filter((t: any) => t.id !== task.id)
    localStorage.setItem('kanban-tasks', JSON.stringify(updatedTasks))
    setShowCommit(false)
    onTaskUpdate && onTaskUpdate()
  }

  return (
    <div className="bg-white p-4 rounded-lg mb-4 shadow transition hover:shadow-lg">
      <div className="flex justify-between mb-2 items-center">
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
          {task.priority}
        </span>
        {task.riesgo && (
          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${riesgoColor[task.riesgo as keyof typeof riesgoColor]}`}>
            Riesgo: {task.riesgo}
          </span>
        )}
      </div>

      <h3 className="text-base font-bold text-gray-800 mb-1 break-words">
        {task.title}
      </h3>
      <p className="text-sm text-gray-600 break-words">
        {task.description}
      </p>

      {task.dueDate && (
        <p className="text-xs text-gray-500 mt-1">Entrega: {new Date(task.dueDate).toLocaleString()}</p>
      )}
      {task.fileName && (
        <p className="text-xs text-gray-400 mt-1">Archivo: {task.fileName}</p>
      )}

      {showCommit ? (
        <div className="mt-3">
          <textarea
            className="w-full px-2 py-1 border rounded text-sm text-gray-700 mb-2"
            placeholder="¿Qué hiciste en esta tarea?"
            value={commitText}
            onChange={(e) => setCommitText(e.target.value)}
          />
          <div className="flex justify-between">
            <button
              onClick={handleComplete}
              className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Entregar
            </button>
            <button
              onClick={() => setShowCommit(false)}
              className="text-xs text-red-500 hover:underline"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowCommit(true)}
          className="mt-3 text-xs text-purple-600 hover:underline"
        >
          Marcar como entregada
        </button>
      )}

      <div className="flex justify-between items-center text-xs text-gray-400 mt-3">
        <div className="flex -space-x-1">
          {Array.isArray(task.users) &&
            task.users.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="User"
                className="h-6 w-6 rounded-full border border-white"
              />
            ))}
        </div>
        <div className="flex gap-3">
          <span>💬 {task.comments}</span>
          <span>👁️ {task.views}</span>
        </div>
      </div>
    </div>
  )
}
