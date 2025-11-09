import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import useFilter from "../../hooks/useFilter";
import ReportDetails from "../../components/details/ReportDetails";

const OperatorNewReports = () => {
  const { getFetchData, putFetch } = useFetch();
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [search, setSearch] = useState("");
  const { filterBySearch } = useFilter();

  // Definir fetchReports fuera del useEffect para poder reutilizarla
  const fetchReports = async () => {
    try {
      const data = await getFetchData("/report/operator/new-reports");
      setReports(data.reports);
    } catch (error) {
      setReports([]);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSelectReport = (reporte) => {
    setSelectedReport(reporte);
    console.log("Report selected:", reporte);
    putFetch("/report/review", reporte._id);
  };

  const closeModal = () => {
    setSelectedReport(null);
    fetchReports(); // Refresca los reportes solo al cerrar el modal
  };

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

  const filteredReports = filterBySearch(reports, search, "title");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col gap-2">
        <h2 className="text-xl font-bold text-gray-700">
          Nuevos Reportes Pendientes
        </h2>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full max-w-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <h3>No hay reportes pendientes</h3>
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
                  Autor: {reporte?.author?.username}
                </span>
              </div>
              <span className="px-5 py-2 rounded-full text-base font-medium bg-yellow-100 text-yellow-700">
                Pendiente
              </span>
            </div>
          ))
        )}
        {selectedReport && (
          <ReportDetails
            report={selectedReport}
            onReject={handleRejectReport}
            onAccept={handleAcceptReport}
            onClose={closeModal}
            role={"Operador"}
          />
        )}
      </div>
    </div>
  );
};

export default OperatorNewReports;
