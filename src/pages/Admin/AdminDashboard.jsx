//! ===============================================
//! ADMIN DASHBOARD - Panel principal administrador
//! ===============================================
//* Ruta: /admin
//* Layout: AdminLayout
//* Acceso: Solo rol "Administrador"

//* Propósito:
//? Panel de control principal para administradores del sistema
//? Muestra estadísticas generales (usuarios, reportes, trabajadores, operadores, eficiencia)
//? Endpoint: GET /dashboard/admin
//? Provee acceso rápido a las funciones principales de administración

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

/**
 * * Componente AdminDashboard
 * ? Panel de control principal para administradores del sistema
 * @returns {JSX.Element} Dashboard con estadísticas y acciones rápidas
 *
 * Características:
 * - Muestra 7 estadísticas principales (usuarios, reportes, trabajadores activos, etc.)
 * - Muestra tarjetas de acceso rápido a las principales funcionalidades
 * - Actualiza estadísticas en tiempo real desde el endpoint /dashboard/admin
 */
const AdminDashboard = () => {
  //? Estado para almacenar todas las estadísticas del sistema
  const [count, setCount] = useState({
    totalUsers: 0, //* Total de usuarios registrados (todos los roles)
    totalReports: 0, //* Total de reportes en el sistema
    newReports: 0, //* Reportes con estado "Nuevo" o "Pendiente"
    completedReports: 0, //* Reportes con estado "Completado"
    activeWorkers: 0, //* Trabajadores actualmente trabajando en tareas
    activeOperators: 0, //* Operadores actualmente activos en el sistema
    efficiencyRate: 0, //* Tasa de eficiencia general del sistema (%)
  });
  const navigate = useNavigate();
  const { getFetchData } = useFetch();

  /**
   * * useEffect - Cargar estadísticas del sistema
   * ? Se ejecuta al montar el componente
   * ! Endpoint: GET /dashboard/admin
   * ! Estructura de respuesta: { counts: { totalUsers, totalReports, ... } }
   */
  useEffect(() => {
    let isMounted = true; //? Flag para evitar actualizaciones de estado en componente desmontado

    const fetchStats = async () => {
      try {
        const data = await getFetchData("/dashboard/admin");
        if (isMounted) {
          setCount(data.counts); //* Actualiza todas las estadísticas recibidas del backend
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching stats:", error);
        }
      }
    };

    fetchStats();

    return () => {
      isMounted = false; //? Cleanup: marca el componente como desmontado
    };
  }, []);

  //? ============================================
  //? RENDERIZADO JSX
  //? ============================================
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* ====== SECCIÓN: Encabezado del dashboard ====== */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          🛡️ Dashboard Administrador
        </h1>
        <p className="text-gray-600">
          Panel de control y gestión completa del sistema municipal
        </p>
      </div>

      {/* ====== SECCIÓN: Estadísticas principales (4 tarjetas) ====== */}
      {/*//* Grid de 4 tarjetas mostrando estadísticas de usuarios y reportes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Tarjeta: Total usuarios */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-xl font-semibold mb-2">
            Total de usuarios registrados
          </h3>
          <p className="text-4xl font-bold mb-2">{count.totalUsers}</p>
        </div>

        {/* Tarjeta: Total reportes */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-xl font-semibold mb-2">Total de reportes</h3>
          <p className="text-4xl font-bold mb-2">{count.totalReports}</p>
        </div>

        {/* Tarjeta: Reportes nuevos */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold mb-2">Reportes nuevos</h3>
          <p className="text-4xl font-bold mb-2">{count.newReports}</p>
        </div>

        {/* Tarjeta: Reportes completados */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-xl font-semibold mb-2">Reportes completados</h3>
          <p className="text-4xl font-bold mb-2">{count.completedReports}</p>
        </div>
      </div>

      {/* ====== SECCIÓN: Estadísticas de recursos humanos y eficiencia (3 tarjetas) ====== */}
      {/*//* Muestra trabajadores activos, operadores activos y tasa de eficiencia */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        {/* Tarjeta: Trabajadores activos */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-green-600 mb-2">
            <div className="text-4xl mb-4">🔧</div>
            Trabajadores Activos
          </h3>
          <p className="text-4xl font-bold mb-2">{count.activeWorkers}</p>
          <p className="text-gray-600 text-sm">Actualmente trabajando</p>
        </div>

        {/* Tarjeta: Operadores activos */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">
            <div className="text-4xl mb-4">👨‍💼</div>
            Operadores Activos
          </h3>
          <p className="text-4xl font-bold mb-2">{count.activeOperators}</p>
          <p className="text-gray-600 text-sm">Actualmente operando</p>
        </div>

        {/* Tarjeta: Tasa de eficiencia del sistema */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-purple-600 mb-2">
            Tasa de Eficiencia
          </h3>
          <p className="text-4xl font-bold mb-2">{count.efficiencyRate}%</p>
          <p className="text-gray-600 text-sm">Eficiencia general</p>
        </div>
      </div>

      {/* ====== SECCIÓN: Acciones rápidas (navegación a otras vistas) ====== */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Acciones Rápidas
        </h2>
      </div>

      {/*//* Grid de tarjetas clickeables que navegan a las principales funcionalidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Acción: Gestionar usuarios */}
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

        {/* Acción: Vista global del sistema */}
        <div
          className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:cursor-pointer"
          onClick={() => navigate("/admin/globalview")}
        >
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-lg font-semibold mb-2">Vista General</h3>
        </div>

        {/* Acción: Ver estadísticas y gráficos */}
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

//! ===============================================
//! TRADUCCIÓN DE CONSTANTES
//! ===============================================
/**
 * ESPAÑOL | INGLÉS
 * ----------------
 * totalUsers = total de usuarios
 * totalReports = total de reportes
 * newReports = reportes nuevos
 * completedReports = reportes completados
 * activeWorkers = trabajadores activos
 * activeOperators = operadores activos
 * efficiencyRate = tasa de eficiencia
 * count = conteo/contador
 * navigate = navegar
 * isMounted = está montado
 * fetchStats = obtener estadísticas
 */
