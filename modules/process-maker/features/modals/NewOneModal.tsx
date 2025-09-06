import { useTranslation } from 'react-i18next';
import { useModal } from '@heroui/react';

import { withModal } from '../../../../core';
import { AppModal, AppButton, FormProvider } from '../../../../core/';
import { formValidationNewOne, handleSubmitNewOne, initialValuesNewOne, NewOneForm } from '../forms';

const NewOneModal = () => {
  const { t } = useTranslation();

  return (
    <AppModal size="4xl" title="New One Modal">
      <AppModal.Body>
        <FormProvider
          initialValues={initialValuesNewOne}
          validationSchema={formValidationNewOne}
          onSubmitAsync={async (values: any) => {
            handleSubmitNewOne(values);
          }}
        >
          <NewOneForm />
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
              type: 'Submit',
              text: t(`submit`),
            }}
          />{' '}
        </div>
      </AppModal.Footer>
    </AppModal>
  );
};

NewOneModal.useModal = () => useModal();
export default withModal(NewOneModal);
