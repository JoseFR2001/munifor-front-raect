import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const AdminDashboard = () => {
  const [count, setCount] = useState({
    totalUsers: 0,
    totalReports: 0,
    newReports: 0,
    completedReports: 0,
    activeWorkers: 0,
    activeOperators: 0,
    efficiencyRate: 0,
  });
  const navigate = useNavigate();
  const { getFetchData } = useFetch();

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        const data = await getFetchData("/dashboard/admin");
        if (isMounted) {
          setCount(data.counts);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching stats:", error);
        }
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

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

      {/* Tarjetas de acceso rápido */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-xl font-semibold mb-2">
            Total de usuarios registrados
          </h3>
          <p className="text-4xl font-bold mb-2">{count.totalUsers}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-xl font-semibold mb-2">Total de reportes</h3>
          <p className="text-4xl font-bold mb-2">{count.totalReports}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold mb-2">Reportes nuevos</h3>
          <p className="text-4xl font-bold mb-2">{count.newReports}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-xl font-semibold mb-2">Reportes completados</h3>
          <p className="text-4xl font-bold mb-2">{count.completedReports}</p>
        </div>
      </div>

      {/* Tarjetas de estadísticas por status */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-green-600 mb-2">
            <div className="text-4xl mb-4">🔧</div>
            Trabajadores Activos
          </h3>
          <p className="text-4xl font-bold mb-2">{count.activeWorkers}</p>
          <p className="text-gray-600 text-sm">Actualmente trabajando</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">
            <div className="text-4xl mb-4">👨‍💼</div>
            Operadores Activos
          </h3>
          <p className="text-4xl font-bold mb-2">{count.activeOperators}</p>
          <p className="text-gray-600 text-sm">Actualmente operando</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-purple-600 mb-2">
            Tasa de Eficiencia
          </h3>
          <p className="text-4xl font-bold mb-2">{count.efficiencyRate}%</p>
          <p className="text-gray-600 text-sm">Eficiencia general</p>
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
          onClick={() => navigate("/admin/profilesearch")}
        >
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-lg font-semibold mb-2">Gestionar Usuarios</h3>
          <p className="text-gray-600 text-sm">
            Administrar cuentas de usuarios
          </p>
        </div>
        <div
          className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:cursor-pointer"
          onClick={() => navigate("/admin/globalview")}
        >
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-lg font-semibold mb-2">Vista General</h3>
        </div>
        <div
          className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:cursor-pointer"
          onClick={() => navigate("/admin/statistics")}
        >
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-lg font-semibold mb-2">Estadísticas</h3>
          <p className="text-gray-600 text-sm">
            Análisis detallado del sistema
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
