const AdvancedDetails = ({ data, onClose }) => {
  // Detectar si los datos corresponden a un ProgressReport por la presencia de campos conocidos
  const isProgressReport = !!(
    data &&
    (data.worker || data.crew || data.task || data.status)
  );

  const formatDate = (d) => {
    if (!d) return "-";
    try {
      return new Date(d).toLocaleString();
    } catch (e) {
      return String(d);
    }
  };

  return (
    <section
      className="absolute top-0 right-0 h-full max-w-md w-full bg-white shadow-2xl z-40 flex flex-col border-l border-gray-200"
      style={{ position: "absolute" }}
    >
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold">Detalles Avanzados</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
          ✕
        </button>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        {isProgressReport ? (
          <div className="space-y-3">
            <p>
              <span className="font-semibold">Título:</span> {data.title || "-"}
            </p>
            <p>
              <span className="font-semibold">Descripción:</span>{" "}
              {data.description || "-"}
            </p>
            <p>
              <span className="font-semibold">Trabajador:</span>{" "}
              {data.worker?.name || data.worker || "-"}
            </p>
            <p>
              <span className="font-semibold">Cuadrilla:</span>{" "}
              {data.crew?.name || data.crew || "-"}
            </p>
            <p>
              <span className="font-semibold">Tarea:</span>{" "}
              {data.task?.title || data.task || "-"}
            </p>
            <p>
              <span className="font-semibold">Estado:</span>{" "}
              {data.status || "-"}
            </p>
            <p>
              <span className="font-semibold">Creado:</span>{" "}
              {formatDate(data.created_at)}
            </p>
            <p>
              <span className="font-semibold">Actualizado:</span>{" "}
              {formatDate(data.updated_at)}
            </p>
          </div>
        ) : (
          // Fallback genérico para otros tipos de datos
          <pre className="whitespace-pre-wrap wrap-break-word">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </section>
  );
};

export default AdvancedDetails;
