import { Link } from "react-router-dom";
import NavBarMenu from "./NavBarMenu";

const AdminNavBar = () => {
  return (
    <nav className="flex items-center justify-between border p-1 mb-4">
      <ul className="flex gap-4">
        <li>
          <Link to="/admin/dashboard" className="border rounded">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/statistics" className="border rounded">
            Estadísticas
          </Link>
        </li>
        <li>
          <Link to="/admin/map" className="border rounded">
            Mapa
          </Link>
        </li>
        <li>
          <Link to="/admin/registrationrequests" className="border rounded">
            Solicitudes de registro
          </Link>
        </li>
        <li>
          <Link to="/admin/profilesearch" className="border rounded">
            Búsqueda de perfiles
          </Link>
        </li>
        <li>
          <Link to="/admin/globalview" className="border rounded">
            Vista Global
          </Link>
        </li>
      </ul>

      <NavBarMenu profileType="admin" />
    </nav>
  );
};
export default AdminNavBar;
