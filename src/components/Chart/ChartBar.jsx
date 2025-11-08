import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const ChartBar = ({ data }) => {
  if (!data) return null;
  return <Bar data={data} />;
};
export default ChartBar;
