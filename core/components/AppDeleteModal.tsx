import { Trash } from 'iconsax-react';
import { useModalContext } from '../context';

import AppModal from './AppModal';
import AppButton from './AppButton';

const AppDeleteModal = () => {
  const { getModalData, closeModal } = useModalContext();
  const modalData = getModalData('delete');

  const handleConfirm = () => {
    console.log('Deleting:', modalData);
    closeModal('delete');
  };

  const handleCancel = () => {
    closeModal('delete');
  };

  return (
    <AppModal
      icon={<Trash className="text-white" size="18" />}
      modalType="delete"
      size="xl"
      title="Do you want to remove it?"
    >
      <AppModal.Footer>
        <AppButton
          props={{
            size: 'md',
            radius: 'lg',
            variant: 'light',
            onPress: handleCancel,
            content: 'Cancel',
          }}
        />
        <AppButton
          props={{
            size: 'md',
            radius: 'lg',
            color: 'danger',
            onPress: handleConfirm,
            content: 'Delete',
          }}
        />
      </AppModal.Footer>
    </AppModal>
  );
};

export default AppDeleteModal;
