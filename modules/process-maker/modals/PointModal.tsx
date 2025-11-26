import { useTranslation } from 'react-i18next';

import { FormProvider } from '@hrbox/core/providers/FormProvider'
import { formValidationPoint, handleSubmitPoint, initialValuesPoint, PointForm } from '@hrbox/modules/process-maker/forms';

export const PointModal = () => {
  const { t } = useTranslation();

  return (
      <FormProvider
          formId={"point-form"}
          initialValues={initialValuesPoint}
          validationSchema={formValidationPoint}
          onSubmitAsync={async (value: any) => {
              handleSubmitPoint(value);
          }}
      >
          <PointForm />
      </FormProvider>
  );
};
