import { AppButton, AppInput } from 'core';
import { Form } from '@heroui/react';
import { useFormContext } from 'core';
import { useTranslation } from 'react-i18next';

const ResetPasswordForm = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    formError,
  } = useFormContext<{
    UsernameOrMobile: string;
    GuidCode: string;
    Password: string;
    PasswordConfirm: string;
  }>();
  const { t } = useTranslation();

  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-6"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-1">
          <AppInput
            props={{
              required: true,
              label: t('password'),
              name: 'Password',
              error: touched.UsernameOrMobile ? errors.Password : undefined,
              value: values.Password,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <AppInput
            props={{
              required: true,
              label: t('password_confirmation'),
              name: 'PasswordConfirm',
              error: touched.PasswordConfirm
                ? errors.PasswordConfirm
                : undefined,
              value: values.PasswordConfirm,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </div>
      </div>
      <div className="w-full pb-36">
        <AppButton
          props={{
            text: t('Submit'),
            className: '!font-semibold !py-4 h-14',
            fullWidth: true,
            size: 'lg',
            type: 'submit',
            variant: 'primary',
            isLoading: isSubmitting,
          }}
        />
      </div>
      {formError && <div className="text-red-500 text-sm">{formError}</div>}
    </Form>
  );
};

export default ResetPasswordForm;
