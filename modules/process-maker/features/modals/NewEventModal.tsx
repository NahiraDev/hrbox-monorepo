import { useTranslation } from 'react-i18next';

import { EventForm } from '../forms';
import { AppModal, AppButton, FormProvider } from '../../../../core';
import { formValidationEventAdd, handleSubmitEventAdd, initialValuesEventAdd } from '../forms';

export const NewEventModal = () => {
  const { t } = useTranslation();

  return (
    <AppModal size="4xl" title="AddEvent Modal">
      <AppModal.Body>
        <FormProvider
          initialValues={initialValuesEventAdd}
          validationSchema={formValidationEventAdd}
          onSubmitAsync={async (values: any) => {
            handleSubmitEventAdd(values);
          }}
        >
          <EventForm />
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
