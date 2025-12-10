import { Accordion, AccordionItem } from "@heroui/react";
import { User } from "iconsax-reactjs";

interface PropsAccordion{
    projectName:string;
    projectTime:string;
    time:string;
    id:number;
    taskName:string;
    name:string;
    idProject:number;
    timeProject:string;
}

const TimeSheetAccordion : React.FC<PropsAccordion>= ({projectName,projectTime,time,id,taskName,name,idProject,timeProject}) => {
    return ( <>
<div className="flex flex-row gap-2">
            <div className="border border-[#04070E] p-2 gap-3 rounded-lg flex items-center justify-center h-[68px] w-[68px] ">
                <p className="text-xl font-semibold ">{id}</p>
            </div>
       <Accordion variant="bordered" className="border-1 border-[#04070E]">
            <AccordionItem title={<div className="flex flex-row justify-between items-center font-sans">
                <div><p className="text-sm font-semibold">{projectName}</p></div>
                <div className="flex">
                    <p className="textt-sm font-normal">{projectTime}</p>
                    <p className="tezt-sm font-semibold">{time}</p>
                </div>
            </div>}>
            <div className="flex flex-col gap-3">
                <div className="flex flex-row justify-between text-center bg-white rounded-lg px-4 py-2.5">
                    <div className="flex w-full">
                        <p>{idProject} </p>
                        <span><User size={20}/></span>
                    </div>
                    <div className="w-full">
                        <p>{taskName}</p>
                    </div>
                    <div className="w-full">
                        <p>{name}</p>
                    </div>
                    <div className="w-full">
                        <p>{timeProject}</p>
                    </div>
                </div>
                <div className="flex flex-row justify-between text-center bg-white rounded-lg px-4 py-2.5">
                    <div className="flex w-full">
                        <p>{idProject} </p>
                        <span><User size={20}/></span>
                    </div>
                    <div className="w-full">
                        <p>{taskName}</p>
                    </div>
                    <div className="w-full">
                        <p>{name}</p>
                    </div>
                    <div className="w-full">
                        <p>{timeProject}</p>
                    </div>
                </div>
            </div>
            </AccordionItem>
       </Accordion>
        </div>
    </> );
}
 
export default TimeSheetAccordion;