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
  DescriptionsandAchievements : null,

};
export const formValidationAction = Yup.object().shape({
  Title: Yup.string().required(),
  Company: Yup.string().required(),
  StartDate: Yup.string().required(),
  SalaryReceived: Yup.string().required(),
  Industry: Yup.string().required(),
  Province: Yup.string().required(),
  JobGroup: Yup.string().required(),
  DescriptionsandAchievements: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  console.log(values.Title);
  console.log(values.Company);
  console.log(values.StartDate);
  console.log(values.SalaryReceived);
  console.log(values.Industry);
  console.log(values.Province);
  console.log(values.JobGroup);
  console.log(values.DescriptionsandAchievements);
  return {
    Title: values.Title,
    Company: values.Company,
    StartDate: values.StartDate,
    SalaryReceived: values.SalaryReceived,
    Industry: values.Industry,
    Province: values.Province,
    JobGroup: values.JobGroup,
    DescriptionsandAchievements: values.DescriptionsandAchievements,
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