import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const WorkerProgress = () => {
  const { getFetchData, postFetchData } = useFetch();
  const [progressReports, setProgressReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getFetchData("/report/worker"); // Endpoint para reportes de avance del trabajador
        setProgressReports(Array.isArray(data?.report) ? data.report : []);
      } catch (error) {
        setProgressReports([]);
      }
    };
    fetchReports();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await postFetchData("/report", form); // Reutiliza el modelo de reporte
      setShowForm(false);
      setForm({ title: "", description: "" });
      // Refrescar lista
      const data = await getFetchData("/report/worker");
      setProgressReports(Array.isArray(data?.report) ? data.report : []);
    } catch (error) {
      // Manejo de error
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-4xl mx-auto w-full py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-700">
          Progreso del Trabajador
        </h1>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={() => setShowForm(true)}
        >
          Nuevo reporte de avance
        </button>
      </div>

      {/* Formulario modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Crear reporte de avance</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                placeholder="Título"
                value={form.title}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2"
                required
              />
              <textarea
                name="description"
                placeholder="Descripción"
                value={form.description}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2"
                required
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setShowForm(false)}
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Listado de reportes */}
        <div>
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Tus reportes de avance
          </h2>
          {progressReports.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <span className="text-gray-500">
                No tienes reportes de avance
              </span>
            </div>
          ) : (
            progressReports.map((report, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-lg shadow p-3 flex justify-between items-center border border-gray-200 w-full mb-3 min-h-14 hover:cursor-pointer ${
                  selectedReport?._id === report._id
                    ? "ring-2 ring-blue-400"
                    : ""
                }`}
                onClick={() => setSelectedReport(report)}
              >
                <span className="block text-base font-semibold text-gray-800">
                  {report.title}
                </span>
                <span className="px-5 py-2 rounded-full text-base font-medium bg-indigo-100 text-indigo-700">
                  {new Date(report.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>
        {/* Detalle del reporte seleccionado */}
        <div>
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Detalle del reporte
          </h2>
          {!selectedReport ? (
            <div className="flex flex-col items-center justify-center py-8">
              <span className="text-gray-500">
                Selecciona un reporte para ver detalles
              </span>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200 w-full">
              <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                {selectedReport.title}
              </h3>
              <p className="text-gray-600 mb-2">{selectedReport.description}</p>
              <div className="mb-2">
                <span className="font-semibold text-gray-700">Fecha:</span>
                <span className="ml-2 text-gray-600">
                  {new Date(selectedReport.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700">ID:</span>
                <span className="ml-2 text-gray-700 font-mono">
                  {selectedReport._id}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerProgress;
