import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import ReportLeafletMap from "./LeafletMaps/ReportLeafletMap";

const ReportModal = ({ report, closeModal, onReject, onAccept }) => {
  const { user } = useContext(UserContext);
  const handleGetDirections = () => {
    const { lat, lng } = report.location;
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col items-center justify-center p-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Card principal */}
        <div className="w-full flex flex-col items-center">
          {/* Mapa */}
          <div className="w-80 h-80 mb-2 rounded-lg overflow-hidden shadow">
            <ReportLeafletMap location={report.location} />
          </div>
          {/* Coordenadas y botón */}
          <div className="flex flex-row items-center justify-center gap-2 mb-4">
            <span className="font-semibold text-gray-700">Coordenadas:</span>
            <span className="text-blue-700 font-mono">
              {report.location?.lat && report.location?.lng
                ? `${report.location.lat}, ${report.location.lng}`
                : "Sin coordenadas"}
            </span>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm font-medium ml-2"
              onClick={handleGetDirections}
              disabled={!(report.location?.lat && report.location?.lng)}
            >
              Cómo llegar
            </button>
          </div>
        </div>
        <div className="w-full px-8 py-6 flex flex-col items-center">
          {(user?.role === "admin" || user?.role === "operator") && (
            <div className="mb-2 w-full text-left">
              <span className="font-semibold text-gray-700">Autor:</span>
              <span className="ml-2 text-gray-600">{report.author}</span>
            </div>
          )}
          <h2 className="text-xl font-bold text-gray-900 mb-1 text-center">
            {report.title}
          </h2>
          <p className="text-gray-600 text-sm mb-3 text-center">
            {report.description}
          </p>
          <div className="flex flex-row justify-center gap-6 w-full mb-2">
            <div>
              <span className="font-semibold text-gray-700">Tipo:</span>
              <span className="ml-2 text-gray-600">{report.report_type}</span>
            </div>
          </div>
          <div className="flex flex-row justify-center gap-6 w-full mb-4">
            <div>
              <span className="font-semibold text-gray-700">Estado:</span>
              <span
                className={`ml-2 px-3 py-1 rounded-full text-white text-xs font-bold ${
                  report.status === "Resuelto"
                    ? "bg-green-500"
                    : report.status === "En proceso"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                {report.status}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">ID:</span>
              <span className="ml-2 text-gray-700 font-mono">{report._id}</span>
            </div>
          </div>
          <div>
            <button
              className="border p-1 m-1 hover:cursor-pointer"
              onClick={() => onAccept(report._id)}
            >
              Convertir en tarea
            </button>
            <button
              className="border p-1 m-1 hover:cursor-pointer"
              onClick={() => onReject(report._id)}
            >
              Rechazar
            </button>
            <button
              className="border p-1 m-1 hover:cursor-pointer"
              onClick={closeModal}
            >
              cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
