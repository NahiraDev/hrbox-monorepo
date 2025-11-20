import { FormProvider } from "@hrbox/core/providers/FormProvider";
import {
    ExperienceForm,
    formValidationExperience,
    handleSubmitExperience,
    initialValuesExperience
} from "@hrbox/modules/hrlink/forms/ExperienceForm";
import {useCreateExperienceMutation} from "@hrbox/modules/hrlink/apis";

export const ExperienceModal = () => {
  const [createExperience] = useCreateExperienceMutation();

  return (
      <FormProvider
          formId="experience-form"
          initialValues={initialValuesExperience}
          validationSchema={formValidationExperience}
          onSubmitAsync={async (values: any) => {
              await createExperience(handleSubmitExperience(values)).unwrap();
          }}
      >
          <ExperienceForm />
      </FormProvider>
  );
};
