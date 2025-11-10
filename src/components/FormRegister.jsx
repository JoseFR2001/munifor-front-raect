//* ========================================
//* COMPONENTE: FormRegister
//* ========================================
//* Propósito: Formulario de registro reutilizable para todos los roles
//* Usado en: CitizenRegister, WorkerRegister, OperatorRegister, AdminRegister
//* Props:
//*   - role: string - Rol del usuario a registrar ("Ciudadano", "Trabajador", "Operador", "Administrador")
//* Validación: RegisterSchema (11 campos con Zod)
//* Secciones:
//*   1. Credenciales: username, email, password, confirmpassword
//*   2. Datos personales: first_name, last_name, age, dni, phone, address, sex
//* Lógica especial:
//*   - Separa datos personales en objeto profile antes de enviar
//*   - Redirige a login después del registro

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import registerSchema from "../schemas/RegisterSchema.js";
import useFetch from "../hooks/useFetch.js";

const FormRegister = ({ role }) => {
  const { postFetch } = useFetch();
  const navigate = useNavigate();

  //* React Hook Form: Configuración con validación de Zod
  //? mode: "onChange" valida en tiempo real mientras el usuario escribe
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  //* Errores de validación del formulario
  const { errors } = formState;

  //* ========================================
  //* SUBMIT: Separar datos y enviar al servidor
  //* ========================================
  const onSubmit = (data) => {
    //? Desestructurar: separar profile de credenciales
    const { first_name, last_name, age, dni, phone, address, sex, ...rest } =
      data;

    //* Profile: objeto con datos personales
    const profile = { first_name, last_name, age, dni, phone, address, sex };

    //! Enviar: credenciales (username, email, password), role, y profile
    postFetch("/auth/register", { ...rest, role, profile });

    //* Redirigir al login después del registro
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Registrate como {role}</h1>

      {/* //? ======================================== */}
      {/* //? SECCIÓN 1: Credenciales */}
      {/* //? ======================================== */}

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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          {...register("email")}
          id="email"
          className="border"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
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
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="confirmpassword">Confirmar password</label>
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

      {/* //? ======================================== */}
      {/* //? SECCIÓN 2: Datos personales (profile) */}
      {/* //? ======================================== */}
      <h1>Datos personales</h1>

      <div>
        <label htmlFor="firstname">Nombre</label>
        <input
          type="text"
          {...register("first_name")}
          id="firstname"
          className="border"
        />
        {errors.first_name && (
          <span className="text-red-500 text-sm">
            {errors.first_name.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="lastname">Apellido</label>
        <input
          type="text"
          {...register("last_name")}
          id="lastname"
          className="border"
        />
        {errors.last_name && (
          <span className="text-red-500 text-sm">
            {errors.last_name.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="age">Edad</label>
        <input type="text" {...register("age")} id="age" className="border" />
        {errors.age && (
          <span className="text-red-500 text-sm">{errors.age.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="dni">DNI</label>
        <input type="text" {...register("dni")} id="dni" className="border" />
        {errors.dni && (
          <span className="text-red-500 text-sm">{errors.dni.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="phone">Teléfono</label>
        <input
          type="text"
          {...register("phone")}
          id="phone"
          className="border"
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">{errors.phone.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="address">Dirección</label>
        <input
          type="text"
          {...register("address")}
          id="address"
          className="border"
        />
        {errors.address && (
          <span className="text-red-500 text-sm">{errors.address.message}</span>
        )}
      </div>

      {/* //! Select de sexo con validación */}
      <div>
        <select {...register("sex")} defaultValue="">
          <option value="" disabled>
            Seleccione
          </option>
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.sex && (
          <span className="text-red-500 text-sm">{errors.sex.message}</span>
        )}
      </div>

      {/* //? ======================================== */}
      {/* //? BOTONES Y NAVEGACIÓN */}
      {/* //? ======================================== */}
      <div>
        <button type="submit">Registrar</button>
        <p>
          Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </form>
  );
};

export default FormRegister;

//* ========================================
//* CONSTANTES EN ESPAÑOL
//* ========================================
/*
 * FormRegister = formulario de registro
 * role = rol / papel
 * register (hook) = registrar campo
 * handleSubmit = manejar envío
 * formState = estado del formulario
 * errors = errores
 * postFetch = envío POST
 * navigate = navegar
 * data = datos
 * profile = perfil
 * first_name = nombre
 * last_name = apellido
 * age = edad
 * dni = documento nacional de identidad
 * phone = teléfono
 * address = dirección
 * sex = sexo
 * rest = resto (de los campos)
 */
