import { useTranslation } from 'react-i18next';
import { FormProvider, useAuth } from 'core';
import { ResetPasswordForm } from './forms';
import { SSOBaseLayout } from '../../layouts';
import * as Yup from 'yup';

import { useResetPasswordCheckOtpMutation } from './apis';

const ResetPassword = () => {
  const { t } = useTranslation();
  const { otp, mobile } = useAuth();
  const [resetPassword] = useResetPasswordCheckOtpMutation();

  const initialValuesForm = {
    UsernameOrMobile: '',
    GuidCode: '',
    Password: '',
    PasswordConfirm: '',
  };

  const formValidationError = () => {
    Yup.object({
      Password: Yup.string().required(t('phone_number_is_required')),
      PasswordConfirm: Yup.string().required(t('phone_number_is_required')),
    });
  };

  const handleFormSubmit = (values: any) => {
    return {
      UsernameOrMobile: mobile,
      GuidCode: otp,
      Password: values.Password,
      PasswordConfirm: values.PasswordConfirm,
    };
  };

  return (
    <SSOBaseLayout
      props={{
        arrowBack: true,
        formTitle: t('enter_new_password'),
        signInWithPhone: true,
        children: (
          <FormProvider
            initialValues={initialValuesForm}
            validationSchema={formValidationError}
            onSubmitAsync={async (values) => {
              await resetPassword(handleFormSubmit(values)).unwrap();
            }}
          >
            <ResetPasswordForm />
          </FormProvider>
        ),
      }}
    />
  );
};

export default ResetPassword;
