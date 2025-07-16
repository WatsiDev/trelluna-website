export default function HelpPage() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Centro de Ayuda ❓</h1>

      <div className="space-y-4 text-gray-700">
        <div>
          <h2 className="font-semibold">¿Cómo uso el panel Kanban?</h2>
          <p className="text-sm">
            Usa el botón "+" para agregar tareas. Puedes arrastrarlas entre columnas o clasificarlas por nivel de riesgo.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">¿Cómo actualizo mis datos?</h2>
          <p className="text-sm">
            Ve a la sección de configuración donde puedes cambiar tu nombre, correo o contraseña.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">¿Cómo cancelo mi suscripción?</h2>
          <p className="text-sm">
            Dirígete a la sección "Subscription" y haz clic en cancelar. El servicio se detendrá al final del periodo actual.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">¿Necesitas más ayuda?</h2>
          <p className="text-sm">
            Escríbenos a <a href="mailto:soporte@kanban.com" className="text-purple-600 underline">soporte@kanban.com</a>
            y te ayudaremos lo antes posible.
          </p>
        </div>
      </div>
    </div>
  )
}
