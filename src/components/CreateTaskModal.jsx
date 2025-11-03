const CreateTaskModal = ({ closeModal }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center justify-center p-0"
        onClick={(e) => e.stopPropagation()}
      >
        <form className="w-full px-8 py-6 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Crear tarea
          </h1>
          <div className="mb-4 w-full">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Título
            </label>
            <input
              type="text"
              id="title"
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Seleccione una tarea
            </label>
            <select className="border rounded w-full px-3 py-2">
              <option value="">Seleccione</option>
              <option value="Limpieza">Limpieza</option>
              <option value="Reparacion">Reparación</option>
              <option value="Mantenimiento">Mantenimiento</option>
            </select>
          </div>
          <div className="mb-4 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Seleccione un equipo
            </label>
            <select className="border rounded w-full px-3 py-2">
              <option value="">Seleccione</option>
              <option value="Equipo 1">Equipo 1</option>
              <option value="Equipo 2">Equipo 2</option>
              <option value="Equipo 3">Equipo 3</option>
            </select>
          </div>
          <div className="mb-6 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Seleccione la prioridad
            </label>
            <select className="border rounded w-full px-3 py-2">
              <option value="">Seleccione</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>
          <div className="flex justify-end w-full gap-2">
            <button
              type="button"
              className="border p-2 rounded hover:bg-gray-100"
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition"
            >
              Crear tarea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
