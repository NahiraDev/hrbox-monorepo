import { PersonalList } from '@module/attendance/app/mock';

import { AppTable } from '@core/components';
const PersonalCalenderList = () => {
  return (
    <>
      <div className="w-[90%]">
      <AppTable data={PersonalList} enableActions={false} theme="classic" pageSize={20}  />
      </div>
      </>
  );
};

export default PersonalCalenderList;
