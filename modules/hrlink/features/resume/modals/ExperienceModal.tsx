import { FavoriteChart } from 'iconsax-react';
import { AppButton, AppModal } from '@core/components';
import { FormProvider } from '@core/context';

import { ExperienceForm, formValidationExperience, handleSubmitExperience, initialValuesExperience } from '@module/hrlink/features/resume/forms';
import { useCreateExperienceMutation } from '@module/hrlink/features/resume/apis';

export const ExperienceModal = () => {
  const [createExperience] = useCreateExperienceMutation();

  return (
    <AppModal icon={<FavoriteChart className="text-white" size="22" />} size="4xl" title="Work Experience">
      <AppModal.Body>
        <FormProvider
          initialValues={initialValuesExperience}
          validationSchema={formValidationExperience}
          onSubmitAsync={async (values: any) => {
            await createExperience(handleSubmitExperience(values)).unwrap();
          }}
        >
          <ExperienceForm />
        </FormProvider>
      </AppModal.Body>
      <AppModal.Footer>
        <AppButton
          props={{
            color: 'light',
            content: 'Cancel',
          }}
        />
        <AppButton
          props={{
            color: 'primary',
            content: 'Save Changes',
          }}
        />
      </AppModal.Footer>
    </AppModal>
  );
};
