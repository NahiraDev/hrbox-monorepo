import { Card, Button, Avatar } from '@heroui/react';
import { workersData } from '@module/basic-info/app/mock';
import { AppPagination } from '@root/core';

// import { AppPagination } from '../../../../core';
// import { TickIcon } from '../../../../public/icons';

const Employees = () => {
  return (
    <div className="">
      <div className="grid grid-cols-8 gap-3">
        {workersData.map((worker, index) => {
          return (
            <Card
              key={index}
              className="flex flex-col items-center justify-center gap-2 px-3 py-4 relative shadow-[0_1px_3px_0_#080E1C4D] "
            >
              <Avatar className="w-24 h-24 rounded-3xl" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
              <div className="absolute top-3 right-3">
                {/*<TickIcon color={worker.isActive ? '#0B76B7' : '#CCC'} />*/}
              </div>
              <span className="text-secondary-1000 font-medium">{worker.nameWorker}</span>
              <Button className="h-6 text-primary-400 bg-[#DCF0F966]/40 border-2 border-primary" variant="faded">
                {worker.job}
              </Button>
            </Card>
          );
        })}
      </div>
      <div className="flex justify-end">
        <AppPagination
          props={{
            size: 'sm',
            initialPage: 2,
            showControls: true,
            dotsJump: 5,
          }}
        />
      </div>

    </div>
  );
};

export default Employees

