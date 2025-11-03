import MonthlyLineChart from "../../components/Chart/MonthlyLineChart";
import ReportStatusPieChart from "../../components/Chart/ReportStatusPieChart";
import UserRoleBarChart from "../../components/Chart/UserRoleBarChart";

const AdminStatistics = () => {
  return (
    <div className="min-h-screen w-full flex flex-row items-center justify-center gap-[2vw] flex-wrap bg-gray-300">
      <div className="bg-gray-100 rounded-lg shadow-lg p-4 w-[92%] h-80 flex items-center justify-center">
        <MonthlyLineChart />
      </div>
      <div className="bg-gray-100 rounded-lg shadow-lg p-4 w-1/2 h-80 flex items-center justify-center">
        <ReportStatusPieChart />
      </div>
      <div className="bg-gray-100 rounded-lg shadow-lg p-4 w-2/5 h-80 flex items-center justify-center">
        <UserRoleBarChart />
      </div>
    </div>
  );
};

export default AdminStatistics;
