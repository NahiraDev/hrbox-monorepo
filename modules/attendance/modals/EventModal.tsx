import { useTranslation } from "react-i18next";
import { FormProvider, useModalContext } from "@hrbox/core/providers";
import * as Yup from "yup";
import { EventForm } from "../forms/EventForm";
export const EventModal = () => {
  const { t } = useTranslation();
   const {getOpenModal,closeModal}=useModalContext();
    const modalData=getOpenModal()?.data;
  const initialValuesEvent = {
    title: null,
  };
  
const formValidationEvent = Yup.object().shape({
  title: Yup.string().required(),
});
  
   const handleSubmitEvent =async (values: any) => {
  console.log(modalData);
  
  };
  

  return (
    <FormProvider formId="event-form" initialValues={initialValuesEvent} validationSchema={formValidationEvent} onSubmitAsync={handleSubmitEvent}   >
      <EventForm />
      </FormProvider>
  );
};