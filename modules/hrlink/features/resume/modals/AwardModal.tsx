import {
  AwardForm, formValidationAward, handleSubmitAward,
  initialValuesAward
} from '../forms';
import { AppButton, AppModal, FormProvider } from '../../../../../core';
import { CupStarIcon } from '../../../icons';
import { useCreateCourseMutation } from '../apis';

export const AwardModal = () => {
  const [createCourse] = useCreateCourseMutation();

  return (
    <AppModal icon={<CupStarIcon color="#fff" />} size="3xl" title="Add Achievements and accolades">
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
    </AppModal>
  );
};
