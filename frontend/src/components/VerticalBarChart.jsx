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

export function VerticalBarChart({ ChartData }) {
  const options = { responsive: true, maintainAspectRatio: false };
  const data = {
    labels: ChartData.map((item) => item.title),
    datasets: [
      {
        label: ChartData.map((item) => item.qty),
        data: ChartData.map((item) => item.qty),
        backgroundColor: "#141414",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} options={options} />;
}
