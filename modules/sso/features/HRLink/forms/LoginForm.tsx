import { Form } from '@heroui/react';
import { Eye, EyeSlash } from 'iconsax-react';
import { Link } from '@heroui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';

import { useFormContext } from '@core/context';
import { AppButton, AppSwitch, AppInput } from '@core/components';
import { SSOHRLinkPaths } from '@module/sso/app/paths';

export const initialValuesFormLogin = {
  Username: '',
  Password: '',
};

export const formValidationErrorLogin = Yup.object().shape({
  Username: Yup.string().required(t('username_is_required')),
  Password: Yup.string().required(t('password_is_required')),
});

export const handleSubmitLogin = (values: any) => {
  return {
    Username: values.Username,
    Password: values.Password,
  };
};

export const LoginForm = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = useFormContext();

  const { t } = useTranslation();
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleVisibilityPassword = () => setIsVisiblePassword(!isVisiblePassword);

  const handleChangeRemember = () => {
    setIsSelected(!isSelected);
  };

  return (
    <Form className="w-full max-w-xs flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 w-full text-xl">
        <div className="flex flex-col gap-1">
          <AppInput
            props={{
              label: t('user_name'),
              name: 'Username',
              value: values.Username,
              onChange: handleChange,
              onBlur: handleBlur,
              error: touched.Username && errors.Username,
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <AppInput
            props={{
              label: t('user_password'),
              name: 'Password',
              type: isVisiblePassword ? 'text' : 'password',
              value: values.Password,
              onChange: handleChange,
              onBlur: handleBlur,
              error: touched.Password && errors.Password,
              endContent: (
                <AppButton
                  props={{
                    onPress: () => toggleVisibilityPassword(),
                    content: isVisiblePassword ? (
                      <Eye className="text-secondary-1000 dark:text-white" size="20" />
                    ) : (
                      <EyeSlash className="text-secondary-1000 dark:text-white" size="20" />
                    ),
                  }}
                />
              ),
            }}
          />
          <div className="flex justify-between w-full">
            <AppSwitch
              props={{
                isSelected,
                handleChangeRemember,
                text: t('remember_me'),
              }}
            />
            <Link
              className="text-secondary-400 dark:text-white font-semibold text-xs cursor-pointer"
              onPress={() => navigate(SSOHRLinkPaths.forgetPassword)}
            >
              {t('forgot_password')}
            </Link>
          </div>
        </div>
      </div>
      <AppButton
        props={{
          content: t('sign_in'),
          size: 'lg',
          fullWidth: true,
          type: 'submit',
          variant: 'solid',
          color: 'info',
          isLoading: isSubmitting,
        }}
      />
    </Form>
  );
};
