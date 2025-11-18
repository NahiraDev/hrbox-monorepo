import { FormField } from "@hrbox/uikit/components/FormField";
import { AppAutoComplete, AppTextArea } from "@hrbox/uikit/components";
import { Form } from "@heroui/react";
import * as Yup from "yup";
export const initialValuesAction = {
  FirstName: null,
  LastName: null,
  NationalID: null,
  Education: null,
  Mobile: null,
  DateofBirth: null,
  Relation: null,
  DescriptionsandAchievements: null,
};
export const formValidationAction = Yup.object().shape({
  FirstName: Yup.string().required(),
  LastName: Yup.string().required(),
  NationalID: Yup.string().required(),
  Education: Yup.string().required(),
  Mobile: Yup.string().required(),
  DateofBirth: Yup.string().required(),
  Relation: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  console.log(values.FirstName);
  console.log(values.LastName);
  console.log(values.NationalID);
  console.log(values.Education);
  console.log(values.Mobile);
  console.log(values.DateofBirth);
  console.log(values.Relation);
  return {
    FirstName: values.title,
    LastName: values.type,
    NationalID: values.ChooseIp,
    Education: values.FromDate,
    Mobile: values.organization,
    DateofBirth: values.Department,
    Relation: values.JobTitle,
  };
};
const DependentsForm = () => {
  return (
    <Form>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <FormField name="First Name" label="First Name" />
        <FormField name="Last Name" label="Last Name" />
        <FormField name="National ID" label="National ID" />
        <FormField name="Education" label="Education" />
        <FormField name="Mobile'" label="Mobile" />
        <FormField
          name="Date of Birth"
          label="Date of Birth"
          component={AppAutoComplete}
        />
        <FormField
          name="Relation"
          label="Relation"
          component={AppAutoComplete}
        />
      </div>

      <div>
        <FormField
          name="Descriptions and Achievements"
          label="Descriptions and Achievements"
          component={AppTextArea}
        />
      </div>
    </Form>
  );
};
