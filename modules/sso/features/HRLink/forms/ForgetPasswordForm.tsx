import { AppButton, AppInput } from 'core';
import { Form } from '@heroui/react';
import { useFormContext } from 'core';
import { useTranslation } from 'react-i18next';

const ForgetPasswordForm = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    formError,
  } = useFormContext<{ UsernameOrMobile: string }>();
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
              label: t('user_name'),
              required: true,
              error: touched.UsernameOrMobile
                ? errors.UsernameOrMobile
                : undefined,
              name: 'UsernameOrMobile',
              onChange: handleChange,
              onBlur: handleBlur,
              type: 'text',
              value: values.UsernameOrMobile,
            }}
          />
        </div>
      </div>
      <AppButton
        props={{
          text: t('sign_in'),
          className: '!py-4 h-14',
          fullWidth: true,
          type: 'submit',
          variant: 'primary',
          isLoading: isSubmitting,
        }}
      />
      {formError && <div className="text-red-500 text-sm">{formError}</div>}
    </Form>
  );
};

export default ForgetPasswordForm;
