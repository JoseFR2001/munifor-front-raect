import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const ChartDoughnut = () => {
  const data = {
    Pendiete: 30,
    Revisado: 20,
    Aceptado: 25,
    Completado: 15,
    Rechazado: 10,
  };
  return (
    <Doughnut
      data={{
        labels: Object.keys(data),
        datasets: [
          {
            data: Object.values(data),
            backgroundColor: [
              "rgba(16, 185, 129, 0.5)",
              "rgba(245, 158, 11, 0.5)",
              "rgba(239, 68, 68, 0.5)",
              "rgba(37, 99, 235, 0.5)",
              "rgba(156, 163, 175, 0.5)",
            ],
          },
        ],
      }}
    />
  );
};
export default ChartDoughnut;
