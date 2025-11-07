import { FormProvider } from '@core/context';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  formValidationErrorLogin,
  initialValuesFormLogin,
  LoginForm,
  handleSubmitLogin
} from '@module/sso/features/forms';
import { useLoginMutation } from '@module/sso/features/apis';
import { setCredentials } from '@core/redux/reducers/authSlice';
import { AppButton } from '@core/components';
import { setLanguage, setLocalLanguage } from '@core/redux';
import { i18n } from '@core/translate';

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values: any) => {
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
  };

  const toggleLanguage = (language: string, local: string) => {
    dispatch(setLanguage(language));
    dispatch(setLocalLanguage(local));
    i18n.changeLanguage(language);
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