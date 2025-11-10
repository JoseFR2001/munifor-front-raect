import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MapClickHandler from "./LeafletMaps/MapClick";
import "leaflet/dist/leaflet.css";

const TASK_TYPES = [
  "Reparación",
  "Mantenimiento",
  "Recolección",
  "Supervisión",
];
const PRIORITIES = ["Alta", "Media", "Baja"];

const CreateTaskModal = ({
  onClose,
  onSubmit,
  crewSelected,
  reportSelected,
}) => {
  const [title, setTitle] = useState("");
  const [taskType, setTaskType] = useState("");
  const [priority, setPriority] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación básica
    if (
      !title ||
      !taskType ||
      !priority ||
      !crewSelected ||
      !reportSelected ||
      reportSelected.length === 0
    ) {
      setError(
        "Completa todos los campos y selecciona al menos un reporte y un crew."
      );
      return;
    }
    if (!markerPosition) {
      setError("Por favor, marca la ubicación de la tarea en el mapa.");
      return;
    }
    setError("");
    const [lat, lng] = markerPosition;
    const payload = {
      title,
      crew: crewSelected,
      report: reportSelected,
      priority,
      task_type: taskType,
      location: { lat, lng },
    };
    if (onSubmit) onSubmit(payload);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col items-center justify-center p-0 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          className="w-full px-8 py-6 flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Crear tarea
          </h1>
          {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Tipo de tarea
            </label>
            <select
              className="border rounded w-full px-3 py-2"
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
            >
              <option value="">Seleccione</option>
              {TASK_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Prioridad
            </label>
            <select
              className="border rounded w-full px-3 py-2"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">Seleccione</option>
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Mapa para seleccionar ubicación */}
          <div className="mb-4 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ubicación de la tarea
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
                    <Popup>Ubicación de la tarea</Popup>
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

          <div className="flex justify-end w-full gap-2">
            <button
              type="button"
              className="border p-2 rounded hover:bg-gray-100"
              onClick={onClose}
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
