const ProgressWorkerDetail = ({ progress, onClose }) => {
  const formatDate = (d) => {
    if (!d) return "-";
    try {
      return new Date(d).toLocaleString();
    } catch (e) {
      return String(d);
    }
  };

  return (
    <section className="absolute top-0 right-0 h-full max-w-md w-full bg-white shadow-2xl z-40 flex flex-col border-l border-gray-200">
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold">Detalles del Avance</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
          ✕
        </button>
      </div>
      <div className="p-6 flex-1 overflow-y-auto">
        <p>
          <span className="font-semibold">Título:</span>{" "}
          {progress?.title || "-"}
        </p>
        <p>
          <span className="font-semibold">Descripción:</span>{" "}
          {progress?.description || "-"}
        </p>
        <p>
          <span className="font-semibold">Trabajador:</span>{" "}
          {progress?.worker?.name || progress?.worker || "-"}
        </p>
        <p>
          <span className="font-semibold">Cuadrilla:</span>{" "}
          {progress?.crew?.name || progress?.crew || "-"}
        </p>
        <p>
          <span className="font-semibold">Tarea:</span>{" "}
          {progress?.task?.title || progress?.task || "-"}
        </p>
        <p>
          <span className="font-semibold">Estado:</span>{" "}
          {progress?.status || "-"}
        </p>
        <p>
          <span className="font-semibold">Creado:</span>{" "}
          {formatDate(progress?.created_at)}
        </p>
        <p>
          <span className="font-semibold">Actualizado:</span>{" "}
          {formatDate(progress?.updated_at)}
        </p>
      </div>
    </section>
  );
};

export default ProgressWorkerDetail;
