import { FormField } from "@HRBox/UIKit/components/FormField";
import { AppAutoComplete, AppSwitch, AppTextArea } from "@HRBox/UIKit/components";
import { Form } from "@heroui/react";
import * as Yup from "yup";
export const initialValuesAction = {
  Title : null,
  Company : null,
  'StartDate' : null,
  SalaryReceived: null,
  Industry : null,
  Province : null,
  'JobGroup' : null,
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
const JobForm = () => {
  return (
    <Form>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <FormField name="Title" label='Title'/>
        <FormField name="Company" label='Company'/>
        <FormField name="Start Date" label='Start Date' component={AppAutoComplete} />
        <FormField name="Salary Received" label='Salary Received'  />
        <FormField name="Industry" label='Industry' component={AppAutoComplete} />
      </div>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        {/*we don't have any element for upload work sample*/}
        <FormField name="Province" label='Province' component={AppAutoComplete} />
        <FormField name="Job Group" label='Job Group' component={AppAutoComplete} />
        <AppSwitch/>
      </div>
      <div>
        <FormField  name="Descriptions and Achievements" label='Descriptions and Achievements' component={AppTextArea} />
      </div>
    </Form>
  )
}