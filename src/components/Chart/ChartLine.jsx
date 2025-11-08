import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

const ChartLine = ({ data }) => {
  if (!data) return null;
  return <Line data={data} />;
};

export default ChartLine;
