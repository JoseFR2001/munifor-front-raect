import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";

const CitizenLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header></header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default CitizenLayout;
