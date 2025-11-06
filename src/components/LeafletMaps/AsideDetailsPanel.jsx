import ReportDetails from "../details/ReportDetails";
import TaskDetails from "../details/TaskDetails";
import AdvancedDetails from "../details/AdvancedDetails";

/**
 * AsideDetailsPanel
 * Panel lateral deslizable tipo Jira que muestra los detalles completos
 * de un reporte, tarea o avance seleccionado en el mapa.
 *
 * Props:
 * - isOpen: Boolean - controla si el panel está visible
 * - onClose: Function - callback para cerrar el panel
 * - selectedItem: Object - el item seleccionado (report/task/progress)
 * - dataType: String - "report" | "task" | "progress"
 */

const AsideDetailsPanel = ({ isOpen, onClose, selectedItem, dataType }) => {
  if (!isOpen || !selectedItem) return null;

  return (
    <>
      {/* Overlay oscuro para cerrar al hacer clic fuera */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel lateral deslizable */}
      <aside
        className={`fixed top-0 right-0 h-full w-full md:w-2/3 lg:w-1/2 xl:w-2/5 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header con botón de cerrar */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-800">
            {dataType === "report" && "Detalles del Reporte"}
            {dataType === "task" && "Detalles de la Tarea"}
            {dataType === "progress" && "Detalles del Avance"}
          </h2>{" "}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Cerrar panel"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-600"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Contenido del panel */}
        <div className="p-6">
          {dataType === "report" && (
            <ReportDetails reportId={selectedItem._id} />
          )}
          {dataType === "task" && <TaskDetails taskId={selectedItem._id} />}
          {dataType === "progress" && (
            <AdvancedDetails progressId={selectedItem._id} />
          )}
        </div>
      </aside>
    </>
  );
};

export default AsideDetailsPanel;
