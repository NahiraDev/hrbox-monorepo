import { AppButton, AppModal } from '@hrbox-monorepo/UIKit/components';
import { FormProvider } from '@hrbox-monorepo/core/providers/FormProvider';

import { EducationForm, formValidationEducation, handleSubmitEducation, initialValuesEducation } from '@module/hrlink/features/resume/forms';
import { useCreateEducationMutation } from '@module/hrlink/features/resume/apis';

export const EducationModal = () => {
  const [createEducation] = useCreateEducationMutation();

  return (
    // <AppModal icon={<Personalcard className="text-white" size="22" />} size="3xl" title="Edit General Informations">
      <>
        <AppModal.Body>
          <FormProvider
            initialValues={initialValuesEducation}
            validationSchema={formValidationEducation}
            onSubmitAsync={async (values: any) => {
              await createEducation(handleSubmitEducation(values)).unwrap();
            }}
          >
            <EducationForm />
          </FormProvider>
        </AppModal.Body>
        <AppModal.Footer>
          <div className="flex gap-2">
            <AppButton
              props={{
                size: 'md',
                variant: 'light',
                color: 'default',
                content: 'Close',
              }}
            />
            <AppButton
              props={{
                size: 'md',
                variant: 'light',
                color: 'secondary',
                type: 'submit',
                content: 'Submit',
              }}
            />
          </div>
        </AppModal.Footer>
      </>
    // </AppModal>
  );
};
