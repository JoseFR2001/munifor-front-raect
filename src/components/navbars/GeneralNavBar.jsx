//* ========================================
//* COMPONENTE: GeneralNavBar
//* ========================================
//* Propósito: Barra de navegación para usuarios NO autenticados
//* Usado en: GeneralLayout.jsx (Home, Login, Register, FAQ, etc.)
//* Links principales:
//*   - Inicio (/)
//*   - Preguntas Frecuentes (/faq)
//*   - Registro (/register)
//*   - Login (/login)

import { Link } from "react-router-dom";

const GeneralNavBar = () => {
  return (
    //* Navbar: Justifica entre inicio y auth
    <nav className="flex items-center justify-between border p-1">
      {/* //? Links de navegación general */}
      <ul className="flex gap-4">
        <li>
          <Link to="/" className="border rounded">
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/faq" className="border rounded">
            Preguntas Frecuentes
          </Link>
        </li>
      </ul>

      {/* //? Links de autenticación */}
      <ul className="flex gap-4 ">
        <li>
          <Link to="/register" className="border rounded">
            Registrate
          </Link>
        </li>
        <li>
          <Link to="/login" className="border rounded">
            Inicia sesión
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default GeneralNavBar;

//* ========================================
//* CONSTANTES EN ESPAÑOL
//* ========================================
/*
 * GeneralNavBar = barra de navegación general
 * nav = navegación
 * Link = enlace
 */
