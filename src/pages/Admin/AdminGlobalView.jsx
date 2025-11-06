import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import useFilter from "../../hooks/useFilter";
import ReportDetails from "../../components/details/ReportDetails";
import TaskDetails from "../../components/details/TaskDetails";
import CrewDetails from "../../components/details/CrewDetails";
import ProgressWorkerDetail from "../../components/details/ProgressWorkerDetail";

const AdminGlobalView = () => {
  const { getFetchData } = useFetch();
  const { filterBySearch } = useFilter();

  const [reports, setReports] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [crews, setCrews] = useState([]);
  const [progress, setProgress] = useState([]);

  const [selectedType, setSelectedType] = useState("All");
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const [selectedDetail, setSelectedDetail] = useState(null);

  useEffect(() => {
    // Traer todos los recursos en paralelo
    const fetchAll = async () => {
      try {
        const [rRes, tRes, cRes, pRes] = await Promise.all([
          getFetchData("/reports"),
          getFetchData("/tasks"),
          getFetchData("/crews"),
          getFetchData("/progress-report"),
        ]);

        setReports(rRes?.reports || []);
        setTasks(tRes?.tasks || tRes || []);
        setCrews(cRes?.crews || cRes || []);
        setProgress(pRes?.progressReports || pRes || []);
      } catch (err) {
        console.error("Error fetching admin global data:", err);
      }
    };

    fetchAll();
  }, []);

  // campos de búsqueda disponibles según tipo seleccionado
  const fieldOptionsByType = {
    All: ["title", "author", "name", "worker.name"],
    Reports: ["title", "author"],
    Tasks: ["title"],
    Crews: ["name"],
    Progress: ["title", "worker.name"],
  };

  useEffect(() => {
    // establecer campo por defecto según el tipo
    const opts = fieldOptionsByType[selectedType] || ["title"];
    setSearchField((prev) => (opts.includes(prev) ? prev : opts[0]));
  }, [selectedType]);

  // Helpers para obtener resultados filtrados por tipo
  const getFilteredReports = () => {
    if (!search) return reports;
    // si el campo es author intentar buscar por author
    if (searchField === "author")
      return filterBySearch(reports, search, "author");
    return filterBySearch(reports, search, searchField || "title");
  };

  const getFilteredTasks = () => {
    if (!search) return tasks;
    return filterBySearch(tasks, search, searchField || "title");
  };

  const getFilteredCrews = () => {
    if (!search) return crews;
    return filterBySearch(crews, search, searchField || "name");
  };

  const getFilteredProgress = () => {
    if (!search) return progress;
    // worker.name soportado por filterBySearch
    return filterBySearch(progress, search, searchField || "title");
  };

  // para la vista "All" combinamos los resultados en secciones
  const filteredReports = getFilteredReports();
  const filteredTasks = getFilteredTasks();
  const filteredCrews = getFilteredCrews();
  const filteredProgress = getFilteredProgress();

  // seleccionar qué lista mostrar según selectedType
  const renderList = () => {
    switch (selectedType) {
      case "Reports":
        return renderItems(filteredReports, "report");
      case "Tasks":
        return renderItems(filteredTasks, "task");
      case "Crews":
        return renderItems(filteredCrews, "crew");
      case "Progress":
        return renderItems(filteredProgress, "progress");
      default:
        return (
          <div className="space-y-6">
            {filteredReports.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold mb-2">Reportes</h3>
                {renderItems(filteredReports, "report")}
              </section>
            )}
            {filteredTasks.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold mb-2">Tareas</h3>
                {renderItems(filteredTasks, "task")}
              </section>
            )}
            {filteredCrews.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold mb-2">Cuadrillas</h3>
                {renderItems(filteredCrews, "crew")}
              </section>
            )}
            {filteredProgress.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold mb-2">Avances</h3>
                {renderItems(filteredProgress, "progress")}
              </section>
            )}
          </div>
        );
    }
  };

  // render helper para listas genéricas
  const renderItems = (items, type) => {
    if (!items || items.length === 0)
      return <p className="text-sm text-gray-500">No hay elementos</p>;

    return items.map((it, i) => {
      const key = it._id || it.id || i;
      // Determinar título y subtitle según tipo
      let title = "";
      let subtitle = "";
      switch (type) {
        case "report":
          title = it.title || it.name || "Sin título";
          subtitle = `Autor: ${it.author || it.author_name || "-"}`;
          break;
        case "task":
          title = it.title || "Sin título";
          subtitle = `Estado: ${it.status || "-"} • Prioridad: ${
            it.priority || "-"
          }`;
          break;
        case "crew":
          title = it.name || "Sin nombre";
          subtitle = `Miembros: ${it.members ? it.members.length : 0}`;
          break;
        case "progress":
          title = it.title || "Sin título";
          subtitle = `Trabajador: ${it.worker?.name || it.worker || "-"}`;
          break;
        default:
          title = JSON.stringify(it);
      }

      return (
        <div
          key={key}
          onClick={() => setSelectedDetail({ type, data: it })}
          className="bg-white rounded-lg shadow p-3 flex justify-between items-center border border-gray-200 w-full max-w-4xl mx-auto min-h-14 hover:cursor-pointer hover:bg-gray-50"
        >
          <div>
            <span className="block text-lg font-semibold text-gray-800">
              {title}
            </span>
            <span className="block text-sm text-gray-500">{subtitle}</span>
          </div>
          <span className="text-sm text-gray-400">{type}</span>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-6xl mx-auto w-full py-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex gap-2 items-center">
          {["All", "Reports", "Tasks", "Crews", "Progress"].map((t) => (
            <button
              key={t}
              className={`px-3 py-1 rounded border font-medium ${
                selectedType === t
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border-blue-600"
              }`}
              onClick={() => setSelectedType(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder={`Buscar por ${searchField || "campo"}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 w-64 focus:outline-none focus:ring focus:border-blue-300"
          />

          <select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {(fieldOptionsByType[selectedType] || []).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-6">{renderList()}</div>

      {selectedDetail && (
        <div>
          {selectedDetail.type === "report" && (
            <ReportDetails
              report={selectedDetail.data}
              onClose={() => setSelectedDetail(null)}
              role={"Administrador"}
            />
          )}

          {selectedDetail.type === "task" && (
            <TaskDetails
              task={selectedDetail.data}
              onClose={() => setSelectedDetail(null)}
            />
          )}

          {selectedDetail.type === "crew" && (
            <CrewDetails
              crew={selectedDetail.data}
              onClose={() => setSelectedDetail(null)}
            />
          )}

          {selectedDetail.type === "progress" && (
            <ProgressWorkerDetail
              progress={selectedDetail.data}
              onClose={() => setSelectedDetail(null)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AdminGlobalView;
