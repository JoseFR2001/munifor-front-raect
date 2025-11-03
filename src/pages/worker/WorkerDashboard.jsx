const WorkerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Título y descripción */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mis Tareas</h1>
        <p className="text-gray-600">
          Gestiona y completa las tareas asignadas
        </p>
      </div>

      {/* Tarjetas de estadísticas de tareas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">📋</div>
          <p className="text-4xl font-bold mb-2">-</p>
          <h3 className="text-lg font-semibold">Total</h3>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">⏱️</div>
          <p className="text-4xl font-bold mb-2">-</p>
          <h3 className="text-lg font-semibold">Pendientes</h3>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">🔄</div>
          <p className="text-4xl font-bold mb-2">-</p>
          <h3 className="text-lg font-semibold">En Proceso</h3>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">✅</div>
          <p className="text-4xl font-bold mb-2">-</p>
          <h3 className="text-lg font-semibold">Completadas</h3>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
