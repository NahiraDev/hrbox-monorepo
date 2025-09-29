import { MedalStar } from 'iconsax-react';

import { useChangePasswordMutation } from '@module/hrlink/features/setting/apis';
import { ChangePasswordForm, formValidationError, handleChangePasswordSubmit, initialValuesForm } from '@module/hrlink/features/setting/forms';
import { AppModal, AppButton } from '@core/components';
import { FormProvider } from '@core/context';

export const ChangePasswordModal = () => {
  const [changePassword] = useChangePasswordMutation();

  return (
    // <AppModal icon={<MedalStar className="text-secondary-400" size="22" />} size="3xl" title="Rulles">
      <div className="flex flex-col gap-8">
        <AppModal.Body>
          <div className="flex flex-col gap-8">
            <p className="text-secondary-900 text-base font-normal leading-normal">
              To change your password, go to account settings and select &#34;Change Password.&#34; Enter your current
              password, then create a new strong password. Confirm the new password and save the changes to enhance your
              account security.
            </p>
            <FormProvider
              initialValues={initialValuesForm}
              validationSchema={formValidationError}
              onSubmitAsync={async (values: any) => {
                await changePassword(handleChangePasswordSubmit(values)).unwrap();
              }}
            >
              <ChangePasswordForm />
            </FormProvider>
          </div>
        </AppModal.Body>

        <AppModal.Footer>
          <AppButton
            props={{
              size: 'sm',
              radius: 'lg',
              content: 'Close',
              onPress: close,
            }}
          />
          <AppButton
            props={{
              size: 'sm',
              radius: 'lg',
              color: 'secondary',
              content: 'Confirm',
              type: 'submit',
            }}
          />
        </AppModal.Footer>
      </div>
    // </AppModal>
  );
};
