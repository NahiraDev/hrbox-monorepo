import { FormProvider } from "@hrbox/core/providers/FormProvider";
=
import {
    EducationForm,
    formValidationEducation, handleSubmitEducation,
    initialValuesEducation
} from "@hrbox/modules/hrlink/forms/EducationForm";
import {useCreateEducationMutation} from "@hrbox/modules/hrlink/apis";

export const EducationModal = () => {
  const [createEducation] = useCreateEducationMutation();

  return (
      <FormProvider
          formId="education-form"
          initialValues={initialValuesEducation}
          validationSchema={formValidationEducation}
          onSubmitAsync={async (values: any) => {
              await createEducation(handleSubmitEducation(values)).unwrap();
          }}
      >
          <EducationForm />
      </FormProvider>
  );
};
