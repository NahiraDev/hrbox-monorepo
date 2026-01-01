import { Form } from "@heroui/react";
import { AppAutoComplete, AppInput, AppTextArea } from "@hrbox/uikit/components";
import { Scan } from "iconsax-reactjs";
import { useFormContext } from "@hrbox/core/providers/FormProvider";
import { FormField } from "@hrbox/uikit/components/FormField";
import { useModalContext } from "@hrbox/core/providers";
import { useTranslation } from "react-i18next";

const SettingForm = () => {
  const { t } = useTranslation();
  const { errors, touched, handleSubmit } = useFormContext();
  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;

  return (
    <Form id="setting-form" onSubmit={handleSubmit}>
      <div className="flex flex-col w-full gap-7">
        <div className="flex gap-10">
          <FormField
            formMode={currentType}
            name="index_title"
            label={t("index_title")}
            component={AppInput}
            helperText={touched?.index_title && errors?.index_title}
          />

          <FormField
            formMode={currentType}
            name="select_group"
            label={t("Select_Group")}
            component={AppAutoComplete}
            helperText={touched?.select_group && errors?.select_group}
          />
        </div>

        <div className="flex gap-10">
          <FormField
            formMode={currentType}
            name="type"
            label={t("Type")}
            component={AppAutoComplete}
            helperText={touched?.type && errors?.type}
          />

          <FormField
            formMode={currentType}
            name="weight"
            label={t("weight")}
            component={AppInput}
            helperText={touched?.weight && errors?.weight}
          />
        </div>

        <FormField
          formMode={currentType}
          name="description"
          label={t("descriptions")}
          component={AppTextArea}
          helperText={touched?.description && errors?.description}
        />
      </div>

      <Scan color="gray" size={90} className="absolute bottom-2 left-0" />
    </Form>
  );
};

export default SettingForm;
