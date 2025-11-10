import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const CitizenDashboard = () => {
  const { user } = useContext(UserContext);
  const [counts, setCounts] = useState({
    pending: 0,
    reviewed: 0,
    completed: 0,
    accepted: 0,
    rejected: 0,
    total: 0,
  });
  const { getFetchData } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchCounts = async () => {
      try {
        const data = await getFetchData("/dashboard/citizens");
        if (isMounted) {
          console.log(data);
          if (data.ok) setCounts(data.counts);
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
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Título y descripción */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          ¡Bienvenido, {user?.role}!
        </h1>
        <p className="text-gray-600">Panel de control del ciudadano</p>
      </div>

      {/* Tarjetas de acceso rápido */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:cursor-pointer"
          onClick={() => navigate("/citizen/reports")}
        >
          <div className="text-4xl mb-4">➕</div>
          <h3 className="text-xl font-semibold mb-2">Hacer Reporte</h3>
          <p className="text-gray-600 text-sm">Crea un nuevo reporte</p>
        </div>

        <div
          className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:cursor-pointer"
          onClick={() => navigate("/citizen/reportstatus")}
        >
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-xl font-semibold mb-2">Mis Reportes</h3>
          <p className="text-gray-600 text-sm">Ver estado de reportes</p>
        </div>

        <div
          className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:cursor-pointer"
          onClick={() => navigate("/citizen/profile")}
        >
          <div className="text-4xl mb-4">👤</div>
          <h3 className="text-xl font-semibold mb-2">Mi Perfil</h3>
          <p className="text-gray-600 text-sm">Editar información personal</p>
        </div>
        <div
          className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:cursor-pointer"
          onClick={() => navigate("/citizen/contact")}
        >
          <div className="text-4xl mb-4">✉️</div>
          <h3 className="text-xl font-semibold mb-2">Contactanos</h3>
          <p className="text-gray-600 text-sm">Envianos tus consultas</p>
        </div>
      </div>

      {/* Tarjetas de estadísticas por status */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-yellow-600 mb-2">
            Pendientes
          </h3>
          <p className="text-4xl font-bold mb-2">{counts.pending}</p>
          <p className="text-gray-600 text-sm">Reportes sin revisar</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">
            Revisados
          </h3>
          <p className="text-4xl font-bold mb-2">{counts.reviewed}</p>
          <p className="text-gray-600 text-sm">En seguimiento</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-green-600 mb-2">
            Completados
          </h3>
          <p className="text-4xl font-bold mb-2">{counts.completed}</p>
          <p className="text-gray-600 text-sm">Resueltos exitosamente</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-cyan-600 mb-2">
            Aceptados
          </h3>
          <p className="text-4xl font-bold mb-2">{counts.accepted}</p>
          <p className="text-gray-600 text-sm">Convertidos en tarea</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-red-600 mb-2">
            Rechazados
          </h3>
          <p className="text-4xl font-bold mb-2">{counts.rejected}</p>
          <p className="text-gray-600 text-sm">No aprobados por el operador</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-purple-600 mb-2">Total</h3>
          <p className="text-4xl font-bold mb-2">{counts.total}</p>
          <p className="text-gray-600 text-sm">Todos tus reportes</p>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;
