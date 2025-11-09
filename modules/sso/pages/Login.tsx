import { FormProvider } from '@hrbox/core/providers/FormProvider';

import {
  formValidationErrorLogin,
  initialValuesFormLogin,
  LoginForm,
} from '@module/sso/forms';
import { useLoginMutation } from '@module/sso/apis/Auth';
import { useNavigation } from "@hrbox/core/hooks/useNavigation";

const Login = () => {
  const { push } = useNavigation();
  const [login] = useLoginMutation();

  const handleLogin = async (values: any) => {
    try {
      const result = await login(values).unwrap();

      push({to:'/hrlink/dashboard'});
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