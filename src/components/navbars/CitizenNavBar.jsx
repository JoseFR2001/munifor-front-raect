import { Link } from "react-router-dom";
import NavBarMenu from "./NavBarMenu";

const CitizenNavBar = () => {
  return (
    <nav className="flex items-center justify-between border p-1">
      <ul className="flex gap-4">
        <li>
          <Link to="/citizen/dashboard" className="border rounded">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/citizen/reports" className="border rounded">
            Hacer reporte
          </Link>
        </li>
        <li>
          <Link to="/citizen/reportstatus" className="border rounded">
            Estado de sus reportes
          </Link>
        </li>
        <li>
          <Link to="/citizen/contact" className="border rounded">
            Contactanos
          </Link>
        </li>
      </ul>

      <NavBarMenu />
    </nav>
  );
};

export default CitizenNavBar;
