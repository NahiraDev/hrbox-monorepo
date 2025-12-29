import { Form, Radio, RadioGroup } from "@heroui/react";
import { AppAutoComplete, AppTextArea } from "@hrbox/uikit/components";
import { Scan } from "iconsax-reactjs";
import * as Yup from "yup";
import { FormProvider, useFormContext } from "@hrbox/core/providers/FormProvider";
import { FormField } from "@hrbox/uikit/components/FormField";
import { useModalContext } from "@hrbox/core/providers";
import { useTranslation } from "react-i18next";

export const initialValuesAction = {
  title: null,
  type: "Person",
  ChooseFaceRecognitionAssignment: null,
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
  ChooseFaceRecognitionAssignment: Yup.string().required(),
  FromDate: Yup.string().required(),
  organization: Yup.string().required(),
  Department: Yup.string().required(),
  JobTitle: Yup.string().required(),
  Employee: Yup.string().required(),
  Description: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  console.log(values);
  return {
    title: values.title,
    type: values.type,
    ChooseFaceRecognitionAssignment: values.ChooseFaceRecognitionAssignment,
    FromDate: values.FromDate,
    organization: values.organization,
    Department: values.Department,
    JobTitle: values.JobTitle,
    Employee: values.Employee,
    Description: values.Description,
  };
};

const FaceAllocationForm = () => {
  const {t}=useTranslation();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormContext();
  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;
  return (
    <>
    <FormProvider formId="face-form" initialValues={initialValuesAction} onSubmit={handleSubmitAction} >
      <Form id="face-form" onSubmit={handleSubmit}>
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
                 formMode={currentType}
                name="ChooseFace"
                label={t("choose_face_recognition_assignment")}
                component={AppAutoComplete}
                items={[
                  {id:1,name:"night"},
                  {id:2,name:"morning"}
                ]}
              />
            </div>
            <div className="w-full">
              <FormField
                formMode={currentType}
                name="FromDate"
                label={t("_date")}
                component={AppAutoComplete}
                items={[
                  {id:1,name:"monday"}
                ]}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between gap-10">
            <div className="w-full">
              <FormField
                formMode={currentType}
                name="organization"
                label={t("organizations")}
                component={AppAutoComplete}
                items={[
                  {id:1,name:"true"}
                ]}
              />
            </div>
            {values?.type === t("person") || values?.type === t("group") ? (
              <div className="w-full">
                <FormField
                  formMode={currentType}
                  name="Department"
                  label={t("department")}
                  component={AppAutoComplete}
                  data={[
                    {id:1,name:"hrbox"}
                  ]}
                />
              </div>
            ) : (
              <div className="w-full">
                <FormField
                  formMode={currentType}
                  name="JobTitle"
                  label={t("job_title")}
                  component={AppAutoComplete}
                   items={[
                    {id:1,name:"programmer"}
                  ]}
                />
              </div>
            )}
          </div>
          {values?.type === t("person") && (
            <div className="flex flex-row justify-between gap-10">
              <div className="w-full">
                <FormField
                  formMode={currentType}
                  name="Employee"
                  label={t("employee")}
                  component={AppAutoComplete}
                  items={[
                    {id:1,name:"momomo"}
                  ]}
                />
              </div>
              <div className="w-full"></div>
            </div>
          )}

          <div className="w-full">
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
      </FormProvider>
    </>
  );
};
export default FaceAllocationForm;
