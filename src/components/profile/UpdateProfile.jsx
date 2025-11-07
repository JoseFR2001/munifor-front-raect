import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch";

const UpdateProfile = ({ onUpdate }) => {
  const { register, handleSubmit } = useForm();
  const { putFetchProfile } = useFetch();

  const onSubmit = (data) => {
    putFetchProfile("/auth/update/profile", data);
    console.log(data);
    onUpdate(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Datos personales</h1>

      <div>
        <label htmlFor="firstname">Nombre</label>
        <input
          type="text"
          {...register("first_name")}
          id="firstname"
          className="border"
        />
      </div>

      <div>
        <label htmlFor="lastname">Apellido</label>
        <input
          type="text"
          {...register("last_name")}
          id="lastname"
          className="border"
        />
      </div>

      <div>
        <label htmlFor="age">Edad</label>
        <input type="text" {...register("age")} id="age" className="border" />
      </div>

      <div>
        <label htmlFor="dni">DNI</label>
        <input type="text" {...register("dni")} id="dni" className="border" />
      </div>

      <div>
        <label htmlFor="phone">Teléfono</label>
        <input
          type="text"
          {...register("phone")}
          id="phone"
          className="border"
        />
      </div>

      <div>
        <label htmlFor="address">Dirección</label>
        <input
          type="text"
          {...register("address")}
          id="address"
          className="border"
        />
      </div>

      <div>
        <select {...register("sex")} defaultValue="">
          <option value="" disabled>
            Seleccione
          </option>
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <div>
        <button type="submit">Guardar cambios</button>
      </div>
      <div>
        <button type="button" onClick={() => onUpdate(false)}>
          Cancelar
        </button>
      </div>
    </form>
  );
};
export default UpdateProfile;
