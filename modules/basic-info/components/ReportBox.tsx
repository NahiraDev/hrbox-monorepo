import { MessageEdit, Trash } from 'iconsax-react';
import { Button } from '@heroui/button';
import { Avatar } from '@heroui/react';
import { AppButton } from 'core/components';

const ReportBox = () => {
  return (
    <div
      className="p-4 overflow-y-auto w-70
      [&::-webkit-scrollbar]:w-3
      [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-gray-300"
    >
      <div className="flex justify-between items-cente">
        <span>Sign</span>
        <div className="flex gap-1">
          <AppButton
            props={{
              className: 'bg-white p-1',
              size: '',
              radius: '',
              onPress: () => {},
              content: (
                <div>
                  <MessageEdit className="text-[#080E1C]" />
                </div>
              ),
            }}
          />
          <AppButton
            props={{
              className: 'bg-white p-1',
              size: '',
              radius: '',
              onPress: () => {},
              content: (
                <div>
                  <Trash className="text-[#080E1C] " />
                </div>
              ),
            }}
          />
        </div>
      </div>
      <div>
        {/*<AppTextArea props={*/}

        {/*}/>*/}
      </div>
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
    <div className="flex justify-between items-center  mb-4 mt-2">
      <div>
        <Avatar className="w-10 h-10" radius="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      </div>
      <div className="flex flex-col gap-1 items-center">
        <span className="text-info-400 text-xs">Zahra Pakniyat</span>
        <Button className="h-5 text-primary-400 bg-[#DCF0F966]/40 border-1 border-primary text-[10px] w-full ">
          uiUx designer
        </Button>
      </div>
    </div>
  );
};

export default ReportBox;
