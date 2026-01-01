import { CircularProgress } from "@heroui/react";
import { Add, LampCharge } from "iconsax-reactjs";
import { HardSkillsData } from "../../../app/mock";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/redux";
import { useEffect, useState } from "react";
import { AppButton } from "../../../../../UIKit/components";

const HardSkills = () => {
    const isEditMode=useSelector((state:RootState)=>state.dnnSupervisorEdit.isEditMode);
    const [editTable,setEditTable]=useState<boolean>(false);
    useEffect(()=>{
        setEditTable(isEditMode)
    },[isEditMode])

    return ( <>
    <div className="w-full flex flex-col gap-3" >
        {/* title */}
        <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-1">
            <span ><LampCharge size={22} color="#1E3363" /></span>
            <p className="text-xl font-semibold">Hard Skills</p>
        </div> 
        <AppButton
        content={<Add size={20} />}
        variant="bordered"
        size=""
        color="primary"
        className="p-1.5 bg-white"
        />
        </div>
        {/* title */}
        {/* cards */}
        <div className="flex w-full pr-4 overflow-y-auto custom-scroll-objectives">
            <div className="w-full max-h-128 flex flex-row flex-wrap gap-3">
                {HardSkillsData.map((skill)=>(
                <div className="flex flex-col w-[49%] hover:border hover:border-red-400 hover:bg-[#FDE1E140] bg-white gap-1 rounded-xl shadow-light-tight-1 p-3">
                    {/* title */}
                    <div className="flex pb-1 border-b-2 border-neutral-100 w-full! ">
                        <div className="flex flex-row w-full! gap-1">
                            <div className="w-5 h-5">
                            <img src="/public/images/Ps.png" alt="" className="w-full h-full" />
                            </div>
                            <p className="text-sm font-semibold">{skill.title}</p>
                        </div>
                    </div>
                    {/* title */}
                    {/* body */}
                    <div className="flex flex-col gap-2 relative">
                        <div className="flex flex-row gap-3.5">
                            <p>Level:</p>
                            <p>A</p>
                        </div>
                        <div className="flex flex-row gap-3.5">
                            <p>Grad:</p>
                            <p>80%</p>
                        </div>
                        <div className="flex flex-row gap-3.5">
                            <p>Date:</p>
                            <p>2023</p>
                        </div>
                        <div className="flex flex-row gap-3.5">
                            <p>Description:</p>
                            <p>Adobe PhotoShop</p>
                        </div>
                        <div className="absolute top-1/3 right-4 ">
                            <div className="relative w-full flex items-center justify-center">
              <CircularProgress
                classNames={{
                  svg: "w-[41px] h-[41px]",
                  value: "text-3xl font-semibold",
                  indicator:
                    status === "Back log"
                      ? "stroke-[#0B76B7]"
                      : status === "Inprogress"
                        ? "stroke-[#FD8F02]"
                        : "stroke-[#22AD5C]",
                  track:
                    status === "Back log"
                      ? "dark:group-hover:stroke-transparent"
                      :status==="Inprogress"? "dark:group-hover:stroke-[#01101A]":"",
                }}
                value={10}
                size="md"
                className="absolute"
              />
              <CircularProgress
                classNames={{
                  svg: "w-[59px] h-[59px]",
                  value: "text-3xl font-semibold text-red-400",
                  indicator:
                    status === "Back log"
                      ? "stroke-[#0B76B7]"
                      : status === "Inprogress"
                        ? "stroke-[#FD8F02]"
                        : "stroke-[#22AD5C]",
                   track:
                    status === "Back log"
                      ? "dark:group-hover:stroke-transparent"
                      :status==="Inprogress"? "dark:group-hover:stroke-[#01101A]":"",
                }}
                color="primary"
                value={10}
                size="lg"
                className="absolute "
              />
              <div>
                <p
                  className={`text-[11px] font-bold p-1 ${status === "Back log" ? "text-[#0B76B7]!" : status === "Inprogress" ? "text-[#FD8F02]!" : "text-[#22AD5C]!"}`}
                >
                  80%
                </p>
              </div>
            </div>
            </div>
                    </div>
                    {/* body */}
                </div>
                ))}
            </div>
        </div>
        {/* cards */}
    </div>
    </> );
}
 
export default HardSkills;