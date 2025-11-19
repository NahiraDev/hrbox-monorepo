import { useTranslation } from 'react-i18next';
import { FormProvider } from '@hrbox/core/providers/FormProvider';
import { EventForm, formValidationEvent, handleSubmitEvent, initialValuesEvent } from '@hrbox/modules/process-maker/forms';

export const EventModal = () => {
  const { t } = useTranslation();

  return (
      <FormProvider
          formId="event-form"
          initialValues={initialValuesEvent}
          validationSchema={formValidationEvent}
          onSubmitAsync={async (values: any) => {
              handleSubmitEvent(values);
          }}
      >
          <EventForm />
      </FormProvider>
  );
};
