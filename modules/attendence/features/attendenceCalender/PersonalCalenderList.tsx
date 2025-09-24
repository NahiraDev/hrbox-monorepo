import { PersonalList } from '@mock/attendenceEntry';

import { AppTable } from '../../../../core/components';
const PersonalCalenderList = () => {
  return (
    <>
      <div className="w-[90%]">
      <AppTable data={PersonalList} />
      </div>
      </>
  );
};

export default PersonalCalenderList;
