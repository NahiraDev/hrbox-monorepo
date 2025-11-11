import { FormProvider, useAuth } from '@hrbox/core';

import { OneTimePasswordForm } from '@module/sso/forms';
import {
  useLoginByOtpMutation,
  useRegisterOtpConfirmMutation,
  useResetPasswordCheckOtpMutation,
} from '@module/sso/apis/Auth';

const OneTimePassword = () => {
  const [resetPassword] = useResetPasswordCheckOtpMutation();
  const [loginByOtp] = useLoginByOtpMutation();
  const [registerByOtp] = useRegisterOtpConfirmMutation();
  const { authType } = useAuth();

  return (
    <FormProvider
      initialValues={initialValues}
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
  );
};

export default OneTimePassword;
