import { AppTable } from '@core/components';
import { Allocatio } from '@module/attendance/app/mock';
import ShiftAllocationModalEdit from '@module/attendance/features/modals/ShiftAllocationModalEdit';
import { Hierarchy3 } from 'iconsax-react';
import { useState } from 'react';
import { useModalContext } from 'core/context';

const IpAllocation=()=>{
  const [data,setData]=useState(Allocatio);
  const {openModal} = useModalContext();
  const handleDeleteRow=(row,index)=>{
    setData(prevData => prevData.filter((_, i) => i !== index))
  }
  return(
    <><div className="h-full w-full flex flex-col ">
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
export default IpAllocation;
