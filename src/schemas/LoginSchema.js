import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, { message: "El username es requerido" }),
  password: z.string().min(1, { message: "La contraseña es requerida" }),
});

export default loginSchema;
