import { Trash } from 'iconsax-react';
import { useModal } from 'core/hooks';
import { withModal } from 'core/helpers';

import AppModal from './AppModal';
import AppButton from './AppButton';

interface AppDeleteModalProps {
  onConfirm?: () => void;
  onCancel?: () => void;
}

const AppDeleteModal = ({ onConfirm, onCancel }: AppDeleteModalProps) => {
  return (
    <AppModal
      icon={<Trash className="text-white" size="18" />}
      size="2xl"
      title="Would it be acceptable for you to remove this?"
    >
      <AppModal.Footer>
        <AppButton
          props={{
            size: 'md',
            radius: 'lg',
            variant: 'light',
            onPress: onCancel || (() => {}),
            content: 'Cancel',
          }}
        />
        <AppButton
          props={{
            size: 'md',
            radius: 'lg',
            color: 'danger',
            onPress: onConfirm || (() => {}),
            content: 'Delete',
          }}
        />
      </AppModal.Footer>
    </AppModal>
  );
};

AppDeleteModal.useModal = () => useModal();

export default withModal(AppDeleteModal);
