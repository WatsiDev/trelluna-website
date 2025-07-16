'use client'

import LoginForm from '@/components/molecules/LoginForm'
import RegisterForm from '@/components/molecules/RegisterForm'
import { useState } from 'react'

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-[#0B1120] text-white px-4">
        <img
    src="/trellunaText.svg"
    alt="Trelluna Logo"
    className="h-20 w-auto max-w-xs mb-6"
    />

      {mode === 'login' ? (
        <>
          <LoginForm />
          <p className="text-sm text-gray-400 mt-4">
            ¿No tienes una cuenta?
            <button onClick={() => setMode('register')} className="ml-1 text-purple-400 hover:underline">
              Regístrate
            </button>
          </p>
        </>
      ) : (
        <>
          <RegisterForm />
          <p className="text-sm text-gray-400 mt-4">
            ¿Ya tienes una cuenta?
            <button onClick={() => setMode('login')} className="ml-1 text-green-400 hover:underline">
              Iniciar sesión
            </button>
          </p>
        </>
      )}
    </main>
  )
}
