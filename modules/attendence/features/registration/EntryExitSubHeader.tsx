import { AppButton } from 'core/components';
import { PasswordCheck } from 'iconsax-react';

import { useModalContext } from '../../../../core/context';
import FaceIdModal from '../modals/FaceIdModal';

const EntryExitSubHeader = () => {
  const { openModal } = useModalContext();

  return (
    <>
      <div className="flex flex-row justify-between ">
        <div className="flex">
          <AppButton
            props={{
              color: 'primary',
              size: 'md',
              radius: 'lg',
              variant: 'solid',
              content: 'My Time',
              onClick: () => openModal('confirm', 'FaceIdModal', <FaceIdModal />),
              startContent: <PasswordCheck />,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default EntryExitSubHeader;
