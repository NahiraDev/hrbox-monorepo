import * as Yup from 'yup';
import { FormProvider } from '@hrbox/core/providers/FormProvider';
import { useTranslation } from 'react-i18next';

import { RegisterForm } from '../forms';
import { useRegisterUserMutation } from '../apis/Auth';

const Register = () => {
  const { t } = useTranslation();
  const [register] = useRegisterUserMutation();

  const initialValuesForm = {
    FirstName: '',
    lastName: '',
    Mobile: '',
    Email: '',
    NationalCode: '',
    Password: '',
  };

  const formValidationError = () => {
    Yup.object({
      FirstName: Yup.string().required('First Name is required'),
      LastName: Yup.string().required('Last Name is required'),
      Email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      NationalCode: Yup.string().required('National Code is required'),
      Mobile: Yup.string().required('Mobile is required'),
      Password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    });
  };

  const handleFormSubmit = (values: any) => {
    return {
      FirstName: values.FirstName,
      LastName: values.LastName,
      Email: values.Email,
      Mobile: values.Mobile,
      NationalCode: values.NationalCode,
      Password: values.Password,
    };
  };

  return (
    <FormProvider
      formId='register-form'
      initialValues={initialValuesForm}
      validationSchema={formValidationError}
      onSubmitAsync={async (values) => {
        await register(handleFormSubmit(values)).unwrap();
      }}
    >
      <RegisterForm />
    </FormProvider>
  );
};

export default Register;
