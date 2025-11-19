import { useTranslation } from 'react-i18next';

import { FormProvider } from '@hrbox/core/providers/FormProvider'
import { formValidationProcess, handleSubmitProcess, initialValuesProcess, ProcessForm } from '@hrbox/modules/process-maker/forms';

export const ProcessModal = () => {
  const { t } = useTranslation();

  return (
      <FormProvider
          formId={"process-form"}
          initialValues={initialValuesProcess}
          validationSchema={formValidationProcess}
          onSubmitAsync={async (values: any) => {
              handleSubmitProcess(values);
          }}
      >
          <ProcessForm />
      </FormProvider>
  );
};
