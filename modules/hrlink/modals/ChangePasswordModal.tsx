import { FormProvider } from '@hrbox/core/providers/FormProvider';
import { useChangePasswordMutation } from "@hrbox/modules/hrlink/apis/Setting";
import {
    ChangePasswordForm,
    formValidationError,
    handleChangePasswordSubmit,
    initialValuesForm
} from "@hrbox/modules/hrlink/forms/ChangePasswordForm";

export const ChangePasswordModal = () => {
  const [changePassword] = useChangePasswordMutation();

  return (
      <div className="flex flex-col gap-8">
          <p className="text-secondary-900 text-base font-normal leading-normal">
              To change your password, go to account settings and select &#34;Change Password.&#34; Enter your current
              password, then create a new strong password. Confirm the new password and save the changes to enhance your
              account security.
          </p>
          <FormProvider
              formId="change-password"
              initialValues={initialValuesForm}
              validationSchema={formValidationError}
              onSubmitAsync={async (values: any) => {
                  await changePassword(handleChangePasswordSubmit(values)).unwrap();
              }}
          >
              <ChangePasswordForm />
          </FormProvider>
      </div>
  );
};
