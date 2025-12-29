import SettingForm from "../forms/SettingForm";
import { FormProvider } from "@hrbox/core/providers";
import * as Yup from "yup";

const SettingModal = () => {
  const initialValuesAction = {
    index_title: null,
    Select_Group: null,
    type: null,
    weight: null,
    creation_date: null,
    Department: null,
    Employee: null,
    Description: null
  };
  const formValidationAction = Yup.object().shape({
    index_title: Yup.string().required(),
    Select_Group: Yup.string().required(),
    type: Yup.string().required(),
    weight: Yup.string().required(),
    creation_date: Yup.string().required(),

    Description: Yup.string().required()
  });
  const handleSubmitAction = (values: any) => {
    console.log(values.title);
    console.log(values.type);
    console.log(values.Description);
    return {
      index_title: values.index_title,
      Select_Group: values.Group,
      type: values.type,
      weight: values.weight,
      Description: values.Description
    };
  };
  return (
    <FormProvider
      formId="setting-modal"
      initialValues={initialValuesAction}
      validationSchema={formValidationAction}
      onSubmit={handleSubmitAction}
    >
      <SettingForm />
    </FormProvider>
  );
};
export default SettingModal;
