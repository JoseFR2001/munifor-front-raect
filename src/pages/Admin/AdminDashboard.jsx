const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Título y descripción */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          🛡️ Dashboard Administrador
        </h1>
        <p className="text-gray-600">
          Panel de control y gestión completa del sistema municipal
        </p>
      </div>

      {/* Tarjetas de estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">👥</div>
          <p className="text-4xl font-bold mb-2">-</p>
          <h3 className="text-lg font-semibold">Total Usuarios</h3>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">📋</div>
          <p className="text-4xl font-bold mb-2">-</p>
          <h3 className="text-lg font-semibold">Total Reportes</h3>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-4xl font-bold mb-2">-</p>
          <h3 className="text-lg font-semibold">Reportes Pendientes</h3>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">✅</div>
          <p className="text-4xl font-bold mb-2">-</p>
          <h3 className="text-lg font-semibold">Completados</h3>
        </div>
      </div>

      {/* Tarjetas de estadísticas secundarias */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">🔧</div>
          <p className="text-4xl font-bold mb-2">-</p>
          <h3 className="text-lg font-semibold">Trabajadores Activos</h3>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">👨‍💼</div>
          <p className="text-4xl font-bold mb-2">-</p>
          <h3 className="text-lg font-semibold">Operadores Activos</h3>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">📊</div>
          <p className="text-4xl font-bold mb-2">-%</p>
          <h3 className="text-lg font-semibold">Tasa de Eficiencia</h3>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Acciones Rápidas
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-lg font-semibold mb-2">Gestionar Usuarios</h3>
          <p className="text-gray-600 text-sm">
            Administrar cuentas de usuarios
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-lg font-semibold mb-2">Ver Reportes</h3>
          <p className="text-gray-600 text-sm">Gestionar todos los reportes</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-lg font-semibold mb-2">Estadísticas</h3>
          <p className="text-gray-600 text-sm">
            Análisis detallado del sistema
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">⚙️</div>
          <h3 className="text-lg font-semibold mb-2">Configuración</h3>
          <p className="text-gray-600 text-sm">Ajustes del sistema</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
