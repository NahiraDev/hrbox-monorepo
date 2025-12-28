import { LampCharge } from "iconsax-reactjs";

const SoftSkills = () => {
    return ( <>
    <div className="w-full flex flex-col gap-3" >
        {/* title */}
        <div className="flex flex-row gap-1  ">
            <span ><LampCharge size={22} color="#1E3363" /></span>
            <p className="text-xl font-semibold">Hard Skills</p>
        </div> 
        {/* title */}
        {/* cards */}
        <div className="flex w-full pr-4 overflow-y-auto">
            <div className="w-full flex flex-row flex-wrap gap-3">
                {/* card */}
                <div className="flex flex-col flex-1/2 gap-1 bg-white rounded-xl shadow-light-tight-1 p-3">
                    {/* title */}
                    <div className="flex pb-1 border-b-2 border-neutral-100 w-full ">
                        <div></div>
                    </div>
                    {/* title */}
                </div>
                {/* card */}
            </div>
        </div>
        {/* cards */}
    </div>
    </> );
}
 
export default SoftSkills;