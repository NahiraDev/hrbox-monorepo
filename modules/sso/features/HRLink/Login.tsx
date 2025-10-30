import { FormProvider } from '@core/context';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  formValidationErrorLogin,
  initialValuesFormLogin,
  LoginForm,
  handleSubmitLogin
} from '@module/sso/features/HRLink/forms';
import { useLoginMutation } from '@module/sso/features/HRLink/apis';
import { setCredentials } from '@core/redux/reducers/authSlice';

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <FormProvider
      formId="login-form"
      initialValues={initialValuesFormLogin}
      validationSchema={formValidationErrorLogin}
      enableCache={true}
      clearCacheOnSubmit={true}
      onSubmitAsync={async (values: any) => {
        try {
          const result = await login(handleSubmitLogin(values)).unwrap();

          dispatch(
            setCredentials({
              token: result.data.Token,
              refreshToken: result.data.renewalToken,
              user: result.data.userId,
            })
          );

          navigate('/hrlink/dashboard');
        } catch (error) {
          console.error('Login failed:', error);
        }
      }}
    >
      <LoginForm />
    </FormProvider>
  );
};

export default Login;
