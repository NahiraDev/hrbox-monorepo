import { Form, Radio, RadioGroup } from "@heroui/react";
import { AppAutoComplete, AppTextArea } from "@hrbox/uikit/components";
import { Global } from "iconsax-reactjs";
import * as Yup from "yup";
import { useFormContext } from "@hrbox/core/providers/FormProvider";
import { FormField } from "@hrbox/uikit/components/FormField";
import { useModalContext } from "@hrbox/core/providers";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const IpAllocationForm = () => {
  const { t } = useTranslation();
  const { values, handleSubmit, setFieldValue, errors } = useFormContext();

  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;
  useEffect(() => {
    console.log("values-Ip", values);
    console.log("errors-IP", errors);
  }, [errors, values]);
  return (
    <>
      <Form id="ip-allocation-form" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-7">
          <RadioGroup
            name="type"
            classNames={{
              base: "w-full flex justify-between",
              wrapper: "w-full flex justify-between",
            }}
            isDisabled={currentType === "view" ? true : false}
            value={values?.type || "person"}
            orientation="horizontal"
            onValueChange={(value) => setFieldValue("type", value)}
          >
            <Radio
              value="person"
              classNames={{ wrapper: "border-2 border-primary" }}
            >
              {t("person")}
            </Radio>
            <Radio
              value="group"
              classNames={{ wrapper: "border-2 border-primary" }}
            >
              {t("group")}
            </Radio>
            <Radio
              value="jobtitle"
              classNames={{ wrapper: "border-2 border-primary" }}
            >
              {t("job_title")}
            </Radio>
          </RadioGroup>
          <div className="flex flex-row justify-between gap-10">
            <div className="w-full">
              <FormField
                name="ChooseIp"
                label={t("choose_ip")}
                formMode={currentType}
                component={AppAutoComplete}
                variant="solid"
                aria-label="ChooseIp"
                data={[{ id: "Administrative", name: "Administrative" }]}
              />
            </div>
            <div className="w-full">
              <FormField
                name="FormDate"
                label={t("form_date")}
                formMode={currentType}
                component={AppAutoComplete}
                variant="solid"
                aria-label="FormDate"
                data={[{ id: "2025/01/10", name: "2025/01/10" }]}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between gap-10">
            <div className="w-full">
              <FormField
                name="organization"
                label={t("organizations")}
                formMode={currentType}
                component={AppAutoComplete}
                variant="solid"
                aria-label="organization"
                data={[{ id: "Zahra Pakniyat", name: "Zahra Pakniyat" }]}
              />
            </div>
            {(values && values?.type === "person") ||
            (values && values?.type === "group") ? (
              <div className="w-full">
                <FormField
                  name="Department"
                  label={t("department")}
                  formMode={currentType}
                  component={AppAutoComplete}
                  variant="solid"
                  aria-label="Department"
                  data={[
                    { id: "It", name: "It" },
                    { id: "technical", name: "technical" },
                  ]}
                />
              </div>
            ) : (
              <div className="w-full">
                <FormField
                  name="JobTitle"
                  label={t("job_title")}
                  formMode={currentType}
                  component={AppAutoComplete}
                  variant="solid"
                  aria-label="JobTitle"
                  data={[{ id: "Developer", name: "Developer" }]}
                />
              </div>
            )}
          </div>
          {values && values?.type === "person" && (
            <div className="flex flex-row justify-between gap-10">
              <div className="w-full">
                <FormField
                  name="Employee"
                  label={t("employee")}
                  formMode={currentType}
                  component={AppAutoComplete}
                  variant="solid"
                  aria-label="Employee"
                  data={[
                    { id: "Ali Rezaei", name: "Ali Rezaei" },
                    { id: "Moho", name: "Moho" },
                  ]}
                />
              </div>
              <div className="w-full"></div>
            </div>
          )}

          <div className="w-full">
            <FormField
              name="Description"
              label={t("descriptions")}
              formMode={currentType}
              component={AppTextArea}
              aria-label="Description"
              variant="solid"
            />
          </div>
        </div>
        <Global color="gray" size={90} className="absolute bottom-2 left-0" />
      </Form>
    </>
  );
};
export default IpAllocationForm;
