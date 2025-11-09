import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import useFilter from "../../hooks/useFilter";
import CrewDetails from "../../components/details/CrewDetails";

const OperatorTeams = () => {
  const { getFetchData } = useFetch();
  const [crews, setCrews] = useState([]);
  const [selectedCrew, setSelectedCrew] = useState(null);
  const [search, setSearch] = useState("");

  const { filterBySearch } = useFilter();

  useEffect(() => {
    const fetchCrews = async () => {
      try {
        const data = await getFetchData("/crews");
        setCrews(data.crews);
        console.log(data);
      } catch (error) {
        console.error("Error al obtener las cuadrillas:", error);
      }
    };
    fetchCrews();
  }, [selectedCrew]);

  const filteredCrews = filterBySearch(crews, search, "name");

  const handleSelectCrew = (crew) => {
    setSelectedCrew(crew);
  };

  const closePanel = () => setSelectedCrew(null);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col gap-2">
        <h2 className="text-xl font-bold text-gray-700">Cuadrillas</h2>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full max-w-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="space-y-4">
        {filteredCrews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <h3>No hay cuadrillas registradas</h3>
          </div>
        ) : (
          filteredCrews.map((crew, idx) => (
            <div
              key={crew._id || idx}
              className="bg-white rounded-lg shadow p-3 flex justify-between items-center border border-gray-200 w-full max-w-2xl mx-auto min-h-14 hover:cursor-pointer"
              onClick={() => handleSelectCrew(crew)}
            >
              <div>
                <span className="block text-xl font-semibold text-gray-800">
                  {crew.name}
                </span>
                <span className="block text-sm text-gray-500">
                  Miembros: {crew.members ? crew.members.length : 0}
                </span>
              </div>
              <span className="px-4 py-2 rounded-full text-base font-medium bg-blue-100 text-blue-700">
                Ver
              </span>
            </div>
          ))
        )}
        {selectedCrew && (
          <CrewDetails crew={selectedCrew} onClose={closePanel} />
        )}
      </div>
    </div>
  );
};

export default OperatorTeams;
