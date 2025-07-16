'use client'

import { useState } from 'react'

export default function RegisterForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    if (localStorage.getItem(`user-${email}`)) {
      alert('Este correo ya está registrado ⚠️')
      return
    }

    localStorage.setItem(`user-${email}`, JSON.stringify({ password }))
    alert('Registro exitoso ✅ Ahora puedes iniciar sesión.')
    setEmail('')
    setPassword('')
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4 w-full max-w-sm">
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
      <button type="submit" className="w-full bg-green-600 rounded-full py-2 font-semibold hover:bg-green-700">
        Crear cuenta
      </button>
    </form>
  )
}