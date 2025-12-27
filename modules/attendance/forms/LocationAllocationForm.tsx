import { Form, Radio, RadioGroup } from "@heroui/react";
import { AppAutoComplete, AppTextArea } from "@hrbox/uikit/components";
import { Location } from "iconsax-reactjs";
import * as Yup from "yup";
import { useFormContext } from "@hrbox/core/providers/FormProvider";
import { FormField } from "@hrbox/uikit/components/FormField";
import { useModalContext } from "@hrbox/core/providers";
import { useTranslation } from "react-i18next";

export const initialValuesAction = {
  title: null,
  type: "Person",
  ChooseLocation: null,
  FromDate: null,
  organization: null,
  Department: null,
  Employee: null,
  Description: null,
  JobTitle: null,
};
export const formValidationAction = Yup.object().shape({
  title: Yup.string().required(),
  type: Yup.string().required(),
  ChooseLocation: Yup.string().required(),
  FromDate: Yup.string().required(),
  organization: Yup.string().required(),
  Department: Yup.string().required(),
  JobTitle: Yup.string().required(),
  Employee: Yup.string().required(),
  Description: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  console.log(values.title);
  console.log(values.type);
  console.log(values.ChooseShift);
  console.log(values.FromDate);
  console.log(values.organization);
  console.log(values.Employee);
  console.log(values.Description);
  return {
    title: values.title,
    type: values.type,
    ChooseLocation: values.ChooseLocation,
    FromDate: values.FromDate,
    organization: values.organization,
    Department: values.Department,
    JobTitle: values.JobTitle,
    Employee: values.Employee,
    Description: values.Description,
  };
};

const LocationAllocationForm = () => {
  const {t}=useTranslation();
  const {
    values,
    handleSubmit,
    setFieldValue,
  } = useFormContext();

    const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;

  return (
    <>
      <Form id="location-allocation-edit" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-7">
          <RadioGroup
            name="type"
            classNames={{
              base: "w-full flex justify-between",
              wrapper: "w-full flex justify-between",
            }}
            defaultValue={t("person")}
            orientation="horizontal"
            onValueChange={(value) => setFieldValue("type", value)}
          >
            <Radio
              value={t("person")}
              classNames={{ wrapper: "border-2 border-primary" }}
            >
              {t("person")}
            </Radio>
            <Radio
              value={t("group")}
              classNames={{ wrapper: "border-2 border-primary" }}
            >
              {t("group")}
            </Radio>
            <Radio
              value={t("job_title")}
              classNames={{ wrapper: "border-2 border-primary" }}
            >
              {t("job_title")}
            </Radio>
          </RadioGroup>
          <div className="flex flex-row justify-between gap-10">
            <div className="w-full">
              <FormField
                name="ChooseLocation"
                label={t("choose_location")}
                formMode={currentType}
                component={AppAutoComplete}
              />
            </div>
            <div className="w-full">
              <FormField
                name="FromDate"
                label={t("form_date")}
                formMode={currentType}
                component={AppAutoComplete}
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
              />
            </div>
            {values?.type === t("person") || values?.type === t("group") ? (
              <div className="w-full">
                <FormField
                  name="Department"
                  label={t("department")}
                  formMode={currentType}
                  component={AppAutoComplete}
                />
              </div>
            ) : (
              <div className="w-full">
                <FormField
                  name="JobTitle"
                  label={t("job_title")}
                  formMode={currentType}
                  component={AppAutoComplete}
                />
              </div>
            )}
          </div>
          {values?.type === t("person") && (
            <div className="flex flex-row justify-between gap-10">
              <div className="w-full">
                <FormField
                  name="Employee"
                  label={t("employee")}
                  formMode={currentType}
                  component={AppAutoComplete}
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
            />
          </div>
        </div>
        <Location color="gray" size={90} className="absolute bottom-2 left-0" />
      </Form>
    </>
  );
};
export default LocationAllocationForm;
