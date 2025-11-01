import { BrowserRouter, Route, Routes } from "react-router-dom";

//Layouts:

import GeneralLayout from "./layout/GeneralLayout";

//Pages:

// General
import Home from "./pages/General/Home";
import CitizenRegister from "./pages/General/CitizenRegister";
import Login from "./pages/General/Login";
import ForgotPassword from "./pages/General/ForgotPassword";

//Ciudadano
import CitizenLayout from "./layout/CitizenLayout";
import CitizenDashboard from "./pages/Citizen/CitizenDashboard";
import CitizenProfile from "./pages/Citizen/CitizenProfile";
import CitizenReports from "./pages/Citizen/CitizenReports";
import Contact from "./pages/Citizen/Contact";
import ReportStatus from "./pages/Citizen/ReportStatus";

//Trabajador

//Operador

//Administrador

//Actualización de contraseña
import UpdatePassword from "./pages/General/UpdatePassword";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* General */}
        <Route element={<GeneralLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<CitizenRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Route>

        {/* Actualizar contraseña */}
        <Route path="/updatepassword" element={<UpdatePassword />} />

        {/* Ciudadano */}
        <Route element={<CitizenLayout />}>
          <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
          <Route path="/citizen/profile" element={<CitizenProfile />} />
          <Route path="/citizen/reports" element={<CitizenReports />} />
          <Route path="/citizen/contact" element={<Contact />} />
          <Route path="/citizen/reportstatus" element={<ReportStatus />} />
        </Route>
        {/* Trabajador */}
        {/* Operador */}
        {/* Administrador */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
