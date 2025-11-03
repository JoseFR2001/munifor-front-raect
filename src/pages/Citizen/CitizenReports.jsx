import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CitizenLeafletMap from "../../components/LeafletMaps/CitizenLeafletMap";
import reportSchema from "../../schemas/ReportSchema.js";
import { useState } from "react";
import useFetch from "../../hooks/useFetch.js";

const CitizenReports = () => {
  const { postFetch } = useFetch();
  const { register, handleSubmit, formState, watch, reset } = useForm({
    resolver: zodResolver(reportSchema),
  });
  const { errors } = formState;
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleMarkerChange = (position) => {
    setMarkerPosition(position);
  };

  const onSubmit = (data) => {
    if (!markerPosition) {
      alert("Por favor, selecciona una ubicación en el mapa");
      return;
    }

    const [lat, lng] = markerPosition;
    postFetch("/report", { ...data, location: { lat, lng } });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Hace un Reporte</h1>
      <div>
        <label htmlFor="title">Titulo</label>
        <input
          type="text"
          {...register("title")}
          id="title"
          className="border"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="description">Descripcion</label>
        <input
          type="text"
          {...register("description")}
          id="description"
          className="border"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="type_report">Tipo de reporte</label>
        <select
          id="type_report"
          {...register("type_report")}
          className="border"
        >
          <option value="">Seleccione</option>
          <option value="Bache">Bache</option>
          <option value="Alumbrado">Alumbrado</option>
          <option value="Basura">Basura</option>
          <option value="Incidente">Incidente</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.type_report && (
          <p className="text-red-500 text-sm mt-1">
            {errors.type_report.message}
          </p>
        )}
        {watch("type_report") === "Otro" && (
          <div>
            <label htmlFor="other_type_detail">Especifique</label>
            <input
              type="text"
              {...register("other_type_detail")}
              className="border"
            />
            {errors.other_type_detail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.other_type_detail.message}
              </p>
            )}
          </div>
        )}
      </div>
      <div>
        <label htmlFor="image">Imagen</label>
        <input
          type="file"
          {...register("image")}
          id="image"
          className="border"
          accept="image/*"
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
        )}
      </div>
      <div>
        <CitizenLeafletMap onMarkerChange={handleMarkerChange} />
        <p> {markerPosition?.join(", ")}</p>
      </div>

      <div>
        <button type="submit" className="border">
          Enviar
        </button>
      </div>
    </form>
  );
};

export default CitizenReports;
