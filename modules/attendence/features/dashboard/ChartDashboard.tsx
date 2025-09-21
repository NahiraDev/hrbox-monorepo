import type { ApexOptions } from 'apexcharts';

import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartDashboard = () => {
  const [series] = React.useState([
    {
      name: 'PRODUCT A',
      data: [44, 55, 41, 67, 22, 43, 21, 49, 35, 25, 14],
    },
    {
      name: 'PRODUCT B',
      data: [13, 23, 20, 8, 13, 27, 33, 12, 25, 18, 40],
    },
    {
      name: 'PRODUCT C',
      data: [11, 17, 15, 15, 21, 14, 15, 13, 12, 36, 22],
    },
  ]);

  const [options] = React.useState<ApexOptions>({
    chart: {
      type: 'bar',
      height: '100%',
      stacked: true,
    },
    colors: ['rgb(255, 99, 71)', 'rgb(32, 208, 255)', 'rgb(255, 165, 0)'],
    plotOptions: {
      bar: {
        columnWidth: '20%',
        borderRadius: 15,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    xaxis: {
      categories: [
        '2011 Q1',
        '2011 Q2',
        '2011 Q3',
        '2011 Q4',
        '2012 Q1',
        '2012 Q2',
        '2012 Q3',
        '2012 Q5',
        '2012 Q7',
        '2012 Q9',
        '2012 Q8',
      ],
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'right',
      offsetX: 0,
      offsetY: 50,
    },
  });

  return (
    <div className="h-full" id="chart">
      <ReactApexChart height="100%" options={options} series={series} type="bar" />
    </div>
  );
};

export default ChartDashboard;
