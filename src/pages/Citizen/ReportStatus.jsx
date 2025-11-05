import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import useFetch from "../../hooks/useFetch";
import ReportModal from "../../components/ReportModal";
import { Link } from "react-router-dom";
import ReportDetails from "../../components/details/ReportDetails";

const ReportStatus = () => {
  const { user } = useContext(UserContext);
  const { getFetchData } = useFetch();
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // El backend ahora obtiene los reportes del usuario logueado por sesión
        const data = await getFetchData("/reports/author");
        setReports(data.reports);
        console.log("Reportes obtenidos:", data.reports);
      } catch (error) {
        console.error("Error al obtener los reportes:", error);
      }
    };
    fetchReports();
  }, [user]);

  const closeModal = () => {
    setSelectedReport(null);
  };

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
  const filteredReports = (
    filter === "Todos" ? reports : reports.filter((r) => r.status === filter)
  ).filter((r) => r.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="relative w-full flex-1">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col gap-2">
          <h2 className="text-xl font-bold text-gray-700">Tus Reportes</h2>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 w-full max-w-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        {/* Mostrar siempre los botones de filtro */}
        <div className="max-w-4xl mx-auto px-4 pb-4 flex gap-2">
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
              <h3>¡Haz tu primer reporte!</h3>
              <Link to="/citizen/reports" className="border">
                Hacer reporte
              </Link>
            </div>
          ) : (
            filteredReports.map((reporte, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow p-3 flex justify-between items-center border border-gray-200 w-full max-w-2xl mx-auto min-h-14 hover:cursor-pointer"
                onClick={() => setSelectedReport(reporte)}
              >
                <div>
                  <span className="block text-xl font-semibold text-gray-800">
                    {reporte.title}
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
            <ReportDetails report={selectedReport} onClose={closeModal} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportStatus;
