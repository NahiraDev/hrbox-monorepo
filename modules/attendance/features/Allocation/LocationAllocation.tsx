import { AppTable } from '@core/components';
import { Allocatio } from '@module/attendance/app/mock';
import { Hierarchy3 } from 'iconsax-react';
import { useState } from 'react';
import { useModalContext } from 'core/context';
import LocationAllocationModalEdit from '@module/attendance/features/modals/LocationAllocationModalEdit';

const LocationAllocation=()=>{
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
      onEdit={()=> openModal('edit','LocationAllocationEdit',<LocationAllocationModalEdit/>,null,'2xl','Edit Location Allocation',<Hierarchy3 color="white"/>)}
    />
      </div>
    </>
  )
}
export default LocationAllocation;
