import { Link } from "react-router-dom";

const GeneralNavBar = () => {
  return (
    <nav className="flex items-center justify-between border p-1">
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
