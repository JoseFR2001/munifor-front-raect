import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import useFilter from "../../hooks/useFilter";

//Esto fue full IA no entiendo ni un poco

const OperatorCreateTeams = () => {
  const { getFetchData, postFetchLocalStorage } = useFetch();
  const [workers, setWorkers] = useState([]);
  const [search, setSearch] = useState("");
  const { filterBySearch } = useFilter();
  const [name, setName] = useState("");
  const [leader, setLeader] = useState(null); // id del líder
  const [members, setMembers] = useState([]); // ids de los miembros
  const [selectingLeader, setSelectingLeader] = useState(false);
  const [selectingMembers, setSelectingMembers] = useState(false);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const data = await getFetchData("/user/workers");
        console.log(data);
        setWorkers(data.workers);
      } catch (error) {
        console.error("Error al obtener los trabajadores:", error);
      }
    };
    fetchWorkers();
  }, []);

  // Selección de líder (solo uno)
  const handleLeaderSelect = (workerId) => {
    setLeader(workerId);
    setSelectingLeader(false);
    // Si estaba como miembro, lo quitamos de miembros
    setMembers((prev) => prev.filter((id) => id !== workerId));
  };

  const handleRemoveLeader = () => {
    setLeader(null);
  };

  // Selección de miembros (varios, no puede ser el líder)
  const handleMemberSelect = (workerId) => {
    if (workerId === leader) return;
    setMembers((prev) =>
      prev.includes(workerId)
        ? prev.filter((id) => id !== workerId)
        : [...prev, workerId]
    );
  };

  const handleSubmit = () => {
    const payload = {
      name,
      leader,
      members,
    };
    console.log("Payload para crear equipo:", payload);
    postFetchLocalStorage("/crew", payload);
    setMembers([]);
    setLeader(null);
    setName("");
  };

  // Filtrar trabajadores por username antes del render
  const filteredWorkers = filterBySearch(workers, search, "username");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col items-center">
        <h2 className="text-xl font-bold text-gray-700">
          Equipos y Trabajadores
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
        {/* Columna de trabajadores disponibles */}
        <div>
          <h3 className="text-lg font-semibold text-blue-700 mb-4">
            Trabajadores disponibles
          </h3>
          <input
            type="text"
            placeholder="Buscar trabajador..."
            className="border rounded px-3 py-2 w-full max-w-md focus:outline-none focus:ring focus:border-blue-300 mb-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* Lista de trabajadores filtrados por username */}
          {filteredWorkers.length > 0 ? (
            filteredWorkers.map((worker) => (
              <div
                key={worker._id}
                className={`bg-white rounded-lg shadow p-3 flex flex-col border w-full mb-3 min-h-14 hover:cursor-pointer ${
                  members.includes(worker._id)
                    ? "border-blue-500 ring-2 ring-blue-300"
                    : "border-gray-200"
                }`}
                onClick={() => {
                  handleMemberSelect(worker._id);
                }}
              >
                <span className="block text-base font-semibold text-gray-800">
                  {worker.username}
                </span>
                <span className="text-sm text-gray-500">
                  {worker.role || "Sin rol"}
                </span>
              </div>
            ))
          ) : (
            <div className="py-2">No hay trabajadores disponibles</div>
          )}
        </div>
        {/* Columna del formulario para crear crew */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-700 mb-4">
            Crear nuevo equipo
          </h3>
          {/* Input para nombre */}
          <div className="mb-6">
            <label className="block font-medium mb-2">Nombre del equipo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded px-3 py-2 w-full max-w-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Ingrese el nombre del equipo"
            />
          </div>
          {/* Selección de líder */}
          <div className="mb-6">
            <label className="block font-medium mb-2">Seleccione líder</label>
            <div className="flex items-center gap-2 mb-2">
              <button
                type="button"
                className={`px-4 py-2 rounded font-medium transition-colors duration-150 ${
                  leader ? "bg-red-600 text-white" : "bg-blue-600 text-white"
                }`}
                onClick={() =>
                  leader ? handleRemoveLeader() : setSelectingLeader(true)
                }
              >
                {leader ? "Eliminar" : "Seleccionar"}
              </button>
              {leader && (
                <span className="ml-2 font-semibold text-blue-700">
                  {workers.find((w) => w._id === leader)?.username}
                </span>
              )}
            </div>
            {selectingLeader && (
              <div className="flex flex-wrap gap-2 mt-2">
                {workers.length > 0 ? (
                  workers
                    .filter((w) => !members.includes(w._id))
                    .map((worker) => (
                      <div
                        key={worker._id}
                        className={`bg-white rounded-lg shadow p-3 flex flex-col border hover:cursor-pointer min-w-[140px] min-h-14 text-center transition-all
                        ${
                          leader === worker._id
                            ? "border-red-600 ring-2 ring-red-400"
                            : "border-gray-200"
                        }
                      `}
                        onClick={() => handleLeaderSelect(worker._id)}
                      >
                        <span className="block text-base font-semibold text-gray-800">
                          {worker.username}
                        </span>
                        <span className="text-sm text-gray-500">
                          {worker.role || "Sin rol"}
                        </span>
                      </div>
                    ))
                ) : (
                  <span>No hay trabajadores disponibles</span>
                )}
              </div>
            )}
          </div>
          {/* Selección de miembros */}
          <div className="mb-6">
            <label className="block font-medium mb-2">
              Seleccione miembros
            </label>
            <div className="flex items-center gap-2 mb-2">
              <button
                type="button"
                className="px-4 py-2 rounded font-medium transition-colors duration-150 bg-blue-600 text-white"
                onClick={() => setSelectingMembers(!selectingMembers)}
              >
                Seleccionar
              </button>
              {members.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {members.map((id) => (
                    <span
                      key={id}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-medium"
                    >
                      {workers.find((w) => w._id === id)?.username}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {selectingMembers && (
              <div className="flex flex-wrap gap-2 mt-2">
                {workers.length > 0 ? (
                  workers
                    .filter((w) => w._id !== leader)
                    .map((worker) => (
                      <div
                        key={worker._id}
                        className={`bg-white rounded-lg shadow p-3 flex flex-col border hover:cursor-pointer min-w-[140px] min-h-14 text-center transition-all
                        ${
                          members.includes(worker._id)
                            ? "border-blue-500 ring-2 ring-blue-300"
                            : "border-gray-200"
                        }
                      `}
                        onClick={() => handleMemberSelect(worker._id)}
                      >
                        <span className="block text-base font-semibold text-gray-800">
                          {worker.username}
                        </span>
                        <span className="text-sm text-gray-500">
                          {worker.role || "Sin rol"}
                        </span>
                      </div>
                    ))
                ) : (
                  <span>No hay trabajadores disponibles</span>
                )}
              </div>
            )}
          </div>
          {/* Aquí luego irá el resto del formulario (submit, etc) */}
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 rounded font-medium transition-colors duration-150 bg-blue-600 text-white"
              onClick={handleSubmit}
            >
              Crear equipo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatorCreateTeams;
