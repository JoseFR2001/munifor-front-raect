import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import CreateTaskModal from "../../components/CreateTaskModal";

const OperatorCreateTask = () => {
  const { getFetchData } = useFetch();
  const [tasks, setTasks] = useState([]);
  const [acceptedReports, setAcceptedReports] = useState([]);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getFetchData("/task");
        setTasks(Array.isArray(data?.task) ? data.task : []);
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
        setTasks([]);
      }
    };
    const fetchAcceptedReports = async () => {
      try {
        const data = await getFetchData("/reports/accepted");
        setAcceptedReports(Array.isArray(data?.reports) ? data.reports : []);
      } catch (error) {
        console.error("Error al obtener los reportes aceptados:", error);
        setAcceptedReports([]);
      }
    };
    fetchTasks();
    fetchAcceptedReports();
  }, []);

  const handleCreateTask = () => {
    setShowCreateTaskModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col items-center justify-between">
        <h2 className="text-xl font-bold text-gray-700">Tareas</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => setShowCreateTaskModal(true)}
        >
          Crear tarea
        </button>
        {showCreateTaskModal && (
          <CreateTaskModal closeModal={handleCreateTask} />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
        {/* Sección de reportes aceptados */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-700 mb-4">
            Reportes aceptados
          </h3>
          {acceptedReports.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <span className="text-gray-500">No hay reportes aceptados</span>
            </div>
          ) : (
            acceptedReports.map((report, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow p-3 flex flex-col border border-gray-200 w-full mb-3 min-h-14"
              >
                <span className="block text-base font-semibold text-gray-800">
                  {report.title}
                </span>
                <span className="text-sm text-gray-500">
                  {report.description}
                </span>
                <span className="text-xs text-gray-400">
                  Autor: {report.author}
                </span>
              </div>
            ))
          )}
        </div>
        {/* Sección de tareas asignadas */}
        <div>
          <h3 className="text-lg font-semibold text-blue-700 mb-4">
            Tareas asignadas
          </h3>
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <span className="text-gray-500">No hay tareas registradas</span>
            </div>
          ) : (
            tasks.map((task, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow p-3 flex justify-between items-center border border-gray-200 w-full mb-3 min-h-14"
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
    </div>
  );
};

export default OperatorCreateTask;
