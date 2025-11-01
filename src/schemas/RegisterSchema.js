import { z } from "zod";

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "El username debe tener al menos 3 caracteres")
      .max(20, "El username no puede tener más de 20 caracteres")
      .regex(/^[a-zA-Z0-9_]+$/, "Solo letras, números y guiones bajos"),

    email: z.string().min(1, "El email es requerido").email("Email inválido"),

    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(50, "La contraseña no puede tener más de 50 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+/,
        "Debe contener al menos una mayúscula, una minúscula y un número"
      ),

    confirmpassword: z.string().min(1, "Confirma tu contraseña"),

    first_name: z
      .string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(50, "El nombre no puede tener más de 50 caracteres")
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo letras y espacios"),

    last_name: z
      .string()
      .min(2, "El apellido debe tener al menos 2 caracteres")
      .max(50, "El apellido no puede tener más de 50 caracteres")
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo letras y espacios"),

    address: z
      .string()
      .min(5, "La dirección debe tener al menos 5 caracteres")
      .max(200, "La dirección no puede tener más de 200 caracteres"),

    age: z.coerce
      .number()
      .min(18, "Debes tener al menos 18 años")
      .max(100, "Edad no válida"),

    dni: z.string().regex(/^\d{8}$/, "El DNI debe tener 8 dígitos"),

    sexo: z
      .enum(["", "hombre", "mujer", "otro"])
      .refine((val) => val !== "", { message: "Debes seleccionar tu sexo" }),

    phone: z.string().regex(/^\d{10}$/, "El teléfono debe tener 10 dígitos"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmpassword"],
  });

export default registerSchema;
