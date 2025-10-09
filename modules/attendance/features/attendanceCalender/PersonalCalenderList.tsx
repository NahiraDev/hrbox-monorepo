import { PersonalList } from '@module/attendance/app/mock';

import { AppButton, AppTable } from '@core/components';
import { Add } from 'iconsax-react';
const PersonalCalenderList = () => {
  const attendanceConfig = {
    columnGroups: [
      { startKey: 'date', endKey: 'shift', headerClassName: 'bg-[#999] text-white' },
      { startKey: 'checkIn', endKey: 'haste', headerClassName: 'bg-primary text-white' },
      { startKey: 'request', endKey: 'request', headerClassName: 'bg-green-500 text-white' },
    ],
    expandable: {
      render: (row: any) => (
        <div className="flex flex-col w-[200px] bg-white gap-2 shadow-[0_1.25px_4px_0_var(--Secondary-600,#152446)] px-2 py-4 rounded-lg">
          <AppButton props={{ startContent: <Add />, content: "Daily Leave" }} />
          <AppButton props={{ startContent: <Add />, content: "Daily Mission" }} />
          <AppButton props={{ startContent: <Add />, content: "Delete Traffic Entry" }} />
        </div>
      ),
    },
    styles: {
      rowClassName: (row: any) => row.status === 'absent' ? 'bg-red-50' : '',
    },
  };
  return (
    <>
      <div className="w-[90%]">
      {/*<AppTable data={PersonalList} enableActions={false} variant="attendance" pageSize={20}  />*/}
        <AppTable
          data={PersonalList}
          variant="attendance"
          {...attendanceConfig}
        />
      </div>
      </>
  );
};

export default PersonalCalenderList;
