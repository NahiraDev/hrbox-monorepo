import { MessageEdit, Trash } from 'iconsax-react';
import { Button } from '@heroui/button';
import { Avatar } from '@heroui/react';

const ReportBox = () => {
  return (
    <div className="p-4 h-120  overflow-y-auto">
      <div className="flex gap-30">
        <span className="text-red-500">Sign</span>
        <div className="flex gap-1  ">
          <Button isIconOnly>
            <MessageEdit />
          </Button>
          <Button isIconOnly>
            <Trash />
          </Button>
        </div>
      </div>
      {/*<div>*/}
      {/*  <input className="w-full h-20 rounded-3xl bg-white border-2 border-sky-200" />*/}
      {/*</div>*/}
      <div>
        <span>Report To</span>
        <User />
        <User />
      </div>
      <div>
        <span>Indirect Relationship With</span>
        <User />
      </div>
      <div>
        <span>Consultant</span>
        <User />
      </div>
      <div>
        <span>Subgroup Colleagues</span>
        <User />
        <User />
      </div>
    </div>
  );
};
const User = () => {
  return (
    <div className="flex gap-3 items-center mt-2">
      <div>
        <Avatar
          className="w-11 h-11"
          radius="sm"
          src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
        />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="text-info-400 text-xs">Zahra Pakniyat</span>
        <Button className="h-6 text-primary-400 bg-[#DCF0F966]/40 border-1 border-primary text-[10px]">
          uiUx designer
        </Button>
      </div>
    </div>
  );
};

export default ReportBox;
