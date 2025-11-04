import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const OperatorWorkerProgress = () => {
  const { getFetchData } = useFetch();
  const [progressReports, setProgressReports] = useState([]);
  const [selectedProgress, setSelectedProgress] = useState(null);

  useEffect(() => {
    const fetchProgressReports = async () => {
      try {
        const data = await getFetchData("/progress-report");
        setProgressReports(data.progressReports || []);
      } catch (error) {
        setProgressReports([]);
      }
    };
    fetchProgressReports();
  }, []);

  const closeModal = () => setSelectedProgress(null);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-700">
          Avances de Trabajadores
        </h2>
      </div>
      <div className="space-y-4">
        {progressReports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <h3>No hay avances registrados</h3>
          </div>
        ) : (
          progressReports.map((progress, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-3 flex justify-between items-center border border-gray-200 w-full max-w-2xl mx-auto min-h-14 hover:cursor-pointer"
              onClick={() => setSelectedProgress(progress)}
            >
              <div>
                <span className="block text-xl font-semibold text-gray-800">
                  {progress.title}
                </span>
                <span className="block text-sm text-gray-500">
                  Trabajador: {progress.worker?.name || progress.worker}
                </span>
                <span className="block text-sm text-gray-500">
                  Equipo: {progress.crew?.name || progress.crew}
                </span>
              </div>
              <span
                className={`px-5 py-2 rounded-full text-base font-medium ${
                  progress.status === "Finalizado"
                    ? "bg-green-100 text-green-700"
                    : progress.status === "En Progreso"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {progress.status}
              </span>
            </div>
          ))
        )}
        {selectedProgress && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
              <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                {selectedProgress.title}
              </h3>
              <p className="text-gray-600 mb-2">
                {selectedProgress.description}
              </p>
              <div className="mb-2">
                <span className="font-semibold text-gray-700">Trabajador:</span>
                <span className="ml-2 text-gray-600">
                  {selectedProgress.worker?.name || selectedProgress.worker}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700">Equipo:</span>
                <span className="ml-2 text-gray-600">
                  {selectedProgress.crew?.name || selectedProgress.crew}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700">Estado:</span>
                <span className="ml-2 text-gray-600">
                  {selectedProgress.status}
                </span>
              </div>
              {selectedProgress.images &&
                selectedProgress.images.length > 0 && (
                  <div className="mb-2">
                    <span className="font-semibold text-gray-700">
                      Imágenes:
                    </span>
                    <div className="flex gap-2 mt-2">
                      {selectedProgress.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="avance"
                          className="h-20 w-20 object-cover rounded"
                        />
                      ))}
                    </div>
                  </div>
                )}
              <button
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                onClick={closeModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OperatorWorkerProgress;
