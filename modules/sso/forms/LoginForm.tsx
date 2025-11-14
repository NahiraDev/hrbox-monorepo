import { Form, Link } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { t } from 'i18next';

import { useFormContext } from '@hrbox/core/providers/FormProvider';
import {AppButton, AppSwitch} from "@hrbox/uikit/components";
import { useNavigation } from "@hrbox/core/hooks/useNavigation";
import { FormField } from "@hrbox/uikit/components/FormField";
import {Paths} from "@hrbox-monorepo/modules/paths";
import {useState} from "react";
import {LoginButton} from "@hrbox-monorepo/modules/sso/components/LoginButton";

export const initialValuesFormLogin = {
  Username: '',
  Password: '',
};

export const formValidationErrorLogin = Yup.object().shape({
  Username: Yup.string().required(t('username_is_required')),
  Password: Yup.string().required(t('password_is_required')),
});

export const LoginForm = () => {
  const { errors, touched, handleSubmit, isSubmitting, setSubmitting, setErrors } = useFormContext();
  const { t } = useTranslation();
  const { push } = useNavigation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="w-full">
      <Form
        className="w-full flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-7">
            <FormField name="Username" label={t('user_name')} helperText={touched.Username && errors.Username}/>
            <FormField name="Password" label={t('password')} helperText={touched.Password && errors.Password}
                       type={showPassword ? "text" : "password"}
                       endContent={<button
                           type="button"
                           className="text-gray-500 hover:text-gray-700"
                           onClick={() => setShowPassword(!showPassword)}
                       >
                         {showPassword ? (
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                     d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                             </svg>
                         ) : (
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                     d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                             </svg>
                         )}
                       </button>}
            />
          </div>

          <div className="flex items-center justify-between w-full">
            <AppSwitch label="Remember me"/>
            <Link
              className="text-secondary-400 dark:text-white font-semibold text-xs cursor-pointer hover:underline transition-all"
              onPress={() => push({to:"/sso/forget-password"})}
            >
              {t('forgot_password')}
            </Link>
          </div>
        </div>

        <AppButton
          type="submit"
          content={t('sign_in')}
          size="xl"
          radius="xl"
          fullWidth={true}
          color="secondary"
          isLoading={isSubmitting}
        />

       <div className="w-full flex flex-col gap-2">
         <LoginButton/>
       </div>

        <div className="flex items-center justify-center mt-4">
          <p className="text-xs text-[#1A1A1A] text-center">
            Do you have an account?
            <span
              className="text-[#0B76B7] font-medium cursor-pointer text-xs hover:underline"
              onClick={() => push({to:'/sso/register'})}
            >
              Sign up now
            </span>
          </p>
        </div>
      </Form>
    </div>
  );
};