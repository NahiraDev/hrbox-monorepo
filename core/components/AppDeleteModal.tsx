import { useModalContext } from '@core/context';

import { AppButton , AppModal } from '@core/components';

export const AppDeleteModal = ({props}:any) => {
  const {handleDelete , name} = props;
  const { getModalData, closeModal } = useModalContext();
  const modalData = getModalData('delete' , name);

  const handleConfirm = () => {
    handleDelete();
    closeModal('delete' , name);
  };

  const handleCancel = () => {
    closeModal('delete' , name);
  };

  return (
    // <AppModal
    //   icon={<Trash className="text-white" size="18" />}
    //   modalType="delete"
    //   size="xl"
    //   title="Do you want to remove it?"
    // >
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
    // </AppModal>
  );
};
