import { AppTable } from '@hrbox/uikit/components';
import { Allocatio } from '@hrbox/modules/attendance/app/mock';
import { Hierarchy3 } from 'iconsax-reactjs';
import { useState } from 'react';
import { useModalContext } from '@hrbox/core/context';
import IpAllocationModalEdit from '@hrbox/modules/attendance/modals/IpAllocationModalEdit';
import IpAllocationShow from '@hrbox/modules/attendance/modals/IpAllocationShow';

const IpAllocation=()=>{
  const [data,setData]=useState(Allocatio);
  const {openModal} = useModalContext();
  const handleDeleteRow=(row,index)=>{
    setData(prevData => prevData.filter((_, i) => i !== index))
  }
  const handleRowClick=(row,index)=>{
    openModal('view','IpAllocationShow',<IpAllocationShow/>,row,'3xl','Ip Allocation',<Hierarchy3 color="white"/>);
  }
  return(
    <><div className="h-full w-full flex flex-col ">
    <AppTable
      data={data}
      showStatus={true}
      hasPagination={true}
      onRowClick={(row,index)=>handleRowClick(row,index)}
      onDelete={(row,index)=>handleDeleteRow(row,index)}
      onEdit={()=> openModal('edit','IpAllocationModalEdit',<IpAllocationModalEdit/>,null,'3xl','Edit Ip Allocation',<Hierarchy3 color="white"/>)}
    />
      </div>
    </>
  )
}
export default IpAllocation;
