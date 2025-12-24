import { Briefcase, Calendar, ChartCircle, ProfileAdd, UserOctagon, Verify } from "iconsax-reactjs";
import { Eligibility_Requirements } from "../../../app/mock";
const EligibilityRequirements = () => {

    return ( <>
       <div className="flex flex-col w-full h-full">
             {/* header content */}
             <div className="flex pt-3 pr-[124px] pb-4 pl-6 bg-[#DCF0F9] dark:bg-[#04425C] rounded-t-xl">
               <div className="flex flex-row gap-[114px]">
                 <div className="flex flex-col gap-1.5">
                   <div className="flex flex-row p-2">
                     <div className="flex flex-row gap-1.5 dark:text-[#DEE1E8]!">
                       <span>
                         <Briefcase size={24} color="#1E3363" />
                       </span>
                       <p className="text-xl text-[#1E3363]">
                         Job Title:
                         <span className="font-bold" >
                           {" "}
                           HR Specialist
                         </span>
                       </p>
                     </div>
                   </div>
                   <div className="flex flex-row p-2">
                     <div className="flex flex-row gap-1.5">
                       <span>
                         <UserOctagon size={24} color="#1E3363" />
                       </span>
                       <p className="text-xl text-[#1E3363]">
                         Supervisor:
                         <span className="font-bold" >
                           {" "}
                           CEO
                         </span>
                       </p>
                     </div>
                   </div>
                 </div>
                 <div className="flex flex-col gap-1.5">
                   <div className="flex flex-row p-2">
                     <div className="flex flex-row gap-1.5">
                       <span>
                         <ProfileAdd size={24} color="#1E3363" />
                       </span>
                       <p className="text-xl text-[#1E3363]">
                         Positions Needed:
                         <span className="font-bold" >
                           {" "}
                           1
                         </span>
                       </p>
                     </div>
                   </div>
                   <div className="flex flex-row p-2">
                     <div className="flex flex-row gap-1.5">
                       <span>
                         <ChartCircle size={24} color="#1E3363" />
                       </span>
                       <p className="text-xl text-[#1E3363]">
                         Recruitment Process Management:
                         <span className="font-bold"> Active</span>
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             {/* header content */}
            {/*body counter*/}
            <div className="flex flex-row p-3 gap-3">
              <div className="flex flex-col gap-2 p-3 bg-white rounded-md shadow-light-tight-1 w-full">
                <div className="flex px-1">
                  <div className="flex flex-row gap-1 py-1 w-full border-b-2 border-neutral-100 ">
                    <span><Verify size={20} /></span>
                    <p className="text-sm font-semibold">Eligibility Criteria</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 overflow-y-scroll max-h-[486px] pr-3 custom-scroll-objectives">
                  {Eligibility_Requirements.map((item)=>(

                   <div className="w-full  py-3 px-2 flex justify-between items-center rounded-lg border border-[rgba(220,240,249,0.40)] bg-work-condition  " key={item.id}>
                             <div className="flex flex-row w-full justify-between items-center" >
                               <div className="flex flex-row gap-1.5 items-center self-stretch">
                                <span>
                                  {<item.icon size={16} />}
                                </span>
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
              <div className="flex flex-col w-[422px] bg-white shadow-light-tight-1 rounded-md">

              </div>
            </div>
            {/*body counter*/}
           </div>
    </> );
}
 
export default EligibilityRequirements;