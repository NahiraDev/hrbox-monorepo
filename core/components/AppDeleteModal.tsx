import { useModalContext } from '@core/context';

import { AppButton , AppModal } from '@core/components';
// import { Trash } from 'iconsax-react';

export const AppDeleteModal = (props:any) => {
  const {name} = props;
  const { getModalData, closeModal } = useModalContext();
  const modalData = getModalData('delete' , name);

  const handleConfirm = () => {
    console.log('Deleting:', modalData);
    closeModal('delete' , name);
  };

  const handleCancel = () => {
    closeModal('delete' , name);
  };

  return (
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
  );
};
