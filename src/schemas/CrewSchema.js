import z from "zod";

export const crewSchema = z.object({
  nombre: z
    .string()
    .min(3, "El nombre del equipo debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres"),

  lider: z
    .string()
    .min(1, "Debes asignar un líder")
    .regex(
      /^[a-f0-9]{24}$/,
      "ID de líder inválido (debe ser ObjectId de MongoDB)"
    ),

  miembros: z.string().refine((val) => {
    if (!val.trim()) return true; // Miembros es opcional
    const ids = val.split(",").map((id) => id.trim());
    return ids.every((id) => /^[a-f0-9]{24}$/.test(id));
  }, "Todos los IDs deben ser válidos (ObjectId de MongoDB)"),
});
