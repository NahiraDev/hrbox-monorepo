import { useTranslation } from 'react-i18next';
import { FormProvider, useAuth } from '@core/context';
import { ResetPasswordForm } from '@module/sso/features/HRLink/forms';
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
    <FormProvider
      initialValues={initialValuesForm}
      validationSchema={formValidationError}
      onSubmitAsync={async (values) => {
        await resetPassword(handleFormSubmit(values)).unwrap();
      }}
    >
      <ResetPasswordForm />
    </FormProvider>
  );
};

export default ResetPassword;
