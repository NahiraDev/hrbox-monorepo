import { FormProvider } from "@hrbox/core/providers";
import * as Yup from "yup";
import GeneralForm from "../forms/GeneralForm";
import SettingForm from "../forms/SettingForm";

export const initialValuesAction = {
  Grade: "",
  Grouping: "",
  fromPoints: "",
  toPoints: "",
  gradeColor: "",
  Description: "",
};

export const formValidationAction = Yup.object({
  Grade: Yup.string().required(),
  Grouping: Yup.string().required(),
  fromPoints: Yup.string().required(),
  toPoints: Yup.string().required(),
  Description: Yup.string().required(),
});
interface Props {
  initialData?: any;
}

const SettingModal = ({ initialData }: Props) => {
  return (
    <FormProvider
      formId="general-form"
      initialValues={initialData ?? initialValuesAction}
      validationSchema={initialData ? undefined : formValidationAction}
    >
      <SettingForm />
    </FormProvider>
  );
};

export default SettingModal;
