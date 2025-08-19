import { FormProvider, useAuth } from 'core';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { SSOBaseLayout } from '../../layouts';

import { LoginByOtpForm } from './forms';
import { useSendOtpMutation } from './apis';

const LoginByOtp = () => {
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
    setAuthType('login');

    return {
      UsernameOrMobile: values.UsernameOrMobile,
    };
  };

  return (
    <SSOBaseLayout
      props={{
        formTitle: t('login_with_phone_number'),
        arrowBack: true,
        children: (
          <FormProvider
            initialValues={initialValuesForm}
            validationSchema={formValidationError}
            onSubmitAsync={async (values: any) => {
              await sendCode(handleFormSubmit(values)).unwrap();
            }}
          >
            <LoginByOtpForm />
          </FormProvider>
        ),
      }}
    />
  );
};

export default LoginByOtp;
