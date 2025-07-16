'use client'

import { useState } from 'react'

interface AddTaskFormProps {
  status: 'in-progress' | 'reviewed' | 'completed'
  onClose: () => void
  onAdd: () => void
}

export default function AddTaskForm({ status, onClose, onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Important')
  const [impact, setImpact] = useState('medio')
  const [probabilidad, setProbabilidad] = useState('medio')

  const calcularNivelRiesgo = (impacto: string, prob: string): string => {
    const niveles = {
      bajo: 1,
      medio: 2,
      alto: 3,
    }
    const total = niveles[impacto as keyof typeof niveles] + niveles[prob as keyof typeof niveles]
    if (total >= 5) return 'crítico'
    if (total === 4) return 'alto'
    if (total === 3) return 'medio'
    return 'bajo'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const riesgo = calcularNivelRiesgo(impact, probabilidad)
    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      impact,
      probabilidad,
      riesgo,
      comments: 0,
      views: 0,
      users: ["https://i.pravatar.cc/40?img=12"],
      status
    }

    const tasks = JSON.parse(localStorage.getItem('kanban-tasks') || '[]')
    tasks.push(newTask)
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks))
    onAdd()
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-white rounded-lg mb-4 border border-gray-200 shadow-sm">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full px-3 py-2 mb-2 rounded border text-gray-800"
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="w-full px-3 py-2 mb-2 rounded border text-gray-800"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full px-3 py-2 mb-2 rounded border text-gray-800"
      >
        <option value="Important">Important</option>
        <option value="OK">OK</option>
        <option value="Meh">Meh</option>
      </select>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <select
          value={impact}
          onChange={(e) => setImpact(e.target.value)}
          className="w-full px-3 py-2 rounded border text-gray-800"
        >
          <option value="bajo">Impacto Bajo</option>
          <option value="medio">Impacto Medio</option>
          <option value="alto">Impacto Alto</option>
        </select>

        <select
          value={probabilidad}
          onChange={(e) => setProbabilidad(e.target.value)}
          className="w-full px-3 py-2 rounded border text-gray-800"
        >
          <option value="bajo">Probabilidad Baja</option>
          <option value="medio">Probabilidad Media</option>
          <option value="alto">Probabilidad Alta</option>
        </select>
      </div>

      <div className="flex justify-between">
        <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">
          Agregar
        </button>
        <button type="button" onClick={onClose} className="text-sm text-gray-400 hover:text-red-500">
          Cancelar
        </button>
      </div>
    </form>
  )
}
