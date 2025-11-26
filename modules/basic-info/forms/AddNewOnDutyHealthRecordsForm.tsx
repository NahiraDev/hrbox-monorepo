import { FormField } from "@hrbox/uikit/components/FormField";
import { AppAutoComplete, AppTextArea } from "@hrbox/uikit/components";
import { Form } from "@heroui/react";
import * as Yup from "yup";
export const initialValuesHealth = {
  Title: null,
  Amount: null,
};
export const formValidationHealth = Yup.object().shape({
  Title: Yup.string().required(),
  Amount: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  console.log(values.Title);
  console.log(values.Amount);
  return {
    Title: values.title,
    Amount: values.type,
  };
};

const AddNewOnDutyHealthRecords = () => {
  return (
    <Form>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <FormField name="Title" label="Title" />
        <FormField name="Amount" label="Amount" />
        {/*we dont have Attached File*/}
      </div>
    </Form>
  );
};
