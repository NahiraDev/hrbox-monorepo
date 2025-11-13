import { useTranslation } from 'react-i18next';

import { AppButton, AppModal } from '@hrbox/uikit/components';
import { FormProvider } from '@hrbox/core/providers';
import { EventForm, formValidationEvent, handleSubmitEvent, initialValuesEvent } from '@hrbox/modules/attendance/forms/EventForm';

export const EventModal = () => {
  const { t } = useTranslation();

  return (
    <>
      <AppModal.Body>
        <FormProvider
          initialValues={initialValuesEvent}
          validationSchema={formValidationEvent}
          formId='event-form' enableCache clearCacheOnSubmit
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
              color= 'white'
              size= 'md'
              radius= 'lg'
              content= {t('cancel')}
          />
          <AppButton
              color= 'primary'
              size= 'md'
              radius= 'lg'
              content={ t('submit')}

          />
        </div>
      </AppModal.Footer>
    </>
  );
};
