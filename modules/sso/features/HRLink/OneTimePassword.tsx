import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { FormProvider, useAuth } from '../../../../core';

import { SSOBaseLayout } from '../../layouts';

import { OneTimePasswordForm } from './forms';
import {
  useLoginByOtpMutation,
  useRegisterOtpConfirmMutation,
  useResetPasswordCheckOtpMutation,
} from './apis';

const OneTimePassword = () => {
  const { t } = useTranslation();
  const [resetPassword] = useResetPasswordCheckOtpMutation();
  const [loginByOtp] = useLoginByOtpMutation();
  const [registerByOtp] = useRegisterOtpConfirmMutation();
  const { authType, mobile } = useAuth();
  const initialValuesForm = {
    UsernameOrMobile: '',
    ClientOtpCode: '',
    Mobile: '',
  };

  const formValidationError = () => {
    Yup.object({
      ClientOtpCode: Yup.string().required(t('otp_is_required')),
    });
  };

  const handleFormSubmit = (values: any) => {
    if (authType === 'login' || authType === 'register') {
      return {
        UsernameOrMobile: mobile,
        ClientOtpCode: values.ClientOtpCode,
      };
    } else {
      return {
        Mobile: mobile,
        ClientOtpCode: values.ClientOtpCode,
      };
    }
  };

  return (
    <SSOBaseLayout
      props={{
        formTitle: t('please_enter_the_code_sent_your_phone_number'),
        arrowBack: true,
        signInWithPhone: true,
        children: (
          <FormProvider
            initialValues={initialValuesForm}
            validationSchema={formValidationError}
            onSubmitAsync={async (values: any) => {
              const payload: any = handleFormSubmit(values);

              if (authType === 'forgetPassword') {
                await resetPassword(payload).unwrap();
              } else if (authType === 'register') {
                await registerByOtp(payload).unwrap();
              } else {
                await loginByOtp(payload).unwrap();
              }
            }}
          >
            <OneTimePasswordForm />
          </FormProvider>
        ),
      }}
    />
  );
};

export default OneTimePassword;
