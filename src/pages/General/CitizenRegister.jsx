import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import Register from "../../components/Register";

const CitizenRegister = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        <Register />
      </main>
      <Footer />
    </div>
  );
};

export default CitizenRegister;
