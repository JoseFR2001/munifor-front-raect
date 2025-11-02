import { Outlet } from "react-router-dom";
import WorkerNavBar from "../components/navbars/WorkerNavBar";
import Footer from "../components/Footer";

const WorkerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <WorkerNavBar />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default WorkerLayout;
