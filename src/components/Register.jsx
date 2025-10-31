import { Link } from "react-router-dom";

const Register = () => {
  return (
    <form>
      <h1>Registrate</h1>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="" id="username" className="border" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="" id="email" className="border" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="" id="password" className="border" />
      </div>
      <div>
        <label htmlFor="confirmpassword">Confirmar password</label>
        <input
          type="password"
          name="confirmpassword"
          id="confirmpassword"
          className="border"
        />
      </div>
      <h1>Datos personales</h1>
      <div>
        <label htmlFor="name">Nombre</label>
        <input type="text" name="" id="name" className="border" />
      </div>
      <div>
        <label htmlFor="lastname">Apellido</label>
        <input type="text" name="" id="lastname" className="border" />
      </div>
      <div>
        <label htmlFor="dni">DNI</label>
        <input type="text" name="" id="dni" className="border" />
      </div>
      <div>
        <label htmlFor="phone">Teléfono</label>
        <input type="text" name="" id="phone" className="border" />
      </div>
      <div>
        <label htmlFor="address">Dirección</label>
        <input type="text" name="" id="address" className="border" />
      </div>
      <div>
        <select name="sexo" defaultValue="">
          <option value="" disabled>
            Seleccione
          </option>
          <option value="hombre">Hombre</option>
          <option value="mujer">Mujer</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      <div>
        <button type="submit">Regitrate</button>
        <p>
          Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
