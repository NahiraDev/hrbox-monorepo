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
              text: t('cancel'),
            }}
          />
          <AppButton
            props={{
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
