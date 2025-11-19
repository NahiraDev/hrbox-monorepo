import { useTranslation } from 'react-i18next';
import { FormProvider } from '@hrbox/core/providers/FormProvider';

import { ActionsForm, formValidationAction, handleSubmitAction, initialValuesAction } from '@hrbox/modules/process-maker/forms';

export const AddActionsModall = () => {
  const { t } = useTranslation();

  return (
      <FormProvider
          formId="action-form"
          initialValues={initialValuesAction}
          validationSchema={formValidationAction}
          onSubmitAsync={async (values: any) => {
              handleSubmitAction(values);
          }}
      >
          <ActionsForm />
      </FormProvider>
  );
};
