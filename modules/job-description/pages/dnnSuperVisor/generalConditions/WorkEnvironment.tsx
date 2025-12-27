import { Calendar, Menu, Settings } from "iconsax-reactjs";

const WorkEnvironment = () => {
    return ( <>
    <div className="flex flex-col w-full gap-2 p-3 bg-white rounded-md shadow-[0_1px_3px_0_rgba(8,14,28,0.30)] ">
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700">
                  <div className="flex items-center gap-1 px-1 pt-[0.75] pb-2">
                    <span>
                      <Menu size={20} />
                    </span>
                    <p className="text-sm font-semibold">Work Environment</p>
                  </div>
        </div>
        <div className="h-full flex flex-col gap-2">
                  <div className="w-full h-[42px] py-1.5 px-2 flex justify-between items-center rounded-lg border border-[rgba(220,240,249,0.40)] bg-work-condition ">
                    <div className="flex flex-row gap-1.5 items-center">
                      <span>
                        <Settings size={16} />
                      </span>
                      <p className="text-sm">Physical Factors</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">None</p>
                    </div>
                  </div>
                  <div className="w-full h-[42px] py-1.5 px-2 flex justify-between items-center rounded-lg border border-[rgba(220,240,249,0.40)] bg-work-condition ">
                    <div className="flex flex-row gap-1.5 items-center">
                      <span>
                        <Calendar size={16} />
                      </span>
                      <p className="text-sm">Chemical Pollutants</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">None</p>
                    </div>
                  </div>
                  <div className="w-full h-[42px] py-1.5 px-2 flex justify-between items-center rounded-lg border border-[rgba(220,240,249,0.40)] bg-work-condition ">
                    <div className="flex flex-row gap-1.5 items-center">
                      <span>
                        <Calendar size={16} />
                      </span>
                      <p className="text-sm">Workplace Ergonomics</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Not observed</p>
                    </div>
                  </div>
                  </div>
    </div>
    </> );
}
 
export default WorkEnvironment;