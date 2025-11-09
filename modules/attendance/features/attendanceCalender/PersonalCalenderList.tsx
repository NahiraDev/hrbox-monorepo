import { PersonalList } from '@module/attendance/app/mock';

import { AppButton, AppTable } from '@hrbox/uikit/components';
import { Add, Calendar, Edit, Trash } from 'iconsax-react';
const PersonalCalenderList = () => {
  const columns = [
    {
      key: 'Date',
      label: 'Date',
      render: (value) => value
    },
    { key: 'Shift', label: 'Shift' },
    { key: 'Check in', label: 'Check In' },
    { key: 'Check out', label: 'Check Out' },
    { key: 'Presence', label: 'Presence' },
    { key: 'Overdue', label: 'Overdue' },
    { key: 'Delay', label: 'Delay' },
    { key: 'Haste to leave', label: 'Haste to Leave' },
    { key: 'Request', label: 'Request' },
  ];

  const attendanceConfig = {
    columns,
    columnGroups: [
      { startKey: 'date', endKey: 'shift', headerClassName: ' text-white' },
      { startKey: 'checkIn', endKey: 'haste', headerClassName: 'bg-primary text-white' },
      { startKey: 'request', endKey: 'request', headerClassName: 'bg-green-500 text-white' },
    ],
    expandable: {
      render: (row: any, index: number) => {
        return (
          <div className="flex flex-col justify-start bg-white gap-1.5 shadow-[0_1.25px_4px_0_var(--Secondary-600,#152446)] px-4 py-2 rounded-lg font-normal text-sm font-sans">
            <AppButton props={{
              startContent: <Add size={18} />,
              content: "Daily Leave",
              className:'w-full flex flex-row justify-start !text-sm',
              size:"xs"
            }} />
            <AppButton props={{
              startContent: <Add size={18} />,
              content: "Daily Mission",
              className:'w-full flex flex-row justify-start !text-sm',
              size:"xs"
            }} />
            <AppButton props={{
              startContent: <Trash size={18} />,
              content: "Delete Traffic Entry",
              className:'w-full flex flex-row justify-start !text-sm',
              size:"xs"
            }} />
          </div>
        );
      },
      secondCellRender: (row: any, index: number) => {
        return (
          <div className="flex flex-col justify-start bg-white gap-1.5 shadow-[0_1.25px_4px_0_var(--Secondary-600,#152446)] px-4 py-2 rounded-lg font-normal font-sans">
            <AppButton props={{
              startContent: <Add size={18} />,
              content: "Hourly Leave",
              className:'w-full flex flex-row justify-start !text-sm',
              size:"xs",
            }} />
            <AppButton props={{
              startContent: <Add size={18} />,
              content: "Hourly Mission",
              className:'w-full flex flex-row justify-start !text-sm',
              size:"xs",
            }} />
            <AppButton props={{
              startContent: <Edit size={18} />,
              content: "Edit Traffic Entry",
              className:'w-full flex flex-row justify-start !text-sm',
              size:"xs",
            }} />
            <AppButton props={{
              startContent: <Trash size={18} />,
              content: "Delete Traffic Entry",
              className:'w-full flex flex-row justify-start !text-sm',
              size:"xs",
            }} />
          </div>
        );
      },
      onExpand: (row: any, index: number, isExpanded: boolean, cellType?: 'first' | 'second') => {
        console.log(`${cellType} cell expanded for row ${index}:`, isExpanded);
      }
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
