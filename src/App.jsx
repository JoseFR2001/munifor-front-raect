import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

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
import WorkerDashboard from "./pages/Worker/WorkerDashboard";
import WorkerHistory from "./pages/Worker/WorkerHistory";
import WorkerProgress from "./pages/Worker/WorkerProgress";
import WorkerTasks from "./pages/Worker/WorkerTasks";
import WorkerTeam from "./pages/Worker/WorkerTeam";
import WorkerProfile from "./pages/Worker/WorkerProfile";
import WorkerProgressHistory from "./pages/Worker/WorkerProgressHistory";

//Operador
import OperatorDashboard from "./pages/Operator/OperatorDashboard";
import OperatorReports from "./pages/Operator/OperatorReports";
import OperatorTasks from "./pages/Operator/OperatorTasks";
import OperatorTeams from "./pages/Operator/OperatorTeams";
import OperatorWorkerProgress from "./pages/Operator/OperatorWorkerProgress";
import OperatorMap from "./pages/Operator/OperatorMap";
import OperatorStatistics from "./pages/Operator/OperatorStatistics";
import OperatorProfile from "./pages/Operator/OperatorProfile";

//Administrador
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminStatistics from "./pages/Admin/AdminStatistics";
import AdminMap from "./pages/Admin/AdminMap";
import RegistrationRequests from "./pages/Admin/RegistrationRequests";
import AdminProfileSearch from "./pages/Admin/AdminProfileSearch";
import AdminProfile from "./pages/Admin/AdminProfile";

//Registros
import OperatorRegister from "./pages/Operator/OperatorRegister";
import WorkerRegister from "./pages/Worker/WorkerRegister";
import AdminRegister from "./pages/Admin/AdminRegister";

//Actualización de contraseña
import UpdatePassword from "./pages/General/UpdatePassword";

//Layouts:
import GeneralLayout from "./layout/GeneralLayout";
import CitizenLayout from "./layout/CitizenLayout";
import OperatorLayout from "./layout/OperatorLayout";
import WorkerLayout from "./layout/WorkerLayout";
import AdminLayout from "./layout/AdminLayout";
import FAQ from "./pages/General/Faq";
import AdminGlobalView from "./pages/Admin/AdminGlobalView";
import OperatorCreateTask from "./pages/Operator/OperatorCreateTask";
import OperatorCreateTeams from "./pages/Operator/OperatorCreateTeam";
import OperatorNewReports from "./pages/Operator/OperatorNewReports";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* General */}
          <Route element={<GeneralLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<CitizenRegister />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/faq" element={<FAQ />} />
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
            <Route
              path="/worker/progress-history"
              element={<WorkerProgressHistory />}
            />
            <Route path="/worker/tasks" element={<WorkerTasks />} />
            <Route path="/worker/team" element={<WorkerTeam />} />
            <Route path="/worker/profile" element={<WorkerProfile />} />
          </Route>

          {/* Operador */}
          <Route element={<OperatorLayout />}>
            <Route path="/operator/dashboard" element={<OperatorDashboard />} />
            <Route path="/operator/reports" element={<OperatorReports />} />
            <Route path="/operator/tasks" element={<OperatorTasks />} />
            <Route path="/operator/teams" element={<OperatorTeams />} />
            <Route path="/operator/profile" element={<OperatorProfile />} />
            <Route
              path="/operator/worker-progress"
              element={<OperatorWorkerProgress />}
            />
            <Route path="/operator/map" element={<OperatorMap />} />
            <Route
              path="/operator/statistics"
              element={<OperatorStatistics />}
            />
            <Route
              path="/operator/create-task"
              element={<OperatorCreateTask />}
            />
            <Route
              path="/operator/create-team"
              element={<OperatorCreateTeams />}
            />
            <Route
              path="/operator/new-reports"
              element={<OperatorNewReports />}
            />
          </Route>

          {/* Administrador */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/statistics" element={<AdminStatistics />} />
            <Route path="/admin/map" element={<AdminMap />} />
            <Route
              path="/admin/registrationrequests"
              element={<RegistrationRequests />}
            />
            <Route
              path="/admin/profilesearch"
              element={<AdminProfileSearch />}
            />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/globalview" element={<AdminGlobalView />} />
          </Route>

          {/* Actualizar contraseña */}
          <Route path="/updatepassword" element={<UpdatePassword />} />

          {/* Registros */}
          <Route path="/operator/register" element={<OperatorRegister />} />
          <Route path="/worker/register" element={<WorkerRegister />} />
          <Route path="/admin/register" element={<AdminRegister />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
