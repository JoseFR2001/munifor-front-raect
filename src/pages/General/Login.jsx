import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "../../schemas/LoginSchema.js";

const Login = () => {
  //Manejo del formulario
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  //Manejo de errores
  const { errors } = formState;

  //Manejo de la información que se envia al servidor
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Inicia sesión</h1>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          {...register("username")}
          id="username"
          className="border"
        />
        {errors.username && (
          <span className="text-red-500 text-sm">
            {errors.username.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          {...register("password")}
          id="password"
          className="border"
        />
      </div>
      {errors.password && (
        <span className="text-red-500 text-sm">{errors.password.message}</span>
      )}

      <div>
        <Link to="/forgotpassword">¿Olvidaste tu contraseña?</Link>
      </div>

      <div>
        <button type="submit">Iniciar sesión</button>
      </div>

      <div>
        <p>
          No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
