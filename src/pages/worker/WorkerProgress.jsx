import { useState } from "react";
import useFetch from "../../hooks/useFetch";

const WorkerProgress = () => {
  const { postFetchLocalStorage } = useFetch();
  const [form, setForm] = useState({
    title: "",
    description: "",
    worker: "",
    crew: "",
    images: "",
    status: "Pendiente",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Si hay varias imágenes, separa por coma
      const payload = {
        ...form,
        images: form.images ? form.images.split(",") : [],
      };
      const res = await postFetchLocalStorage("/progress-report", payload);
      setResult(res);
    } catch (error) {
      setResult({ ok: false, msg: error.message });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <form
        className="bg-white p-6 rounded shadow w-full max-w-md flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold text-gray-700 mb-2">Nuevo avance</h2>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="worker"
          placeholder="ID del trabajador"
          value={form.worker}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="crew"
          placeholder="ID del equipo"
          value={form.crew}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="images"
          placeholder="URLs de imágenes (separadas por coma)"
          value={form.images}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        >
          <option value="Pendiente">Pendiente</option>
          <option value="En Progreso">En Progreso</option>
          <option value="Finalizado">Finalizado</option>
        </select>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Crear avance"}
        </button>
        {result && (
          <div
            className={`mt-2 text-sm ${
              result.ok ? "text-green-600" : "text-red-600"
            }`}
          >
            {result.msg ||
              (result.ok
                ? "Avance creado correctamente"
                : "Error al crear avance")}
          </div>
        )}
      </form>
    </div>
  );
};

export default WorkerProgress;
