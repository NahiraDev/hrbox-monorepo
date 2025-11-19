import { useTranslation } from "react-i18next";
import {
  EventForm,
  formValidationEvent,
  handleSubmitEvent,
  initialValuesEvent,
} from "@hrbox/modules/attendance/forms/EventForm";
// import { FormProvider } from "@hrbox/core/providers";

export const EventModal = () => {
  const { t } = useTranslation();

  return (
      <EventForm />
  );
};