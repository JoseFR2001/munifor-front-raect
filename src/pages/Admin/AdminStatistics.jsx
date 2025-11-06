import ChartBar from "../../components/Chart/ChartBar";
import ChartDoughnut from "../../components/Chart/ChartDoughnut";
import ChartLine from "../../components/Chart/ChartLine";

const AdminStatistics = () => {
  return (
    <div className="min-h-screen w-full flex flex-row items-center justify-center gap-[2vw] flex-wrap bg-gray-300">
      <div className="bg-gray-100 rounded-lg shadow-lg p-4 w-[92%] h-80 flex items-center justify-center">
        <ChartLine />
      </div>
      <div className="bg-gray-100 rounded-lg shadow-lg p-4 w-[92%] h-80 flex items-center justify-center">
        <ChartLine />
      </div>
      <div className="bg-gray-100 rounded-lg shadow-lg p-4 w-1/2 h-80 flex items-center justify-center">
        <ChartBar />
      </div>
      <div className="bg-gray-100 rounded-lg shadow-lg p-4 w-2/5 h-80 flex items-center justify-center">
        <ChartDoughnut />
      </div>
    </div>
  );
};

export default AdminStatistics;
