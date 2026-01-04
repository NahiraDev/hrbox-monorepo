import GeneralForm, {
  initialValuesAction,
  formValidationAction,
  handleSubmitAction,
} from "../forms/GeneralForm";
import { FormProvider } from "@hrbox/core/providers";

const GeneralModal = () => {
  return (
    <FormProvider
      formId="general-form"
      initialValues={initialValuesAction}
      validationSchema={formValidationAction}
      onSubmit={handleSubmitAction}
    >
      <GeneralForm />
    </FormProvider>
  );
};

export default GeneralModal;
