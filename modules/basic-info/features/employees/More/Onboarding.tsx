import { onBoarding, DNNSupervisor } from '@module/basic-info/app/mock';
import { Calendar, Clipboard, UserAdd } from 'iconsax-react';
import { Card } from '@heroui/react';
import { AppDoubleLineProgress } from '@core/sections';

import { BasicInfoLayout } from '@module/basic-info/features/common';
const Onboarding = () => {
  return (
    <BasicInfoLayout
      content={
        <div className="grid grid-cols-[20%_80%] gap-2 p-4">
          <div className="flex flex-col gap-3 ">
            <div className="flex items-center gap-1 p-3">
              <UserAdd size="26" />
              <span className="text-xl font-semibold">Onboarding</span>
            </div>
            {onBoarding.map((board, index) => (
              <Card key={index} className="p-3 flex flex-col gap-2 shadow-sm ">
                <div className="flex gap-1 items-center border-b border-[#E5E5E5] text-[16px] font-semibold text-secondary-1000">
                  <Clipboard size="20" />
                  <span>{board.title}</span>
                </div>
                <div>
                  <div className="flex items-center justify-between border border-[#DCF0F9]/40 rounded-lg p-1.5 text-secondary-1000">
                    <div className="flex gap-1 items-center text-xs">
                      <Calendar size="16" />
                      <span>date</span>
                    </div>
                    <div className="text-xs font-semibold text-secondary-1000">
                      <span>{board.date}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-1 p-3">
              <UserAdd size="26" />
              <span className="text-xl font-semibold">DNN Supervisor</span>
            </div>
            {DNNSupervisor.map((box, index) => (
              <details key={index} className="bg-white border border-primary-400 p-6 rounded-2xl">
                <summary className="font-semibold flex justify-between items-center cursor-pointer">
                  <span>{box.title}</span>
                  <AppDoubleLineProgress size={30} value={80} />
                </summary>
                <div>
                  <div className="flex w-full items-center justify-between bg-[#E5E5E5] py-3 px-2 rounded-4">
                    <span>No.</span>
                    <span>Title</span>
                    <span>Result</span>
                    <span>Description</span>
                    <span>Issuer</span>
                    <span>Send Date</span>
                    <span>Due Date</span>
                    <span>Time</span>
                  </div>
                  <div className="flex w-full gap-2 items-center justify-between py-3 px-2">
                    <span>{index}</span>
                    <span>{box.tit}</span>
                    <span>{box.result}</span>
                    <span>{box.Description}</span>
                    <span>{box.Issuer}</span>
                    <span>{box.SendDate}</span>
                    <span>{box.DueDate}</span>
                    <span>{box.Time}</span>
                  </div>
                  <div className="flex w-full gap-2 items-center justify-between py-3 px-2">
                    <span>{index}</span>
                    <span>{box.tit}</span>
                    <span>{box.result}</span>
                    <span>{box.Description}</span>
                    <span>{box.Issuer}</span>
                    <span>{box.SendDate}</span>
                    <span>{box.DueDate}</span>
                    <span>{box.Time}</span>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      }
    />
  );
};

export default Onboarding;
