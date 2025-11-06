import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const ChartBar = () => {
  const roles = {
    Ciudadano: 50,
    Trabajador: 15,
    Operador: 8,
    Administrador: 1,
  };
  return (
    <Bar
      data={{
        labels: ["Ciudadano", "Trabajador", "Operador", "Administrador"],
        datasets: [
          {
            label: "Cantidad de usuarios por rol",
            data: [1, 56, 25, 100],
            // backgroundColor: "rgba(16, 185, 129, 0.5)",
          },
        ],
      }}
    />
  );
};
export default ChartBar;
