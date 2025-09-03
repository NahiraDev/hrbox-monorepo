import { useTranslation } from 'react-i18next';

import { AppModal, AppButton, FormProvider, withModal, useModal } from '../../../../core/';
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
              className: 'bg-[rgba(0,0,0,0)] ',
              text: t('cancel'),
            }}
          />
          <AppButton
            props={{
              className: 'px-[12px] py-[6px] bg-[#0A9AD7] dark:bg-[#0D4D6A] rounded-[8px] text-white ',
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
