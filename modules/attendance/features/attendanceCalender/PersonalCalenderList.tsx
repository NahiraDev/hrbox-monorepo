import { PersonalList } from '@module/attendance/app/mock';

import { AppButton, AppTable } from '@core/components';
import { Add, Trash } from 'iconsax-react';
const PersonalCalenderList = () => {

  const attendanceConfig = {
    columnGroups: [
      { startKey: 'date', endKey: 'shift', headerClassName: 'bg-[#999] text-white' },
      { startKey: 'checkIn', endKey: 'haste', headerClassName: 'bg-primary text-white' },
      { startKey: 'request', endKey: 'request', headerClassName: 'bg-green-500 text-white' },
    ],
    expandable: {
      render: (row: any, index: number) => {
        return (
          <div className="flex flex-col justify-start  bg-white gap-1.5 shadow-[0_1.25px_4px_0_var(--Secondary-600,#152446)] px-2 py-4 rounded-lg font-normal text-sm font-sans">
            <AppButton props={{ startContent: <Add />, content: "Daily Leave",className:'w-full flex flex-row justify-start',size:"sm"}} />
            <AppButton props={{ startContent: <Add />, content: "Daily Mission",className:'w-full flex flex-row justify-start',size:"sm" }} />
            <AppButton props={{ startContent: <Trash />, content: "Delete Traffic Entry", className:'w-full flex flex-row justify-start',size:"sm" }} />
          </div>
        );
      },
    },
    styles: {
      rowClassName: (row: any) => row.status === 'absent' ? 'bg-red-50' : '',
    },
  };
  return (
    <>
      <div className="w-[80%]">
       <AppTable
       data={PersonalList}
       variant="attendance"
       hasPagination={false}
       {...attendanceConfig} />
      </div>
      </>
  );
};

export default PersonalCalenderList;
