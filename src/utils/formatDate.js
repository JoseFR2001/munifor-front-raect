export const formatDate = (date) => {
  if (!date) return "Fecha no disponible";
  const opts = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "America/Argentina/Cordoba",
  };
  return new Intl.DateTimeFormat("es-AR", opts).format(new Date(date));
};
