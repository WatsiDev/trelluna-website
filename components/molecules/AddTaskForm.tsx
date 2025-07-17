'use client'

import { useState } from 'react'

interface AddTaskFormProps {
  columnId: number
  onClose: () => void
  onAdd: () => void
}

export default function AddTaskForm({ columnId, onClose, onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Important')
  const [impact, setImpact] = useState('medio')
  const [probabilidad, setProbabilidad] = useState('medio')
  const [dueDate, setDueDate] = useState('')
  const [file, setFile] = useState<File | null>(null)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const riesgo = calcularNivelRiesgo(impact, probabilidad)

    const newTask = {
      title,
      description,
      column_id: columnId,
      priority,
      impact,
      probabilidad,
      riesgo,
      dueDate,
      fileName: file?.name || null,
    }

    try {
      const res = await fetch('https://kanban-api-production-3916.up.railway.app/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Error al crear tarea')

      // Reset form
      setTitle('')
      setDescription('')
      setDueDate('')
      setFile(null)

      onAdd()
      onClose()
    } catch (err: any) {
      alert('❌ ' + err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-white rounded-lg mb-4 border border-gray-200 shadow-sm space-y-2">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full px-3 py-2 rounded border text-gray-800"
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="w-full px-3 py-2 rounded border text-gray-800"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full px-3 py-2 rounded border text-gray-800"
      >
        <option value="Important">Important</option>
        <option value="OK">OK</option>
        <option value="Meh">Meh</option>
      </select>

      <div className="grid grid-cols-2 gap-2">
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

      <div>
        <label className="text-sm font-medium block mb-1">Fecha y hora de entrega</label>
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-3 py-2 rounded border text-gray-800"
        />
      </div>

      <div>
        <label className="text-sm font-medium block mb-1">Adjuntar archivo (PDF o imagen)</label>
        <input
          type="file"
          accept=".pdf,image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full px-3 py-2 rounded border text-gray-800"
        />
      </div>

      <div className="flex justify-between pt-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">
          Agregar
        </button>
        <button type="button" onClick={onClose} className="text-sm text-red-500 hover:underline">
          Cancelar
        </button>
      </div>
    </form>
  )
}
