import { Form } from '@heroui/react';
import { Eye, EyeSlash } from 'iconsax-react';
import { Link } from '@heroui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useFormContext } from '../../../../../core';
import { AppButton, AppSwitch, AppInput } from '../../../../../core';

const LoginForm = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    formError,
  } = useFormContext();
  const { t } = useTranslation();
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  // const navigate = useNavigate();

  const toggleVisibilityPassword = () =>
    setIsVisiblePassword(!isVisiblePassword);

  const handleChangeRemember = () => {
    setIsSelected(!isSelected);
  };

  const handleOpenForgetPassword = () => {
    // navigate(SSOHRLinkPaths.ForgetPassword);
  };

  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-6"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-4 w-full text-xl">
        <div className="flex flex-col gap-1">
          <AppInput
            props={{
              label: t('user_name'),
              required: true,
              error: touched.Username ? errors.Username : undefined,
              name: 'Username',
              onChange: handleChange,
              onBlur: handleBlur,
              type: 'text',
              value: values.Username,
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <AppInput
            props={{
              label: t('user_password'),
              required: true,
              error: touched.Password ? errors.Password : undefined,
              name: 'Password',
              type: isVisiblePassword ? 'text' : 'password',
              value: values.Password,
              onChange: handleChange,
              onBlur: handleBlur,
              endContent: (
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibilityPassword}
                >
                  {isVisiblePassword ? (
                    <Eye
                      className="text-secondary-1000 dark:text-white"
                      size="20"
                    />
                  ) : (
                    <EyeSlash
                      className="text-secondary-1000 dark:text-white"
                      size="20"
                    />
                  )}
                </button>
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
              onPress={() => handleOpenForgetPassword()}
            >
              {t('forgot_password')}
            </Link>
          </div>
        </div>
      </div>
      <AppButton
        props={{
          text: t('sign_in'),
          size: 'lg',
          fullWidth: true,
          type: 'submit',
          variant: 'solid',
          color: 'navy_blue',
          isLoading: isSubmitting,
        }}
      />
      {formError && <div className="text-red-500 text-sm">{formError}</div>}
    </Form>
  );
};

export default LoginForm;
