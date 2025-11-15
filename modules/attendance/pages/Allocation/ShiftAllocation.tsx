import { AppTable } from '@hrbox/uikit/components';
import { Allocatio } from '@hrbox/modules/attendance/app/mock';
import ShiftAllocationModalEdit from '@hrbox/modules/attendance/modals/ShiftAllocationModalEdit';
import { Hierarchy3 } from 'iconsax-reactjs';
import { useState } from 'react';
import { useModalContext } from '@hrbox/core/providers';
import ShiftAllocationShow from '@hrbox/modules/attendance/modals/ShiftAllocationShow';

const ShiftAllocation=()=>{
  const [data,setData]=useState(Allocatio);
  const {openModal} = useModalContext();
  // const handleDeleteRow=(index)=>{
  //   setData(prevData => prevData.filter((_, i) => i !== index))
  // }
  // const handleRowClick=(row,index)=>{
  //   openModal('view','ShiftShowModal',<ShiftAllocationShow/>,row,'3xl','Shift Allocation',<Hierarchy3 color="white"/>);
  //   console.log(row,"row");
  // }
  return(
    <>
      <div className="h-full w-full flex flex-col ">
    <AppTable
      data={data}
      showStatus={true}
      hasPagination={true}
    //   onRowClick={(row,index)=>handleRowClick(row,index)}
    //  onDelete={(index)=>handleDeleteRow(index)}
      // onEdit={(row,index)=> openModal('edit','ShiftAllocationModalEdit',<ShiftAllocationModalEdit/>,row,'3xl','Edit Shift Allocation',<Hierarchy3 color="white"/>)}
    />
      </div>
    </>
  )
}
export default ShiftAllocation;
