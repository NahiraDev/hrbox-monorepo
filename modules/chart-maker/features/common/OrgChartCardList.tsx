import { Avatar } from '@heroui/react';
import { User } from 'iconsax-react';

export const OrgChartCardListNode = () => {
  return (
    <div className="flex border-l-[2px] border-primary-400 items-start flex-col gap-2 bg-white rounded-xl shadow-light-tight-1 dark:shadow-dark-tight-1 py-2 px-3">
      <div className="flex items-center gap-[10px] pb-1 border-b-0.5 border-neutral-100 dark:border-neutral-700">
        <Avatar radius="sm" size="sm" src="" />
        <h3 className="text-base font-semibold text-secondary-1000 wrap-break-word ">HRBox</h3>
      </div>
      <div className=" flex flex-col gap-1.5 items-start ">
        <p className="text-xs text-secondary-1000 font-bold wrap-break-word">Nahira</p>
        <div className="flex items-center gap-4">
          <User className="items-center text-primary-400 dark:text-gold" size="18" />
          <p className="text-sm font-normal text-primary-400 dark:text-gold  leading-normal gap-2">
            22 people
          </p>
        </div>
      </div>
    </div>
  );
};
