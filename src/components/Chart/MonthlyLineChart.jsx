import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Revenue",
      data: [
        50000, 70000, 120000, 90000, 110000, 95000, 80000, 85000, 90000, 75000,
        100000, 95000,
      ],
      borderColor: "#2563eb",
      backgroundColor: "rgba(37,99,235,0.1)",
      tension: 0.3,
      fill: false,
    },
    {
      label: "Cost",
      data: [
        30000, 40000, 50000, 60000, 70000, 65000, 60000, 55000, 50000, 45000,
        40000, 35000,
      ],
      borderColor: "#ef4444",
      backgroundColor: "rgba(239,68,68,0.1)",
      tension: 0.3,
      fill: false,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Revenue vs Cost by Month" },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const MonthlyLineChart = () => <Line data={data} options={options} />;

export default MonthlyLineChart;
