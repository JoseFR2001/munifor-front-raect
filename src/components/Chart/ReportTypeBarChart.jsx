import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Bache", "Alumbrado", "Basura", "Incidente", "Otro"],
  datasets: [
    {
      label: "Reportes por tipo",
      data: [12, 19, 3, 5, 2],
      backgroundColor: "rgba(54, 162, 235, 0.5)",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Cantidad de reportes por tipo" },
  },
};

const ReportTypeBarChart = () => <Bar data={data} options={options} />;

export default ReportTypeBarChart;
