import { useTranslation } from 'react-i18next';

import { AppButton, AppModal } from '@hrbox/uikit/components';
import { FormProvider } from '@hrbox/core/providers/FormProvider'
import { formValidationPoint, handleSubmitPoint, initialValuesPoint, PointForm } from '@module/process-maker/features/forms';

export const PointModal = () => {
  const { t } = useTranslation();

  return (
    // <AppModal icon={<Hierarchy3 />} size="4xl">
    <>
      <AppModal.Body>
        <FormProvider
          initialValues={initialValuesPoint}
          validationSchema={formValidationPoint}
          onSubmitAsync={async (value: any) => {
            handleSubmitPoint(value);
          }}
        >
          <PointForm />
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
