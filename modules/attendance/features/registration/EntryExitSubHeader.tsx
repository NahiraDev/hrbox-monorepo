import { AppButton } from '@core/components';
import { PasswordCheck, TimerStart } from 'iconsax-react';

import { useModalContext } from '@core/context';
import FaceIdModal from '@module/attendance/features/modals/FaceIdModal';
import UserLocationModal from '@module/attendance/features/modals/UserLocationModal';

const EntryExitSubHeader = () => {
  const { openModal } = useModalContext();

  return (
    <>
      <div className="flex flex-col">
        <div className="flex">
          <AppButton
            props={{
              color: 'primary',
              size: 'md',
              radius: 'lg',
              variant: 'solid',
              content: 'My Time',
              className: 'text-white',
              onClick: () => openModal('confirm', 'FaceIdModal', <FaceIdModal />,undefined,"lg",null,null),
              startContent: <PasswordCheck />,
            }}
          />
        </div>
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
                color: 'green',
                startContent: <TimerStart color="white" variant="Bold" />,
                radius: 'lg',
                className: 'shadow-[0_1px_3px_0_rgba(0,0,0,0.30)] bg-green-400',
                onPress: () => openModal('confirm', 'UserLocationModal', <UserLocationModal />,undefined,"lg",null,null ),
                content: <span className="text-white">Clock in</span>,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EntryExitSubHeader;
