import { useModal } from 'core/hooks';
import { withModal } from 'core/helpers';
import {
  AppButton,
  AppModal
} from 'core/components';
import { Personalcard } from 'iconsax-react';
import { FormProvider } from 'core/context';
import { EducationForm, formValidationEducation, handleSubmitEducation, initialValuesEducation } from '../forms';
import { useCreateEducationMutation } from '../apis';

const EducationModal = () => {
  const [createEducation] = useCreateEducationMutation()
  return (
    <AppModal
      size="3xl"
      title="Edit General Informations"
      icon={<Personalcard className="text-white" size="22" />}
    >
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
              color:'default',
              content: 'Close',
            }}
          />
          <AppButton
            props={{
              size: 'md',
              variant: 'light',
              color:'secondary',
              type: 'submit',
              content: 'Submit',
            }}
          />
        </div>
      </AppModal.Footer>
    </AppModal>
  );
};

EducationModal.useModal = () => useModal();

export default withModal(EducationModal);
