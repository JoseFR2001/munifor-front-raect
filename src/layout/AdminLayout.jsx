import { Outlet } from "react-router-dom";
import AdminNavBar from "../components/navbars/AdminNavBar";
import Footer from "../components/Footer";

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <AdminNavBar />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default AdminLayout;
