import { Calendar, Location, Menu, Settings } from "iconsax-reactjs";

const WorkConditions = () => {
  return (
    <>
      <div className="flex flex-col p-3 gap-2 bg-white rounded-md shadow-[0_1px_3px_0_rgba(8,14,28,0.30)] w-full  ">
        <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700 ">
          <div className="flex items-center gap-1 px-1 pt-[0.75] pb-2">
            <span>
              <Menu size={20} />
            </span>
            <p className="text-sm font-semibold">Work Conditions</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 h-full">
          <div className="w-full h-[58.5px]  py-1.5 px-2 flex justify-between items-center rounded-lg border border-[rgba(220,240,249,0.40)] bg-work-condition ">
            <div className="flex flex-row gap-1.5 items-center self-stretch">
              <span>
                <Settings size={16} />
              </span>
              <p className="text-sm">Type of Contract</p>
            </div>
            <div>
                <p className="text-sm font-semibold">Full-Time</p>
            </div>
          </div>
          <div className="w-full h-auto py-1.5 px-2 flex-col gap-1.5 rounded-lg border border-[rgba(220,240,249,0.40)] bg-work-condition ">
            <div className="flex flex-row gap-1.5 items-center self-stretch">
              <span>
                <Location size={16} />
              </span>
              <p className="text-sm">Working Hours</p>
            </div>
            <div>
                <p className="text-sm font-semibold">Working Hours: 8:30 AM to 5:00 PM, Saturday to Wednesday – Thursdays until 1:00 PM</p>
            </div>
          </div>
               <div className="w-full h-[58.5px]  py-1.5 px-1 flex justify-between items-center rounded-lg border border-[rgba(220,240,249,0.40)] bg-work-condition ">
            <div className="flex flex-row gap-1.5 items-center self-stretch">
              <span>
                <Calendar size={16} />
              </span>
              <p className="text-sm">Job Location</p>
            </div>
            <div>
                <p className="text-sm font-semibold">Head Office</p>
            </div>
          </div>
               <div className="w-full h-[58.5px]  py-1.5 px-2 flex justify-between items-center rounded-lg border border-[rgba(220,240,249,0.40)] bg-work-condition ">
            <div className="flex flex-row gap-1.5 items-center self-stretch">
              <span>
                <Calendar size={16} />
              </span>
              <p className="text-sm">Type of Collaboration</p>
            </div>
            <div>
                <p className="text-sm font-semibold">In-Person</p>
            </div>
          </div>
               <div className="w-full h-[58.5px] py-1.5 px-2 flex justify-between items-center rounded-lg border border-[rgba(220,240,249,0.40)] bg-work-condition ">
            <div className="flex flex-row gap-1.5 items-center self-stretch">
              <span>
                <Calendar size={16} />
              </span>
              <p className="text-sm">Type of Collaboration</p>
            </div>
            <div>
                <p className="text-sm font-semibold">In-Person</p>
            </div>
          </div>
               <div className="w-full h-[58.5px]  py-1.5 px-2 flex justify-between items-center rounded-lg border border-[rgba(220,240,249,0.40)] bg-work-condition ">
            <div className="flex flex-row gap-1.5 items-center self-stretch">
              <span>
                <Calendar size={16} />
              </span>
              <p className="text-sm">Provincial Mission</p>
            </div>
            <div>
                <p className="text-sm font-semibold">Not Applicable</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkConditions;
