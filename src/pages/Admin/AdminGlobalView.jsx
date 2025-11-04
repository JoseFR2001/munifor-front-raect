const AdminGlobalView = () => {
  return (
    <div className="min-h-screen bg-gray-50 max-w-6xl mx-auto w-full py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Sección 1: lista */}
      <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">Listado</h2>
        {/* Aquí irá la lista de elementos */}
      </div>
      {/* Sección 2: detalles */}
      <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">Detalle</h2>
        {/* Aquí irán los detalles del elemento seleccionado */}
      </div>
    </div>
  );
};

export default AdminGlobalView;
