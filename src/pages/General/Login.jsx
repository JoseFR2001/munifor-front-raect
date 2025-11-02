import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "../../schemas/LoginSchema.js";
import useFetch from "../../hooks/useFetch.js";
import { useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const navigator = useNavigate();
  const { postFetch } = useFetch();
  const [backendError, setBackendError] = useState("");
  const { setUser } = useContext(UserContext);

  //Manejo del formulario
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  //Manejo de errores
  const { errors } = formState;

  //Manejo de la información que se envia al servidor
  const onSubmit = async (data) => {
    try {
      const response = await postFetch("/auth/login", data);
      if (response.ok) {
        // Guarda solo el token en localStorage
        localStorage.setItem("token", response.token);
        // Decodifica el token y actualiza el contexto inmediatamente
        const decoded = jwtDecode(response.token);
        setUser({ _id: decoded._id, role: decoded.role });
        decoded.role === "Administrador"
          ? navigator("/admin/dashboard")
          : decoded.role === "Operador"
          ? navigator("/operator/dashboard")
          : decoded.role === "Trabajador"
          ? navigator("/worker/dashboard")
          : navigator("/citizen/dashboard");
      }
    } catch (error) {
      setBackendError(error.message);
    }
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
      {backendError && (
        <div className="text-red-500 text-sm mb-2">{backendError}</div>
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
