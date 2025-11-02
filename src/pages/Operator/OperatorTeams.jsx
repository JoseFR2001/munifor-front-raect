import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const OperatorTeams = () => {
  const { getFetchData } = useFetch();
  const [crews, setCrews] = useState([]);

  useEffect(() => {
    const fetchCrews = async () => {
      try {
        const data = await getFetchData("/crew"); // Endpoint correcto según backend
        setCrews(data.crew);
      } catch (error) {
        console.error("Error al obtener los equipos (crew):", error);
      }
    };
    fetchCrews();
  }, []);

  const handleCreateCrew = () => {
    // Aquí iría la lógica para crear equipo (modal, navegación, etc.)
    alert("Funcionalidad de crear equipo");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col items-center justify-between">
        <h2 className="text-xl font-bold text-gray-700">Equipos</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={handleCreateCrew}
        >
          Crear equipo
        </button>
      </div>
      <div className="space-y-4">
        {crews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <h3>No hay equipos registrados</h3>
          </div>
        ) : (
          crews.map((crew, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-3 flex justify-between items-center border border-gray-200 w-full max-w-2xl mx-auto min-h-14"
            >
              <div>
                <span className="block text-xl font-semibold text-gray-800">
                  {crew.name}
                </span>
              </div>
              <span className="px-5 py-2 rounded-full text-base font-medium bg-indigo-100 text-indigo-700">
                {crew.task ? crew.task : "Sin tarea asignada"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OperatorTeams;
