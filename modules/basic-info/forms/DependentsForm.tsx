import { FormField } from "@HRBox/UIKit/components/FormField";
import { AppAutoComplete, AppTextArea } from "@HRBox/UIKit/components";
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
  title: Yup.string().required(),
  type: Yup.string().required(),
  ChooseIp: Yup.string().required(),
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
    ChooseIp: values.ChooseIp,
    FromDate: values.FromDate,
    organization: values.organization,
    Department: values.Department,
    JobTitle: values.JobTitle,
    Employee: values.Employee,
    Description: values.Description,
  };
};
const DependentsForm = () => {
  return (
    <Form>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <FormField name="First Name" label='First Name' />
        <FormField name="Last Name" label='Last Name'  />
        <FormField name="National ID" label='National ID'/>
        <FormField name="Education" label='Education' />
        <FormField name="Mobile'" label='Mobile' />
        <FormField name="Date of Birth" label='Date of Birth' component={AppAutoComplete} />
        <FormField name="Relation" label='Relation' component={AppAutoComplete} />
      </div>

      <div>
        <FormField  name="Descriptions and Achievements" label='Descriptions and Achievements' component={AppTextArea} />
      </div>
    </Form>
  )
}