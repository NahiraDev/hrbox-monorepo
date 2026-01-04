import { Card, Button, Avatar } from '@heroui/react';
import { workersData } from '@module/basic-info/app/mock';
import { TickIcon } from "@hrbox/uikit/icons";
import { AppPagination } from "@hrbox/uikit/components";
import { meta } from "@eslint/js";
import React from "react";


const Employees = () => {
  return (
    <div className=" flex flex-col gap-115">
      <div className="grid grid-cols-11 gap-3">
        {workersData.map((worker, index) => {
          return (
            <Card
              isPressable
              key={index}
              className="flex flex-col items-center justify-center gap-3 p-4 relative shadow-[0_1px_3px_0_#080E1C4D] hover:!bg-[#D6F2FF] cursor-pointer "
            >
              <Avatar className="w-35  h-35 rounded-3xl" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
              <div className="absolute top-3 right-0">
                <TickIcon
                  className="absolute  right-3"
                  width={24}
                  height={24}
                />

              </div>

              <span className="group relative text-secondary-1000 font-semibold text-xs inline-block max-w-[14ch] overflow-hidden whitespace-nowrap">
  {worker.nameWorker.length > 14 ? (
    <span
      className="inline-block whitespace-nowrap group-hover:animate-marquee"
    >
      {worker.nameWorker}
    </span>
  ) : (
    <span className="inline-block truncate">{worker.nameWorker}</span>
  )}
</span>

              <span className="group relative px-1.5 py-0.5 bg-primary-50 border border-primary-100 rounded-lg text-primary-400 text-xs inline-block max-w-[14ch] overflow-hidden whitespace-nowrap">
  {worker.job.length > 14 ? (
    <span
      className="inline-block whitespace-nowrap group-hover:animate-marquee"
    >
      {worker.job}
    </span>
  ) : (
    <span className="inline-block truncate">{worker.job}</span>
  )}
</span>

              <style>{`
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
}

/* Tailwind workaround برای کلاس های inline */
.group-hover\\:animate-marquee:hover {
  animation: marquee 4s linear infinite;
}
`}</style>

            </Card>
          );
        })}
      </div>
      <div className="flex justify-end">
        <AppPagination meta={meta}  />
      </div>

    </div>
  );
};

export default Employees

