import z from "zod";

const taskSchema = z.object({
  equipo: z
    .string()
    .min(1, "Debes asignar un equipo")
    .regex(
      /^[a-f0-9]{24}$/,
      "ID de equipo inválido (debe ser ObjectId de MongoDB)"
    ),
});

export default taskSchema;
