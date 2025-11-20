import { Form, Radio, RadioGroup } from "@heroui/react";
import { AppAutoComplete, AppTextArea } from "@hrbox/uikit/components";
import * as Yup from "yup";
import { useFormContext } from "@hrbox/core/providers/FormProvider";
import { FormField } from "@hrbox/uikit/components/FormField";
import { Scan } from "iconsax-reactjs";

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
    ChooseFaceRecognitionAssignment: values.ChooseFaceRecognitionAssignment,
    FromDate: values.FromDate,
    organization: values.organization,
    Department: values.Department,
    JobTitle: values.JobTitle,
    Employee: values.Employee,
    Description: values.Description,
  };
};

const FaceAllocationShowForm = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormContext();

  return (
    <>
      <Form id="face-allocation-form" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-7">
          <RadioGroup
            name="type"
            isDisabled={true}
            classNames={{
              base: "w-full flex justify-between",
              wrapper: "w-full flex justify-between",
            }}
            defaultValue="Person"
            orientation="horizontal"
            onValueChange={(value) => setFieldValue("type", value)}
          >
            <Radio
              value="Person"
              classNames={{ wrapper: "border-2 border-primary" }}
            >
              Person
            </Radio>
            <Radio
              value="Group"
              classNames={{ wrapper: "border-2 border-primary" }}
            >
              Group
            </Radio>
            <Radio
              value="JobTitle"
              classNames={{ wrapper: "border-2 border-primary" }}
            >
              Job Title
            </Radio>
          </RadioGroup>
          <div className="flex flex-row justify-between gap-10">
            <div className="w-full">
              <FormField
                name="ChooseFace"
                label="Choose Face Recognition Assignment"
                component={AppAutoComplete}
              />
            </div>
            <div className="w-full">
           <FormField
                name="FromDate"
                label="From Date"
                component={AppAutoComplete}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between gap-10">
            <div className="w-full">
                <FormField
                name="organization"
                label="Organization"
                component={AppAutoComplete}
              />
            </div>
            {/* {values.type === "Person" || values.type === "Group" ? (
              <div className="w-full">
             <FormField
                  name="Department"
                  label="Department"
                  component={AppAutoComplete}
                />
              </div>
            ) : (
              <div className="w-full">
              <FormField
                  name="JobTitle"
                  label="Job Title"
                  component={AppAutoComplete}
                />
              </div>
            )} */}
          </div>
          {/* {values.type === "Person" && (
            <div className="flex flex-row justify-between gap-10">
              <div className="w-full">
           <FormField
                  name="Employee"
                  label="Employee"
                  component={AppAutoComplete}
                />
              </div>
              <div className="w-full"></div>
            </div>
          )} */}

          <div className="w-full">
          <FormField
              name="Description"
              label="Description"
              component={AppTextArea}
            />
          </div>
        </div>
        <Scan color="gray" size={90} className="absolute bottom-2 left-3" />
      </Form>
    </>
  );
};
export default FaceAllocationShowForm;
