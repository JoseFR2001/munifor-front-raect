import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Escribe tu correo electronico para recuperar tu contraseña</h1>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          {...register("email")}
          id="email"
          className="border"
        />
      </div>

      <div>
        <button type="submit">Enviar</button>
      </div>
    </form>
  );
};

export default ForgotPassword;
