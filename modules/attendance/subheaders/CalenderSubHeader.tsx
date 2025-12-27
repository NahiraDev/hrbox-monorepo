import { FormProvider } from "@hrbox/core/providers";
import { CalenderHeaderForm } from "@hrbox/modules/attendance/forms/CalenderHeaderForm";
import * as Yup from "yup";

// ============= Form Configuration =============
export const initialValuesCalenderHeader = {
  month: "",
  year: "",
  person: "",
  department: "",
};

export const formValidationCalenderHeader = Yup.object().shape({
  month: Yup.string().nullable(),
  year: Yup.string().nullable(),
  person: Yup.string().nullable(),
  department: Yup.string().nullable(),
});

// ============= Component =============
const CalenderSubHeader = () => {
  return (
    <FormProvider
      formId="calenderHeader"
      initialValues={initialValuesCalenderHeader}
      validationSchema={formValidationCalenderHeader}
      enableCache={true}
    >
      <CalenderHeaderForm />
    </FormProvider>
  );
};

export default CalenderSubHeader;