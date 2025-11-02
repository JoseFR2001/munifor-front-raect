import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import OperatorNavBar from "../components/navbars/OperatorNavBar";

const OperatorLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <OperatorNavBar />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default OperatorLayout;
