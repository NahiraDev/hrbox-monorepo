import { Form } from "@heroui/react";
import { AppAutoComplete, AppTextArea } from "@hrbox/uikit/components";
import { Scan } from "iconsax-reactjs";
import { useFormContext } from "@hrbox/core/providers/FormProvider";
import { FormField } from "@hrbox/uikit/components/FormField";
import { useModalContext } from "@hrbox/core/providers";
import { useTranslation } from "react-i18next";

const SettingForm = () => {
  const { t } = useTranslation();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue
  } = useFormContext();
  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;
  return (
    <>
      <Form id="face-allocation-form" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-7">
          <div className="flex flex-row justify-between gap-10">
            <div className="w-full">
              <FormField
                formMode={currentType}
                name="index_title"
                label={t("index_title")}
                component={AppAutoComplete}
                helperText={touched?.index_title && errors?.index_title}
              />
            </div>
            <div className="w-full">
              <FormField
                formMode={currentType}
                name="Select_Group"
                label={t("Select_Group")}
                component={AppAutoComplete}
                helperText={touched?.index_title && errors?.index_title}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between gap-10">
            <div className="w-full">
              <FormField
                formMode={currentType}
                name="Type"
                label={t("Type")}
                component={AppAutoComplete}
              />
            </div>

            <div className="w-full">
              <FormField
                formMode={currentType}
                name="weight"
                label={t("weight")}
                component={AppAutoComplete}
              />
            </div>

          </div>

          <div className="w-full ">
            <FormField
              formMode={currentType}
              name="Description"
              label={t("descriptions")}
              component={AppTextArea}
            />
          </div>
        </div>
        <Scan color="gray" size={90} className="absolute bottom-2 left-0" />
      </Form>
    </>
  );
};
export default SettingForm;
