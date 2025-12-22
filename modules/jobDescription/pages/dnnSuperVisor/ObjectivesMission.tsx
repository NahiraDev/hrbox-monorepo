import { AppButton } from "../../../../UIKit/components";
import clsx from "clsx";
import { useState } from "react";
import { tabs } from "../../app/mock";
import ObjectMissionCounter from "./ObjectMissionCounter";

const ObjectivesMission = () => {
    const [selected,setSelected]=useState<number | null>(0);
    return ( <>
    <div className="flex flex-row gap-3 w-full h-full">
            {/* buttons */}
        <div className="flex p-3 rounded-xl border border-primary h-full bg-[#DCF0F940] dark:bg-[#01101A]">
            <div className="flex flex-col gap-1.5">
               {tabs.map((btn,index)=>(
                <AppButton 
                key={index}
                className={clsx(
                    "text-[#1E3363] px-3! py-4 text-[14px] flex justify-start",
                    selected === index
                    ?"bg-[#D6F2FF] border-primary border dark:bg-[#04425C40]":"bg-white"
                )}
                content={btn.content}
                startContent={btn.icon}
                onPress={()=>setSelected(index)}
                /> 
                ))}
            </div>
        </div>
            {/* buttons */}
        {/* content */}
        <div className="w-full h-full border border-primary rounded-xl dark:bg-[#01101A]">
            <ObjectMissionCounter />
        </div>
        {/* content */}
    </div>
    </> );
}
 
export default ObjectivesMission;