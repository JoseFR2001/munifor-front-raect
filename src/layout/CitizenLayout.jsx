//* ========================================
//* LAYOUT: CitizenLayout
//* ========================================
//* Propósito: Layout protegido para usuarios con rol "Ciudadano"
//* Rutas que usan este layout:
//*   - /citizen/dashboard
//*   - /citizen/profile
//*   - /citizen/reports
//*   - /citizen/contact
//*   - /citizen/reportstatus
//* Estructura:
//*   - CitizenNavBar: Navbar con links específicos del ciudadano
//*   - Outlet: Renderiza el componente hijo de la ruta
//*   - Footer: Footer común
//* Protección: Este layout debe verificar que el usuario esté autenticado

import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import CitizenNavBar from "../components/navbars/CitizenNavBar";

const CitizenLayout = () => {
  return (
    //* Contenedor flex full height
    <div className="flex flex-col min-h-screen">
      {/* Header con navbar de ciudadano */}
      <header>
        <CitizenNavBar />
      </header>

      {/* Main: Contenido de la ruta ciudadano actual */}
      <main className="flex-1">
        {/* Outlet renderiza: CitizenDashboard, CitizenProfile, CitizenReports, etc. */}
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CitizenLayout;

//* ========================================
//* CONSTANTES EN ESPAÑOL
//* ========================================
/*
 * Outlet = salida / contenedor de ruta hija
 * header = encabezado
 * main = principal
 * footer = pie de página
 */
