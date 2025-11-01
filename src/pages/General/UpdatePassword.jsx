import { zodResolver } from "@hookform/resolvers/zod";
import updatePasswordShema from "../../schemas/UpdatePasswordShema";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  //Manejo del formulario
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(updatePasswordShema),
    mode: "onChange",
  });
  //Manejo de errores
  const { errors } = formState;

  //Navigate
  const navigate = useNavigate();

  //Manejo de la información que se envia al servidor
  const onSubmit = (data) => {
    console.log(data);
    //Eliminando la propiedad de confirmacion de contraseña
    const { confirmpassword, ...dataDB } = data;
    console.log(dataDB);

    //Redireccionar al login
    navigate("/login");
  };

  //Return
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Reestablece tu contraseña</h1>
      <div>
        <label htmlFor="password">Nueva contraseña</label>
        <input
          type="password"
          {...register("password")}
          id="password"
          className="border"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="confirmpassword">Confirmar contraseña</label>
        <input
          type="password"
          {...register("confirmpassword")}
          id="confirmpassword"
          className="border"
        />
        {errors.confirmpassword && (
          <span className="text-red-500 text-sm">
            {errors.confirmpassword.message}
          </span>
        )}
      </div>

      <div>
        <button type="submit">Enviar </button>
      </div>
    </form>
  );
};

export default UpdatePassword;
