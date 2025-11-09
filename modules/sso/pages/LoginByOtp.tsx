import { FormProvider } from '@hrbox/core/providers/FormProvider';

import { handleSubmitLoginByOtp, initialValuesLoginByOtp, LoginByOtpForm, validationErrorLoginByOtp } from '@module/sso/forms';
import { useSendOtpMutation } from '@module/sso/apis/Auth';

const LoginByOtp = () => {
  const [sendCode] = useSendOtpMutation();

  return (
    <FormProvider
      formId='login-by-otp'
      initialValues={initialValuesLoginByOtp}
      validationSchema={validationErrorLoginByOtp}
      onSubmitAsync={async (values: any) => {
        await sendCode(handleSubmitLoginByOtp(values)).unwrap();
      }}
    >
      <LoginByOtpForm />
    </FormProvider>
  );
};

export default LoginByOtp;
