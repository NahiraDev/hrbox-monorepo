import {
  AwardForm, formValidationAward, handleSubmitAward,
  initialValuesAward
} from '@module/hrlink/features/resume/forms';
import { AppButton, AppModal } from '@core/components';
import { FormProvider } from '@core/context';
import { CupStarIcon } from '@module/hrlink/icons';
import { useCreateCourseMutation } from '@module/hrlink/features/resume/apis';

export const AwardModal = () => {
  const [createCourse] = useCreateCourseMutation();

  return (
    // <AppModal icon={<CupStarIcon color="#fff" />} size="3xl" title="Add Achievements and accolades">
    <>
      <AppModal.Body>
        <FormProvider
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
    // </AppModal>
  );
};
