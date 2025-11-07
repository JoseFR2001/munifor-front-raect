import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useFilter from "../../hooks/useFilter";
import ReportDetails from "../../components/details/ReportDetails";

const OperatorReports = () => {
  const { getFetchData, putFetch } = useFetch();
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get("status");
  const [filter, setFilter] = useState(() => statusParam || "Todos");
  const [search, setSearch] = useState("");
  const { filterReportsByStatus, filterBySearch } = useFilter();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getFetchData("/reports");
        setReports(data.reports);
      } catch (error) {
        console.error("Error al obtener los reportes ciudadanos:", error);
      }
    };
    fetchReports();
  }, [selectedReport]);

  // Filtros disponibles según los estados del backend
  const statusOptions = [
    "Todos",
    "Pendiente",
    "Revisado",
    "Aceptado",
    "Completado",
    "Rechazado",
  ];

  // Filtrar reportes según el filtro seleccionado y el buscador
  // filterReportsByStatus ya maneja el caso 'Todos'
  const filteredReports = filterBySearch(
    filterReportsByStatus(reports, filter),
    search,
    "title"
  );

  const handleSelectReport = (reporte) => {
    setSelectedReport(reporte);
    console.log(reporte);
    if (reporte.status === "Pendiente") {
      putFetch("/report/review", reporte._id);
    }
  };

  const closeModal = () => setSelectedReport(null);

  const handleRejectReport = (id) => {
    console.log("Report rejected:", id);
    putFetch("/report/reject", id);
    closeModal();
  };

  const handleAcceptReport = (id) => {
    console.log("Report accepted:", id);
    putFetch("/report/accept", id);
    closeModal();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col gap-2">
        <h2 className="text-xl font-bold text-gray-700">
          Reportes de Ciudadanos
        </h2>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full max-w-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      {/* Mostrar siempre los botones de filtro */}
      <div className="max-w-5xl mx-auto px-4 pb-4 flex gap-2">
        {statusOptions.map((option) => (
          <button
            key={option}
            className={`px-4 py-2 rounded border font-medium transition-colors duration-150
              ${
                filter === option
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border-blue-600"
              }`}
            onClick={() => setFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <h3>No hay reportes ciudadanos</h3>
          </div>
        ) : (
          filteredReports.map((reporte, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-3 flex justify-between items-center border border-gray-200 w-full max-w-2xl mx-auto min-h-14 hover:cursor-pointer"
              onClick={() => handleSelectReport(reporte)}
            >
              <div>
                <span className="block text-xl font-semibold text-gray-800">
                  {reporte.title}
                </span>
                <span className="block text-sm text-gray-500">
                  Autor: {reporte.author}
                </span>
              </div>
              <span
                className={`px-5 py-2 rounded-full text-base font-medium 
                  ${
                    reporte.status === "Resuelto"
                      ? "bg-green-100 text-green-700"
                      : reporte.status === "En proceso"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
              >
                {reporte.status}
              </span>
            </div>
          ))
        )}
        {selectedReport && (
          <ReportDetails
            report={selectedReport}
            onClose={closeModal}
            onReject={handleRejectReport}
            onAccept={handleAcceptReport}
            role={"Operador"}
          />
        )}
      </div>
    </div>
  );
};

export default OperatorReports;
