import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import CitizenNavBar from "../components/navbars/CitizenNavBar";

const CitizenLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <CitizenNavBar />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default CitizenLayout;
