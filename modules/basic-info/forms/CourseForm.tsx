import { Form } from "@heroui/react";
import { FormField } from "@HRBox/UIKit/components/FormField";
import { AppAutoComplete, AppTextArea } from "@HRBox/UIKit/components";
import * as Yup from "yup";
export const initialValuesAction = {
  Type: null,
  Title: null,
  Level: null,
  Duration: null,
  CenterName: null,
  Year: null,
  FromNumber: null,
  ToNumber: null,
};
export const formValidationAction = Yup.object().shape({
  Type: Yup.string().required(),
  Title: Yup.string().required(),
  Level: Yup.string().required(),
  Duration: Yup.string().required(),
  CenterName: Yup.string().required(),
  Year: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  console.log(values.Type);
  console.log(values.Title);
  console.log(values.Level);
  console.log(values.Duration);
  console.log(values.CenterName);
  console.log(values.Year);
  return {
    Type: values.title,
    Title: values.type,
    Level: values.ChooseIp,
    Duration: values.FromDate,
    CenterName: values.organization,
    Year: values.Department,
   };
};

export const CourseForm = () =>{
  return(
    <Form>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <FormField name="Type" label='Type' />
        <FormField name="Title" label='Title'  />
        <FormField name="Level" label='Level' component={AppAutoComplete} />
        <FormField name="Duration (Hours)" label='Duration (Hours)' component={AppAutoComplete} />
        <FormField name="Center Name" label='Center Name' component={AppAutoComplete} />
        <FormField name="Year" label='Year' component={AppAutoComplete} />
        {/*we dont have Attached File*/}
        {/*we dont have Check circle*/}
      </div>

      <div>
        <FormField name="From Number" label='From Number' component={AppAutoComplete} />
        <FormField name="To Number" label='To Number' component={AppAutoComplete} />
        <FormField  name="Type" label='Type' component={AppTextArea} />
      </div>
    </Form>
  )
}