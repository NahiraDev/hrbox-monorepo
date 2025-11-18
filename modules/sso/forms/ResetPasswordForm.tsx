import { AppButton, AppInput } from '@hrbox/uikit/components';
import { Form } from '@heroui/react';
import { useFormContext } from '@hrbox/core/providers/FormProvider';
import { useTranslation } from 'react-i18next';
import {FormField} from "@hrbox/uikit/components/FormField";

export const ResetPasswordForm = () => {
  const {
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
      className="w-full flex flex-col gap-6"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-1">
          <FormField
            required={true}
            label={t('password')}
            name='Password'
            helperText={touched.UsernameOrMobile ? errors.Password : undefined}
          />
        </div>
        <div className="flex flex-col gap-1">
          <FormField
            label={t('password_confirmation')}
            name={'PasswordConfirm'}
            helperText={touched.PasswordConfirm
            ? errors.PasswordConfirm
            : undefined}
          />
        </div>
      </div>
      <div className="w-full pb-36">
        <AppButton
          content={t('Submit')}
          className='!font-semibold !py-4 h-14'
          fullWidth={true}
          size='lg'
          type='submit'
          color='primary'
          isLoading={isSubmitting}
        />
      </div>
      {formError && <div className="text-red-500 text-sm">{formError}</div>}
    </Form>
  );
};
