import SettingForm from "../forms/SettingForm";
import { FormProvider } from "@hrbox/core/providers";
import * as Yup from "yup";

const SettingModal = () => {
  const initialValues = {
    index_title: "",
    select_group: "",
    type: "",
    weight: "",
    description: ""
  };

  const validationSchema = Yup.object({
    index_title: Yup.string().required("Required"),
    select_group: Yup.string().required("Required"),
    type: Yup.string().required("Required"),
    weight: Yup.string().required("Required"),
    description: Yup.string().required("Required")
  });

  const handleSubmit = (values: any) => {
    console.log("SUBMIT VALUES 👉", values);

    return {
      index_title: values.index_title,
      select_group: values.select_group,
      type: values.type,
      weight: values.weight,
      description: values.description
    };
  };

  return (
    <FormProvider
      formId="setting-form"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <SettingForm />
    </FormProvider>
  );
};

export default SettingModal;
