import { FormProvider } from '@hrbox/core/providers/FormProvider';

import {
  formValidationErrorLogin,
  initialValuesFormLogin,
  LoginForm,
} from '@module/sso/forms';
import { useLoginMutation } from '@module/sso/apis/Auth'

const Login = () => {
  const [login] = useLoginMutation();

  const handleLogin = async (values: any) => {
    try {
     await login(values).unwrap();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  return (
    <FormProvider
      formId="login-form"
      initialValues={initialValuesFormLogin}
      validationSchema={formValidationErrorLogin}
      enableCache={true}
      clearCacheOnSubmit={true}
      onSubmitAsync={handleLogin}
    >
      <LoginForm />
    </FormProvider>
  );
};

export default Login;