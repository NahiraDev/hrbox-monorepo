import { CircularProgress } from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";
import { ClipboardTick, Status, Timer1 } from "iconsax-reactjs";
interface ProjectCardProps {
  title: string;
  status: string;
  startDate: string;
  timeLeft: string;
  progressValue: string | number;
}
const ProjectCard : React.FC<ProjectCardProps>= ({title,status,startDate,timeLeft,progressValue}) => {
  const navigateCard=useNavigate<any>();
    return ( <>
     <div className="px-4 py-3.5 bg-[#DCEBF4] flex flex-col rounded-xl shadow-[0_1px_3px_0_rgba(8,14,28,0.30)]">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2.5 ">
              <div className="flex flex-row gap-2">
                <span>
                  <ClipboardTick size={22} color="#1E3363" />
                </span>
                <p className="text-[16px] font-semibold">{title}</p>
              </div>
              <div className="border border-white"></div>
            </div>    
               <div className="flex flex-row gap-9.5">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-2 items-center">
                <span>
                  <Status color="#0B76B7" variant="Bold" size={20} />
                </span>
                <p className="text-sm">{status}</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <span>
                  <Timer1 size={20} />
                </span>
                <p className="text-sm">Satrt</p>
                <p className="text-sm">2025/01/01</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <span>
                  <Timer1 color="#1E3363" size={20} />
                </span>
                <p className="text-sm text-[#1E3363]">{timeLeft}</p>
              </div>
            </div>
            <div className="w-full flex items-center justify-center relative ">
              <CircularProgress
               classNames={{
                  svg: "w-[39px] h-[39px]",
                  value: "text-3xl font-semibold text-red-400",
                }}
                value={10}
                size="md"
                className="absolute"
              />
              <CircularProgress
                classNames={{
                  svg: "w-[59px] h-[59px]",
                  value: "text-3xl font-semibold text-red-400",
                }}
                color="primary"
                value={10}
                size="lg"
                className="absolute "
              />
            <div>
                <p className="text-[11px] font-bold p-1">{progressValue}</p>
            </div>
            </div>
          </div>
   
          </div>
        </div>
    </> );
}
 
export default ProjectCard;