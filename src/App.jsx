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

//Trabajador

//Operador

//Administrador

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
        {/* Ciudadano */}
        {/* Trabajador */}
        {/* Operador */}
        {/* Administrador */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
