import UsersIcon from "@module/chart-maker/assets/usericon";
import UserIconD from "@module/chart-maker/assets/usericond";
import {Avatar} from "@heroui/react";

const OrganizationCard = ({props}:{props:any}) => {
  const {id , icon , name , description , members} = props
  return (
    <div
      key={id}
      className="flex items-start flex-col gap-6 bg-white dark:bg-[#01101A] rounded-2xl shadow-lg py-2 px-3 text-center"
    >
      <div className="flex items-center gap-2 pl-[5px] border-b-[2px] w-full pb-2">

        <Avatar src={icon} size='sm' radius='sm'/>
        <h3 className="text-[16px] text-2xl font-semibold leading-normal text-black dark:text-white">
          {name}
        </h3>
      </div>
      <div className="pl-[5px]">
        <p className="text-xs font-bold leading-normal">{description}</p>
        <div className="flex items-center gap-2 dark:text-[#DDBA69]">
          <div className="block dark:hidden">
            <UsersIcon className="h-5 w-5" fill="black" />
          </div>
          <div className="hidden dark:block">
            <UserIconD className="h-5 w-5" fill="white" />
          </div>
          <p className="text-sm font-normal leading-normal">{members} people</p>
        </div>
      </div>
    </div>
  );
};

export default OrganizationCard;
