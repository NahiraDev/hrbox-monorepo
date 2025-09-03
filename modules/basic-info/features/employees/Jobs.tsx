import { Card } from '@heroui/react';
import { Jobss } from '@mock/index';
// import { AppButton } from 'core/components';
import { Buildings, Calendar, Designtools, Location, Trash } from 'iconsax-react';

import ReportBox from '../../components/ReportBox';
import BlueHeaderEmployees from './BlueHeaderEmployees';

const Jobs = () => {
  return (
    <>
      <BlueHeaderEmployees />
      <div className="flex w-full gap-8">
        <ReportBox />
        <div className="grid grid-cols-4 gap-4 w-full">
          {Jobss.map((user, index) => (
            <Card key={index} className="py-2 px-3">
              <div className="flex items-center justify-between border-b-2 border-gray-200 p-2">
                <div className="flex items-center gap-1">
                  <Designtools />
                  <span>{user.job}</span>
                </div>
                <div>
                  <Trash />
                </div>
              </div>
              <div className="flex flex-col gap-2 p-2">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Buildings />
                    <span>Uni</span>
                  </div>
                  <div>
                    <span>{user.company}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Calendar />
                    <span>Date</span>
                  </div>
                  <div>
                    <span>{user.date}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Location />
                    <span>Location</span>
                  </div>
                  <div>
                    <span>{user.location}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Jobs;
