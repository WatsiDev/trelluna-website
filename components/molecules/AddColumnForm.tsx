'use client'

import { useState } from 'react'

interface AddColumnFormProps {
  onClose: () => void
  onAdd: () => void
}

export default function AddColumnForm({ onClose, onAdd }: AddColumnFormProps) {
  const [name, setName] = useState('')
  const [position, setPosition] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newColumn = { name, position }

    try {
      const res = await fetch('https://kanban-api-production-a195.up.railway.app/api/columns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newColumn),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Error al crear columna')

      setName('')
      setPosition(0)

      onAdd()
      onClose()
    } catch (err: any) {
      alert('❌ ' + err.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 bg-white rounded-lg mb-4 border border-gray-200 shadow-sm space-y-2"
    >
      <input
        type="text"
        placeholder="Nombre de la lista"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-3 py-2 rounded border text-gray-800"
      />

      <input
        type="number"
        placeholder="Posición"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        required
        className="w-full px-3 py-2 rounded border text-gray-800"
        min={0}
      />

      <div className="flex justify-between pt-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
          Crear lista
        </button>
        <button type="button" onClick={onClose} className="text-sm text-red-500 hover:underline">
          Cancelar
        </button>
      </div>
    </form>
  )
}
