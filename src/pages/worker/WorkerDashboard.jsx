import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    pending: 0,
    inProgress: 0,
    completed: 0,
    total: 0,
  });
  const { getFetchData } = useFetch();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const data = await getFetchData("/dashboard/workers");
        if (data.ok) setCounts(data.counts);
      } catch (err) {
        // Puedes mostrar un error si lo deseas
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Título y descripción */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Accesos Rápidos
        </h1>
      </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div
          className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:cursor-pointer"
          onClick={() => navigate("/worker/tasks")}
        >
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-xl font-semibold mb-2">Ver Tareas</h3>
          <p className="text-gray-600 text-sm">Listado completo</p>
        </div>
        <div
          className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:cursor-pointer"
          onClick={() => navigate("/worker/create-progress")}
        >
          <div className="text-4xl mb-4">➕</div>
          <h3 className="text-xl font-semibold mb-2">Nuevo Avance</h3>
          <p className="text-gray-600 text-sm">Reportar avance</p>
        </div>
        <div
          className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:cursor-pointer"
          onClick={() => navigate("/worker/progress-history")}
        >
          <div className="text-4xl mb-4">📈</div>
          <h3 className="text-xl font-semibold mb-2">Historial de Avances</h3>
          <p className="text-gray-600 text-sm">Ver avances previos</p>
        </div>
        <div
          className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:cursor-pointer"
          onClick={() => navigate("/worker/team")}
        >
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-xl font-semibold mb-2">Equipo</h3>
          <p className="text-gray-600 text-sm">Ver miembros</p>
        </div>
        <div
          className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:cursor-pointer"
          onClick={() => navigate("/worker/history")}
        >
          <div className="text-4xl mb-4">🗂️</div>
          <h3 className="text-xl font-semibold mb-2">Historial</h3>
          <p className="text-gray-600 text-sm">Tareas completadas</p>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mis Tareas</h1>
        <p className="text-gray-600">
          Gestiona y completa las tareas asignadas
        </p>
      </div>
      {/* Tarjetas de estadísticas de tareas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">⏱️</div>
          <p className="text-4xl font-bold mb-2">{counts.pending}</p>
          <h3 className="text-lg font-semibold">Pendiente</h3>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">🔄</div>
          <p className="text-4xl font-bold mb-2">{counts.inProgress}</p>
          <h3 className="text-lg font-semibold">En Progreso</h3>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">✅</div>
          <p className="text-4xl font-bold mb-2">{counts.completed}</p>
          <h3 className="text-lg font-semibold">Finalizada</h3>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">📋</div>
          <p className="text-4xl font-bold mb-2">{counts.total}</p>
          <h3 className="text-lg font-semibold">Total</h3>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
