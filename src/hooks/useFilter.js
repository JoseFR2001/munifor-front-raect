/**
 * useFilter.js
 * Hook centralizado para filtrado de datos en MuniFor
 *
 * Aplica a: Reports, Tasks, ProgressReports, Users
 * Soporta: búsqueda, filtros por estado/tipo/prioridad, filtros de tiempo, paginación
 */

const useFilter = () => {
  // ========================================
  // FILTRO 1: BÚSQUEDA POR TEXTO
  // ========================================
  /**
   * Filtra elementos por un campo específico usando búsqueda insensible a mayúsculas
   * @param {Array} data - Array de objetos a filtrar
   * @param {String} searchTerm - Término de búsqueda
   * @param {String} field - Campo donde buscar (ej: 'title', 'username', 'profile.first_name')
   * @returns {Array} - Datos filtrados
   *
   * Ejemplos de uso:
   * - filterBySearch(reports, "bache", "title")
   * - filterBySearch(users, "juan", "username")
   * - filterBySearch(users, "maria", "profile.first_name")
   */
  const filterBySearch = (data, searchTerm, field) => {
    // Si no hay término de búsqueda, retorna todos los datos
    if (!searchTerm || searchTerm.trim() === "") return data;

    // Convierte el término de búsqueda a minúsculas y quita espacios
    const term = searchTerm.toLowerCase().trim();

    return data.filter((item) => {
      // Maneja campos anidados (ej: 'profile.first_name')
      // Split por '.' para acceder a propiedades anidadas
      const value = field.split(".").reduce((obj, key) => obj?.[key], item);

      // Convierte el valor a string, luego a minúsculas y verifica si contiene el término
      return value?.toString().toLowerCase().includes(term);
    });
  };

  // ========================================
  // FILTRO 2: ESTADO DE REPORTES
  // ========================================
  /**
   * Filtra reportes por estado
   * @param {Array} reports - Array de reportes
   * @param {String} status - Estado a filtrar (Pendiente, Revisado, Aceptado, Completado, Rechazado, Todos)
   * @returns {Array} - Reportes filtrados
   */
  const filterReportsByStatus = (reports, status) => {
    if (!status || status === "Todos") return reports;
    return reports.filter((report) => report.status === status);
  };

  // ========================================
  // FILTRO 3: TIPO DE REPORTE
  // ========================================
  /**
   * Filtra reportes por tipo
   * @param {Array} reports - Array de reportes
   * @param {String} type - Tipo a filtrar (Bache, Alumbrado, Basura, Incidente, Otro, Todos)
   * @returns {Array} - Reportes filtrados
   */
  const filterReportsByType = (reports, type) => {
    if (!type || type === "Todos") return reports;
    return reports.filter((report) => report.report_type === type);
  };

  // ========================================
  // FILTRO 4: ESTADO DE TAREAS
  // ========================================
  /**
   * Filtra tareas por estado
   * @param {Array} tasks - Array de tareas
   * @param {String} status - Estado a filtrar (Pendiente, En Progreso, Finalizada, Todos)
   * @returns {Array} - Tareas filtradas
   */
  const filterTasksByStatus = (tasks, status) => {
    if (!status || status === "Todos") return tasks;
    return tasks.filter((task) => task.status === status);
  };

  // ========================================
  // FILTRO 5: TIPO DE REPORTE EN TAREA
  // ========================================
  /**
   * Filtra tareas por el tipo de reporte asociado
   * NOTA: Requiere que task.report esté populado
   * @param {Array} tasks - Array de tareas
   * @param {String} reportType - Tipo de reporte (Bache, Alumbrado, etc.)
   * @returns {Array} - Tareas filtradas
   */
  const filterTasksByReportType = (tasks, reportType) => {
    if (!reportType || reportType === "Todos") return tasks;
    return tasks.filter((task) => task.report?.report_type === reportType);
  };

  // ========================================
  // FILTRO 6: PRIORIDAD DE TAREAS
  // ========================================
  /**
   * Filtra tareas por prioridad
   * @param {Array} tasks - Array de tareas
   * @param {String} priority - Prioridad (Baja, Media, Alta, Todos)
   * @returns {Array} - Tareas filtradas
   */
  const filterTasksByPriority = (tasks, priority) => {
    if (!priority || priority === "Todos") return tasks;
    return tasks.filter((task) => task.priority === priority);
  };

  // ========================================
  // FILTRO 7: ESTADO DE AVANCE
  // ========================================
  /**
   * Filtra reportes de progreso por estado
   * @param {Array} progressReports - Array de reportes de progreso
   * @param {String} status - Estado (Pendiente, En Progreso, Finalizado, Todos)
   * @returns {Array} - Reportes de progreso filtrados
   */
  const filterProgressByStatus = (progressReports, status) => {
    if (!status || status === "Todos") return progressReports;
    return progressReports.filter((progress) => progress.status === status);
  };

  // ========================================
  // FILTRO 8: FILTRO POR TIEMPO
  // ========================================
  /**
   * Filtra datos por rango de tiempo basado en created_at
   * @param {Array} data - Array de objetos con campo created_at
   * @param {String} timeRange - Rango de tiempo ('1h', '6h', '12h', '24h', '7d', '1m', '3m', '6m', '1y', 'all')
   * @returns {Array} - Datos filtrados
   */
  const filterByTime = (data, timeRange) => {
    if (!timeRange || timeRange === "all") return data;

    const now = new Date();
    const ranges = {
      "1h": 1 * 60 * 60 * 1000, // 1 hora
      "6h": 6 * 60 * 60 * 1000, // 6 horas
      "12h": 12 * 60 * 60 * 1000, // 12 horas
      "24h": 24 * 60 * 60 * 1000, // 24 horas
      "7d": 7 * 24 * 60 * 60 * 1000, // 7 días (1 semana)
      "1m": 30 * 24 * 60 * 60 * 1000, // 30 días (1 mes)
      "3m": 90 * 24 * 60 * 60 * 1000, // 90 días (3 meses)
      "6m": 180 * 24 * 60 * 60 * 1000, // 180 días (6 meses)
      "1y": 365 * 24 * 60 * 60 * 1000, // 365 días (1 año)
    };

    const timeLimit = now.getTime() - (ranges[timeRange] || 0);

    return data.filter((item) => {
      const itemDate = new Date(item.created_at).getTime();
      return itemDate >= timeLimit;
    });
  };

  // ========================================
  // FILTRO COMBINADO PARA MAPA
  // ========================================
  /**
   * Filtro dinámico para el mapa del Operador/Admin
   * Permite combinar múltiples filtros en una sola función
   * @param {Object} data - Objeto con arrays de datos ({ reports, tasks, progress })
   * @param {Object} filters - Objeto con los filtros a aplicar
   * @param {String} filters.dataType - Tipo de dato ('report', 'task', 'progress')
   * @param {String} filters.status - Estado
   * @param {String} filters.type - Tipo
   * @param {String} filters.priority - Prioridad (solo para tasks)
   * @param {String} filters.timeRange - Rango de tiempo
   * @returns {Array} - Datos filtrados
   */
  const filterForMap = (data, filters = {}) => {
    const { dataType, status, type, priority, timeRange } = filters;

    // Seleccionar el conjunto de datos correcto según el tipo
    let selectedData = [];
    switch (dataType) {
      case "report":
        selectedData = data.reports || [];
        break;
      case "task":
        selectedData = data.tasks || [];
        break;
      case "progress":
        selectedData = data.progress || [];
        break;
      default:
        // Si no se especifica tipo, devolver todos combinados
        selectedData = [
          ...(data.reports || []),
          ...(data.tasks || []),
          ...(data.progress || []),
        ];
        break;
    }

    let filteredData = [...selectedData];

    // Aplicar filtro de tiempo primero (si existe)
    if (timeRange) {
      filteredData = filterByTime(filteredData, timeRange);
    }

    // Aplicar filtros específicos según el tipo
    switch (dataType) {
      case "report":
        if (status) filteredData = filterReportsByStatus(filteredData, status);
        if (type) filteredData = filterReportsByType(filteredData, type);
        break;

      case "task":
        if (status) filteredData = filterTasksByStatus(filteredData, status);
        if (priority)
          filteredData = filterTasksByPriority(filteredData, priority);
        if (type) filteredData = filterTasksByReportType(filteredData, type);
        break;

      case "progress":
        if (status) filteredData = filterProgressByStatus(filteredData, status);
        break;

      default:
        break;
    }

    return filteredData;
  };

  // ========================================
  // PAGINACIÓN Y LÍMITE DE DATOS
  // ========================================
  /**
   * Limita la cantidad de datos mostrados (útil para mapas y listas largas)
   * @param {Array} data - Array de datos
   * @param {Number} limit - Cantidad máxima de elementos (default: 50)
   * @param {Number} page - Página actual (default: 1)
   * @returns {Object} - { data, totalPages, hasMore, currentPage }
   */
  const limitData = (data, limit = 50, page = 1) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / limit);
    const hasMore = page < totalPages;

    return {
      data: paginatedData,
      totalPages,
      hasMore,
      currentPage: page,
      totalItems: data.length,
    };
  };

  // ========================================
  // ORDENAMIENTO
  // ========================================
  /**
   * Ordena datos por un campo específico
   * @param {Array} data - Array de datos
   * @param {String} field - Campo por el cual ordenar (ej: 'created_at')
   * @param {String} order - Orden ('asc' o 'desc')
   * @returns {Array} - Datos ordenados
   */
  const sortData = (data, field = "created_at", order = "desc") => {
    return [...data].sort((a, b) => {
      const valueA = field.split(".").reduce((obj, key) => obj?.[key], a);
      const valueB = field.split(".").reduce((obj, key) => obj?.[key], b);

      // Manejar fechas
      if (field.includes("_at")) {
        const dateA = new Date(valueA).getTime();
        const dateB = new Date(valueB).getTime();
        return order === "asc" ? dateA - dateB : dateB - dateA;
      }

      // Manejar strings
      if (typeof valueA === "string") {
        return order === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      // Manejar números
      return order === "asc" ? valueA - valueB : valueB - valueA;
    });
  };

  // ========================================
  // FILTRO COMBINADO GENERAL
  // ========================================
  /**
   * Aplica múltiples filtros de forma encadenada
   * Útil cuando necesitas aplicar varios filtros a la vez
   * @param {Array} data - Array de datos
   * @param {Array} filterChain - Array de funciones de filtro
   * @returns {Array} - Datos filtrados
   *
   * Ejemplo de uso:
   * const filtered = applyFilters(reports, [
   *   (data) => filterBySearch(data, "bache", "title"),
   *   (data) => filterReportsByStatus(data, "Pendiente"),
   *   (data) => filterByTime(data, "24h")
   * ]);
   */
  const applyFilters = (data, filterChain = []) => {
    return filterChain.reduce((filtered, filterFn) => filterFn(filtered), data);
  };

  // ========================================
  // RETURN
  // ========================================
  return {
    // Filtros individuales
    filterBySearch, // Filtro 1
    filterReportsByStatus, // Filtro 2
    filterReportsByType, // Filtro 3
    filterTasksByStatus, // Filtro 4
    filterTasksByReportType, // Filtro 5
    filterTasksByPriority, // Filtro 6
    filterProgressByStatus, // Filtro 7
    filterByTime, // Filtro 8

    // Filtros combinados
    filterForMap, // Filtro dinámico para mapa

    // Utilidades
    limitData, // Paginación
    sortData, // Ordenamiento
    applyFilters, // Encadenamiento de filtros
  };
};

export default useFilter;
