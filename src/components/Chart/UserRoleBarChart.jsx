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
  labels: ["Ciudadano", "Operador", "Trabajador", "Administrador"],
  datasets: [
    {
      label: "Usuarios por rol",
      data: [50, 8, 15, 1],
      backgroundColor: "rgba(16, 185, 129, 0.5)",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Cantidad de usuarios por rol" },
  },
};

const UserRoleBarChart = () => <Bar data={data} options={options} />;

export default UserRoleBarChart;
