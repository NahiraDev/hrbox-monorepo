import { FormField } from "@HRBox/UIKit/components/FormField";
import { AppAutoComplete, AppTextArea } from "@HRBox/UIKit/components";
import { Form } from "@heroui/react";
import * as Yup from "yup";
// import * as Yup from "yup";

export const initialValuesAction = {
  Title: null,
  Year: null,
  Month: null,

};
export const formValidationAction = Yup.object().shape({
  Title: Yup.string().required(),
  Year: Yup.string().required(),
  Month: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  console.log(values.Title);
  console.log(values.Year);
  console.log(values.Month);
  return {
    Title: values.title,
    Year: values.type,
    Month: values.ChooseIp,
  };
};

const AchievementForm = () => {
  return (
    <Form>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <FormField name="Title" label='Title' />
        <FormField name="Year" label='Year' component={AppAutoComplete} />
        <FormField name="Month" label='Month' component={AppAutoComplete} />
        {/*we dont have Attached File*/}
      </div>
      <div>
        <FormField  name="Type" label='Type' component={AppTextArea} />
      </div>
    </Form>
  )
}