import { Briefcase, ChartCircle, ProfileAdd, UserOctagon, Verify } from "iconsax-reactjs";
import { Eligibility_Requirements } from "../../../app/mock";

const EligibilityCriteriaCounter = () => {
    return ( 
        <>
          <div className="flex flex-col gap-2 p-3 bg-white rounded-md shadow-light-tight-1 w-full">
            <div className="flex px-1">
              <div className="flex flex-row gap-1 py-1 w-full border-b border-neutral-100 dark:border-neutral-700 ">
                <span>
                  <Verify size={20} />
                </span>
                <p className="text-sm font-semibold">Eligibility Criteria</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 overflow-y-scroll max-h-[486px] pr-3 custom-scroll-objectives">
              {Eligibility_Requirements.map((item) => (
                <div
                  className="w-full  py-3 px-2 flex justify-between items-center rounded-lg border border-[rgba(220,240,249,0.40)] bg-work-condition  "
                  key={item.id}
                >
                  <div className="flex flex-row w-full justify-between items-center">
                    <div className="flex flex-row gap-1.5 items-center self-stretch">
                      <span>{<item.icon size={16} />}</span>
                      <p className="text-sm">{item.title}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
     );
}
 
export default EligibilityCriteriaCounter;