import { Form, Link } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { t } from 'i18next';


import { useFormContext } from '@hrbox/core/providers/FormProvider';
import { AppButton } from "@hrbox/uikit/components";
import { useNavigation } from "@hrbox/core/hooks/useNavigation";
import { FormField } from "@hrbox/uikit/components/FormField";

export const initialValuesFormLogin = {
  Username: '',
  Password: '',
};

export const formValidationErrorLogin = Yup.object().shape({
  Username: Yup.string().required(t('username_is_required')),
  Password: Yup.string().required(t('password_is_required')),
});

export const LoginForm = () => {
  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
  } = useFormContext();

  const { t } = useTranslation();
  const { push } = useNavigation();

  return (
    <div className="w-full">
      <Form
        className="w-full flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-4">
            <FormField name="Username" label={t('user_name')} helperText={touched.Username && errors.Username}/>
            <FormField name="Password" label={t('password')} helperText={touched.Password && errors.Password}/>
          </div>

            <div className="flex items-center justify-between w-full mt-2">
              <Link
                className="text-secondary-400 dark:text-white font-semibold text-xs cursor-pointer hover:underline transition-all"
                onPress={() => push({to:"/sso/forget-password"})}
              >
                {t('forgot_password')}
              </Link>
            </div>
          </div>

        {/* Submit Button */}
        <AppButton
          content={t('sign_in')}
          size="md"
          fullWidth={true}
          color="secondary"
          isLoading={isSubmitting}
        />

        <div className="flex items-center justify-center gap-3 w-full">
          <hr className="lg:w-[128px] w-full h-[1px] text-neutral-400" />
          <span className="text-neutral-400 dark:neutral-250 text-sm font-bold">
            {t('or')}
          </span>
          <hr className="lg:w-[128px] w-full h-[1px] text-neutral-400" />
        </div>

        <AppButton
          props={{
          content: (t('sign_in_with_phone_number')),
          size: 'lg',
          fullWidth: true,
          variant: 'light',
          startContent: <img src="/images/message.svg" alt="phone icon" />,
          className:
            ' px-4 py-3 justify-start bg-[radial-gradient(ellipse_135.8%_231%_at_0.9%_2.98%,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.1)_100%)] rounded-lg outline outline-1 outline-white/90 backdrop-blur-[20px] hover:bg-[radial-gradient(ellipse_135.8%_231%_at_0.9%_2.98%,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.1)_100%)]',
            }}
          />

          <AppButton
            content={(t('sign_in_with_google'))}
          props={{
          size: 'lg',
          fullWidth: true,
          variant: 'light',
          startContent: <img src="/images/Google%20Logo.svg" alt="phone icon" />,
          className:
            'gap-3 justify-start px-4 py-3 bg-[radial-gradient(ellipse_135.8%_231%_at_0.9%_2.98%,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.1)_100%)] rounded-lg outline outline-1 outline-white/90 backdrop-blur-[20px] hover:bg-[radial-gradient(ellipse_135.8%_231%_at_0.9%_2.98%,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.1)_100%)]',
          onPress: () => console.log('Sign in with phone number clicked!'),
            }}
          />

          <div className="flex items-center justify-center mt-6">
            <p className="text-sm text-gray-600 text-center">
              Do you have an account?{' '}
              <span
                className="text-[#1E3363] font-semibold cursor-pointer hover:underline"
                onClick={() => navigate('/signup')}
              >
                Sign up now
              </span>
            </p>
          </div>

      </Form>
    </div>
  );
};