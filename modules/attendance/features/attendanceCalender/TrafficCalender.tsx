import AppDropDown from '@core/components/AppDropDown';
import { Add, ArrowDown, ArrowDown2, Buildings2, Calendar, Profile, Trash } from 'iconsax-react';
import { Avatar } from '@heroui/react';
import { AppButton, AppTable } from '@root/core';
import { PersonalList } from '@module/attendance/app/mock';
import Comprehensivereport from '@module/attendance/features/attendanceCalender/Comprehensivereport';

const TrafficCalender=()=>{
  const month = [
    { key: 'Januray', label: 'Januray', icon: <Calendar size={33} /> },
    { key: 'February', label: 'February', icon: <Calendar size={33} /> },
    { key: 'March', label: 'March', icon: <Calendar size={33} /> },
  ];
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
  return(
    <>
      <div className="flx flex-col h-full font-bold">
        <div className="flex flex-row items-center justify-between mb-3">
          <div className="flex flex-row items-center gap-5">
            <Avatar className="w-[50px] h-[50px]" radius="md" src="/images/profile.png"/>
            <div className="flex flex-col gap-1">
              <h1>Zahra Pakniyat</h1>
              <div className="bg-primary-50 px-[4px] py-[1.5px] text-primary-400 rounded-md text-center flex items-center">
                <p className="font-sans font-normal text-xs">UiUx Designer</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <AppDropDown props={{
              title:"Person",
              item:month,
              className: 'border-1 border-primary px-xl ',
              startIcon:<Profile/>,
              EndIcon:<ArrowDown2/>,
            }}/>
            <AppDropDown props={{
              title:"Department/Unit",
              item:month,
              className: 'border-1 border-primary px-xl ',
              startIcon:<Buildings2/>,
              EndIcon:<ArrowDown2/>,
            }}/>
          </div>
        </div>
        <div className="flex flex-row gap-3 h-full ">
          <AppTable
            data={PersonalList}
            variant="attendance"
            hasPagination={false}
            {...attendanceConfig}/>
          <Comprehensivereport/>
        </div>
      </div>
    </>
  )
}
export default TrafficCalender;
