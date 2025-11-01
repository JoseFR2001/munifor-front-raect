import z from "zod";

export const reportSchema = z.object({
  title: z
    .string()
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(100, "El título no puede tener más de 100 caracteres"),

  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede tener más de 500 caracteres"),

  priority: z
    .string()
    .refine(
      (val) => ["Baja", "Media", "Alta"].includes(val),
      "Prioridad no válida"
    ),

  type_report: z.string().min(1, "Debes seleccionar un tipo de reporte"),

  location: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .nullable()
    .refine(
      (val) => val !== null,
      "Debes seleccionar una ubicación en el mapa"
    ),

  image: z
    .any()
    .nullable()
    .refine((file) => {
      if (!file) return true; // Imagen es opcional
      const maxSize = 5 * 1024 * 1024; // 5MB
      return file.size <= maxSize;
    }, "La imagen no debe superar los 5MB")
    .refine((file) => {
      if (!file) return true;
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      return validTypes.includes(file.type);
    }, "Solo se aceptan imágenes JPG, PNG o WEBP"),
});
