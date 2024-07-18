import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function VerticalBarChart({ ChartData, ChartData2 = null }) {
  const options = { responsive: true, maintainAspectRatio: false };
  const data = {
    labels: Object.keys(ChartData),
    datasets: [
      {
        label: "Ingresos",
        data: Object.values(ChartData),
        backgroundColor: "lightblue",
        borderWidth: 1,
      },
      {
        label: "Egresos",
        data: Object.values(ChartData2),
        backgroundColor: "salmon",
      },
    ],
  };

  return <Bar data={data} options={options} />;
}
