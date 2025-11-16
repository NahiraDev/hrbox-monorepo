import { FormField } from "@HRBox/UIKit/components/FormField";
import { AppAutoComplete, AppTextArea } from "@HRBox/UIKit/components";
import { Form } from "@heroui/react";
import * as Yup from "yup";
export const initialValuesAction = {
DegreeLevel : null,
EducationalInstitution : null,
UniversityType : null,
FieldofStudy : null,
ThesisTitle : null,
GPA : null,
FromYear : null,
ToYear : null,
Province : null,
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
const EducationForm = () => {
  return (
    <Form>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <FormField name="Degree Level" label='Degree Level' component={AppAutoComplete}/>
        <FormField name="Educational Institution" label='Educational Institution' component={AppAutoComplete}   />
        <FormField name="University Type" label='University Type' component={AppAutoComplete} />
        <FormField name="Field of Study" label='Field of Study' component={AppAutoComplete} />
        <FormField name="Thesis Title" label='Thesis Title' component={AppAutoComplete} />
        <FormField name="GPA" label='GPA'/>
        <FormField name="From Year" label='From Year'  component={AppAutoComplete}/>
        <FormField name="To Year" label='To Year'  component={AppAutoComplete}/>
        <FormField name="Province" label='Province'  component={AppAutoComplete}/>
      </div>
      <div>
        <FormField  name="Type" label='Type' component={AppTextArea} />
      </div>
    </Form>
  )
}