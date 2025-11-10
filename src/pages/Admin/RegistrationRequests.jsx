import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import ProfileDetails from "../../components/details/ProfileDetails";

const RegistrationRequests = () => {
  const { getFetchData, putFetch } = useFetch();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchPendingUsers = async () => {
    try {
      const data = await getFetchData("/user/pending");
      setPendingUsers(data.users || []);
    } catch (error) {
      console.error(error);
      setPendingUsers([]);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const handleAccept = async (userId) => {
    try {
      await putFetch("/user/available", userId, {});
      // Refrescar la lista después de aceptar
      fetchPendingUsers();
      setSelectedUser(null);
    } catch (error) {
      console.error("Error al aceptar usuario:", error);
    }
  };

  const handleReject = async (userId) => {
    try {
      await putFetch("/user/reject", userId, {});
      // Refrescar la lista después de rechazar
      fetchPendingUsers();
      setSelectedUser(null);
    } catch (error) {
      console.error("Error al rechazar usuario:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-5xl mx-auto w-full py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Columna izquierda: Lista de solicitudes pendientes */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-700 mb-2">
          Solicitudes de registro
        </h2>

        {pendingUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <span className="text-gray-500">
              No hay solicitudes de registro pendientes
            </span>
          </div>
        ) : (
          <div className="space-y-3 max-h-[700px] overflow-y-auto">
            {pendingUsers.map((user) => (
              <div
                key={user._id}
                className={`bg-white rounded-lg shadow p-4 border border-gray-200 w-full hover:cursor-pointer transition ${
                  selectedUser?._id === user._id ? "ring-2 ring-indigo-400" : ""
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  {user.profile.first_name} {user.profile.last_name}
                </h3>
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === "Operador"
                        ? "bg-blue-100 text-blue-700"
                        : user.role === "Trabajador"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(user.created_at).toLocaleDateString("es-ES")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Columna derecha: Detalles del usuario seleccionado */}
      <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Detalles del solicitante
        </h2>
        {!selectedUser ? (
          <div className="flex flex-col items-center justify-center py-8">
            <span className="text-gray-500">
              Selecciona una solicitud para ver detalles
            </span>
          </div>
        ) : (
          <ProfileDetails
            user={selectedUser}
            showActions={true}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        )}
      </div>
    </div>
  );
};

export default RegistrationRequests;
