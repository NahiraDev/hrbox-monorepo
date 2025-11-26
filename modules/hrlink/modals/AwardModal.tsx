import { FormProvider } from "@hrbox/core/providers/FormProvider";
import {
  AwardForm,
  formValidationAward,
  handleSubmitAward,
  initialValuesAward,
} from "@hrbox/modules/hrlink/forms/AwardForm";
import { useCreateCourseMutation } from "@hrbox/modules/hrlink/apis";

export const AwardModal = () => {
  const [createCourse] = useCreateCourseMutation();

  return (
        <FormProvider
          formId="award-form"
          initialValues={initialValuesAward}
          validationSchema={formValidationAward}
          onSubmitAsync={async (values: any) => {
            await createCourse(handleSubmitAward(values)).unwrap();
          }}
        >
          <AwardForm />
        </FormProvider>
  );
};
