//* ========================================
//* PÁGINA: Login
//* ========================================
//* Propósito: Formulario de inicio de sesión para todos los roles
//* Características:
//*   - Validación con Zod (loginSchema)
//*   - React Hook Form para manejo de formulario
//*   - Autenticación con JWT
//*   - Redirección automática según rol del usuario
//* Flujo:
//*   1. Usuario ingresa username y password
//*   2. Se valida con Zod schema
//*   3. POST a /auth/login
//*   4. Si es exitoso: guarda token, decodifica JWT, actualiza contexto
//*   5. Redirige según rol: Admin, Operador, Trabajador, o Ciudadano
//* Roles y rutas:
//*   - Administrador → /admin/dashboard
//*   - Operador → /operator/dashboard
//*   - Trabajador → /worker/dashboard
//*   - Ciudadano → /citizen/dashboard

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "../../schemas/LoginSchema.js";
import useFetch from "../../hooks/useFetch.js";
import { useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const navigator = useNavigate(); // Hook para redireccionar
  const { postFetch } = useFetch(); // Hook para peticiones HTTP
  const [backendError, setBackendError] = useState(""); // Errores del backend
  const { setUser } = useContext(UserContext); // Actualizar usuario en contexto global

  //* ========================================
  //* REACT HOOK FORM: Configuración
  //* ========================================
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(loginSchema), // Validación con Zod
    mode: "onChange", // Validar al cambiar cada campo
  });

  const { errors } = formState; // Extraer errores de validación

  //* ========================================
  //* FUNCIÓN: onSubmit
  //* ========================================
  //* Propósito: Procesar login y redirigir según rol
  //* @param {Object} data - { username, password }
  const onSubmit = async (data) => {
    try {
      //* POST a /auth/login con username y password
      const response = await postFetch("/auth/login", data);

      if (response.ok) {
        //! Guardar token en localStorage
        localStorage.setItem("token", response.token);

        //* Decodificar JWT para obtener _id y role
        const decoded = jwtDecode(response.token);

        //* Actualizar contexto global con datos del usuario
        setUser({ _id: decoded._id, role: decoded.role });

        //* ========================================
        //* REDIRECCIÓN SEGÚN ROL
        //* ========================================
        //? Operador ternario anidado para determinar ruta
        decoded.role === "Administrador"
          ? navigator("/admin/dashboard")
          : decoded.role === "Operador"
          ? navigator("/operator/dashboard")
          : decoded.role === "Trabajador"
          ? navigator("/worker/dashboard")
          : navigator("/citizen/dashboard"); // Default: Ciudadano
      }
    } catch (error) {
      //* Capturar errores del backend (credenciales inválidas, etc.)
      setBackendError(error.message);
    }
  };

  //* ========================================
  //* RENDERIZADO: Formulario de login
  //* ========================================
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Inicia sesión</h1>

      {/* Campo: Username */}
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          {...register("username")} // Registrar campo en React Hook Form
          id="username"
          className="border"
        />
        {/* Mostrar error de validación de Zod */}
        {errors.username && (
          <span className="text-red-500 text-sm">
            {errors.username.message}
          </span>
        )}
      </div>

      {/* Campo: Password */}
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          {...register("password")}
          id="password"
          className="border"
        />
      </div>
      {/* Mostrar error de validación */}
      {errors.password && (
        <span className="text-red-500 text-sm">{errors.password.message}</span>
      )}

      {/* Mostrar errores del backend (credenciales incorrectas, etc.) */}
      {backendError && (
        <div className="text-red-500 text-sm mb-2">{backendError}</div>
      )}

      {/* Link a recuperación de contraseña */}
      <div>
        <Link to="/forgotpassword">¿Olvidaste tu contraseña?</Link>
      </div>

      {/* Botón de envío */}
      <div>
        <button type="submit">Iniciar sesión</button>
      </div>

      {/* Link a registro */}
      <div>
        <p>
          No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </form>
  );
};

export default Login;

//* ========================================
//* CONSTANTES EN ESPAÑOL
//* ========================================
/*
 * navigator = navegador
 * postFetch = enviar datos
 * backendError = error del backend
 * setBackendError = establecer error del backend
 * setUser = establecer usuario
 * register = registrar
 * handleSubmit = manejar envío
 * formState = estado del formulario
 * errors = errores
 * onSubmit = al enviar
 * data = datos
 * response = respuesta
 * token = token de autenticación
 * decoded = decodificado
 * role = rol / función
 * username = nombre de usuario
 * password = contraseña
 */
