'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem(`user-${email}`) || '{}')

    if (user && user.password === password) {
      localStorage.setItem('kanban-user', JSON.stringify({ email }))
      router.push('/dashboard')
    } else {
      alert('Correo o contraseña incorrectos ❌')
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
      <button type="submit" className="w-full bg-purple-600 rounded-full py-2 font-semibold hover:bg-purple-700">
        Iniciar sesión
      </button>
    </form>
  )
}
