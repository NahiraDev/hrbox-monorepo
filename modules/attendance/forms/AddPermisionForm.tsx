import { Form } from "@heroui/react";
import { AppAutoComplete, AppInput } from "@hrbox/uikit/components";
import { FormField } from "@hrbox/uikit/components/FormField";
import { useTranslation } from "react-i18next";

const AddPermisionForm = () => {
  const {t}=useTranslation();
  return (
    <>
      <Form className="gap-6">
        <div className="flex flex-row w-full gap-x-9 justify-between ">
          <div className="w-full">
            <FormField name="title" label={t("from_time")} type="text" />
          </div>
          <div className="w-full">
            <FormField name="title" label={t("to_Time")} type="text" />
          </div>
        </div>{" "}
        <div className="flex flex-row w-full justify-between gap-x-9 ">
          <div className="w-[48%]">
            <FormField
              name="title"
              label={t("choose_type")}
              component={AppAutoComplete}
              items={[
                { id: 1, name: "فناوری اطلاعات" },
                { id: 2, name: "منابع انسانی" },
                { id: 3, name: "مالی" },
              ]}
              displayKey="name"
              valueKey="id"
            />
          </div>
        </div>
      </Form>
    </>
  );
};

export default AddPermisionForm;
