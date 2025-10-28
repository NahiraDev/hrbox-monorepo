import { TimerStart } from 'iconsax-react';

import { EntryExitData } from '@module/attendance/app/mock';

import { AppTable } from '@core/components';
import { AppButton } from '@core/components';
import { useModalContext } from '@core/context';
import UserLocationModal from '@module/attendance/features/modals/UserLocationModal';

const EntryExit = () => {
  const { openModal } = useModalContext();

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="flex flex-row justify-between items-center mt-[32px] mb-[12px]">
          <div className="flex flex-row text-4xl items-center">
            <h1 className="p-4 rounded-xl bg-[#DCF0F9] shadow-[0_1px_6px_0_rgba(10,154,215,0.40)]">00</h1>
            <span className="text-4xl mx-4">:</span>
            <h1 className="p-4 rounded-xl bg-[#DCF0F9] shadow-[0_1px_6px_0_rgba(10,154,215,0.40)]">00</h1>
            <span className="text-4xl mx-4">:</span>
            <h1 className="p-4 rounded-xl bg-[#DCF0F9] shadow-[0_1px_6px_0_rgba(10,154,215,0.40)]">00</h1>
          </div>
          <div className="flex flex-row text-xl items-center">
            {/*<AppAlert visible={visible} />*/}
            <h3 className="mr-9">Today is Sunday, January 13, 2025, at 20:02.</h3>
            <AppButton
              props={{
                size: 'md',
                color: 'success',
                startContent: <TimerStart color="white" variant="Bold" />,
                radius: 'lg',
                className: 'shadow-[0_1px_3px_0_rgba(0,0,0,0.30)]',
                onPress: () => openModal('confirm', 'UserLocationModal', <UserLocationModal />,undefined,"lg",null,null ),
                content: <span className="text-white">Clock in</span>,
              }}
            />
          </div>
        </div>
        <AppTable data={EntryExitData} />
      </div>
    </>
  );
};

export default EntryExit;
