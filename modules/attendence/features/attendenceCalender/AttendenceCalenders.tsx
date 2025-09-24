import PersonalCalenderList from './PersonalCalenderList';
import Comprehensivereport from '@module/attendence/features/attendenceCalender/Comprehensivereport';

const AttendenceCalenders = () => {
  return (
    <>
      <div className="w-full h-full flex flex-row gap-3">
        <PersonalCalenderList />
        <Comprehensivereport/>
      </div>
    </>
  );
};

export default AttendenceCalenders;
