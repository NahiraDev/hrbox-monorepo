import { FormProvider } from '../../../../core';

import { formValidationErrorLogin, initialValuesFormLogin, LoginForm } from './forms';
import { useLoginMutation } from './apis';
import { handleSubmitLogin } from './forms';

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
