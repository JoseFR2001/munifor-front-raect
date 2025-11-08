import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const ChartDoughnut = ({ data }) => {
  if (!data) return null;
  return <Doughnut data={data} />;
};
export default ChartDoughnut;
