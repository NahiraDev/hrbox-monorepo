import { AppTable } from '@hrbox/uikit/components';
import { Allocatio } from '@module/attendance/app/mock';
import ShiftAllocationModalEdit from '@module/attendance/features/modals/ShiftAllocationModalEdit';
import { Hierarchy3 } from 'iconsax-reactjs';
import { useState } from 'react';
import { useModalContext } from 'core/context';
import ShiftAllocationShow from '@module/attendance/features/modals/ShiftAllocationShow';

const ShiftAllocation=()=>{
  const [data,setData]=useState(Allocatio);
  const {openModal} = useModalContext();
  const handleDeleteRow=(index)=>{
    setData(prevData => prevData.filter((_, i) => i !== index))
  }
  const handleRowClick=(row,index)=>{
    openModal('view','ShiftShowModal',<ShiftAllocationShow/>,row,'3xl','Shift Allocation',<Hierarchy3 color="white"/>);
    console.log(row,"row");
  }
  return(
    <>
      <div className="h-full w-full flex flex-col ">
    <AppTable
      data={data}
      showStatus={true}
      hasPagination={true}
      onRowClick={(row,index)=>handleRowClick(row,index)}
     onDelete={(index)=>handleDeleteRow(index)}
      onEdit={(row,index)=> openModal('edit','ShiftAllocationModalEdit',<ShiftAllocationModalEdit/>,row,'3xl','Edit Shift Allocation',<Hierarchy3 color="white"/>)}
    />
      </div>
    </>
  )
}
export default ShiftAllocation;
