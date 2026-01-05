import { Form } from "@heroui/react";
import { AppAutoComplete } from "@hrbox/uikit/components";
import { FormField } from "@hrbox/uikit/components/FormField";
import { useTranslation } from "react-i18next";
import { useFormContext } from "@hrbox/core/providers";

const AddPermisionForm = () => {
  const { t } = useTranslation();
  const {handleSubmit}=useFormContext()
  return (
    <>
      <form id="permision-form" className="gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-row w-full gap-x-9 justify-between ">
          <div className="w-full">
            <FormField name="formTime" label={t("from_time")} type="text" />
          </div>
          <div className="w-full">
            <FormField name="toTime" label={t("to_Time")} type="text" />
          </div>
        </div>
        <div className="flex flex-row w-full justify-between gap-x-9 ">
          <div className="w-[48%]">
            <FormField
              name="ChooseType"
              label={t("choose_type")}
              component={AppAutoComplete}
              data={[
                { id: 1, name: "فناوری اطلاعات" },
                { id: 2, name: "منابع انسانی" },
                { id: 3, name: "مالی" }
              ]}
              displayKey="name"
              variant="solid"
              valueKey="id"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default AddPermisionForm;
