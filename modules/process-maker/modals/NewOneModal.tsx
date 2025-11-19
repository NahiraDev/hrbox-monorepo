import { useTranslation } from 'react-i18next';

import { AppModal, AppButton } from '@UIKit/components';
import { FormProvider } from '@core/providers/FormProvider'
import { formValidationNewOne, handleSubmitNewOne, initialValuesNewOne, NewOneForm } from '@modules/process-maker/forms';

export const NewOneModal = () => {
  const { t } = useTranslation();

  return (
    <>
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
    </>
  );
};
