import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const OperatorTasks = () => {
  const { getFetchData } = useFetch();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getFetchData("/task"); // Endpoint para tareas
        setTasks(Array.isArray(data?.task) ? data.task : []);
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
        setTasks([]);
      }
    };
    fetchTasks();
  }, []);

  const handleCreateTask = () => {
    // Aquí iría la lógica para crear tarea (modal, navegación, etc.)
    alert("Funcionalidad de crear tarea");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex  flex-col items-center justify-between">
        <h2 className="text-xl font-bold text-gray-700">Tareas</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={handleCreateTask}
        >
          Crear tarea
        </button>
      </div>
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <h3>No hay tareas registradas</h3>
          </div>
        ) : (
          tasks.map((task, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-3 flex justify-between items-center border border-gray-200 w-full max-w-2xl mx-auto min-h-14"
            >
              <div>
                <span className="block text-xl font-semibold text-gray-800">
                  {task.title}
                </span>
              </div>
              <span className="px-5 py-2 rounded-full text-base font-medium bg-indigo-100 text-indigo-700">
                {task.status ? task.status : "Sin estado"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OperatorTasks;
