import { Card, Button, Avatar } from '@heroui/react';
import { workersData } from '@module/basic-info/app/mock';
import { TickIcon } from "@hrbox/uikit/icons";


const Employees = () => {
  return (
    <div className="">
      <div className="grid grid-cols-10 gap-3">
        {workersData.map((worker, index) => {
          return (
            <Card
              isPressable
              key={index}
              className="flex flex-col items-center justify-center gap-2 px-3 py-4 relative shadow-[0_1px_3px_0_#080E1C4D] hover:!bg-[#D6F2FF] cursor-pointer "
            >
              <Avatar className="w-[96px] h-[96px] rounded-3xl" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
              <div className="absolute top-3 right-3">
                <TickIcon
                  className="absolute  right-2"
                  width={24}
                  height={24}
                />

              </div>
              <span className="text-secondary-1000 font-medium">{worker.nameWorker}</span>
                <Button className="h-6 text-primary bg-[#DCF0F966]/40 border  border-primary-100" variant="faded">
                {worker.job}
              </Button>
            </Card>
          );
        })}
      </div>
      <div className="flex justify-end">

      </div>

    </div>
  );
};

export default Employees

