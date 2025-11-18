
import { FormProvider } from "@hrbox/core/providers";
import {CalenderHeaderForm} from "@hrbox/modules/attendance/forms/CalenderHeaderForm";

const CalenderSubHeader = () => {
    const headerInitialValues = {
    month: "",
    year: "",
    person: "",
    department: "",
  };
   return (
        <FormProvider
          formId="calenderHeader"
          initialValues={headerInitialValues}
          validationSchema={{}}
          enableCache={false}
        >
  <CalenderHeaderForm/>
  </FormProvider>
  );
};

export default CalenderSubHeader;
