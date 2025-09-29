import { FormProvider } from '@core/context';

import { handleSubmitLoginByOtp, initialValuesLoginByOtp, LoginByOtpForm, validationErrorLoginByOtp } from '@module/sso/features/HRLink/forms';
import { useSendOtpMutation } from '@module/sso/features/HRLink/apis';

const LoginByOtp = () => {
  const [sendCode] = useSendOtpMutation();

  return (
    <FormProvider
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
