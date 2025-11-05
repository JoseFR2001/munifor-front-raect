const CrewDetails = ({ crew, onClose }) => {
  return (
    <section
      className="absolute top-0 right-0 h-full max-w-md w-full bg-white shadow-2xl z-40 flex flex-col border-l border-gray-200"
      style={{ position: "absolute" }}
    >
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold">Detalles de la Cuadrilla</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
          ✕
        </button>
      </div>
      <div className="p-6 flex-1 overflow-y-auto">
        {/* Aquí van los detalles de la cuadrilla */}
        <p>
          <span className="font-semibold">Nombre:</span> {crew?.name}
        </p>
        <p>
          <span className="font-semibold">Miembros:</span>{" "}
          {crew?.members?.join(", ")}
        </p>
        {/* Puedes agregar más campos aquí */}
      </div>
    </section>
  );
};

export default CrewDetails;
