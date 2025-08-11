import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
  type ChartDataset,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

export const AppDashboardChart = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels,
  );

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      datalabels: {
        display: false,
        color: "#000",
        anchor: "start",
        align: "end",
        formatter: (value: number) => value.toFixed(0),
      },
      tooltip: {
        enabled: false,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      y: {
        max: 60,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const datasets: ChartDataset<"bar", number[]>[] = [
    {
      label: "Project 1",
      data: [20, 30, 10, 15, 5, 25],
      backgroundColor: "#DCF0F9",
      borderColor: "#A0D8F1",
      borderWidth: 2,
      borderSkipped: "bottom",
      borderRadius: 6,
    },
    {
      label: "Project 2",
      data: [10, 15, 55, 5, 30, 10],
      backgroundColor: "#FEDEE6",
      borderColor: "#F9A8C2",
      borderWidth: 2,
      borderSkipped: "bottom",
      borderRadius: 6,
    },
    {
      label: "Project 3",
      data: [20, 25, 42, 10, 15, 5],
      backgroundColor: "#DEE1E8",
      borderColor: "#C0C4CC",
      borderWidth: 2,
      borderSkipped: "bottom",
      borderRadius: 6,
    },
  ];

  const data: ChartData<"bar", number[], string> = {
    labels,
    datasets,
  };

  return (
    <div className="bg-[#dcf0f966] border-1 border-primary-400 p-2.5 rounded-5 w-full h-full">
      <Bar data={data} options={options} />
    </div>
  );
};
