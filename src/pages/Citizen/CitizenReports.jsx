import { useForm } from "react-hook-form";
import CitizenLeafletMap from "../../components/LeafletMaps/CitizenLeafletMap";
import { useState } from "react";

const CitizenReports = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [markerPosition, setMarkerPosition] = useState(null);

  const onSubmit = (data) => {
    console.log({ ...data, markerPosition });
  };

  const handleMarkerChange = (position) => {
    setMarkerPosition(position);
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
      </div>
      <div>
        <label htmlFor="description">Descripcion</label>
        <input
          type="text"
          {...register("description")}
          id="description"
          className="border"
        />
      </div>
      <div>
        <label htmlFor="image">Imagen</label>
        <input
          type="file"
          {...register("image")}
          id="image"
          className="border"
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
