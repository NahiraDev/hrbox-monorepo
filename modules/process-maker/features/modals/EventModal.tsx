import { Hierarchy3 } from 'iconsax-react';
import { useTranslation } from 'react-i18next';

import { AppButton, useModal, withModal, AppModal, FormProvider } from '../../../../core';
import { EventForm, formValidationEvent, handleSubmitEvent, initialValuesEvent } from '../forms';

const EventModal = () => {
  const { t } = useTranslation();

  return (
    <AppModal icon={<Hierarchy3 />} size="md" title="Event Modal">
      <AppModal.Body>
        <FormProvider
          initialValues={initialValuesEvent}
          validationSchema={formValidationEvent}
          onSubmitAsync={async (values: any) => {
            handleSubmitEvent(values);
          }}
        >
          <EventForm />
        </FormProvider>
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex flex-row justify-end gap-[30px]">
          <AppButton
            props={{
              className: 'bg-[rgba(0,0,0,0)] ',
              text: t('cancel'),
            }}
          />
          <AppButton
            props={{
              className: 'px-[12px] py-[6px] gap-[6px] bg-[#0A9AD7] dark:bg-[#0D4D6A] rounded-[8px] text-white ',
              type: 'submit',
              text: t('submit'),
            }}
          />
        </div>
      </AppModal.Footer>
    </AppModal>
  );
};

EventModal.useModal = () => useModal();
export default withModal(EventModal);
