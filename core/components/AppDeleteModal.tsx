import { useModalContext } from '@core/context';
import { AppButton, AppModal } from '@core/components';

export const AppDeleteModal = (props: any) => {
  const { onConfirm, onCancel } = props;
  const { closeModal } = useModalContext();

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
