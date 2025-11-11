import PersonalCalenderList from '@module/attendance/features/attendanceCalender/PersonalCalenderList';
import Comprehensivereport from '@module/attendance/features/attendanceCalender/Comprehensivereport';
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
