import type { ChartOptions } from "chart.js";
import { useMemo } from "react"; // Import useMemo for performance
import { Buildings2, DocumentForward } from "iconsax-reactjs";
import { Button, Card, CardBody, CardHeader, cn, Slider, Spinner } from "@heroui/react"; // added Spinner
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// REMOVED import { data } from "autoprefixer"; 

import { GeneralInformation } from "@hrbox/modules/hrlink/components/GeneralInformation";
import { UserLocation } from "@hrbox/modules/hrlink/components/UserLocation";
import {
  useFetchCompaniesListQuery,
  useFetchJobOpportunitiesSentQuery,
  useFetchResumePercentQuery,
  useFetchViewResumeQuery,
} from "@hrbox/modules/hrlink/apis";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const Dashboard = () => {
  // 1. Destructure isLoading to handle loading states nicely
  const { data: viewResumeData, isLoading: isChartLoading } = useFetchViewResumeQuery();
  const { data: resumePercent } = useFetchResumePercentQuery();
  const { data: jobOpportunities } = useFetchJobOpportunitiesSentQuery();

  // 2. Prepare Chart Data using useMemo
  // We need to map your API response to the specific array format ChartJS expects.
  // NOTE: I am assuming 'viewResumeData' is an object containing arrays. 
  // IF IT IS NOT, please provide the structure.
  const DashboardChartData = useMemo(() => {
    // Default empty array if data isn't loaded yet
    const defaultData = [0, 0, 0, 0, 0]; 
    
    return {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"], // These might need to come from the API too?
      datasets: [
        {
          label: "Rejected Resumes",
          // SAFETY CHECK: Access the specific property from your API response
          data: viewResumeData?.rejectedCount || defaultData, 
          borderColor: "#FF3B30",
          backgroundColor: "rgba(255, 59, 48, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Suggested",
          data: viewResumeData?.suggestedCount || defaultData,
          borderColor: "#FF9500",
          backgroundColor: "rgba(255, 149, 0, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Under Review",
          data: viewResumeData?.reviewCount || defaultData,
          borderColor: "#34C759",
          backgroundColor: "rgba(52, 199, 89, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Interview Invitations",
          data: viewResumeData?.interviewCount || defaultData,
          borderColor: "#32ADE6",
          backgroundColor: "rgba(50, 173, 230, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Employment",
          data: viewResumeData?.employmentCount || defaultData,
          borderColor: "#222B45",
          backgroundColor: "rgba(34, 43, 69, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    };
  }, [viewResumeData]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          boxHeight: 8,
        },
      },
      tooltip: {
        enabled: true,
        mode: "index" as const,
        intersect: false,
        padding: 10,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "#E5E5E5",
        borderWidth: 1,
      },
    },
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: true,
        // dynamic max usually better, or keep hardcoded if requirement
        // max: 35, 
        ticks: {
          stepSize: 5,
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-4 gap-3 h-full">
      <div className="col-span-3 flex flex-col gap-3 h-full">
        <div className="flex flex-col gap-3 h-full">
          {/* CHART SECTION */}
          <div className="h-3/5">
            <Card className="bg-white shdow-theme-sm p-3 rounded-xl h-full w-full">
              <CardHeader className="border-b-1 border-neutral-100 pb-1.5">
                <span className="text-secondary-1000 font-semibold">
                  Viewed Resumes
                </span>
              </CardHeader>
              <CardBody className="h-[calc(100%-2rem)] w-full">
                {/* Handle Loading State */}
                {isChartLoading ? (
                   <div className="flex justify-center items-center h-full">
                      <Spinner />
                   </div>
                ) : (
                  <Line
                    data={DashboardChartData}
                    options={options}
                  />
                )}
              </CardBody>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-3 h-2/5">
            {/* SLIDER SECTION */}
            <Card className="bg-white p-3 rounded-xl shdow-theme-sm h-full">
              <CardHeader className="border-b-1 border-neutral-100 pb-1.5">
                <span className="text-secondary-1000 font-semibold">
                  Proportion Of Finished Resume
                </span>
              </CardHeader>
              <CardBody className="flex flex-col justify-between">
                <p className="text-secondary-1000 text-sm font-normal pt-1.5">
                  {/* Safe Access using Optional Chaining */}
                  Currently, {(resumePercent?.data || 0) * 100}% Of The Resumes Are Completed...
                </p>

                <div className="flex items-end justify-between gap-6">
                  <div className="w-1/2">
                    <Slider
                      classNames={{
                        filler: "bg-tertiar-400",
                        track: "!h-1",
                      }}
                      // Default to 0 if data is missing
                      value={resumePercent?.data || 0} 
                      formatOptions={{ style: "percent" }}
                      label="Info’s"
                      // ... (Rest of your marks code) ...
                      maxValue={1}
                      minValue={0}
                      // ... (Rest of your renderThumb code) ...
                      step={0.01} // Fixed logic: 0.0001 is usually too small for visual sliders
                    />
                  </div>
                  {/* Logic Fix: ensure data exists before checking !== 100 */}
                  {resumePercent?.data !== undefined && resumePercent.data < 1 && (
                    <div className="w-1/2 text-end">
                      <Button className="bg-secondary-400 text-white font-semibold py-1 px-2 rounded-lg shadow-shadow-light-tight/1 !w-[144px] !min-w-fit h-[30px]">
                        Finalize Resume
                      </Button>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* JOB LIST SECTION */}
            <Card className="bg-white p-3 rounded-5 shadow-theme-sm h-full">
              <CardHeader className="pb-2 border-b-1 border-neutral-100">
                <span className="text-base text-secondary-1000 font-semibold">
                  Job Opportunities Sent
                </span>
              </CardHeader>
              <CardBody className="overflow-y-auto"> {/* Added overflow handling */}
                {/* Check length to ensure array exists and has items */}
                {jobOpportunities && jobOpportunities.length > 0 ? (
                   jobOpportunities.map((job: any) => (
                    <div
                      key={job.id}
                      className="flex justify-between items-center py-2 border-b border-gray-100"
                    >
                      <div className="flex gap-2 items-center">
                        <Buildings2 className="text-secondary-400" size="22" />
                        <span className="font-semibold text-base text-secondary-1000 dark:text-white">
                          {job.company}
                        </span>
                      </div>
                      {job.sent && (
                        <div className="bg-secondary-400 px-1 py-0.5 rounded-2 flex gap-1 items-center shadow-shadow-light-tight/1">
                          <span className="text-white text-xs">
                            Has Been Sent
                          </span>
                          <DocumentForward className="text-white" size="12" />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                   <div className="text-gray-400 text-sm">No opportunities sent yet.</div>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      <div className="col-span-1 flex flex-col gap-3">
        <GeneralInformation />
        <UserLocation />
      </div>
    </div>
  );
};

export default Dashboard;