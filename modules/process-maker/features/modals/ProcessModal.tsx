import { useTranslation } from 'react-i18next';

import { AppButton, AppModal } from '@hrbox/uikit/components';
import { FormProvider } from '@hrbox/core/providers/FormProvider'
import { formValidationProcess, handleSubmitProcess, initialValuesProcess, ProcessForm } from '@module/process-maker/features/forms';

export const ProcessModal = () => {
  const { t } = useTranslation();

  return (
    // <AppModal size="4xl" title="Process Modal">
    <>
      <AppModal.Body>
        <FormProvider
          initialValues={initialValuesProcess}
          validationSchema={formValidationProcess}
          onSubmitAsync={async (values: any) => {
            handleSubmitProcess(values);
          }}
        >
          <ProcessForm />
        </FormProvider>
      </AppModal.Body>
      <AppModal.Footer>
        <AppButton
          props={{
            color: 'white',
            size: 'md',
            radius: 'lg',
            content: t('cancel'),
          }}
        />
        <AppButton
          props={{
            color: 'primary',
            type: 'submit',
            size: 'md',
            radius: 'lg',
            content: t('submit'),
          }}
        />
      </AppModal.Footer>
    </>
    // </AppModal>
  );
};
