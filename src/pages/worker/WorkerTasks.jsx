import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const WorkerTasks = () => {
  const { getFetchData } = useFetch();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getFetchData("/task/worker"); // Endpoint para tareas del trabajador
        setTasks(Array.isArray(data?.task) ? data.task : []);
      } catch (error) {
        setTasks([]);
      }
    };
    fetchTasks();
  }, []);

  // Separar tarea actual y futuras
  const currentTask = tasks.length > 0 ? tasks[0] : null;
  const futureTasks = tasks.length > 1 ? tasks.slice(1) : [];

  return (
    <div className="min-h-screen bg-gray-50 max-w-5xl mx-auto w-full py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Sección 1: tarea actual y futuras */}
      <div className="flex flex-col gap-6">
        {/* Tarea actual */}
        <div>
          <h2 className="text-xl font-bold text-gray-700 mb-4">Tarea actual</h2>
          {!currentTask ? (
            <div className="flex flex-col items-center justify-center py-8">
              <span className="text-gray-500">
                No tienes tarea actual asignada
              </span>
            </div>
          ) : (
            <div
              className={`bg-white rounded-lg shadow p-6 border border-gray-200 w-full hover:cursor-pointer ${
                selectedTask?._id === currentTask._id
                  ? "ring-2 ring-blue-400"
                  : ""
              }`}
              onClick={() => setSelectedTask(currentTask)}
            >
              <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                {currentTask.title}
              </h3>
              <span className="px-5 py-2 rounded-full text-base font-medium bg-indigo-100 text-indigo-700">
                {currentTask.status ? currentTask.status : "Sin estado"}
              </span>
            </div>
          )}
        </div>
        {/* Tareas futuras */}
        <div>
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Tareas futuras
          </h2>
          {futureTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <span className="text-gray-500">
                No tienes tareas futuras asignadas
              </span>
            </div>
          ) : (
            futureTasks.map((task, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-lg shadow p-3 flex justify-between items-center border border-gray-200 w-full mb-3 min-h-14 hover:cursor-pointer ${
                  selectedTask?._id === task._id ? "ring-2 ring-blue-400" : ""
                }`}
                onClick={() => setSelectedTask(task)}
              >
                <span className="block text-base font-semibold text-gray-800">
                  {task.title}
                </span>
                <span className="px-5 py-2 rounded-full text-base font-medium bg-indigo-100 text-indigo-700">
                  {task.status ? task.status : "Sin estado"}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Sección 2: detalles de la tarea seleccionada */}
      <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Detalle de la tarea
        </h2>
        {!selectedTask ? (
          <div className="flex flex-col items-center justify-center py-8">
            <span className="text-gray-500">
              Selecciona una tarea para ver detalles
            </span>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200 w-full">
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">
              {selectedTask.title}
            </h3>
            <p className="text-gray-600 mb-2">{selectedTask.description}</p>
            <div className="mb-2">
              <span className="font-semibold text-gray-700">Estado:</span>
              <span
                className={`ml-2 px-3 py-1 rounded-full text-white text-xs font-bold ${
                  selectedTask.status === "Resuelto"
                    ? "bg-green-500"
                    : selectedTask.status === "En proceso"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                {selectedTask.status}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700">Prioridad:</span>
              <span className="ml-2 text-gray-600">
                {selectedTask.priority}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700">ID:</span>
              <span className="ml-2 text-gray-700 font-mono">
                {selectedTask._id}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerTasks;
