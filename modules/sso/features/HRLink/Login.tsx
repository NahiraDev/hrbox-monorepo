import { FormProvider } from '@core/context';

import { formValidationErrorLogin, initialValuesFormLogin, LoginForm } from '@module/sso/features/HRLink/forms';
import { useLoginMutation } from '@module/sso/features/HRLink/apis';
import { handleSubmitLogin } from '@module/sso/features/HRLink/forms';

const Login = () => {
  const [login] = useLoginMutation();

  return (
    <FormProvider
      initialValues={initialValuesFormLogin}
      validationSchema={formValidationErrorLogin}
      onSubmitAsync={async (values: any) => {
        await login(handleSubmitLogin(values)).unwrap();
      }}
    >
      <LoginForm />
    </FormProvider>
  );
};

export default Login;
