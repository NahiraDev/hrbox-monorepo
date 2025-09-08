import { useTranslation } from 'react-i18next';

import { AppModal, AppButton, FormProvider } from '../../../../core/';
import { formValidationNewOne, handleSubmitNewOne, initialValuesNewOne, NewOneForm } from '../forms';

export const NewOneModal = () => {
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
    </AppModal>
  );
};
