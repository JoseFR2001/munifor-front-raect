import { useEffect, useState, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { UserContext } from "../../context/UserContext";

const WorkerTeam = () => {
  const { getFetchData } = useFetch();
  const [currentCrew, setCurrentCrew] = useState(null);
  const [pastCrews, setPastCrews] = useState([]);
  const [selectedCrew, setSelectedCrew] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchCrews = async () => {
      try {
        const data = await getFetchData("/crew/worker");
        console.log(data);
        setCurrentCrew(data.crew);
        setPastCrews(data.pastCrews ? [data.pastCrews] : []);
      } catch (error) {
        console.error(error);
        setCurrentCrew(null);
        setPastCrews([]);
      }
    };
    fetchCrews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 max-w-5xl mx-auto w-full py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Columna izquierda: Crew actual y pasados */}
      <div className="flex flex-col gap-6">
        {/* Crew actual */}
        <h2 className="text-xl font-bold text-gray-700 mb-4">Equipo actual</h2>
        {!currentCrew ? (
          <div className="flex flex-col items-center justify-center py-8">
            <span className="text-gray-500">
              No estás asignado a ningún equipo actualmente
            </span>
          </div>
        ) : (
          <div
            className={`bg-white rounded-lg shadow p-6 border border-gray-200 w-full hover:cursor-pointer ${
              selectedCrew?._id === currentCrew._id
                ? "ring-2 ring-blue-400"
                : ""
            }`}
            onClick={() => setSelectedCrew(currentCrew)}
          >
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">
              {currentCrew.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                Activo
              </span>
              {currentCrew.leader === user._id && (
                <span className="px-4 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
                  Líder
                </span>
              )}
            </div>
          </div>
        )}

        {/* Equipos pasados */}
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Equipos anteriores
        </h2>
        {pastCrews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <span className="text-gray-500">
              No tienes equipos anteriores registrados
            </span>
          </div>
        ) : (
          pastCrews.map((crew, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-lg shadow p-4 border border-gray-200 w-full mb-3 hover:cursor-pointer ${
                selectedCrew?._id === crew._id ? "ring-2 ring-blue-400" : ""
              }`}
              onClick={() => setSelectedCrew(crew)}
            >
              <h3 className="text-base font-semibold text-gray-800 mb-2">
                {crew.name}
              </h3>
              <span className="px-4 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                Inactivo
              </span>
            </div>
          ))
        )}
      </div>

      {/* Columna derecha: Detalles del equipo seleccionado */}
      <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Detalles del equipo
        </h2>
        {!selectedCrew ? (
          <div className="flex flex-col items-center justify-center py-8">
            <span className="text-gray-500">
              Selecciona un equipo para ver detalles
            </span>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200 w-full">
            <h3 className="text-lg font-semibold text-indigo-700 mb-4">
              {selectedCrew.name}
            </h3>

            <div className="mb-4">
              <span className="font-semibold text-gray-700 block mb-2">
                Líder:
              </span>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-gray-800">
                  {selectedCrew.leader?.profile?.first_name}{" "}
                  {selectedCrew.leader?.profile?.last_name}
                </p>
                <p className="text-sm text-gray-600">
                  {selectedCrew.leader?.username}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <span className="font-semibold text-gray-700 block mb-2">
                Miembros ({selectedCrew.members?.length || 0}):
              </span>
              <div className="space-y-2">
                {selectedCrew.members && selectedCrew.members.length > 0 ? (
                  selectedCrew.members.map((member, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-3"
                    >
                      <p className="text-gray-800">
                        {member?.profile?.first_name}{" "}
                        {member?.profile?.last_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {member?.username}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No hay miembros asignados
                  </p>
                )}
              </div>
            </div>

            <div className="mb-2">
              <span className="font-semibold text-gray-700">Estado:</span>
              <span
                className={`ml-2 px-3 py-1 rounded-full text-white text-xs font-bold ${
                  selectedCrew.deleted_at ? "bg-red-500" : "bg-green-500"
                }`}
              >
                {selectedCrew.deleted_at ? "Inactivo" : "Activo"}
              </span>
            </div>

            <div className="mb-2">
              <span className="font-semibold text-gray-700">ID:</span>
              <span className="ml-2 text-gray-700 font-mono text-sm">
                {selectedCrew._id}
              </span>
            </div>

            {selectedCrew.deleted_at && (
              <div className="mb-2 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <span className="font-semibold text-red-700 block mb-1">
                  Fecha de finalización:
                </span>
                <span className="text-sm text-red-600">
                  {new Date(selectedCrew.deleted_at).toLocaleDateString(
                    "es-ES",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerTeam;
