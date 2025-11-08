import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import ChartDoughnut from "../../components/Chart/ChartDoughnut";
import ChartLine from "../../components/Chart/ChartLine";

const OperatorStatistics = () => {
  const { getFetchData } = useFetch();
  const [doughnutData, setDoughnutData] = useState(null);
  const [lineReportsData, setLineReportsData] = useState(null);
  const [lineTypesData, setLineTypesData] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res = await getFetchData("/operator/statistics");
        const data = res.data;
        setDoughnutData({
          labels: Object.keys(data.chartDoughnutData),
          datasets: [
            {
              data: Object.values(data.chartDoughnutData),
              backgroundColor: [
                "rgba(16, 185, 129, 0.5)",
                "rgba(245, 158, 11, 0.5)",
                "rgba(239, 68, 68, 0.5)",
                "rgba(37, 99, 235, 0.5)",
                "rgba(156, 163, 175, 0.5)",
              ],
            },
          ],
        });
        setLineReportsData({
          labels: data.chartLineReportsData.months,
          datasets: [
            {
              label: "Aceptado",
              data: data.chartLineReportsData.Aceptado,
              borderColor: "#3b82f6",
              tension: 0.1,
            },
            {
              label: "Completado",
              data: data.chartLineReportsData.Completado,
              borderColor: "#10b981",
              tension: 0.1,
            },
          ],
        });
        setLineTypesData({
          labels: data.chartLineReportTypesData.months,
          datasets: [
            {
              label: "Bache",
              data: data.chartLineReportTypesData.Bache,
              borderColor: "#e74c3c",
              tension: 0.1,
            },
            {
              label: "Alumbrado",
              data: data.chartLineReportTypesData.Alumbrado,
              borderColor: "#f39c12",
              tension: 0.1,
            },
            {
              label: "Basura",
              data: data.chartLineReportTypesData.Basura,
              borderColor: "#27ae60",
              tension: 0.1,
            },
            {
              label: "Otro",
              data: data.chartLineReportTypesData.Otro,
              borderColor: "#9333ea",
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchStatistics();
  }, [getFetchData]);

  return (
    <div className="min-h-screen w-full flex flex-row items-center justify-center gap-[2vw] flex-wrap bg-gray-300">
      <div className="bg-gray-100 rounded-lg shadow-lg p-4 w-[92%] h-80 flex items-center justify-center">
        <ChartLine data={lineReportsData} />
      </div>
      <div className="bg-gray-100 rounded-lg shadow-lg p-4 w-[92%] h-80 flex items-center justify-center">
        <ChartLine data={lineTypesData} />
      </div>
      <div className="bg-gray-100 rounded-lg shadow-lg p-4 w-2/5 h-80 flex items-center justify-center">
        <ChartDoughnut data={doughnutData} />
      </div>
    </div>
  );
};

export default OperatorStatistics;
