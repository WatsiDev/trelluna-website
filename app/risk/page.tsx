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
      className="min-h-screen bg-[#0B1120] text-white p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Matriz de Riesgo</h1>
        <Link
          href="/dashboard"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white transition"
        >
          ← Volver
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div></div>
        {niveles.map((nivel) => (
          <motion.h2
            key={nivel}
            className="text-center font-semibold capitalize"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {nivel}
          </motion.h2>
        ))}

        {niveles.map((impacto) => (
          <React.Fragment key={impacto}>
            <h3 className="font-semibold capitalize">{impacto}</h3>
            {niveles.map((probabilidad) => {
              const tareas = filtradas(impacto, probabilidad)
              return (
                <motion.div
                  key={impacto + probabilidad}
                  className="p-3 rounded bg-gray-100 text-black min-h-[120px] shadow-inner hover:shadow-xl transition"
                  whileHover={{ scale: 1.02 }}
                >
                  {tareas.length === 0 ? (
                    <p className="text-sm text-gray-400">Sin tareas</p>
                  ) : (
                    tareas.map((task) => (
                      <motion.div
                        key={task.id}
                        className={`mb-2 p-2 rounded text-xs shadow ${colores[task.riesgo as keyof typeof colores]}`}
                        whileHover={{ scale: 1.01 }}
                      >
                        <p className="font-semibold text-sm">{task.title}</p>
                        <p className="text-xs text-gray-900 mb-1">{task.description}</p>
                        {task.dueDate && (
                          <p className="text-[10px] text-gray-700">
                            Entrega: {new Date(task.dueDate).toLocaleString()}
                          </p>
                        )}
                        {task.fileName && (
                          <p className="text-[10px] text-gray-600">Archivo: {task.fileName}</p>
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
