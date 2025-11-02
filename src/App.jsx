import { BrowserRouter, Route, Routes } from "react-router-dom";

//Pages: General
import Home from "./pages/General/Home";
import CitizenRegister from "./pages/General/CitizenRegister";
import Login from "./pages/General/Login";
import ForgotPassword from "./pages/General/ForgotPassword";

//Ciudadano
import CitizenDashboard from "./pages/Citizen/CitizenDashboard";
import CitizenProfile from "./pages/Citizen/CitizenProfile";
import CitizenReports from "./pages/Citizen/CitizenReports";
import Contact from "./pages/Citizen/Contact";
import ReportStatus from "./pages/Citizen/ReportStatus";

//Trabajador
import WorkerDashboard from "./pages/worker/WorkerDashboard";
import WorkerHistory from "./pages/worker/WorkerHistory";
import WorkerProgress from "./pages/worker/WorkerProgress";
import WorkerTasks from "./pages/worker/WorkerTasks";
import WorkerTeam from "./pages/worker/WorkerTeam";

//Operador
import OperatorDashboard from "./pages/Operator/OperatorDashboard";
import OperatorReports from "./pages/Operator/OperatorReports";
import OperatorTasks from "./pages/Operator/OperatorTasks";
import OperatorTeams from "./pages/Operator/OperatorTeams";
import OperatorWorkerProgress from "./pages/Operator/OperatorWorkerProgress";
import OperatorMap from "./pages/Operator/OperatorMap";
import OperatorStatistics from "./pages/Operator/OperatorStatistics";

//Administrador
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminStatistics from "./pages/Admin/AdminStatistics";
import AdminMap from "./pages/Admin/AdminMap";

//Registros
import OperatorRegister from "./pages/Operator/OperatorRegister";
import WorkerRegister from "./pages/worker/WorkerRegister";
import AdminRegister from "./pages/Admin/AdminRegister";

//Actualización de contraseña
import UpdatePassword from "./pages/General/UpdatePassword";

//Layouts:
import GeneralLayout from "./layout/GeneralLayout";
import CitizenLayout from "./layout/CitizenLayout";
import OperatorLayout from "./layout/OperatorLayout";
import WorkerLayout from "./layout/WorkerLayout";
import AdminLayout from "./layout/AdminLayout";

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
        <Route element={<CitizenLayout />}>
          <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
          <Route path="/citizen/profile" element={<CitizenProfile />} />
          <Route path="/citizen/reports" element={<CitizenReports />} />
          <Route path="/citizen/contact" element={<Contact />} />
          <Route path="/citizen/reportstatus" element={<ReportStatus />} />
        </Route>

        {/* Trabajador */}
        <Route element={<WorkerLayout />}>
          <Route path="/worker/dashboard" element={<WorkerDashboard />} />
          <Route path="/worker/history" element={<WorkerHistory />} />
          <Route path="/worker/progress" element={<WorkerProgress />} />
          <Route path="/worker/tasks" element={<WorkerTasks />} />
          <Route path="/worker/team" element={<WorkerTeam />} />
        </Route>

        {/* Operador */}
        <Route element={<OperatorLayout />}>
          <Route path="/operator/dashboard" element={<OperatorDashboard />} />
          <Route path="/operator/reports" element={<OperatorReports />} />
          <Route path="/operator/tasks" element={<OperatorTasks />} />
          <Route path="/operator/teams" element={<OperatorTeams />} />
          <Route
            path="/operator/worker-progress"
            element={<OperatorWorkerProgress />}
          />
          <Route path="/operator/map" element={<OperatorMap />} />
          <Route path="/operator/statistics" element={<OperatorStatistics />} />
        </Route>

        {/* Administrador */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/statistics" element={<AdminStatistics />} />
          <Route path="/admin/map" element={<AdminMap />} />
        </Route>

        {/* Actualizar contraseña */}
        <Route path="/updatepassword" element={<UpdatePassword />} />

        {/* Registros */}
        <Route path="/operator/register" element={<OperatorRegister />} />
        <Route path="/worker/register" element={<WorkerRegister />} />
        <Route path="/admin/register" element={<AdminRegister />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
