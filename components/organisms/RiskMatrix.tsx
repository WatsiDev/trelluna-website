'use client'

import { useEffect, useState } from 'react'
import TaskCard from '@/components/molecules/TaskCard'

export default function RiskMatrix() {
  const [tasks, setTasks] = useState<any[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('kanban-tasks') || '[]')
    setTasks(stored)
  }, [])

  const niveles = ['bajo', 'medio', 'alto']

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Matriz de Riesgo 🎯</h2>
      <div className="grid grid-cols-4 gap-2">
        <div></div>
        {niveles.map((p) => (
          <div key={p} className="text-center font-semibold capitalize">{p}</div>
        ))}

        {niveles.map((impacto) => (
          <>
            <div className="font-semibold capitalize">{impacto}</div>
            {niveles.map((probabilidad) => (
              <div key={impacto + probabilidad} className="min-h-[150px] bg-gray-100 p-2 rounded overflow-auto">
                {tasks
                  .filter(
                    (t) => t.impact === impacto && t.probabilidad === probabilidad
                  )
                  .map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
              </div>
            ))}
          </>
        ))}
      </div>
    </div>
  )
}
