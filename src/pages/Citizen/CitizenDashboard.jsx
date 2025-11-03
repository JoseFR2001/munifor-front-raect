const CitizenDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Título y descripción */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          ¡Bienvenido, Usuario!
        </h1>
        <p className="text-gray-600">Panel de control del ciudadano</p>
      </div>

      {/* Tarjetas de acceso rápido */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">➕</div>
          <h3 className="text-xl font-semibold mb-2">Hacer Reporte</h3>
          <p className="text-gray-600 text-sm">Crea un nuevo reporte</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-xl font-semibold mb-2">Mis Reportes</h3>
          <p className="text-gray-600 text-sm">Ver estado de reportes</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">👁️</div>
          <h3 className="text-xl font-semibold mb-2">Mapa Público</h3>
          <p className="text-gray-600 text-sm">Ver reportes en el mapa</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">👤</div>
          <h3 className="text-xl font-semibold mb-2">Mi Perfil</h3>
          <p className="text-gray-600 text-sm">Editar información personal</p>
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">
            Reportes Activos
          </h3>
          <p className="text-4xl font-bold mb-2">-</p>
          <p className="text-gray-600 text-sm">En seguimiento</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-green-600 mb-2">
            Reportes Completados
          </h3>
          <p className="text-4xl font-bold mb-2">-</p>
          <p className="text-gray-600 text-sm">Resueltos exitosamente</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-purple-600 mb-2">
            Total de Reportes
          </h3>
          <p className="text-4xl font-bold mb-2">-</p>
          <p className="text-gray-600 text-sm">Todos tus reportes</p>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;
