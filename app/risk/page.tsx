'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import React from 'react'

const colores = {
  bajo: 'bg-green-100 text-green-800',
  medio: 'bg-yellow-100 text-yellow-800',
  alto: 'bg-red-100 text-red-800',
  crítico: 'bg-pink-200 text-pink-800',
}

export default function RiskMatrix() {
  const [tasks, setTasks] = useState<any[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('kanban-tasks') || '[]')
    setTasks(stored)
  }, [])

  const niveles = ['bajo', 'medio', 'alto']

  const filtradas = (impacto: string, probabilidad: string) =>
    tasks.filter((t) => t.impact === impacto && t.probabilidad === probabilidad)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-900 p-6"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">📊 Matriz de Riesgo</h1>
        <Link
          href="/dashboard"
          className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 shadow"
        >
          ← Volver
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4 rounded-lg overflow-hidden border border-gray-300">
        <div className="bg-gray-200 text-gray-900 text-center font-bold py-2">Impacto / Prob.</div>
        {niveles.map((nivel) => (
          <motion.h2
            key={nivel}
            className="text-center font-semibold capitalize bg-gray-100 py-2"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {nivel}
          </motion.h2>
        ))}

        {niveles.map((impacto) => (
          <React.Fragment key={impacto}>
            <h3 className="font-semibold capitalize bg-gray-100 py-2 text-center">{impacto}</h3>
            {niveles.map((probabilidad) => {
              const tareas = filtradas(impacto, probabilidad)
              return (
                <motion.div
                  key={impacto + probabilidad}
                  className="p-3 bg-white rounded-md text-black min-h-[140px] flex flex-col gap-2 border hover:shadow-lg transition"
                  whileHover={{ scale: 1.01 }}
                >
                  {tareas.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center mt-2">Sin tareas</p>
                  ) : (
                    tareas.map((task) => (
                      <motion.div
                        key={task.id}
                        className={`p-3 rounded-md text-xs shadow ${colores[task.riesgo as keyof typeof colores]}`}
                        whileHover={{ scale: 1.01 }}
                      >
                        <p className="font-semibold text-sm truncate">{task.title}</p>
                        <p className="text-xs text-gray-900 mb-1 truncate">{task.description}</p>
                        {task.dueDate && (
                          <p className="text-[11px] text-gray-700">
                            📅 {new Date(task.dueDate).toLocaleString()}
                          </p>
                        )}
                        {task.fileName && (
                          <p className="text-[11px] text-gray-600 truncate">📎 {task.fileName}</p>
                        )}
                      </motion.div>
                    ))
                  )}
                </motion.div>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  )
}
