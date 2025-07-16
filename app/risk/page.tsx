import RiskMatrix from '@/components/organisms/RiskMatrix'
import Link from 'next/link'

export default function RiskPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Matriz de Riesgo 🎯</h1>
        <Link href="/dashboard">
          <button className="bg-gray-200 text-sm px-4 py-2 rounded hover:bg-gray-300">
            ← Volver al dashboard
          </button>
        </Link>
      </div>
      <RiskMatrix />
    </div>
  )
}
