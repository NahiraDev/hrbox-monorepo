import PersonalCalenderList from '@module/attendance/features/attendanceCalender/PersonalCalenderList';
import Comprehensivereport from '@module/attendance/features/attendanceCalender/Comprehensivereport';

const AttendanceCalenders = () => {
  return (
    <>
      <div className="w-full h-full flex flex-row gap-3">
        <PersonalCalenderList />
        <Comprehensivereport/>
      </div>
    </>
  );
};

export default AttendanceCalenders;
