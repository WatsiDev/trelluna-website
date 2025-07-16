export default function UsersPage() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Gestión de Usuarios 👥</h1>

      <p className="text-gray-600 mb-6">
        Aquí podrás ver, agregar o editar usuarios que tienen acceso al tablero.
      </p>

      <div className="bg-white border rounded-lg shadow p-4 space-y-3">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-800">Emir Zepeda</span>
          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Admin</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-800">Ana Ruiz</span>
          <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">Editor</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-800">Luis Pérez</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Viewer</span>
        </div>
      </div>
    </div>
  )
}
