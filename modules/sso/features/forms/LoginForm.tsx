import { Form, Link } from '@heroui/react';
import { Eye, EyeSlash } from 'iconsax-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { t } from 'i18next';

import { useFormContext } from '@core/context';
import { AppButton, AppSwitch, AppInput } from '@core/components';
import { SSOHRLinkPaths } from '@module/sso/app/paths';

// ============================================
// Form Configuration
// ============================================
export const initialValuesFormLogin = {
  Username: '',
  Password: '',
};

export const formValidationErrorLogin = Yup.object().shape({
  Username: Yup.string().required(t('username_is_required')),
  Password: Yup.string().required(t('password_is_required')),
});

export const handleSubmitLogin = (values: any) => ({
  Username: values.Username,
  Password: values.Password,
});

// ============================================
// LoginForm Component
// ============================================
export const LoginForm = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormContext();

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => setIsVisiblePassword(prev => !prev);
  const toggleRememberMe = () => setRememberMe(prev => !prev);

  return (
    <div className="w-full">
      <Form
        className="w-full flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        {/* Form Fields */}
        <div className="flex flex-col gap-4 w-full">

          {/* Username Input */}
          <div className="flex flex-col gap-1 w-full">
            <AppInput
              props={{
                label: t('user_name'),
                name: 'Username',
                variant: 'light',
                value: values.Username,
                onChange: handleChange,
                onBlur: handleBlur,
                error: touched.Username && errors.Username,
              }}
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1 w-full">
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
                      onPress: togglePasswordVisibility,
                      variant:'light',
                      content: isVisiblePassword ? (
                        <Eye
                          size="20"
                        />
                      ) : (
                        <EyeSlash
                          size="20"
                        />
                      ),
                    }}
                  />
                ),
              }}
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between w-full mt-2">
              {/*<AppSwitch*/}
              {/*  props={{*/}
              {/*    isSelected: rememberMe,*/}
              {/*    handleChangeRemember: toggleRememberMe,*/}
              {/*    text: t('remember_me'),*/}
              {/*  }}*/}
              {/*/>*/}

              <Link
                className="text-secondary-400 dark:text-white font-semibold text-xs cursor-pointer hover:underline transition-all"
                onPress={() => navigate(SSOHRLinkPaths.forgetPassword)}
              >
                {t('forgot_password')}
              </Link>
            </div>
          </div>
        </div>

        {/* Submit Button */}
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
    </div>
  );
};
