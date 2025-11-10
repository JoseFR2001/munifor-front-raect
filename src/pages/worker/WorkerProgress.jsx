import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MapClickHandler from "../../components/LeafletMaps/MapClick";
import "leaflet/dist/leaflet.css";

const WorkerProgress = () => {
  const { getFetchData, postFetchLocalStorage } = useFetch();
  const [currentTask, setCurrentTask] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [crew, setCrew] = useState(null);
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  useEffect(() => {
    let isMounted = true;

    const fetchCurrentTask = async () => {
      try {
        const data = await getFetchData("/task/worker");
        if (isMounted) {
          const taskInProgress = data.tasks.find(
            (t) => t.status === "En Progreso"
          );
          setCurrentTask(taskInProgress || null);
          setCrew(data.crew);
        }
      } catch (error) {
        if (isMounted) {
          console.error(error);
          setCurrentTask(null);
        }
      }
    };

    fetchCurrentTask();

    return () => {
      isMounted = false;
    };
  }, []);

  const onSubmit = async (data) => {
    if (!markerPosition) {
      alert("Por favor, marca tu ubicación en el mapa");
      return;
    }

    const [lat, lng] = markerPosition;
    const payload = {
      title: data.title,
      description: data.description,
      status: data.status,
      task: currentTask._id,
      crew: crew._id,
      location: { lat, lng },
    };

    try {
      await postFetchLocalStorage("/progress", payload);
      reset();
      setMarkerPosition(null);
      alert("Avance registrado exitosamente");
    } catch (error) {
      console.error("Error al registrar avance:", error);
      alert("Error al registrar el avance");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-4xl mx-auto w-full py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Registro de Avances
      </h1>

      {!currentTask ? (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-gray-600 text-lg mb-4">
            No tienes ninguna tarea en progreso
          </p>
          <button
            onClick={() => (window.location.href = "/worker/tasks")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Acepta una tarea
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
            <h2 className="text-lg font-semibold text-indigo-700 mb-2">
              Tarea actual: {currentTask.title}
            </h2>
            <p className="text-gray-600">{currentTask.description}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Título del avance
              </label>
              <input
                type="text"
                id="title"
                {...register("title", { required: "El título es obligatorio" })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ej: Reparación de bache en progreso"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Descripción
              </label>
              <textarea
                id="description"
                {...register("description", {
                  required: "La descripción es obligatoria",
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows="4"
                placeholder="Describe el avance realizado..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Estado del avance
              </label>
              <select
                id="status"
                {...register("status", {
                  required: "El estado es obligatorio",
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Selecciona un estado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En Progreso">En Progreso</option>
                <option value="Finalizado">Finalizado</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación actual
              </label>
              <div className="w-full h-96 border rounded-lg overflow-hidden">
                <MapContainer
                  center={[-26.1849, -58.1756]}
                  zoom={15}
                  scrollWheelZoom={true}
                  className="w-full h-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapClickHandler onClickPosition={setMarkerPosition} />
                  {markerPosition && (
                    <Marker position={markerPosition}>
                      <Popup>Ubicación seleccionada</Popup>
                    </Marker>
                  )}
                </MapContainer>
              </div>
              {markerPosition && (
                <p className="text-sm text-gray-600 mt-2">
                  Coordenadas: {markerPosition[0].toFixed(4)},{" "}
                  {markerPosition[1].toFixed(4)}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  reset();
                  setMarkerPosition(null);
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Registrar avance
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default WorkerProgress;
