import { useTranslation } from 'react-i18next';
import { FormProvider } from '@core/context';

import { ActionsForm, formValidationAction, handleSubmitAction, initialValuesAction } from '@module/process-maker/features/forms';
import { AppModal, AppButton } from '@core/components';

export const AddActionsModall = () => {
  const { t } = useTranslation();

  return (
    // <AppModal size="4xl" title="Actioon Modal">
    <>
      <AppModal.Body>
        <FormProvider
          initialValues={initialValuesAction}
          validationSchema={formValidationAction}
          onSubmitAsync={async (values: any) => {
            handleSubmitAction(values);
          }}
        >
          <ActionsForm />
        </FormProvider>
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex flex-row justify-end gap-[30px]">
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
        </div>
      </AppModal.Footer>
    </>
    // </AppModal>
  );
};
