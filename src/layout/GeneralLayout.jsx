import { Outlet } from "react-router-dom";
import NavBar from "../components/navbars/GeneralNavBar";
import Footer from "../components/Footer";

const GeneralLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavBar />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default GeneralLayout;
