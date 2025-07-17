'use client'

import { useState } from 'react'
import LoginForm from '@/components/molecules/LoginForm'
import RegisterForm from '@/components/molecules/RegisterForm'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [open, setOpen] = useState(true)

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'))
  }

  return (
    <main className="relative min-h-screen bg-black/70 backdrop-blur-md flex justify-center items-center px-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white text-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 border border-gray-200">
          <DialogHeader>
            <img
              src="/trellunaText.svg"
              alt="Trelluna Logo"
              className="h-14 mx-auto mb-6"
            />
            <DialogTitle className="text-center text-2xl font-semibold">
              {mode === 'login' ? 'Inicia sesión' : 'Crea tu cuenta'}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-6 space-y-4">
            {mode === 'login' ? <LoginForm /> : <RegisterForm />}
          </div>

          <div className="text-sm text-center text-gray-500 mt-6">
            {mode === 'login' ? (
              <>
                ¿No tienes una cuenta?
                <button
                  onClick={toggleMode}
                  className="ml-1 text-violet-600 hover:underline font-medium"
                >
                  Regístrate
                </button>
              </>
            ) : (
              <>
                ¿Ya tienes una cuenta?
                <button
                  onClick={toggleMode}
                  className="ml-1 text-green-600 hover:underline font-medium"
                >
                  Inicia sesión
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}