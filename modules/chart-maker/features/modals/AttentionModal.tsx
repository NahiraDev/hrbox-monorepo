import { AppButton, AppModal } from '@hrbox/uikit/components';

export const AttentionModal = () => {
  return (
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
  );
};
