import { Accordion, AccordionItem } from "@heroui/react";
import { User } from "iconsax-reactjs";

const ProjectTimesheets = () => {
    return ( <>
    <div className="flex flex-col gap-2">
       <div className="flex flex-row justify-between items-center text-white w-full h-10 bg-primary rounded-lg">
        <div className="flex justify-center w-full">
            <p>No</p>
        </div>
        <div className="flex justify-center w-full">
            <p>Task Name</p>
        </div>
        <div className="flex justify-center w-full">
            <p>employee Name</p>
        </div>
        <div className="flex justify-center w-full">
            <p>Time Task</p>
        </div>
       </div>
       <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
            <div className="border border-[#04070E] p-2 gap-3 rounded-lg flex items-center justify-center h-[68px] w-[68px] ">
                <p className="text-xl font-semibold ">01</p>
            </div>
       <Accordion variant="bordered" className="border-1 border-[#04070E]">
            <AccordionItem title={<div className="flex flex-row justify-between items-center font-sans">
                <div><p className="text-sm font-semibold">Project Name</p></div>
                <div className="flex">
                    <p className="textt-sm font-normal">Total project time:</p>
                    <p className="tezt-sm font-semibold">11 hours and 40 minutes</p>
                </div>
            </div>}>
            <div className="flex flex-col gap-3">
                <div className="flex flex-row justify-between text-center bg-white rounded-lg px-4 py-2.5">
                    <div className="flex w-full">
                        <p>01 </p>
                        <span><User size={20}/></span>
                    </div>
                    <div className="w-full">
                        <p>Task Name</p>
                    </div>
                    <div className="w-full">
                        <p>Alireza</p>
                    </div>
                    <div className="w-full">
                        <p>2 hours and 5 minutes</p>
                    </div>
                </div>
                <div className="flex flex-row justify-between text-center bg-white rounded-lg px-4 py-2.5">
                    <div className="flex w-full">
                        <p>01 </p>
                        <span><User size={20}/></span>
                    </div>
                    <div className="w-full">
                        <p>Task Name</p>
                    </div>
                    <div className="w-full">
                        <p>Alireza</p>
                    </div>
                    <div className="w-full">
                        <p>2 hours and 5 minutes</p>
                    </div>
                </div>
            </div>
            </AccordionItem>
       </Accordion>
        </div>
        <div className="flex flex-row gap-2">
            <div className="border border-[#04070E] p-2 gap-3 rounded-lg flex items-center justify-center h-[68px] w-[68px] ">
                <p className="text-xl font-semibold ">01</p>
            </div>
       <Accordion variant="bordered" className="border-1 border-[#04070E]">
            <AccordionItem title={<div className="flex flex-row justify-between items-center font-sans">
                <div><p className="text-sm font-semibold">Project Name</p></div>
                <div className="flex">
                    <p className="textt-sm font-normal">Total project time:</p>
                    <p className="tezt-sm font-semibold">11 hours and 40 minutes</p>
                </div>
            </div>}>
            <div className="flex flex-col gap-3">
                <div className="flex flex-row justify-between text-center bg-white rounded-lg px-4 py-2.5">
                    <div className="flex w-full">
                        <p>01 </p>
                        <span><User size={20}/></span>
                    </div>
                    <div className="w-full">
                        <p>Task Name</p>
                    </div>
                    <div className="w-full">
                        <p>Alireza</p>
                    </div>
                    <div className="w-full">
                        <p>2 hours and 5 minutes</p>
                    </div>
                </div>
                <div className="flex flex-row justify-between text-center bg-white rounded-lg px-4 py-2.5">
                    <div className="flex w-full">
                        <p>01 </p>
                        <span><User size={20}/></span>
                    </div>
                    <div className="w-full">
                        <p>Task Name</p>
                    </div>
                    <div className="w-full">
                        <p>Alireza</p>
                    </div>
                    <div className="w-full">
                        <p>2 hours and 5 minutes</p>
                    </div>
                </div>
            </div>
            </AccordionItem>
       </Accordion>
        </div>
        </div>
    </div>
    </> );
}
 
export default ProjectTimesheets;