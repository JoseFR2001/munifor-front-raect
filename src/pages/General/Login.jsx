import { Link } from "react-router-dom";

const Login = () => {
  return (
    <form>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="" id="username" className="border" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="" id="password" className="border" />
        <Link to="/forgotpassword">¿Olvidaste tu contraseña?</Link>
      </div>
      <div>
        <button type="submit">Iniciar sesión</button>
      </div>
    </form>
  );
};

export default Login;
