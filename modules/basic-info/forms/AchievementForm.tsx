import { FormField } from "@hrbox/uikit/components/FormField";
import { AppAutoComplete, AppTextArea } from "@hrbox/uikit/components";
import { Form } from "@heroui/react";
import * as Yup from "yup";
import {useModalContext} from "@hrbox/core/providers";

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
  return {
    Title: values.title,
    Year: values.type,
    Month: values.ChooseIp,
  };
};

export const AchievementForm = () => {
    const { getOpenModal } = useModalContext();
    const currentType = getOpenModal()?.type;
  return (
    <Form>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <FormField name="Title" label="Title" formMode={currentType}/>
        <FormField name="Year" label="Year" component={AppAutoComplete} formMode={currentType}/>
        <FormField name="Month" label="Month" component={AppAutoComplete} formMode={currentType}/>
      </div>
      <div>
        <FormField name="Type" label="Type" component={AppTextArea} />
      </div>
    </Form>
  );
};
