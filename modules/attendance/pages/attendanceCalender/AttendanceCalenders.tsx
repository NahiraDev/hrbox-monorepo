import PersonalCalenderList from '@hrbox/modules/attendance/pages/attendanceCalender/PersonalCalenderList';
import Comprehensivereport from '@hrbox/modules/attendance/pages/attendanceCalender/Comprehensivereport';
import { useState } from 'react';
import { FormProvider } from '@hrbox/core/providers';
import * as Yup from "yup";

  export const initialValuesAttendance = {
  month: "",
  year: "",
  person: "",
  department: "",
};

export const formValidationAttendance = Yup.object().shape({
  month: Yup.string(),
  year: Yup.string(),
  person: Yup.string(),
  department: Yup.string(),
});

export const handleSubmitAttendance = (values: any) => {
  console.log("Form submitted with values:", values);
  return values;
};
const AttendanceCalenders = () => {
  const [IsReportHidden, setIsReportHidden] = useState<boolean>(false);
    const headerInitialValues = {
    month: "",
    year: "",
    person: "",
    department: "",
  };
  return (
    <>
      <div className="w-full h-full flex flex-row gap-3">
       <FormProvider
       formId='calender-form'
      initialValues={initialValuesAttendance}
      validationSchema={formValidationAttendance}
      onSubmit={handleSubmitAttendance}
    >
        {!IsReportHidden && <PersonalCalenderList /> }
        <Comprehensivereport
            isExpanded={IsReportHidden}
          onToggle={()=>setIsReportHidden(!IsReportHidden)}
        />
        </FormProvider>
      </div>
    </>
  );
};

export default AttendanceCalenders;
