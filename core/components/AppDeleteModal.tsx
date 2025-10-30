import { useModalContext } from '@core/context';
import { AppButton } from '@core/components';

export const AppDeleteModal = (props:any) => {
  const {name , onConfirm, onCancel} = props;
  const { getModalData, closeModal } = useModalContext();
  const modalData = getModalData('delete' , name);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    closeModal('delete', '');
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    closeModal('delete', '');
  };

  return (
    <div >
      <div className="flex gap-3 justify-end mt-6">
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
      </div>
    </div>
  );
};
