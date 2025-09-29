import { CallCalling, Profile, Sms } from 'iconsax-react';
import { AppButton, AppInput } from '@core/components';
import { useTranslation } from 'react-i18next';
import { useFormContext } from '@core/context';
import { Form } from '@heroui/react';
import * as Yup from 'yup';


export const validationErrorEditProfile = Yup.object().shape({
  FirstName: Yup.string(),
  LastName: Yup.string(),
  Email: Yup.string(),
  LinkedinId: Yup.string(),
  InstagramId: Yup.string(),
  UrlOrTheOtherSocialMedia: Yup.string(),
  Description: Yup.string(),
  Phone: Yup.string(),
});

export const initialValuesEditProfile = {
  FirstName: '',
  LastName: '',
  Email: '',
  LinkedinId: '',
  InstagramId: '',
  UrlOrTheOtherSocialMedia: '',
  Description: '',
  Phone: '',
};

export const handleSubmitEditProfile = (values: any) => {
  return {
    UserName: values.UserName,
    Password: values.Password,
    Email: values.UserName,
    LinkedinId: values.Password,
    InstagramId: values.UserName,
    UrlOrTheOtherSocialMedia: values.Password,
    Description: values.UserName,
    Phone: values.Password,
  };
};

export const EditProfileForm = ({
  showSubmitButton,
}: {
  showSubmitButton: boolean;
}) => {
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

  return (
    <Form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-[30px]">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <Profile className="text-[#292D32]" size="12" />
              <span className="text-xs text-secondary-1000">
                {t('first_name')}
              </span>
            </div>
            <AppInput
              props={{
                label: 'FirstName',
                name: 'FirstName',
                error: touched.FirstName && errors.FirstName,
                onChange: handleChange,
                onBlur: handleBlur,
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <Profile className="text-[#292D32]" size="12" />
              <span className="text-xs text-secondary-1000">
                {t('last_name')}
              </span>
            </div>
            <AppInput
              props={{
                label: 'LastName',
                name: 'LastName',
                error: touched.LastName && errors.LastName,
                onChange: handleChange,
                onBlur: handleBlur,
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[30px]">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <Sms className="text-[#292D32]" size="12" />
              <span className="text-xs text-secondary-1000">{t('email')}</span>
            </div>
            <AppInput
              props={{
                label: 'Email',
                type: 'email',
                name: 'Email',
                error: touched.Email && errors.Email,
                onChange: handleChange,
                onBlur: handleBlur,
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <CallCalling className="text-[#292D32]" size="12" />
              <span className="text-xs text-secondary-1000">{t('phone')}</span>
            </div>
            <AppInput
              props={{
                name: 'Phone',
                label: 'Phone',
                error: touched.Phone && errors.Phone,
                onChange: handleChange,
                onBlur: handleBlur,
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-7 justify-end">
        {showSubmitButton && (
          <>
            <AppButton
              props={{
                content: 'Cancel',
                variant: 'light',
                size: 'md',
              }}
            />
            <AppButton
              props={{
                content: 'Save Changes',
                variant: 'secondary',
                size: 'md',
                isLoading: isSubmitting,
              }}
            />
          </>
        )}
      </div>
    </Form>
  );
};
