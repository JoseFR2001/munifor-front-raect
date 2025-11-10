import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const OperatorDashboard = () => {
  const [counts, setCounts] = useState({
    totalNewReports: 0,
    inProcess: 0,
    completed: 0,
    rejected: 0,
    activeCrews: 0,
    assignedTasks: 0,
  });
  const { getFetchData } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchCounts = async () => {
      try {
        const data = await getFetchData("/dashboard/operators");
        if (isMounted && data.ok) {
          setCounts(data.counts);
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      }
    };

    fetchCounts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Título y descripción */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Dashboard Operador
        </h1>
        <p className="text-gray-600">
          Panel de control y gestión de operaciones municipales
        </p>
      </div>

      {/* Tarjetas de estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:cursor-pointer"
          onClick={() => navigate("/operator/reports")}
        >
          <div className="text-4xl mb-4">📋</div>
          <p className="text-4xl font-bold mb-2">{counts.totalNewReports}</p>
          <h3 className="text-lg font-semibold">Total de Nuevos Reportes</h3>
        </div>

        <div
          className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:cursor-pointer"
          onClick={() => navigate("/operator/reports?status=Rechazado")}
        >
          <div className="text-4xl mb-4">⏱️</div>
          <p className="text-4xl font-bold mb-2">{counts.rejected}</p>
          <h3 className="text-lg font-semibold">Rechazados</h3>
        </div>

        <div
          className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:cursor-pointer"
          onClick={() => navigate("/operator/reports?status=Aceptado")}
        >
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-4xl font-bold mb-2">{counts.inProcess}</p>
          <h3 className="text-lg font-semibold">En Proceso</h3>
        </div>

        <div
          className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:cursor-pointer"
          onClick={() => navigate("/operator/reports?status=Completado")}
        >
          <div className="text-4xl mb-4">✅</div>
          <p className="text-4xl font-bold mb-2">{counts.completed}</p>
          <h3 className="text-lg font-semibold">Completados</h3>
        </div>
      </div>

      {/* Tarjetas de estadísticas secundarias */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:cursor-pointer"
          onClick={() => navigate("/operator/teams")}
        >
          <div className="text-4xl mb-4">👥</div>
          <p className="text-4xl font-bold mb-2">{counts.activeCrews}</p>
          <h3 className="text-lg font-semibold">Cuadrillas Activas</h3>
        </div>

        <div
          className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:cursor-pointer"
          onClick={() => navigate("/operator/tasks")}
        >
          <div className="text-4xl mb-4">📝</div>
          <p className="text-4xl font-bold mb-2">{counts.assignedTasks}</p>
          <h3 className="text-lg font-semibold">Tareas Asignadas</h3>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Acciones Rápidas
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:cursor-pointer"
          onClick={() => navigate("/operator/reports")}
        >
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-lg font-semibold mb-2">Gestionar Reportes</h3>
          <p className="text-gray-600 text-sm">
            Ver y administrar todos los reportes
          </p>
        </div>

        <div
          className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:cursor-pointer"
          onClick={() => navigate("/operator/create-task")}
        >
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-lg font-semibold mb-2">Asignar Tareas</h3>
          <p className="text-gray-600 text-sm">Asignar trabajos a cuadrillas</p>
        </div>

        <div
          className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:cursor-pointer"
          onClick={() => navigate("/operator/map")}
        >
          <div className="text-4xl mb-4">🗺️</div>
          <h3 className="text-lg font-semibold mb-2">Ver Mapa</h3>
          <p className="text-gray-600 text-sm">
            Visualizar reportes en el mapa
          </p>
        </div>

        <div
          className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:cursor-pointer"
          onClick={() => navigate("/operator/statistics")}
        >
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-lg font-semibold mb-2">Estadísticas</h3>
          <p className="text-gray-600 text-sm">
            Análisis y reportes detallados
          </p>
        </div>
      </div>
    </div>
  );
};

export default OperatorDashboard;
