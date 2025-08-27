import React from "react";
import UsersIcon from "@module/chart-maker/assets/usericon";
import UserIconD from "@module/chart-maker/assets/usericond";
import Nahira from "@module/chart-maker/assets/nahira";


interface Organization {
  name: string;
  description: string;
  members: number;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const organizations: Organization[] = [
  { name: "Nahira", description: "Nahira Digital Accelerator", members: 24, Icon: Nahira },
  { name: "Nahira", description: "Nahira Digital Accelerator", members: 24, Icon: Nahira },
  { name: "Nahira", description: "Nahira Digital Accelerator", members: 24, Icon: Nahira },
  { name: "Nahira", description: "Nahira Digital Accelerator", members: 24, Icon: Nahira },
];

const OrganizationCard: React.FC = () => {
  return (
    <div className="flex pr-[84px] pt-[13px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 w-full border-[3px] border-[#0A9AD7] dark:border-[#0D4D6A] rounded-[12px] bg-[#DCF0F9] dark:bg-[rgba(4,66,92,0.60)]">
        {organizations.map((org, idx) => {
          const Icon = org.Icon;
          return (
            <div
              key={idx}
              className="flex items-start flex-col gap-6 bg-white dark:bg-[#01101A] rounded-2xl shadow-lg py-2 px-3 text-center"
            >
              <div className="flex items-center gap-2 pl-[5px] border-b-[2px] w-full pb-2">

                <Icon className="h-6 w-6 text-gray-400" fill="currentColor" />
                <h3 className="text-[16px] text-2xl font-semibold leading-normal text-black dark:text-white">
                  {org.name}
                </h3>
              </div>
              <div className="pl-[5px]">
                <p className="text-xs font-bold leading-normal">{org.description}</p>
                <div className="flex items-center gap-2 dark:text-[#DDBA69]">
                  <div className="block dark:hidden">
                    <UsersIcon className="h-5 w-5" fill="black" />
                  </div>
                  <div className="hidden dark:block">
                    <UserIconD className="h-5 w-5" fill="white" />
                  </div>
                  <p className="text-sm font-normal leading-normal">{org.members} people</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrganizationCard;
