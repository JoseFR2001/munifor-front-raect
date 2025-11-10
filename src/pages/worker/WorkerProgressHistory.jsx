import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import useFilter from "../../hooks/useFilter";

const WorkerProgressHistory = () => {
  const { getFetchData } = useFetch();
  const { filterBySearch } = useFilter();
  const [progressReports, setProgressReports] = useState([]);
  const [selectedProgress, setSelectedProgress] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProgressReports = async () => {
      try {
        const data = await getFetchData("/progress-report/leader");
        setProgressReports(data.progress_reports || []);
      } catch (error) {
        console.error(error);
        setProgressReports([]);
      }
    };
    fetchProgressReports();
  }, []);

  // Filtrar reportes de progreso por título
  const filteredReports = filterBySearch(progressReports, searchTerm, "title");

  return (
    <div className="min-h-screen bg-gray-50 max-w-5xl mx-auto w-full py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Columna izquierda: Lista de reportes de progreso */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-700 mb-2">
          Historial de avances
        </h2>

        {/* Buscador */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Lista de reportes */}
        {filteredReports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <span className="text-gray-500">
              {searchTerm
                ? "No se encontraron avances con ese término"
                : "No tienes reportes de avance registrados"}
            </span>
          </div>
        ) : (
          <div className="space-y-3 max-h-[700px] overflow-y-auto">
            {filteredReports.map((progress, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-lg shadow p-4 border border-gray-200 w-full hover:cursor-pointer transition ${
                  selectedProgress?._id === progress._id
                    ? "ring-2 ring-indigo-400"
                    : ""
                }`}
                onClick={() => setSelectedProgress(progress)}
              >
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  {progress.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      progress.status === "Finalizado"
                        ? "bg-green-100 text-green-700"
                        : progress.status === "En Progreso"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {progress.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(progress.created_at).toLocaleDateString("es-ES")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Columna derecha: Detalles del reporte seleccionado */}
      <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Detalle del avance
        </h2>
        {!selectedProgress ? (
          <div className="flex flex-col items-center justify-center py-8">
            <span className="text-gray-500">
              Selecciona un avance para ver detalles
            </span>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200 w-full">
            <h3 className="text-lg font-semibold text-indigo-700 mb-4">
              {selectedProgress.title}
            </h3>

            <div className="mb-4">
              <span className="font-semibold text-gray-700 block mb-1">
                Descripción:
              </span>
              <p className="text-gray-600">{selectedProgress.description}</p>
            </div>

            <div className="mb-4">
              <span className="font-semibold text-gray-700">Estado:</span>
              <span
                className={`ml-2 px-3 py-1 rounded-full text-white text-xs font-bold ${
                  selectedProgress.status === "Finalizado"
                    ? "bg-green-500"
                    : selectedProgress.status === "En Progreso"
                    ? "bg-yellow-500"
                    : "bg-gray-500"
                }`}
              >
                {selectedProgress.status}
              </span>
            </div>

            <div className="mb-4">
              <span className="font-semibold text-gray-700 block mb-1">
                Tarea asociada:
              </span>
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                <p className="text-gray-800 font-medium">
                  {selectedProgress.task?.title || "Sin título"}
                </p>
                <p className="text-sm text-gray-600">
                  ID: {selectedProgress.task?._id || selectedProgress.task}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <span className="font-semibold text-gray-700 block mb-1">
                Equipo:
              </span>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-gray-800">
                  {selectedProgress.crew?.name || "Sin nombre"}
                </p>
                <p className="text-sm text-gray-600">
                  ID: {selectedProgress.crew?._id || selectedProgress.crew}
                </p>
              </div>
            </div>

            {selectedProgress.location?.lat &&
              selectedProgress.location?.lng && (
                <div className="mb-4">
                  <span className="font-semibold text-gray-700 block mb-1">
                    Ubicación:
                  </span>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <p className="text-sm text-gray-600">
                      Lat: {selectedProgress.location.lat.toFixed(4)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Lng: {selectedProgress.location.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
              )}

            <div className="mb-2">
              <span className="font-semibold text-gray-700 block mb-1">
                Fecha de creación:
              </span>
              <p className="text-gray-600 text-sm">
                {new Date(selectedProgress.created_at).toLocaleString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {selectedProgress.updated_at &&
              selectedProgress.updated_at !== selectedProgress.created_at && (
                <div className="mb-2">
                  <span className="font-semibold text-gray-700 block mb-1">
                    Última actualización:
                  </span>
                  <p className="text-gray-600 text-sm">
                    {new Date(selectedProgress.updated_at).toLocaleString(
                      "es-ES",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
              )}

            <div className="mb-2 mt-4">
              <span className="font-semibold text-gray-700">ID:</span>
              <span className="ml-2 text-gray-700 font-mono text-sm">
                {selectedProgress._id}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerProgressHistory;
