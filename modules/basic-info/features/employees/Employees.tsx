import { Card, Button, Avatar } from '@heroui/react';
import { workersData } from '@module/basic-info/app/mock';
import { AppPagination } from '@root/core';

// import { AppPagination } from '../../../../core';
// import { TickIcon } from '../../../../public/icons';
// import { TickIcon } from '../../../../public/icons';
const Employees = () => {
  return (
    <div className="h-full p-4">
      <div className="grid grid-cols-9 gap-4">
        {workersData.map((worker, index) => {
          return (
            <Card
              key={index}
              className="flex flex-col items-center justify-center gap-2 p-5 relative shadow-[0_1px_3px_0_#080E1C4D] "
            >
              <Avatar size='lg' radius="lg" color="secondary" src="" />
              <div className="absolute top-3 right-3">
                {/*<TickIcon color={worker.isAct  ive ? '#0B76B7' : '#CCC'} />*/}
              </div>
              <span className="text-secondary-1000 font-medium">{worker.nameWorker}</span>
              <Button className="h-6 text-primary-400 bg-[#DCF0F966]/40 border border-primary-100" variant="faded">
                {worker.job}
              </Button>
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

