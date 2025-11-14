import {FormProvider} from '@hrbox/core/providers/FormProvider';

import {initialValuesRegister, RegisterForm, validationSchemaRegister} from '../forms';
import {useRegisterMutation} from "@hrbox-monorepo/modules/sso/apis/Auth";

const Register = () => {
  const [register] = useRegisterMutation();

  const handleFormSubmit = (values: any) => {
    const { PasswordConfirm, ClientOtpCode, ...dataToSend } = values;

    return {
      FirstName: dataToSend.FirstName,
      LastName: dataToSend.LastName,
      Email: dataToSend.Email,
      Mobile: dataToSend.Mobile,
      NationalCode: dataToSend.NationalCode,
      Password: dataToSend.Password,
    };
  };

  return (
      <FormProvider
          formId='register-form'
          initialValues={initialValuesRegister}
          validationSchema={validationSchemaRegister}
          onSubmitAsync={async (values) => {
            return await register(handleFormSubmit(values)).unwrap();
          }}
      >
        <RegisterForm />
      </FormProvider>
  );
};

export default Register;