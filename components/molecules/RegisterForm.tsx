'use client'

import { useState } from 'react'

export default function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('https://kanban-api-production-a195.up.railway.app/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          role: 'user'
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error al crear la cuenta')
      }

      alert('✅ Usuario registrado correctamente. Ahora puedes iniciar sesión.')
      setName('')
      setEmail('')
      setPassword('')
    } catch (err: any) {
      alert(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4 w-full max-w-sm">
      <input
        type="text"
        placeholder="Nombre completo"
        className="w-full px-4 py-2 bg-[#121826] text-white border border-gray-600 rounded-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        className="w-full px-4 py-2 bg-[#121826] text-white border border-gray-600 rounded-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="w-full px-4 py-2 bg-[#121826] text-white border border-gray-600 rounded-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 rounded-full py-2 font-semibold hover:bg-green-700"
      >
        {loading ? 'Creando cuenta...' : 'Crear cuenta'}
      </button>
    </form>
  )
}
