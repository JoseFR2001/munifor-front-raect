import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const WorkerTeam = () => {
  const { getFetchData } = useFetch();
  const [crews, setCrews] = useState([]);
  const [selectedCrew, setSelectedCrew] = useState(null);

  useEffect(() => {
    const fetchCrews = async () => {
      try {
        const data = await getFetchData("/crew/worker"); // Endpoint para equipos del trabajador
        setCrews(Array.isArray(data?.crew) ? data.crew : []);
      } catch (error) {
        setCrews([]);
      }
    };
    fetchCrews();
  }, []);

  // Separar equipo actual y futuros
  const currentCrew = crews.length > 0 ? crews[0] : null;
  const futureCrews = crews.length > 1 ? crews.slice(1) : [];

  return (
    <div className="min-h-screen bg-gray-50 max-w-5xl mx-auto w-full py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Sección 1: equipo actual y futuros */}
      <div className="flex flex-col gap-6">
        {/* Equipo actual */}
        <div>
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Equipo actual
          </h2>
          {!currentCrew ? (
            <div className="flex flex-col items-center justify-center py-8">
              <span className="text-gray-500">
                No tienes equipo actual asignado
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
              <span className="px-5 py-2 rounded-full text-base font-medium bg-indigo-100 text-indigo-700">
                {currentCrew.task ? currentCrew.task : "Sin tarea asignada"}
              </span>
            </div>
          )}
        </div>
        {/* Equipos futuros */}
        <div>
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Equipos futuros
          </h2>
          {futureCrews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <span className="text-gray-500">
                No tienes equipos futuros asignados
              </span>
            </div>
          ) : (
            futureCrews.map((crew, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-lg shadow p-3 flex justify-between items-center border border-gray-200 w-full mb-3 min-h-14 hover:cursor-pointer ${
                  selectedCrew?._id === crew._id ? "ring-2 ring-blue-400" : ""
                }`}
                onClick={() => setSelectedCrew(crew)}
              >
                <span className="block text-base font-semibold text-gray-800">
                  {crew.name}
                </span>
                <span className="px-5 py-2 rounded-full text-base font-medium bg-indigo-100 text-indigo-700">
                  {crew.task ? crew.task : "Sin tarea asignada"}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Sección 2: detalles del equipo seleccionado */}
      <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Detalle del equipo
        </h2>
        {!selectedCrew ? (
          <div className="flex flex-col items-center justify-center py-8">
            <span className="text-gray-500">
              Selecciona un equipo para ver detalles
            </span>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200 w-full">
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">
              {selectedCrew.name}
            </h3>
            <p className="text-gray-600 mb-2">{selectedCrew.description}</p>
            <div className="mb-2">
              <span className="font-semibold text-gray-700">
                Tarea asignada:
              </span>
              <span className="ml-2 text-gray-600">
                {selectedCrew.task ? selectedCrew.task : "Sin tarea"}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700">ID:</span>
              <span className="ml-2 text-gray-700 font-mono">
                {selectedCrew._id}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerTeam;
