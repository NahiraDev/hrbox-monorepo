import { AppButton, AppModal } from '@hrbox-monorepo/UIKit/components';
import { FormProvider } from '@hrbox-monorepo/core/providers/FormProvider';
import {
  AwardForm,
  formValidationAward,
  handleSubmitAward,
  initialValuesAward
} from "@hrbox/modules/hrlink/forms/AwardForm";
import { useCreateCourseMutation } from "@hrbox/modules/hrlink/apis";

export const AwardModal = () => {
  const [createCourse] = useCreateCourseMutation();

  return (
    <>
      <AppModal.Body>
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
      </AppModal.Body>
    </>
  );
};
