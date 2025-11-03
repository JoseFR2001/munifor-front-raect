import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import ReportModal from "../../components/ReportModal";

const OperatorReports = () => {
  const { getFetchData } = useFetch();
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getFetchData("/reports"); // Asume endpoint para todos los reportes ciudadanos
        console.log(data);
        setReports(data.reports);
      } catch (error) {
        console.error("Error al obtener los reportes ciudadanos:", error);
      }
    };
    fetchReports();
  }, []);

  const closeModal = () => setSelectedReport(null);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-700">
          Reportes de Ciudadanos
        </h2>
      </div>
      <div className="space-y-4">
        {reports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <h3>No hay reportes ciudadanos</h3>
          </div>
        ) : (
          reports.map((reporte, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-3 flex justify-between items-center border border-gray-200 w-full max-w-2xl mx-auto min-h-14 hover:cursor-pointer"
              onClick={() => setSelectedReport(reporte)}
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
          <ReportModal report={selectedReport} closeModal={closeModal} />
        )}
      </div>
    </div>
  );
};

export default OperatorReports;
