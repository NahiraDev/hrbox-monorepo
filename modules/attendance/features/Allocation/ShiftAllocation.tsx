import { AppTable, useModalContext } from '@root/core';
import { Allocatio } from '@module/attendance/app/mock';
import { useState } from 'react';
import { Hierarchy3 } from 'iconsax-react';
import ShiftAllocationModalEdit from '@module/attendance/features/modals/ShiftAllocationModalEdit';

const ShiftAllocation=()=>{
  const [data,setData]=useState(Allocatio);
  const {openModal} = useModalContext();
  const handleDeleteRow=(row,index)=>{
    setData(prevData => prevData.filter((_, i) => i !== index))
  }
  return(
    <>
      <div className="h-full w-full flex flex-col ">
    <AppTable
      data={data}
      showStatus={true}
      hasPagination={true}
    onDelete={(row,index)=>handleDeleteRow(row,index)}
      onEdit={()=> openModal('edit','ShiftAllocationModalEdit',<ShiftAllocationModalEdit/>,null,'2xl','Edit Shift Allocation',<Hierarchy3 color="white"/>)}
    />
      </div>
    </>
  )
}
export default ShiftAllocation;
