import { Link } from "react-router-dom";
import NavBarMenu from "./NavBarMenu";

const WorkerNavBar = () => {
  return (
    <nav className="flex items-center justify-between border p-1 mb-4">
      <ul className="flex gap-4">
        <li>
          <Link to="/worker/dashboard" className="border rounded">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/worker/tasks" className="border rounded">
            Tareas
          </Link>
        </li>
        <li>
          <Link to="/worker/progress" className="border rounded">
            Crea un nuevo avance
          </Link>
        </li>

        <li>
          <Link to="/worker/progress-history" className="border rounded">
            Historial de avances
          </Link>
        </li>

        <li>
          <Link to="/worker/team" className="border rounded">
            Equipo
          </Link>
        </li>
        <li>
          <Link to="/worker/history" className="border rounded">
            Historial
          </Link>
        </li>
      </ul>

      <NavBarMenu profileType="worker" />
    </nav>
  );
};
export default WorkerNavBar;
