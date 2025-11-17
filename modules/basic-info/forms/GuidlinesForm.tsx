import { FormField } from "@HRBox/UIKit/components/FormField";
import { AppAutoComplete, AppTextArea } from "@HRBox/UIKit/components";
import { Form } from "@heroui/react";
import * as Yup from "yup";
export const initialValuesAction = {
  Form : null,
};
export const formValidationAction = Yup.object().shape({
  Form: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  console.log(values.Form);
  return {
    Form: values.Form,
  };
};
const Guidlines = () => {
  return (
    <Form>
        <FormField name="Form" label='Form' />
    </Form>
  )
}