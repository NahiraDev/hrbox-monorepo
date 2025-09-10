import type { ChartOptions } from 'chart.js';

import { Buildings2, DocumentForward } from 'iconsax-react';
import { Button, cn, Slider } from '@heroui/react';
import { Line } from 'react-chartjs-2';
import { useEffect } from 'react';

import { GeneralInformation, UserLocation } from '../common';

import { useLazyDashboardQuery } from './apis';

const Dashboard = () => {
  const [dashboardData, { data }] = useLazyDashboardQuery();
  const DashboardChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Rejected Resumes',
        data: data,
        borderColor: '#FF3B30',
        backgroundColor: '#fff',
        tension: 0.4,
      },
      {
        label: 'Suggested',
        data: data,
        borderColor: '#FF9500',
        backgroundColor: '#fff',
        tension: 0.4,
      },
      {
        label: 'Under Review',
        data: data,
        borderColor: '#34C759',
        backgroundColor: '#fff',
        tension: 0.4,
      },
      {
        label: 'Interview Invitations',
        data: data,
        borderColor: '#32ADE6',
        backgroundColor: '#fff',
        tension: 0.4,
      },
      {
        label: 'Employment',
        data: data,
        borderColor: '#222B45',
        backgroundColor: '#fff',
        tension: 0.4,
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
        },
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false,
        padding: 10,
      },
      annotation: {
        annotations: {
          verticalLine: {
            type: 'line' as const,
            scaleID: 'x',
            value: 'Apr',
            borderColor: 'red',
            borderWidth: 2,
            borderDash: [5, 5],
          },
          highlightBox: {
            type: 'box' as const,
            xMin: 'Apr',
            xMax: 'Apr',
            yMin: 26,
            yMax: 30,
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            borderColor: 'red',
            borderWidth: 2,
            borderDash: [5, 5],
          },
          interviewLabel: {
            type: 'label' as const,
            xValue: 'Apr',
            yValue: 26,
            content: [`0 Resumes Invited To Interviews`],
            color: 'black',
            font: {
              size: 12,
              weight: 'bold' as const,
            },
          },
          rejectedLabel: {
            type: 'label' as const,
            xValue: 'Jun',
            yValue: 10,
            content: ['487'],
            color: 'white',
            backgroundColor: 'red',
            font: {
              size: 12,
              weight: 'bold' as const,
            },
            padding: 5,
            borderRadius: 5,
          },
        },
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
    <div className="grid grid-cols-4 gap-3 h-[calc(100%-132px)]">
      <div className="col-span-3 flex flex-col gap-3 h-full">
        <div className="flex flex-col gap-3 h-full">
          <div className="h-3/5">
            <div className="h-full w-full">
              <div className="bg-white shadow-light-tight-1 p-3 rounded-5 h-full w-full">
                <div className="border-b-1 border-netural-100 pb-1.5">
                  <span className="text-secondary-1000 text-base font-semibold">Viewed Resumes</span>
                </div>
                <div className="h-[calc(100%-2rem)] w-full">
                  <Line data={DashboardChartData} height="100%" options={options} width="100%" />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 h-2/5">
            <div className="h-full">
              <div className="bg-white p-3 rounded-5 shadow-light-tight-1 h-full">
                <div className="border-b-1 border-netural-100 pb-1.5">
                  <span className="text-base text-secondary-1000  font-semibold">
                    Proportion Of Finished Resume
                  </span>
                </div>
                <div className="flex flex-col justify-between">
                  <p className="text-secondary-1000 dark:text-white text-sm font-normal pt-1.5">
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
                              '!py-1 !px-3 shadow-shadow-light-tight/1 w-14 !rounded-4',
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
                </div>
              </div>
            </div>
            <div className="h-full">
              <div className="bg-white dark:bg-info-1000 p-3 rounded-5 shadow-shadow-light-tight/1 dark:shadow-shadow-dark-tight/1 h-full">
                <div className="pb-2 border-b-1 border-netural-100">
                  <span className="text-base text-secondary-1000 dark:text-white font-semibold">
                    Job Oppertunities Sent
                  </span>
                </div>
                <div className="">
                  {jobOpportunities.map((job: any) => (
                    <div key={job.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div className="flex gap-2 items-center">
                        <Buildings2 className="text-secondary-400 dark:text-white" size="22" />
                        <span className="font-semibold text-base text-secondary-1000 dark:text-white">
                          {job.company}
                        </span>
                      </div>
                      {job.sent && (
                        <div className="bg-secondary-400 dark:bg-surface-200 px-1 py-0.5 rounded-2 flex gap-1 items-center shadow-shadow-light-tight/1">
                          <span className="text-white text-xs">Has Been Sent</span>
                          <DocumentForward className="text-white" size="12" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
