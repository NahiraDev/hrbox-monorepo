import { Avatar } from '@heroui/react';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import { Repeat } from 'iconsax-reactjs';

import { AppButton, AppModal } from '@hrbox/uikit/components';
import CameraView from '@hrbox/modules/attendance/pages/registration/CameraView';

const FaceIdModal = () => {
  const { closeModal } = useModalContext();

  return (
    <>
      <AppModal.Body>
        <div className="flex flex-col w-full gap-6">
          <div className="flex flex-row gap-3 items-center">
            <Avatar className="w-[64px] h-[64px]" radius="sm" src="/images/profile.png" />
            <div className="flex flex-col gap-3">
              <p className="!text-sm !font-medium">Sahar Najafi</p>
              <p className="!text-sm !font-medium">192.168.1.1</p>
            </div>
          </div>
          <div className="rounded-lg relative">
            <div className="w-[100%] h-[100%] absolute bg-[#00000080] rounded-lg flex items-center justify-center ">
              <AppButton
                props={{
                  color: 'none',
                  className: 'shadow-none w-[488px] h-[303px]',
                  content: <Repeat color="white" size={56} variant='Bold' />,
                }}
              />
            </div>
            <CameraView />
          </div>
          <div className="text-center">
            <p className='!font-semibold !text-xl'>Today is Monday, March 17, 2025.</p>
          </div>
          <hr />
          <div className='flex flex-row items-center justify-center'>
            <div className='shadow-[0_1px_6px_0_rgba(10,154,215,0.40)] rounded-xl bg-[#DCF0F9] flex items-center justify-center w-[80px] h-[80px] '>
              <p className='!text-[40px] text-secondary-400 font-inter'>
                00
              </p>
            </div>
            <div className='mx-6'>
              <svg xmlns="http://www.w3.org/2000/svg" width="4" height="14" viewBox="0 0 4 14" fill="none">
                <circle cx="1.92605" cy="1.92593" r="1.92593" fill="#1E3363"/>
                <circle cx="1.92593" cy="11.4074" r="1.92593" fill="#1E3363"/>
              </svg>
            </div>
            <div className='shadow-[0_1px_6px_0_rgba(10,154,215,0.40)] rounded-xl bg-[#DCF0F9] flex items-center justify-center w-[80px] h-[80px]'>
              <p className='!text-[40px] text-secondary-400 font-inter'>
               00
              </p>
            </div>
            <div className='mx-6'>
              <svg xmlns="http://www.w3.org/2000/svg" width="4" height="14" viewBox="0 0 4 14" fill="none">
                <circle cx="1.92605" cy="1.92593" r="1.92593" fill="#1E3363"/>
                <circle cx="1.92593" cy="11.4074" r="1.92593" fill="#1E3363"/>
              </svg>
            </div>
            <div className='shadow-[0_1px_6px_0_rgba(10,154,215,0.40)] rounded-xl bg-[#DCF0F9] flex items-center justify-center w-[80px] h-[80px] '>
              <p className='!text-[40px] text-secondary-400 font-inter'>
                00
              </p>
            </div>
          </div>
        </div>
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex flex-row justify-end gap-[30px]">
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              radius: 'lg',
              onClick: () => closeModal('confirm', 'FaceIdModal'),
              content: 'Cancel',
            }}
          />
          <AppButton
            props={{
              color: 'primary',
              type: 'submit',
              size: 'md',
              radius: 'sm',
              className: 'text-white',
              content: 'Submit Again',
            }}
          />
        </div>
      </AppModal.Footer>
    </>
  );
};

export default FaceIdModal;
