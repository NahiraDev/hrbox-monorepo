import { FormProvider, useAuth } from '@hrbox/core';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import { useSendOtpMutation } from '@module/sso/apis/Auth';
import { ForgetPasswordForm } from '@module/sso/forms/ForgetPasswordForm';

const ForgetPassword = () => {
  const { t } = useTranslation();
  const { setAuthType } = useAuth();
  const [sendCode] = useSendOtpMutation();

  const initialValuesForm = {
    UsernameOrMobile: '',
  };

  const formValidationError = () => {
    Yup.object({
      UsernameOrMobile: Yup.string().required(t('phone_number_is_required')),
    });
  };

  const handleFormSubmit = (values: any) => {
    setAuthType('forgetPassword');

    return {
      UsernameOrMobile: values.UsernameOrMobile,
    };
  };

  return (
    <FormProvider
      initialValues={initialValuesForm}
      validationSchema={formValidationError}
      onSubmitAsync={async (values: any) => {
        await sendCode(handleFormSubmit(values)).unwrap();
      }}
    >
      <ForgetPasswordForm />
    </FormProvider>
  );
};

export default ForgetPassword;
