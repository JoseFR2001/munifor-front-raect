import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Pendiente", "Revisado", "Aceptado", "Completado", "Rechazado"],
  datasets: [
    {
      label: "Reportes por estado",
      data: [10, 5, 8, 12, 2],
      backgroundColor: ["#fbbf24", "#60a5fa", "#34d399", "#818cf8", "#f87171"],
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: "right" },
    title: { display: true, text: "Reportes por estado" },
  },
};

const ReportStatusPieChart = () => <Pie data={data} options={options} />;

export default ReportStatusPieChart;
