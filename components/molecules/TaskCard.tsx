'use client'

interface TaskCardProps {
  task: {
    id: string
    title: string
    description: string
    priority: string
    comments: number
    views: number
    users: string[]
    riesgo?: string
  }
}

const riesgoColor = {
  bajo: 'bg-green-100 text-green-700',
  medio: 'bg-yellow-100 text-yellow-700',
  alto: 'bg-orange-100 text-orange-700',
  crítico: 'bg-red-100 text-red-700'
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg mb-4 shadow transition hover:shadow-lg">
      <div className="flex justify-between mb-2 items-center">
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
          {task.priority}
        </span>
        {task.riesgo && (
          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${riesgoColor[task.riesgo as keyof typeof riesgoColor]}`}>
            Riesgo: {task.riesgo}
          </span>
        )}
      </div>

      <h3 className="text-base font-bold text-gray-800 mb-1 break-words">
        {task.title}
      </h3>
      <p className="text-sm text-gray-600 mb-3 break-words">
        {task.description}
      </p>

      <div className="flex justify-between items-center text-xs text-gray-400">
        <div className="flex -space-x-1">
          {task.users.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="User"
              className="h-6 w-6 rounded-full border border-white"
            />
          ))}
        </div>
        <div className="flex gap-3">
          <span>💬 {task.comments}</span>
          <span>👁️ {task.views}</span>
        </div>
      </div>
    </div>
  )
}