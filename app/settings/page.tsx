export default function SettingsPage() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Configuración ⚙️</h1>

      <form className="space-y-6 bg-white border rounded-lg shadow p-6">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre de usuario</label>
          <input
            type="text"
            defaultValue="emir_zepeda"
            className="w-full px-4 py-2 border rounded-md text-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Correo electrónico</label>
          <input
            type="email"
            defaultValue="emir@correo.com"
            className="w-full px-4 py-2 border rounded-md text-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 border rounded-md text-gray-800"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-semibold py-2 rounded hover:bg-purple-700"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  )
}
