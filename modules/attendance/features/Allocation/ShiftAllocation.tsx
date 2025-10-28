import { AppTable } from '@core/components';
import { Allocatio } from '@module/attendance/app/mock';
import ShiftAllocationModalEdit from '@module/attendance/features/modals/ShiftAllocationModalEdit';
import { Hierarchy3 } from 'iconsax-react';
import { useState } from 'react';
import { useModalContext } from 'core/context';

const ShiftAllocation=()=>{
  const [data,setData]=useState(Allocatio);
  const {openModal} = useModalContext();
  const handleDeleteRow=(index)=>{
    setData(prevData => prevData.filter((_, i) => i !== index))
  }
  return(
    <>
      <div className="h-full w-full flex flex-col ">
    <AppTable
      data={data}
      showStatus={true}
      hasPagination={true}
    onDelete={(index)=>handleDeleteRow(index)}
      onEdit={(row,index)=> openModal('edit','ShiftAllocationModalEdit',<ShiftAllocationModalEdit/>,row,'2xl','Edit Shift Allocation',<Hierarchy3 color="white"/>)}
    />
      </div>
    </>
  )
}
export default ShiftAllocation;
