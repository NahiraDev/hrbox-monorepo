import { useTranslation } from 'react-i18next';

import { EventAddForm } from '@modules/process-maker/forms';
import { AppModal, AppButton } from '@UIKit/components';
import { FormProvider } from '@core/providers/FormProvider'
import { formValidationEventAdd, handleSubmitEventAdd, initialValuesEventAdd } from '@modules/process-maker/forms';

export const NewEventModal = () => {
  const { t } = useTranslation();

  return (
    // <AppModal size="4xl" title="AddEvent Modal">
    <>
      <AppModal.Body>
        <FormProvider
          initialValues={initialValuesEventAdd}
          validationSchema={formValidationEventAdd}
          onSubmitAsync={async (values: any) => {
            handleSubmitEventAdd(values);
          }}
        >
          <EventAddForm/>
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
