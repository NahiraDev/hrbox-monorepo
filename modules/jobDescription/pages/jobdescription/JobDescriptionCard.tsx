import { useNavigate } from "@tanstack/react-router";
import {
  ArchiveBook,
  Calendar,
  DocumentText,
  Edit,
  Trash,
} from "iconsax-reactjs";
import { AppButton } from "@hrbox/uikit/components";
import { useState } from "react";
import clsx from "clsx";

interface JobDescriptionCardProps {
  title: string;
  correctionDate: string;
  positionCode: string;
}

const JobDescriptionCard = ({
  title,
  correctionDate,
  positionCode,
}: JobDescriptionCardProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={clsx(
          "w-[292px] px-4 py-3 flex flex-col gap-3 bg-white rounded-xl shadow-[0_1px_3px_0_rgba(8,14,28,0.3)] cursor-pointer group",
          "dark:shadow-none",
          "hover:border hover:border-primary",
          "active:border-primary! active:bg-[#D6F2FF]! dark:active:bg-[#04425C40]!" 
        )}
        onClick={()=>navigate({to:"/attendance/dashboard"})}
      >
        <div className="w-full flex justify-between items-center border-b-2 border-neutral-100 ">
          <div className="flex items-center gap-2">
            <div>
              <ArchiveBook size={20} />
            </div>
            <p className="font-semibold text-[16PX]">{title}</p>
          </div>
          <div className="flex gap-1 p-1">
            <AppButton
              className="p-1 group-hover:bg-[#FD8F02]! dark:group-hover:bg-[#FD8F02]! dark:bg-transparent!  rounded-sm group-hover:text-white "
              content={<Edit size={17} />}
            />
            <AppButton
              className="p-1 group-hover:bg-[#F23030]! dark:group-hover:bg-[#F23030]! dark:bg-transparent! rounded-sm group-hover:text-white "
              content={<Trash size={17} />}
            />
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="gap-1 flex">
            <div>
              <Calendar size={18} />
            </div>
            <p className="text-sm">Correction date:</p>
          </div>
          <div>
            <p className="text-sm">{correctionDate}</p>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="flex gap-1">
            <div>
              <DocumentText size={18} />
            </div>
            <p className="text-sm font-normal">Poition Code:</p>
          </div>
          <div>
            <p className="text-sm">{positionCode}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDescriptionCard;
