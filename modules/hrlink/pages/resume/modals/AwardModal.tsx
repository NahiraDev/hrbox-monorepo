import {
  AwardForm, formValidationAward, handleSubmitAward,
  initialValuesAward
} from '@module/hrlink/features/resume/forms';
import { AppButton, AppModal } from '@hrbox/uikit/components';
import { FormProvider } from '@hrbox/core/providers/FormProvider';
import { useCreateCourseMutation } from '@module/hrlink/features/resume/apis';

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
      <AppModal.Footer>
        <AppButton
          props={{
            content: 'Close',
          }}
        />
      </AppModal.Footer>
    </>
  );
};
