import { Settings, Verify } from "iconsax-reactjs";
import AppSlider from "../../../../../UIKit/components/AppSlider";
import {     Weight_of_Indicators } from "../../../app/mock";

const WeightofIndicatorsCounter = () => {
    return ( <>
     <div className="flex flex-col w-[422px]  p-3 gap-2 bg-white shadow-light-tight-1 rounded-md">
        <div className="w-full p-1">
            <div className="flex flex-row pb-1 gap-1 border-b border-neutral-100 dark:border-b-neutral-700">
                <span><Verify size={20} /></span>
                <p className="text-sm font-semibold">Weight of Indicators</p>
            </div>
        </div>
        <div className="flex flex-col gap-2 overflow-y-scroll pr-3 custom-scroll-objectives ">
            {Weight_of_Indicators.map((item)=>(
            <div className="py-1.5 px-2 w-full h-[85px] bg-work-condition border border-[rgba(220,240,249,0.40)] rounded-lg" key={item.id} >
                <div className="flex flex-col h-full justify-between w-full">
                <div className="w-full flex flex-row gap-1.5 items-center">
                    <span><item.icon size={16} /></span>
                    <p className="text-[12px] ">{item.title}</p>
                </div>
                <div className="flex flex-col gap-2 w-full px-1 items-center ">
                    <AppSlider defaultValue={.5} isDisabled={true} />
                    <p className="text-[12px] text-[#04070E]" >50%</p>
                </div>  
                </div>
            </div>
            ))}
        </div>  
     </div>
    </> );
}
 
export default WeightofIndicatorsCounter;