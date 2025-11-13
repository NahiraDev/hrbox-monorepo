import { AppTable } from '@hrbox/uikit/components';
import { Allocatio } from '@hrbox/modules/attendance/app/mock';
import { Hierarchy3 } from 'iconsax-reactjs';
import { useState } from 'react';
import { useModalContext } from 'core/context';
import LocationAllocationModalEdit from '@hrbox/modules/attendance/modals/LocationAllocationModalEdit';
import LocationAllocationShow from '@hrbox/modules/attendance/modals/LocationAllocationShow';

const LocationAllocation=()=>{
  const [data,setData]=useState(Allocatio);
  const {openModal} = useModalContext();
  const handleDeleteRow=(row,index)=>{
    setData(prevData => prevData.filter((_, i) => i !== index))
  }
  const handleRowClick=(row,index)=>{
    openModal(
      'view',
      'LocationAllocationShow',
      <LocationAllocationShow />,
      row,
      '3xl',
      'Location Allocation',
      <Hierarchy3 color='white' />
    );
  }
  return(
    <>
      <div className="h-full w-full flex flex-col ">
    <AppTable
      data={data}
      showStatus={true}
      hasPagination={true}
      onRowClick={(row,index)=>handleRowClick(row,index)}
      onDelete={(row,index)=>handleDeleteRow(row,index)}
      onEdit={()=> openModal('edit','LocationAllocationEdit',<LocationAllocationModalEdit/>,null,'3xl','Edit Location Allocation',<Hierarchy3 color="white"/>)}
    />
      </div>
    </>
  )
}
export default LocationAllocation;
