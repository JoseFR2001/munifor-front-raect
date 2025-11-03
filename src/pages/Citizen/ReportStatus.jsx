import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import useFetch from "../../hooks/useFetch";
import ReportModal from "../../components/ReportModal";

const ReportStatus = () => {
  const { user } = useContext(UserContext);
  const { getByIdFetch } = useFetch();
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getByIdFetch("/reports/author", user._id);
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-700">Tus Reportes</h2>
      </div>
      <div className="space-y-4">
        {reports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <h3>¡Haz tu primer reporte!</h3>
            <a href="/citizen/reports" className="border">
              Hacer reporte
            </a>
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

export default ReportStatus;
