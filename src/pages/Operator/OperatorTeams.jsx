import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const OperatorTeams = () => {
  const { getFetchData } = useFetch();
  const [crews, setCrews] = useState([]);
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const fetchCrews = async () => {
      try {
        const data = await getFetchData("/crew");
        setCrews(data.crew);
      } catch (error) {
        console.error("Error al obtener los equipos (crew):", error);
      }
    };
    const fetchWorkers = async () => {
      try {
        const data = await getFetchData("/worker");
        setWorkers(data.worker);
      } catch (error) {
        console.error("Error al obtener los trabajadores:", error);
      }
    };
    fetchCrews();
    fetchWorkers();
  }, []);

  const handleCreateCrew = () => {
    // Aquí iría la lógica para crear equipo (modal, navegación, etc.)
    alert("Funcionalidad de crear equipo");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col items-center justify-between">
        <h2 className="text-xl font-bold text-gray-700">
          Equipos y Trabajadores
        </h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={handleCreateCrew}
        >
          Crear equipo
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
        {/* Sección de equipos */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-700 mb-4">
            Equipos creados
          </h3>
          {crews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <span className="text-gray-500">No hay equipos registrados</span>
            </div>
          ) : (
            crews.map((crew, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow p-3 flex justify-between items-center border border-gray-200 w-full mb-3 min-h-14"
              >
                <span className="block text-xl font-semibold text-gray-800">
                  {crew.name}
                </span>
                <span className="px-5 py-2 rounded-full text-base font-medium bg-indigo-100 text-indigo-700">
                  {crew.task ? crew.task : "Sin tarea asignada"}
                </span>
              </div>
            ))
          )}
        </div>
        {/* Sección de trabajadores */}
        <div>
          <h3 className="text-lg font-semibold text-blue-700 mb-4">
            Trabajadores disponibles
          </h3>
          {workers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <span className="text-gray-500">
                No hay trabajadores disponibles
              </span>
            </div>
          ) : (
            workers.map((worker, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow p-3 flex justify-between items-center border border-gray-200 w-full mb-3 min-h-14"
              >
                <span className="block text-xl font-semibold text-gray-800">
                  {worker.name}
                </span>
                <span className="px-5 py-2 rounded-full text-base font-medium bg-green-100 text-green-700">
                  {worker.role ? worker.role : "Sin rol"}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OperatorTeams;
