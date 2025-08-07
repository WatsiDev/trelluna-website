'use client'

import { useEffect, useState } from 'react'

type User = {
  id: number
  name: string
  email: string
  role: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://kanban-api-production-a195.up.railway.app/api/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error al obtener usuarios:', err)
        setLoading(false)
      })
  }, [])

  const getRoleBadgeClass = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-green-100 text-green-600'
      case 'editor':
        return 'bg-purple-100 text-purple-600'
      case 'viewer':
        return 'bg-gray-100 text-gray-600'
      default:
        return 'bg-yellow-100 text-yellow-600'
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Gestión de Usuarios 👥</h1>

      <p className="text-gray-600 mb-6">
        Aquí podrás ver, agregar o editar usuarios que tienen acceso al tablero.
      </p>

      <div className="bg-white border rounded-lg shadow p-4 space-y-3">
        {loading ? (
          <p className="text-center text-gray-500">Cargando usuarios...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500">No hay usuarios registrados.</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <span className="font-medium text-gray-800">{user.name}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${getRoleBadgeClass(
                  user.role
                )}`}
              >
                {user.role}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
