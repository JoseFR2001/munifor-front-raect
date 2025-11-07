import { useForm } from "react-hook-form";

const AsideFilterMap = ({ onFilters }) => {
  const { register, handleSubmit, watch } = useForm();

  // Opción A: usar watch para leer dataType desde react-hook-form (sin estado local)
  const dataType = watch("dataType");

  const onSubmit = (data) => {
    // Normalizar a la forma que espera filterForMap: { dataType, status, type, priority, timeRange }
    const filters = {};
    if (data.dataType) filters.dataType = data.dataType;

    switch (data.dataType) {
      case "report":
        if (data.type) filters.type = data.type;
        if (data.status) filters.status = data.status;
        break;
      case "task":
        if (data.type) filters.type = data.type;
        if (data.priority) filters.priority = data.priority;
        if (data.status) filters.status = data.status;
        break;
      case "progress":
        // en el formulario usamos `progressStatus` para el select de progreso
        if (data.progressStatus) filters.status = data.progressStatus;
        break;
      default:
        break;
    }

    if (data.timeRange) filters.timeRange = data.timeRange;

    // Llamar al callback del padre si existe, sino hacer un console.log para debug
    if (typeof onFilters === "function") {
      onFilters(filters);
    } else {
      console.log("filters:", filters);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Filtros del Mapa</h2>
      {/* Aquí van los filtros del mapa */}
      <div>
        <label htmlFor="dataType">Tipo de Dato:</label>
        <select id="dataType" {...register("dataType")}>
          <option value="">Seleccione un tipo de dato</option>
          <option value="report">Reportes</option>
          <option value="task">Tareas</option>
          <option value="progress">Avance del trabajador</option>
        </select>

        {dataType === "report" && (
          <div>
            <label htmlFor="type">Tipo de Reporte:</label>
            <select id="type" {...register("type")}>
              <option value="">Seleccione un tipo de reporte</option>
              <option value="Bache">Bache</option>
              <option value="Alumbrado">Alumbrado</option>
              <option value="Basura">Basura</option>
              <option value="Otro">Otro</option>
            </select>
            <label htmlFor="status">Estado:</label>
            <select id="status" {...register("status")}>
              <option value="">Seleccione un estado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Revisado">Revisado</option>
              <option value="Aceptado">Aceptado</option>
              <option value="Completado">Completado</option>
              <option value="Rechazado">Rechazado</option>
            </select>
          </div>
        )}

        {dataType === "task" && (
          <div>
            <label htmlFor="type">Tipo de Tarea:</label>
            {/*Tengo que corregir esto */}
            <select id="type" {...register("type")}>
              <option value="">Seleccione un tipo de tarea</option>
              <option value="Mantenimiento">Mantenimiento</option>
              <option value="Limpieza">Limpieza</option>
              <option value="Reparación">Reparación</option>
              <option value="Otro">Otro</option>
            </select>
            <label htmlFor="priority">Prioridad:</label>
            <select id="priority" {...register("priority")}>
              <option value="">Seleccione una prioridad</option>
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>
            <label htmlFor="status">Estado:</label>
            <select id="status" {...register("status")}>
              <option value="">Seleccione un estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="en-progreso">En Progreso</option>
              <option value="completado">Completado</option>
            </select>
          </div>
        )}
        {dataType === "progress" && (
          <div>
            <label htmlFor="status">Avances del Trabajador:</label>
            <select id="status" {...register("progressStatus")}>
              <option value="">Seleccione un avance</option>
              <option value="pendiente">Pendiente</option>
              <option value="en-progreso">En Progreso</option>
              <option value="finalizado">Finalizado</option>
            </select>
          </div>
        )}

        <label htmlFor="timeRange">Tiempo:</label>
        <select id="timeRange" {...register("timeRange")}>
          <option value="">Seleccione un rango de tiempo</option>
          <option value="1h">Última hora</option>
          <option value="6h">Últimas 6 horas</option>
          <option value="12h">Últimas 12 horas</option>
          <option value="24h">Últimas 24 horas</option>
          <option value="7d">Última semana</option>
          <option value="1m">Último mes</option>
          <option value="3m">Últimos 3 meses</option>
          <option value="6m">Últimos 6 meses</option>
          <option value="1y">Último año</option>
          <option value="all">Sin límite</option>
        </select>
      </div>
      <div>
        <button type="submit">Aplicar Filtros</button>
      </div>
    </form>
  );
};

export default AsideFilterMap;
