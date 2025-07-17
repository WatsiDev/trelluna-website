'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('https://kanban-api-production-3916.up.railway.app/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Credenciales incorrectas')
      }

      // Guardar usuario y token (si aplica)
      localStorage.setItem('kanban-user', JSON.stringify(data.user || { email }))

      alert('✅ Inicio de sesión exitoso')
      router.push('/dashboard')
    } catch (err: any) {
      alert(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4 w-full max-w-sm">
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
        className="w-full bg-purple-600 rounded-full py-2 font-semibold hover:bg-purple-700"
      >
        {loading ? 'Iniciando...' : 'Iniciar sesión'}
      </button>
    </form>
  )
}
