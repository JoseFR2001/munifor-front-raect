import z from "zod";

const updatePasswordShema = z
  .object({
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(50, "La contraseña no puede tener más de 50 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+/,
        "Debe contener al menos una mayúscula, una minúscula y un número"
      ),
    confirmpassword: z.string().min(1, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmpassword"],
  });
export default updatePasswordShema;
