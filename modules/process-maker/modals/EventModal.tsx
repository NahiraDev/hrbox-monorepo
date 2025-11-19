
import { useTranslation } from 'react-i18next';

import { AppButton, AppModal } from '@UIKit/components';
import { FormProvider } from '@core/providers/FormProvider';
import { EventForm, formValidationEvent, handleSubmitEvent, initialValuesEvent } from '@modules/process-maker/forms';

export const EventModal = () => {
  const { t } = useTranslation();

  return (
    // <AppModal icon={<Hierarchy3 />} size="md" title="Event Modal">
    <>
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
              color: 'white',
              size: 'md',
              radius: 'lg',
              content: t('cancel'),
            }}
          />
          <AppButton
            props={{
              color: 'primary',
              type: 'submit',
              size: 'md',
              radius: 'lg',
              content: t('submit'),
            }}
          />
        </div>
      </AppModal.Footer>
    </>
    // </AppModal>
  );
};
