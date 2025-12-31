import { Form, Radio, RadioGroup } from "@heroui/react";
import { AppAutoComplete, AppTextArea } from "@hrbox/uikit/components";
import { Location } from "iconsax-reactjs";
import * as Yup from "yup";
import { useFormContext } from "@hrbox/core/providers/FormProvider";
import { FormField } from "@hrbox/uikit/components/FormField";
import { useModalContext } from "@hrbox/core/providers";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const LocationAllocationForm = () => {
  const {t}=useTranslation();
  const {
    values,
    errors,
    handleSubmit,
    setFieldValue,
  } = useFormContext();
    useEffect(() => {
    console.log("Errors-Location:", errors);
    console.log("Values-Location:", values);
  }, [errors, values]);
    const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;

  return (
    <>
      <Form id="location-allocation" onSubmit={handleSubmit}>
         <div className="flex flex-col w-full gap-7">
        <RadioGroup
          name="type"
          classNames={{
            base: "w-full flex justify-between",
            wrapper: "w-full flex justify-between",
          }}
          value={values?.type}
          isDisabled={currentType==="view"?true:false}
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
              name="ChooseShift"
              label={t("choose_shift")}
              component={AppAutoComplete}
              formMode={currentType}
              variant="solid"
              aria-label={t("choose_shift")} 
              data={[{ id: "Administrative" , name: "Administrative" }]}
            />
          </div>
          <div className="w-full">
            <FormField
              name="FromDate"
              label={t("form_date")}
              component={AppAutoComplete}
              formMode={currentType}
              variant="solid"
              aria-label={t("form_date")} 
             data={[{ id: "2025/01/10", name: "2025/01/10" }]}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between gap-10">
          <div className="w-full">
            <FormField
              name="organization"
              label={t("organizations")}
              component={AppAutoComplete}
              formMode={currentType}
              variant="solid"
              aria-label={t("organization")} 
             data={[{ id: "Zahra Pakniyat", name: "Zahra Pakniyat" }]}
            />
          </div>
          {(values && values?.type === "person") ||
          (values && values?.type === "group") ? (
            <div className="w-full">
              <FormField
                name="Department"
                label={t("department")}
                component={AppAutoComplete}
                formMode={currentType}
                variant="solid"
                aria-label={t("department")} 
                data={[
                  { id: "It", name: "It" },
                  { id: "technical", name: "technical" }
                ]}
              />
            </div>
          ) : (
            <div className="w-full">
              <FormField
                name="JobTitle"
                label={t("job_title")}
                component={AppAutoComplete}
                formMode={currentType}
                variant="solid"
                aria-label={t("job_title")} 
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
                component={AppAutoComplete}
                formMode={currentType}
                variant="solid"
                aria-label={t("employee")} 
                 data={[
                  { id: "Ali Rezaei", name: "Ali Rezaei" },
                  { id: "Moho", name: "Moho" }
                
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
            component={AppTextArea}
            formMode={currentType}
            variant="solid"
            aria-label={t("description")} 
          />
        </div>
      </div>
        <Location color="gray" size={90} className="absolute bottom-2 left-0" />
      </Form>
    </>
  );
};
export default LocationAllocationForm;
