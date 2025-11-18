import * as Yup from "yup";

import { useFormContext } from "@hrbox/core/providers/FormProvider";
import { AppInput } from "@hrbox/uikit/components";
import { Form } from "@heroui/react";

export const initialValuesForm = {
  CurrentPassWord: "",
  NewPassWord: "",
  RepeatPassWord: "",
};

export const formValidationError = Yup.object().shape({
  CurrentPassWord: Yup.string().required("Current password is required"),
  NewPassWord: Yup.string()
    .required("New password is required")
    .min(6, "New password must be at least 6 characters"),
  RepeatPassWord: Yup.string()
    .oneOf([Yup.ref("newPass")], "Passwords must match")
    .required("Please confirm your new password"),
});

export const handleChangePasswordSubmit = (values: any) => {
  return {
    CurrentPassWord: values.CurrentPassWord,
    NewPassWord: values.NewPassWord,
    RepeatPassWord: values.RepeatPassWord,
  };
};

export const ChangePasswordForm = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormContext();

  return (
    <Form
      className="w-full flex flex-col gap-6"
      id="change-password-form"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-2 gap-[52px] w-full">
        <div className="col-span-1 flex flex-col gap-1">
          <AppInput
            props={{
              label: "Current password",
              name: "CurrentPassWord",
              type: "text",
              error: touched.CurrentPassWord && errors.CurrentPassWord,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-1">
          <AppInput
            props={{
              label: "New password",
              name: "NewPassWord",
              type: "text",
              error: touched.NewPassWord && errors.NewPassWord,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[52px] w-full">
        <div className="col-span-1 flex flex-col gap-1">
          <AppInput
            props={{
              label: "Repeat password",
              name: "RepeatPassWord",
              type: "text",
              error: touched.RepeatPassWord && errors.RepeatPassWord,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </div>
      </div>
    </Form>
  );
};
