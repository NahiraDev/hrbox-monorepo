import type { ChartOptions } from 'chart.js';

import { Buildings2, DocumentForward } from 'iconsax-react';
import { Button, Card, CardBody, CardHeader, cn, Slider } from '@heroui/react';
import { Line } from 'react-chartjs-2';
import { useEffect } from 'react';
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
} from 'chart.js';
import { GeneralInformation, UserLocation } from '../common';

import { useLazyDashboardQuery } from './apis';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [dashboardData, { data }] = useLazyDashboardQuery();
  const sampleData = [12, 19, 3, 5, 2];

  const DashboardChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Rejected Resumes',
        data: data || sampleData,
        borderColor: '#FF3B30',
        backgroundColor: 'rgba(255, 59, 48, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Suggested',
        data: data || sampleData,
        borderColor: '#FF9500',
        backgroundColor: 'rgba(255, 149, 0, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Under Review',
        data: data || sampleData,
        borderColor: '#34C759',
        backgroundColor: 'rgba(52, 199, 89, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Interview Invitations',
        data: data || sampleData,
        borderColor: '#32ADE6',
        backgroundColor: 'rgba(50, 173, 230, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Employment',
        data: data || sampleData,
        borderColor: '#222B45',
        backgroundColor: 'rgba(34, 43, 69, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
          boxHeight: 8,
        },
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#E5E5E5',
        borderWidth: 1,
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 35,
        ticks: {
          stepSize: 5,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };
  const jobOpportunities = [
    { id: 1, company: 'Nahira', sent: true },
    { id: 2, company: 'Kungfu Federation', sent: true },
    { id: 3, company: 'Orkid', sent: true },
    { id: 4, company: 'ZAT', sent: true },
  ];

  useEffect(() => {
    dashboardData({});
  }, []);

  return (
    <div className="grid grid-cols-4 gap-3 h-full">
      <div className="col-span-3 flex flex-col gap-3 h-full">
        <div className="flex flex-col gap-3 h-full">
          <div className="h-3/5">
            <Card className="bg-white shdow-theme-sm p-3 rounded-xl h-full w-full">
              <CardHeader className="border-b-1 border-neutral-100 pb-1.5">
                <span className="text-secondary-1000 font-semibold">Viewed Resumes</span>
              </CardHeader>
              <CardBody className="h-[calc(100%-2rem)] w-full">
                <Line
                  data={DashboardChartData}
                  options={options}
                  key={JSON.stringify(data)}
                />
              </CardBody>
            </Card>
          </div>
          <div className="grid grid-cols-2 gap-3 h-2/5">
            <Card className="bg-white p-3 rounded-xl shdow-theme-sm h-full">
              <CardHeader className="border-b-1 border-neutral-100 pb-1.5">
                <span className="text-secondary-1000 font-semibold">
                  Proportion Of Finished Resume
                </span>
              </CardHeader>
              <CardBody className="flex flex-col justify-between">
                <p className="text-secondary-1000 text-sm font-normal pt-1.5">
                  Currently, {50}% Of The Resumes Are Completed. We Encourage You To Take Action And Complete Your
                  Resume To Enhance Your Opportunities. A Well-Prepared Resume Can Significantly Improve Your Chances
                  Of Success In The Job Market.
                </p>

                <div className="flex items-end justify-between gap-6">
                  <div className="w-1/2">
                    <Slider
                      classNames={{
                        filler: 'bg-tertiar-400',
                        track: '!h-1',
                      }}
                      defaultValue={0.2}
                      formatOptions={{ style: 'percent' }}
                      label="Info’s"
                      marks={[
                        {
                          value: 0,
                          label: '0%',
                        },
                        {
                          value: 0.16,
                          label: '16%',
                        },
                        {
                          value: 0.33,
                          label: '33%',
                        },
                        {
                          value: 0.49,
                          label: '50%',
                        },
                        {
                          value: 0.66,
                          label: '66%',
                        },
                        {
                          value: 0.83,
                          label: '83%',
                        },
                        {
                          value: 1,
                          label: '100%',
                        },
                      ]}
                      maxValue={1}
                      minValue={0}
                      renderThumb={({ index, ...props }) => (
                        <div {...props} className="group top-1/2 border-4 border-tertiar-400 rounded-full">
                            <span
                              className={cn(
                                'transition-transform bg-gradient-to-br shadow-small rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80',
                              )}
                            />
                        </div>
                      )}
                      showTooltip={true}
                      step={0.0001}
                      tooltipProps={{
                        offset: 10,
                        placement: 'top',
                        classNames: {
                          base: ['before:bg-tertiar-400'],
                          content: [
                            '!py-1 !px-3 shadow-shadow-light-tight/1 w-14 !rounded-md',
                            'text-secondary-1000 bg-white',
                          ],
                        },
                      }}
                      tooltipValueFormatOptions={{
                        style: 'percent',
                        currency: 'USD',
                      }}
                    />
                  </div>
                  <div className="w-1/2 text-end">
                    <Button className="bg-secondary-400 text-white font-semibold py-1 px-2 rounded-lg shadow-shadow-light-tight/1 !w-[144px] !min-w-fit h-[30px]">
                      Finalize Resume
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card className="bg-white p-3 rounded-5 shadow-theme-sm h-full">
              <CardHeader className="pb-2 border-b-1 border-neutral-100">
                  <span className="text-base text-secondary-1000 font-semibold">
                    Job Opportunities Sent
                  </span>
              </CardHeader>
              <CardBody>
                {jobOpportunities.map((job: any) => (
                  <div key={job.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div className="flex gap-2 items-center">
                      <Buildings2 className="text-secondary-400" size="22" />
                      <span className="font-semibold text-base text-secondary-1000 dark:text-white">
                          {job.company}
                        </span>
                    </div>
                    {job.sent && (
                      <div className="bg-secondary-400 px-1 py-0.5 rounded-2 flex gap-1 items-center shadow-shadow-light-tight/1">
                        <span className="text-white text-xs">Has Been Sent</span>
                        <DocumentForward className="text-white" size="12" />
                      </div>
                    )}
                  </div>
                ))}
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
