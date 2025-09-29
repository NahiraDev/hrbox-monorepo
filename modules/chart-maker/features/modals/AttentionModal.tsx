import { InfoCircle } from 'iconsax-react';

import { AppButton, AppModal } from '@core/components';

export const AttentionModal = () => {
  // const { getOpenModals } = useModalContext();
  // const openModals = getOpenModals();
  // const { closeModal } = useModalContext();

  // const handleCancel = () => {
  //   console.log(openModals);
  //   // closeModal('confirm','Test');
  // };

  return (
    // <AppModal icon={<InfoCircle color="white" size={18} />} size="xl" title="Attention">
    <>
      <AppModal.Body>
        <div className="bg-surface-50 px-6 py-3 w-full rounded-lg">
          <span className="text-secondary-1000 text-xl font-semibold">Should the offboarding process take place?</span>
        </div>
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex justify-between w-full">
          <AppButton
            props={{
              size: 'md',
              radius: 'md',
              color: 'danger',
              // onPress: handleCancel,
              content: 'Cancel Offboarding',
            }}
          />
          <AppButton
            props={{
              size: 'md',
              radius: 'md',
              color: 'primary',
              content: 'Proceed with Offboarding',
            }}
          />
        </div>
      </AppModal.Footer>
    </>
    // </AppModal>
  );
};
