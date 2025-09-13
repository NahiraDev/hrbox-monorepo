import { FormProvider } from '../../../../core';

import { handleSubmitLoginByOtp, initialValuesLoginByOtp, LoginByOtpForm, validationErrorLoginByOtp } from './forms';
import { useSendOtpMutation } from './apis';

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
