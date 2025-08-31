import {Avatar} from "@heroui/react";
import {User} from "iconsax-react";

export const OrganizationCard = ({props}:{props:any}) => {
  const {id , icon , name , description , members} = props
  return (
    <div
      key={id}
      className="flex border-l-[2px] border-primary-400  items-start flex-col gap-2 bg-white dark:bg-[#01101A] rounded-[12px] shadow-lg py-2 px-3 text-center"
    >
      <div className="flex items-center gap-[10px] py-[3px] pl-[4px] border-b-[2px] border-[#E5E5E5] w-full ">
        <Avatar src={icon} size="sm" radius="sm" />
        <h3 className="text-[16px] text-2xl font-semibold leading-normal text-black dark:text-white overflow-auto ">nahira</h3>
      </div>
      <div className=" flex flex-col gap-1.5 items-start ">
        <p className="text-[12px] not-italic font-bold leading-normal overflow-auto">Nahira</p>
        <div className="flex items-center gap-4 dark:text-gold">
          <User size="18" className="items-center text-primary-400" />
          <p className="text-sm font-normal text-primary-400 dark:text-gold  leading-normal gap-2">22 people</p>
        </div>
      </div>
    </div>
  );
};
