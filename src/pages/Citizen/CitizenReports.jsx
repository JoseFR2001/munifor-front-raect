import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CitizenLeafletMap from "../../components/LeafletMaps/CitizenLeafletMap";
import ImageUploader from "../../components/ImageUploader";
import reportSchema from "../../schemas/ReportSchema.js";
import { useState } from "react";
import useFetch from "../../hooks/useFetch.js";

const CitizenReports = () => {
  const { postFetchFormData } = useFetch();
  const { register, handleSubmit, formState, watch, reset } = useForm({
    resolver: zodResolver(reportSchema),
  });
  const { errors } = formState;
  const [markerPosition, setMarkerPosition] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleMarkerChange = (position) => {
    setMarkerPosition(position);
  };

  const handleImagesChange = (files) => {
    setSelectedImages(files);
  };

  const onSubmit = (data) => {
    if (!markerPosition) {
      alert("Por favor, selecciona una ubicación en el mapa");
      return;
    }

    const [lat, lng] = markerPosition;

    // Construir FormData
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("type_report", data.type_report);
    if (data.other_type_detail) {
      formData.append("other_type_detail", data.other_type_detail);
    }
    formData.append("location[lat]", lat);
    formData.append("location[lng]", lng);

    // Agregar imágenes
    selectedImages.forEach((file) => {
      formData.append("images", file);
    });

    postFetchFormData("/report", formData);
    reset();
    setSelectedImages([]);
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
        <ImageUploader
          onFilesChange={handleImagesChange}
          maxFiles={5}
          maxSizeMB={15}
        />
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
