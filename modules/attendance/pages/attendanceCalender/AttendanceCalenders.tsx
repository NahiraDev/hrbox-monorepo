import PersonalCalenderList from '@hrbox/modules/attendance/pages/attendanceCalender/PersonalCalenderList';
import Comprehensivereport from '@hrbox/modules/attendance/pages/attendanceCalender/Comprehensivereport';
import { useState } from 'react';

const AttendanceCalenders = () => {
  const [IsReportHidden, setIsReportHidden] = useState<boolean>(false);
  return (
    <>
      <div className="w-full h-full flex flex-row gap-3">
        {!IsReportHidden && <PersonalCalenderList /> }
        <Comprehensivereport
            isExpanded={IsReportHidden}
          onToggle={()=>setIsReportHidden(!IsReportHidden)}
        />
      </div>
    </>
  );
};

export default AttendanceCalenders;
