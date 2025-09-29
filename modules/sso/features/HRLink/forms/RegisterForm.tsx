import { AppButton, AppInput } from '@core/components';
import { Form } from '@heroui/react';
import { Eye, EyeSlash } from 'iconsax-react';
import { useFormContext } from '@core/context';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export const RegisterForm = () => {
  const {
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormContext<{
    FirstName: string;
    LastName: string;
    Email: string;
    Mobile: string;
    NationalCode: string;
    Password: string;
  }>();
  const { t } = useTranslation();
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

  const toggleVisibilityPassword = () =>
    setIsVisiblePassword(!isVisiblePassword);

  return (
    <Form className="w-full flex flex-col gap-12" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 w-full">
        <div className="grid xl:grid-cols-2 xl:gap-10 gap-2">
          <div className="flex flex-col gap-1">
            <AppInput
              props={{
                required: true,
                label: t('first_name'),
                name: 'FirstName',
                error: touched.FirstName ? errors.FirstName : undefined,
                onChange: handleChange,
                onBlur: handleBlur,
              }}
            />
          </div>
        </div>
        <div className="grid xl:grid-cols-2 xl:gap-10 gap-2">
          <div className="flex flex-col gap-1">
            <AppInput
              props={{
                required: true,
                label: t('last_name'),
                name: 'LastName',
                error: touched.LastName ? errors.LastName : undefined,
                onChange: handleChange,
                onBlur: handleBlur,
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <AppInput
              props={{
                required: true,
                label: t('email'),
                name: 'Email',
                error: touched.Email ? errors.Email : undefined,
                onChange: handleChange,
                onBlur: handleBlur,
              }}
            />
          </div>
        </div>
        <div className="grid xl:grid-cols-2 xl:gap-10 gap-2">
          <div className="flex flex-col gap-1">
            <AppInput
              props={{
                required: true,
                label: t('phone'),
                name: 'Mobile',
                error: touched.Mobile ? errors.Mobile : undefined,
                onChange: handleChange,
                onBlur: handleBlur,
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <AppInput
              props={{
                label: t('national_code'),
                name: 'NationalCode',
                error: touched.NationalCode ? errors.NationalCode : undefined,
                onChange: handleChange,
                onBlur: handleBlur,
              }}
            />
          </div>
        </div>
        <div className="grid xl:grid-cols-2 xl:gap-10 gap-2">
          <div className="flex flex-col gap-1">
            <AppInput
              props={{
                label: t('password'),
                error: touched.Password ? errors.Password : undefined,
                type: isVisiblePassword ? 'text' : 'password',
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
          </div>
        </div>
      </div>
      <AppButton
        props={{
          className: `font-semibold h-14 !py-4 lg:!w-[320px]`,
          size: 'lg',
          type: 'submit',
          fullWidth: true,
          variant: 'primary',
          text: t('sign_up'),
          isSubmitting: isSubmitting,
        }}
      />
    </Form>
  );
};
