import * as Yup from 'yup';
import { FormProvider } from '../../../../core';
import { useTranslation } from 'react-i18next';

import { SSOBaseLayout } from '../../layouts/SSOBaseLayout';

import { LoginForm } from './forms';
import { useLoginMutation } from './apis';

const Login = () => {
  const { t } = useTranslation();
  const [login] = useLoginMutation();
  const initialValuesForm = {
    Username: '',
    Password: '',
  };

  const formValidationError = Yup.object().shape({
    Username: Yup.string().required(t('username_is_required')),
    Password: Yup.string().required(t('password_is_required')),
  });

  const handleFormSubmit = (values: any) => {
    return {
      UserName: values.UserName,
      Password: values.Password,
    };
  };

  return (
    <SSOBaseLayout
      props={{
        formTitle: 'login_title',
        signInWithPhone: true,
        children: (
          <FormProvider
            initialValues={initialValuesForm}
            validationSchema={formValidationError}
            onSubmitAsync={async (values: any) => {
              await login(handleFormSubmit(values)).unwrap();
            }}
          >
            <LoginForm />
          </FormProvider>
        ),
      }}
    />
  );
};

export default Login;
