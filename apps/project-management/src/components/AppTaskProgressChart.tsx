import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const AppTaskProgressChart = () => {
  const data = {
    labels: ["Backlog", "Progress", "Overdue", "Done"],
    datasets: [
      {
        data: [40, 30, 10, 20],
        backgroundColor: [
          "#1E3363",
          "#FD1B51",
          "#FD8F02",
          "#22AD5C",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-[#dcf0f966] border-1 border-primary-400 p-2.5 rounded-5 h-full">
      <div className="pb-2 border-b-1 border-netural-100">
        <span className="text-base font-semibold text-secondary-1000">Progress Status Of Tasks</span>
      </div>
      <span className="text-base mt-2.5 text-secondary-1000 font-semibold">12 Tasks</span>
      <div className="w-80 mx-auto">
        <Doughnut data={data} options={options} />
      </div>
      <div className="flex justify-around text-xs mt-4">
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 bg-secondary-400 rounded-full"></span> Backlog
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 bg-tertiar-400 rounded-full"></span> Progress
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 bg-warning-400 rounded-full"></span> Overdue
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 bg-success-400 rounded-full"></span> Done
        </div>
      </div>
    </div>
  );
};
