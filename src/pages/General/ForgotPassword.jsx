import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

const ForgotPassword = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        <h1>¿Olvidaste tu contraseña?</h1>
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="" id="email" className="border" />
          </div>
          <div>
            <button type="submit">Enviar </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
