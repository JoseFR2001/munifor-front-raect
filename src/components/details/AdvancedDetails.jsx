const AdvancedDetails = ({ data, onClose }) => {
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
        {/* Aquí van los detalles avanzados */}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </section>
  );
};

export default AdvancedDetails;
