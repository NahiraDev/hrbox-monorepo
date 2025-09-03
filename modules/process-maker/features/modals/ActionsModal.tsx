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
              className: 'bg-[rgba(0,0,0,0)] ',
              text: t('cancel'),
            }}
          />
          <AppButton
            props={{
              className: 'px-[12px] py-[6px] gap-[6px] bg-[#0A9AD7] dark:bg-[#0D4D6A] rounded-[8px] text-white ',
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
