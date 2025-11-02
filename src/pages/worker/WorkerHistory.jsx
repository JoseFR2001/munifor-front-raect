import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const WorkerHistory = () => {
  const { getFetchData } = useFetch();
  const [crewHistory, setCrewHistory] = useState([]);
  const [taskHistory, setTaskHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const crewData = await getFetchData("/crew/history");
        setCrewHistory(Array.isArray(crewData?.crew) ? crewData.crew : []);
        const taskData = await getFetchData("/task/history");
        setTaskHistory(Array.isArray(taskData?.task) ? taskData.task : []);
      } catch (error) {
        setCrewHistory([]);
        setTaskHistory([]);
        console.error("Error al obtener el historial:", error);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">
        Historial del Trabajador
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Historial de Equipos */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-indigo-700">
            Historial de Equipos
          </h2>
          {crewHistory.length === 0 ? (
            <p className="text-gray-500">No hay historial de equipos.</p>
          ) : (
            <ul className="space-y-3">
              {crewHistory.map((crew, idx) => (
                <li key={idx} className="border rounded p-3 flex flex-col">
                  <span className="font-bold text-gray-800">{crew.name}</span>
                  <span className="text-sm text-gray-600">
                    {crew.task ? crew.task : "Sin tarea asignada"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Historial de Tareas */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-700">
            Historial de Tareas
          </h2>
          {taskHistory.length === 0 ? (
            <p className="text-gray-500">No hay historial de tareas.</p>
          ) : (
            <ul className="space-y-3">
              {taskHistory.map((task, idx) => (
                <li key={idx} className="border rounded p-3 flex flex-col">
                  <span className="font-bold text-gray-800">{task.title}</span>
                  <span className="text-sm text-gray-600">
                    {task.status ? task.status : "Sin estado"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerHistory;
