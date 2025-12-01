import type { ChartOptions } from "chart.js";
import { useMemo } from "react";
import { Buildings2, DocumentForward } from "iconsax-reactjs";
import { Button, Card, CardBody, CardHeader, cn, Slider, Spinner } from "@heroui/react";
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
  // 1. Fetch All Data
  const { data: viewResumeData, isLoading: isChartLoading } = useFetchViewResumeQuery();
  const { data: resumePercent } = useFetchResumePercentQuery();
  const { data: jobOpportunities } = useFetchJobOpportunitiesSentQuery();

  const rawPercent = resumePercent?.data || 0; // e.g., 100
  const sliderValue = rawPercent / 100;        // e.g., 1

  // 3. Transform Chart Data
  const DashboardChartData = useMemo(() => {
    const apiData = viewResumeData?.data || [];
    
    // Helper to map data safely
    const mapData = (key: string) => apiData.map((item: any) => item[key] || 0);

    return {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Rejected Resumes",
          data: mapData("RejectResume"),
          borderColor: "#FF3B30",
          backgroundColor: "rgba(255, 59, 48, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Suggested",
          data: mapData("Suggested"),
          borderColor: "#FF9500",
          backgroundColor: "rgba(255, 149, 0, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Under Review",
          data: mapData("UnderReview"),
          borderColor: "#34C759",
          backgroundColor: "rgba(52, 199, 89, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Interview Invitations",
          data: mapData("InvitationToInterview"),
          borderColor: "#32ADE6",
          backgroundColor: "rgba(50, 173, 230, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Employment",
          data: mapData("Employment"),
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
        ticks: { stepSize: 5 },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="grid grid-cols-4 gap-3 h-full">
      <div className="col-span-3 flex flex-col gap-3 h-full">
        <div className="flex flex-col gap-3 h-full">
          
          {/* CHART CARD */}
          <div className="h-3/5">
            <Card className="bg-white shdow-theme-sm p-3 rounded-xl h-full w-full">
              <CardHeader className="border-b-1 border-neutral-100 pb-1.5">
                <span className="text-secondary-1000 font-semibold">
                  Viewed Resumes
                </span>
              </CardHeader>
              <CardBody className="h-[calc(100%-2rem)] w-full">
                {isChartLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <Spinner />
                  </div>
                ) : (
                  <Line
                    data={DashboardChartData}
                    options={options}
                    key={JSON.stringify(viewResumeData)} // Forces re-render when data updates
                  />
                )}
              </CardBody>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-3 h-2/5">
            
            {/* PERCENTAGE SLIDER CARD */}
            <Card className="bg-white p-3 rounded-xl shdow-theme-sm h-full">
              <CardHeader className="border-b-1 border-neutral-100 pb-1.5">
                <span className="text-secondary-1000 font-semibold">
                  Proportion Of Finished Resume
                </span>
              </CardHeader>
              <CardBody className="flex flex-col justify-between">
                <p className="text-secondary-1000 text-sm font-normal pt-1.5">
                  {/* We use rawPercent (100) for text display */}
                  Currently, {rawPercent}% Of The Resumes Are Completed. We Encourage
                  You To Take Action...
                </p>

                <div className="flex items-end justify-between gap-6">
                  <div className="w-1/2">
                    <Slider
                      classNames={{
                        filler: "bg-tertiar-400",
                        track: "!h-1",
                      }}
                      // We use sliderValue (0 to 1) for the component
                      value={sliderValue}
                      formatOptions={{ style: "percent" }}
                      label="Info’s"
                      marks={[
                        { value: 0, label: "0%" },
                        { value: 0.16, label: "16%" },
                        { value: 0.33, label: "33%" },
                        { value: 0.50, label: "50%" },
                        { value: 0.66, label: "66%" },
                        { value: 0.83, label: "83%" },
                        { value: 1, label: "100%" },
                      ]}
                      maxValue={1}
                      minValue={0}
                      renderThumb={({ index, ...props }) => (
                        <div
                          {...props}
                          className="group top-1/2 border-4 border-tertiar-400 rounded-full"
                        >
                          <span
                            className={cn(
                              "transition-transform bg-gradient-to-br shadow-small rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80",
                            )}
                          />
                        </div>
                      )}
                      showTooltip={true}
                      step={0.01}
                    />
                  </div>
                  {/* Check rawPercent < 100 to show button */}
                  {rawPercent < 100 && (
                    <div className="w-1/2 text-end">
                      <Button className="bg-secondary-400 text-white font-semibold py-1 px-2 rounded-lg shadow-shadow-light-tight/1 !w-[144px] !min-w-fit h-[30px]">
                        Finalize Resume
                      </Button>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* JOBS LIST CARD */}
            <Card className="bg-white p-3 rounded-5 shadow-theme-sm h-full">
              <CardHeader className="pb-2 border-b-1 border-neutral-100">
                <span className="text-base text-secondary-1000 font-semibold">
                  Job Opportunities Sent
                </span>
              </CardHeader>
              <CardBody className="overflow-y-auto">
                {jobOpportunities && Array.isArray(jobOpportunities) ? (
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
                  <div className="text-gray-400 text-xs">
                    No job opportunities available.
                  </div>
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