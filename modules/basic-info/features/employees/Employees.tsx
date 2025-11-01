import { Card, Button, Avatar } from '@heroui/react';
import { workersData } from '@module/basic-info/app/mock';
import { AppButton, AppPagination } from '@root/core';
import { TickIcon } from '@root/shared/icons/TickIcon';
import { BasicInfoPaths } from '@module/basic-info/app/paths';
import { useNavigate } from 'react-router-dom';

const Employees = () => {
  const navigate = useNavigate();

  return (
    <div className=" flex flex-col justify-between gap-10 p-4">
      <div className="grid grid-cols-10 gap-3">
        {workersData.map((worker, index) => {
          return (
            <Card
              key={index}
                className="flex flex-col items-center justify-center gap-3 p-5 relative shadow-sm cursor-pointer hover:bg-surface-50"
            >
              <Avatar radius="lg" color="primary" src="" className="w-24 h-24 text-white "/>
              <div className="absolute top-3 right-3  ">
                <TickIcon color="#CCCCCC" />
              </div>
              <span className="text-secondary-1000 !font-semibold !text-xs">{worker.nameWorker}</span>
              <AppButton
                props={{
                  className: 'h-5  bg-surface-50  border-1 border-primary-50 text-primary-400',
                  radius: 'sm',
                  onPress: () => {navigate(BasicInfoPaths.PersonalInformation)},
                  content: <span className="!text-xs">{worker.job}</span>,
                }}
              />
            </Card>
          );
        })}
      </div>
      <div className="flex justify-end">
        <AppPagination total={5} />
      </div>

    </div>
  );
};

export default Employees

