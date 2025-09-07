import { useTranslation } from 'react-i18next';

import { AppButton, AppModal, FormProvider, useModalContext, withModal } from '../../../../core/';
import { formValidationProcess, handleSubmitProcess, initialValuesProcess, ProcessForm } from '../forms';

export const ProcessModal = () => {
  const { t } = useTranslation();
  return (
    <AppModal size="4xl" title="Process Modal">
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
              color: "white",
              size:"md",
              radius:"lg",
              content: t('cancel'),
            }}
          />
          <AppButton
            props={{
              color:"primary",
              size:"md",
              radius:"lg",
              type: 'submit',
              content: t('submit'),
            }}
          />
      </AppModal.Footer>
    </AppModal>
  );
};

