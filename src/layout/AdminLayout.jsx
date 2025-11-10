//* ========================================
//* LAYOUT: AdminLayout
//* ========================================
//* Propósito: Layout protegido para usuarios con rol "Administrador"
//* Rutas que usan este layout:
//*   - /admin/dashboard
//*   - /admin/statistics
//*   - /admin/map
//*   - /admin/registrationrequests (Aprobar/rechazar solicitudes de registro)
//*   - /admin/profilesearch (Buscar y gestionar usuarios)
//*   - /admin/profile
//*   - /admin/globalview (Vista global del sistema)
//* Funcionalidades del administrador:
//*   - Aprobar/rechazar solicitudes de registro de operadores/trabajadores
//*   - Gestionar todos los usuarios del sistema
//*   - Ver estadísticas globales
//*   - Ver mapa global completo
//*   - Monitorear estado general del sistema
//*   - Acceso completo a todos los datos

import { Outlet } from "react-router-dom";
import AdminNavBar from "../components/navbars/AdminNavBar";
import Footer from "../components/Footer";

const AdminLayout = () => {
  return (
    //* Contenedor flex full height
    <div className="flex flex-col min-h-screen">
      {/* Header con navbar de administrador */}
      <header>
        <AdminNavBar />
      </header>

      {/* Main: Contenido de la ruta admin actual */}
      <main className="flex-1">
        {/* Outlet renderiza componentes del administrador */}
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminLayout;

//* ========================================
//* CONSTANTES EN ESPAÑOL
//* ========================================
/*
 * Outlet = salida / contenedor de ruta hija
 * header = encabezado
 * main = principal
 * footer = pie de página
 */
