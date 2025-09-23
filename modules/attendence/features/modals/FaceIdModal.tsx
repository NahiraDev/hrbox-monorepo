import { Avatar } from '@heroui/react';
import AvatarUser from 'core/assets/img/inpersonate-avatar.png';
import { useModalContext } from 'core/context';

import { AppButton, AppModal } from '../../../../core/components';
import CameraView from '@module/attendence/features/registration/CameraView';

const FaceIdModal = () => {
  const { closeModal } = useModalContext();

  return (
    <>
      <AppModal.Body>
        <div className="flex flex-col w-full gap-6">
          <div className="flex flex-row gap-3 items-center">
            <Avatar className="w-[64px] h-[64px]" radius="md" src={AvatarUser} />
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium">Sahar Najafi</p>
              <p className="text-sm font-medium">192.168.1.1</p>
            </div>
          </div>
          <div className="rounded-lg">
            <CameraView />
          </div>
          <div className="text-center font-semibold text-xl">
            <p>Today is Monday, March 17, 2025.</p>
          </div>
          <hr />
          <div className="flex flex-row text-4xl items-center justify-center text-secondary-400">
            <h1 className="p-4 rounded-xl bg-[#DCF0F9] shadow-[0_1px_6px_0_rgba(10,154,215,0.40)]">11</h1>
            <span className="text-4xl mx-4">:</span>
            <h1 className="p-4 rounded-xl bg-[#DCF0F9] shadow-[0_1px_6px_0_rgba(10,154,215,0.40)]">59</h1>
            <span className="text-4xl mx-4">:</span>
            <h1 className="p-4 rounded-xl bg-[#DCF0F9] shadow-[0_1px_6px_0_rgba(10,154,215,0.40)]">50</h1>
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
              radius: 'lg',
              content: 'Submit Again',
            }}
          />
        </div>
      </AppModal.Footer>
    </>
  );
};

export default FaceIdModal;
