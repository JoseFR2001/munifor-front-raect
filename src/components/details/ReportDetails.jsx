import ReportLeafletMap from "../LeafletMaps/ReportLeafletMap";

const ReportDetails = ({ report, onClose, role, onAccept, onReject }) => {
  const handleGetDirections = () => {
    const { lat, lng } = report.location;
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };
  const isOperatorOrAdmin = role === "Operador" || role === "Administrador";
  return (
    <section className="absolute top-0 right-0 h-full max-w-md w-full bg-white shadow-2xl z-40 flex flex-col border-l border-gray-200">
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold">Detalles del Reporte</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
          ✕
        </button>
      </div>
      <div className="p-6 flex-1 overflow-y-auto">
        {/* Aquí van los detalles del reporte */}
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
        <p>
          <span className="font-semibold">Título:</span> {report?.title}
        </p>
        <p>
          <span className="font-semibold">Descripción:</span>{" "}
          {report?.description}
        </p>
        <p>
          <span className="font-semibold">Estado:</span> {report?.status}
        </p>
        {/* Botones para operador/administrador */}
        {isOperatorOrAdmin && (
          <div className="flex gap-4 mt-6">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              onClick={() => onAccept && onAccept(report._id)}
            >
              Aceptar
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              onClick={() => onReject && onReject(report._id)}
            >
              Rechazar
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReportDetails;
