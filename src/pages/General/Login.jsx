import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        <h1>Inicia sesión</h1>
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
      </main>
      <Footer />
    </div>
  );
};

export default Login;
