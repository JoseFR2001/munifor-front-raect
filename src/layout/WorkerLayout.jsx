//* ========================================
//* LAYOUT: WorkerLayout
//* ========================================
//* Propósito: Layout protegido para usuarios con rol "Trabajador"
//* Rutas que usan este layout:
//*   - /worker/dashboard
//*   - /worker/progress (IMPORTANTE: Formulario con imágenes)
//*   - /worker/progress-history
//*   - /worker/tasks
//*   - /worker/team
//*   - /worker/profile
//* Estructura:
//*   - WorkerNavBar: Navbar específico del trabajador
//*   - Outlet: Renderiza el componente hijo de la ruta
//*   - Footer: Footer común
//* Funcionalidades del trabajador:
//*   - Ver tareas asignadas a su cuadrilla
//*   - Aceptar tareas
//*   - Reportar progreso con imágenes
//*   - Ver historial de avances

import { Outlet } from "react-router-dom";
import WorkerNavBar from "../components/navbars/WorkerNavBar";
import Footer from "../components/Footer";

const WorkerLayout = () => {
  return (
    //* Contenedor flex full height
    <div className="flex flex-col min-h-screen">
      {/* Header con navbar de trabajador */}
      <header>
        <WorkerNavBar />
      </header>

      {/* Main: Contenido de la ruta trabajador actual */}
      <main className="flex-1">
        {/* Outlet renderiza: WorkerDashboard, WorkerProgress, WorkerTasks, etc. */}
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WorkerLayout;

//* ========================================
//* CONSTANTES EN ESPAÑOL
//* ========================================
/*
 * Outlet = salida / contenedor de ruta hija
 * header = encabezado
 * main = principal
 * footer = pie de página
 */
