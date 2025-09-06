import { useTranslation } from 'react-i18next';
import { FormProvider } from 'core/context';

import { ActionsForm, formValidationAction, handleSubmitAction, initialValuesAction } from '../forms';
import { AppModal, AppButton, withModal, useModal } from '../../../../core';

const AddActionsModall = () => {
  const { t } = useTranslation();

  return (
    <AppModal size="4xl" title="Actioon Modal">
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
              text: t('cancel'),
            }}
          />
          <AppButton
            props={{
              type: 'submit',
              text: t('submit'),
            }}
          />
        </div>
      </AppModal.Footer>
    </AppModal>
  );
};

AddActionsModall.useModal = () => useModal();
export default withModal(AddActionsModall);
