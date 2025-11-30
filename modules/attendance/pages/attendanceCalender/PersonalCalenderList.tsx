import { PersonalList } from '@hrbox/modules/attendance/app/mock';

import { AppButton } from '@hrbox/uikit/components';
import { Add, Additem, AddSquare, Calendar, Edit, Trash } from 'iconsax-reactjs';
import { useState } from 'react';
const PersonalCalenderList = () => {
  const [menu1,setMenu1]=useState(false);
  const [menu2,setMenu2]=useState(false);
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

  const handelmenubutton1=()=>{
    setMenu1(!menu1)
  }
  const handelmenubutton2=()=>{
    setMenu2(!menu2)
  }

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
            <AppButton
              startContent= {<Add size={18} />}
              content="Daily Leave"
              className='w-full flex flex-row justify-start text-sm!'
              size="xs"
              />
            <AppButton
              startContent= {<Add size={18} />}
              content= "Daily Mission"
              className='w-full flex flex-row justify-start !text-sm!'
              size="xs"
             />
            <AppButton 
              startContent= {<Trash size={18} />}
              content= "Delete Traffic Entry"
              className='w-full flex flex-row justify-start text-sm!'
              size="xs"
             />
          </div>
        );
      },
      secondCellRender: (row: any, index: number) => {
        return (
          <div className="flex flex-col justify-start bg-white gap-1.5 shadow-[0_1.25px_4px_0_var(--Secondary-600,#152446)] px-4 py-2 rounded-lg font-normal font-sans">
            <AppButton
              startContent= {<Add size={18} />}
              content= "Hourly Leave"
              className='w-full flex flex-row justify-start text-sm!'
              size="xs"
            />
            <AppButton
              startContent={ <Add size={18} />}
              content= "Hourly Mission"
              className='w-full flex flex-row justify-start text-sm!'
              size="xs"
             />
            <AppButton
              startContent={ <Edit size={18} />}
              content= "Edit Traffic Entry"
              className='w-full flex flex-row justify-start text-sm!'
              size="xs"
             />
            <AppButton 
              startContent= {<Trash size={18} />}
              content= "Delete Traffic Entry"
              className='w-full flex flex-row justify-start text-sm!'
              size="xs"
             />
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
      <div className="w-[80%] border border-primary rounded-xl py-4 px-3">
        {/* start table */}
        <div className='w-full flex flex-col  h-full '>
          {/* start Header */}
          <div className='grid grid-cols-12 gap-2 text-white text-sm '>
            <div className='bg-[#999999] px-2 py-3 rounded-lg w-full col-span-2' >
              <p>Date</p>
            </div>
            <div className='bg-[#999999] px-2 py-3 rounded-lg col-span-1'>
              <p>Shift</p>
            </div>
            <div className='grid col-span-7 grid-cols-7 bg-primary rounded-lg w-full gap-2.5'>
              <div className='px-2 py-3 w-full'>
              <p>Check in</p>
            </div><div className='px-2 py-3 w-full'>
              <p>Check out</p>
            </div><div className='px-2 py-3 w-full'>
              <p>Presence</p>
            </div><div className='px-2 py-3 w-full'>
              <p>Overdue</p>
            </div><div className='px-2 py-3 w-full'>
              <p>Delay</p>
            </div><div className='px-2 py-3 w-full col-span-2'>
              <p>Haste to leave</p>
            </div>
            </div>
            <div className='px-2 py-3 w-full bg-success rounded-lg col-span-2'>
              <p>Request</p>
            </div>
          </div>
          {/* end Header */}

          {/* start Rows */}
          <div className='grid w-full gap-1 overflow-y-scroll h-full custom-scroll-table'>
            {/* start row */}
              <div className='gap-0.5 rounded-md'>
            <div className='grid grid-cols-12 gap-2 w-full text-xs  text-[#1E3363] items-center text-center hover:bg-[#DCF0F9] rounded-md '>
              <div className='col-span-2 p-1 border-b-1 border-white items-center text-start! relative cursor-pointer' onClick={handelmenubutton1} >
                <p>2025/01/01</p> 
                <p>Wednesday (Present)</p>
              {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-12 ${menu1?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */}
              </div>
              <div className='col-span-1 px-2 py-3 border-b-1 border-white items-center cursor-pointer' onClick={handelmenubutton2} >
                <p>123456</p>
                {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-28 ${menu2?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Edit Traffic Entry" startContent={<Edit size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */} 
              </div>
              <div className='grid grid-cols-7 col-span-7 border-b-1 border-white items-center'>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3 col-span-2 text-center'>
                <p>09:00</p>
              </div>
              </div>
              <div className='col-span-2 px-2 py-3 border-b-1 border-white'>
                <p>
                  Permision from 13:00 to 18:00
                </p>
              </div>
              </div>
            </div>
              <div className='gap-0.5 rounded-md'>
            <div className='grid grid-cols-12 gap-2 w-full text-xs  text-[#1E3363] items-center text-center hover:bg-[#DCF0F9] rounded-md '>
              <div className='col-span-2 p-1 border-b-1 border-white items-center text-start! relative cursor-pointer' onClick={handelmenubutton1} >
                <p>2025/01/01</p> 
                <p>Wednesday (Present)</p>
              {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-12 ${menu1?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */}
              </div>
              <div className='col-span-1 px-2 py-3 border-b-1 border-white items-center cursor-pointer' onClick={handelmenubutton2} >
                <p>123456</p>
                {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-28 ${menu2?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Edit Traffic Entry" startContent={<Edit size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */} 
              </div>
              <div className='grid grid-cols-7 col-span-7 border-b-1 border-white items-center'>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3 col-span-2 text-center'>
                <p>09:00</p>
              </div>
              </div>
              <div className='col-span-2 px-2 py-3 border-b-1 border-white'>
                <p>
                  Permision from 13:00 to 18:00
                </p>
              </div>
              </div>
            </div>
              <div className='gap-0.5 rounded-md'>
            <div className='grid grid-cols-12 gap-2 w-full text-xs  text-[#1E3363] items-center text-center hover:bg-[#DCF0F9] rounded-md '>
              <div className='col-span-2 p-1 border-b-1 border-white items-center text-start! relative cursor-pointer' onClick={handelmenubutton1} >
                <p>2025/01/01</p> 
                <p>Wednesday (Present)</p>
              {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-12 ${menu1?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */}
              </div>
              <div className='col-span-1 px-2 py-3 border-b-1 border-white items-center cursor-pointer' onClick={handelmenubutton2} >
                <p>123456</p>
                {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-28 ${menu2?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Edit Traffic Entry" startContent={<Edit size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */} 
              </div>
              <div className='grid grid-cols-7 col-span-7 border-b-1 border-white items-center'>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3 col-span-2 text-center'>
                <p>09:00</p>
              </div>
              </div>
              <div className='col-span-2 px-2 py-3 border-b-1 border-white'>
                <p>
                  Permision from 13:00 to 18:00
                </p>
              </div>
              </div>
            </div>
              <div className='gap-0.5 rounded-md'>
            <div className='grid grid-cols-12 gap-2 w-full text-xs  text-[#1E3363] items-center text-center hover:bg-[#DCF0F9] rounded-md '>
              <div className='col-span-2 p-1 border-b-1 border-white items-center text-start! relative cursor-pointer' onClick={handelmenubutton1} >
                <p>2025/01/01</p> 
                <p>Wednesday (Present)</p>
              {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-12 ${menu1?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */}
              </div>
              <div className='col-span-1 px-2 py-3 border-b-1 border-white items-center cursor-pointer' onClick={handelmenubutton2} >
                <p>123456</p>
                {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-28 ${menu2?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Edit Traffic Entry" startContent={<Edit size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */} 
              </div>
              <div className='grid grid-cols-7 col-span-7 border-b-1 border-white items-center'>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3 col-span-2 text-center'>
                <p>09:00</p>
              </div>
              </div>
              <div className='col-span-2 px-2 py-3 border-b-1 border-white'>
                <p>
                  Permision from 13:00 to 18:00
                </p>
              </div>
              </div>
            </div>
              <div className='gap-0.5 rounded-md'>
            <div className='grid grid-cols-12 gap-2 w-full text-xs  text-[#1E3363] items-center text-center hover:bg-[#DCF0F9] rounded-md '>
              <div className='col-span-2 p-1 border-b-1 border-white items-center text-start! relative cursor-pointer' onClick={handelmenubutton1} >
                <p>2025/01/01</p> 
                <p>Wednesday (Present)</p>
              {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-12 ${menu1?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */}
              </div>
              <div className='col-span-1 px-2 py-3 border-b-1 border-white items-center cursor-pointer' onClick={handelmenubutton2} >
                <p>123456</p>
                {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-28 ${menu2?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Edit Traffic Entry" startContent={<Edit size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */} 
              </div>
              <div className='grid grid-cols-7 col-span-7 border-b-1 border-white items-center'>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3 col-span-2 text-center'>
                <p>09:00</p>
              </div>
              </div>
              <div className='col-span-2 px-2 py-3 border-b-1 border-white'>
                <p>
                  Permision from 13:00 to 18:00
                </p>
              </div>
              </div>
            </div>
              <div className='gap-0.5 rounded-md'>
            <div className='grid grid-cols-12 gap-2 w-full text-xs  text-[#1E3363] items-center text-center hover:bg-[#DCF0F9] rounded-md '>
              <div className='col-span-2 p-1 border-b-1 border-white items-center text-start! relative cursor-pointer' onClick={handelmenubutton1} >
                <p>2025/01/01</p> 
                <p>Wednesday (Present)</p>
              {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-12 ${menu1?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */}
              </div>
              <div className='col-span-1 px-2 py-3 border-b-1 border-white items-center cursor-pointer' onClick={handelmenubutton2} >
                <p>123456</p>
                {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-28 ${menu2?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Edit Traffic Entry" startContent={<Edit size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */} 
              </div>
              <div className='grid grid-cols-7 col-span-7 border-b-1 border-white items-center'>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3 col-span-2 text-center'>
                <p>09:00</p>
              </div>
              </div>
              <div className='col-span-2 px-2 py-3 border-b-1 border-white'>
                <p>
                  Permision from 13:00 to 18:00
                </p>
              </div>
              </div>
            </div>
              <div className='gap-0.5 rounded-md'>
            <div className='grid grid-cols-12 gap-2 w-full text-xs  text-[#1E3363] items-center text-center hover:bg-[#DCF0F9] rounded-md '>
              <div className='col-span-2 p-1 border-b-1 border-white items-center text-start! relative cursor-pointer' onClick={handelmenubutton1} >
                <p>2025/01/01</p> 
                <p>Wednesday (Present)</p>
              {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-12 ${menu1?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */}
              </div>
              <div className='col-span-1 px-2 py-3 border-b-1 border-white items-center cursor-pointer' onClick={handelmenubutton2} >
                <p>123456</p>
                {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-28 ${menu2?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Edit Traffic Entry" startContent={<Edit size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */} 
              </div>
              <div className='grid grid-cols-7 col-span-7 border-b-1 border-white items-center'>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3 col-span-2 text-center'>
                <p>09:00</p>
              </div>
              </div>
              <div className='col-span-2 px-2 py-3 border-b-1 border-white'>
                <p>
                  Permision from 13:00 to 18:00
                </p>
              </div>
              </div>
            </div>
              <div className='gap-0.5 rounded-md'>
            <div className='grid grid-cols-12 gap-2 w-full text-xs  text-[#1E3363] items-center text-center hover:bg-[#DCF0F9] rounded-md '>
              <div className='col-span-2 p-1 border-b-1 border-white items-center text-start! relative cursor-pointer' onClick={handelmenubutton1} >
                <p>2025/01/01</p> 
                <p>Wednesday (Present)</p>
              {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-12 ${menu1?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */}
              </div>
              <div className='col-span-1 px-2 py-3 border-b-1 border-white items-center cursor-pointer' onClick={handelmenubutton2} >
                <p>123456</p>
                {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-28 ${menu2?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Edit Traffic Entry" startContent={<Edit size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */} 
              </div>
              <div className='grid grid-cols-7 col-span-7 border-b-1 border-white items-center'>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3 col-span-2 text-center'>
                <p>09:00</p>
              </div>
              </div>
              <div className='col-span-2 px-2 py-3 border-b-1 border-white'>
                <p>
                  Permision from 13:00 to 18:00
                </p>
              </div>
              </div>
            </div>
              <div className='gap-0.5 rounded-md'>
            <div className='grid grid-cols-12 gap-2 w-full text-xs  text-[#1E3363] items-center text-center hover:bg-[#DCF0F9] rounded-md '>
              <div className='col-span-2 p-1 border-b-1 border-white items-center text-start! relative cursor-pointer' onClick={handelmenubutton1} >
                <p>2025/01/01</p> 
                <p>Wednesday (Present)</p>
              {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-12 ${menu1?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */}
              </div>
              <div className='col-span-1 px-2 py-3 border-b-1 border-white items-center cursor-pointer' onClick={handelmenubutton2} >
                <p>123456</p>
                {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-28 ${menu2?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Edit Traffic Entry" startContent={<Edit size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */} 
              </div>
              <div className='grid grid-cols-7 col-span-7 border-b-1 border-white items-center'>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3 col-span-2 text-center'>
                <p>09:00</p>
              </div>
              </div>
              <div className='col-span-2 px-2 py-3 border-b-1 border-white'>
                <p>
                  Permision from 13:00 to 18:00
                </p>
              </div>
              </div>
            </div>
              <div className='gap-0.5 rounded-md'>
            <div className='grid grid-cols-12 gap-2 w-full text-xs  text-[#1E3363] items-center text-center hover:bg-[#DCF0F9] rounded-md '>
              <div className='col-span-2 p-1 border-b-1 border-white items-center text-start! relative cursor-pointer' onClick={handelmenubutton1} >
                <p>2025/01/01</p> 
                <p>Wednesday (Present)</p>
              {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-12 ${menu1?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */}
              </div>
              <div className='col-span-1 px-2 py-3 border-b-1 border-white items-center cursor-pointer' onClick={handelmenubutton2} >
                <p>123456</p>
                {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-28 ${menu2?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Edit Traffic Entry" startContent={<Edit size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */} 
              </div>
              <div className='grid grid-cols-7 col-span-7 border-b-1 border-white items-center'>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3 col-span-2 text-center'>
                <p>09:00</p>
              </div>
              </div>
              <div className='col-span-2 px-2 py-3 border-b-1 border-white'>
                <p>
                  Permision from 13:00 to 18:00
                </p>
              </div>
              </div>
            </div>
              <div className='gap-0.5 rounded-md'>
            <div className='grid grid-cols-12 gap-2 w-full text-xs  text-[#1E3363] items-center text-center hover:bg-[#DCF0F9] rounded-md '>
              <div className='col-span-2 p-1 border-b-1 border-white items-center text-start! relative cursor-pointer' onClick={handelmenubutton1} >
                <p>2025/01/01</p> 
                <p>Wednesday (Present)</p>
              {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-12 ${menu1?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */}
              </div>
              <div className='col-span-1 px-2 py-3 border-b-1 border-white items-center cursor-pointer' onClick={handelmenubutton2} >
                <p>123456</p>
                {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-28 ${menu2?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Edit Traffic Entry" startContent={<Edit size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */} 
              </div>
              <div className='grid grid-cols-7 col-span-7 border-b-1 border-white items-center'>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3 col-span-2 text-center'>
                <p>09:00</p>
              </div>
              </div>
              <div className='col-span-2 px-2 py-3 border-b-1 border-white'>
                <p>
                  Permision from 13:00 to 18:00
                </p>
              </div>
              </div>
            </div>
              <div className='gap-0.5 rounded-md'>
            <div className='grid grid-cols-12 gap-2 w-full text-xs  text-[#1E3363] items-center text-center hover:bg-[#DCF0F9] rounded-md '>
              <div className='col-span-2 p-1 border-b-1 border-white items-center text-start! relative cursor-pointer' onClick={handelmenubutton1} >
                <p>2025/01/01</p> 
                <p>Wednesday (Present)</p>
              {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-12 ${menu1?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */}
              </div>
              <div className='col-span-1 px-2 py-3 border-b-1 border-white items-center cursor-pointer' onClick={handelmenubutton2} >
                <p>123456</p>
                {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-28 ${menu2?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Edit Traffic Entry" startContent={<Edit size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */} 
              </div>
              <div className='grid grid-cols-7 col-span-7 border-b-1 border-white items-center'>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3 col-span-2 text-center'>
                <p>09:00</p>
              </div>
              </div>
              <div className='col-span-2 px-2 py-3 border-b-1 border-white'>
                <p>
                  Permision from 13:00 to 18:00
                </p>
              </div>
              </div>
            </div>
              <div className='gap-0.5 rounded-md'>
            <div className='grid grid-cols-12 gap-2 w-full text-xs  text-[#1E3363] items-center text-center hover:bg-[#DCF0F9] rounded-md '>
              <div className='col-span-2 p-1 border-b-1 border-white items-center text-start! relative cursor-pointer' onClick={handelmenubutton1} >
                <p>2025/01/01</p> 
                <p>Wednesday (Present)</p>
              {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-12 ${menu1?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */}
              </div>
              <div className='col-span-1 px-2 py-3 border-b-1 border-white items-center cursor-pointer' onClick={handelmenubutton2} >
                <p>123456</p>
                {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-28 ${menu2?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Edit Traffic Entry" startContent={<Edit size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */} 
              </div>
              <div className='grid grid-cols-7 col-span-7 border-b-1 border-white items-center'>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3 col-span-2 text-center'>
                <p>09:00</p>
              </div>
              </div>
              <div className='col-span-2 px-2 py-3 border-b-1 border-white'>
                <p>
                  Permision from 13:00 to 18:00
                </p>
              </div>
              </div>
            </div>
              <div className='gap-0.5 rounded-md'>
            <div className='grid grid-cols-12 gap-2 w-full text-xs  text-[#1E3363] items-center text-center hover:bg-[#DCF0F9] rounded-md '>
              <div className='col-span-2 p-1 border-b-1 border-white items-center text-start! relative cursor-pointer' onClick={handelmenubutton1} >
                <p>2025/01/01</p> 
                <p>Wednesday (Present)</p>
              {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-12 ${menu1?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */}
              </div>
              <div className='col-span-1 px-2 py-3 border-b-1 border-white items-center cursor-pointer' onClick={handelmenubutton2} >
                <p>123456</p>
                {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-28 ${menu2?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Edit Traffic Entry" startContent={<Edit size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */} 
              </div>
              <div className='grid grid-cols-7 col-span-7 border-b-1 border-white items-center'>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3 col-span-2 text-center'>
                <p>09:00</p>
              </div>
              </div>
              <div className='col-span-2 px-2 py-3 border-b-1 border-white'>
                <p>
                  Permision from 13:00 to 18:00
                </p>
              </div>
              </div>
            </div>
              <div className='gap-0.5 rounded-md'>
            <div className='grid grid-cols-12 gap-2 w-full text-xs  text-[#1E3363] items-center text-center hover:bg-[#DCF0F9] rounded-md '>
              <div className='col-span-2 p-1 border-b-1 border-white items-center text-start! relative cursor-pointer' onClick={handelmenubutton1} >
                <p>2025/01/01</p> 
                <p>Wednesday (Present)</p>
              {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-12 ${menu1?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */}
              </div>
              <div className='col-span-1 px-2 py-3 border-b-1 border-white items-center cursor-pointer' onClick={handelmenubutton2} >
                <p>123456</p>
                {/* start menu button */}
              <div className={`absolute px-4 py-2 bg-white rounded-md top-28 ${menu2?"flex":"hidden"} `}>
                <div className='flex flex-col items-start gap-1.5 '>
                  <AppButton content="Daily Leave" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Daily Mission" startContent={<Add size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Edit Traffic Entry" startContent={<Edit size={18} />} className='gap-1.5 text-sm' />
                  <AppButton content="Delete Request" startContent={<Trash size={18} />} className='gap-1.5 text-sm' />
                </div>
              </div>
              {/* end menu button */} 
              </div>
              <div className='grid grid-cols-7 col-span-7 border-b-1 border-white items-center'>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3'>
                <p>09:00</p>
              </div>
              <div className='px-2 py-3 col-span-2 text-center'>
                <p>09:00</p>
              </div>
              </div>
              <div className='col-span-2 px-2 py-3 border-b-1 border-white'>
                <p>
                  Permision from 13:00 to 18:00
                </p>
              </div>
              </div>
            </div>
            {/* end row */}
          </div>
          {/* end Rows */}
        </div>
        {/* end table */}
      </div>
      </>
  );
};

export default PersonalCalenderList;
