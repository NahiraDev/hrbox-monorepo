import { AppButton, AppInput } from "@hrbox/uikit/components";
import { Form } from "@heroui/react";
import { Eye, EyeSlash } from "iconsax-reactjs";
import { useFormContext } from "@hrbox/core/providers/FormProvider";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { FormField } from "@hrbox-monorepo/UIKit/components/FormField";

export const RegisterForm = () => {
  const {
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
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
          <FormField  label={t("first_name")} name="FirstName" helperText={touched.FirstName && errors.FirstName}/>
          <FormField  label={t("last_name")} name="LastName" helperText={touched.LastName && errors.LastName}/>
          <FormField  label={t("email")} name="Email" helperText={touched.Email && errors.Email}/>
          <FormField  label={t("phone")} name="Mobile" helperText={touched.NationalCode && errors.NationalCode} />
        </div>
        <div className="grid xl:grid-cols-2 xl:gap-10 gap-2">
          <div className="flex flex-col gap-1">
            {/*<AppInput*/}
            {/*  props={{*/}
            {/*    label: t("national_code"),*/}
            {/*    name: "NationalCode",*/}
            {/*    error:  : undefined,*/}
            {/*    onChange: handleChange,*/}
            {/*    onBlur: handleBlur*/}
            {/*  }}*/}
            {/*/>*/}
          </div>
        </div>
        <div className="grid xl:grid-cols-2 xl:gap-10 gap-2">
          <div className="flex flex-col gap-1">
            <AppInput
              props={{
                name: "registe-form",
                label: t("password"),
                error: touched.Password ? errors.Password : undefined,
                type: isVisiblePassword ? "text" : "password",
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
                )
              }}
            />
          </div>
        </div>
      </div>
      <AppButton
        className="font-semibold h-14 !py-4 lg:!w-[320px]"
        size="lg"
        fullWidth={true}
        variant="primary"
        text={t("sign_up")}
        isSubmitting={isSubmitting}
      />
    </Form>
  );
};
