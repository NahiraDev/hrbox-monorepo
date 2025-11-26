import { useTranslation } from 'react-i18next';

import { EventAddForm } from '@hrbox/modules/process-maker/forms';
import { AppModal, AppButton } from '@hrbox/uikit/components';
import { FormProvider } from '@hrbox/core/providers/FormProvider'
import { formValidationEventAdd, handleSubmitEventAdd, initialValuesEventAdd } from '@hrbox/modules/process-maker/forms';

export const NewEventModal = () => {
  const { t } = useTranslation();

  return (
      <FormProvider
          formId={"point-form"}
          initialValues={initialValuesEventAdd}
          validationSchema={formValidationEventAdd}
          onSubmitAsync={async (values: any) => {
              handleSubmitEventAdd(values);
          }}
      >
          <EventAddForm/>
      </FormProvider>
  );
};
