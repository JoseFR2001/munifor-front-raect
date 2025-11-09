import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import useFilter from "../../hooks/useFilter";
import TaskDetails from "../../components/details/TaskDetails";

const OperatorTasks = () => {
  const { getFetchData } = useFetch();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [priorityFilter, setPriorityFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const { filterTasksByStatus, filterTasksByPriority, filterBySearch } =
    useFilter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getFetchData("/task/operator");
        setTasks(data.tasks);
        console.log(data.tasks);
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
      }
    };
    fetchTasks();
  }, [selectedTask]);

  // Opciones de filtros
  const statusOptions = ["Todos", "Pendiente", "En Progreso", "Finalizada"];
  const priorityOptions = ["Todos", "Baja", "Media", "Alta"];

  // Aplicar filtros usando useFilter (encadenados)
  const filteredTasks = filterBySearch(
    filterTasksByPriority(
      filterTasksByStatus(tasks, statusFilter),
      priorityFilter
    ),
    search,
    "title"
  );

  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };

  const closePanel = () => setSelectedTask(null);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col gap-2">
        <h2 className="text-xl font-bold text-gray-700">Tareas</h2>
        <input
          type="text"
          placeholder="Buscar por título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full max-w-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Filtro por Estado */}
      <div className="max-w-5xl mx-auto px-4 pb-2">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">
          Filtrar por Estado:
        </h3>
        <div className="flex gap-2 flex-wrap">
          {statusOptions.map((option) => (
            <button
              key={option}
              className={`px-4 py-2 rounded border font-medium transition-colors duration-150
              ${
                statusFilter === option
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border-blue-600"
              }`}
              onClick={() => setStatusFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Filtro por Prioridad */}
      <div className="max-w-5xl mx-auto px-4 pb-4">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">
          Filtrar por Prioridad:
        </h3>
        <div className="flex gap-2 flex-wrap">
          {priorityOptions.map((option) => (
            <button
              key={option}
              className={`px-4 py-2 rounded border font-medium transition-colors duration-150
              ${
                priorityFilter === option
                  ? "bg-green-600 text-white"
                  : "bg-white text-green-600 border-green-600"
              }`}
              onClick={() => setPriorityFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <h3>No hay tareas disponibles</h3>
          </div>
        ) : (
          filteredTasks.map((task, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-3 flex justify-between items-center border border-gray-200 w-full max-w-2xl mx-auto min-h-14 hover:cursor-pointer"
              onClick={() => handleSelectTask(task)}
            >
              <div>
                <span className="block text-xl font-semibold text-gray-800">
                  {task.title}
                </span>
                <span className="block text-sm text-gray-500">
                  Prioridad: {task.priority} | Estado: {task.status}
                </span>
              </div>
              <span
                className={`px-5 py-2 rounded-full text-base font-medium 
                  ${
                    task.priority === "Alta"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "Media"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }
                `}
              >
                {task.priority}
              </span>
            </div>
          ))
        )}
        {selectedTask && (
          <TaskDetails task={selectedTask} onClose={closePanel} />
        )}
      </div>
    </div>
  );
};

export default OperatorTasks;
