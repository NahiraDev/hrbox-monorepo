import { FormProvider } from '@core/context';

import { handleSubmitLoginByOtp, initialValuesLoginByOtp, LoginByOtpForm, validationErrorLoginByOtp } from '@module/sso/features/forms';
import { useSendOtpMutation } from '@module/sso/features/apis';

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
