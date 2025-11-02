import z from "zod";

const reportSchema = z
  .object({
    title: z
      .string()
      .min(1, "El título es requerido")
      .min(5, "El título debe tener al menos 5 caracteres")
      .max(100, "El título no puede exceder 100 caracteres"),

    description: z
      .string()
      .min(1, "La descripción es requerida")
      .min(10, "La descripción debe tener al menos 10 caracteres")
      .max(500, "La descripción no puede exceder 500 caracteres"),

    type_report: z.string().min(1, "Debe seleccionar un tipo de reporte"),

    other_type_detail: z.string().optional(),

    image: z.any().optional(),
  })
  .refine(
    (data) => {
      // Si type_report es "Otro", other_type_detail es requerido
      if (
        data.type_report === "Otro" &&
        (!data.other_type_detail || data.other_type_detail.trim().length === 0)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Debe especificar el tipo de reporte",
      path: ["other_type_detail"], // Esto hace que el error aparezca en el campo other_type_detail
    }
  );

export default reportSchema;
