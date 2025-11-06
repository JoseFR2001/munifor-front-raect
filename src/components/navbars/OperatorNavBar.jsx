import { Link } from "react-router-dom";
import NavBarMenu from "./NavBarMenu";

const OperatorNavBar = () => {
  return (
    <nav className="flex items-center justify-between border p-1 mb-4">
      <ul className="flex gap-4">
        <li>
          <Link to="/operator/dashboard" className="border rounded">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/operator/statistics" className="border rounded">
            Estadísticas
          </Link>
        </li>
        <li>
          <Link to="/operator/reports" className="border rounded">
            Reportes
          </Link>
        </li>
        <li>
          <Link to="/operator/tasks" className="border rounded">
            Tareas
          </Link>
        </li>
        <li>
          <Link to="/operator/teams" className="border rounded">
            Equipos
          </Link>
        </li>
        <li>
          <Link to="/operator/create-task" className="border rounded">
            Crear Tarea
          </Link>
        </li>
        <li>
          <Link to="/operator/create-team" className="border rounded">
            Crear Equipo
          </Link>
        </li>
        <li>
          <Link to="/operator/worker-progress" className="border rounded">
            Progreso de Trabajadores
          </Link>
        </li>
        <li>
          <Link to="/operator/map" className="border rounded">
            Mapa
          </Link>
        </li>
      </ul>

      <NavBarMenu profileType="operator" />
    </nav>
  );
};
export default OperatorNavBar;
