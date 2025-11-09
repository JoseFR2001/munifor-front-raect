import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import CreateTaskModal from "../../components/CreateTaskModal";
import useFilter from "../../hooks/useFilter";

const OperatorCreateTask = () => {
  const { getFetchData, postFetchLocalStorage } = useFetch();
  const [reports, setReports] = useState([]);
  const [crews, setCrews] = useState([]);
  const [searchReport, setSearchReport] = useState("");
  const [searchCrew, setSearchCrew] = useState("");
  const { filterBySearch } = useFilter();
  const [modal, setModal] = useState(false);
  const [reportSelected, setReportSelected] = useState([]);
  const [crewSelected, setCrewSelected] = useState(null); // id del crew seleccionado

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFetchData("/reports/operator/accepted");
      console.log(data);
      setReports(data.reports || []);
      setCrews(data.crews || []);
    };
    fetchData();
  }, [modal]);

  const handleCloseModal = () => {
    setModal(false);
  };
  const handleSelectReport = (report) => {
    setReportSelected((prev) =>
      prev.includes(report._id)
        ? prev.filter((id) => id !== report._id)
        : [...prev, report._id]
    );
  };

  // Selección única de crew
  const handleSelectCrew = (crew) => {
    setCrewSelected(crew._id === crewSelected ? null : crew._id);
  };

  const handleSubmit = (payload) => {
    console.log(payload);
    postFetchLocalStorage("/task", payload);
    setCrewSelected(null);
    setReportSelected([]);
  };

  // Filtrar reportes y crews por búsqueda
  const filteredReports = filterBySearch(reports, searchReport, "title");
  const filteredCrews = filterBySearch(crews, searchCrew, "name");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col items-center">
        <h2 className="text-xl font-bold text-gray-700">Tareas</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-2"
          onClick={() => setModal(true)}
        >
          Crear tarea
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
        {/* Columna de reportes aceptados */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-700 mb-4">
            Reportes aceptados
          </h3>
          <input
            type="text"
            placeholder="Buscar por nombre de reporte..."
            className="border rounded px-3 py-2 w-full max-w-md focus:outline-none focus:ring focus:border-blue-300 mb-4"
            value={searchReport}
            onChange={(e) => setSearchReport(e.target.value)}
          />
          {filteredReports.map((reporte) => (
            <div
              key={reporte._id}
              className={`bg-white rounded-lg shadow p-3 flex flex-col border w-full mb-3 min-h-14 hover:cursor-pointer ${
                reportSelected.includes(reporte._id)
                  ? "border-blue-500 ring-2 ring-blue-300"
                  : "border-gray-200"
              }`}
              onClick={() => handleSelectReport(reporte)}
            >
              <span className="block text-base font-semibold text-gray-800">
                {reporte.title}
              </span>
              <span className="text-sm text-gray-500">
                {reporte.description}
              </span>
            </div>
          ))}
        </div>
        {/* Columna de crews */}
        <div>
          <h3 className="text-lg font-semibold text-blue-700 mb-4">Crews</h3>
          <input
            type="text"
            placeholder="Buscar por nombre de crew..."
            className="border rounded px-3 py-2 w-full max-w-md focus:outline-none focus:ring focus:border-blue-300 mb-4"
            value={searchCrew}
            onChange={(e) => setSearchCrew(e.target.value)}
          />
          {filteredCrews.length > 0 ? (
            filteredCrews.map((crew) => (
              <div
                key={crew._id}
                className={`bg-white rounded-lg shadow p-3 flex flex-col border w-full mb-3 min-h-14 hover:cursor-pointer transition-all
                  ${
                    crewSelected === crew._id
                      ? "border-blue-600 ring-2 ring-blue-400"
                      : "border-gray-200"
                  }
                `}
                onClick={() => handleSelectCrew(crew)}
              >
                <span className="block text-base font-semibold text-gray-800">
                  {crew.name}
                </span>
                <span className="text-sm text-gray-500">
                  {crew.description}
                </span>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow p-3 flex flex-col border border-gray-200 w-full mb-3 min-h-14">
              <span className="block text-base font-semibold text-gray-800">
                No hay cuadrillas disponibles
              </span>
            </div>
          )}
        </div>
      </div>
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <CreateTaskModal
            onClose={handleCloseModal}
            crewSelected={crewSelected}
            reportSelected={reportSelected}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default OperatorCreateTask;
