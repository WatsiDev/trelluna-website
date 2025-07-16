export default function SubscriptionPage() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Plan de Suscripción 🪙</h1>

      <div className="bg-white p-4 rounded-lg shadow border mb-6">
        <h2 className="text-xl font-semibold">Pro Plan - $20 USD / mes</h2>
        <ul className="list-disc pl-5 mt-3 text-gray-700 text-sm space-y-1">
          <li>Acceso ilimitado al panel de tareas</li>
          <li>Integración con APIs externas</li>
          <li>Historial completo de actividades</li>
          <li>Soporte prioritario</li>
          <li>Acceso a futuras herramientas de IA</li>
        </ul>
      </div>

      <form className="bg-gray-50 p-4 rounded-lg shadow space-y-4 border">
        <h3 className="text-lg font-semibold mb-2">Información de Pago</h3>

        <div>
          <label className="block text-sm font-medium mb-1">Nombre completo</label>
          <input
            type="text"
            placeholder="Juan Pérez"
            className="w-full px-4 py-2 border rounded-md text-gray-800"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Correo electrónico</label>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            className="w-full px-4 py-2 border rounded-md text-gray-800"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Número de tarjeta</label>
          <input
            type="text"
            placeholder="**** **** **** 1234"
            className="w-full px-4 py-2 border rounded-md text-gray-800"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Expiración</label>
            <input
              type="text"
              placeholder="MM/AA"
              className="w-full px-4 py-2 border rounded-md text-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CVV</label>
            <input
              type="text"
              placeholder="123"
              className="w-full px-4 py-2 border rounded-md text-gray-800"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-semibold py-2 rounded hover:bg-purple-700"
        >
          Pagar $20 USD
        </button>
      </form>
    </div>
  )
}