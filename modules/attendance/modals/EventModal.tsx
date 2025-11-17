import { useTranslation } from "react-i18next";
import {
  EventForm,
  formValidationEvent,
  handleSubmitEvent,
  initialValuesEvent,
} from "@hrbox/modules/attendance/forms/EventForm";
import { FormProvider } from "@hrbox/core/providers";

// ✅ EventModal فقط content است
export const EventModal = () => {
  const { t } = useTranslation();

  return (
    <FormProvider
      initialValues={initialValuesEvent}
      validationSchema={formValidationEvent}
      formId="event-form"
      enableCache
      clearCacheOnSubmit
      onSubmitAsync={async (values: any) => {
        handleSubmitEvent(values);
      }}
    >
      <EventForm />
    </FormProvider>
  );
};